"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: "#f7f4ef" }}
      ref={ref}
    >
      {/* Grain */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]">
        <filter id="test-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#test-noise)" />
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
            Happy Families
            <span className="w-10 h-[2px]" style={{ background: "#016d30" }} />
          </motion.p>
          <motion.h2
            className="font-display text-[clamp(2rem,5vw,3.4rem)] font-bold uppercase leading-[1.05]"
            style={{ color: "#016d30" }}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            What the{" "}
            <span style={{ color: "#F12E04" }}>Neighborhood&apos;s</span> Saying
          </motion.h2>
          <motion.p
            className="font-body text-[1rem] text-gray-500 mt-3 italic"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            Real reviews from real Inland Empire families.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="relative overflow-hidden rounded-[24px]"
              style={{
                background: "#016d30",
                padding: 2,
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: EASE }}
              whileHover={{ y: -6 }}
            >
              <div
                className="relative rounded-[22px] p-8 flex flex-col h-full"
                style={{
                  background: "#012810",
                }}
              >
                {/* Large quote mark */}
                <div
                  className="absolute top-4 right-6 font-display font-bold leading-none pointer-events-none select-none"
                  style={{ fontSize: "7rem", color: "rgba(245,204,5,0.06)", lineHeight: 1 }}
                >
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, si) => (
                    <motion.span
                      key={si}
                      className="text-lg"
                      style={{ color: "#F5CC05" }}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.12 + si * 0.06, ease: EASE }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>

                {/* Quote */}
                <p className="font-body text-[0.97rem] leading-[1.75] text-white/85 italic mb-8 flex-1 relative z-[1]">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Attribution */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0"
                    style={{ background: "rgba(245,204,5,0.15)", border: "1px solid rgba(245,204,5,0.3)" }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <strong className="font-body text-[0.9rem] font-bold text-white block">
                      {t.name}
                    </strong>
                    <span className="font-body text-[0.78rem]" style={{ color: "#86efac" }}>
                      {t.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
        >
          {[
            { val: "500+", label: "Families Protected" },
            { val: "5.0★", label: "Average Rating" },
            { val: "100%", label: "Plant-Based" },
            { val: "0", label: "Synthetic Pesticides" },
          ].map((b) => (
            <div
              key={b.label}
              className="flex flex-col items-center gap-1 px-8 py-4 rounded-2xl"
              style={{ background: "#016d30", border: "1px solid rgba(245,204,5,0.2)" }}
            >
              <span
                className="font-display text-[1.6rem] font-bold"
                style={{ color: "#F5CC05" }}
              >
                {b.val}
              </span>
              <span className="font-body text-[0.75rem] text-white/70 uppercase tracking-wider">
                {b.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
