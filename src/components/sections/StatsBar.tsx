"use client";

import { motion, type Variants } from "framer-motion";
import { AVERAGE_RATING } from "@/lib/reviews";

/**
 * Hero badges. One system for all three: a brand-yellow disc with a deep green
 * ring (the same pairing as the primary CTA pill), a deep green line glyph,
 * and a single brand fill per glyph. Glyphs draw themselves in after the hero
 * copy lands, then react on hover.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// The hero copy finishes animating at about 1.1s; badges follow it.
const BASE_DELAY = 1.15;

const draw = (i: number): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  shown: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.8, delay: BASE_DELAY + 0.25 + i * 0.12, ease: "easeInOut" },
      opacity: { duration: 0.01, delay: BASE_DELAY + 0.25 + i * 0.12 },
    },
  },
});

const fillIn = (i: number): Variants => ({
  hidden: { fillOpacity: 0 },
  shown: { fillOpacity: 1, transition: { duration: 0.4, delay: BASE_DELAY + 0.85 + i * 0.12 } },
});

const GLYPH_STROKE = {
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Disc() {
  return <circle cx="20" cy="20" r="18" className="fill-brand-yellow stroke-brand-deep" strokeWidth="2" />;
}

function LeafBadge({ i }: { i: number }) {
  return (
    <>
      <Disc />
      <motion.g variants={{ hover: { rotate: [0, -14, 9, -4, 0], transition: { duration: 0.9 } } }} style={{ originX: 0.14, originY: 0.86 }}>
        <motion.path
          d="M12.5 27.5 C12.5 18.5 18 12.5 27.5 12.5 C27.5 22 21.5 27.5 12.5 27.5 Z"
          className="fill-brand-green stroke-brand-deep"
          {...GLYPH_STROKE}
          variants={draw(i)}
          initial="hidden"
          animate="shown"
        />
        <motion.path d="M12.5 27.5 L21.5 18.5" fill="none" className="stroke-brand-deep" {...GLYPH_STROKE} variants={draw(i)} initial="hidden" animate="shown" />
        <motion.path d="M12.5 27.5 L10 30" fill="none" className="stroke-brand-deep" {...GLYPH_STROKE} variants={draw(i)} initial="hidden" animate="shown" />
      </motion.g>
    </>
  );
}

function HomeHeartBadge({ i }: { i: number }) {
  return (
    <>
      <Disc />
      <motion.path d="M10 20.5 L20 11.5 L30 20.5" fill="none" className="stroke-brand-deep" {...GLYPH_STROKE} variants={draw(i)} initial="hidden" animate="shown" />
      <motion.path d="M12.5 18.5 V28.5 H27.5 V18.5" fill="none" className="stroke-brand-deep" {...GLYPH_STROKE} variants={draw(i)} initial="hidden" animate="shown" />
      <motion.g variants={{ hover: { scale: [1, 1.28, 1, 1.18, 1], transition: { duration: 0.8 } } }}>
        <motion.path
          d="M20 26.5 C17.4 24.5 16 23.1 16 21.4 C16 20.2 16.9 19.3 18 19.3 C18.8 19.3 19.5 19.7 20 20.4 C20.5 19.7 21.2 19.3 22 19.3 C23.1 19.3 24 20.2 24 21.4 C24 23.1 22.6 24.5 20 26.5 Z"
          className="fill-brand-orange stroke-brand-deep"
          strokeWidth={1.5}
          strokeLinejoin="round"
          variants={fillIn(i)}
          initial="hidden"
          animate="shown"
        />
      </motion.g>
    </>
  );
}

function StarBadge({ i }: { i: number }) {
  return (
    <>
      <Disc />
      <motion.g variants={{ hover: { rotate: 72, transition: { duration: 0.7, ease: EASE } } }}>
        <motion.path
          d="M20 11 L22.47 17.1 L29.04 17.56 L23.99 21.8 L25.58 28.19 L20 24.7 L14.42 28.19 L16.01 21.8 L10.96 17.56 L17.53 17.1 Z"
          className="fill-brand-orange stroke-brand-deep"
          {...GLYPH_STROKE}
          variants={draw(i)}
          initial="hidden"
          animate="shown"
        />
      </motion.g>
    </>
  );
}

const STATS = [
  { Glyph: LeafBadge, label: "100% Plant-Based" },
  { Glyph: HomeHeartBadge, label: "Made for Families" },
  // From the review data, never typed in. See src/lib/reviews.ts.
  { Glyph: StarBadge, label: `${AVERAGE_RATING.toFixed(1)} Star Average` },
];

export function StatsBar() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-20"
      style={{
        background: "rgba(15, 50, 36, 0.32)",
        // Light saturation only: a strong boost re-tinted the footage green
        // under the bar.
        backdropFilter: "blur(18px) saturate(1.1)",
        WebkitBackdropFilter: "blur(18px) saturate(1.1)",
        borderTop: "1px solid rgba(255, 255, 255, 0.16)",
      }}
    >
      <div className="max-w-[1920px] mx-auto px-3 md:px-[clamp(20px,4vw,80px)] py-3 md:py-5">
        <div className="flex items-center justify-between md:justify-center gap-2 md:gap-16">
          {STATS.map(({ Glyph, label }, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-1.5 md:gap-3 cursor-default"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: BASE_DELAY + i * 0.12, ease: EASE }}
              whileHover="hover"
            >
              <motion.svg
                viewBox="0 0 40 40"
                aria-hidden
                className="w-7 h-7 md:w-11 md:h-11 shrink-0 overflow-visible"
                initial={{ scale: 0.6, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 16, delay: BASE_DELAY + i * 0.12 }}
              >
                <Glyph i={i} />
              </motion.svg>
              <span className="font-body text-[0.6rem] md:text-[0.72rem] font-bold tracking-[0.06em] md:tracking-[0.15em] uppercase text-white leading-tight">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
