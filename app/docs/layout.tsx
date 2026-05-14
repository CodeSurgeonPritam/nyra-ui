import Link from "next/link";

import { DocsSidebar } from "@/components/site/docs-sidebar";
import { NyraMark } from "@/components/icons/nyra-mark";
import { SearchTrigger } from "@/components/site/search-trigger";
import { ThemeToggle } from "@/components/site/theme-toggle";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
          <Link href="/" className="flex items-center gap-2">
            <NyraMark size={16} className="text-accent" />
            <span className="font-serif text-xl italic leading-none tracking-tight">
              nyra
            </span>
            <span className="ml-3 hidden text-[11px] uppercase tracking-[0.18em] text-foreground-muted sm:inline">
              · Docs
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-xs uppercase tracking-[0.16em] text-foreground-muted sm:flex">
            <Link href="/components" className="transition-colors hover:text-foreground">
              Components
            </Link>
            <Link href="/docs" className="text-foreground">
              Docs
            </Link>
            <a
              href="https://github.com/CodeSurgeonPritam/nyra-ui"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <SearchTrigger />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 sm:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[200px_1fr] md:gap-14 lg:grid-cols-[220px_1fr]">
          <aside className="md:sticky md:top-24 md:self-start">
            <DocsSidebar />
          </aside>
          <article className="max-w-2xl">{children}</article>
        </div>
      </div>
    </div>
  );
}
