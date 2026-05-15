"use client";

import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type LogoCloudItem = {
  /** A node — usually an inline SVG or img. Wordmarks work fine too. */
  logo: ReactNode;
  label?: string;
  href?: string;
};

type LogoCloudProps = {
  logos: LogoCloudItem[];
  className?: string;
  /** Columns at md+ breakpoint. Defaults to 4. */
  columns?: 3 | 4 | 5 | 6;
};

const columnClass = {
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
} as const;

/**
 * Static grid of partner / customer logos. Logos render at low opacity
 * and lift to full opacity on hover — quieter than the marquee variant,
 * better for "trusted by" sections that aren't the main pitch.
 */
export function LogoCloud({ logos, className, columns = 4 }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 items-center gap-x-10 gap-y-8 sm:grid-cols-3",
        columnClass[columns],
        className,
      )}
    >
      {logos.map((item, i) => {
        const Tag = item.href ? "a" : "div";
        return (
          <Tag
            key={i}
            {...(item.href ? { href: item.href } : {})}
            aria-label={item.label}
            className={cn(
              "flex h-10 items-center justify-center text-foreground-muted opacity-60 transition-all duration-300 hover:opacity-100 hover:text-foreground",
              "[&_svg]:max-h-7 [&_svg]:w-auto [&_img]:max-h-7 [&_img]:w-auto",
            )}
          >
            {item.logo}
          </Tag>
        );
      })}
    </div>
  );
}
