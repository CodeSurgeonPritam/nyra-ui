import { Info, AlertTriangle, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "tip";

type CalloutProps = {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
};

const ICONS: Record<CalloutType, typeof Info> = {
  info: Info,
  warning: AlertTriangle,
  tip: Lightbulb,
};

const TINT: Record<CalloutType, string> = {
  info: "border-foreground/20 bg-foreground/[0.03]",
  warning: "border-rose/40 bg-rose/[0.06]",
  tip: "border-accent/40 bg-accent/[0.06]",
};

const ICON_TINT: Record<CalloutType, string> = {
  info: "text-foreground-muted",
  warning: "text-rose",
  tip: "text-accent",
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const Icon = ICONS[type];
  return (
    <aside
      className={cn(
        "my-6 flex gap-3 rounded-xl border px-4 py-3.5",
        TINT[type],
      )}
    >
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", ICON_TINT[type])} aria-hidden />
      <div className="flex flex-col gap-1 text-sm">
        {title ? <p className="font-medium text-foreground">{title}</p> : null}
        <div className="text-foreground/80 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </aside>
  );
}
