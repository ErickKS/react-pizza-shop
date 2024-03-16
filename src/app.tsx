import { RouterProvider } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./lib/react-query";
import { router } from "./routes";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="pizzashop-theme">
        <Helmet titleTemplate="%s | pizza.shop" />

        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>

        <Toaster />
      </ThemeProvider>
    </HelmetProvider>
  );
}
