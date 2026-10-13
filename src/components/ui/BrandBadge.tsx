"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion, type Variants } from "framer-motion";

/**
 * The Buzz Off badge system. One look for every icon on the site:
 * a brand-yellow disc with a deep green ring (the same pairing as the primary
 * CTA pill), a deep green line glyph, and one brand fill per glyph.
 *
 * Badges pop in and draw their lines when they scroll into view. A parent
 * with whileHover="hover" makes the glyph react (the leaf sways, the heart
 * beats, the phone rings). Visitors with reduce-motion get the finished badge.
 *
 * Glyphs are drawn on a 40x40 grid inside an r=18 disc. Keep new ones within
 * roughly 10..30 on both axes so they sit inside the ring.
 */

export type GlyphName =
  | "leaf" | "home-heart" | "home" | "star" | "check" | "x"
  | "clipboard" | "search" | "droplet" | "shield"
  | "phone" | "mail" | "clock" | "pin"
  | "mosquito" | "door" | "fence";

type Fill = "none" | "green" | "orange" | "white" | "yellow" | "deep";

const FILL: Record<Fill, string> = {
  none: "fill-none",
  green: "fill-brand-green",
  orange: "fill-brand-orange",
  white: "fill-white",
  yellow: "fill-brand-yellow",
  deep: "fill-brand-deep",
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Draw state is handed to each path directly instead of through a wrapper
 * with variant labels: a labelled wrapper would cut hover off from the glyph
 * groups underneath it.
 */
const DrawState = createContext<{ state: "hidden" | "shown"; reduce: boolean }>({ state: "shown", reduce: false });

const pathVariants = (delay: number): Variants => ({
  hidden: { pathLength: 0, opacity: 0, fillOpacity: 0 },
  shown: {
    pathLength: 1,
    opacity: 1,
    fillOpacity: 1,
    transition: {
      pathLength: { duration: 0.7, delay, ease: "easeInOut" },
      opacity: { duration: 0.01, delay },
      fillOpacity: { duration: 0.35, delay: delay + 0.5 },
    },
  },
});

/** One stroked (and optionally filled) glyph path that draws itself in. */
function P({
  d,
  fill = "none",
  w = 2,
  stroke = "stroke-brand-deep",
  delay,
}: {
  d: string;
  fill?: Fill;
  w?: number;
  stroke?: string;
  delay: number;
}) {
  const { state, reduce } = useContext(DrawState);
  return (
    <motion.path
      d={d}
      className={`${FILL[fill]} ${stroke}`}
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={pathVariants(delay)}
      initial={reduce ? false : "hidden"}
      animate={state}
    />
  );
}

/** Glyph drawings. `t` is the delay at which the badge starts drawing. */
const GLYPHS: Record<GlyphName, (t: number) => React.ReactNode> = {
  leaf: (t) => (
    <motion.g variants={{ hover: { rotate: [0, -14, 9, -4, 0], transition: { duration: 0.9 } } }} style={{ originX: 0.14, originY: 0.86 }}>
      <P d="M12.5 27.5 C12.5 18.5 18 12.5 27.5 12.5 C27.5 22 21.5 27.5 12.5 27.5 Z" fill="green" delay={t} />
      <P d="M12.5 27.5 L21.5 18.5" delay={t + 0.15} />
      <P d="M12.5 27.5 L10 30" delay={t + 0.15} />
    </motion.g>
  ),
  "home-heart": (t) => (
    <>
      <P d="M10 20.5 L20 11.5 L30 20.5" delay={t} />
      <P d="M12.5 18.5 V28.5 H27.5 V18.5" delay={t + 0.1} />
      <motion.g variants={{ hover: { scale: [1, 1.28, 1, 1.18, 1], transition: { duration: 0.8 } } }}>
        <P d="M20 26.5 C17.4 24.5 16 23.1 16 21.4 C16 20.2 16.9 19.3 18 19.3 C18.8 19.3 19.5 19.7 20 20.4 C20.5 19.7 21.2 19.3 22 19.3 C23.1 19.3 24 20.2 24 21.4 C24 23.1 22.6 24.5 20 26.5 Z" fill="orange" w={1.5} delay={t + 0.25} />
      </motion.g>
    </>
  ),
  home: (t) => (
    <motion.g variants={{ hover: { y: [0, -2, 0], transition: { duration: 0.5 } } }}>
      <P d="M10 20.5 L20 11.5 L30 20.5" delay={t} />
      <P d="M12.5 18.5 V28.5 H27.5 V18.5" delay={t + 0.1} />
      <P d="M17.5 28.5 V23 Q17.5 22 18.5 22 H21.5 Q22.5 22 22.5 23 V28.5 Z" fill="green" w={1.6} delay={t + 0.25} />
    </motion.g>
  ),
  star: (t) => (
    <motion.g variants={{ hover: { rotate: 72, transition: { duration: 0.7, ease: EASE } } }}>
      <P d="M20 11 L22.47 17.1 L29.04 17.56 L23.99 21.8 L25.58 28.19 L20 24.7 L14.42 28.19 L16.01 21.8 L10.96 17.56 L17.53 17.1 Z" fill="orange" delay={t} />
    </motion.g>
  ),
  check: (t) => (
    <motion.g variants={{ hover: { scale: [1, 1.2, 1], transition: { duration: 0.4 } } }}>
      <P d="M13.5 20.5 L18 25 L27 15.5" w={2.8} delay={t} />
    </motion.g>
  ),
  x: (t) => <P d="M15.5 15.5 L24.5 24.5 M24.5 15.5 L15.5 24.5" w={2.4} stroke="stroke-brand-dark/35" delay={t} />,
  clipboard: (t) => (
    <motion.g variants={{ hover: { rotate: [0, -8, 6, 0], transition: { duration: 0.6 } } }}>
      <P d="M14.5 13 H25.5 Q27 13 27 14.5 V28 Q27 29.5 25.5 29.5 H14.5 Q13 29.5 13 28 V14.5 Q13 13 14.5 13 Z" fill="white" delay={t} />
      <P d="M17 14.5 V12.5 Q17 11 18.5 11 H21.5 Q23 11 23 12.5 V14.5 Z" fill="orange" w={1.6} delay={t + 0.15} />
      <P d="M16.5 21.5 L19 24 L23.5 19" w={2.4} stroke="stroke-brand-green" delay={t + 0.3} />
    </motion.g>
  ),
  search: (t) => (
    <motion.g variants={{ hover: { x: [0, 2.5, -2, 0], transition: { duration: 0.7 } } }}>
      <P d="M24.5 18.5 A6 6 0 1 1 12.5 18.5 A6 6 0 1 1 24.5 18.5 Z" fill="white" delay={t} />
      <P d="M22.8 22.8 L28 28" w={3} delay={t + 0.2} />
      <P d="M15.6 17.2 A3.2 3.2 0 0 1 17.4 15.2" w={1.5} stroke="stroke-brand-green" delay={t + 0.3} />
    </motion.g>
  ),
  droplet: (t) => (
    <motion.g variants={{ hover: { y: [0, 2, -1, 0], transition: { duration: 0.6 } } }}>
      <P d="M20 10.5 C20 10.5 13 18.5 13 23 A7 7 0 0 0 27 23 C27 18.5 20 10.5 20 10.5 Z" fill="green" delay={t} />
      <P d="M16.8 23.2 A3.4 3.4 0 0 0 19.6 26.6" w={1.6} stroke="stroke-white" delay={t + 0.35} />
    </motion.g>
  ),
  shield: (t) => (
    <motion.g variants={{ hover: { scale: [1, 1.1, 1], transition: { duration: 0.5 } } }}>
      <P d="M20 10.5 L27.5 13.5 V19.5 C27.5 24.5 24.2 28.2 20 29.8 C15.8 28.2 12.5 24.5 12.5 19.5 V13.5 Z" fill="green" delay={t} />
      <P d="M16.5 20 L19 22.5 L23.8 17.5" w={2.4} delay={t + 0.3} />
    </motion.g>
  ),
  phone: (t) => (
    <motion.g variants={{ hover: { rotate: [0, -12, 12, -8, 8, 0], transition: { duration: 0.6 } } }}>
      <P d="M15.5 11.5 L18.5 11.5 L20 15.8 L18 17.3 C19 19.8 20.2 21 22.7 22 L24.2 20 L28.5 21.5 L28.5 24.5 C28.5 26 27.3 27.2 25.8 27.2 C18.4 26.6 13.4 21.6 12.8 14.2 C12.8 12.7 14 11.5 15.5 11.5 Z" fill="green" w={1.8} delay={t} />
    </motion.g>
  ),
  mail: (t) => (
    <motion.g variants={{ hover: { y: [0, -2, 0], transition: { duration: 0.5 } } }}>
      <P d="M12 14.5 H28 V26.5 H12 Z" fill="white" delay={t} />
      <P d="M12 15 L20 21.5 L28 15" stroke="stroke-brand-deep" delay={t + 0.2} />
      <P d="M23.5 25 H26.5" w={1.6} stroke="stroke-brand-orange" delay={t + 0.35} />
    </motion.g>
  ),
  clock: (t) => (
    <>
      <P d="M27.5 20 A7.5 7.5 0 1 1 12.5 20 A7.5 7.5 0 1 1 27.5 20 Z" fill="white" delay={t} />
      <motion.g variants={{ hover: { rotate: 360, transition: { duration: 0.9, ease: EASE } } }} style={{ originX: 0, originY: 0.69 }}>
        <P d="M20 15.5 V20 L23.2 22" w={2.2} stroke="stroke-brand-orange" delay={t + 0.25} />
      </motion.g>
    </>
  ),
  pin: (t) => (
    <motion.g variants={{ hover: { y: [0, -3, 0, -1.5, 0], transition: { duration: 0.6 } } }}>
      <P d="M20 29.5 C20 29.5 13 22.6 13 17.8 A7 7 0 0 1 27 17.8 C27 22.6 20 29.5 20 29.5 Z" fill="orange" delay={t} />
      <P d="M22.4 17.8 A2.4 2.4 0 1 1 17.6 17.8 A2.4 2.4 0 1 1 22.4 17.8 Z" fill="yellow" w={1.6} delay={t + 0.3} />
    </motion.g>
  ),
  mosquito: (t) => (
    // Solid body and bigger wings: a thin stroked body crossed the legs and
    // read as an "X" at badge size.
    <motion.g variants={{ hover: { x: [0, 1.5, -1.5, 1, 0], y: [0, -1, 1, -0.5, 0], transition: { duration: 0.5 } } }}>
      <P d="M20 18.2 C16 11.4 11.6 10.8 11.1 12.9 C10.9 15.6 15.4 17.9 20 18.2 Z" fill="white" w={1.5} delay={t} />
      <P d="M21.2 17 C21.1 10.6 24.5 8.7 26 10 C27 11.7 24.9 15.5 21.2 17 Z" fill="white" w={1.5} delay={t + 0.05} />
      <P d="M19.7 20.4 C17.1 22.4 14.6 24.9 12.9 27.6 C14.8 27.5 18.4 25.6 21.1 22.2 Z" fill="deep" w={1.4} delay={t + 0.15} />
      <P d="M24.6 19.4 A2.3 2.3 0 1 1 20 19.4 A2.3 2.3 0 1 1 24.6 19.4 Z" fill="deep" w={1.4} delay={t + 0.2} />
      <P d="M24.3 17.8 L28.9 13.5" w={1.7} stroke="stroke-brand-orange" delay={t + 0.3} />
      <P d="M21.4 22 L20.3 27.3 M23.2 21.4 L25.2 26.3" w={1.4} delay={t + 0.35} />
    </motion.g>
  ),
  door: (t) => (
    <>
      <P d="M11 16.5 L20 11 L29 16.5" delay={t} />
      <motion.g variants={{ hover: { scaleX: [1, 0.82, 1], transition: { duration: 0.6 } } }} style={{ originX: 0, originY: 0.5 }}>
        <P d="M15.5 29 V18.5 Q15.5 17.5 16.5 17.5 H23.5 Q24.5 17.5 24.5 18.5 V29 Z" fill="green" delay={t + 0.15} />
        <P d="M22.6 23.4 A1 1 0 1 1 20.6 23.4 A1 1 0 1 1 22.6 23.4 Z" fill="yellow" w={1.2} delay={t + 0.35} />
      </motion.g>
      <P d="M12.5 29 H27.5" delay={t + 0.2} />
    </>
  ),
  fence: (t) => (
    <motion.g variants={{ hover: { y: [0, -1.5, 0], transition: { duration: 0.45 } } }}>
      <P d="M12 19.5 H28 M12 25 H28" w={1.8} delay={t} />
      <P d="M13.5 28.5 V15.5 L15.5 13 L17.5 15.5 V28.5 Z" fill="green" w={1.6} delay={t + 0.1} />
      <P d="M18 28.5 V15.5 L20 13 L22 15.5 V28.5 Z" fill="green" w={1.6} delay={t + 0.18} />
      <P d="M22.5 28.5 V15.5 L24.5 13 L26.5 15.5 V28.5 Z" fill="green" w={1.6} delay={t + 0.26} />
    </motion.g>
  ),
};

type BrandBadgeProps = {
  glyph: GlyphName;
  /** Rendered size in px, or a responsive Tailwind size class via className. */
  size?: number;
  /** "muted" is for negatives: a quiet outline disc instead of brand yellow. */
  tone?: "yellow" | "muted";
  /** Seconds after the badge scrolls into view before it starts. */
  delay?: number;
  /** Draw on mount instead of on scroll (for content already on screen, like the hero). */
  onMount?: boolean;
  className?: string;
};

export function BrandBadge({ glyph, size = 44, tone = "yellow", delay = 0, onMount = false, className = "" }: BrandBadgeProps) {
  const ref = useRef<SVGSVGElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduce = useReducedMotion();
  const active = onMount || seen;
  const state = reduce ? "shown" : active ? "shown" : "hidden";

  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 40 40"
      width={size}
      height={size}
      aria-hidden
      className={`shrink-0 overflow-visible ${className}`}
      // Object values (not variant labels) keep this svg out of the variant
      // tree, so a parent's whileHover="hover" still reaches the glyph.
      initial={reduce ? false : { scale: 0.6, rotate: -20, opacity: 0 }}
      animate={active || reduce ? { scale: 1, rotate: 0, opacity: 1 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay }}
    >
      {tone === "yellow" ? (
        <circle cx="20" cy="20" r="18" className="fill-brand-yellow stroke-brand-deep" strokeWidth="2" />
      ) : (
        <circle cx="20" cy="20" r="18" className="fill-white stroke-brand-dark/15" strokeWidth="1.5" />
      )}
      <DrawState.Provider value={{ state, reduce: !!reduce }}>{GLYPHS[glyph](delay + 0.2)}</DrawState.Provider>
    </motion.svg>
  );
}

