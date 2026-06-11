"use client";

import { WordRotator } from "@/components/ui/text/word-rotator";

export default function WordRotatorPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-10">
      <h3 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
        Built for{" "}
        <WordRotator
          words={["founders", "designers", "agencies", "indies"]}
          className="text-accent italic"
        />
        .
      </h3>
    </div>
  );
}
