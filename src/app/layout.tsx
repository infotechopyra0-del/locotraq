import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppChatBot from "@/components/WhatsAppChatBot";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

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
    icon: "/images/MainLogo.jpg",
    apple: "/images/MainLogo.jpg",
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1f2937" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Locotraq" />
        <link rel="apple-touch-icon" href="/images/MainLogo.jpg" />
        <meta name="msapplication-TileColor" content="#1f2937" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="google-site-verification" content="jier1Y4IG14gGypdu6dRExc2y3gSH1I9nxtl8ult6gA" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `} suppressHydrationWarning>
      <Header />
          <main>
            {children}
          </main>
          <Footer />
          <WhatsAppChatBot />
          <ServiceWorkerRegister />
      </body>
    </html>
  );
}

const categories = [
    { name: 'VEHICAL TRACKERS', image: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-2196644631-68b876f1b7c39.jpg?crop=1xw:1xh;center,top', link: '/shop?category=tops' },
    { name: 'PERSONAL TRACKERS', image: 'https://media.wired.com/photos/593278065c4fbd732b552ed0/3:2/w_2560%2Cc_limit/GPS-Tracker-in-Hands_Jon-Snyder.jpg', link: '/shop?category=abayas' },
    { name: 'FLEET MANAGEMENT', image: 'https://stavecorp.com/wp-content/uploads/2025/05/FTSM-Post-Photo1.jpg', link: '/shop?category=co-ords' },
    { name: 'INDUSTRIAL SOLUTIONS', image: 'https://tiindia.com/wp-content/uploads/2021/09/cg-power-bg.jpg', link: '/shop?category=dresses' }
  ];