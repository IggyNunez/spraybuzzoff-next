"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BrandBadge } from "@/components/ui/BrandBadge";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { PLANS } from "@/lib/constants";
import { ArchedEyebrow } from "@/components/ui/ArchedEyebrow";
import { LeafDecor } from "@/components/ui/LeafDecor";
import { trackContact } from "@/lib/fbpixel";

export function Plans() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section id="plans" className="relative py-24 md:py-32 bg-white" ref={ref}>
      <LeafDecor variant="branch" top="8%" size={200} opacity={0.25} className="hidden md:block" />
      <div className="max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <ArchedEyebrow>Protection Plans</ArchedEyebrow>
          </motion.div>
          <motion.h2
            className="section-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Protection Built for Your Family
          </motion.h2>
          <motion.div
            className="gold-divider mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          />
          <motion.p
            className="font-body text-[0.95rem] text-brand-dark/60 mt-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            100% plant-based. No contracts. Call the team for pricing.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[520px] lg:max-w-none mx-auto items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-2xl overflow-hidden ${plan.featured ? "lg:-mt-4 lg:mb-4 shadow-[0_12px_40px_rgba(21,71,52,0.25)]" : "shadow-[0_4px_20px_rgba(0,0,0,0.06)]"}`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 320, damping: 22 } }}
            >
              {/* Urgency banner for featured */}
              {plan.featured && (
                <div className="bg-brand-orange text-white text-center py-2">
                  <span className="font-body text-[0.7rem] font-bold tracking-[0.12em] uppercase">
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className={`flex flex-col h-full p-8 ${plan.featured ? "bg-brand-deep text-white" : "bg-white border-t-[3px] border-brand-deep"}`}
              >
                {/* Tier label */}
                <p
                  className={`font-body text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-2 ${plan.featured ? "text-brand-yellow" : "text-brand-orange"}`}
                >
                  {plan.tier}
                </p>

                {/* Plan name */}
                <h3
                  className={`font-display text-[clamp(1.35rem,2.2vw,1.6rem)] mb-5 leading-[1.15] ${plan.featured ? "text-white" : "text-brand-deep"}`}
                >
                  {plan.name}
                </h3>

                {/* Divider */}
                <div
                  className="h-[1px] mb-7"
                  style={{
                    background: plan.featured
                      ? "linear-gradient(90deg, #FA4616 0%, rgba(250,70,22,0.1) 100%)"
                      : "rgba(21,71,52,0.1)",
                  }}
                />

                {/* Features */}
                <div className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat, fi) => (
                    <motion.div key={feat.text} whileHover="hover" className="flex items-start gap-3">
                      {feat.included ? (
                        <BrandBadge glyph="check" size={22} delay={0.3 + i * 0.12 + fi * 0.06} className="-mt-0.5" />
                      ) : (
                        <BrandBadge glyph="x" tone="muted" size={22} delay={0.3 + i * 0.12 + fi * 0.06} className={`-mt-0.5 ${plan.featured ? "opacity-40" : ""}`} />
                      )}
                      <span
                        className={`font-body text-[0.84rem] leading-snug ${feat.included ? (plan.featured ? "text-white/90" : "text-brand-dark") : (plan.featured ? "text-white/30" : "text-brand-dark/30")}`}
                      >
                        {feat.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="tel:9098988955"
                  onClick={() => trackContact()}
                  className={`group w-full inline-flex items-center justify-center gap-2 font-body text-[0.78rem] font-bold tracking-[0.1em] uppercase px-6 py-4 rounded-full transition-all duration-200 ${
                    plan.featured
                      ? "bg-white text-brand-deep hover:bg-white/90"
                      : "border-2 border-brand-deep text-brand-deep hover:bg-brand-deep hover:text-white"
                  }`}
                >
                  {plan.ctaText}
                  <ArrowIcon className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom nudge */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="font-body text-[0.9rem] text-brand-dark/50 mb-2">
            Not sure which plan is right for you?
          </p>
          <a
            href="tel:9098988955"
            onClick={() => trackContact()}
            className="font-body text-[0.95rem] font-bold text-brand-deep hover:text-brand-deeper transition-colors"
          >
            Call the Team - 909.898.8955
          </a>
        </motion.div>
      </div>
    </section>
  );
}
