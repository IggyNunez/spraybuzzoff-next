"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { useBooking } from "@/components/ui/BookingDrawer";
import { PageHero, HERO_TYPE } from "@/components/ui/PageHero";
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
    body: "If it's not plant-based, it does not go in our sprayer. Cedarwood, rosemary, citronella, thyme - botanicals your family can trust.",
  },
  {
    num: "02",
    title: "No Contracts",
    body: "We keep your business by being worth keeping. Pause or cancel anytime. No hidden fees. No lock-in.",
  },
  {
    num: "03",
    title: "Transparent Treatments",
    body: "Secrets are for chemicals - not costs. We tell you exactly what we use, where we apply it, and why it works.",
  },
  {
    num: "04",
    title: "Locally Operated",
    body: "We live in these neighborhoods. Our kids play in these yards. This is personal, not just professional.",
  },
];

const DIFF_ROWS = [
  { feature: "Ingredients", buzzOff: "Plant-based botanicals", traditional: "Synthetic pyrethroids & organophosphates" },
  { feature: "Safe immediately?", buzzOff: "Yes - 30–45 min dry time", traditional: "Hours to days" },
  { feature: "Contract required?", buzzOff: "Never", traditional: "Usually 12-month minimum" },
  { feature: "Scent after treatment", buzzOff: "Light botanical - dissipates in 1 hr", traditional: "Strong chemical smell" },
  { feature: "FIFRA 25(b) exempt?", buzzOff: "Yes - every product", traditional: "No" },
  { feature: "Founded by families?", buzzOff: "Yes - Hayley & Veronnica", traditional: "National chain" },
];

