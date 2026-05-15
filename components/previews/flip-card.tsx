"use client";

import { FlipCard } from "@/components/ui/card/flip-card";
import { NyraMark } from "@/components/icons/nyra-mark";

export default function FlipCardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-10">
      <FlipCard
        className="h-72 w-56"
        front={
          <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-5">
            <NyraMark size={20} className="text-accent" />
            <div>
              <div className="font-serif text-2xl leading-tight">
                Magnetic Button
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
                Hover to flip →
              </span>
            </div>
          </div>
        }
        back={
          <div className="flex h-full flex-col justify-between rounded-2xl border border-accent/40 bg-accent/[0.08] p-5">
            <span className="text-[10px] uppercase tracking-[0.18em] text-accent">
              Pro · Animated
            </span>
            <p className="text-sm leading-relaxed text-foreground">
              A cursor-following CTA, spring-smoothed. Drop into any hero —
              users will hover it instinctively.
            </p>
          </div>
        }
      />
    </div>
  );
}
