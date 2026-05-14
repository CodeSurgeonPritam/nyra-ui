"use client";

import { TypingAnimation } from "@/components/ui/text/typing-animation";

export default function TypingAnimationPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-10 text-center">
      <TypingAnimation
        text="$ pnpm dlx nyra@latest add magnetic-button"
        className="font-mono text-sm sm:text-base"
        speed={36}
      />
    </div>
  );
}
