"use client";

import { GlowCard } from "@/components/ui/card/glow-card";

export default function GlowCardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-10">
      <GlowCard className="w-64">
        <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          Pro
        </span>
        <h3 className="mt-3 font-serif text-2xl leading-tight">
          Hover for
          <br />
          the glow.
        </h3>
        <p className="mt-3 text-xs text-foreground-muted">
          A rotating conic border, accent on dwell.
        </p>
      </GlowCard>
    </div>
  );
}
