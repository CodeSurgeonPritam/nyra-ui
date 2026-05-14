import Link from "next/link";

import { NyraMark } from "@/components/icons/nyra-mark";
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

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("border-t border-border", className)}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 sm:px-10 md:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <NyraMark size={16} className="text-accent" />
            <span className="font-serif text-xl italic leading-none tracking-tight">
              nyra
            </span>
          </Link>
          <p className="max-w-xs text-xs text-foreground-muted">
            Components for interfaces that feel alive.
          </p>
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

      <div className="mx-auto flex max-w-6xl items-center justify-between border-t border-border px-6 py-5 text-[11px] text-foreground-muted sm:px-10">
        <span>© {new Date().getFullYear()} Nyra. All rights reserved.</span>
        <span className="font-mono">v0.0.1</span>
      </div>
    </footer>
  );
}
