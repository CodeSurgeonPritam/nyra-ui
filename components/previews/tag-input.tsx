"use client";

import { useState } from "react";

import { TagInput } from "@/components/ui/form/tag-input";

export default function TagInputPreview() {
  const [tags, setTags] = useState<string[]>([
    "react",
    "motion",
    "editorial",
  ]);
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex w-full max-w-md flex-col gap-2">
        <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          Project tags
        </span>
        <TagInput
          value={tags}
          onChange={setTags}
          max={8}
          placeholder="Type and press Enter…"
        />
        <span className="text-xs text-foreground-muted">
          Try pasting <code className="rounded border border-border bg-surface px-1 font-mono text-[11px]">tailwind, accessibility, ssr</code>
        </span>
      </div>
    </div>
  );
}
