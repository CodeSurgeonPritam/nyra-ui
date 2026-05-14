"use client";

import { HoverLiftCard } from "@/components/ui/card/hover-lift-card";

export default function HoverLiftCardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-10">
      <HoverLiftCard className="w-64 p-6">
        <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          Hover me
        </span>
        <h3 className="mt-3 font-serif text-2xl leading-tight">
          Quietly lifted.
        </h3>
        <p className="mt-3 text-xs text-foreground-muted">
          A spring rise, a faint accent halo.
        </p>
      </HoverLiftCard>
    </div>
  );
}
