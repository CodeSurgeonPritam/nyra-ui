"use client";

import { LoadingButton } from "@/components/ui/button/loading-button";

export default function LoadingButtonPreview() {
  async function fakeSubmit() {
    await new Promise((resolve) => window.setTimeout(resolve, 1400));
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-10">
      <LoadingButton onClick={fakeSubmit} loadingLabel="Saving" successLabel="Saved">
        Save changes
      </LoadingButton>
      <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
        Click — idle → loading → success
      </span>
    </div>
  );
}
