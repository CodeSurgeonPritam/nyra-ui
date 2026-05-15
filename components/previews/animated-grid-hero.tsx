"use client";

import { AnimatedGridHero } from "@/components/ui/hero/animated-grid-hero";

export default function AnimatedGridHeroPreview() {
  return (
    <AnimatedGridHero className="h-full w-full">
      <div className="flex h-full min-h-[280px] w-full flex-col items-center justify-center gap-3 p-10 text-center">
        <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          Background composition
        </span>
        <h3 className="font-serif text-5xl leading-tight">
          A grid that{" "}
          <em className="italic text-accent">drifts</em>.
        </h3>
      </div>
    </AnimatedGridHero>
  );
}
