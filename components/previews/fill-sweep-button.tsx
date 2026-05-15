"use client";

import { FillSweepButton } from "@/components/ui/button/fill-sweep-button";

export default function FillSweepButtonPreview() {
  return (
    <div className="flex h-full w-full flex-wrap items-center justify-center gap-4 p-10">
      <FillSweepButton from="left">Sweep from left</FillSweepButton>
      <FillSweepButton from="right">Sweep from right</FillSweepButton>
      <FillSweepButton from="top">Sweep down</FillSweepButton>
      <FillSweepButton from="bottom">Sweep up</FillSweepButton>
    </div>
  );
}
