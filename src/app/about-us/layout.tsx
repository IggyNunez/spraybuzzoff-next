import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Buzz Off | Family-Owned Plant-Based Pest Control",
  description:
    "Buzz Off is a family-owned pest control company committed to 100% plant-based solutions. Learn why we chose FIFRA 25(b) exempt products to keep Inland Empire families safe.",
  alternates: { canonical: "https://spraybuzzoff.com/about-us" },
  openGraph: {
    title: "About Buzz Off | Family-Owned Plant-Based Pest Control",
    description:
      "Learn about our family-owned business and why we chose 100% plant-based pest control for the Inland Empire and San Gabriel Valley.",
    url: "https://spraybuzzoff.com/about-us",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
