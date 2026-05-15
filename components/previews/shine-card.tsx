"use client";

import { ShineCard } from "@/components/ui/card/shine-card";
import { NyraMark } from "@/components/icons/nyra-mark";

export default function ShineCardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-10">
      <ShineCard className="w-72">
        <div className="flex flex-col gap-4 p-6">
          <NyraMark size={18} className="text-accent" />
          <div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
              Hover the card
            </span>
            <h3 className="mt-1 font-serif text-2xl leading-tight">
              A specular sweep.
            </h3>
          </div>
          <p className="text-xs leading-relaxed text-foreground-muted">
            Pure CSS — one pseudo-element, one transform. No JS in the
            runtime path.
          </p>
        </div>
      </ShineCard>
    </div>
  );
}
