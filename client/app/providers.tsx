"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./utils/theme-provider";
import ReduxProvider from "./redux/services/provider";
import socketIO from "socket.io-client";
import { useEffect } from "react";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    socketId.on("connection", () => {
      console.log("Connected to the server with socket ID:", socketId.id);
    });
  }, []);

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
