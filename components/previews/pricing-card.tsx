"use client";

import { PricingCard } from "@/components/ui/data/pricing-card";

export default function PricingCardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <PricingCard
        className="w-full max-w-3xl"
        plans={[
          {
            name: "Free",
            description: "Open-source components, copy-paste forever.",
            monthly: 0,
            yearly: 0,
            features: ["60% of catalog", "Discord access", "MIT license"],
            cta: "Browse",
          },
          {
            name: "Pro",
            description: "Every component + templates, lifetime updates.",
            monthly: 19,
            yearly: 182,
            features: [
              "All components",
              "Full-page templates",
              "Priority support",
            ],
            cta: "Get Pro",
            featured: true,
          },
          {
            name: "Team",
            description: "Pro for up to 10 seats, with a shared license.",
            monthly: 49,
            yearly: 470,
            features: ["Everything in Pro", "10 seats", "Invoicing"],
            cta: "Contact",
          },
        ]}
      />
    </div>
  );
}
