import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { NyraMark } from "@/components/icons/nyra-mark";

export const metadata: Metadata = {
  title: "Showcase",
  description:
    "Sites and apps built with Nyra components. Submit yours — we'll feature the ones that ship.",
};

/**
 * Showcase is intentionally seeded empty for launch. The placeholder cards
 * communicate the slot — real submissions will replace them as they come in.
 * Submission target is a GitHub issue template (added separately).
 */
const placeholders = [
  { kind: "Personal", note: "Slot reserved for the first portfolio." },
  { kind: "Indie SaaS", note: "Slot reserved for the first SaaS landing." },
  { kind: "Studio", note: "Slot reserved for the first agency site." },
  { kind: "Docs", note: "Slot reserved for the first docs site." },
  { kind: "Blog", note: "Slot reserved for the first publication." },
  { kind: "Marketing", note: "Slot reserved for the first product page." },
];

export default function ShowcasePage() {
  return (
    <div className="min-h-dvh">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        <header className="mb-16 flex flex-col gap-4">
          <span className="text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
            Built with Nyra
          </span>
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
            The <em className="italic text-accent">showcase</em>.
          </h1>
          <p className="max-w-xl text-sm text-foreground-muted sm:text-base">
            Sites and apps built with Nyra components. We seed the wall with
            empty frames so you can see exactly where your work could go.
            Submit yours — we'll feature the ones that ship.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href="https://github.com/CodeSurgeonPritam/nyra-ui/issues/new?template=showcase.yml"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Submit your site
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              href="/components"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-foreground-muted transition-colors hover:text-foreground hover:border-foreground/30"
            >
              Browse components
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {placeholders.map((p, i) => (
            <PlaceholderCard key={i} kind={p.kind} note={p.note} index={i} />
          ))}
        </div>

        <section className="mt-24 rounded-2xl border border-border bg-surface p-8 sm:p-10">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
              How to submit
            </span>
            <h2 className="font-serif text-3xl leading-tight">
              Three things we ask.
            </h2>
            <ul className="mt-2 grid gap-3 text-sm text-foreground-muted sm:grid-cols-3">
              <li className="rounded-lg border border-border bg-background p-4">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                  01
                </span>
                <p className="mt-1.5 text-foreground">
                  A live URL we can visit today.
                </p>
              </li>
              <li className="rounded-lg border border-border bg-background p-4">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                  02
                </span>
                <p className="mt-1.5 text-foreground">
                  Which Nyra components you used (or modified).
                </p>
              </li>
              <li className="rounded-lg border border-border bg-background p-4">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                  03
                </span>
                <p className="mt-1.5 text-foreground">
                  A one-line description we can publish next to your site.
                </p>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function PlaceholderCard({
  kind,
  note,
  index,
}: {
  kind: string;
  note: string;
  index: number;
}) {
  return (
    <div className="group relative isolate flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-border bg-surface p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, color-mix(in oklab, var(--accent) 8%, transparent), transparent 70%)",
        }}
      />
      <div className="flex items-start justify-between">
        <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
          <NyraMark size={10} className="text-accent" />
          {kind}
        </span>
        <span className="font-mono text-xs text-foreground-muted/60">
          #{String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-serif text-xl text-foreground/40">
          {note}
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.16em] text-foreground-muted">
          <Sparkles className="h-3 w-3 text-accent" />
          Available
        </span>
      </div>
    </div>
  );
}
