"use client";

import { WordReveal } from "@/components/ui/text/word-reveal";

export default function WordRevealPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-10">
      <WordReveal
        className="max-w-md text-center"
        text="Interfaces that read like editorial design — one word at a time."
      />
    </div>
  );
}
