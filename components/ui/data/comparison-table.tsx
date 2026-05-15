"use client";

import { type ReactNode } from "react";
import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

type ComparisonPlan = {
  name: string;
  description?: string;
  featured?: boolean;
  cta?: ReactNode;
};

type ComparisonRow = {
  label: string;
  /** Per-plan value: `true` → check, `false` → dash, string/number → literal. */
  values: (boolean | string | number)[];
};

type ComparisonGroup = {
  title?: string;
  rows: ComparisonRow[];
};

type ComparisonTableProps = {
  plans: ComparisonPlan[];
  groups: ComparisonGroup[];
  className?: string;
};

/**
 * Feature-comparison table for pricing or product tiers. Renders a
 * sticky header row, optional row groups with section labels, and
 * highlights the featured column.
 */
export function ComparisonTable({
  plans,
  groups,
  className,
}: ComparisonTableProps) {
  const cols = plans.length + 1;
  const gridTemplate = `minmax(180px, 1.4fr) repeat(${plans.length}, minmax(110px, 1fr))`;

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-border bg-surface",
        className,
      )}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 border-b border-border bg-surface/95 backdrop-blur"
        style={{ display: "grid", gridTemplateColumns: gridTemplate }}
      >
        <div className="px-5 py-5 text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
          Compare
        </div>
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "flex flex-col gap-2 px-5 py-5",
              plan.featured && "bg-accent/[0.06]",
            )}
          >
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl">{plan.name}</span>
              {plan.featured && (
                <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-accent-foreground">
                  Best
                </span>
              )}
            </div>
            {plan.description && (
              <span className="text-xs text-foreground-muted">
                {plan.description}
              </span>
            )}
            {plan.cta && <div className="pt-1">{plan.cta}</div>}
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="divide-y divide-border">
        {groups.map((group) => (
          <div key={group.title ?? Math.random()}>
            {group.title && (
              <div
                className="bg-foreground/[0.02] px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] text-foreground-muted"
                style={{ gridColumn: `1 / span ${cols}` }}
              >
                {group.title}
              </div>
            )}
            {group.rows.map((row) => (
              <div
                key={row.label}
                style={{ display: "grid", gridTemplateColumns: gridTemplate }}
                className="border-t border-border/60"
              >
                <div className="px-5 py-3 text-sm text-foreground">
                  {row.label}
                </div>
                {row.values.map((v, j) => (
                  <div
                    key={j}
                    className={cn(
                      "flex items-center px-5 py-3 text-sm",
                      plans[j]?.featured && "bg-accent/[0.05]",
                    )}
                  >
                    <Value v={v} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Value({ v }: { v: boolean | string | number }) {
  if (v === true) {
    return <Check className="h-4 w-4 text-accent" aria-label="Included" />;
  }
  if (v === false) {
    return (
      <Minus
        className="h-4 w-4 text-foreground-muted/60"
        aria-label="Not included"
      />
    );
  }
  return <span className="text-foreground-muted">{v}</span>;
}
