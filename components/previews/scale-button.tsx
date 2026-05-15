"use client";

import { ScaleButton } from "@/components/ui/button/scale-button";

export default function ScaleButtonPreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-10">
      <ScaleButton>Hover me</ScaleButton>
      <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
        Spring scale on hover · press
      </span>
    </div>
  );
}
