"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LayoutGrid, Sparkles, Twitter } from "lucide-react";

import {
  activeCategories,
  registry,
  type Category,
  type NyraComponent,
} from "@/lib/registry";
import { NyraMark } from "@/components/icons/nyra-mark";
import { cn } from "@/lib/utils";

const NEW_WINDOW_DAYS = 7;

export function CatalogSidebar() {
  const pathname = usePathname();
  const categories = React.useMemo(() => activeCategories(), []);
  const grouped = React.useMemo(() => {
    const map = new Map<Category, NyraComponent[]>();
    for (const c of registry) {
      const list = map.get(c.category) ?? [];
      list.push(c);
      map.set(c.category, list);
    }
    for (const list of map.values()) {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return map;
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-1 text-sm">
      <Section label="Follow for updates" icon={<Twitter className="h-3.5 w-3.5" />}>
        <Leaf
          href="https://x.com/nyra"
          external
          label="X / Twitter"
          active={false}
        />
        <Leaf
          href="https://github.com/CodeSurgeonPritam/nyra-ui"
          external
          label="GitHub"
          active={false}
        />
      </Section>

      <Section label="Get started" icon={<Sparkles className="h-3.5 w-3.5" />}>
        <Leaf
          href="/docs/installation"
          label="Installation"
          active={pathname === "/docs/installation"}
        />
        <Leaf
          href="/docs/theming"
          label="Theming"
          active={pathname === "/docs/theming"}
        />
        <Leaf
          href="/docs/components-overview"
          label="Components overview"
          active={pathname === "/docs/components-overview"}
        />
      </Section>

      <Section
        label="All components"
        icon={<LayoutGrid className="h-3.5 w-3.5" />}
      >
        <Leaf
          href="/components"
          label={
            <span className="flex items-center justify-between">
              <span>Browse all</span>
              <span className="text-foreground-muted/70 text-[10px]">
                {registry.length}
              </span>
            </span>
          }
          active={pathname === "/components"}
        />
      </Section>

      {categories.map((cat) => {
        const items = grouped.get(cat.id) ?? [];
        const hasActive = items.some(
          (c) => pathname === `/components/${c.slug}`,
        );
        return (
          <Section
            key={cat.id}
            label={cat.label}
            defaultOpen={hasActive || cat.id === "background"}
          >
            {items.map((c) => (
              <Leaf
                key={c.slug}
                href={`/components/${c.slug}`}
                label={c.name}
                active={pathname === `/components/${c.slug}`}
                badge={
                  isNew(c.createdAt) ? "new" : c.pro ? "pro" : undefined
                }
              />
            ))}
          </Section>
        );
      })}

      </nav>
      <div className="shrink-0 border-t border-border/60 pt-3 mt-3">
        <SidebarUpsell />
      </div>
    </div>
  );
}

function Section({
  label,
  icon,
  children,
  defaultOpen = false,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left text-[13px]",
          "text-foreground transition-colors hover:bg-foreground/[0.04]",
        )}
      >
        <span className="inline-flex items-center gap-2">
          {icon && <span className="text-foreground-muted">{icon}</span>}
          {label}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-foreground-muted transition-transform",
            !open && "-rotate-90",
          )}
        />
      </button>
      {open && (
        <div className="ml-2 flex flex-col gap-px border-l border-border/70 pl-3 pt-1">
          {children}
        </div>
      )}
    </div>
  );
}

function Leaf({
  href,
  label,
  active,
  badge,
  external,
}: {
  href: string;
  label: React.ReactNode;
  active: boolean;
  badge?: "new" | "pro";
  external?: boolean;
}) {
  const className = cn(
    "group/leaf flex items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-[13px] transition-colors",
    active
      ? "bg-accent/[0.10] text-foreground"
      : "text-foreground-muted hover:bg-foreground/[0.04] hover:text-foreground",
  );

  const inner = (
    <>
      <span className="inline-flex min-w-0 items-center gap-2">
        {active && (
          <NyraMark size={6} className="shrink-0 text-accent" />
        )}
        <span className="truncate">{label}</span>
      </span>
      {badge === "new" && (
        <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.16em] text-accent">
          New
        </span>
      )}
      {badge === "pro" && (
        <span className="rounded-full border border-accent/40 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.16em] text-accent">
          Pro
        </span>
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

function SidebarUpsell() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="relative h-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--accent) 40%, transparent) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 grid grid-cols-3 gap-1 p-2 opacity-60">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="rounded-md border border-border bg-background/40"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="font-serif text-base leading-tight">
          Build faster with Nyra Pro.
        </div>
        <p className="text-[11px] leading-relaxed text-foreground-muted">
          Every component, all templates, lifetime updates — for a single
          one-time payment.
        </p>
        <Link
          href="/pricing"
          className="mt-1 inline-flex items-center justify-center rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-90"
        >
          Get All-Access
        </Link>
        <span className="text-center text-[10px] text-foreground-muted/80">
          Trusted by indie builders worldwide
        </span>
      </div>
    </div>
  );
}

function isNew(iso: string): boolean {
  const created = new Date(iso).getTime();
  if (Number.isNaN(created)) return false;
  const ageMs = Date.now() - created;
  return ageMs < NEW_WINDOW_DAYS * 24 * 60 * 60 * 1000;
}
