"use client";

import { LogoCloud } from "@/components/ui/data/logo-cloud";

const NAMES = [
  "Lyra Labs",
  "Halftone",
  "Constellate",
  "Northwind",
  "Atelier 03",
  "Bondi",
  "Pareto",
  "Stellate",
];

export default function LogoCloudPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-10">
      <div className="flex w-full max-w-3xl flex-col items-center gap-8">
        <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          Trusted by
        </span>
        <LogoCloud
          columns={4}
          logos={NAMES.map((name) => ({
            logo: (
              <span className="font-serif text-xl italic">{name}</span>
            ),
            label: name,
          }))}
        />
      </div>
    </div>
  );
}
