/**
 * License key utilities.
 *
 * Format: `NYRA-XXXX-XXXX-XXXX` (4 segments × 4 chars, total 19 chars
 * including dashes). Crockford's base32 alphabet — no I/L/O/U so the
 * keys are unambiguous when read off a screen.
 *
 * Generation uses `crypto.getRandomValues` (Web Crypto, available in
 * Node 18+ and the edge runtime). No `Math.random()`.
 */

import "server-only";

const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // Crockford's base32
const SEGMENTS = 3; // after the "NYRA" prefix
const SEGMENT_LEN = 4;

function randomChar(): string {
  const buf = new Uint8Array(1);
  // Rejection sample to keep the distribution flat.
  while (true) {
    crypto.getRandomValues(buf);
    if (buf[0] < 256 - (256 % ALPHABET.length)) {
      return ALPHABET[buf[0] % ALPHABET.length];
    }
  }
}

export function generateLicenseKey(): string {
  const parts: string[] = ["NYRA"];
  for (let i = 0; i < SEGMENTS; i++) {
    let seg = "";
    for (let j = 0; j < SEGMENT_LEN; j++) seg += randomChar();
    parts.push(seg);
  }
  return parts.join("-");
}

const LICENSE_REGEX = /^NYRA(?:-[0-9A-HJKMNP-TV-Z]{4}){3}$/;

export function isValidLicenseFormat(key: string): boolean {
  return LICENSE_REGEX.test(key);
}

/**
 * Server-side validation: format check first, then DB lookup. Returns
 * the license row when active and unexpired, or null otherwise.
 * Throws if the DB isn't configured — callers should guard with
 * `isDbConfigured()` first.
 */
import { eq } from "drizzle-orm";
import { getDb } from "./db/client";
import { licenses, type License } from "./db/schema";

export async function lookupLicense(key: string): Promise<License | null> {
  if (!isValidLicenseFormat(key)) return null;
  const db = getDb();
  const rows = await db
    .select()
    .from(licenses)
    .where(eq(licenses.key, key))
    .limit(1);
  const row = rows[0];
  if (!row) return null;
  if (row.expiresAt && row.expiresAt < new Date()) return null;
  return row;
}
