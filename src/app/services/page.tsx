"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { BOOKING_URL } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { MosquitoSVG } from "@/components/ui/pests/MosquitoSVG";
import { CockroachSVG } from "@/components/ui/pests/CockroachSVG";
import { AntSVG } from "@/components/ui/pests/AntSVG";
import { SpiderSVG } from "@/components/ui/pests/SpiderSVG";
import { EarwigSVG } from "@/components/ui/pests/EarwigSVG";
import { TickSVG } from "@/components/ui/pests/TickSVG";
import { WaspSVG } from "@/components/ui/pests/WaspSVG";
import { SilverfishSVG } from "@/components/ui/pests/SilverfishSVG";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const SERVICES = [
  {
    id: "mosquito",
    eyebrow: "Natural Mosquito Shield",
    title: "Your Bite-Free Backyard Starts Here",
    headline: "Stop Mosquitoes at Every Stage",
    body: "Mosquitoes don't just ruin outdoor time — they breed fast and return every season. Our Natural Mosquito Shield targets mosquitoes at every stage of their lifecycle. We combine fogging of foliage and harborage areas with granular treatment in turf, planter beds, and shrubs.",
    image: "/assets/BUZZ OFF PHOTO DUMP/DSC04520.JPG",
    bullets: [
      "Mosquito fogging of foliage and harborage areas",
      "Granular treatment in turf, planter beds, and shrubs",
      "Mosquito bait stations for continuous population control",
      "Standing water and breeding zone inspection",
    ],
    badge: "Mosquito Season: March – November",
    cta: "Book Mosquito Control",
    flip: false,
  },
  {
    id: "perimeter",
    eyebrow: "Natural Perimeter Protection",
    title: "Stop Pests Before They Get Inside — Naturally",
    headline: "A Plant-Based Barrier Around Your Home",
    body: "The best pest control happens before pests ever reach your door. Our Natural Perimeter Protection creates a plant-based barrier around the exterior of your home, treating the foundation, entry points, and common pest pathways with targeted eco-conscious applications.",
    image: "/assets/BUZZ OFF PHOTO DUMP/DSC04500.JPG",
    bullets: [
      "Full exterior de-webbing of eaves, windows, and doorways",
      "Targeted crack and crevice dust application",
      "Exterior foundation and entry-point treatment",
    ],
    badge: "Ants · Spiders · Roaches · Earwigs",
    cta: "Book Perimeter Protection",
    flip: true,
  },
  {
    id: "interior",
    eyebrow: "Natural Whole Home Protection",
    title: "Complete Protection Inside & Out — The Natural Way",
    headline: "Total Peace of Mind, Every Corner",
    body: "For homeowners who want total peace of mind, our Whole Home Protection plan covers every corner — inside and out. Everything in the Natural Perimeter Protection plan is included, plus interior treatment as needed and crack and crevice dust application for long-term prevention inside the home.",
    image: "/assets/BUZZ OFF PHOTO DUMP/DSC04484.JPG",
    bullets: [
      "Everything in the Natural Perimeter Protection Plan",
      "Interior treatment as needed",
      "Interior crack and crevice dust for long-term prevention",
    ],
    badge: "Full Interior + Exterior Coverage",
    cta: "Book Whole Home Protection",
    flip: false,
  },
];

const INGREDIENTS = [
  "Cedarwood Oil",
  "Cinnamon Oil",
  "Thyme Oil",
  "Rosemary Oil",
  "Clove Oil",
  "Citronella Oil",
  "Lemongrass Oil",
  "Cornmint Oil",
  "Geraniol",
];

type PestEntry =
  | { SVG: React.ComponentType<{ className?: string }>; emoji?: never; name: string; note: string }
  | { emoji: string; SVG?: never; name: string; note: string };

