"use client";

import { MultiStepForm } from "@/components/ui/form/multi-step-form";

export default function MultiStepFormPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <MultiStepForm
        steps={[
          {
            title: "Account",
            content: (
              <div className="flex flex-col gap-3">
                <Field label="Name" placeholder="Pritam" />
                <Field label="Email" placeholder="you@nyra.dev" />
              </div>
            ),
          },
          {
            title: "Project",
            content: (
              <div className="flex flex-col gap-3">
                <Field label="Project name" placeholder="Aurora" />
                <Field label="Domain" placeholder="aurora.dev" />
              </div>
            ),
          },
          {
            title: "Plan",
            content: (
              <div className="flex flex-col gap-2 text-sm text-foreground-muted">
                <p>
                  Free tier covers personal projects. Upgrade later from your
                  dashboard.
                </p>
                <ul className="ml-5 list-disc">
                  <li>60% of catalog</li>
                  <li>Community access</li>
                  <li>MIT license</li>
                </ul>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-foreground/30 focus:outline-none"
      />
    </label>
  );
}
