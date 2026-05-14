import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  adjacentEntries,
  getCategoryLabel,
  getComponent,
  registry,
} from "@/lib/registry";
import { readComponentFile } from "@/lib/component-source";
import { CodeBlock } from "@/components/site/code-block";
import { ComponentPreview } from "@/components/site/component-preview";
import { InstallTabs } from "@/components/site/install-tabs";
import { NyraMark } from "@/components/icons/nyra-mark";
import { ProPaywall } from "@/components/site/pro-paywall";
import { SearchTrigger } from "@/components/site/search-trigger";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { getCurrentUser } from "@/lib/auth";
import { isProConfigured } from "@/lib/env";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return registry.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const component = getComponent(slug);
  if (!component) return {};
  return {
    title: component.name,
    description: component.description,
  };
}

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const component = getComponent(slug);
  if (!component) notFound();

  // Pro gating: when the Pro stack is configured and a Pro component is
  // viewed by a non-entitled user, never load the source server-side —
  // serve the paywall instead. In degraded mode (no Pro env) we show
  // every source so local dev is unimpeded.
  const proGatedActive = component.pro && isProConfigured();
  const me = proGatedActive ? await getCurrentUser() : null;
  const entitled = !component.pro || !isProConfigured() || me?.tier === "pro";

  const sources = entitled
    ? await Promise.all(
        component.files.map(async (file) => ({
          file,
          content: await readComponentFile(file),
        })),
      )
    : [];

  const { prev, next } = adjacentEntries(slug);

  return (
    <main className="min-h-dvh">
      <header className="flex items-center justify-between border-b border-border px-6 py-5 sm:px-10">
        <Link href="/" className="flex items-center gap-2">
          <NyraMark size={16} className="text-accent" />
          <span className="font-serif text-xl italic leading-none tracking-tight">
            nyra
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <SearchTrigger />
          <ThemeToggle />
        </div>
      </header>

      <article className="mx-auto max-w-5xl px-6 py-10 sm:px-10 sm:py-14">
        <nav className="mb-8 flex items-center gap-1 text-xs text-foreground-muted">
          <Link
            href="/components"
            className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" />
            All components
          </Link>
          <span className="px-1.5">/</span>
          <span>{getCategoryLabel(component.category)}</span>
        </nav>

        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
            <NyraMark size={9} className="text-accent" />
            {getCategoryLabel(component.category)}
            {component.pro ? (
              <span className="rounded-full border border-accent/40 bg-accent/10 px-1.5 py-0.5 text-[9px] tracking-[0.16em] text-accent">
                Pro
              </span>
            ) : null}
          </div>
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl">
            {component.name}
          </h1>
          <p className="max-w-2xl text-sm text-foreground-muted sm:text-base">
            {component.description}
          </p>
        </header>

        <section className="mt-10">
          <ComponentPreview slug={slug} minHeight={420} />
        </section>

        {component.dependencies.length > 0 ? (
          <section className="mt-10 flex flex-col gap-3">
            <h2 className="font-serif text-2xl">Install dependencies</h2>
            <InstallTabs packages={component.dependencies} />
          </section>
        ) : null}

        <section className="mt-10 flex flex-col gap-3">
          <h2 className="font-serif text-2xl">Source</h2>
          {entitled ? (
            <>
              <p className="text-xs text-foreground-muted">
                Copy this file into{" "}
                <span className="font-mono text-foreground">
                  components/ui/
                </span>{" "}
                in your project.
              </p>
              <div className="flex flex-col gap-4">
                {sources.map(({ file, content }) => (
                  <CodeBlock
                    key={file}
                    code={content}
                    lang="tsx"
                    filename={`components/ui/${file}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <ProPaywall signedIn={Boolean(me)} />
          )}
        </section>

        <nav className="mt-16 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-stretch sm:justify-between sm:gap-6">
          {prev ? (
            <Link
              href={`/components/${prev.slug}`}
              className="group flex flex-1 flex-col gap-1 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-foreground/20"
            >
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
                <ArrowLeft className="h-3 w-3" /> Previous
              </span>
              <span className="font-serif text-xl">{prev.name}</span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/components/${next.slug}`}
              className="group flex flex-1 flex-col items-end gap-1 rounded-xl border border-border bg-surface p-5 text-right transition-colors hover:border-foreground/20"
            >
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
                Next <ArrowRight className="h-3 w-3" />
              </span>
              <span className="font-serif text-xl">{next.name}</span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      </article>
    </main>
  );
}
