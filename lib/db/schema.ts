/**
 * Postgres schema for Nyra Pro.
 *
 * Owns four tables — users, subscriptions, licenses, downloads — each
 * keyed by UUID and timestamped with `created_at` columns that default
 * to `now()` server-side.
 *
 * Clerk is the identity source of truth; `users.clerk_id` is the cross-
 * service join key. We mirror only what we need from Clerk locally to
 * power offline-capable license/download history queries.
 */

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const plan = pgEnum("plan", ["lifetime", "monthly", "yearly"]);
export const subscriptionStatus = pgEnum("subscription_status", [
  "active",
  "canceled",
  "past_due",
  "expired",
  "unpaid",
  "pending",
]);

export const users = pgTable(
  "users",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    clerkId: text("clerk_id").notNull(),
    email: text("email").notNull(),
    name: text("name"),
    lemonsqueezyCustomerId: text("lemonsqueezy_customer_id"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    clerkIdIdx: uniqueIndex("users_clerk_id_idx").on(t.clerkId),
    emailIdx: uniqueIndex("users_email_idx").on(t.email),
    lsCustomerIdx: index("users_ls_customer_idx").on(t.lemonsqueezyCustomerId),
  }),
);

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lemonsqueezySubscriptionId: text("lemonsqueezy_subscription_id").notNull(),
    plan: plan("plan").notNull(),
    status: subscriptionStatus("status").notNull(),
    currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    lsIdIdx: uniqueIndex("subscriptions_ls_id_idx").on(
      t.lemonsqueezySubscriptionId,
    ),
    userIdx: index("subscriptions_user_idx").on(t.userId),
  }),
);

export const licenses = pgTable(
  "licenses",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    key: text("key").notNull(),
    seats: integer("seats").notNull().default(1),
    activatedAt: timestamp("activated_at", { withTimezone: true }),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
  },
  (t) => ({
    keyIdx: uniqueIndex("licenses_key_idx").on(t.key),
    userIdx: index("licenses_user_idx").on(t.userId),
  }),
);

export const downloads = pgTable(
  "downloads",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    componentSlug: text("component_slug").notNull(),
    downloadedAt: timestamp("downloaded_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    userIdx: index("downloads_user_idx").on(t.userId),
    slugIdx: index("downloads_slug_idx").on(t.componentSlug),
  }),
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
export type License = typeof licenses.$inferSelect;
export type NewLicense = typeof licenses.$inferInsert;
export type Download = typeof downloads.$inferSelect;
export type NewDownload = typeof downloads.$inferInsert;
