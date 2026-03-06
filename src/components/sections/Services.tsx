"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { SERVICES_FEATURED, SERVICES_SMALL, BOOKING_URL } from "@/lib/constants";
import { ArchedEyebrow } from "@/components/ui/ArchedEyebrow";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Arrow icon ── */
function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 6h8M6 2l4 4-4 4" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Featured Card — Desktop: hover slide-up
   ═══════════════════════════════════════════════ */
function FeaturedCardDesktop({
  service,
  delay,
  isInView,
}: {
  service: (typeof SERVICES_FEATURED)[number];
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="hidden md:block relative rounded-2xl overflow-hidden group cursor-pointer"
      style={{ aspectRatio: "4/3" }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: EASE }}
    >
      {/* Full image */}
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Dark gradient — always visible at bottom for title legibility */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: "linear-gradient(to top, rgba(15,61,32,0.85) 0%, rgba(15,61,32,0.4) 40%, transparent 70%)",
        }}
      />

      {/* Hover overlay — darker for content legibility */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(to top, rgba(15,61,32,0.95) 0%, rgba(15,61,32,0.75) 50%, rgba(15,61,32,0.5) 100%)",
        }}
      />

      {/* Label badge — top left */}
      <div className="absolute top-5 left-5 z-10">
        <span className="font-body text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white bg-[#1A5C32] px-3 py-1.5 rounded-full">
          {service.label}
        </span>
      </div>

      {/* Content — slides up on hover */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
        {/* Title — always visible */}
        <h3 className="font-display text-[clamp(1.5rem,2.5vw,2rem)] uppercase text-white leading-tight mb-2 tracking-wide">
          {service.title}
        </h3>

        {/* Slide-up content */}
        <div className="max-h-0 group-hover:max-h-[400px] overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <div className="pt-2">
            <div className="h-[2px] w-10 bg-[#C8973A] mb-4" />
            <p className="font-body text-[0.9rem] leading-relaxed text-white/80 mb-4">
              {service.description}
            </p>
            {service.bullets && (
              <ul className="space-y-2 mb-5">
                {service.bullets.map((b: string) => (
                  <li key={b} className="flex items-center gap-2 font-body text-[0.82rem] text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8973A] shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-[0.75rem] font-bold tracking-[0.1em] uppercase text-[#C8973A] hover:text-white transition-colors"
            >
              Book Now
              <Arrow />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Featured Card — Mobile: 3D flip
   ═══════════════════════════════════════════════ */
function FeaturedCardMobile({
  service,
  delay,
  isInView,
}: {
  service: (typeof SERVICES_FEATURED)[number];
  delay: number;
  isInView: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="md:hidden"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: EASE }}
    >
      <div
        className="relative w-full cursor-pointer"
        style={{ aspectRatio: "3/4" }}
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* ── FRONT — Image ── */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(15,61,32,0.85) 0%, rgba(15,61,32,0.3) 50%, transparent 70%)",
              }}
            />
            {/* Label */}
            <div className="absolute top-4 left-4">
              <span className="font-body text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white bg-[#1A5C32] px-3 py-1.5 rounded-full">
                {service.label}
              </span>
            </div>
            {/* Title + tap hint */}
            <div className="absolute bottom-5 left-5 right-5">
              <h3 className="font-display text-[1.6rem] uppercase text-white leading-tight mb-2">
                {service.title}
              </h3>
              <p className="font-body text-[0.65rem] tracking-[0.15em] uppercase text-white/50">
                Tap to learn more →
              </p>
            </div>
          </div>

          {/* ── BACK — Content ── */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col justify-center px-6 py-8"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "#1A5C32",
            }}
          >
            <span className="font-body text-[0.6rem] font-bold tracking-[0.2em] uppercase text-[#E05A2B] mb-2">
              {service.label}
            </span>
            <h3 className="font-display text-[1.5rem] uppercase text-white leading-tight mb-3">
              {service.title}
            </h3>
            <div className="h-[2px] w-10 bg-[#C8973A] mb-4" />
            <p className="font-body text-[0.88rem] leading-relaxed text-white/80 mb-4">
              {service.description}
            </p>
            {service.bullets && (
              <ul className="space-y-2 mb-5">
                {service.bullets.map((b: string) => (
                  <li key={b} className="flex items-center gap-2 font-body text-[0.8rem] text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8973A] shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-[0.75rem] font-bold tracking-[0.1em] uppercase text-[#C8973A]"
              onClick={(e) => e.stopPropagation()}
            >
              Book Now <Arrow />
            </a>
            <p className="font-body text-[0.6rem] tracking-[0.15em] uppercase text-white/30 mt-4">
              Tap to flip back
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Small Card — Desktop: hover slide-up
   ═══════════════════════════════════════════════ */
function SmallCardDesktop({
  service,
  delay,
  isInView,
}: {
  service: (typeof SERVICES_SMALL)[number];
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="hidden md:block relative rounded-xl overflow-hidden group cursor-pointer"
      style={{ aspectRatio: "3/4" }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: EASE }}
    >
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {/* Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(15,61,32,0.85) 0%, rgba(15,61,32,0.3) 45%, transparent 70%)",
        }}
      />

      {/* Content — bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5">
        <span className="font-body text-[0.55rem] font-bold tracking-[0.2em] uppercase text-[#E05A2B] block mb-1">
          {service.label}
        </span>
        <h4 className="font-display text-[1.2rem] uppercase text-white leading-tight">
          {service.title}
        </h4>

        {/* Hover reveal — Book Now link */}
        <div className="max-h-0 group-hover:max-h-[60px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-[0.7rem] font-bold tracking-[0.1em] uppercase text-[#C8973A] hover:text-white transition-colors mt-3"
          >
            Book Now <Arrow />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Small Card — Mobile: tap to flip
   ═══════════════════════════════════════════════ */
function SmallCardMobile({
  service,
  delay,
  isInView,
}: {
  service: (typeof SERVICES_SMALL)[number];
  delay: number;
  isInView: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="md:hidden"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: EASE }}
    >
      <div
        className="relative w-full cursor-pointer"
        style={{ aspectRatio: "3/4" }}
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(15,61,32,0.85) 0%, rgba(15,61,32,0.3) 50%, transparent 70%)",
              }}
            />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="font-body text-[0.55rem] font-bold tracking-[0.2em] uppercase text-[#E05A2B] block mb-1">
                {service.label}
              </span>
              <h4 className="font-display text-[1.1rem] uppercase text-white leading-tight">
                {service.title}
              </h4>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden flex flex-col justify-center items-center px-5 py-6 text-center"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "#1A5C32",
            }}
          >
            <span className="font-body text-[0.55rem] font-bold tracking-[0.2em] uppercase text-[#E05A2B] mb-2">
              {service.label}
            </span>
            <h4 className="font-display text-[1.15rem] uppercase text-white leading-tight mb-3">
              {service.title}
            </h4>
            <div className="h-[2px] w-8 bg-[#C8973A] mb-3" />
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-[0.7rem] font-bold tracking-[0.1em] uppercase text-[#C8973A]"
              onClick={(e) => e.stopPropagation()}
            >
              Book Now <Arrow />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Main Services Section
   ═══════════════════════════════════════════════ */
export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <section id="services" className="relative py-24 md:py-32 bg-white" ref={ref}>
      <div className="max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <ArchedEyebrow>What We Do</ArchedEyebrow>
          </motion.div>
          <motion.h2
            className="section-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Our Services
          </motion.h2>
          <motion.div
            className="gold-divider mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          />
          <motion.p
            className="font-body text-[1rem] text-[#1C2B1E]/60 max-w-[480px] mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Plant-based pest protection made for families, built for backyards.
          </motion.p>
        </div>

        {/* Featured Cards — 2 large */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {SERVICES_FEATURED.map((service, i) => (
            <div key={service.title}>
              <FeaturedCardDesktop service={service} delay={0.1 + i * 0.1} isInView={isInView} />
              <FeaturedCardMobile service={service} delay={0.1 + i * 0.1} isInView={isInView} />
            </div>
          ))}
        </div>

        {/* Small Cards — 4 grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {SERVICES_SMALL.map((service, i) => (
            <div key={service.title}>
              <SmallCardDesktop service={service} delay={0.2 + i * 0.08} isInView={isInView} />
              <SmallCardMobile service={service} delay={0.2 + i * 0.08} isInView={isInView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
