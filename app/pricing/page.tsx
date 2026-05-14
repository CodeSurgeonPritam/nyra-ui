import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import { NyraMark } from "@/components/icons/nyra-mark";
import { SearchTrigger } from "@/components/site/search-trigger";
import { ThemeToggle } from "@/components/site/theme-toggle";
import {
  isLemonSqueezyConfigured,
  isProConfigured,
  proConfigStatus,
} from "@/lib/env";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Pricing",
  description: "Nyra is free forever. Pro unlocks the full catalog and templates.",
};

type Plan = {
  name: string;
  description: string;
  price: { amount: number; suffix: string };
  features: string[];
  cta:
    | { type: "internal"; href: string; label: string }
    | { type: "checkout"; plan: "monthly" | "yearly" | "lifetime"; label: string }
    | { type: "disabled"; label: string };
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Free",
    description: "Every free component, copy-paste forever, MIT.",
    price: { amount: 0, suffix: "" },
    features: [
      "60% of the catalog",
      "Light + dark themes",
      "Public roadmap & Discord",
      "Commercial use, MIT",
    ],
    cta: { type: "internal", href: "/components", label: "Browse the catalog" },
  },
  {
    name: "Pro",
    description: "Every component + templates. Lifetime updates.",
    price: { amount: 99, suffix: "once" },
    features: [
      "All current + future components",
      "All full-page templates",
      "Lifetime updates",
      "Priority support on Discord",
      "Commercial license",
    ],
    cta: { type: "checkout", plan: "lifetime", label: "Get Pro · $99" },
    featured: true,
  },
  {
    name: "Team",
    description: "Pro for up to 10 seats, invoicing, license keys.",
    price: { amount: 249, suffix: "once" },
    features: [
      "Everything in Pro",
      "10 named seats",
      "Shared license + invoicing",
      "Slack support channel",
    ],
    cta: { type: "internal", href: "mailto:hello@nyra.dev", label: "Contact sales" },
  },
];

export default function PricingPage() {
  const lsConfigured = isLemonSqueezyConfigured();
  const proConfigured = isProConfigured();
  return (
    <main className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
          <Link href="/" className="flex items-center gap-2">
            <NyraMark size={16} className="text-accent" />
            <span className="font-serif text-xl italic leading-none tracking-tight">
              nyra
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-xs uppercase tracking-[0.16em] text-foreground-muted sm:flex">
            <Link
              href="/components"
              className="transition-colors hover:text-foreground"
            >
              Components
            </Link>
            <Link
              href="/docs"
              className="transition-colors hover:text-foreground"
            >
              Docs
            </Link>
            <Link href="/pricing" className="text-foreground">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <SearchTrigger />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-6 pt-20 pb-12 text-center sm:px-10 sm:pt-28">
        <span className="text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
          Pricing
        </span>
        <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
          Two ways to ship{" "}
          <em className="italic text-accent">Nyra</em>.
        </h1>
        <p className="max-w-xl text-sm text-foreground-muted sm:text-base">
          Free forever for the 60% of the catalog that always stays free. Pro
          is a one-time payment for everything else — lifetime updates, no
          recurring bill.
        </p>
      </section>

      {!proConfigured ? <ProNotConfiguredNote /> : null}

      <section className="mx-auto max-w-6xl px-6 pb-20 sm:px-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              ctaEnabled={plan.cta.type !== "checkout" || lsConfigured}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-32 sm:px-10">
        <h2 className="font-serif text-3xl leading-tight">What you get with Pro</h2>
        <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
          {[
            "Premium components (3D, beam, dock, …)",
            "Full-page hero + dashboard templates",
            "Quarterly major releases",
            "Source you own — no runtime dependency",
            "Light + dark variants for everything",
            "Email support, 48h SLA",
          ].map((bullet) => (
            <li key={bullet} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function PlanCard({
  plan,
  ctaEnabled,
}: {
  plan: Plan;
  ctaEnabled: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-2xl border bg-surface p-6",
        plan.featured
          ? "border-accent/50 shadow-[0_0_0_1px_color-mix(in_oklab,var(--accent)_28%,transparent)]"
          : "border-border",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-serif text-2xl">{plan.name}</h3>
        {plan.featured ? (
          <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-accent">
            Popular
          </span>
        ) : null}
      </div>
      <p className="text-xs text-foreground-muted">{plan.description}</p>
      <div className="flex items-baseline gap-1.5">
        <span className="font-serif text-5xl tracking-tight">
          ${plan.price.amount}
        </span>
        {plan.price.suffix ? (
          <span className="text-xs uppercase tracking-[0.16em] text-foreground-muted">
            {plan.price.suffix}
          </span>
        ) : null}
      </div>
      <ul className="flex flex-col gap-2 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check
              className={cn(
                "mt-0.5 h-3.5 w-3.5 shrink-0",
                plan.featured ? "text-accent" : "text-foreground-muted",
              )}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <PlanCta plan={plan} enabled={ctaEnabled} />
    </div>
  );
}

function PlanCta({ plan, enabled }: { plan: Plan; enabled: boolean }) {
  const base =
    "mt-auto inline-flex h-10 items-center justify-center gap-1.5 rounded-full text-sm font-medium transition-colors";
  if (plan.cta.type === "internal") {
    return (
      <Link
        href={plan.cta.href}
        className={cn(
          base,
          plan.featured
            ? "bg-accent text-accent-foreground hover:bg-accent/90"
            : "border border-border text-foreground hover:border-foreground/30",
        )}
      >
        {plan.cta.label}
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    );
  }
  if (plan.cta.type === "checkout") {
    if (!enabled) {
      return (
        <button
          type="button"
          disabled
          className={cn(
            base,
            "cursor-not-allowed border border-dashed border-border text-foreground-muted",
          )}
        >
          Checkout · Coming soon
        </button>
      );
    }
    return (
      <Link
        href={`/api/checkout?plan=${plan.cta.plan}`}
        className={cn(
          base,
          plan.featured
            ? "bg-accent text-accent-foreground hover:bg-accent/90"
            : "border border-border text-foreground hover:border-foreground/30",
        )}
      >
        {plan.cta.label}
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    );
  }
  return (
    <button
      type="button"
      disabled
      className={cn(base, "border border-border text-foreground-muted")}
    >
      {plan.cta.label}
    </button>
  );
}

function ProNotConfiguredNote() {
  const { missing } = proConfigStatus();
  return (
    <div className="mx-auto mb-10 max-w-3xl px-6 sm:px-10">
      <div className="rounded-xl border border-border bg-surface px-4 py-3 text-xs text-foreground-muted">
        <span className="text-foreground">Pro tier is in setup.</span> Checkout
        will activate once the following env vars are configured:{" "}
        <span className="font-mono text-foreground">
          {missing.length ? missing.join(", ") : "none"}
        </span>
        .
      </div>
    </div>
  );
}
