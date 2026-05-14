import type { MDXComponents } from "mdx/types";
import Link from "next/link";

import { CodeBlock } from "@/components/site/code-block";
import { Callout } from "@/components/mdx/callout";
import { cn } from "@/lib/utils";

/**
 * Root-level MDX overrides — App Router convention.
 *
 * Every element produced by an `.mdx` page passes through here. The point
 * is to teach MDX about Nyra's typography (serif headings, mono body) and
 * to replace the default `<pre><code>` with our Shiki-highlighted CodeBlock.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          "mt-2 mb-6 font-serif text-5xl leading-[0.95] tracking-tight scroll-mt-24",
          className,
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "mt-14 mb-4 font-serif text-3xl leading-tight tracking-tight scroll-mt-24",
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          "mt-10 mb-3 font-serif text-2xl leading-tight tracking-tight scroll-mt-24",
          className,
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn(
          "mt-8 mb-2 font-serif text-xl tracking-tight scroll-mt-24",
          className,
        )}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={cn(
          "my-4 text-sm leading-relaxed text-foreground/85 sm:text-base",
          className,
        )}
        {...props}
      />
    ),
    a: ({ className, href = "#", ...props }) => {
      const isInternal = href.startsWith("/") || href.startsWith("#");
      const sharedClass = cn(
        "text-foreground underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent",
        className,
      );
      if (isInternal) {
        return (
          <Link href={href} className={sharedClass} {...(props as object)} />
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={sharedClass}
          {...props}
        />
      );
    },
    ul: ({ className, ...props }) => (
      <ul
        className={cn(
          "my-4 ml-4 list-disc space-y-1.5 marker:text-accent/60 text-sm sm:text-base",
          className,
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          "my-4 ml-4 list-decimal space-y-1.5 marker:text-accent/60 text-sm sm:text-base",
          className,
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li className={cn("leading-relaxed", className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "my-6 border-l-2 border-accent/60 pl-4 font-serif text-xl italic text-foreground/90",
          className,
        )}
        {...props}
      />
    ),
    hr: ({ className, ...props }) => (
      <hr
        className={cn("my-10 border-t border-border", className)}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn(
          "rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-foreground",
          className,
        )}
        {...props}
      />
    ),
    // MDX wraps fenced code blocks in <pre><code>. Replace the whole <pre>
    // with our Shiki-rendered CodeBlock to keep one rendering pipeline.
    pre: (props) => {
      const child = props.children as
        | { props?: { className?: string; children?: string } }
        | undefined;
      const raw = (child?.props?.children ?? "") as string;
      const lang =
        (child?.props?.className ?? "")
          .replace(/^language-/, "")
          .split(" ")[0] || "tsx";
      const supported = ["tsx", "css", "bash"] as const;
      const useLang = (supported as readonly string[]).includes(lang)
        ? (lang as (typeof supported)[number])
        : "tsx";
      return (
        <div className="my-5">
          {/* CodeBlock is async; React 19 + RSC handle this inline. */}
          <CodeBlock code={raw} lang={useLang} />
        </div>
      );
    },
    table: ({ className, ...props }) => (
      <div className="my-6 overflow-x-auto rounded-xl border border-border">
        <table
          className={cn(
            "w-full text-left text-sm",
            className,
          )}
          {...props}
        />
      </div>
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn(
          "border-b border-border bg-surface px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground-muted",
          className,
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={cn(
          "border-b border-border px-4 py-2 align-top",
          className,
        )}
        {...props}
      />
    ),
    Callout,
    ...components,
  };
}
