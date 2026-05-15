"use client";

import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type BentoItem = {
  title: ReactNode;
  description?: ReactNode;
  /** Visual content rendered behind the text — chart, image, animation, etc. */
  visual?: ReactNode;
  /** Tailwind grid-span utilities, e.g. "md:col-span-2 md:row-span-2". */
  span?: string;
  href?: string;
  cta?: ReactNode;
};

type BentoGridCardProps = {
  items: BentoItem[];
  className?: string;
};

/**
 * A bento layout: variable-span cells with a soft accent halo that follows
 * the cursor on hover (via a pointer-tracked CSS variable, no JS in the
 * render path).
 */
export function BentoGridCard({ items, className }: BentoGridCardProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-3",
        className,
      )}
    >
      {items.map((item, i) => (
        <BentoCell key={i} item={item} />
      ))}
    </div>
  );
}

function BentoCell({ item }: { item: BentoItem }) {
  function handleMove(event: React.MouseEvent<HTMLElement>) {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    target.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  const Tag: "a" | "div" = item.href ? "a" : "div";

  return (
    <Tag
      {...(item.href ? { href: item.href } : {})}
      onMouseMove={handleMove}
      className={cn(
        "group relative isolate flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-6",
        "transition-colors hover:border-foreground/15",
        item.span,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx) var(--my), color-mix(in oklab, var(--accent) 18%, transparent), transparent 70%)",
        }}
      />
      {item.visual && (
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
          {item.visual}
        </div>
      )}
      <div />
      <div className="relative flex flex-col gap-1.5">
        <div className="font-serif text-xl leading-tight">{item.title}</div>
        {item.description && (
          <div className="text-sm text-foreground-muted">{item.description}</div>
        )}
        {item.cta && (
          <div className="mt-3 text-xs uppercase tracking-[0.16em] text-accent">
            {item.cta}
          </div>
        )}
      </div>
    </Tag>
  );
}
