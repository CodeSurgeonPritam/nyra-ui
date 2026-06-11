import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";

import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { allTemplates, getTemplate } from "@/lib/templates";
import { getComponent } from "@/lib/registry";

export function generateStaticParams() {
  return allTemplates().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) return {};
  return {
    title: template.name,
    description: template.description,
  };
}

export default async function TemplateDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();

  const statusLabel = {
    ready: "Available now",
    "in-progress": "Building — shipping soon",
    planned: "Planned for the roadmap",
  }[template.status];

  return (
    <div className="min-h-dvh">
      <SiteNav />
      <main className="mx-auto max-w-4xl px-6 py-16 sm:px-10 sm:py-24">
        <Link
          href="/templates"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-foreground-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All templates
        </Link>

        <header className="mt-10 flex flex-col gap-4 border-b border-border pb-10">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
            {template.pro && (
              <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-accent">
                Pro
              </span>
            )}
            <span>{template.category}</span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1 text-foreground-muted">
              <Sparkles className="h-3 w-3 text-accent" />
              {statusLabel}
            </span>
          </div>
          <h1 className="font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl">
            {template.name}
          </h1>
          <p className="max-w-2xl text-base text-foreground-muted">
            {template.description}
          </p>
          {template.status !== "ready" && (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-surface p-4 text-sm">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <p className="text-foreground-muted">
                This template is{" "}
                <span className="text-foreground">{template.status}</span>.
                We post each component as it lands; subscribe via the
                newsletter to be told the moment the full template ships.
              </p>
            </div>
          )}
        </header>

        <section className="mt-12 flex flex-col gap-6">
          <h2 className="text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
            Built from
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {template.components.map((slug) => {
              const c = getComponent(slug);
              if (!c) return null;
              return (
                <li key={slug}>
                  <Link
                    href={`/components/${slug}`}
                    className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-foreground/15"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-serif text-lg leading-tight transition-colors group-hover:text-accent">
                        {c.name}
                      </span>
                      <span className="text-xs text-foreground-muted">
                        {c.description}
                      </span>
                    </div>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-foreground-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-16 flex flex-col gap-3 rounded-2xl border border-border bg-surface p-8 sm:p-10">
          <span className="text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
            Unlock with Pro
          </span>
          <h2 className="font-serif text-3xl leading-tight">
            Get every template — current and future.
          </h2>
          <p className="text-sm text-foreground-muted">
            Pro is a single payment. Every template that ships after you join
            is included, no upgrade required.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Get Nyra Pro
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-foreground-muted transition-colors hover:text-foreground hover:border-foreground/30"
            >
              All templates
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
