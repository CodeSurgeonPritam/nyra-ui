"use client";

import { ComparisonTable } from "@/components/ui/data/comparison-table";

export default function ComparisonTablePreview() {
  return (
    <div className="flex h-full w-full items-start justify-center overflow-y-auto p-8">
      <ComparisonTable
        className="w-full max-w-3xl"
        plans={[
          { name: "Free", description: "Open-source forever" },
          {
            name: "Pro",
            description: "All components, lifetime updates",
            featured: true,
            cta: (
              <button className="rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground">
                Get Pro
              </button>
            ),
          },
          { name: "Team", description: "Up to 10 seats" },
        ]}
        groups={[
          {
            title: "Catalog",
            rows: [
              { label: "Free components", values: [true, true, true] },
              { label: "Pro components", values: [false, true, true] },
              { label: "Full-page templates", values: [false, true, true] },
            ],
          },
          {
            title: "Support",
            rows: [
              { label: "Community Discord", values: [true, true, true] },
              { label: "Priority support", values: [false, true, true] },
              { label: "Seats", values: [1, 1, 10] },
            ],
          },
        ]}
      />
    </div>
  );
}
