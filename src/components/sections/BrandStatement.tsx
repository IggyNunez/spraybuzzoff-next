"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function BrandStatement() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -100px 0px" });
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={sectionRef} className="relative bg-white overflow-hidden">
      {/* Desktop: Split layout */}
      <div className="hidden md:grid md:grid-cols-2 min-h-[80vh]">
        {/* Left - Video */}
        <div className="relative overflow-hidden">
          <motion.div className="absolute inset-0 h-[120%]" style={{ y: imgY }}>
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/assets/family-about-us.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
        </div>

        {/* Right - Text */}
        <div className="flex flex-col justify-center px-[clamp(40px,5vw,80px)] py-24">
          <motion.h2
            className="section-title mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
          >
            <span className="section-eyebrow block mb-3">The Difference</span>
            Built Because Families
            <br />
            Deserve Better.
          </motion.h2>

          <motion.div
            className="gold-divider mb-8"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ transformOrigin: "left" }}
          />

          <motion.p
            className="font-body text-[1.05rem] leading-[1.8] text-[#1C2B1E]/70 mb-8 max-w-[520px]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            We didn&apos;t set out to start a pest control company. We just started asking a simple question: what exactly are we spraying around our kids? Buzz Off started as a personal decision for our own families, and that&apos;s still why we do it. We&apos;re not just getting rid of pests. We&apos;re changing what gets used to do it.
          </motion.p>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <div className="w-16 h-[2px] bg-[#C8973A] mb-5" />
            <p className="font-quote italic text-[1.3rem] text-[#1A5C32] mb-1">
              - The Buzz Off Family
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mobile: Stacked */}
      <div className="md:hidden">
        <div className="relative h-[50vh] overflow-hidden">
          <motion.div className="absolute inset-0 h-[120%]" style={{ y: imgY }}>
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src="/assets/family-about-us.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
        </div>

        <div className="px-6 pb-16 -mt-8">
          <h2 className="section-title mb-4 pt-2" style={{ fontSize: 'clamp(28px, 7vw, 36px)', lineHeight: 1.15 }}>
            <span className="section-eyebrow block mb-3">The Difference</span>
            Built Because Families Deserve Better.
          </h2>
          <div className="gold-divider mb-6" />
          <p className="font-body text-[0.9rem] leading-[1.8] text-[#1C2B1E]/70 mb-8">
            We didn&apos;t set out to start a pest control company. We just started asking a simple question: what exactly are we spraying around our kids? Buzz Off started as a personal decision for our own families, and that&apos;s still why we do it.
          </p>
          <div className="w-12 h-[2px] bg-[#C8973A] mb-4" />
          <p className="font-quote italic text-[1.1rem] text-[#1A5C32] mb-1">
            - The Buzz Off Family
          </p>
        </div>
      </div>
    </section>
  );
}
