"use client";

import { MaskRevealText } from "@/components/ui/text/mask-reveal-text";

export default function MaskRevealTextPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-10">
      <MaskRevealText
        className="font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl"
        lines={[
          "Components for",
          "interfaces that",
          <>
            feel <em className="italic text-accent">alive</em>.
          </>,
        ]}
      />
    </div>
  );
}
