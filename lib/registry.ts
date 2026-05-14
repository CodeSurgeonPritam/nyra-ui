/**
 * Nyra component registry — the single source of truth for the catalog.
 * Drives the grid, the detail page, search, and (later) the Nyra CLI.
 *
 * Pure metadata, no React imports, so it can be consumed from server and
 * client components without ballooning bundles. Previews are mapped via
 * dynamic imports in `lib/previews.tsx`; raw source is read from disk by
 * `lib/component-source.ts` (server-only).
 */

export type Category =
  | "background"
  | "card"
  | "button"
  | "text"
  | "hero"
  | "nav"
  | "form"
  | "data";

export type NyraComponent = {
  slug: string;
  name: string;
  description: string;
  category: Category;
  tags: string[];
  pro: boolean;
  /** Source files this component ships, relative to `components/ui/`. */
  files: string[];
  /** npm packages the user must install. */
  dependencies: string[];
  /** ISO date string — drives "new" badges and sort order. */
  createdAt: string;
};

export const categories: { id: Category; label: string }[] = [
  { id: "background", label: "Backgrounds" },
  { id: "card", label: "Cards" },
  { id: "button", label: "Buttons" },
  { id: "text", label: "Text Effects" },
  { id: "hero", label: "Heroes" },
  { id: "nav", label: "Navigation" },
  { id: "form", label: "Forms" },
  { id: "data", label: "Data Display" },
];

