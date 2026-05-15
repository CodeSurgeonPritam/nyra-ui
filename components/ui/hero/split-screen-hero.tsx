"use client";

import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type SplitScreenHeroProps = {
  left: ReactNode;
  right: ReactNode;
  className?: string;
  /** Width fraction of the left column on desktop. */
  leftBasis?: "1/2" | "2/5" | "3/5";
  /** Place the visual on the left instead of the right. */
  reverse?: boolean;
};

const basisMap = {
  "1/2": "md:basis-1/2",
  "2/5": "md:basis-2/5",
  "3/5": "md:basis-3/5",
} as const;

/**
 * Two-column hero. Left column is the editorial side (text/CTAs),
 * right column is the visual. Stacks vertically on small screens with
 * the visual second.
 */
export function SplitScreenHero({
  left,
  right,
  className,
  leftBasis = "1/2",
  reverse = false,
}: SplitScreenHeroProps) {
  const leftClass = basisMap[leftBasis];
  const rightClass =
    leftBasis === "1/2"
      ? "md:basis-1/2"
      : leftBasis === "2/5"
        ? "md:basis-3/5"
        : "md:basis-2/5";

  return (
    <section
      className={cn(
        "relative flex flex-col gap-12 md:flex-row md:items-stretch md:gap-16",
        reverse && "md:flex-row-reverse",
        className,
      )}
    >
      <div className={cn("flex flex-col justify-center", leftClass)}>
        {left}
      </div>
      <div
        className={cn(
          "relative isolate overflow-hidden rounded-2xl border border-border bg-surface",
          "min-h-[360px] md:min-h-0",
          rightClass,
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 60% at 60% 40%, color-mix(in oklab, var(--accent) 18%, transparent), transparent 75%)",
          }}
        />
        {right}
      </div>
    </section>
  );
}
