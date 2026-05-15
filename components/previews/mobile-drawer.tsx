"use client";

import { useState } from "react";

import { HamburgerButton } from "@/components/ui/nav/hamburger-button";
import { MobileDrawer } from "@/components/ui/nav/mobile-drawer";
import { NyraMark } from "@/components/icons/nyra-mark";

export default function MobileDrawerPreview() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-10">
      <HamburgerButton open={open} onOpenChange={setOpen} />
      <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
        Click to open the drawer
      </span>
      <MobileDrawer
        open={open}
        onOpenChange={setOpen}
        title={
          <span className="inline-flex items-center gap-2">
            <NyraMark size={14} className="text-accent" />
            nyra
          </span>
        }
      >
        <ul className="flex flex-col gap-1 text-sm">
          {["Components", "Templates", "Docs", "Pricing", "Changelog"].map(
            (label) => (
              <li key={label}>
                <a
                  href="#"
                  className="flex items-center justify-between rounded-md px-2 py-2.5 text-foreground-muted transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
                >
                  {label}
                </a>
              </li>
            ),
          )}
        </ul>
      </MobileDrawer>
    </div>
  );
}
