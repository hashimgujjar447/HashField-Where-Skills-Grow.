"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./utils/theme-provider";
import ReduxProvider from "./redux/services/provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ReduxProvider>{children}</ReduxProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
