/**
 * Lemon Squeezy webhook handler.
 *
 * Receives subscription + order events, verifies the HMAC signature
 * against `LEMONSQUEEZY_WEBHOOK_SECRET`, and reconciles state in our DB:
 *
 *  - subscription_created / _updated / _resumed → upsert subscriptions row
 *  - subscription_cancelled / _expired           → mark canceled / expired
 *  - order_created (one-time / lifetime)         → grant lifetime + license
 *
 * Idempotent. Returns 200 only after successful processing, so Lemon
 * Squeezy will retry on transient failures.
 */

import { NextResponse, type NextRequest } from "next/server";
import { and, eq } from "drizzle-orm";

import { env, isProConfigured } from "@/lib/env";
import { getDb } from "@/lib/db/client";
import { licenses, subscriptions, users } from "@/lib/db/schema";
import { verifyWebhookSignature } from "@/lib/lemonsqueezy";
import { generateLicenseKey } from "@/lib/license";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Minimal shape — Lemon Squeezy sends a lot more, we only consume what we need.
type LSWebhook = {
  meta: {
    event_name: string;
    custom_data?: { user_id?: string } | null;
  };
  data: {
    id: string;
    type: string;
    attributes: Record<string, unknown>;
  };
};

export async function POST(req: NextRequest) {
  if (!isProConfigured()) {
    return NextResponse.json(
      { error: "Pro stack not configured" },
      { status: 503 },
    );
  }
  if (!env.LEMONSQUEEZY_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 503 },
    );
  }

  const body = await req.text();
  const signature = req.headers.get("x-signature");
  if (!verifyWebhookSignature({ body, signature })) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: LSWebhook;
  try {
    payload = JSON.parse(body) as LSWebhook;
  } catch {
    return NextResponse.json({ error: "Malformed JSON" }, { status: 400 });
  }

  const event = payload.meta?.event_name;
  if (!event) {
    return NextResponse.json({ error: "Missing event name" }, { status: 400 });
  }

  try {
    switch (event) {
      case "subscription_created":
      case "subscription_updated":
      case "subscription_resumed":
        await handleSubscription(payload, "active");
        break;
      case "subscription_cancelled":
        await handleSubscription(payload, "canceled");
        break;
      case "subscription_expired":
        await handleSubscription(payload, "expired");
        break;
      case "subscription_payment_failed":
        await handleSubscription(payload, "past_due");
        break;
      case "order_created":
        await handleOrder(payload);
        break;
      default:
        // Ignore unknown events but ack so LS doesn't retry forever.
        break;
    }
  } catch (err) {
    console.error("[ls-webhook] processing failed", err);
    return NextResponse.json(
      { error: "Processing failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}

/**
 * Resolves the local user from custom_data.user_id (preferred) or the
 * customer's email. Returns null when neither is available — the caller
 * decides whether to bail or persist a stub row.
 */
async function resolveUser(
  payload: LSWebhook,
): Promise<{ id: string } | null> {
  const db = getDb();
  const customClerkId = payload.meta?.custom_data?.user_id;
  if (customClerkId) {
    const [row] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.clerkId, customClerkId))
      .limit(1);
    if (row) return row;
  }

  const attrs = payload.data?.attributes as
    | { user_email?: string; customer_email?: string }
    | undefined;
  const email = attrs?.user_email ?? attrs?.customer_email;
  if (email) {
    const [row] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (row) return row;
  }
  return null;
}

async function handleSubscription(
  payload: LSWebhook,
  status: "active" | "canceled" | "expired" | "past_due",
) {
  const db = getDb();
  const user = await resolveUser(payload);
  if (!user) {
    console.warn(
      "[ls-webhook] subscription event without resolvable user",
      payload.data.id,
    );
    return;
  }

  const attrs = payload.data.attributes as {
    variant_id?: number | string;
    renews_at?: string | null;
    ends_at?: string | null;
  };

  // Map variant id → our plan enum. Yearly takes priority if both set.
  const variantId = String(attrs.variant_id ?? "");
  let plan: "monthly" | "yearly" | "lifetime" = "monthly";
  if (variantId && variantId === env.LEMONSQUEEZY_PRO_YEARLY_VARIANT_ID) {
    plan = "yearly";
  } else if (
    variantId &&
    variantId === env.LEMONSQUEEZY_PRO_LIFETIME_VARIANT_ID
  ) {
    plan = "lifetime";
  }

  const currentPeriodEnd = attrs.renews_at
    ? new Date(attrs.renews_at)
    : attrs.ends_at
      ? new Date(attrs.ends_at)
      : null;

  const lsSubscriptionId = payload.data.id;

  await db
    .insert(subscriptions)
    .values({
      userId: user.id,
      lemonsqueezySubscriptionId: lsSubscriptionId,
      plan,
      status,
      currentPeriodEnd,
    })
    .onConflictDoUpdate({
      target: subscriptions.lemonsqueezySubscriptionId,
      set: { status, currentPeriodEnd, plan },
    });
}

/**
 * One-time order handler — used for the lifetime plan. Creates an active
 * subscription record AND mints a license key (if one doesn't exist
 * yet). The webhook can fire more than once for the same order during
 * payment confirmation, so both writes are idempotent.
 */
async function handleOrder(payload: LSWebhook) {
  const db = getDb();
  const user = await resolveUser(payload);
  if (!user) return;

  const attrs = payload.data.attributes as {
    first_order_item?: { variant_id?: number | string };
  };
  const variantId = String(attrs.first_order_item?.variant_id ?? "");

  // Only mint a license when the order is for the lifetime variant.
  if (
    !env.LEMONSQUEEZY_PRO_LIFETIME_VARIANT_ID ||
    variantId !== env.LEMONSQUEEZY_PRO_LIFETIME_VARIANT_ID
  ) {
    return;
  }

  // Existing license? Skip generation.
  const [existing] = await db
    .select({ id: licenses.id })
    .from(licenses)
    .where(eq(licenses.userId, user.id))
    .limit(1);

  if (!existing) {
    await db.insert(licenses).values({
      userId: user.id,
      key: generateLicenseKey(),
      seats: 1,
      activatedAt: new Date(),
      expiresAt: null, // lifetime
    });
  }

  // Also reflect lifetime as an "active" subscription row so the tier
  // gate doesn't have to special-case license-without-subscription.
  const lsOrderId = payload.data.id;
  const [existingSub] = await db
    .select({ id: subscriptions.id })
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.userId, user.id),
        eq(subscriptions.lemonsqueezySubscriptionId, lsOrderId),
      ),
    )
    .limit(1);
  if (!existingSub) {
    await db.insert(subscriptions).values({
      userId: user.id,
      lemonsqueezySubscriptionId: lsOrderId,
      plan: "lifetime",
      status: "active",
      currentPeriodEnd: null,
    });
  }
}
