import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getPost } from "@/lib/blog";

type BlogPostShellProps = {
  slug: string;
  children: React.ReactNode;
};

export function BlogPostShell({ slug, children }: BlogPostShellProps) {
  const meta = getPost(slug);
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-foreground-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All writing
      </Link>

      <header className="mt-10 flex flex-col gap-4 border-b border-border pb-10">
        {meta && (
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
            <time dateTime={meta.publishedAt}>
              {new Date(meta.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span aria-hidden>·</span>
            <span>{meta.readingTime} min read</span>
            <span aria-hidden>·</span>
            <span>{meta.author}</span>
          </div>
        )}
        {meta && (
          <h1 className="font-serif text-4xl leading-[1.02] tracking-tight sm:text-6xl">
            {meta.title}
          </h1>
        )}
        {meta && (
          <p className="max-w-2xl text-base text-foreground-muted">
            {meta.description}
          </p>
        )}
      </header>

      <article className="prose-nyra mt-10">{children}</article>

      <footer className="mt-16 flex items-center justify-between border-t border-border pt-8 text-sm text-foreground-muted">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          More writing
        </Link>
        <Link
          href="/components"
          className="transition-colors hover:text-foreground"
        >
          Browse components →
        </Link>
      </footer>
    </main>
  );
}
