"use client";

import { GradientText } from "@/components/ui/text/gradient-text";

export default function GradientTextPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-10">
      <GradientText
        as="h2"
        className="font-serif text-5xl italic leading-none tracking-tight sm:text-6xl"
      >
        feels alive
      </GradientText>
    </div>
  );
}
