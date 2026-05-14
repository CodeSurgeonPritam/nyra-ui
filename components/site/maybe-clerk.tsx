import { ClerkProvider } from "@clerk/nextjs";

import { isClerkConfigured } from "@/lib/env";

/**
 * Wraps children in <ClerkProvider> only when Clerk env vars are present.
 * Otherwise renders the tree directly, so the marketing site builds and
 * serves cleanly without auth configured.
 *
 * Server Component — the env check happens at render time, which is fine
 * because Next inlines `NEXT_PUBLIC_*` vars at build.
 */
export function MaybeClerk({ children }: { children: React.ReactNode }) {
  if (!isClerkConfigured()) return <>{children}</>;
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#c8ff3c",
          colorBackground: "#0a0a0a",
          colorText: "#f5f3ee",
          colorInputBackground: "#111110",
          colorInputText: "#f5f3ee",
          colorTextSecondary: "#9a9a93",
          colorNeutral: "#1f1f1d",
          borderRadius: "8px",
          fontFamily: "var(--font-mono)",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
