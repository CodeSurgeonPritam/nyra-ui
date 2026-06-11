"use client";

import { useState } from "react";

import { RadioGroup } from "@/components/ui/form/radio-group";

export default function RadioGroupPreview() {
  const [interval, setInterval] = useState<"monthly" | "yearly" | "lifetime">(
    "yearly",
  );
  const [plan, setPlan] = useState<"free" | "pro" | "team">("pro");

  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex w-full max-w-md flex-col gap-8">
        <div className="flex flex-col items-start gap-2">
          <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
            Billing interval
          </span>
          <RadioGroup
            value={interval}
            onChange={setInterval}
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "yearly", label: "Yearly" },
              { value: "lifetime", label: "Lifetime" },
            ]}
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
            Plan
          </span>
          <RadioGroup
            variant="list"
            className="w-full"
            value={plan}
            onChange={setPlan}
            options={[
              { value: "free", label: "Free", description: "60% of catalog. MIT." },
              {
                value: "pro",
                label: "Pro",
                description: "Every component + templates, lifetime updates.",
              },
              { value: "team", label: "Team", description: "Pro for 10 seats." },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
