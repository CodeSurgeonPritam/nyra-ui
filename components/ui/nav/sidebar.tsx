"use client";

import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";

type SidebarItem = {
  icon: ReactNode;
  label: string;
  href?: string;
  active?: boolean;
};

type SidebarProps = {
  items: SidebarItem[];
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  /** Initial open state. */
  defaultOpen?: boolean;
};

/**
 * Vertical sidebar that collapses to an icon rail. Labels fade out as the
 * width contracts; icons stay anchored so the layout never jumps.
 */
export function Sidebar({
  items,
  header,
  footer,
  className,
  defaultOpen = true,
}: SidebarProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.aside
      animate={{ width: open ? 240 : 64 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className={cn(
        "relative flex h-full shrink-0 flex-col gap-2 border-r border-border bg-surface p-3",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 px-1.5 pb-3">
        <motion.div
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.18 }}
          className="overflow-hidden whitespace-nowrap"
        >
          {header}
        </motion.div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:text-foreground"
        >
          <motion.span
            animate={{ rotate: open ? 0 : 180 }}
            transition={{ duration: 0.2 }}
            className="flex"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </motion.span>
        </button>
      </div>

      <nav className="flex flex-col gap-1">
        {items.map((item) => (
          <SidebarLink key={item.label} item={item} open={open} />
        ))}
      </nav>

      {footer && (
        <div className="mt-auto pt-3">
          <motion.div
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            {footer}
          </motion.div>
        </div>
      )}
    </motion.aside>
  );
}

function SidebarLink({ item, open }: { item: SidebarItem; open: boolean }) {
  const Tag = item.href ? "a" : "button";
  return (
    <Tag
      {...(item.href ? { href: item.href } : { type: "button" as const })}
      className={cn(
        "group inline-flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors",
        item.active
          ? "bg-accent/15 text-foreground"
          : "text-foreground-muted hover:bg-foreground/[0.04] hover:text-foreground",
      )}
    >
      <span
        className={cn(
          "inline-flex h-5 w-5 shrink-0 items-center justify-center",
          item.active && "text-accent",
        )}
      >
        {item.icon}
      </span>
      <motion.span
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.18 }}
        className="overflow-hidden whitespace-nowrap"
      >
        {item.label}
      </motion.span>
    </Tag>
  );
}
