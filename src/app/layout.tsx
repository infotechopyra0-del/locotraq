import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppChatBot from "@/components/WhatsAppChatBot";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import { Providers } from './providers';
import { Toaster } from 'sonner';
import Navbar from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Locotraq - GPS Tracking Solutions",
  description: "Leading GPS tracking solutions for vehicles, assets, and fleet management. Trusted by 10,000+ customers worldwide.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Locotraq",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/MainLogo.jpg", sizes: "any" },
      { url: "/icon512_rounded.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/images/MainLogo.jpg" },
      { url: "/icon512_maskable.png", sizes: "512x512", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1f2937',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/MainLogo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/MainLogo.jpg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1f2937" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Locotraq" />
        <meta name="msapplication-TileColor" content="#1f2937" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="google-site-verification" content="jier1Y4IG14gGypdu6dRExc2y3gSH1I9nxtl8ult6gA" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `} suppressHydrationWarning>
          <main>
            <Providers>{children}</Providers>
          </main>
          <WhatsAppChatBot />
          <ServiceWorkerRegister />
          <Toaster 
            position="top-right"
            richColors
            closeButton
            expand
            duration={4000}
          />
      </body>
    </html>
  );
}