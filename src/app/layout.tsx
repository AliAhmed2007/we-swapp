import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "We-Swap | Campus Exchange Platform",
  description: "Hyper-localized student exchange platform. Reuse • Exchange • Connect. Zero AI, zero shipping, zero waste.",
  keywords: ["campus marketplace", "student exchange", "reuse", "sustainability", "peer-to-peer"],
  authors: [{ name: "We-Swap Team" }],
  icons: {
    icon: '/weswap-icon.jpeg',
    apple: '/weswap-icon.jpeg',
  },
  openGraph: {
    title: "We-Swap | Campus Exchange Platform",
    description: "Reuse • Exchange • Connect",
    type: "website",
    images: ['/weswap-icon.jpeg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
