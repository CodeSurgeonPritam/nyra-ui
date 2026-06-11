/**
 * Template registry — full-page layouts that compose multiple Nyra
 * components into a ready-to-ship surface. Pro-gated by default; the
 * detail page reads `pro` to decide whether to show the paywall.
 *
 * Currently seeded with manifests for templates we're actively building;
 * each one will graduate to a real source artifact in `templates/` (a
 * tracked file under packages/ in a later phase).
 */

export type TemplateCategory =
  | "landing"
  | "saas"
  | "portfolio"
  | "marketing"
  | "docs";

export type NyraTemplate = {
  slug: string;
  name: string;
  description: string;
  category: TemplateCategory;
  pro: boolean;
  /** Components from the registry this template assembles. */
  components: string[];
  /** Status — "ready" templates have a working preview; others are previews-only. */
  status: "ready" | "in-progress" | "planned";
  /** ISO date when the template entered the catalog. */
  createdAt: string;
};

export const templates: NyraTemplate[] = [
  {
    slug: "indie-saas-landing",
    name: "Indie SaaS Landing",
    description:
      "A complete one-page landing for an indie SaaS — hero, features, pricing, testimonials, CTA.",
    category: "saas",
    pro: true,
    components: [
      "spotlight-hero",
      "tilt-card",
      "marquee",
      "pricing-card",
      "magnetic-button",
    ],
    status: "in-progress",
    createdAt: "2026-05-15",
  },
  {
    slug: "portfolio",
    name: "Editorial Portfolio",
    description:
      "Single-page portfolio with case-study sections, scroll-reveal text, and a quiet brand identity.",
    category: "portfolio",
    pro: true,
    components: [
      "scroll-reveal-text",
      "bento-grid-card",
      "logo-cloud",
      "gradient-text",
    ],
    status: "in-progress",
    createdAt: "2026-05-15",
  },
  {
    slug: "changelog-page",
    name: "Changelog Page",
    description:
      "A dated release-notes page with grouped entries — the layout Nyra uses for its own changelog.",
    category: "marketing",
    pro: false,
    components: ["expandable-card", "shimmer-text"],
    status: "planned",
    createdAt: "2026-05-15",
  },
];

export const templateCategories: {
  id: TemplateCategory;
  label: string;
}[] = [
  { id: "landing", label: "Landing" },
  { id: "saas", label: "SaaS" },
  { id: "portfolio", label: "Portfolio" },
  { id: "marketing", label: "Marketing" },
  { id: "docs", label: "Docs" },
];

export function allTemplates(): NyraTemplate[] {
  return templates;
}

export function getTemplate(slug: string): NyraTemplate | undefined {
  return templates.find((t) => t.slug === slug);
}
