"use client";

import { BorderDrawButton } from "@/components/ui/button/border-draw-button";

export default function BorderDrawButtonPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-10">
      <BorderDrawButton>Trace the edge</BorderDrawButton>
    </div>
  );
}
