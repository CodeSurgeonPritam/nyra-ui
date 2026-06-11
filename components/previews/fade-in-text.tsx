"use client";

import { FadeInText } from "@/components/ui/text/fade-in-text";

export default function FadeInTextPreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 p-10 text-center">
      <FadeInText from="up" delay={0}>
        <h3 className="font-serif text-3xl leading-tight">From below.</h3>
      </FadeInText>
      <FadeInText from="left" delay={0.1}>
        <p className="text-sm text-foreground-muted">From the left, a beat later.</p>
      </FadeInText>
      <FadeInText from="blur" delay={0.25}>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          From a blur, last.
        </span>
      </FadeInText>
    </div>
  );
}
