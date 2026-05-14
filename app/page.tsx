"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";

import { AuroraBackground } from "@/components/ui/background/aurora-background";
import { GradientText } from "@/components/ui/text/gradient-text";
import { MagneticButton } from "@/components/ui/button/magnetic-button";
import { Marquee } from "@/components/ui/data/marquee";
import { NumberTicker } from "@/components/ui/text/number-ticker";
import { Sparkles } from "@/components/ui/background/sparkles";
import { TiltCard } from "@/components/ui/card/tilt-card";
import { NyraMark } from "@/components/icons/nyra-mark";
import { ComponentPreview } from "@/components/site/component-preview";
import { SearchTrigger } from "@/components/site/search-trigger";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { registry } from "@/lib/registry";

const FEATURED_SLUGS = [
  "magnetic-button",
  "aurora-background",
  "tilt-card",
  "gradient-text",
];

const TESTIMONIALS = [
  {
    quote:
      "Nyra is the first component library where I didn't immediately want to restyle every primitive.",
    name: "Iris Park",
    title: "Founding designer, Halftone",
  },
  {
    quote:
      "Editorial typography in a dev tool. The lime is dangerous. I love it.",
    name: "Théo Marchand",
    title: "Lead engineer, Atelier 03",
  },
  {
    quote:
      "I shipped a landing in an afternoon and it actually looks like ours.",
    name: "Sana Aziz",
    title: "Co-founder, Pareto",
  },
];

const TRUSTED_BY = [
  "Lyra Labs",
  "Halftone",
  "Constellate",
  "Northwind",
  "Atelier 03",
  "Bondi",
  "Pareto",
  "Stellate",
];

export default function Home() {
  return (
    <main className="relative min-h-dvh">
      <SiteHeader />
      <Hero />
      <FeaturedComponents />
      <Stats />
      <Testimonials />
      <TrustedBy />
      <ClosingCTA />
      <SiteFooter />
    </main>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="flex items-center gap-2">
          <NyraMark size={16} className="text-accent" />
          <span className="font-serif text-xl italic leading-none tracking-tight">
            nyra
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-xs uppercase tracking-[0.16em] text-foreground-muted sm:flex">
          <Link href="/components" className="transition-colors hover:text-foreground">
            Components
          </Link>
          <Link href="/docs" className="transition-colors hover:text-foreground">
            Docs
          </Link>
          <Link href="/pricing" className="transition-colors hover:text-foreground">
            Pricing
          </Link>
          <a
            href="https://github.com/CodeSurgeonPritam/nyra-ui"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <SearchTrigger />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <AuroraBackground className="border-b border-border">
      <section className="relative mx-auto flex max-w-6xl flex-col items-start gap-10 px-6 pt-24 pb-32 sm:px-10 sm:pt-32 sm:pb-40">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-foreground-muted"
        >
          <NyraMark size={10} className="text-accent" />
          Building in public · v0.0.1
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
          className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl md:text-[5.5rem]"
        >
          Components <br />
          for interfaces <br />
          that feel{" "}
          <GradientText
            as="em"
            className="font-serif italic"
            duration={6}
          >
            alive
          </GradientText>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="max-w-xl text-sm leading-relaxed text-foreground-muted sm:text-base"
        >
          A React component library with editorial typography, electric
          accents, and original motion. Free to copy. Pro for the parts that
          take a weekend.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
          className="flex flex-wrap items-center gap-3"
        >
          <Link href="/components">
            <MagneticButton>
              Browse the catalog
              <ArrowUpRight className="ml-1.5 h-4 w-4" />
            </MagneticButton>
          </Link>
          <a
            href="https://github.com/CodeSurgeonPritam/nyra-ui"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-foreground-muted transition-colors hover:text-foreground hover:border-foreground/30"
          >
            <Github className="h-4 w-4" />
            Star on GitHub
          </a>
        </motion.div>
      </section>
    </AuroraBackground>
  );
}

