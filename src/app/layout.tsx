import type { Metadata } from "next";
import type React from "react";

import { DM_Sans, Space_Grotesk } from "next/font/google";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const dmSans = DM_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  description:
    "Track every expense, plan every day, and turn your travel dreams into reality with intelligent budget management and seamless itinerary planning.",
  title: "Trip Savant - Your next adventure, perfectly planned",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
      lang="en"
    >
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
