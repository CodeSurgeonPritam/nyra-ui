import type { Metadata } from "next";

import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Every release of Nyra — new components, fixes, and what shipped this week.",
};

type Entry = {
  type: "feature" | "fix" | "polish";
  title: string;
  detail?: string;
  href?: string;
};

type Release = {
  version: string;
  date: string;
  summary?: string;
  entries: Entry[];
};

const releases: Release[] = [
  {
    version: "0.1.0",
    date: "2026-05-15",
    summary:
      "Launch milestone — forty components across eight categories, Pro tier, CLI, and the marketing surface.",
    entries: [
      { type: "feature", title: "40 components shipped at launch", href: "/components" },
      { type: "feature", title: "10 Pro-gated components", href: "/pricing" },
      { type: "feature", title: "Nyra CLI — `nyra init` and `nyra add`" },
      { type: "feature", title: "Docs site at /docs with theming + installation guides", href: "/docs" },
      { type: "feature", title: "Component search palette (⌘K)" },
      { type: "feature", title: "Light + dark theme with system preference detection" },
    ],
  },
  {
    version: "0.0.x",
    date: "2026-05-14",
    summary: "Building in public — foundation, design system, first components.",
    entries: [
      { type: "feature", title: "Design tokens — electric lime + ink black + editorial serif" },
      { type: "feature", title: "Magnetic Button, Aurora Background, Tilt Card, Sparkles" },
      { type: "feature", title: "Component registry + dynamic preview map" },
      { type: "polish", title: "Shiki-rendered code blocks with copy-to-clipboard" },
    ],
  },
];

const labelClass: Record<Entry["type"], string> = {
  feature: "border-accent/40 bg-accent/10 text-accent",
  fix: "border-rose/40 bg-rose/10 text-rose",
  polish:
    "border-border bg-foreground/[0.04] text-foreground-muted",
};

const labelText: Record<Entry["type"], string> = {
  feature: "New",
  fix: "Fix",
  polish: "Polish",
};

export default function ChangelogPage() {
  return (
    <div className="min-h-dvh">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-6 py-20 sm:px-10 sm:py-28">
        <header className="mb-16">
          <span className="text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
            Releases
          </span>
          <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
            <em className="italic text-accent">Changelog</em>.
          </h1>
          <p className="mt-4 max-w-xl text-sm text-foreground-muted sm:text-base">
            Everything we've shipped, dated and grouped. New components and
            big additions surface here every week.
          </p>
        </header>

        <div className="flex flex-col gap-16">
          {releases.map((release) => (
            <section key={release.version} className="flex flex-col gap-6">
              <div className="flex items-baseline gap-4 border-b border-border pb-4">
                <h2 className="font-serif text-3xl tracking-tight">
                  v{release.version}
                </h2>
                <time
                  dateTime={release.date}
                  className="text-[11px] uppercase tracking-[0.18em] text-foreground-muted"
                >
                  {formatDate(release.date)}
                </time>
              </div>
              {release.summary && (
                <p className="text-sm text-foreground-muted sm:text-base">
                  {release.summary}
                </p>
              )}
              <ul className="flex flex-col gap-3">
                {release.entries.map((entry, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-border bg-surface px-4 py-3"
                  >
                    <span
                      className={cn(
                        "mt-0.5 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.16em]",
                        labelClass[entry.type],
                      )}
                    >
                      {labelText[entry.type]}
                    </span>
                    <div className="flex flex-1 flex-col">
                      {entry.href ? (
                        <a
                          href={entry.href}
                          className="text-sm text-foreground transition-colors hover:text-accent"
                        >
                          {entry.title}
                        </a>
                      ) : (
                        <span className="text-sm text-foreground">
                          {entry.title}
                        </span>
                      )}
                      {entry.detail && (
                        <span className="text-xs text-foreground-muted">
                          {entry.detail}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
