import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  // Custom remark/rehype plugins can be added here later (e.g. rehype-slug,
  // rehype-autolink-headings) without disturbing the rest of the config.
});

export default withMDX(nextConfig);
