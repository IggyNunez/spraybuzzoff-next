import React from "react";
import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/sections/Hero";
import { MarqueeTicker } from "@/components/sections/MarqueeTicker";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { ComparisonChart } from "@/components/sections/ComparisonChart";
import { Plans } from "@/components/sections/Plans";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { AreasMarquee } from "@/components/sections/AreasMarquee";
import { CTAContact } from "@/components/sections/CTAContact";
import { Footer } from "@/components/layout/Footer";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { FAQS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Plant-Based Pest Control in the Inland Empire & SGV | Buzz Off",
  description:
    "100% plant-based pest control serving Rancho Cucamonga, Upland, Ontario, Claremont & more. FIFRA 25(b) exempt. Safe for kids & pets. No contracts. Family-owned.",
  alternates: { canonical: "https://spraybuzzoff.com" },
};

export default function Home() {
  return (
    <>
      <FAQJsonLd faqs={FAQS} />
      <Nav />
      <main className="w-full min-w-full">
        {/* Hero (with frosted StatsBar overlay) + Marquee strip */}
        <div className="section-card mt-2">
          <Hero />
          <MarqueeTicker />
        </div>

        {/* Services */}
        <div className="section-card mt-2">
          <Services />
        </div>

        {/* Process */}
        <div className="section-card mt-2">
          <Process />
        </div>

        {/* Brand Statement */}
        <div className="section-card mt-2">
          <BrandStatement />
        </div>

        {/* Comparison Chart */}
        <div className="section-card mt-2">
          <ComparisonChart />
        </div>

        {/* Plans */}
        <div className="section-card mt-2">
          <Plans />
        </div>

        {/* Testimonials */}
        <div className="section-card mt-2">
          <Testimonials />
        </div>

        {/* FAQ */}
        <div className="section-card mt-2">
          <FAQ />
        </div>

        {/* Areas Marquee + CTA Contact */}
        <div className="section-card mt-2">
          <AreasMarquee />
          <CTAContact />
        </div>
      </main>

      {/* Footer — rounded card */}
      <div className="section-card mt-2 mb-2">
        <Footer />
      </div>
    </>
  );
}
