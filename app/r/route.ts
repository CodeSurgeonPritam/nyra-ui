/**
 * Registry index — list every component the CLI can install.
 *
 * `GET /r` → all metadata (no source).
 * Lets `nyra list` (or future fuzzy-find) browse the catalog without
 * fetching 21 file payloads.
 */

import { NextResponse } from "next/server";

import { registry } from "@/lib/registry";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json({
    schemaVersion: 1,
    components: registry.map((c) => ({
      slug: c.slug,
      name: c.name,
      description: c.description,
      category: c.category,
      tags: c.tags,
      pro: c.pro,
      dependencies: c.dependencies,
      files: c.files,
      createdAt: c.createdAt,
    })),
  });
}
