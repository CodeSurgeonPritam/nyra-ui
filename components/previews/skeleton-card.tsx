"use client";

import { SkeletonCard } from "@/components/ui/card/skeleton-card";

export default function SkeletonCardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3">
        <SkeletonCard lines={3} />
        <SkeletonCard lines={2} hasMedia />
        <SkeletonCard lines={4} />
      </div>
    </div>
  );
}
