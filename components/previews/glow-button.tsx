"use client";

import { GlowButton } from "@/components/ui/button/glow-button";

export default function GlowButtonPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-10">
      <GlowButton>Hover for a halo</GlowButton>
    </div>
  );
}
