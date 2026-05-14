"use client";

import { SpotlightHero } from "@/components/ui/hero/spotlight-hero";

export default function SpotlightHeroPreview() {
  return (
    <SpotlightHero className="h-full w-full">
      <div className="flex h-full min-h-[280px] w-full flex-col items-center justify-center gap-3 p-10 text-center">
        <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          Move your cursor
        </span>
        <h3 className="font-serif text-4xl italic leading-tight">
          A spotlight that follows.
        </h3>
      </div>
    </SpotlightHero>
  );
}
