"use client";

import { ScrollRevealText } from "@/components/ui/text/scroll-reveal-text";

export default function ScrollRevealTextPreview() {
  return (
    <div className="flex h-full w-full justify-center overflow-y-auto p-10">
      <div className="flex w-full max-w-xl flex-col items-center gap-16 pt-16">
        <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          ↓ Scroll to reveal
        </span>
        <ScrollRevealText
          text="Components for interfaces that feel alive — written one word at a time as you scroll."
          className="text-2xl sm:text-4xl"
        />
        <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          End
        </span>
      </div>
    </div>
  );
}
