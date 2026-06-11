import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { allPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on motion, type, building Nyra in public, and the parts of design-system work nobody talks about.",
};

export default function BlogIndex() {
  const posts = allPosts();
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 sm:px-10 sm:py-28">
      <header className="mb-16">
        <span className="text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
          Writing
        </span>
        <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
          The <em className="italic text-accent">notebook</em>.
        </h1>
        <p className="mt-4 max-w-xl text-sm text-foreground-muted sm:text-base">
          Notes on motion, type, building Nyra in public, and the parts of
          design-system work nobody talks about.
        </p>
      </header>

      <ul className="flex flex-col">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-border">
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-3 py-8 transition-colors hover:bg-foreground/[0.02] -mx-4 px-4 rounded-lg"
            >
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                <span aria-hidden>·</span>
                <span>{post.readingTime} min read</span>
              </div>
              <h2 className="font-serif text-2xl leading-tight tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
                {post.title}
              </h2>
              <p className="max-w-2xl text-sm text-foreground-muted sm:text-base">
                {post.description}
              </p>
              <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-foreground-muted transition-colors group-hover:text-foreground">
                Read
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
