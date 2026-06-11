"use client";

import { HighlightText } from "@/components/ui/text/highlight-text";

export default function HighlightTextPreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 p-10 text-center">
      <p className="max-w-md font-serif text-2xl leading-relaxed">
        Nyra is a React library with{" "}
        <HighlightText trigger="always">editorial typography</HighlightText>,{" "}
        <HighlightText trigger="hover">electric accents</HighlightText>, and{" "}
        <HighlightText trigger="hover">original motion</HighlightText>.
      </p>
      <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
        Hover the second and third highlights
      </span>
    </div>
  );
}
