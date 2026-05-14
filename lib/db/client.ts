/**
 * Lazy Drizzle / Neon client.
 *
 * Built defensively: importing this module does not connect to the DB,
 * so the build can produce static pages without DATABASE_URL set. Call
 * `getDb()` to materialize the client; it throws a clear error if the
 * env var is missing, which is the right behavior for Pro-only paths.
 */

import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";

import { env } from "@/lib/env";
import * as schema from "./schema";

type Db = NeonHttpDatabase<typeof schema>;

let cached: Db | null = null;

export function getDb(): Db {
  if (cached) return cached;
  if (!env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Pro features need a Neon Postgres connection string.",
    );
  }
  const sql = neon(env.DATABASE_URL);
  cached = drizzle(sql, { schema });
  return cached;
}

/** Non-throwing variant — returns null when the DB isn't configured. */
export function tryGetDb(): Db | null {
  if (!env.DATABASE_URL) return null;
  return getDb();
}

export { schema };
