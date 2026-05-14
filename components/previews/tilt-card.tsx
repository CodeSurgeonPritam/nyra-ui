"use client";

import { TiltCard } from "@/components/ui/card/tilt-card";

export default function TiltCardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-10">
      <TiltCard className="w-64">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
            Featured
          </span>
          <h3 className="mt-3 font-serif text-2xl leading-tight">
            Tilt toward
            <br />
            the cursor.
          </h3>
          <p className="mt-3 text-xs text-foreground-muted">
            Smooth, spring-driven, GPU-friendly.
          </p>
        </div>
      </TiltCard>
    </div>
  );
}
