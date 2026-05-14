"use client";

import { NumberTicker } from "@/components/ui/text/number-ticker";

export default function NumberTickerPreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-10 text-center">
      <NumberTicker
        value={48293}
        className="font-serif text-6xl tracking-tight text-accent"
      />
      <span className="text-xs uppercase tracking-[0.18em] text-foreground-muted">
        Components copied
      </span>
    </div>
  );
}
