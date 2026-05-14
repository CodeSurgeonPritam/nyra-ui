/**
 * Next.js middleware.
 *
 * Conditional Clerk: if `CLERK_SECRET_KEY` isn't set the middleware is a
 * passthrough, so the marketing surface stays online without Pro env vars.
 * When Clerk is configured, `/dashboard` and `/account` require a session.
 */

import { type NextFetchEvent, type NextRequest, NextResponse } from "next/server";

import { isClerkConfigured } from "@/lib/env";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent,
) {
  if (!isClerkConfigured()) {
    return NextResponse.next();
  }

  // Lazy-import keeps Clerk out of the module graph when not configured.
  const { clerkMiddleware, createRouteMatcher } = await import(
    "@clerk/nextjs/server"
  );
  const isProtected = createRouteMatcher([
    "/dashboard(.*)",
    "/account(.*)",
  ]);
  return clerkMiddleware(async (auth, request) => {
    if (isProtected(request)) await auth.protect();
  })(req, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals + common static asset extensions.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes.
    "/(api|trpc)(.*)",
  ],
};
