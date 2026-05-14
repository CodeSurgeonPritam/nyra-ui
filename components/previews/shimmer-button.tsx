"use client";

import { ShimmerButton } from "@/components/ui/button/shimmer-button";

export default function ShimmerButtonPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-10">
      <ShimmerButton>Ship something beautiful</ShimmerButton>
    </div>
  );
}
