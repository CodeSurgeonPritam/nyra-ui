import Link from "next/link";

import { isClerkConfigured } from "@/lib/env";
import { NyraMark } from "@/components/icons/nyra-mark";

export const metadata = {
  title: "Sign in",
  description: "Sign in to your Nyra account.",
};

export default async function LoginPage() {
  if (!isClerkConfigured()) return <ProNotConfigured />;

  // Defer the Clerk import so the page builds when Clerk isn't configured.
  const { SignIn } = await import("@clerk/nextjs");

  return (
    <main className="flex min-h-dvh items-center justify-center px-6 py-12">
      <div className="flex w-full max-w-sm flex-col items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <NyraMark size={18} className="text-accent" />
          <span className="font-serif text-2xl italic leading-none tracking-tight">
            nyra
          </span>
        </Link>
        <SignIn signUpUrl="/sign-up" forceRedirectUrl="/dashboard" />
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
          Auth isn't wired yet.
        </h1>
        <p className="text-sm text-foreground-muted">
          Sign-in becomes available once{" "}
          <span className="font-mono text-foreground">CLERK_SECRET_KEY</span>{" "}
          and{" "}
          <span className="font-mono text-foreground">
            NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
          </span>{" "}
          are set in <span className="font-mono text-foreground">.env</span>.
        </p>
        <Link
          href="/"
          className="text-sm text-foreground underline decoration-accent decoration-2 underline-offset-4"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
