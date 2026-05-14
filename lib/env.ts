/**
 * Typed environment-variable access with graceful-degradation helpers.
 *
 * Every Pro feature checks `is*Configured()` before initializing the
 * relevant client. This lets the site build and serve marketing pages
 * without any Pro env vars set, while lighting up automatically once
 * the keys are added.
 */

function get(name: string): string | undefined {
  const v = process.env[name];
  return v && v.length > 0 ? v : undefined;
}

export const env = {
  // Database
  DATABASE_URL: get("DATABASE_URL"),

  // Clerk
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: get("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"),
  CLERK_SECRET_KEY: get("CLERK_SECRET_KEY"),

  // Lemon Squeezy
  LEMONSQUEEZY_API_KEY: get("LEMONSQUEEZY_API_KEY"),
  LEMONSQUEEZY_STORE_ID: get("LEMONSQUEEZY_STORE_ID"),
  LEMONSQUEEZY_WEBHOOK_SECRET: get("LEMONSQUEEZY_WEBHOOK_SECRET"),
  LEMONSQUEEZY_PRO_VARIANT_ID: get("LEMONSQUEEZY_PRO_VARIANT_ID"),
  LEMONSQUEEZY_PRO_YEARLY_VARIANT_ID: get("LEMONSQUEEZY_PRO_YEARLY_VARIANT_ID"),
  LEMONSQUEEZY_PRO_LIFETIME_VARIANT_ID: get(
    "LEMONSQUEEZY_PRO_LIFETIME_VARIANT_ID",
  ),

  // App
  NEXT_PUBLIC_APP_URL: get("NEXT_PUBLIC_APP_URL") ?? "https://nyra.dev",
};

export function isDbConfigured(): boolean {
  return Boolean(env.DATABASE_URL);
}

export function isClerkConfigured(): boolean {
  return Boolean(env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && env.CLERK_SECRET_KEY);
}

export function isLemonSqueezyConfigured(): boolean {
  return Boolean(env.LEMONSQUEEZY_API_KEY && env.LEMONSQUEEZY_STORE_ID);
}

/** Pro features need all three: DB to record, Clerk to identify, LS to charge. */
export function isProConfigured(): boolean {
  return isDbConfigured() && isClerkConfigured() && isLemonSqueezyConfigured();
}

/** Pro tier status reported to UI when env is incomplete. */
export type ProConfigStatus = {
  configured: boolean;
  missing: string[];
};

export function proConfigStatus(): ProConfigStatus {
  const missing: string[] = [];
  if (!isDbConfigured()) missing.push("DATABASE_URL");
  if (!env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
    missing.push("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
  if (!env.CLERK_SECRET_KEY) missing.push("CLERK_SECRET_KEY");
  if (!env.LEMONSQUEEZY_API_KEY) missing.push("LEMONSQUEEZY_API_KEY");
  if (!env.LEMONSQUEEZY_STORE_ID) missing.push("LEMONSQUEEZY_STORE_ID");
  if (!env.LEMONSQUEEZY_WEBHOOK_SECRET)
    missing.push("LEMONSQUEEZY_WEBHOOK_SECRET");
  return { configured: missing.length === 0, missing };
}