export default function AboutPage() {
  const { open: openBooking } = useBooking();
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Our Story"
          lines={[<>Built Because</>, <span key="accent" className={HERO_TYPE.accent}>Families Deserve</span>, <>Better.</>]}
          imageSrc="/assets/about-hero-new.jpg"
          imageAlt="Buzz Off family-owned natural pest control team treating a residential yard in Rancho Cucamonga"
        >
          <p className={HERO_TYPE.body}>
            Buzz Off started as a personal decision for our own families. We&apos;re in our non-toxic era, paying attention to what surrounds our kids.{" "}
            <strong className="font-bold text-brand-yellow">Peace of mind shouldn&apos;t be optional</strong>{" "}
            when it comes to your home.
          </p>
          <p className="font-body font-semibold text-white mt-6 text-[0.95rem]">
            - The Buzz Off Family
          </p>
        </PageHero>

        {/* ── Origin Story ── */}
        <section className="py-[clamp(64px,8vw,120px)]" style={{ background: "#EDEADE" }}>
          <div className="max-w-[1920px] mx-auto px-[clamp(20px,4vw,48px)]">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <FadeIn delay={0.1}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
                  <video
                    src="/assets/family-about-us.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(21,71,52,0.6) 0%, transparent 60%)" }} />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-display text-[1.6rem] text-white leading-tight">
                      The Buzz Off Family
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="font-body font-bold text-[0.72rem] tracking-[0.25em] uppercase mb-3" style={{ color: "#EFDF00" }}>
                  The Core Mission
                </p>
                <h2 className="font-display text-[clamp(36px,4.5vw,60px)] leading-[1.05] mb-1" style={{ color: "#154734" }}>
                  Why We Started
                </h2>
                <div className="h-[2px] w-16 mb-6" style={{ background: "#FA4616" }} />

                <div className="space-y-5 font-body text-[1rem] leading-relaxed" style={{ color: "#1C2B1E" }}>
                  <p>
                    "Your yard is where first steps happen. Where bare feet run free. We built Buzz Off because our kids play outside too."
                  </p>
                  <p>
                    Traditional pest control hasn't really changed in 50 years. Same synthetic chemicals. Just rebranded as "normal." We questioned it. We read the labels. And we decided to build something better.
                  </p>
                  <p>
                    Every product we use is plant-based botanicals that work without the chemical residues. Because modern families deserve better options.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { val: "500+", label: "Families Protected" },
                    { val: "5.0★", label: "Average Rating" },
                    { val: "0", label: "Synthetic Pesticides" },
                    { val: "100%", label: "Plant-Based" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: "#154734" }}>
                      <p className="font-display text-[2rem] leading-[1.05]" style={{ color: "#EFDF00" }}>{s.val}</p>
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
              <p className="font-body font-bold text-[0.72rem] tracking-[0.25em] uppercase mb-3" style={{ color: "#FA4616" }}>
                What We Stand For
              </p>
              <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-[1.05] mb-1" style={{ color: "#154734" }}>
                The Buzz Off Standard
              </h2>
              <div className="h-[2px] w-16 mx-auto" style={{ background: "#FA4616" }} />
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-6">
              {VALUES.map((v, i) => (
                <FadeIn key={v.num} delay={i * 0.1}>
                  <div
                    className="rounded-2xl p-8 relative overflow-hidden"
                    style={{ background: "#154734" }}
                  >
                    <span
                      className="absolute top-4 right-6 font-display text-[6rem] leading-[1.05] select-none pointer-events-none"
                      style={{ color: "rgba(255,255,255,0.04)" }}
                    >
                      {v.num}
                    </span>
                    <p className="font-display text-[clamp(22px,2.5vw,30px)] leading-tight mb-3" style={{ color: "#EFDF00" }}>
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
              <p className="font-body font-bold text-[0.72rem] tracking-[0.25em] uppercase mb-3" style={{ color: "#FA4616" }}>
                The Smarter Choice
              </p>
              <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-[1.05] mb-1 flex items-center justify-center gap-4 flex-wrap" style={{ color: "#154734" }}>
                <img
                  src="/assets/spraybuzzoffLogo.png"
                  alt="Buzz Off plant-based pest control"
                  className="h-[clamp(90px,14vw,160px)] w-auto object-contain"
                />
                <span>vs Traditional</span>
              </h2>
              <div className="h-[2px] w-16 mx-auto" style={{ background: "#FA4616" }} />
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="rounded-2xl overflow-hidden shadow-lg" style={{ border: "1px solid rgba(21,71,52,0.12)" }}>
                {/* Header row */}
                <div className="grid grid-cols-3 font-body font-bold text-[0.78rem] tracking-[0.12em] uppercase" style={{ background: "#154734", color: "white" }}>
                  <div className="px-6 py-4">Feature</div>
                  <div className="px-6 py-4 border-l" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
                    <span style={{ color: "#FA4616" }}>Buzz Off</span>
                  </div>
                  <div className="px-6 py-4 border-l" style={{ borderColor: "rgba(255,255,255,0.15)" }}>Traditional</div>
                </div>
                {/* Data rows */}
                {DIFF_ROWS.map((row, i) => (
                  <div
                    key={row.feature}
                    className="grid grid-cols-3 font-body text-[0.88rem]"
                    style={{ background: i % 2 === 0 ? "#fff" : "#E0F6E8", borderTop: "1px solid rgba(21,71,52,0.07)" }}
                  >
                    <div className="px-6 py-4 font-semibold" style={{ color: "#1C2B1E" }}>{row.feature}</div>
                    <div className="px-6 py-4 font-bold border-l" style={{ color: "#154734", borderColor: "rgba(21,71,52,0.1)" }}>
                      ✓ {row.buzzOff}
                    </div>
                    <div className="px-6 py-4 border-l" style={{ color: "#6B7B6E", borderColor: "rgba(21,71,52,0.1)" }}>
                      {row.traditional}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative py-[clamp(64px,8vw,100px)] overflow-hidden">
          {/* Background image */}
          <Image
            src="/assets/bottom-bar-petprevention.JPG"
            alt="Buzz Off family-owned plant-based pest control serving the Inland Empire and San Gabriel Valley"
            fill
            className="object-cover object-center"
          />
          {/* Green overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(21,71,52,0.88), rgba(0,177,64,0.72))" }}
          />
          <div className="relative z-10 max-w-[700px] mx-auto px-[clamp(20px,4vw,48px)] text-center">
            <FadeIn>
              <h2 className="font-display text-[clamp(44px,6vw,80px)] leading-[1.05] text-white mb-4">
                Made for Families,<br />
                <span style={{ color: "#EFDF00" }}>Built for Backyards.</span>
              </h2>
              <p className="font-body text-white/75 text-[1rem] mb-8 leading-relaxed">
                Book your first service in minutes. No contracts. No harsh chemicals. Just safer pest control for your family.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openBooking}
                  className="group inline-flex items-center justify-center gap-2 font-body font-bold text-[0.78rem] tracking-[0.12em] uppercase text-white px-10 py-4 rounded-full transition-all hover:opacity-90"
                  style={{ background: "#FA4616" }}
                >
                  Book Your First Service
                  <ArrowIcon className="group-hover:translate-x-1 transition-transform" />
                </button>
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
