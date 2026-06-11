"use client";

import { PasswordInput } from "@/components/ui/form/password-input";

export default function PasswordInputPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex w-full max-w-sm flex-col gap-3">
        <PasswordInput
          label="Choose a password"
          hint="At least 8 characters, with a mix of letters and numbers."
          requireTier="good"
        />
      </div>
    </div>
  );
}
