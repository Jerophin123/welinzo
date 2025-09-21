import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import BottomNavigation from "@/components/BottomNavigation";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welinzo - Premium E-Commerce Experience",
  description: "Discover amazing products with our premium liquid glass design and smooth animations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 min-h-screen`}
      >
        <Navigation />
        <main className="pt-[50px] md:pt-16 pb-20 md:pb-0 min-h-screen mobile-container">
          {children}
        </main>
        <BottomNavigation />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
