import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews | Buzz Off Plant-Based Pest Control",
  description:
    "Read real 5-star reviews from families across the Inland Empire and San Gabriel Valley. See why homeowners trust Buzz Off for 100% plant-based pest control.",
  alternates: { canonical: "https://spraybuzzoff.com/reviews" },
  openGraph: {
    title: "Reviews | Buzz Off Plant-Based Pest Control",
    description:
      "Read real 5-star reviews from families across the Inland Empire and San Gabriel Valley.",
    url: "https://spraybuzzoff.com/reviews",
  },
};

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
