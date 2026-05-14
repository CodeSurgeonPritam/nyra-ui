import "dotenv/config";
import type { Config } from "drizzle-kit";

const url = process.env.DATABASE_URL;
if (!url) {
  console.warn(
    "[drizzle.config] DATABASE_URL is not set. `pnpm db:*` commands will fail until you add it to .env.",
  );
}

export default {
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: url ?? "",
  },
  strict: true,
  verbose: true,
} satisfies Config;
