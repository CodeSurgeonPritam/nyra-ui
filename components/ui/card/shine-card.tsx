"use client";

import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type ShineCardProps = {
  children: ReactNode;
  className?: string;
  /** Sweep duration in milliseconds. */
  duration?: number;
};

/**
 * A diagonal specular streak sweeps across the surface on hover. Pure
 * CSS — the gradient pseudo-element starts off the left edge and
 * translates fully past the right.
 */
export function ShineCard({
  children,
  className,
  duration = 900,
}: ShineCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-surface",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 z-10 w-[60%] -translate-x-full skew-x-12 group-hover:translate-x-[260%]"
        style={{
          transition: `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          background:
            "linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--accent) 30%, transparent) 35%, color-mix(in oklab, var(--bone) 22%, transparent) 50%, color-mix(in oklab, var(--accent) 30%, transparent) 65%, transparent 100%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
