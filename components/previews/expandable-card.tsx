"use client";

import { ExpandableCard } from "@/components/ui/card/expandable-card";

export default function ExpandableCardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <ExpandableCard
        className="w-full max-w-md"
        title="What does Nyra Pro unlock?"
        summary="A short answer. Click to read more."
        defaultOpen
      >
        Every premium component, full-page templates, lifetime updates, and a
        commercial license — for a single one-time payment, or as a monthly
        subscription. Cancel any time.
      </ExpandableCard>
    </div>
  );
}
