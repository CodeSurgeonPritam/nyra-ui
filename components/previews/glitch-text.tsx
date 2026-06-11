"use client";

import { GlitchText } from "@/components/ui/text/glitch-text";

export default function GlitchTextPreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-10">
      <GlitchText trigger="always" className="font-serif text-5xl italic">
        nyra
      </GlitchText>
      <div className="flex flex-col items-center gap-1">
        <GlitchText
          trigger="hover"
          className="font-mono text-sm uppercase tracking-[0.18em]"
        >
          HOVER TO GLITCH
        </GlitchText>
        <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          Two triggers — always and on hover
        </span>
      </div>
    </div>
  );
}
