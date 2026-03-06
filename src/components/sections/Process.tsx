"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROCESS_STEPS, BOOKING_URL } from "@/lib/constants";
import { ButtonGold } from "@/components/ui/ButtonGold";
import { ArchedEyebrow } from "@/components/ui/ArchedEyebrow";

export function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-[#EDEADE]">
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
            className="font-body text-[1rem] text-[#1C2B1E]/60 max-w-[560px] mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Book in minutes. We handle the rest. No contracts, no pressure.
          </motion.p>
        </div>

        {/* Steps — desktop: single row with connecting line, mobile: 2x2 */}
        <div className="relative">
          {/* Connecting gold line — desktop only */}
          <div className="hidden lg:block absolute top-[60px] left-[12%] right-[12%] h-[2px] bg-[#C8973A]/30 z-0" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                className="bg-white rounded-2xl border-t-[3px] border-[#1A5C32] p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              >
                {/* Step number circle */}
                <div className="w-12 h-12 rounded-full bg-[#1A5C32] flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-[1rem] font-bold text-white">
                    {step.num}
                  </span>
                </div>

                <h4 className="font-display text-[1.2rem] font-[900] uppercase text-[#1A5C32] mb-3 tracking-wide">
                  {step.title}
                </h4>

                <div className="gold-divider mx-auto mb-3" />

                <p className="font-body text-[0.85rem] leading-relaxed text-[#1C2B1E]/70">
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
          <ButtonGold href={BOOKING_URL}>
            Book Your First Service
          </ButtonGold>
        </motion.div>
      </div>
    </section>
  );
}