export const registry: NyraComponent[] = [
  {
    slug: "magnetic-button",
    name: "Magnetic Button",
    description: "A button that pulls toward the cursor on hover.",
    category: "button",
    tags: ["interactive", "animated", "cursor"],
    pro: false,
    files: ["button/magnetic-button.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "shimmer-button",
    name: "Shimmer Button",
    description: "A button with a traveling specular highlight on hover.",
    category: "button",
    tags: ["animated", "subtle"],
    pro: false,
    files: ["button/shimmer-button.tsx"],
    dependencies: [],
    createdAt: "2026-05-14",
  },
  {
    slug: "aurora-background",
    name: "Aurora Background",
    description:
      "A drifting, layered radial-gradient backdrop in Nyra's accent palette.",
    category: "background",
    tags: ["animated", "ambient"],
    pro: false,
    files: ["background/aurora-background.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "sparkles",
    name: "Sparkles",
    description: "Twinkling four-point stars scattered across a region.",
    category: "background",
    tags: ["animated", "decorative"],
    pro: false,
    files: ["background/sparkles.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "tilt-card",
    name: "Tilt Card",
    description: "A card that tilts in 3D toward the pointer.",
    category: "card",
    tags: ["interactive", "3d"],
    pro: false,
    files: ["card/tilt-card.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "glow-card",
    name: "Glow Card",
    description: "A card with a rotating conic-gradient accent border on hover.",
    category: "card",
    tags: ["animated", "border"],
    pro: true,
    files: ["card/glow-card.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "word-reveal",
    name: "Word Reveal",
    description: "Scroll-linked text that fades in one word at a time.",
    category: "text",
    tags: ["scroll", "animated", "typography"],
    pro: false,
    files: ["text/word-reveal.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "number-ticker",
    name: "Number Ticker",
    description: "A count-up number animation that fires on viewport entry.",
    category: "text",
    tags: ["animated", "data"],
    pro: false,
    files: ["text/number-ticker.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "gradient-text",
    name: "Gradient Text",
    description:
      "Animated linear-gradient text fill that loops through Nyra's lime → rose palette.",
    category: "text",
    tags: ["animated", "gradient", "typography"],
    pro: false,
    files: ["text/gradient-text.tsx"],
    dependencies: [],
    createdAt: "2026-05-14",
  },
  {
    slug: "marquee",
    name: "Marquee",
    description:
      "Seamless infinite horizontal scroll for logos or testimonials, with hover pause.",
    category: "data",
    tags: ["animated", "scroll", "logos"],
    pro: true,
    files: ["data/marquee.tsx"],
    dependencies: [],
    createdAt: "2026-05-14",
  },
  {
    slug: "spotlight-hero",
    name: "Spotlight Hero",
    description:
      "Hero section with a soft, spring-smoothed spotlight that follows the cursor.",
    category: "hero",
    tags: ["interactive", "cursor", "animated"],
    pro: false,
    files: ["hero/spotlight-hero.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "animated-grid",
    name: "Animated Grid",
    description: "A drifting square grid with a radial fade, pure CSS.",
    category: "background",
    tags: ["animated", "ambient", "css-only"],
    pro: false,
    files: ["background/animated-grid.tsx"],
    dependencies: [],
    createdAt: "2026-05-14",
  },
  {
    slug: "floating-dock",
    name: "Floating Dock",
    description:
      "macOS-style dock with icons that magnify as the cursor approaches.",
    category: "nav",
    tags: ["interactive", "cursor", "animated"],
    pro: true,
    files: ["nav/floating-dock.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "border-beam-button",
    name: "Border Beam Button",
    description:
      "Button with a continuous accent beam traveling around the border.",
    category: "button",
    tags: ["animated", "border", "css-only"],
    pro: false,
    files: ["button/border-beam-button.tsx"],
    dependencies: [],
    createdAt: "2026-05-14",
  },
  {
    slug: "pricing-card",
    name: "Pricing Card",
    description:
      "Three-plan pricing grid with monthly/yearly toggle and a featured plan accent.",
    category: "data",
    tags: ["interactive", "pricing"],
    pro: true,
    files: ["data/pricing-card.tsx"],
    dependencies: [],
    createdAt: "2026-05-14",
  },
  {
    slug: "meteor-shower",
    name: "Meteor Shower",
    description:
      "Diagonal meteor streaks falling across the page — randomized timing for a quiet sky.",
    category: "background",
    tags: ["animated", "ambient", "css-only"],
    pro: false,
    files: ["background/meteor-shower.tsx"],
    dependencies: [],
    createdAt: "2026-05-14",
  },
  {
    slug: "beams-of-light",
    name: "Beams of Light",
    description: "Vertical accent beams that breathe in opacity, offset in time.",
    category: "background",
    tags: ["animated", "ambient", "css-only"],
    pro: false,
    files: ["background/beams-of-light.tsx"],
    dependencies: [],
    createdAt: "2026-05-14",
  },
  {
    slug: "hover-lift-card",
    name: "Hover Lift Card",
    description:
      "Card that springs upward on hover and emits a soft accent halo beneath it.",
    category: "card",
    tags: ["interactive", "hover", "animated"],
    pro: false,
    files: ["card/hover-lift-card.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "typing-animation",
    name: "Typing Animation",
    description:
      "Typewriter reveal with a blinking accent caret. Respects prefers-reduced-motion.",
    category: "text",
    tags: ["animated", "typewriter", "a11y"],
    pro: false,
    files: ["text/typing-animation.tsx"],
    dependencies: [],
    createdAt: "2026-05-14",
  },
  {
    slug: "shimmer-text",
    name: "Shimmer Text",
    description:
      "Heading text with a slow specular highlight traveling across the glyphs.",
    category: "text",
    tags: ["animated", "css-only", "typography"],
    pro: false,
    files: ["text/shimmer-text.tsx"],
    dependencies: [],
    createdAt: "2026-05-14",
  },
  {
    slug: "animated-tabs",
    name: "Animated Tabs",
    description:
      "Tab strip with a single sliding indicator that interpolates between tabs.",
    category: "nav",
    tags: ["animated", "interactive"],
    pro: false,
    files: ["nav/animated-tabs.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
];

export function adjacentEntries(slug: string) {
  const i = registry.findIndex((c) => c.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? registry[i - 1] : undefined,
    next: i < registry.length - 1 ? registry[i + 1] : undefined,
  };
}

export function getComponent(slug: string): NyraComponent | undefined {
  return registry.find((c) => c.slug === slug);
}

export function getCategoryLabel(id: Category): string {
  return categories.find((c) => c.id === id)?.label ?? id;
}

/** Categories that actually have components — used to filter the catalog chips. */
export function activeCategories(): { id: Category; label: string }[] {
  const used = new Set(registry.map((c) => c.category));
  return categories.filter((c) => used.has(c.id));
}
