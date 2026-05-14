"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";

import {
  activeCategories,
  registry,
  type Category,
  type NyraComponent,
} from "@/lib/registry";
import { ComponentPreview } from "@/components/site/component-preview";
import { NyraMark } from "@/components/icons/nyra-mark";
import { SearchTrigger } from "@/components/site/search-trigger";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";

type Filter = Category | "all";

export default function ComponentsPage() {
  const [filter, setFilter] = React.useState<Filter>("all");
  const [query, setQuery] = React.useState("");

  const visible = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return registry.filter((c) => {
      const matchesCategory = filter === "all" || c.category === filter;
      const matchesQuery =
        q.length === 0 ||
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [filter, query]);

  return (
    <main className="min-h-dvh">
      <header className="flex items-center justify-between border-b border-border px-6 py-5 sm:px-10">
        <Link href="/" className="flex items-center gap-2">
          <NyraMark size={16} className="text-accent" />
          <span className="font-serif text-xl italic leading-none tracking-tight">
            nyra
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <SearchTrigger />
          <ThemeToggle />
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-10 sm:py-16">
        <div className="flex flex-col gap-3">
          <span className="text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
            The catalog
          </span>
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl">
            Components.
          </h1>
          <p className="max-w-xl text-sm text-foreground-muted sm:text-base">
            {registry.length} components and counting. Hover any tile for the
            live demo. Click through for the code.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search components, tags…"
              aria-label="Search components"
              className="w-full rounded-md border border-border bg-surface py-2 pl-9 pr-3 text-sm placeholder:text-foreground-muted focus:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div className="-mx-2 flex flex-wrap items-center gap-1 overflow-x-auto px-2 sm:mx-0 sm:px-0">
            <FilterChip
              label="All"
              active={filter === "all"}
              onClick={() => setFilter("all")}
            />
            {activeCategories().map((c) => (
              <FilterChip
                key={c.id}
                label={c.label}
                active={filter === c.id}
                onClick={() => setFilter(c.id)}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => (
            <ComponentTile key={c.slug} component={c} />
          ))}
        </div>

        {visible.length === 0 ? (
          <div className="mt-20 flex flex-col items-center gap-2 text-center text-sm text-foreground-muted">
            <span className="font-serif text-3xl italic text-foreground">
              Nothing here.
            </span>
            <span>Try a different filter or clear the search.</span>
          </div>
        ) : null}
      </section>
    </main>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs transition-colors",
        active
          ? "border-foreground/20 bg-foreground text-background"
          : "border-border text-foreground-muted hover:text-foreground hover:border-foreground/30",
      )}
    >
      {label}
    </button>
  );
}

function ComponentTile({ component }: { component: NyraComponent }) {
  return (
    <Link
      href={`/components/${component.slug}`}
      className="group block focus:outline-none"
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-surface transition-colors group-hover:border-foreground/20 group-focus-visible:ring-2 group-focus-visible:ring-accent">
        <ComponentPreview
          slug={component.slug}
          minHeight={220}
          className="rounded-none border-0"
        />
        <div className="flex items-start justify-between gap-4 border-t border-border p-5">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-sm font-medium">{component.name}</h2>
              {component.pro ? (
                <span className="rounded-full border border-accent/40 bg-accent/10 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.16em] text-accent">
                  Pro
                </span>
              ) : null}
            </div>
            <p className="mt-1 line-clamp-2 text-xs text-foreground-muted">
              {component.description}
            </p>
          </div>
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-foreground-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>
      </div>
    </Link>
  );
}
