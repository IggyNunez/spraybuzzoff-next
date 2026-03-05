"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { PLANS, BOOKING_URL } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Plans() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section
      id="plans"
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: "#f7f4ef" }}
      ref={ref}
    >
      {/* Grain */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]">
        <filter id="plans-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#plans-noise)" />
      </svg>

      <div className="relative z-[1] max-w-[1400px] mx-auto px-[clamp(20px,4vw,48px)]">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            className="font-body text-[0.85rem] font-bold tracking-[0.2em] uppercase mb-4 flex items-center justify-center gap-3"
            style={{ color: "#016d30" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="w-10 h-[2px]" style={{ background: "#016d30" }} />
            Protection Plans
            <span className="w-10 h-[2px]" style={{ background: "#016d30" }} />
          </motion.p>
          <motion.h2
            className="font-display text-[clamp(2rem,5vw,3.4rem)] font-bold uppercase leading-[1.05]"
            style={{ color: "#016d30" }}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            Choose Your{" "}
            <span style={{ color: "#F12E04" }}>Peace of Mind</span>
          </motion.h2>
          <motion.p
            className="font-body text-[1rem] text-gray-500 mt-3"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            Ongoing protection tailored to your family&apos;s needs.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[480px] lg:max-w-none mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              className="relative overflow-hidden rounded-[28px]"
              style={{
                padding: plan.featured ? 2 : 0,
                background: plan.featured ? undefined : "transparent",
              }}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: EASE }}
              whileHover={{ y: -8 }}
            >
              {/* Spinning gold border for featured */}
              {plan.featured && (
                <motion.div
                  style={{
                    position: "absolute",
                    inset: "-100%",
                    background: "conic-gradient(from 0deg, transparent 0deg, #F5CC05 40deg, #fff7a0 60deg, #F5CC05 80deg, transparent 120deg, transparent 360deg)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              )}

              <div
                className="relative flex flex-col h-full"
                style={{
                  background: plan.featured ? "#012810" : "#016d30",
                  borderRadius: plan.featured ? 26 : 28,
                  border: plan.featured ? undefined : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {/* Most Popular badge */}
                {plan.featured && (
                  <div
                    className="absolute -top-[1px] left-1/2 -translate-x-1/2 font-body text-[0.72rem] font-extrabold tracking-[0.12em] uppercase px-6 py-1.5 rounded-b-xl"
                    style={{ background: "#F5CC05", color: "#012810" }}
                  >
                    Most Popular
                  </div>
                )}

                <div className="p-8 pt-10 flex flex-col flex-1">
                  {/* Tier */}
                  <p
                    className="font-body text-[0.75rem] font-bold tracking-[0.18em] uppercase mb-1"
                    style={{ color: plan.featured ? "#F5CC05" : "rgba(255,255,255,0.5)" }}
                  >
                    {plan.tier}
                  </p>

                  {/* Plan name */}
                  <h3 className="font-display text-[1.5rem] font-bold uppercase text-white mb-4 leading-tight">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-1">
                    <span
                      className="font-display text-[3.2rem] font-bold leading-none"
                      style={{ color: plan.featured ? "#F5CC05" : "white" }}
                    >
                      {plan.price}
                    </span>
                  </div>
                  <p className="font-body text-[0.82rem] text-white/50 mb-8">
                    {plan.freq}
                  </p>

                  {/* Divider */}
                  <div
                    className="h-px mb-8"
                    style={{ background: plan.featured ? "rgba(245,204,5,0.2)" : "rgba(255,255,255,0.1)" }}
                  />

                  {/* Features */}
                  <div className="space-y-3 mb-10 flex-1">
                    {plan.features.map((feat) => (
                      <div
                        key={feat.text}
                        className="flex items-center gap-3"
                      >
                        <span
                          className="text-[0.9rem] shrink-0"
                          style={{ color: feat.included ? (plan.featured ? "#F5CC05" : "#86efac") : "rgba(255,255,255,0.2)" }}
                        >
                          {feat.included ? "✓" : "✗"}
                        </span>
                        <span
                          className="font-body text-[0.88rem]"
                          style={{ color: feat.included ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)" }}
                        >
                          {feat.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full inline-flex items-center justify-center gap-2 font-body text-[0.85rem] font-extrabold tracking-[0.06em] uppercase px-6 py-4 rounded-full transition-all duration-200"
                    style={{
                      background: plan.featured ? "#F5CC05" : "rgba(255,255,255,0.12)",
                      color: plan.featured ? "#012810" : "white",
                      border: plan.featured ? "none" : "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    {plan.ctaText}
                    <ArrowIcon className="group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* One-time note */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
        >
          <p className="font-body text-[0.95rem] text-gray-500 mb-4">
            Need a one-time treatment instead? We&apos;ve got you covered.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-body text-[0.85rem] font-extrabold tracking-[0.08em] uppercase text-white bg-red-500 hover:bg-red-600 px-8 py-3.5 rounded-full transition-colors duration-200"
            style={{ border: "2px solid #016d30" }}
          >
            Request One-Time Quote
            <ArrowIcon className="group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
