"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TextureOverlay } from "@/components/ui/TextureOverlay";
import { fadeUp, fadeUpDelayed } from "@/lib/animation-variants";
import { MosquitoSVG } from "@/components/ui/pests/MosquitoSVG";
import { CockroachSVG } from "@/components/ui/pests/CockroachSVG";
import { AntSVG } from "@/components/ui/pests/AntSVG";
import { SpiderSVG } from "@/components/ui/pests/SpiderSVG";

const PESTS = [
  {
    name: "Mosquitoes",
    desc: "Yard & perimeter",
    SVG: MosquitoSVG,
  },
  {
    name: "Roaches",
    desc: "Interior & exterior",
    SVG: CockroachSVG,
  },
  {
    name: "Ants",
    desc: "Trails & colonies",
    SVG: AntSVG,
  },
  {
    name: "Spiders",
    desc: "Webs & nests",
    SVG: SpiderSVG,
  },
  {
    name: "Earwigs",
    desc: "Garden & entry",
    emoji: "🪲",
  },
  {
    name: "Fleas & Ticks",
    desc: "Yard treatment",
    emoji: "🐕",
  },
];

export function Pests() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section className="relative py-28 md:py-36 bg-green-800 overflow-hidden" ref={ref}>
      <TextureOverlay />

      <div className="relative z-[2] max-w-[1400px] mx-auto px-[clamp(20px,4vw,48px)]">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            className="font-body text-[0.85rem] font-bold tracking-[0.2em] uppercase text-gold-500 mb-4 flex items-center justify-center gap-3"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <span className="w-10 h-[2px] bg-gold-500" />
            What We Treat
          </motion.p>
          <motion.h2
            className="font-display text-[clamp(2rem,5vw,3.2rem)] font-bold uppercase leading-[1.1] text-white mb-3"
            variants={fadeUpDelayed(0.1)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Every Pest. Zero Toxins.
          </motion.h2>
          <motion.p
            className="font-body text-base font-light italic text-green-300"
            variants={fadeUpDelayed(0.2)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            We handle what matters most to families, naturally.
          </motion.p>
        </div>

        {/* Pest Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {PESTS.map((pest, i) => (
            <motion.div
              key={pest.name}
              className="group bg-white/[0.04] rounded-2xl p-6 text-center border border-transparent hover:border-gold-500 transition-colors duration-300 flex flex-col items-center"
              variants={fadeUpDelayed(0.2 + i * 0.08)}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* SVG or emoji icon */}
              <div className="w-16 h-16 mb-3 flex items-center justify-center">
                {pest.SVG ? (
                  <pest.SVG className="w-full h-full" />
                ) : (
                  <span className="text-4xl">{pest.emoji}</span>
                )}
              </div>
              <p className="font-body text-[0.92rem] font-bold text-white mb-1">
                {pest.name}
              </p>
              <p className="font-body text-[0.82rem] text-white/60">
                {pest.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
