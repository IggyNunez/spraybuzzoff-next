"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BrandBadge } from "@/components/ui/BrandBadge";
import { ButtonGold } from "@/components/ui/ButtonGold";
import { useBooking } from "@/components/ui/BookingDrawer";
import { SUBSCRIPTIONS, SUBSCRIPTION_START_PRICE } from "@/lib/constants";
import { trackContact } from "@/lib/fbpixel";
import type { Subscription } from "@/types";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Residential subscriptions (client copy sheet + mockup, Nov 6 2026).
 *
 * Rules from the client that are easy to undo by accident:
 * - Blanket pricing only. "Subscriptions start at $109/month", never a price per card.
 * - The Plus difference is rodent service and it has to be loud: yellow border,
 *   "Rodent included" tag and a yellow "+ Rodent Protection" band on Plus cards.
 * - Do not put "No contracts, cancel anytime" on these cards.
 */
export function Subscriptions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const { open: openBooking } = useBooking();

  return (
    <section
      id="subscriptions"
      className="relative py-24 md:py-32 bg-brand-deeper text-white overflow-hidden"
      ref={ref}
    >
      {/* Old links pointed at /#plans. Keep them landing here. */}
      <span id="plans" aria-hidden className="absolute top-0" />
      <BugPattern />

      <div className="relative z-10 max-w-[1440px] mx-auto px-[clamp(20px,4vw,80px)]">
        {/* Header */}
        <div className="text-center mb-14 max-w-[760px] mx-auto">
          <motion.p
            className="font-body text-[0.72rem] font-bold tracking-[0.25em] uppercase text-brand-yellow mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            Residential Subscriptions
          </motion.p>
          <motion.h2
            className="section-title !text-white mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Protection Built for Your Family
          </motion.h2>
          <motion.p
            className="font-body text-[1.02rem] leading-relaxed text-white/85 mb-7"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Five subscriptions. One naturally better routine. ZERO synthetic pesticides, on a
            schedule that fits your home.
          </motion.p>
          <motion.p
            className="inline-block font-body text-[1rem] md:text-[1.1rem] font-bold text-brand-deep bg-brand-yellow rounded-full px-7 py-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Subscriptions start at {SUBSCRIPTION_START_PRICE}/month
          </motion.p>
        </div>

        {/* Cards. Five across on wide screens; on tablets two across with the
            last card centered; one column on phones. */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 max-w-[520px] md:max-w-none mx-auto items-stretch">
          {SUBSCRIPTIONS.map((sub, i) => (
            <SubscriptionCard
              key={sub.name}
              sub={sub}
              index={i}
              isInView={isInView}
              className={
                i === SUBSCRIPTIONS.length - 1
                  ? "md:col-span-2 md:w-[calc(50%-10px)] md:mx-auto xl:col-span-1 xl:w-auto xl:mx-0"
                  : ""
              }
            />
          ))}
        </div>

        {/* The Plus difference */}
        <motion.div
          className="mt-8 rounded-2xl bg-brand-yellow text-brand-deep px-6 py-6 md:px-8 flex flex-col md:flex-row md:items-center gap-3 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6, ease: EASE }}
        >
          <p className="title-caps font-display text-[clamp(1.25rem,2.2vw,1.6rem)] leading-tight shrink-0">
            The Plus difference = rodent.
          </p>
          <p className="font-body text-[0.9rem] leading-relaxed">
            <strong>Plus subscriptions add rodent station maintenance + monitoring.</strong>{" "}
            Initial rodent setup and active-infestation work are assessed and quoted before
            enrollment. Inspection required. Exclusion, cleanup and specialty work are quoted
            separately.
          </p>
        </motion.div>

        {/* Fine print + CTAs */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="font-body text-[0.82rem] leading-relaxed text-white/70 max-w-[680px] mx-auto mb-8">
            Home and Home Plus: choose monthly or every-2-months visits. Mosquito and Bundles:
            monthly. Billing matches visit frequency. Commercial properties quoted separately.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <ButtonGold onClick={openBooking} className="w-full sm:w-auto justify-center">
              Book Your First Service
            </ButtonGold>
            <a
              href="tel:9098988955"
              onClick={() => trackContact()}
              className="inline-flex items-center justify-center font-body text-[13px] font-bold tracking-[0.12em] uppercase text-white bg-brand-green border-2 border-brand-green hover:bg-brand-green-dark hover:border-brand-green-dark px-10 py-4 rounded-full transition-colors duration-200"
            >
              Call the Team 909.898.8955
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SubscriptionCard({
  sub,
  index,
  isInView,
  className = "",
}: {
  sub: Subscription;
  index: number;
  isInView: boolean;
  className?: string;
}) {
  return (
    <motion.article
      className={`relative flex flex-col rounded-2xl bg-brand-cream text-brand-dark ${
        sub.plus
          ? "border-[3px] border-brand-yellow shadow-[0_12px_40px_rgba(239,223,0,0.18)]"
          : "border-[3px] border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.18)]"
      } ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.6, ease: EASE }}
    >
      {sub.plus && (
        <span className="absolute -top-3 right-4 z-10 font-body text-[0.68rem] font-bold text-brand-yellow bg-brand-deeper rounded-full px-3 py-1">
          Rodent included
        </span>
      )}

      <div className="px-5 pt-6">
        <p className="font-body text-[0.65rem] font-bold tracking-[0.2em] uppercase text-brand-green-dark mb-2">
          {sub.num} / Subscription
        </p>
        <h3 className="font-display text-[clamp(1.3rem,1.6vw,1.45rem)] leading-[1.1] text-brand-deep mb-3">
          {sub.name}
        </h3>
      </div>

      {sub.plus && (
        <div className="bg-brand-yellow text-brand-deep px-5 py-3 mb-1">
          <p className="title-caps font-display text-[1.15rem] leading-tight">+ Rodent Protection</p>
          <p className="font-body text-[0.78rem] font-bold leading-snug mt-1">
            Rodent station maintenance + monitoring included
          </p>
        </div>
      )}

      <div className="flex flex-col flex-1 px-5 pb-6 pt-2">
        <p className="font-body text-[0.9rem] leading-snug text-brand-dark/85">{sub.summary}</p>
        {sub.note && (
          <p className="font-body text-[0.74rem] text-brand-dark/60 mt-2">{sub.note}</p>
        )}

        <ul className="mt-4 divide-y divide-brand-deep/10 border-t border-brand-deep/10">
          {sub.features.map((f, fi) => (
            <li key={f.text} className="flex items-start gap-2.5 py-2.5">
              <BrandBadge
                glyph="check"
                size={20}
                delay={0.3 + index * 0.1 + fi * 0.05}
                className="shrink-0"
              />
              <span
                className={`font-body text-[0.82rem] leading-snug ${
                  f.bold ? "font-bold text-brand-deep" : "text-brand-dark"
                }`}
              >
                {f.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

/** Faint tiled bug silhouettes behind the section (copy sheet: "bug pattern texture"). */
function BugPattern() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <g id="subBug">
            <ellipse cx="0" cy="6" rx="7" ry="10" fill="white" />
            <circle cx="0" cy="-7" r="4.5" fill="white" />
            <path
              d="M-3 -10 L-7 -18 M3 -10 L7 -18 M-6 0 L-14 -5 M6 0 L14 -5 M-7 6 L-15 6 M7 6 L15 6 M-6 12 L-13 18 M6 12 L13 18"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
          </g>
          <pattern id="subBugPattern" x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
            <use href="#subBug" transform="translate(30 36) rotate(-20)" />
            <use href="#subBug" transform="translate(120 70) rotate(35) scale(0.8)" />
            <use href="#subBug" transform="translate(70 140) rotate(160) scale(0.9)" />
            <use href="#subBug" transform="translate(160 160) rotate(-70) scale(0.7)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#subBugPattern)" />
      </svg>
    </div>
  );
}
