import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GhostCursor from "../components/GhostCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Storytelling Portfolio",
  description: "A Jitter-inspired storytelling portfolio.",
};

import { CursorProvider } from "../context/CursorContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <CursorProvider>
          <GhostCursor />
          {children}
        </CursorProvider>
      </body>
    </html>
  );
}