const PESTS_WE_TREAT: PestEntry[] = [
  { SVG: MosquitoSVG, name: "Mosquitoes", note: "Yard & perimeter" },
  { SVG: CockroachSVG, name: "Roaches", note: "Interior & exterior" },
  { SVG: AntSVG, name: "Ants", note: "Trails & colonies" },
  { SVG: SpiderSVG, name: "Spiders", note: "Webs & nests" },
  { SVG: EarwigSVG, name: "Earwigs", note: "Garden & entry" },
  { SVG: TickSVG, name: "Fleas & Ticks", note: "Yard treatment" },
  { SVG: SilverfishSVG, name: "Silverfish", note: "Interior crevices" },
  { SVG: WaspSVG, name: "Wasps", note: "Eaves & entry" },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ── Hero ── */}
        <section
          className="relative min-h-[70vh] flex items-end pb-24 pt-40"
          style={{ background: "#1A5C32" }}
        >
          {/* Photo background */}
          <Image
            src="/assets/services-hero.jpg"
            alt="Buzz Off technician treating a residential yard"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(15,61,32,0.88) 0%, rgba(26,92,50,0.72) 100%)" }} />
          <div className="relative max-w-[1920px] mx-auto px-[clamp(20px,4vw,48px)] w-full">
            <FadeIn>
              <p className="font-body font-bold text-[0.72rem] tracking-[0.25em] uppercase mb-3" style={{ color: "#E05A2B" }}>
                Our Services
              </p>
              <h1 className="font-display text-[clamp(52px,8vw,100px)] leading-none uppercase text-white mb-4">
                Plant-Based<br />
                <span style={{ color: "#C8973A" }}>Protection.</span>
              </h1>
              <p className="font-body text-[1.1rem] text-white/80 max-w-xl leading-relaxed">
                Three services. Zero synthetic pesticides. Made for families who want pest control that aligns with the way they actually live.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Gold divider ── */}
        <div className="h-[3px] w-full" style={{ background: "#C8973A" }} />

        {/* ── Services ── */}
        {SERVICES.map((svc, i) => (
          <section
            key={svc.id}
            id={svc.id}
            className="py-[clamp(64px,8vw,120px)]"
            style={{ background: i % 2 === 0 ? "#EDEADE" : "#fff" }}
          >
            <div className="max-w-[1920px] mx-auto px-[clamp(20px,4vw,48px)]">
              <div className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${svc.flip ? "md:[&>*:first-child]:order-2" : ""}`}>
                {/* Image */}
                <FadeIn delay={0.1}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      className="object-cover"
                    />
                    {/* badge */}
                    <div
                      className="absolute bottom-4 left-4 font-body font-bold text-[0.7rem] tracking-[0.18em] uppercase text-white px-4 py-2 rounded-full"
                      style={{ background: "#E05A2B" }}
                    >
                      {svc.badge}
                    </div>
                  </div>
                </FadeIn>

                {/* Content */}
                <FadeIn delay={0.2}>
                  <p className="font-body font-bold text-[0.7rem] tracking-[0.22em] uppercase mb-2" style={{ color: "#E05A2B" }}>
                    {svc.eyebrow}
                  </p>
                  <h2 className="font-display text-[clamp(36px,4.5vw,60px)] leading-none uppercase mb-1" style={{ color: "#1A5C32" }}>
                    {svc.headline}
                  </h2>
                  <div className="h-[2px] w-16 mb-5" style={{ background: "#C8973A" }} />
                  <p className="font-body text-[1rem] leading-relaxed mb-6" style={{ color: "#1C2B1E" }}>
                    {svc.body}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {svc.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 font-body text-[0.92rem]" style={{ color: "#1C2B1E" }}>
                        <span className="mt-0.5 font-bold shrink-0" style={{ color: "#1A5C32" }}>✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-body font-bold text-[0.78rem] tracking-[0.12em] uppercase text-white px-8 py-4 rounded-full transition-all hover:opacity-90"
                    style={{ background: "#1A5C32" }}
                  >
                    {svc.cta}
                    <ArrowIcon className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </FadeIn>
              </div>
            </div>
          </section>
        ))}

        {/* ── What's In Our Formula ── */}
        <section className="py-[clamp(64px,8vw,100px)]" style={{ background: "#1A5C32" }}>
          <div className="max-w-[1920px] mx-auto px-[clamp(20px,4vw,48px)]">
            <FadeIn className="text-center mb-12">
              <p className="font-body font-bold text-[0.72rem] tracking-[0.25em] uppercase mb-3" style={{ color: "#E05A2B" }}>
                Ingredient Transparency
              </p>
              <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-none uppercase text-white mb-4">
                What's In Our Formula
              </h2>
              <div className="h-[2px] w-16 mx-auto mb-5" style={{ background: "#C8973A" }} />
              <p className="font-body text-white/75 text-[1rem] max-w-xl mx-auto leading-relaxed">
                Every product is FIFRA 25(b) exempt. No synthetic pyrethroids. No organophosphates. No harsh chemicals. Just botanicals.
              </p>
            </FadeIn>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {INGREDIENTS.map((ing, i) => (
                <FadeIn key={ing} delay={i * 0.06}>
                  <div
                    className="rounded-xl px-4 py-4 text-center font-body font-semibold text-[0.85rem] text-white"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
                  >
                    {ing}
                  </div>
                </FadeIn>
              ))}
              <FadeIn delay={INGREDIENTS.length * 0.06}>
                <div
                  className="rounded-xl px-4 py-4 text-center font-body font-bold text-[0.75rem] tracking-widest uppercase"
                  style={{ background: "rgba(200,151,58,0.15)", border: "1px solid rgba(200,151,58,0.3)", color: "#C8973A" }}
                >
                  100% Plant-Based
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── Pests We Treat ── */}
        <section className="py-[clamp(64px,8vw,100px)]" style={{ background: "#EDEADE" }}>
          <div className="max-w-[1920px] mx-auto px-[clamp(20px,4vw,48px)]">
            <FadeIn className="text-center mb-12">
              <p className="font-body font-bold text-[0.72rem] tracking-[0.25em] uppercase mb-3" style={{ color: "#E05A2B" }}>
                Full Coverage
              </p>
              <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-none uppercase mb-1" style={{ color: "#1A5C32" }}>
                Pests We Treat
              </h2>
              <div className="h-[2px] w-16 mx-auto" style={{ background: "#C8973A" }} />
            </FadeIn>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {PESTS_WE_TREAT.map((pest, i) => (
                <FadeIn key={pest.name} delay={i * 0.07}>
                  <div
                    className="rounded-2xl p-6 text-center flex flex-col items-center"
                    style={{ background: "#fff", border: "1px solid rgba(26,92,50,0.1)", boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}
                  >
                    <div className="w-16 h-16 mb-3 flex items-center justify-center">
                      {pest.SVG ? (
                        <pest.SVG className="w-full h-full" />
                      ) : (
                        <span className="text-4xl">{pest.emoji}</span>
                      )}
                    </div>
                    <p className="font-body font-bold text-[0.92rem] mb-1" style={{ color: "#1C2B1E" }}>{pest.name}</p>
                    <p className="font-body text-[0.78rem]" style={{ color: "#6B7B6E" }}>{pest.note}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-[clamp(64px,8vw,100px)]" style={{ background: "#0F3D20" }}>
          <div className="max-w-[700px] mx-auto px-[clamp(20px,4vw,48px)] text-center">
            <FadeIn>
              <h2 className="font-display text-[clamp(44px,6vw,80px)] leading-none uppercase text-white mb-4">
                Ready to Live<br />
                <span style={{ color: "#C8973A" }}>Outside Again?</span>
              </h2>
              <p className="font-body text-white/75 text-[1rem] mb-8 leading-relaxed">
                Book your first service in minutes. No contracts. No harsh chemicals. Just safer pest control for your family.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 font-body font-bold text-[0.78rem] tracking-[0.12em] uppercase text-white px-10 py-4 rounded-full transition-all hover:opacity-90"
                  style={{ background: "#E05A2B" }}
                >
                  Book Your First Service
                  <ArrowIcon className="group-hover:translate-x-1 transition-transform" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 font-body font-bold text-[0.78rem] tracking-[0.12em] uppercase px-10 py-4 rounded-full transition-all hover:bg-white/10"
                  style={{ border: "2px solid rgba(255,255,255,0.3)", color: "white" }}
                >
                  Call the Team
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
