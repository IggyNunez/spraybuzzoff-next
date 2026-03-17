import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the privacy policy for Buzz Off, a plant-based pest control company serving the Inland Empire and San Gabriel Valley, California.",
  alternates: { canonical: "https://spraybuzzoff.com/privacy" },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
