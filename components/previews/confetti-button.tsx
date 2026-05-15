"use client";

import { ConfettiButton } from "@/components/ui/button/confetti-button";

export default function ConfettiButtonPreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-10">
      <ConfettiButton>Click me</ConfettiButton>
      <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
        Confetti on every click
      </span>
    </div>
  );
}
