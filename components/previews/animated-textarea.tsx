"use client";

import { AnimatedTextarea } from "@/components/ui/form/animated-textarea";

export default function AnimatedTextareaPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <AnimatedTextarea
        className="max-w-md"
        label="What would you build with Nyra?"
        placeholder="Tell us about your project…"
        maxLength={240}
      />
    </div>
  );
}
