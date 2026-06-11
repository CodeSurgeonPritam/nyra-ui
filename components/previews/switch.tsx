"use client";

import { Switch } from "@/components/ui/form/switch";

export default function SwitchPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex w-full max-w-sm flex-col gap-5">
        <Switch
          defaultChecked
          label="Weekly digest"
          description="One email on Friday with what shipped that week."
        />
        <Switch
          label="Beta components"
          description="Show in-progress components in the catalog."
        />
        <Switch label="Reduce motion" description="Honour prefers-reduced-motion." />
      </div>
    </div>
  );
}
