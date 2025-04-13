import { TRPCReactProvider } from "@/trpc/react";

import { ThemeProvider } from "./theme-provider";

export const Providers = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </ThemeProvider>
  );
};
