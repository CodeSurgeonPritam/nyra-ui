"use client";

import { StackCard } from "@/components/ui/card/stack-card";

const items = [
  {
    id: 1,
    title: "Aurora",
    detail: "Layered radial-gradient drift, four-color palette.",
  },
  {
    id: 2,
    title: "Spotlight",
    detail: "Spring-smoothed cursor halo, follows on hover.",
  },
  {
    id: 3,
    title: "Sparkles",
    detail: "Twinkling four-point stars, scattered randomly.",
  },
];

export default function StackCardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-10">
      <StackCard
        items={items}
        renderItem={(item) => (
          <div className="flex h-full flex-col justify-between">
            <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
              Drag to dismiss
            </span>
            <div>
              <div className="font-serif text-3xl">{item.title}</div>
              <p className="mt-2 text-sm text-foreground-muted">{item.detail}</p>
            </div>
          </div>
        )}
      />
    </div>
  );
}
