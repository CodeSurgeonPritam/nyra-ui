import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";

import { MaybeClerk } from "@/components/site/maybe-clerk";
import { SearchProvider } from "@/components/site/search-palette";

import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nyra.dev"),
  title: {
    default: "Nyra — Components for interfaces that feel alive",
    template: "%s · Nyra",
  },
  description:
    "A modern React component library with editorial typography, electric accents, and original motion. Copy. Paste. Ship.",
  applicationName: "Nyra",
  keywords: [
    "react",
    "components",
    "ui library",
    "tailwind",
    "motion",
    "animated components",
    "nyra",
  ],
  openGraph: {
    type: "website",
    url: "https://nyra.dev",
    title: "Nyra — Components for interfaces that feel alive",
    description:
      "A modern React component library with editorial typography, electric accents, and original motion.",
    siteName: "Nyra",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyra — Components for interfaces that feel alive",
    description:
      "A modern React component library with editorial typography, electric accents, and original motion.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f5f3ee" },
  ],
};

const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem('nyra-theme');
    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    var theme = stored || (prefersLight ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (_) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${instrumentSerif.variable} ${jetbrainsMono.variable} ${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before paint to avoid a flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src={
              process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT ??
              "https://plausible.io/js/script.js"
            }
          />
        )}
      </head>
      <body className="min-h-dvh bg-background text-foreground font-mono antialiased">
        <MaybeClerk>
          <SearchProvider>{children}</SearchProvider>
        </MaybeClerk>
      </body>
    </html>
  );
}
