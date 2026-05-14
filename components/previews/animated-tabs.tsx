"use client";

import { AnimatedTabs } from "@/components/ui/nav/animated-tabs";

export default function AnimatedTabsPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-10">
      <AnimatedTabs
        defaultValue="components"
        tabs={[
          { id: "components", label: "Components" },
          { id: "templates", label: "Templates" },
          { id: "blog", label: "Blog" },
          { id: "changelog", label: "Changelog" },
        ]}
      />
    </div>
  );
}
