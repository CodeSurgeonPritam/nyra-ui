"use client";

import { Bell, Github, Sparkles, Twitter } from "lucide-react";

import { Tooltip } from "@/components/ui/form/tooltip";

export default function TooltipPreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-10">
      <div className="flex items-center gap-3">
        <Tooltip content="Notifications" side="top">
          <IconButton>
            <Bell className="h-4 w-4" />
          </IconButton>
        </Tooltip>
        <Tooltip content="Star on GitHub" side="top">
          <IconButton>
            <Github className="h-4 w-4" />
          </IconButton>
        </Tooltip>
        <Tooltip content="What's new" side="top">
          <IconButton>
            <Sparkles className="h-4 w-4" />
          </IconButton>
        </Tooltip>
        <Tooltip content="@nyra" side="top">
          <IconButton>
            <Twitter className="h-4 w-4" />
          </IconButton>
        </Tooltip>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-foreground-muted">
        <Tooltip content="Appears above" side="top">
          <span className="cursor-help underline decoration-dotted">top</span>
        </Tooltip>
        <Tooltip content="Appears to the right" side="right">
          <span className="cursor-help underline decoration-dotted">right</span>
        </Tooltip>
        <Tooltip content="Appears below" side="bottom">
          <span className="cursor-help underline decoration-dotted">bottom</span>
        </Tooltip>
        <Tooltip content="Appears to the left" side="left">
          <span className="cursor-help underline decoration-dotted">left</span>
        </Tooltip>
      </div>
    </div>
  );
}

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-foreground-muted transition-colors hover:text-foreground hover:border-foreground/30"
    >
      {children}
    </button>
  );
}
