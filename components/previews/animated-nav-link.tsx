"use client";

import { AnimatedNavLink } from "@/components/ui/nav/animated-nav-link";

export default function AnimatedNavLinkPreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 p-10">
      <div className="flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          Underline variant
        </span>
        <nav className="flex items-center gap-6">
          <AnimatedNavLink href="#" active>Components</AnimatedNavLink>
          <AnimatedNavLink href="#">Templates</AnimatedNavLink>
          <AnimatedNavLink href="#">Docs</AnimatedNavLink>
          <AnimatedNavLink href="#">Pricing</AnimatedNavLink>
        </nav>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          Pill variant
        </span>
        <nav className="flex items-center gap-1">
          <AnimatedNavLink href="#" variant="pill" active>Components</AnimatedNavLink>
          <AnimatedNavLink href="#" variant="pill">Templates</AnimatedNavLink>
          <AnimatedNavLink href="#" variant="pill">Docs</AnimatedNavLink>
          <AnimatedNavLink href="#" variant="pill">Pricing</AnimatedNavLink>
        </nav>
      </div>
    </div>
  );
}
