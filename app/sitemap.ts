import type { MetadataRoute } from "next";

import { registry } from "@/lib/registry";

const SITE_URL = "https://nyra.dev";

const STATIC_ROUTES = [
  "/",
  "/components",
  "/pricing",
  "/docs",
  "/docs/installation",
  "/docs/theming",
  "/docs/components-overview",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const componentEntries: MetadataRoute.Sitemap = registry.map((c) => ({
    url: `${SITE_URL}/components/${c.slug}`,
    lastModified: new Date(c.createdAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...componentEntries];
}
