"use client";

import { RippleButton } from "@/components/ui/button/ripple-button";

export default function RippleButtonPreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-10">
      <RippleButton>Tap anywhere</RippleButton>
      <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
        Material-style click ripple
      </span>
    </div>
  );
}
