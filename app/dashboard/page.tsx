import Link from "next/link";
import { ArrowUpRight, BadgeCheck, KeyRound, Layers } from "lucide-react";

import { CopyButton } from "@/components/site/copy-button";
import { NyraMark } from "@/components/icons/nyra-mark";
import { SearchTrigger } from "@/components/site/search-trigger";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { getCurrentUser } from "@/lib/auth";
import { tryGetDb } from "@/lib/db/client";
import { downloads } from "@/lib/db/schema";
import { isProConfigured } from "@/lib/env";
import { eq, desc } from "drizzle-orm";

export const metadata = {
  title: "Dashboard",
  description: "Your license, plan, and recent component downloads.",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // When the Pro stack isn't configured, render a placeholder so the route
  // is still browsable in degraded mode (middleware can't enforce auth).
  if (!isProConfigured()) return <ProNotConfigured />;

  const me = await getCurrentUser();
  if (!me) return <ProNotConfigured />;

  const db = tryGetDb();
  const recent = db
    ? await db
        .select()
        .from(downloads)
        .where(eq(downloads.userId, me.user.id))
        .orderBy(desc(downloads.downloadedAt))
        .limit(20)
    : [];

  const isPro = me.tier === "pro";

  return (
    <main className="min-h-dvh">
      <DashboardHeader />

      <section className="mx-auto max-w-5xl px-6 py-12 sm:px-10 sm:py-16">
        <div className="flex flex-col gap-3">
          <span className="text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
            Dashboard
          </span>
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight">
            Welcome back{me.user.name ? `, ${me.user.name.split(" ")[0]}` : ""}.
          </h1>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Card>
            <CardHead icon={<BadgeCheck className="h-4 w-4" />} title="Plan" />
            {isPro ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-3xl">Pro</span>
                  <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-accent">
                    {me.activeSubscription
                      ? me.activeSubscription.plan
                      : "Lifetime"}
                  </span>
                </div>
                {me.activeSubscription?.currentPeriodEnd ? (
                  <p className="text-xs text-foreground-muted">
                    Renews{" "}
                    {me.activeSubscription.currentPeriodEnd.toLocaleDateString(
                      "en-US",
                      { dateStyle: "long" },
                    )}
                    .
                  </p>
                ) : (
                  <p className="text-xs text-foreground-muted">
                    Lifetime updates. No recurring bill.
                  </p>
                )}
                <Link
                  href="/account"
                  className="mt-3 inline-flex items-center gap-1 text-xs text-foreground underline decoration-accent decoration-2 underline-offset-4"
                >
                  Manage billing
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </>
            ) : (
              <>
                <span className="font-serif text-3xl">Free</span>
                <p className="text-xs text-foreground-muted">
                  You have access to every free component. Pro unlocks the rest.
                </p>
                <Link
                  href="/pricing"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
                >
                  Upgrade to Pro
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </>
            )}
          </Card>

          <Card>
            <CardHead icon={<KeyRound className="h-4 w-4" />} title="License key" />
            {me.license ? (
              <div className="flex flex-col gap-3">
                <code className="rounded-md border border-border bg-background px-3 py-2 font-mono text-sm">
                  {me.license.key}
                </code>
                <div className="flex items-center gap-2">
                  <CopyButton text={me.license.key} />
                  <span className="text-[10px] uppercase tracking-[0.16em] text-foreground-muted">
                    {me.license.seats} {me.license.seats === 1 ? "seat" : "seats"}{" "}
                    ·{" "}
                    {me.license.expiresAt
                      ? `expires ${me.license.expiresAt.toLocaleDateString()}`
                      : "lifetime"}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-foreground-muted">
                Your license will appear here after your first Pro purchase.
              </p>
            )}
          </Card>
        </div>

        <section className="mt-12 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-serif text-2xl">
              <Layers className="h-4 w-4 text-foreground-muted" />
              Recent downloads
            </h2>
            <Link
              href="/components"
              className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-foreground-muted transition-colors hover:text-foreground"
            >
              Browse
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className="rounded-2xl border border-border bg-surface px-5 py-8 text-center text-sm text-foreground-muted">
              Nothing yet. Visit a component page and copy its source — we'll
              log it here.
            </div>
          ) : (
            <ul className="overflow-hidden rounded-2xl border border-border">
              {recent.map((d) => (
                <li
                  key={d.id}
                  className="flex items-center justify-between border-b border-border bg-surface px-5 py-3 text-sm last:border-b-0"
                >
                  <Link
                    href={`/components/${d.componentSlug}`}
                    className="font-mono text-foreground hover:text-accent"
                  >
                    {d.componentSlug}
                  </Link>
                  <span className="text-xs text-foreground-muted">
                    {d.downloadedAt.toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </main>
  );
}

function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="flex items-center gap-2">
          <NyraMark size={16} className="text-accent" />
          <span className="font-serif text-xl italic leading-none tracking-tight">
            nyra
          </span>
          <span className="ml-3 hidden text-[11px] uppercase tracking-[0.18em] text-foreground-muted sm:inline">
            · Dashboard
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.16em] text-foreground-muted sm:flex">
          <Link href="/components" className="transition-colors hover:text-foreground">
            Catalog
          </Link>
          <Link href="/account" className="transition-colors hover:text-foreground">
            Account
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <SearchTrigger />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5">
      {children}
    </div>
  );
}

function CardHead({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
      {icon}
      {title}
    </div>
  );
}

function ProNotConfigured() {
  return (
    <main className="min-h-dvh">
      <DashboardHeader />
      <section className="mx-auto max-w-md px-6 py-32 sm:px-10">
        <NyraMark size={20} className="text-accent" />
        <span className="mt-5 inline-block text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
          Pro tier · Not configured
        </span>
        <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight">
          Dashboard's not live yet.
        </h1>
        <p className="mt-3 text-sm text-foreground-muted">
          Once the Pro stack is configured (Clerk + Neon + Lemon Squeezy), this
          page shows your license, plan, and download history.
        </p>
        <Link
          href="/components"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
        >
          Browse the catalog
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
