"use client";

import { Marquee } from "@/components/ui/data/marquee";

const names = [
  "Lyra Labs",
  "Halftone",
  "Constellate",
  "Northwind",
  "Atelier 03",
  "Bondi",
  "Pareto",
  "Stellate",
];

export default function MarqueePreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-10 py-8">
      <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
        Trusted by
      </span>
      <Marquee speed={28} className="w-full">
        {names.map((name) => (
          <span
            key={name}
            className="whitespace-nowrap font-serif text-2xl italic text-foreground-muted"
          >
            {name}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
