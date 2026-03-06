"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COMPARISON_ROWS } from "@/lib/constants";
import { ArchedEyebrow } from "@/components/ui/ArchedEyebrow";

export function ComparisonChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-[#EDEADE]">
      <div className="max-w-[1000px] mx-auto px-[clamp(20px,4vw,80px)]">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <ArchedEyebrow>Why Buzz Off</ArchedEyebrow>
          </motion.div>
          <motion.h2
            className="section-title mb-4 flex items-center justify-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <img
              src="/assets/spraybuzzoffLogo.png"
              alt="Buzz Off"
              className="h-[clamp(90px,14vw,160px)] w-auto object-contain"
            />
            <span>vs Traditional</span>
          </motion.h2>
          <motion.div
            className="gold-divider mx-auto"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          />
        </div>

        {/* Table */}
        <motion.div
          className="frost rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-[#1A5C32] text-white">
            <div className="p-4 font-body text-[0.7rem] font-bold tracking-[0.15em] uppercase">
              Feature
            </div>
            <div className="p-4 font-body text-[0.7rem] font-bold tracking-[0.15em] uppercase text-center">
              Buzz Off
            </div>
            <div className="p-4 font-body text-[0.7rem] font-bold tracking-[0.15em] uppercase text-center">
              Traditional
            </div>
          </div>

          {/* Rows */}
          {COMPARISON_ROWS.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-white" : "bg-[#EDEADE]/40"} ${i < COMPARISON_ROWS.length - 1 ? "border-b border-[#1A5C32]/10" : ""}`}
            >
              <div className="p-4 font-body text-[0.82rem] font-bold text-[#1C2B1E]">
                {row.feature}
              </div>
              <div className="p-4 font-body text-[0.82rem] text-[#1A5C32] text-center flex items-center justify-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <circle cx="7" cy="7" r="7" fill="#1A5C32" />
                  <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-left">{row.buzzoff}</span>
              </div>
              <div className="p-4 font-body text-[0.82rem] text-[#1C2B1E]/50 text-center flex items-center justify-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <circle cx="7" cy="7" r="6" stroke="#1C2B1E" strokeOpacity="0.2" strokeWidth="1" />
                  <path d="M5 5l4 4M9 5l-4 4" stroke="#1C2B1E" strokeOpacity="0.3" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span className="text-left">{row.traditional}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
