/**
 * Public license-validation endpoint.
 *
 * `POST /api/license/validate  { "key": "NYRA-XXXX-XXXX-XXXX" }`
 *
 * Returns 200 + status payload whether or not the key is valid — never
 * leaks whether a key exists in the DB; clients learn only "valid" /
 * "invalid" / "expired".
 *
 * Used by the future Nyra CLI to check entitlements before pulling Pro
 * components, and by anyone embedding Nyra components in a closed-source
 * product that needs to verify their license.
 */

import { NextResponse, type NextRequest } from "next/server";

import { isDbConfigured } from "@/lib/env";
import { isValidLicenseFormat, lookupLicense } from "@/lib/license";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = { key?: string };

export async function POST(req: NextRequest) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { valid: false, reason: "service-unavailable" },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { valid: false, reason: "malformed" },
      { status: 400 },
    );
  }

  const key = (body.key ?? "").trim();
  if (!key || !isValidLicenseFormat(key)) {
    return NextResponse.json({ valid: false, reason: "invalid-format" });
  }

  try {
    const license = await lookupLicense(key);
    if (!license) {
      return NextResponse.json({ valid: false, reason: "not-found" });
    }
    return NextResponse.json({
      valid: true,
      seats: license.seats,
      expiresAt: license.expiresAt ?? null,
      lifetime: license.expiresAt === null,
    });
  } catch (err) {
    console.error("[license-validate] lookup failed", err);
    return NextResponse.json(
      { valid: false, reason: "lookup-failed" },
      { status: 500 },
    );
  }
}
