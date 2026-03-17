import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Free Quote | Contact Buzz Off Natural Pest Control",
  description:
    "Ready for plant-based pest control? Contact Buzz Off for a free quote. We serve Rancho Cucamonga, Upland, Ontario, Claremont, Glendora, San Dimas, Fontana, Pomona & more. No contracts.",
  alternates: { canonical: "https://spraybuzzoff.com/contact" },
  openGraph: {
    title: "Contact Buzz Off | Get a Free Pest Control Quote",
    description:
      "Request a free quote for plant-based pest control. Serving the Inland Empire & San Gabriel Valley. No contracts.",
    url: "https://spraybuzzoff.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
