import "@/styles/globals.css";

import type { Metadata } from "next";

import { Outfit } from "next/font/google";
import { Toaster } from "sonner";

import { Header } from "@/components/header";
import { Providers } from "@/providers";

export const metadata: Metadata = {
  description: "Plan your trips with ease",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  title: "Trip Savant",
};

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html className={outfit.variable} lang="en" suppressHydrationWarning>
    <body>
      <Providers>
        <Header />
        <main className="container mx-auto px-4 py-6">{children}</main>
        <Toaster />
      </Providers>
    </body>
  </html>
);

export default RootLayout;
