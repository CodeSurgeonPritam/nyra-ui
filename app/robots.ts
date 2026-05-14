import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard", "/account"],
      },
    ],
    sitemap: "https://nyra.dev/sitemap.xml",
    host: "https://nyra.dev",
  };
}
