"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";
import { useBooking } from "@/components/ui/BookingDrawer";
import { ButtonGold } from "@/components/ui/ButtonGold";
import { ArchedEyebrow } from "@/components/ui/ArchedEyebrow";
import { StepBadge, type GlyphName } from "@/components/ui/BrandBadge";

// The step data always carried an icon (clipboard, magnifier, leaf, shield)
// that never rendered. These are the badge versions of the same ideas.
const STEP_GLYPH: Record<string, GlyphName> = {
  "01": "clipboard",
  "02": "search",
  "03": "droplet",
  "04": "shield",
};

// Lift the card and let the badge glyph react, through one hover label.
const CARD_HOVER = { hover: { y: -6, transition: { type: "spring" as const, stiffness: 320, damping: 22 } } };

export function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const { open: openBooking } = useBooking();

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-brand-cream">
      <div className="max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <ArchedEyebrow>How It Works</ArchedEyebrow>
          </motion.div>
          <motion.h2
            className="section-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Simple As It Should Be
          </motion.h2>
          <motion.div
            className="gold-divider mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          />
          <motion.p
            className="font-body text-[1rem] text-brand-dark/60 max-w-[560px] mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Book in minutes. We handle the rest. No contracts, no pressure.
          </motion.p>
        </div>

        {/* Steps - desktop: single row with connecting line, mobile: 2x2 */}
        <div className="relative">
          {/* Connecting line - desktop only. Draws left to right as the steps
              come in; sits at the badge centers (24px padding + 36px). */}
          <motion.div
            className="hidden lg:block absolute top-[60px] left-[12%] right-[12%] h-[2px] bg-brand-orange/40 z-0 origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                className="bg-white rounded-2xl border-t-[3px] border-brand-deep p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                variants={CARD_HOVER}
                whileHover="hover"
              >
                <div className="flex justify-center mb-4">
                  <StepBadge glyph={STEP_GLYPH[step.num] ?? "check"} num={String(Number(step.num))} size={72} delay={0.2 + i * 0.18} />
                </div>

                <h3 className="font-display text-[1.2rem] text-brand-deep mb-3">
                  {step.title}
                </h3>

                <div className="gold-divider mx-auto mb-3" />

                <p className="font-body text-[0.85rem] leading-relaxed text-brand-dark/70">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <ButtonGold onClick={openBooking}>
            Book Your First Service
          </ButtonGold>
        </motion.div>
      </div>
    </section>
  );
}
