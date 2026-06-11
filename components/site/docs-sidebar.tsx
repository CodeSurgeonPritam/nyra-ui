"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type DocLink = { href: string; label: string };
type DocSection = { title: string; links: DocLink[] };

const SECTIONS: DocSection[] = [
  {
    title: "Getting Started",
    links: [
      { href: "/docs", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/cli", label: "CLI" },
    ],
  },
  {
    title: "Foundations",
    links: [
      { href: "/docs/theming", label: "Theming" },
      { href: "/docs/components-overview", label: "Components" },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Documentation"
      className="flex flex-col gap-8 py-2 text-sm"
    >
      {SECTIONS.map((section) => (
        <div key={section.title} className="flex flex-col gap-2">
          <p className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
            {section.title}
          </p>
          <ul className="flex flex-col gap-0.5">
            {section.links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-md border border-transparent px-3 py-1.5 transition-colors",
                      active
                        ? "border-border bg-surface text-foreground"
                        : "text-foreground-muted hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
