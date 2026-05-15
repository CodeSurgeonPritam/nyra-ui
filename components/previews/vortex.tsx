"use client";

import { Vortex } from "@/components/ui/background/vortex";

export default function VortexPreview() {
  return (
    <div className="relative flex h-full min-h-[280px] w-full items-center justify-center overflow-hidden bg-background">
      <Vortex />
      <div className="relative z-10 text-center">
        <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          Pure CSS · 0 dependencies
        </span>
        <div className="mt-2 font-serif text-3xl italic">A quiet vortex.</div>
      </div>
    </div>
  );
}
