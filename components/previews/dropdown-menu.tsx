"use client";

import { LayoutGrid, LogOut, Settings, User } from "lucide-react";

import { DropdownMenu } from "@/components/ui/nav/dropdown-menu";

export default function DropdownMenuPreview() {
  return (
    <div className="flex h-full w-full items-start justify-center p-12">
      <DropdownMenu
        trigger="Account"
        items={[
          {
            label: "Profile",
            description: "Your public Nyra page",
            icon: <User className="h-3.5 w-3.5" />,
            href: "#",
          },
          {
            label: "Dashboard",
            description: "Components and licenses",
            icon: <LayoutGrid className="h-3.5 w-3.5" />,
            href: "#",
          },
          {
            label: "Settings",
            description: "Billing, theme, email",
            icon: <Settings className="h-3.5 w-3.5" />,
            href: "#",
          },
          {
            label: "Sign out",
            icon: <LogOut className="h-3.5 w-3.5" />,
          },
        ]}
      />
    </div>
  );
}
