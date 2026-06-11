"use client";

import { useState } from "react";

import { OtpInput } from "@/components/ui/form/otp-input";

export default function OtpInputPreview() {
  const [value, setValue] = useState("");
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex flex-col items-center gap-4">
        <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
          Enter the 6-digit code
        </span>
        <OtpInput value={value} onChange={setValue} />
        <span className="font-mono text-xs text-foreground-muted">
          {value.length === 6 ? "✓ complete" : `${value.length} / 6`}
        </span>
      </div>
    </div>
  );
}
