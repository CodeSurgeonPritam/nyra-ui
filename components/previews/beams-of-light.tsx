"use client";

import { BeamsOfLight } from "@/components/ui/background/beams-of-light";

export default function BeamsOfLightPreview() {
  return (
    <div className="relative flex h-full min-h-[280px] w-full items-center justify-center overflow-hidden">
      <BeamsOfLight />
      <h3 className="relative font-serif text-4xl italic">Three quiet beams.</h3>
    </div>
  );
}
