/**
 * Lemon Squeezy wrapper.
 *
 * - `lemonSqueezy()` lazily configures the SDK (so the module can be
 *   imported when env vars are missing without crashing the build).
 * - `verifyWebhookSignature()` is a tiny constant-time HMAC check, used
 *   by the webhook route to authenticate incoming events.
 * - `createProCheckout()` builds a checkout URL for a specific plan
 *   variant. Returns null when LS isn't configured so callers can
 *   render a "coming soon" UI without throwing.
 */

import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import {
  lemonSqueezySetup,
  createCheckout,
} from "@lemonsqueezy/lemonsqueezy.js";

import { env, isLemonSqueezyConfigured } from "./env";

let initialized = false;
function lemonSqueezy() {
  if (initialized) return;
  if (!isLemonSqueezyConfigured()) {
    throw new Error("Lemon Squeezy is not configured (missing API key / store ID).");
  }
  lemonSqueezySetup({ apiKey: env.LEMONSQUEEZY_API_KEY! });
  initialized = true;
}

export type ProPlan = "monthly" | "yearly" | "lifetime";

function variantForPlan(plan: ProPlan): string | undefined {
  switch (plan) {
    case "monthly":
      return env.LEMONSQUEEZY_PRO_VARIANT_ID;
    case "yearly":
      return env.LEMONSQUEEZY_PRO_YEARLY_VARIANT_ID;
    case "lifetime":
      return env.LEMONSQUEEZY_PRO_LIFETIME_VARIANT_ID;
  }
}

/**
 * Creates a checkout URL for the given plan + buyer. Returns null when
 * LS isn't configured or the variant isn't set, so calling code can
 * render a "coming soon" CTA instead of a 500.
 */
export async function createProCheckout(args: {
  plan: ProPlan;
  email?: string;
  name?: string;
  userId?: string;
}): Promise<string | null> {
  if (!isLemonSqueezyConfigured()) return null;
  const variantId = variantForPlan(args.plan);
  if (!variantId) return null;

  lemonSqueezy();
  const res = await createCheckout(
    env.LEMONSQUEEZY_STORE_ID!,
    variantId,
    {
      checkoutOptions: {
        embed: false,
        dark: true,
      },
      checkoutData: {
        email: args.email,
        name: args.name,
        custom: args.userId ? { user_id: args.userId } : undefined,
      },
      productOptions: {
        redirectUrl: `${env.NEXT_PUBLIC_APP_URL}/dashboard?welcome=1`,
      },
    },
  );

  // The SDK shape returns { data: { attributes: { url } } }.
  return (
    (res?.data?.data as { attributes?: { url?: string } } | undefined)
      ?.attributes?.url ?? null
  );
}

/**
 * Verifies a Lemon Squeezy webhook signature against the raw body using
 * the shared webhook secret. Constant-time compare, throws on tampering.
 */
export function verifyWebhookSignature(args: {
  body: string;
  signature: string | null;
}): boolean {
  if (!env.LEMONSQUEEZY_WEBHOOK_SECRET) return false;
  if (!args.signature) return false;
  const expected = createHmac("sha256", env.LEMONSQUEEZY_WEBHOOK_SECRET)
    .update(args.body)
    .digest("hex");
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(args.signature, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
