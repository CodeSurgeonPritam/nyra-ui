"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  features: string[];
  cta: string;
  featured?: boolean;
};

type PricingCardProps = {
  plans: Plan[];
  className?: string;
};

/**
 * Pricing grid with a monthly/yearly toggle. The featured plan is lifted
 * with the accent token and a slightly heavier border. Prices update with a
 * snappy crossfade rather than rerendering the whole card.
 */
export function PricingCard({ plans, className }: PricingCardProps) {
  const [yearly, setYearly] = useState(false);

  return (
    <div className={cn("flex flex-col items-center gap-8", className)}>
      <div className="inline-flex rounded-full border border-border bg-surface p-1 text-xs uppercase tracking-[0.16em]">
        <button
          type="button"
          onClick={() => setYearly(false)}
          className={cn(
            "rounded-full px-3 py-1.5 transition-colors",
            !yearly
              ? "bg-foreground text-background"
              : "text-foreground-muted hover:text-foreground",
          )}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setYearly(true)}
          className={cn(
            "rounded-full px-3 py-1.5 transition-colors",
            yearly
              ? "bg-foreground text-background"
              : "text-foreground-muted hover:text-foreground",
          )}
        >
          Yearly
          <span className="ml-1.5 text-[10px] text-accent">−20%</span>
        </button>
      </div>

      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
        {plans.map((plan) => {
          const price = yearly ? plan.yearly : plan.monthly;
          return (
            <div
              key={plan.name}
              className={cn(
                "flex flex-col gap-6 rounded-2xl border bg-surface p-6 transition-colors",
                plan.featured
                  ? "border-accent/50 shadow-[0_0_0_1px_color-mix(in_oklab,var(--accent)_30%,transparent)]"
                  : "border-border",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-serif text-2xl">{plan.name}</h3>
                {plan.featured ? (
                  <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-accent">
                    Popular
                  </span>
                ) : null}
              </div>

              <p className="text-xs text-foreground-muted">{plan.description}</p>

              <div className="flex items-baseline gap-1">
                <span className="font-serif text-5xl tracking-tight">
                  ${price}
                </span>
                <span className="text-xs text-foreground-muted">
                  /{yearly ? "yr" : "mo"}
                </span>
              </div>

              <ul className="flex flex-col gap-2 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check
                      className={cn(
                        "mt-0.5 h-3.5 w-3.5 shrink-0",
                        plan.featured ? "text-accent" : "text-foreground-muted",
                      )}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={cn(
                  "mt-2 inline-flex h-10 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  plan.featured
                    ? "bg-accent text-accent-foreground hover:bg-accent/90"
                    : "border border-border text-foreground hover:border-foreground/30",
                )}
              >
                {plan.cta}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
