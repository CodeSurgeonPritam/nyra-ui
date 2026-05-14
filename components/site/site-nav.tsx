import Link from "next/link";
import { Github } from "lucide-react";

import { NyraMark } from "@/components/icons/nyra-mark";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/components", label: "Components" },
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteNav({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link href="/" className="group flex items-center gap-2">
          <NyraMark size={16} className="text-accent transition-transform group-hover:rotate-45" />
          <span className="font-serif text-xl italic leading-none tracking-tight">
            nyra
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/CodeSurgeonPritam/nyra-ui"
            target="_blank"
            rel="noreferrer"
            aria-label="Nyra on GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground-muted transition-colors hover:text-foreground hover:border-foreground/30"
          >
            <Github className="h-4 w-4" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
