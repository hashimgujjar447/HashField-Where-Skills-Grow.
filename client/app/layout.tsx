import type { Metadata } from "next";
import { Poppins, Josefin_Sans } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import { useLoadUserQuery } from "./redux/services/api";
import Custom from "./components/Custom";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-josefin",
});

export const metadata: Metadata = {
  title: "ELearn",
  description: "Learn with ELearn",
  keywords: ["react", "typescript", "programming"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${josefin.variable}`}
    >
      <body className="min-h-screen bg-no-repeat bg-white text-black duration-300 dark:bg-black dark:text-white">
        <Toaster
          position="top-right"
          containerStyle={{
            zIndex: 999999,
          }}
        />

        <Providers>
          <Custom>{children}</Custom>
        </Providers>
      </body>
    </html>
  );
}
