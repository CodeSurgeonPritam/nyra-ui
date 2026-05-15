"use client";

import { BentoGridCard } from "@/components/ui/card/bento-grid-card";

export default function BentoGridCardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <BentoGridCard
        className="w-full max-w-4xl"
        items={[
          {
            title: "Forty components",
            description: "Backgrounds, cards, buttons, navigation.",
            span: "md:col-span-2",
            cta: "Browse →",
          },
          {
            title: "Editorial type",
            description: "Instrument Serif, JetBrains Mono.",
          },
          {
            title: "Electric lime",
            description: "Signature accent.",
          },
          {
            title: "Motion-first",
            description: "Every component animates with intent.",
            span: "md:col-span-2",
            cta: "See it move →",
          },
        ]}
      />
    </div>
  );
}
