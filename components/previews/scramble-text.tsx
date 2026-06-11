"use client";

import { ScrambleText } from "@/components/ui/text/scramble-text";

export default function ScrambleTextPreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-10">
      <ScrambleText
        text="DECODING THE INTERFACE"
        className="text-2xl tracking-[0.18em]"
        speed={55}
      />
      <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
        Reload the page to re-run
      </span>
    </div>
  );
}
