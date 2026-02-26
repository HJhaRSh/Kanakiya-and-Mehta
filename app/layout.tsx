import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import BackToTop from "@/components/ui/BackToTop";
import PageTransition from "@/components/ui/PageTransition";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Kanakiya & Mehta Associates | Chartered Accountants | Ahmednagar, Pune, Mumbai",
    template: "%s | Kanakiya & Mehta Associates",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  description:
    "Chartered Accountancy firm established in 1989. ISO 9001:2008 certified, CAG & RBI empanelled. Statutory audit, tax advisory, co-op bank audits, and corporate compliance across Maharashtra.",
  keywords: [
    "Chartered Accountants",
    "Ahmednagar",
    "Pune",
    "Mumbai",
    "CA firm",
    "statutory audit",
    "tax advisory",
    "co-operative bank audit",
    "RBI empanelled",
    "ICAI",
  ],
  openGraph: {
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${dmSans.variable}`}>
      <body className="antialiased font-sans text-gray-700 overflow-x-hidden">
        <Navbar />
        <main className="min-h-screen">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
