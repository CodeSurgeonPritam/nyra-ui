"use client";

import {
  Home,
  LayoutGrid,
  Package,
  Settings,
  Sparkles,
  User,
} from "lucide-react";

import { Sidebar } from "@/components/ui/nav/sidebar";
import { NyraMark } from "@/components/icons/nyra-mark";

export default function SidebarPreview() {
  return (
    <div className="flex h-full min-h-[360px] w-full">
      <Sidebar
        header={
          <div className="flex items-center gap-2">
            <NyraMark size={14} className="text-accent" />
            <span className="font-serif text-lg italic">nyra</span>
          </div>
        }
        footer={
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-2 text-xs text-foreground-muted">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <User className="h-3 w-3" />
            </span>
            <span>connect@fullcircle.fyi</span>
          </div>
        }
        items={[
          { icon: <Home className="h-4 w-4" />, label: "Home", active: true },
          { icon: <LayoutGrid className="h-4 w-4" />, label: "Components" },
          { icon: <Package className="h-4 w-4" />, label: "Templates" },
          { icon: <Sparkles className="h-4 w-4" />, label: "Showcase" },
          { icon: <Settings className="h-4 w-4" />, label: "Settings" },
        ]}
      />
      <div className="flex-1 p-8 text-sm text-foreground-muted">
        <span className="text-[10px] uppercase tracking-[0.18em]">
          Click the chevron
        </span>
        <h3 className="mt-2 font-serif text-3xl text-foreground">
          Sidebar collapses to an icon rail.
        </h3>
      </div>
    </div>
  );
}
