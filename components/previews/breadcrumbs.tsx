"use client";

import { Breadcrumbs } from "@/components/ui/nav/breadcrumbs";

export default function BreadcrumbsPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "#" },
          { label: "Components", href: "#" },
          { label: "Navigation", href: "#" },
          { label: "Breadcrumbs" },
        ]}
      />
    </div>
  );
}
