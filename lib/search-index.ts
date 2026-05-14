/**
 * Static search index for the cmd+K palette.
 *
 * Built from the registry plus a hand-curated set of doc pages. Pure data
 * with no React imports — safe to consume from server and client alike.
 *
 * When docs or component count grows past ~100 entries, swap this for a
 * Pagefind post-build indexer. For now, instant in-memory filtering wins
 * on simplicity.
 */

import { registry, type Category } from "./registry";

export type SearchEntry = {
  id: string;
  title: string;
  description: string;
  href: string;
  kind: "component" | "docs";
  category?: Category;
  tags?: string[];
  pro?: boolean;
};

const DOCS_ENTRIES: SearchEntry[] = [
  {
    id: "docs-introduction",
    title: "Introduction",
    description: "What Nyra is and how to read these docs.",
    href: "/docs",
    kind: "docs",
  },
  {
    id: "docs-installation",
    title: "Installation",
    description: "Get a Next.js project ready for Nyra components.",
    href: "/docs/installation",
    kind: "docs",
  },
  {
    id: "docs-theming",
    title: "Theming",
    description: "Override design tokens and swap themes.",
    href: "/docs/theming",
    kind: "docs",
  },
  {
    id: "docs-components-overview",
    title: "Components",
    description: "A map of the catalog by category.",
    href: "/docs/components-overview",
    kind: "docs",
  },
  {
    id: "pricing",
    title: "Pricing",
    description: "Free forever. Pro unlocks the full catalog and templates.",
    href: "/pricing",
    kind: "docs",
  },
];

export function getSearchEntries(): SearchEntry[] {
  const components: SearchEntry[] = registry.map((c) => ({
    id: `component-${c.slug}`,
    title: c.name,
    description: c.description,
    href: `/components/${c.slug}`,
    kind: "component",
    category: c.category,
    tags: c.tags,
    pro: c.pro,
  }));
  return [...DOCS_ENTRIES, ...components];
}

/**
 * Tokenized substring match. Splits the query on whitespace and requires
 * every token to appear in title/description/tags. Cheap, predictable,
 * good enough for ≤200 entries.
 */
export function filterEntries(
  entries: SearchEntry[],
  query: string,
): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return entries;
  const tokens = q.split(/\s+/);
  return entries.filter((e) => {
    const haystack = [
      e.title,
      e.description,
      ...(e.tags ?? []),
      e.category ?? "",
      e.kind,
    ]
      .join(" ")
      .toLowerCase();
    return tokens.every((t) => haystack.includes(t));
  });
}
