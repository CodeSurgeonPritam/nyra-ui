"use client";

import { AtSign } from "lucide-react";

import { Input } from "@/components/ui/form/input";

export default function InputPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Input label="Full name" placeholder="Pritam" hint="The name on your invoices." />
        <Input
          label="Work email"
          type="email"
          placeholder="you@nyra.dev"
          leading={<AtSign className="h-4 w-4" />}
        />
      </div>
    </div>
  );
}
