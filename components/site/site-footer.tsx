import Link from "next/link";

import { NyraMark } from "@/components/icons/nyra-mark";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { cn } from "@/lib/utils";

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Library",
    links: [
      { href: "/components", label: "Components" },
      { href: "/templates", label: "Templates" },
      { href: "/docs", label: "Docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/pricing", label: "Pricing" },
      { href: "/showcase", label: "Showcase" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/changelog", label: "Changelog" },
      {
        href: "https://github.com/CodeSurgeonPritam/nyra-ui",
        label: "GitHub",
      },
      { href: "/license", label: "License" },
    ],
  },
];

const legalLinks: { href: string; label: string }[] = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("border-t border-border", className)}>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 sm:px-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <NyraMark size={16} className="text-accent" />
            <span className="font-serif text-xl italic leading-none tracking-tight">
              nyra
            </span>
          </Link>
          <p className="max-w-sm text-sm text-foreground-muted">
            New components every week. Drop your email — we send a short note
            when something ships.
          </p>
          <NewsletterForm className="mt-1" />
        </div>

        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
              {col.title}
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 border-t border-border px-6 py-5 text-[11px] text-foreground-muted sm:px-10 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <span>© {new Date().getFullYear()} Nyra. All rights reserved.</span>
          {legalLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <span className="font-mono">v0.0.1</span>
      </div>
    </footer>
  );
}
