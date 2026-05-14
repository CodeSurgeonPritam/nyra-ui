/**
 * Server-side auth helpers.
 *
 * Combines Clerk (identity) with our Drizzle/Neon row (entitlements).
 * Every Pro-gated server component should go through `getCurrentUser()`
 * — it returns null whenever the Pro stack isn't configured, so the
 * marketing surface stays alive in degraded mode.
 *
 * Server-only.
 */

import "server-only";
import { and, desc, eq } from "drizzle-orm";

import { isClerkConfigured, isDbConfigured } from "./env";
import { getDb } from "./db/client";
import {
  licenses,
  subscriptions,
  users,
  type License,
  type Subscription,
  type User,
} from "./db/schema";

export type Tier = "free" | "pro";

export type NyraUser = {
  user: User;
  tier: Tier;
  activeSubscription: Subscription | null;
  license: License | null;
};

/**
 * Returns the current authenticated user with their Pro entitlement, or
 * null if not signed in / Clerk not configured / DB not configured.
 */
export async function getCurrentUser(): Promise<NyraUser | null> {
  if (!isClerkConfigured() || !isDbConfigured()) return null;

  // Dynamic import keeps Clerk out of the module graph when not configured,
  // so the build doesn't choke if the keys are missing.
  const { auth, currentUser } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  if (!userId) return null;

  const db = getDb();
  let dbUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1)
    .then((r) => r[0]);

  if (!dbUser) {
    const cu = await currentUser();
    if (!cu) return null;
    const email =
      cu.primaryEmailAddress?.emailAddress ?? cu.emailAddresses[0]?.emailAddress;
    if (!email) return null;
    dbUser = await db
      .insert(users)
      .values({
        clerkId: userId,
        email,
        name: [cu.firstName, cu.lastName].filter(Boolean).join(" ") || null,
      })
      .returning()
      .then((r) => r[0]);
  }

  const [activeSub, license] = await Promise.all([
    db
      .select()
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.userId, dbUser.id),
          eq(subscriptions.status, "active"),
        ),
      )
      .orderBy(desc(subscriptions.createdAt))
      .limit(1)
      .then((r) => r[0] ?? null),
    db
      .select()
      .from(licenses)
      .where(eq(licenses.userId, dbUser.id))
      .orderBy(desc(licenses.id))
      .limit(1)
      .then((r) => r[0] ?? null),
  ]);

  const tier: Tier = resolveTier({ activeSub, license });
  return { user: dbUser, tier, activeSubscription: activeSub, license };
}

function resolveTier({
  activeSub,
  license,
}: {
  activeSub: Subscription | null;
  license: License | null;
}): Tier {
  if (activeSub) return "pro";
  if (license) {
    if (!license.expiresAt) return "pro"; // lifetime
    if (license.expiresAt > new Date()) return "pro";
  }
  return "free";
}

/** Convenience: true when the current user (if any) is Pro. */
export async function isCurrentUserPro(): Promise<boolean> {
  const u = await getCurrentUser();
  return u?.tier === "pro";
}
