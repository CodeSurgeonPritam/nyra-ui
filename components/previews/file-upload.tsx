"use client";

import { FileUpload } from "@/components/ui/form/file-upload";

export default function FileUploadPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <FileUpload className="w-full max-w-md" />
    </div>
  );
}
