/**
 * Lemon Squeezy checkout entrypoint.
 *
 * `GET /api/checkout?plan=lifetime|monthly|yearly` builds a checkout URL
 * for the requested plan and 302s the visitor to it. If the user is
 * signed in, their Clerk id is included as custom data so the webhook
 * can map the resulting customer back to our DB row.
 *
 * Returns 503 when Lemon Squeezy isn't configured — the pricing page
 * already shows a "coming soon" state in that mode, so this is for
 * defensive depth.
 */

import { NextResponse, type NextRequest } from "next/server";

import { isClerkConfigured, isLemonSqueezyConfigured } from "@/lib/env";
import { createProCheckout, type ProPlan } from "@/lib/lemonsqueezy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PLANS: ProPlan[] = ["monthly", "yearly", "lifetime"];

export async function GET(req: NextRequest) {
  if (!isLemonSqueezyConfigured()) {
    return NextResponse.json(
      { error: "Checkout not configured" },
      { status: 503 },
    );
  }

  const planParam = req.nextUrl.searchParams.get("plan") ?? "lifetime";
  if (!PLANS.includes(planParam as ProPlan)) {
    return NextResponse.json(
      { error: `Unknown plan: ${planParam}` },
      { status: 400 },
    );
  }
  const plan = planParam as ProPlan;

  // Best-effort hydration of buyer details from Clerk session.
  let email: string | undefined;
  let name: string | undefined;
  let userId: string | undefined;
  if (isClerkConfigured()) {
    try {
      const { currentUser } = await import("@clerk/nextjs/server");
      const cu = await currentUser();
      if (cu) {
        email =
          cu.primaryEmailAddress?.emailAddress ??
          cu.emailAddresses[0]?.emailAddress;
        name = [cu.firstName, cu.lastName].filter(Boolean).join(" ") || undefined;
        userId = cu.id;
      }
    } catch {
      // Signed out or Clerk SDK errored — proceed as anonymous buyer.
    }
  }

  const url = await createProCheckout({ plan, email, name, userId });
  if (!url) {
    return NextResponse.json(
      { error: `No variant configured for plan: ${plan}` },
      { status: 503 },
    );
  }

  return NextResponse.redirect(url, { status: 303 });
}
