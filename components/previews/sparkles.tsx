"use client";

import { Sparkles } from "@/components/ui/background/sparkles";

export default function SparklesPreview() {
  return (
    <div className="relative flex h-full min-h-[280px] w-full items-center justify-center overflow-hidden p-10">
      <Sparkles count={36} />
      <h3 className="relative z-10 font-serif text-3xl italic sm:text-4xl">
        Make it sparkle.
      </h3>
    </div>
  );
}
