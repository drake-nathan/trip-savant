import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import { ConvexClientProvider } from "@/components/providers/convex-client-provider";

import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  description: "The best trip planner ever",
  title: "Trip Savant",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