/**
 * A step badge: the glyph plus a numbered chip on its shoulder.
 */
export function StepBadge({ glyph, num, size = 72, delay = 0 }: { glyph: GlyphName; num: string; size?: number; delay?: number }) {
  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <BrandBadge glyph={glyph} size={size} delay={delay} />
      <motion.span
        className="absolute -top-1 -right-2 flex items-center justify-center rounded-full bg-brand-deep text-brand-yellow font-display leading-none border-2 border-white"
        style={{ width: size * 0.42, height: size * 0.42, fontSize: size * 0.19 }}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -40px 0px" }}
        transition={{ type: "spring", stiffness: 380, damping: 18, delay: delay + 0.45 }}
      >
        {num}
      </motion.span>
    </div>
  );
}

/**
 * Counts up to `to` when scrolled into view. Screen readers and reduce-motion
 * visitors get the final value straight away.
 */
export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className = "",
  style,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduce = useReducedMotion();
  const fmt = (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`;
  // Server render and first paint show the real number, so nothing reads
  // "0" to a crawler or a visitor without JavaScript.
  const [text, setText] = useState(fmt(to));
  const started = useRef(false);

  useEffect(() => {
    if (reduce || started.current) return;
    if (!seen) {
      setText(fmt(0));
      return;
    }
    started.current = true;
    const controls = animate(0, to, { duration, ease: EASE, onUpdate: (v) => setText(fmt(v)) });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen, reduce, to]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      <span aria-hidden>{text}</span>
      <span className="sr-only">{fmt(to)}</span>
    </span>
  );
}

/**
 * A stat with its badge: badge, counting number, label. Hovering the tile
 * animates the badge glyph. Used for every stat row so they stay identical.
 */
export function BadgeStat({
  glyph,
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  label,
  delay = 0,
  onDark = false,
}: {
  glyph: GlyphName;
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  delay?: number;
  onDark?: boolean;
}) {
  return (
    <motion.div whileHover="hover" className="flex flex-col items-center gap-2 text-center cursor-default">
      <BrandBadge glyph={glyph} size={52} delay={delay} />
      <CountUp
        to={to}
        decimals={decimals}
        prefix={prefix}
        suffix={suffix}
        className={`font-display text-[clamp(1.7rem,2.6vw,2.4rem)] leading-none ${onDark ? "text-brand-yellow" : "text-brand-deep"}`}
      />
      <span className={`font-body text-[0.68rem] font-bold tracking-[0.15em] uppercase ${onDark ? "text-white/70" : "text-brand-dark/55"}`}>
        {label}
      </span>
    </motion.div>
  );
}
