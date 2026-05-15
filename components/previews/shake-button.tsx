"use client";

import { ShakeButton } from "@/components/ui/button/shake-button";

export default function ShakeButtonPreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-10">
      <ShakeButton shakeOnClick>Try again</ShakeButton>
      <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
        Click for the error shake
      </span>
    </div>
  );
}
