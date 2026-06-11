/**
 * Blog post registry. Each post lives at `app/blog/<slug>/page.mdx`; this
 * file holds the metadata that powers the list page, OG cards, and the
 * sitemap. Posts are sorted by `publishedAt` descending in `allPosts()`.
 */

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  readingTime: number;
  tags: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "why-nyra",
    title: "Why Nyra",
    description:
      "Every component library on the market looks the same. Here's the alternative — and why we're betting on editorial typography, electric lime, and motion you can actually feel.",
    publishedAt: "2026-05-15",
    author: "Pritam",
    readingTime: 4,
    tags: ["launch", "manifesto"],
  },
  {
    slug: "tokens-not-themes",
    title: "Tokens, not themes",
    description:
      "Why Nyra has no theme system and what we ship instead — a small set of CSS variables that one developer can override in five minutes.",
    publishedAt: "2026-05-15",
    author: "Pritam",
    readingTime: 5,
    tags: ["philosophy", "design-system"],
  },
  {
    slug: "the-electric-lime",
    title: "The electric lime",
    description:
      "Color is the cheapest way to be remembered. Here's why we picked #c8ff3c, why it survived every redesign, and how to use it without it eating your interface.",
    publishedAt: "2026-05-15",
    author: "Pritam",
    readingTime: 3,
    tags: ["brand", "color"],
  },
];

export function allPosts(): BlogPost[] {
  return [...posts].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
