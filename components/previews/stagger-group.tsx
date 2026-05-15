"use client";

import { StaggerGroup } from "@/components/ui/text/stagger-group";

const ITEMS = [
  { title: "Editorial typography", note: "Instrument Serif + JetBrains Mono" },
  { title: "Electric lime accent", note: "Signature, not optional" },
  { title: "Motion-first", note: "Every component animates with intent" },
  { title: "Forty-plus components", note: "And counting" },
];

export default function StaggerGroupPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-10">
      <StaggerGroup className="w-full max-w-md" stagger={0.1}>
        {ITEMS.map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3"
          >
            <span className="mt-1 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <div className="flex flex-col">
              <span className="text-sm text-foreground">{item.title}</span>
              <span className="text-xs text-foreground-muted">{item.note}</span>
            </div>
          </div>
        ))}
      </StaggerGroup>
    </div>
  );
}
