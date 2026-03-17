import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Natural Pest Control Services | Mosquito, Interior & Perimeter Protection",
  description:
    "From mosquito prevention to whole home protection, Buzz Off uses only plant-based products safe for your family and pets. Serving the Inland Empire & San Gabriel Valley. No contracts.",
  alternates: { canonical: "https://spraybuzzoff.com/services" },
  openGraph: {
    title: "Natural Pest Control Services | Buzz Off",
    description:
      "Mosquito prevention, perimeter protection, interior treatment & more. All 100% plant-based and safe for families.",
    url: "https://spraybuzzoff.com/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
