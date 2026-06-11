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
import { ComponentShowcase } from "@/components/site/component-showcase";
import { DlxTabs } from "@/components/site/dlx-tabs";
import { InstallTabs } from "@/components/site/install-tabs";
import { ProPaywall } from "@/components/site/pro-paywall";
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

  // Pro gating: never load Pro source for a non-entitled user.
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
    <article className="flex flex-col gap-8">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-foreground-muted"
      >
        <Link
          href="/components"
          className="transition-colors hover:text-foreground"
        >
          Components
        </Link>
        <span aria-hidden>/</span>
        <span className="text-foreground">{component.name}</span>
      </nav>

      <header className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">
            {component.name}
          </h1>
          {component.pro && (
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-accent">
              Pro
            </span>
          )}
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-foreground-muted sm:text-base">
          {component.description}
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          <Tag>{getCategoryLabel(component.category)}</Tag>
          {component.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </header>

      <ComponentShowcase
        slug={slug}
        preview={<ComponentPreview slug={slug} minHeight={460} className="rounded-none border-0" />}
        code={
          entitled ? (
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
          ) : (
            <ProPaywall signedIn={Boolean(me)} />
          )
        }
      />

      <section className="flex flex-col gap-3">
        <h2 className="font-serif text-2xl">Add this component</h2>
        <p className="text-sm text-foreground-muted">
          One-shot install via the Nyra CLI — fetches the source, drops it in
          <code className="mx-1 rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.85em]">
            components/ui/{component.files[0]}
          </code>
          , and offers to install any missing deps.
        </p>
        <DlxTabs args={`nyra@latest add ${component.slug}`} />
        {component.pro && (
          <p className="text-xs text-foreground-muted">
            Pro component — run{" "}
            <code className="rounded border border-border bg-surface px-1 py-0.5 font-mono text-[0.85em]">
              nyra login --key NYRA-XXXX-XXXX-XXXX
            </code>{" "}
            first.
          </p>
        )}
      </section>

      {component.dependencies.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="font-serif text-2xl">Or install deps manually</h2>
          <p className="text-sm text-foreground-muted">
            If you'd rather copy the source by hand, install the runtime
            packages this component needs.
          </p>
          <InstallTabs packages={component.dependencies} />
        </section>
      )}

      <nav className="mt-4 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-stretch sm:justify-between sm:gap-6">
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
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-surface px-2 py-0.5 text-[11px] text-foreground-muted">
      {children}
    </span>
  );
}
