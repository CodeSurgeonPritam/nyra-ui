"use client";

import { AutoHideNavbar } from "@/components/ui/nav/auto-hide-navbar";
import { NyraMark } from "@/components/icons/nyra-mark";

export default function AutoHideNavbarPreview() {
  return (
    <div className="relative h-full w-full overflow-y-auto bg-background">
      <AutoHideNavbar>
        <div className="flex items-center justify-between border-b border-border bg-background/85 px-6 py-3 backdrop-blur">
          <div className="flex items-center gap-2">
            <NyraMark size={14} className="text-accent" />
            <span className="font-serif text-lg italic">nyra</span>
          </div>
          <nav className="flex items-center gap-5 text-[11px] uppercase tracking-[0.16em] text-foreground-muted">
            <span>Components</span>
            <span>Docs</span>
            <span>Pricing</span>
          </nav>
        </div>
      </AutoHideNavbar>
      <div className="px-6 pt-8 pb-32">
        <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          Scroll down to hide · up to show
        </span>
        <div className="mt-10 flex flex-col gap-12 text-foreground/30">
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i} className="font-serif text-2xl leading-tight">
              Components for interfaces that feel alive.
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
