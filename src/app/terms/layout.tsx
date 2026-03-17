import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Review the terms of service for Buzz Off, a plant-based pest control service serving Rancho Cucamonga, Upland, Ontario and surrounding areas in California.",
  alternates: { canonical: "https://spraybuzzoff.com/terms" },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
