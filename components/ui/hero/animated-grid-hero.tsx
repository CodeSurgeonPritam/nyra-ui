"use client";

import { type ReactNode } from "react";

import { AnimatedGrid } from "@/components/ui/background/animated-grid";
import { cn } from "@/lib/utils";

type AnimatedGridHeroProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Hero shell that pairs the drifting grid background with an accent halo
 * bloom anchored to the top. Use as a drop-in `<section>` replacement.
 */
export function AnimatedGridHero({ children, className }: AnimatedGridHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden", className)}>
      <AnimatedGrid />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-2/3"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--accent) 30%, transparent) 0%, transparent 70%)",
        }}
      />
      {children}
    </section>
  );
}
