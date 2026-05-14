"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

type FloatingDockItem = {
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
};

type FloatingDockProps = {
  items: FloatingDockItem[];
  className?: string;
};

/**
 * macOS-style dock. Each item grows as the cursor approaches it,
 * spring-smoothed so the transition feels physical rather than scripted.
 */
export function FloatingDock({ items, className }: FloatingDockProps) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      className={cn(
        "mx-auto flex h-14 items-end gap-3 rounded-2xl border border-border bg-surface/80 px-3 pb-2 backdrop-blur",
        className,
      )}
    >
      {items.map((item) => (
        <DockIcon key={item.label} mouseX={mouseX} item={item} />
      ))}
    </div>
  );
}

function DockIcon({
  mouseX,
  item,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  item: FloatingDockItem;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const distance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: 0,
    };
    return val - rect.x - rect.width / 2;
  });
  const sizeRaw = useTransform(distance, [-120, 0, 120], [38, 62, 38]);
  const size = useSpring(sizeRaw, { mass: 0.1, stiffness: 180, damping: 14 });

  const inner = (
    <motion.button
      ref={ref}
      style={{ width: size, height: size }}
      type="button"
      onClick={item.onClick}
      aria-label={item.label}
      className="flex items-center justify-center rounded-xl border border-border bg-background text-foreground-muted transition-colors hover:text-foreground"
    >
      {item.icon}
    </motion.button>
  );

  if (item.href) {
    return (
      <a href={item.href} aria-label={item.label}>
        {inner}
      </a>
    );
  }
  return inner;
}
