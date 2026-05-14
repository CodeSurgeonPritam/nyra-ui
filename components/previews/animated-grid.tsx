"use client";

import { AnimatedGrid } from "@/components/ui/background/animated-grid";

export default function AnimatedGridPreview() {
  return (
    <div className="relative flex h-full min-h-[280px] w-full items-center justify-center overflow-hidden">
      <AnimatedGrid />
      <h3 className="relative font-serif text-4xl italic">
        A grid that drifts.
      </h3>
    </div>
  );
}
