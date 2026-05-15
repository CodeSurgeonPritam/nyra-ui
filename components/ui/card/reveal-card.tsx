"use client";

import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealCardProps = {
  image: string;
  alt?: string;
  title: ReactNode;
  description?: ReactNode;
  cta?: ReactNode;
  className?: string;
  href?: string;
};

/**
 * Image card with a hover reveal: the image scales up subtly, an ink
 * gradient deepens at the bottom, and a description + CTA fade in from
 * below the title. Combines the "image zoom" and "reveal overlay"
 * patterns into a single card built for editorial / showcase grids.
 */
export function RevealCard({
  image,
  alt = "",
  title,
  description,
  cta,
  className,
  href,
}: RevealCardProps) {
  const Tag = href ? "a" : "div";

  return (
    <Tag
      {...(href ? { href } : {})}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-border bg-surface",
        className,
      )}
    >
      <div className="aspect-[4/5] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(to top, color-mix(in oklab, var(--ink) 88%, transparent) 0%, color-mix(in oklab, var(--ink) 50%, transparent) 50%, transparent 100%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5">
        <h3 className="font-serif text-2xl leading-tight text-bone">{title}</h3>
        {description && (
          <p className="translate-y-2 text-sm leading-relaxed text-bone/75 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            {description}
          </p>
        )}
        {cta && (
          <div className="translate-y-2 text-xs uppercase tracking-[0.18em] text-accent opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            {cta}
          </div>
        )}
      </div>
    </Tag>
  );
}
