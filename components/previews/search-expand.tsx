"use client";

import { SearchExpand } from "@/components/ui/nav/search-expand";

export default function SearchExpandPreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-10">
      <SearchExpand />
      <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
        Click the icon to expand
      </span>
    </div>
  );
}
