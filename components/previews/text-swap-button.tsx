"use client";

import { TextSwapButton } from "@/components/ui/button/text-swap-button";

export default function TextSwapButtonPreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-10">
      <TextSwapButton hoverLabel="Let's go →">Get started</TextSwapButton>
      <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
        Hover to swap the label
      </span>
    </div>
  );
}
