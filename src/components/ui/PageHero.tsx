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
  // Brand sheet: all caps is for short emphasis, and the home hero headline is
  // its main example. Caps run about 13x the font size on the longer line, so
  // the size scales with the viewport (6.6vw) to fit at every width; a fixed
  // 84px ran off the screen below about 1280px.
  homeTitle:
    "font-display uppercase text-[clamp(34px,6.6vw,84px)] leading-[1.02] text-white mb-4 [text-wrap:balance] drop-shadow-[0_2px_14px_rgba(0,0,0,0.35)]",
  // Brand sheet: Playfair Display Italic is for testimonials and the hero tagline.
  tagline:
    "font-quote italic text-[clamp(1.3rem,2.6vw,2.4rem)] text-brand-yellow mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]",
  accent: "text-brand-yellow",
  body: "font-body text-[1.05rem] leading-relaxed text-white/85 max-w-[34rem]",
} as const;

/**
 * Hero overlay. The brand sheet makes bright brand green (354 C) the lead
 * field for heroes, so green carries every hero:
 *
 * - "video" (home): a 354 C multiply wash over the footage, deepened toward
 *   the copy so the white headline stays legible.
 * - "photo" (page heroes): a diagonal from deep green (3435 C) behind the copy
 *   to bright 354 C.
 */
export function HeroOverlay({ variant = "photo" }: { variant?: "video" | "photo" }) {
  if (variant === "video") {
    return (
      <>
        <div aria-hidden className="absolute inset-0 z-[1] bg-brand-green mix-blend-multiply opacity-80" />
        <div aria-hidden className="absolute inset-0 z-[1] bg-gradient-to-r from-brand-deeper/70 via-brand-deep/25 to-transparent" />
        <div aria-hidden className="absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </>
    );
  }
  return (
    <div
      aria-hidden
      className="absolute inset-0 z-[1]"
      style={{ background: "linear-gradient(135deg, rgba(21,71,52,0.88) 0%, rgba(0,177,64,0.72) 100%)" }}
    />
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
  variant = "page",
}: {
  lines: React.ReactNode[];
  delay?: number;
  className?: string;
  /** "home" is the all-caps home hero headline from the brand sheet. */
  variant?: "page" | "home";
}) {
  return (
    <motion.h1
      className={`${variant === "home" ? HERO_TYPE.homeTitle : HERO_TYPE.title} ${className}`}
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
