import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";

import { isClerkConfigured } from "@/lib/env";

type ProPaywallProps = {
  signedIn: boolean;
};

/**
 * Replaces the source block on a Pro component when the viewer isn't
 * entitled. Lives next to the preview, so users still get a sense of
 * what they're buying — just not the code.
 */
export function ProPaywall({ signedIn }: ProPaywallProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent/40 bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 0%, color-mix(in oklab, var(--accent) 18%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="relative flex flex-col items-start gap-5 p-7">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-accent">
          <Lock className="h-3 w-3" />
          Pro component
        </span>
        <h3 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
          Unlock the source with{" "}
          <em className="italic text-accent">Nyra Pro</em>.
        </h3>
        <p className="max-w-md text-sm text-foreground-muted">
          One-time payment, lifetime updates, every current + future Pro
          component. The preview above is the real component — Pro just lets
          you copy it.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            See pricing
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          {isClerkConfigured() && !signedIn ? (
            <Link
              href="/login"
              className="text-sm text-foreground-muted underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-foreground"
            >
              Already Pro? Sign in
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
