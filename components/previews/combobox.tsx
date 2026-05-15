"use client";

import { useState } from "react";

import { Combobox } from "@/components/ui/form/combobox";

const OPTIONS = [
  { value: "magnetic-button", label: "Magnetic Button", description: "Cursor-following CTA" },
  { value: "aurora-background", label: "Aurora Background", description: "Drifting gradient" },
  { value: "tilt-card", label: "Tilt Card", description: "3D tilt on hover" },
  { value: "sparkles", label: "Sparkles", description: "Twinkling star field" },
  { value: "shimmer-text", label: "Shimmer Text", description: "Specular highlight" },
  { value: "spotlight-hero", label: "Spotlight Hero", description: "Cursor-tracking light" },
  { value: "marquee", label: "Marquee", description: "Infinite logo scroll" },
];

export default function ComboboxPreview() {
  const [value, setValue] = useState<string>();
  return (
    <div className="flex h-full w-full items-start justify-center p-10 pt-20">
      <div className="flex w-full max-w-sm flex-col gap-2">
        <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          Find a component
        </span>
        <Combobox
          options={OPTIONS}
          value={value}
          onChange={setValue}
          placeholder="Browse components…"
        />
      </div>
    </div>
  );
}
