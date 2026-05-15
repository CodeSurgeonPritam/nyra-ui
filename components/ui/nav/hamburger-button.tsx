"use client";

import { type ComponentPropsWithoutRef, type MouseEvent } from "react";

import { cn } from "@/lib/utils";

type HamburgerButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "onChange"
> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

/**
 * Three-bar icon that morphs into an X. Top bar drops + rotates 45°,
 * middle fades, bottom bar rises + rotates -45°. Controlled — pair with
 * `MobileDrawer` or any disclosure.
 */
export function HamburgerButton({
  className,
  open = false,
  onOpenChange,
  onClick,
  ...props
}: HamburgerButtonProps) {
  function handle(event: MouseEvent<HTMLButtonElement>) {
    onOpenChange?.(!open);
    onClick?.(event);
  }

  return (
    <button
      type="button"
      onClick={handle}
      aria-pressed={open}
      aria-label={open ? "Close menu" : "Open menu"}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-foreground-muted transition-colors hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className,
      )}
      {...props}
    >
      <span className="relative inline-block h-3.5 w-4">
        <span
          className={cn(
            "absolute left-0 top-0 h-[1.5px] w-full origin-center bg-current transition-all duration-300 ease-out",
            open && "top-[6px] rotate-45",
          )}
        />
        <span
          className={cn(
            "absolute left-0 top-[6px] h-[1.5px] w-full bg-current transition-opacity duration-200 ease-out",
            open && "opacity-0",
          )}
        />
        <span
          className={cn(
            "absolute left-0 bottom-0 h-[1.5px] w-full origin-center bg-current transition-all duration-300 ease-out",
            open && "bottom-[6px] -rotate-45",
          )}
        />
      </span>
    </button>
  );
}
