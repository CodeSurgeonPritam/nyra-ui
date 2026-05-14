"use client";

import { useState, type ReactNode } from "react";
import { motion, LayoutGroup } from "motion/react";

import { cn } from "@/lib/utils";

export type AnimatedTab = {
  id: string;
  label: ReactNode;
};

type AnimatedTabsProps = {
  tabs: AnimatedTab[];
  /** Controlled active id. Pass with `onChange` for full control. */
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  className?: string;
};

/**
 * Tab strip with a single sliding accent indicator. Uses LayoutGroup +
 * layoutId so the indicator interpolates between buttons rather than
 * fading in place. Works as either controlled or uncontrolled.
 */
export function AnimatedTabs({
  tabs,
  value,
  defaultValue,
  onChange,
  className,
}: AnimatedTabsProps) {
  const [internal, setInternal] = useState(
    defaultValue ?? value ?? tabs[0]?.id,
  );
  const active = value ?? internal;

  function select(id: string) {
    if (value === undefined) setInternal(id);
    onChange?.(id);
  }

  return (
    <LayoutGroup id="nyra-animated-tabs">
      <div
        role="tablist"
        className={cn(
          "inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1",
          className,
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => select(tab.id)}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "text-accent-foreground"
                  : "text-foreground-muted hover:text-foreground",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="nyra-tab-indicator"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 360, damping: 30 }}
                />
              ) : null}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
