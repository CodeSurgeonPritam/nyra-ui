"use client";

import { Home, Layers, Search, Settings, Sparkles, User } from "lucide-react";

import { FloatingDock } from "@/components/ui/nav/floating-dock";

export default function FloatingDockPreview() {
  return (
    <div className="flex h-full min-h-[260px] w-full items-end justify-center pb-10">
      <FloatingDock
        items={[
          { label: "Home", icon: <Home className="h-4 w-4" /> },
          { label: "Search", icon: <Search className="h-4 w-4" /> },
          { label: "Layers", icon: <Layers className="h-4 w-4" /> },
          { label: "Sparkles", icon: <Sparkles className="h-4 w-4" /> },
          { label: "Profile", icon: <User className="h-4 w-4" /> },
          { label: "Settings", icon: <Settings className="h-4 w-4" /> },
        ]}
      />
    </div>
  );
}
