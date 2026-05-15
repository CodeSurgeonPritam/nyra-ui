"use client";

import { useState } from "react";

import { HamburgerButton } from "@/components/ui/nav/hamburger-button";

export default function HamburgerButtonPreview() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-10">
      <HamburgerButton open={open} onOpenChange={setOpen} />
      <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
        {open ? "Close" : "Open"} — click to morph
      </span>
    </div>
  );
}
