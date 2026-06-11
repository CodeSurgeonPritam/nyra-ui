"use client";

import { Checkbox } from "@/components/ui/form/checkbox";

export default function CheckboxPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Checkbox
          defaultChecked
          label="I agree to the terms"
          description="The boring legal stuff in plain language."
        />
        <Checkbox
          label="Email me when a new component ships"
          description="One short note per release. Unsubscribe any time."
        />
        <Checkbox
          label="Use system theme"
          description="Follow my OS appearance setting."
        />
      </div>
    </div>
  );
}
