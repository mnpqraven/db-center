"use client";
import { Provider } from "jotai";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { DevTools } from "jotai-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";

const TANSTACK_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
};

const queryClient = new QueryClient(TANSTACK_CONFIG);

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class">
        <TooltipProvider delayDuration={300}>
          <QueryClientProvider client={queryClient}>
            <Provider>
              {children}

              <DevTools isInitialOpen={false} />
              <ReactQueryDevtools initialIsOpen={false} />
            </Provider>
          </QueryClientProvider>
        </TooltipProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
