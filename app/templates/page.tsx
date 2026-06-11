import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Layers, Sparkles } from "lucide-react";

import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import {
  allTemplates,
  templateCategories,
  type NyraTemplate,
} from "@/lib/templates";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Full-page templates built from Nyra components. Ready to drop into a Next.js project and ship.",
};

export default function TemplatesIndex() {
  const templates = allTemplates();
  return (
    <div className="min-h-dvh">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        <header className="mb-16 flex flex-col gap-4">
          <span className="text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
            Pro · Full-page layouts
          </span>
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
            <em className="italic text-accent">Templates</em>.
          </h1>
          <p className="max-w-xl text-sm text-foreground-muted sm:text-base">
            Components compose into pages. Templates do the composition for
            you — drop one in, swap the copy, ship. Each template lists the
            Nyra components it relies on.
          </p>
        </header>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
            Categories
          </span>
          <span className="text-foreground-muted/40">·</span>
          {templateCategories.map((c) => (
            <span
              key={c.id}
              className="rounded-full border border-border px-2.5 py-1 text-xs text-foreground-muted"
            >
              {c.label}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {templates.map((t) => (
            <TemplateCard key={t.slug} template={t} />
          ))}
        </div>

        <section className="mt-24 flex flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-8 sm:p-10">
          <Layers className="h-6 w-6 text-accent" />
          <h2 className="font-serif text-3xl leading-tight">
            More templates ship monthly.
          </h2>
          <p className="max-w-xl text-sm text-foreground-muted">
            Pro members get every new template the day it ships, included
            in the same one-time payment. No upgrades, no add-ons.
          </p>
          <Link
            href="/pricing"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            Get Nyra Pro
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function TemplateCard({ template }: { template: NyraTemplate }) {
  const statusLabel = {
    ready: "Available",
    "in-progress": "Building",
    planned: "Planned",
  }[template.status];

  return (
    <Link
      href={`/templates/${template.slug}`}
      className="group relative isolate flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-foreground/15"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 opacity-50 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, color-mix(in oklab, var(--accent) 18%, transparent), transparent 70%)",
        }}
      />
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
          {template.pro && (
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-accent">
              Pro
            </span>
          )}
          <span>{template.category}</span>
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em]",
            template.status === "ready"
              ? "text-accent"
              : "text-foreground-muted",
          )}
        >
          <Sparkles className="h-3 w-3" />
          {statusLabel}
        </span>
      </div>
      <h2 className="font-serif text-2xl leading-tight tracking-tight">
        {template.name}
      </h2>
      <p className="text-sm text-foreground-muted">{template.description}</p>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {template.components.slice(0, 4).map((slug) => (
          <span
            key={slug}
            className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-foreground-muted"
          >
            {slug}
          </span>
        ))}
        {template.components.length > 4 && (
          <span className="font-mono text-[10px] text-foreground-muted">
            +{template.components.length - 4} more
          </span>
        )}
      </div>
    </Link>
  );
}
