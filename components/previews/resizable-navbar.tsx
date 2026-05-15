"use client";

import { ResizableNavbar } from "@/components/ui/nav/resizable-navbar";
import { NyraMark } from "@/components/icons/nyra-mark";

export default function ResizableNavbarPreview() {
  return (
    <div className="relative h-full w-full overflow-y-auto">
      <ResizableNavbar>
        <div className="flex items-center gap-2">
          <NyraMark size={14} className="text-accent" />
          <span className="font-serif text-lg italic">nyra</span>
        </div>
        <nav className="flex items-center gap-5 text-[11px] uppercase tracking-[0.16em] text-foreground-muted">
          <span>Components</span>
          <span>Docs</span>
          <span>Pricing</span>
        </nav>
        <button className="rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground">
          Get Pro
        </button>
      </ResizableNavbar>
      <div className="px-6 pt-16 pb-32">
        <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          ↓ Scroll to watch it shrink
        </span>
        <div className="mt-12 grid gap-12 text-foreground-muted">
          {Array.from({ length: 8 }).map((_, i) => (
            <p
              key={i}
              className="font-serif text-2xl leading-tight text-foreground/30"
            >
              Components for interfaces that feel alive.
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
