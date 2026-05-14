import Link from "next/link";

import { isClerkConfigured } from "@/lib/env";
import { NyraMark } from "@/components/icons/nyra-mark";

export const metadata = {
  title: "Sign up",
  description: "Create a Nyra account to unlock Pro components and templates.",
};

export default async function SignUpPage() {
  if (!isClerkConfigured()) return <ProNotConfigured />;

  const { SignUp } = await import("@clerk/nextjs");

  return (
    <main className="flex min-h-dvh items-center justify-center px-6 py-12">
      <div className="flex w-full max-w-sm flex-col items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <NyraMark size={18} className="text-accent" />
          <span className="font-serif text-2xl italic leading-none tracking-tight">
            nyra
          </span>
        </Link>
        <SignUp signInUrl="/login" forceRedirectUrl="/dashboard" />
      </div>
    </main>
  );
}

function ProNotConfigured() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-start gap-5">
        <NyraMark size={20} className="text-accent" />
        <span className="text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
          Pro tier · Not configured
        </span>
        <h1 className="font-serif text-4xl leading-tight tracking-tight">
          Sign-up isn't open yet.
        </h1>
        <p className="text-sm text-foreground-muted">
          We're still wiring Clerk. Once it's live, this page hosts the Nyra
          account creation flow. Browse the catalog in the meantime — every
          free component is already copy-paste-ready.
        </p>
        <Link
          href="/components"
          className="text-sm text-foreground underline decoration-accent decoration-2 underline-offset-4"
        >
          Open the catalog
        </Link>
      </div>
    </main>
  );
}
