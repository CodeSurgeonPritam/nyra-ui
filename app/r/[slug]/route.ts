/**
 * Registry endpoint — serves a component's full source for the Nyra CLI.
 *
 * `GET /r/:slug`
 *   - free components → 200 with file contents
 *   - pro components without a valid license → 402 (Payment Required)
 *   - pro components with `Authorization: License NYRA-…` → 200 if valid
 *
 * The license header check goes through `lookupLicense` directly so we
 * stay in-process (no internal HTTP). The 402 response includes a
 * machine-readable `reason` so the CLI can render a clear prompt.
 */

import { NextResponse, type NextRequest } from "next/server";

import { isDbConfigured } from "@/lib/env";
import { getComponent } from "@/lib/registry";
import { readComponentFile } from "@/lib/component-source";
import { isValidLicenseFormat, lookupLicense } from "@/lib/license";

export const runtime = "nodejs";

type Params = { slug: string };

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  const component = getComponent(slug);
  if (!component) {
    return NextResponse.json(
      { error: "not-found", slug },
      { status: 404 },
    );
  }

  // Pro gate.
  if (component.pro) {
    const auth = req.headers.get("authorization") ?? "";
    const match = auth.match(/^License\s+(NYRA-[A-Z0-9-]+)$/i);
    if (!match) {
      return NextResponse.json(
        {
          error: "license-required",
          message:
            "This component is Pro. Run `nyra login` with your license key and retry.",
          slug,
        },
        { status: 402 },
      );
    }
    const key = match[1].toUpperCase();
    if (!isValidLicenseFormat(key)) {
      return NextResponse.json(
        { error: "invalid-license", slug },
        { status: 402 },
      );
    }
    if (!isDbConfigured()) {
      return NextResponse.json(
        { error: "license-verification-unavailable", slug },
        { status: 503 },
      );
    }
    try {
      const license = await lookupLicense(key);
      if (!license) {
        return NextResponse.json(
          { error: "license-invalid", slug },
          { status: 402 },
        );
      }
    } catch {
      return NextResponse.json(
        { error: "license-verification-failed", slug },
        { status: 500 },
      );
    }
  }

  // Authorized — read every file the component ships.
  const files = await Promise.all(
    component.files.map(async (file) => ({
      path: file,
      content: await readComponentFile(file),
    })),
  );

  return NextResponse.json({
    schemaVersion: 1,
    slug: component.slug,
    name: component.name,
    description: component.description,
    category: component.category,
    tags: component.tags,
    pro: component.pro,
    dependencies: component.dependencies,
    files,
    createdAt: component.createdAt,
  });
}
