import "@/styles/globals.css";

import type { Metadata } from "next";

import { Geist } from "next/font/google";
import { Toaster } from "sonner";

import { Header } from "@/components/header";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  description: "Plan your trips with ease",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  title: "Trip Savant",
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html className={geist.variable} lang="en">
    <body>
      <TRPCReactProvider>
        <Header />
        <main className="container mx-auto px-4 py-6">{children}</main>
        <Toaster />
      </TRPCReactProvider>
    </body>
  </html>
);

export default RootLayout;
