"use client";

import { Toaster } from "sonner";

export function SonnerToaster() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        className: "rounded-lg border bg-white text-foreground shadow-lg",
      }}
    />
  );
}