function FeaturedComponents() {
  const featured = FEATURED_SLUGS.map((slug) =>
    registry.find((c) => c.slug === slug),
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
        <div className="flex flex-col gap-3">
          <span className="text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
            What's inside
          </span>
          <h2 className="max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">
            Components you{" "}
            <em className="italic text-accent">won't see</em> in another stack.
          </h2>
        </div>
        <Link
          href="/components"
          className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-foreground-muted transition-colors hover:text-foreground"
        >
          See all {registry.length}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {featured.map((c) => (
          <Link
            key={c.slug}
            href={`/components/${c.slug}`}
            className="group block focus:outline-none"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-surface transition-colors group-hover:border-foreground/20">
              <ComponentPreview
                slug={c.slug}
                minHeight={260}
                className="rounded-none border-0"
              />
              <div className="flex items-center justify-between gap-4 border-t border-border p-5">
                <div className="min-w-0">
                  <h3 className="text-sm font-medium">{c.name}</h3>
                  <p className="mt-1 truncate text-xs text-foreground-muted">
                    {c.description}
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: registry.length, label: "Components shipped", suffix: "+" },
    { value: 0, label: "Lines of boilerplate" },
    { value: 1, label: "Editorial design system" },
  ];

  return (
    <section className="border-y border-border bg-surface/40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-20 sm:grid-cols-3 sm:px-10">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-2">
            <div className="flex items-baseline gap-1 font-serif text-6xl tracking-tight">
              <NumberTicker value={s.value} className="text-foreground" />
              {s.suffix ? (
                <span className="text-foreground">{s.suffix}</span>
              ) : null}
            </div>
            <span className="text-xs uppercase tracking-[0.18em] text-foreground-muted">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
      <div className="flex flex-col gap-3">
        <span className="text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
          From the wait list
        </span>
        <h2 className="max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">
          A few quiet endorsements.
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <TiltCard key={t.name} max={6} depth={20}>
            <figure className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-border bg-surface p-6">
              <blockquote className="font-serif text-xl leading-snug">
                "{t.quote}"
              </blockquote>
              <figcaption className="flex flex-col gap-0.5 text-xs">
                <span className="text-foreground">{t.name}</span>
                <span className="text-foreground-muted">{t.title}</span>
              </figcaption>
            </figure>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

function TrustedBy() {
  return (
    <section className="border-y border-border py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 sm:px-10">
        <span className="text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
          On the wait list
        </span>
        <Marquee speed={32} className="w-full">
          {TRUSTED_BY.map((name) => (
            <span
              key={name}
              className="whitespace-nowrap font-serif text-3xl italic text-foreground-muted"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="relative overflow-hidden">
      <Sparkles count={28} className="opacity-70" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-32 text-center sm:px-10">
        <NyraMark size={28} className="text-accent" />
        <h2 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl">
          Stop shipping the same{" "}
          <em className="italic">purple gradient</em>.
        </h2>
        <p className="max-w-xl text-sm text-foreground-muted sm:text-base">
          Nyra is free to copy, paste, and ship. Pro unlocks the full catalog
          and templates when you're ready.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Link href="/components">
            <MagneticButton>
              Browse the catalog
              <ArrowUpRight className="ml-1.5 h-4 w-4" />
            </MagneticButton>
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-foreground-muted transition-colors hover:text-foreground hover:border-foreground/30"
          >
            See pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center sm:px-10">
        <div className="flex items-center gap-2">
          <NyraMark size={12} className="text-accent" />
          <span className="font-serif text-base italic">nyra</span>
          <span className="ml-3 text-xs text-foreground-muted">
            © {new Date().getFullYear()}
          </span>
        </div>
        <nav className="flex items-center gap-6 text-xs uppercase tracking-[0.16em] text-foreground-muted">
          <Link href="/components" className="transition-colors hover:text-foreground">
            Components
          </Link>
          <Link href="/docs" className="transition-colors hover:text-foreground">
            Docs
          </Link>
          <Link href="/pricing" className="transition-colors hover:text-foreground">
            Pricing
          </Link>
          <a
            href="https://github.com/CodeSurgeonPritam/nyra-ui"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <span>v0.0.1</span>
        </nav>
      </div>
    </footer>
  );
}
