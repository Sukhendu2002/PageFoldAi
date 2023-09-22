"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </QueryClientProvider>
  );
}
