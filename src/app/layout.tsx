import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, Playfair_Display } from "next/font/google";
import { BookingProvider } from "@/components/ui/BookingDrawer";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-playfair",
  display: "swap",
});

const SITE_URL = "https://spraybuzzoff.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Plant-Based Pest Control in the Inland Empire & SGV | Buzz Off",
    template: "%s | Buzz Off",
  },
  description:
    "100% plant-based pest control serving Rancho Cucamonga, Upland, Ontario, Claremont & more. FIFRA 25(b) exempt. Safe for kids & pets. No contracts. Family-owned.",
  keywords: [
    "plant-based pest control",
    "natural pest control",
    "FIFRA 25(b) exempt",
    "eco-friendly pest control",
    "pest control Inland Empire",
    "pest control San Gabriel Valley",
    "pest control Rancho Cucamonga",
    "mosquito prevention",
    "organic pest control",
    "safe pest control kids pets",
    "no contract pest control",
    "family-owned pest control",
    "botanical pest control",
    "pest control Upland CA",
    "pest control Ontario CA",
    "pest control Claremont CA",
  ],
  authors: [{ name: "Buzz Off" }],
  creator: "Buzz Off",
  publisher: "Buzz Off",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Buzz Off",
    title: "Plant-Based Pest Control | Safe for Kids & Pets | Buzz Off",
    description:
      "100% plant-based pest control serving the Inland Empire & San Gabriel Valley. FIFRA 25(b) exempt. No contracts. Family-owned.",
    images: [
      {
        url: "/assets/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Buzz Off plant-based pest control — safe for kids, pets, and the people you love",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plant-Based Pest Control | Safe for Kids & Pets | Buzz Off",
    description:
      "100% plant-based pest control serving the Inland Empire & San Gabriel Valley. FIFRA 25(b) exempt. No contracts.",
    images: ["/assets/og-home.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add Google Search Console verification when available
    // google: "your-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable} ${playfair.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="Rancho Cucamonga" />
      </head>
      <body className="antialiased">
        <LocalBusinessJsonLd />
        <BookingProvider>
          {children}
        </BookingProvider>
      </body>
    </html>
  );
}
