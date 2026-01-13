"use client";

import { QueryClientProvider as TanStackQueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { getQueryClient } from "./getQueryClient";

export function QueryClientProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();
  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
    </TanStackQueryClientProvider>
  );
}
