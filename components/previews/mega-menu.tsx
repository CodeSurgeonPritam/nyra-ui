"use client";

import { LayoutGrid, Package, Sparkles, Type } from "lucide-react";

import { MegaMenu } from "@/components/ui/nav/mega-menu";
import { NyraMark } from "@/components/icons/nyra-mark";

export default function MegaMenuPreview() {
  return (
    <div className="flex h-full w-full items-start justify-center p-12">
      <MegaMenu
        trigger="Products"
        columns={[
          {
            title: "Library",
            items: [
              {
                label: "Components",
                description: "55+ animated primitives",
                icon: <LayoutGrid className="h-3.5 w-3.5" />,
                href: "#",
              },
              {
                label: "Templates",
                description: "Full-page Pro layouts",
                icon: <Package className="h-3.5 w-3.5" />,
                href: "#",
              },
            ],
          },
          {
            title: "Build",
            items: [
              {
                label: "Effects",
                description: "Backgrounds and motion",
                icon: <Sparkles className="h-3.5 w-3.5" />,
                href: "#",
              },
              {
                label: "Typography",
                description: "Editorial text patterns",
                icon: <Type className="h-3.5 w-3.5" />,
                href: "#",
              },
            ],
          },
        ]}
        feature={
          <div className="flex h-full flex-col justify-between gap-3">
            <NyraMark size={20} className="text-accent" />
            <div>
              <div className="font-serif text-lg leading-tight">
                Nyra Pro — every weekend back.
              </div>
              <p className="mt-1 text-xs text-foreground-muted">
                Lifetime updates, all templates, commercial license.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-accent"
            >
              Get Pro →
            </a>
          </div>
        }
      />
    </div>
  );
}
