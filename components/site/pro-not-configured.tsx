import Link from "next/link";
import { Wrench, ArrowUpRight } from "lucide-react";

import { NyraMark } from "@/components/icons/nyra-mark";
import { proConfigStatus } from "@/lib/env";

/**
 * Placeholder rendered by Pro routes when the Pro stack (Clerk + Neon +
 * Lemon Squeezy) isn't fully configured. Lists exactly which env vars
 * are missing — so the next deploy can light the page up by filling them.
 */
export function ProNotConfigured({
  feature,
}: {
  feature: string;
}) {
  const { missing } = proConfigStatus();

  return (
    <main className="flex min-h-dvh items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-start gap-5">
        <NyraMark size={20} className="text-accent" />
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
          <Wrench className="h-3 w-3" /> Pro tier not configured
        </span>
        <h1 className="font-serif text-4xl leading-[0.95] tracking-tight">
          {feature} is wired up but waiting on env vars.
        </h1>
        <p className="text-sm text-foreground-muted">
          The marketing site is live; the Pro stack (Clerk, Neon, Lemon Squeezy)
          needs API keys before this page can do anything useful.
        </p>
        {missing.length > 0 ? (
          <div className="w-full rounded-xl border border-border bg-surface p-4 text-xs">
            <p className="text-foreground-muted">Missing from environment:</p>
            <ul className="mt-2 grid grid-cols-1 gap-1 font-mono text-foreground/90 sm:grid-cols-2">
              {missing.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <Link
          href="/components"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
        >
          Browse components
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
