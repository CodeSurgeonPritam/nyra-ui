"use client";

import { ShimmerText } from "@/components/ui/text/shimmer-text";

export default function ShimmerTextPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-10">
      <ShimmerText
        as="h3"
        className="font-serif text-4xl italic leading-none tracking-tight sm:text-5xl"
        duration={3.6}
      >
        a quiet shimmer
      </ShimmerText>
    </div>
  );
}
