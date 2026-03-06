"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { BOOKING_URL } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

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

const VALUES = [
  {
    num: "01",
    title: "100% Plant-Based",
    body: "If it's not plant-based, it does not go in our sprayer. Cedarwood, rosemary, citronella, thyme — botanicals your family can trust.",
  },
  {
    num: "02",
    title: "No Contracts",
    body: "We keep your business by being worth keeping. Pause or cancel anytime. No hidden fees. No lock-in.",
  },
  {
    num: "03",
    title: "Transparent Treatments",
    body: "Secrets are for chemicals — not costs. We tell you exactly what we use, where we apply it, and why it works.",
  },
  {
    num: "04",
    title: "Locally Operated",
    body: "We live in these neighborhoods. Our kids play in these yards. This is personal, not just professional.",
  },
];

const DIFF_ROWS = [
  { feature: "Ingredients", buzzOff: "Plant-based botanicals", traditional: "Synthetic pyrethroids & organophosphates" },
  { feature: "Safe immediately?", buzzOff: "Yes — 30–45 min dry time", traditional: "Hours to days" },
  { feature: "Contract required?", buzzOff: "Never", traditional: "Usually 12-month minimum" },
  { feature: "Scent after treatment", buzzOff: "Light botanical — dissipates in 1 hr", traditional: "Strong chemical smell" },
  { feature: "FIFRA 25(b) exempt?", buzzOff: "Yes — every product", traditional: "No" },
  { feature: "Founded by families?", buzzOff: "Yes — Hayley & Veronnica", traditional: "National chain" },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ── Hero ── */}
        <section
          className="relative min-h-[72vh] flex items-end pb-24 pt-40 overflow-hidden"
          style={{ background: "#0F3D20" }}
        >
          {/* Full background photo */}
          <Image
            src="/assets/about-hero.jpg"
            alt="Buzz Off technician treating a residential yard"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient overlay — heavier on left for text legibility */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(15,61,32,0.92) 0%, rgba(15,61,32,0.75) 55%, rgba(15,61,32,0.4) 100%)" }} />
          <div className="relative max-w-[1920px] mx-auto px-[clamp(20px,4vw,48px)] w-full">
            <FadeIn className="max-w-[560px]">
              <p className="font-body font-bold text-[0.72rem] tracking-[0.25em] uppercase mb-3" style={{ color: "#E05A2B" }}>
                Our Story
              </p>
              <h1 className="font-display text-[clamp(52px,7vw,90px)] leading-none uppercase text-white mb-5">
                Built Because<br />
                <span style={{ color: "#C8973A" }}>Families Deserve</span><br />
                Better.
              </h1>
              <p className="font-body text-white/75 text-[1.05rem] leading-relaxed max-w-md">
                Buzz Off started as a personal decision for our own families. We're in our non-toxic era, paying attention to what surrounds our kids.{" "}
                <strong className="font-bold" style={{ color: "#C8973A" }}>Peace of mind shouldn't be optional</strong>{" "}
                when it comes to your home.
              </p>
              <p className="font-body font-semibold text-white mt-6 text-[0.95rem]">
                — Hayley &amp; Veronnica
                <span className="font-normal text-white/50 ml-2 text-[0.78rem] tracking-widest uppercase">Moms &amp; Founders</span>
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Gold divider ── */}
        <div className="h-[3px] w-full" style={{ background: "#C8973A" }} />

        {/* ── Origin Story ── */}
        <section className="py-[clamp(64px,8vw,120px)]" style={{ background: "#EDEADE" }}>
          <div className="max-w-[1920px] mx-auto px-[clamp(20px,4vw,48px)]">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <FadeIn delay={0.1}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
                  <Image
                    src="/assets/girls-with-truck.avif"
                    alt="Hayley & Veronnica — Moms and Founders of Buzz Off"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,61,32,0.6) 0%, transparent 60%)" }} />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-display text-[1.6rem] uppercase text-white leading-tight">
                      Hayley &amp; Veronnica
                    </p>
                    <p className="font-body text-[0.78rem] tracking-widest uppercase text-white/70 mt-1">
                      Moms &amp; Founders · Buzz Off Pest Prevention
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="font-body font-bold text-[0.72rem] tracking-[0.25em] uppercase mb-3" style={{ color: "#E05A2B" }}>
                  The Core Mission
                </p>
                <h2 className="font-display text-[clamp(36px,4.5vw,60px)] leading-none uppercase mb-1" style={{ color: "#1A5C32" }}>
                  Why We Started
                </h2>
                <div className="h-[2px] w-16 mb-6" style={{ background: "#C8973A" }} />

                <div className="space-y-5 font-body text-[1rem] leading-relaxed" style={{ color: "#1C2B1E" }}>
                  <p>
                    "Your yard is where first steps happen. Where bare feet run free. We built Buzz Off because our kids play outside too."
                  </p>
                  <p>
                    Traditional pest control hasn't really changed in 50 years. Same synthetic chemicals. Just rebranded as "normal." We questioned it. We read the labels. And we decided to build something better.
                  </p>
                  <p>
                    Every product we use is FIFRA 25(b) exempt — plant-based botanicals that work without the chemical residues. Because modern families deserve better options.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { val: "500+", label: "Families Protected" },
                    { val: "5.0★", label: "Average Rating" },
                    { val: "0", label: "Synthetic Pesticides" },
                    { val: "100%", label: "Plant-Based" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: "#1A5C32" }}>
                      <p className="font-display text-[2rem] leading-none" style={{ color: "#C8973A" }}>{s.val}</p>
                      <p className="font-body font-bold text-[0.7rem] tracking-widest uppercase text-white/70 mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="py-[clamp(64px,8vw,100px)]" style={{ background: "#fff" }}>
          <div className="max-w-[1920px] mx-auto px-[clamp(20px,4vw,48px)]">
            <FadeIn className="text-center mb-12">
              <p className="font-body font-bold text-[0.72rem] tracking-[0.25em] uppercase mb-3" style={{ color: "#E05A2B" }}>
                What We Stand For
              </p>
              <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-none uppercase mb-1" style={{ color: "#1A5C32" }}>
                The Buzz Off Standard
              </h2>
              <div className="h-[2px] w-16 mx-auto" style={{ background: "#C8973A" }} />
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-6">
              {VALUES.map((v, i) => (
                <FadeIn key={v.num} delay={i * 0.1}>
                  <div
                    className="rounded-2xl p-8 relative overflow-hidden"
                    style={{ background: "#1A5C32" }}
                  >
                    <span
                      className="absolute top-4 right-6 font-display text-[6rem] leading-none select-none pointer-events-none"
                      style={{ color: "rgba(255,255,255,0.04)" }}
                    >
                      {v.num}
                    </span>
                    <p className="font-display text-[clamp(22px,2.5vw,30px)] uppercase leading-tight mb-3" style={{ color: "#C8973A" }}>
                      {v.title}
                    </p>
                    <div className="h-[1px] mb-4" style={{ background: "rgba(255,255,255,0.12)" }} />
                    <p className="font-body text-[0.95rem] leading-relaxed text-white/80">
                      {v.body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Comparison Chart ── */}
        <section className="py-[clamp(64px,8vw,100px)]" style={{ background: "#EDEADE" }}>
          <div className="max-w-[1000px] mx-auto px-[clamp(20px,4vw,48px)]">
            <FadeIn className="text-center mb-12">
              <p className="font-body font-bold text-[0.72rem] tracking-[0.25em] uppercase mb-3" style={{ color: "#E05A2B" }}>
                The Smarter Choice
              </p>
              <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-none uppercase mb-1 flex items-center justify-center gap-4 flex-wrap" style={{ color: "#1A5C32" }}>
                <img
                  src="/assets/spraybuzzoffLogo.png"
                  alt="Buzz Off"
                  className="h-[clamp(90px,14vw,160px)] w-auto object-contain"
                />
                <span>vs Traditional</span>
              </h2>
              <div className="h-[2px] w-16 mx-auto" style={{ background: "#C8973A" }} />
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="rounded-2xl overflow-hidden shadow-lg" style={{ border: "1px solid rgba(26,92,50,0.12)" }}>
                {/* Header row */}
                <div className="grid grid-cols-3 font-body font-bold text-[0.78rem] tracking-[0.12em] uppercase" style={{ background: "#1A5C32", color: "white" }}>
                  <div className="px-6 py-4">Feature</div>
                  <div className="px-6 py-4 border-l" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
                    <span style={{ color: "#C8973A" }}>Buzz Off</span>
                  </div>
                  <div className="px-6 py-4 border-l" style={{ borderColor: "rgba(255,255,255,0.15)" }}>Traditional</div>
                </div>
                {/* Data rows */}
                {DIFF_ROWS.map((row, i) => (
                  <div
                    key={row.feature}
                    className="grid grid-cols-3 font-body text-[0.88rem]"
                    style={{ background: i % 2 === 0 ? "#fff" : "#EAF2EC", borderTop: "1px solid rgba(26,92,50,0.07)" }}
                  >
                    <div className="px-6 py-4 font-semibold" style={{ color: "#1C2B1E" }}>{row.feature}</div>
                    <div className="px-6 py-4 font-bold border-l" style={{ color: "#1A5C32", borderColor: "rgba(26,92,50,0.1)" }}>
                      ✓ {row.buzzOff}
                    </div>
                    <div className="px-6 py-4 border-l" style={{ color: "#6B7B6E", borderColor: "rgba(26,92,50,0.1)" }}>
                      {row.traditional}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-[clamp(64px,8vw,100px)] relative overflow-hidden" style={{ background: "#1A5C32" }}>
          <div className="max-w-[700px] mx-auto px-[clamp(20px,4vw,48px)] text-center relative z-10">
            <FadeIn>
              <h2 className="font-display text-[clamp(44px,6vw,80px)] leading-none uppercase text-white mb-4">
                Made for Families,<br />
                <span style={{ color: "#C8973A" }}>Built for Backyards.</span>
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
              <p className="font-body text-[0.78rem] text-white/40 mt-6 tracking-widest uppercase">
                License #PR 10014 · SGV &amp; Inland Empire, CA
              </p>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
