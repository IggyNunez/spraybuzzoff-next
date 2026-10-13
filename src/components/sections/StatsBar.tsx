"use client";

import { motion } from "framer-motion";
import { AVERAGE_RATING } from "@/lib/reviews";
import { BrandBadge, type GlyphName } from "@/components/ui/BrandBadge";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// The hero copy finishes animating at about 1.1s; badges follow it.
const BASE_DELAY = 1.15;

const STATS: { glyph: GlyphName; label: string }[] = [
  { glyph: "leaf", label: "100% Plant-Based" },
  { glyph: "home-heart", label: "Made for Families" },
  // From the review data, never typed in. See src/lib/reviews.ts.
  { glyph: "star", label: `${AVERAGE_RATING.toFixed(1)} Star Average` },
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
          {STATS.map(({ glyph, label }, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-1.5 md:gap-3 cursor-default"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: BASE_DELAY + i * 0.12, ease: EASE }}
              whileHover="hover"
            >
              {/* The hero is on screen at load, so draw on mount, not on scroll. */}
              <BrandBadge glyph={glyph} size={44} onMount delay={BASE_DELAY + i * 0.12} className="w-7 h-7 md:w-11 md:h-11" />
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
