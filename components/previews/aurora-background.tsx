"use client";

import { AuroraBackground } from "@/components/ui/background/aurora-background";

export default function AuroraBackgroundPreview() {
  return (
    <AuroraBackground className="h-full w-full">
      <div className="flex h-full min-h-[280px] w-full flex-col items-center justify-center gap-3 p-10 text-center">
        <h3 className="font-serif text-3xl italic leading-tight sm:text-4xl">
          Quietly alive.
        </h3>
        <p className="max-w-xs text-xs text-foreground-muted">
          A slow drift of lime and rose behind your hero.
        </p>
      </div>
    </AuroraBackground>
  );
}
