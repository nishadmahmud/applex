import { Inter } from "next/font/google";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MobileBottomNav from "../components/MobileBottomNav/MobileBottomNav";
import Providers from "../components/Providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Applex | Premium Smartphones & Devices",
  description: "Bangladesh's premier destination for authentic smartphones, tablets, and tech accessories. Shop iPhone, Samsung, OnePlus & more at Applex.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Applex | Premium Smartphones & Devices",
    description: "Bangladesh's premier destination for authentic smartphones, tablets, and tech accessories.",
    url: "https://applex.com.bd",
    siteName: "Applex",
    images: [
      {
        url: "/og.jpeg",
        width: 1200,
        height: 630,
        alt: "Applex - Premium Smartphones & Devices",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Applex | Premium Smartphones & Devices",
    description: "Bangladesh's premier destination for authentic smartphones, tablets, and tech accessories.",
    images: ["/og.jpeg"],
  },
};

export default async function RootLayout({ children }) {
  const categories = [
    { id: 1, name: "iPhone", slug: "iphone" },
    { id: 2, name: "Samsung", slug: "samsung" },
    { id: 3, name: "OnePlus", slug: "oneplus" },
    { id: 4, name: "Xiaomi", slug: "xiaomi" },
    { id: 5, name: "Google Pixel", slug: "google-pixel" },
    { id: 6, name: "Tablets", slug: "tablets" },
    { id: 7, name: "Accessories", slug: "accessories" },
  ];

  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-900 pb-16 md:pb-0`}
      >
        <Providers>
          <Header categories={categories} />
          <main className="min-h-screen flex flex-col">
            {children}
          </main>
          <MobileBottomNav />
          <Footer categories={categories} />
        </Providers>
      </body>
    </html>
  );
}
