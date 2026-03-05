import type { Metadata } from "next";
import { Candal, Nunito } from "next/font/google";
import "./globals.css";

const candal = Candal({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-candal",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Buzz Off | Natural Pest Prevention for Families",
  description:
    "All-natural mosquito & pest control. Safe for kids & pets. Zero synthetic pesticides. FIFRA 25(b) exempt. Serving the Inland Empire & San Gabriel Valley.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${candal.variable} ${nunito.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
