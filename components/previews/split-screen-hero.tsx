"use client";

import { SplitScreenHero } from "@/components/ui/hero/split-screen-hero";
import { NyraMark } from "@/components/icons/nyra-mark";

export default function SplitScreenHeroPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <SplitScreenHero
        className="w-full max-w-5xl"
        left={
          <div className="flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
              Ship faster
            </span>
            <h3 className="font-serif text-4xl leading-tight sm:text-5xl">
              Two columns, <em className="italic text-accent">one shape</em>.
            </h3>
            <p className="max-w-md text-sm text-foreground-muted">
              Editorial copy on the left. The visual that earns it on the right.
              Stacks gracefully on mobile.
            </p>
          </div>
        }
        right={
          <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-3 p-8">
            <NyraMark size={48} className="text-accent" />
            <span className="font-serif text-2xl italic">nyra</span>
          </div>
        }
      />
    </div>
  );
}
