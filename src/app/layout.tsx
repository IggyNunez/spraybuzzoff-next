import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
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

export const metadata: Metadata = {
  title: "Buzz Off | Natural Pest Prevention for Families",
  description:
    "100% plant-based pest control. Safe for kids, pets, and the people you love. FIFRA 25(b) exempt. Serving the Inland Empire & San Gabriel Valley. License #PR 10014.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable} ${playfair.variable}`}>
      <body className="antialiased">
        {children}
        <Script id="gorilladesk-portal" strategy="lazyOnload">{`
          var _gorilla = _gorilla || {};
          _gorilla.account_id = '6ec9a648e09a4e84586a1f4b425472e3';
          var _gorillaInitPortal = function () {
            var a = document.createElement('script');
            a.type = 'text/javascript';
            a.async = true;
            a.defer = true;
            a.src = 'https://portal-embed-v3.gorilladesk.com/js/booking/booking.js';
            var b = document.getElementsByTagName('script')[0];
            b.parentNode.insertBefore(a, b);
          };
          _gorillaInitPortal();
        `}</Script>
      </body>
    </html>
  );
}
