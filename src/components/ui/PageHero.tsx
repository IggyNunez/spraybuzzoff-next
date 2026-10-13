"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * One hero system for every photo and video hero on the site.
 *
 * The home hero (video + stats bar) and the interior page heroes (photo) used
 * to drift apart: different case, fonts, overlays, heights and left edges.
 * Everything that should look the same now lives here, and the home hero
 * imports the same type styles and overlay rather than restating them.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Shared type styles. Display font is Donut Shop, mixed case, single weight. */
export const HERO_TYPE = {
  eyebrow:
    "font-body font-bold text-[0.72rem] tracking-[0.25em] uppercase text-brand-yellow mb-4",
  // 38px floor: measured so two-word accent lines ("Customers Say.") fit a
  // 375px phone on one line instead of breaking word by word.
  title:
    "font-display text-[clamp(38px,6vw,88px)] leading-[1.04] text-white mb-5 [text-wrap:balance]",
  accent: "text-brand-yellow",
  body: "font-body text-[1.05rem] leading-relaxed text-white/85 max-w-[34rem]",
} as const;

/**
 * Readability overlay. Deep brand green (3435 C) behind the copy, fading out
 * across the image so the photo or video keeps its natural color. No blend
 * modes and no bright 354 C wash: multiplying bright green over footage turned
 * the whole home hero video green.
 */
export function HeroOverlay() {
  return (
    <>
      {/* Mobile: copy spans the full width, so darken evenly */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,50,36,0.55) 0%, rgba(15,50,36,0.70) 55%, rgba(15,50,36,0.88) 100%)",
        }}
      />
      {/* Desktop: dark behind the copy on the left, clear on the right */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(15,50,36,0.88) 0%, rgba(15,50,36,0.66) 38%, rgba(15,50,36,0.22) 72%, rgba(15,50,36,0.08) 100%)",
        }}
      />
      {/* Light top and bottom vignette so the nav pill and edges read cleanly */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.22) 0%, transparent 22%, transparent 70%, rgba(0,0,0,0.30) 100%)",
        }}
      />
    </>
  );
}

/**
 * Headline that reveals line by line, each line rising out of a mask.
 *
 * From tablet up, each entry in `lines` is one authored line, so breaks are
 * explicit and never depend on width. On phones the lines flow as one
 * sentence and the browser balances them: authored breaks stranded single
 * words there ("the" alone on a line). Inline spans ignore transforms, so
 * phones get a simple fade instead of the mask reveal.
 *
 * Wrap highlighted words in <span className={HERO_TYPE.accent}>.
 */
export function HeroTitle({
  lines,
  delay = 0.1,
  className = "",
}: {
  lines: React.ReactNode[];
  delay?: number;
  className?: string;
}) {
  return (
    <motion.h1
      className={`${HERO_TYPE.title} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {/* Space between lines when they flow inline on phones. Between
              block lines on larger screens it collapses to nothing. */}
          {i > 0 && " "}
          {/* Padding plus matching negative margin keeps descenders out of
              the mask without changing the line spacing. */}
          <span className="md:block md:overflow-hidden md:pb-[0.12em] md:-mb-[0.12em]">
            <motion.span
              className="md:block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: delay + i * 0.12, ease: EASE }}
            >
              {line}
            </motion.span>
          </span>
        </React.Fragment>
      ))}
    </motion.h1>
  );
}

type PageHeroProps = {
  eyebrow: string;
  /** Headline, one entry per line. See HeroTitle. */
  lines: React.ReactNode[];
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  /** Body copy and anything under it (signature, links). */
  children?: React.ReactNode;
};

export function PageHero({
  eyebrow,
  lines,
  imageSrc,
  imageAlt,
  imagePosition = "center",
  children,
}: PageHeroProps) {
  return (
    <>
      <section className="relative min-h-[66svh] flex items-end overflow-hidden bg-brand-deeper">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: imagePosition }}
          fetchPriority="high"
          loading="eager"
        />
        <HeroOverlay />

        <div className="hero-gutter relative z-10 w-full max-w-[1920px] mx-auto pt-40 pb-20 md:pb-24">
          <motion.p
            className={HERO_TYPE.eyebrow}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {eyebrow}
          </motion.p>
          {/* No narrow max-width on the headline: authored lines set the
              breaks. A 560px cap is what broke About into one word per line. */}
          <HeroTitle lines={lines} />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 + lines.length * 0.12 + 0.25, ease: EASE }}
          >
            {children}
          </motion.div>
        </div>
      </section>

      {/* Orange accent rule under every page hero */}
      <div className="h-[3px] w-full bg-brand-orange" />
    </>
  );
}
