import Link from "next/link";
import { ArrowUpRight, CreditCard, LogOut, User as UserIcon } from "lucide-react";

import { NyraMark } from "@/components/icons/nyra-mark";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { getCurrentUser } from "@/lib/auth";
import { isProConfigured } from "@/lib/env";

export const metadata = {
  title: "Account",
  description: "Manage your Nyra account and billing.",
};

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  if (!isProConfigured()) return <NotConfigured />;

  const me = await getCurrentUser();
  if (!me) return <NotConfigured />;

  const isPro = me.tier === "pro";

  return (
    <main className="min-h-dvh">
      <Header />

      <section className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-16">
        <div className="flex flex-col gap-3">
          <span className="text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
            Account
          </span>
          <h1 className="font-serif text-4xl leading-[0.95] tracking-tight sm:text-5xl">
            {me.user.email}
          </h1>
        </div>

        <div className="mt-12 flex flex-col gap-3">
          <Row
            icon={<UserIcon className="h-4 w-4" />}
            title="Profile"
            description={me.user.name ?? "Add your display name in Clerk"}
            href="/dashboard"
            label="Manage"
          />
          <Row
            icon={<CreditCard className="h-4 w-4" />}
            title="Billing"
            description={
              isPro
                ? "Manage your subscription in the Lemon Squeezy portal"
                : "Upgrade to Pro to unlock the rest of the catalog"
            }
            href={isPro ? "https://app.lemonsqueezy.com/my-orders" : "/pricing"}
            external={isPro}
            label={isPro ? "Open portal" : "View pricing"}
          />
          <Row
            icon={<LogOut className="h-4 w-4" />}
            title="Sign out"
            description="End the session on this device"
            href="/sign-out"
            label="Sign out"
          />
        </div>
      </section>
    </main>
  );
}

function Row({
  icon,
  title,
  description,
  href,
  label,
  external,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  label: string;
  external?: boolean;
}) {
  const linkProps = external
    ? { target: "_blank" as const, rel: "noreferrer" }
    : {};
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-5 py-4">
      <div className="flex items-start gap-3">
        <span className="mt-1 text-foreground-muted">{icon}</span>
        <div>
          <h2 className="text-sm font-medium">{title}</h2>
          <p className="mt-0.5 text-xs text-foreground-muted">{description}</p>
        </div>
      </div>
      <Link
        href={href}
        {...linkProps}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs text-foreground-muted transition-colors hover:text-foreground hover:border-foreground/30"
      >
        {label}
        <ArrowUpRight className="h-3 w-3" />
      </Link>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="flex items-center gap-2">
          <NyraMark size={16} className="text-accent" />
          <span className="font-serif text-xl italic leading-none tracking-tight">
            nyra
          </span>
          <span className="ml-3 hidden text-[11px] uppercase tracking-[0.18em] text-foreground-muted sm:inline">
            · Account
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.16em] text-foreground-muted sm:flex">
          <Link href="/dashboard" className="transition-colors hover:text-foreground">
            Dashboard
          </Link>
          <Link href="/components" className="transition-colors hover:text-foreground">
            Catalog
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

function NotConfigured() {
  return (
    <main className="min-h-dvh">
      <Header />
      <section className="mx-auto max-w-md px-6 py-32 sm:px-10">
        <NyraMark size={20} className="text-accent" />
        <span className="mt-5 inline-block text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
          Pro tier · Not configured
        </span>
        <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight">
          Account isn't live yet.
        </h1>
        <p className="mt-3 text-sm text-foreground-muted">
          This page shows your subscription and billing portal once the Pro
          stack is configured.
        </p>
      </section>
    </main>
  );
}
