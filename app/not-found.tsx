import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { NyraMark } from "@/components/icons/nyra-mark";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-start gap-6">
        <NyraMark size={20} className="text-accent" />
        <span className="text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
          404 — Off the constellation
        </span>
        <h1 className="font-serif text-5xl leading-[0.95] tracking-tight">
          Nothing lives <em className="italic text-accent">here</em>.
        </h1>
        <p className="text-sm text-foreground-muted">
          The page you wanted hasn't shipped yet, or never existed. The
          catalog has, though.
        </p>
        <Link
          href="/components"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
        >
          Browse components
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
