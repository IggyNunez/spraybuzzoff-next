"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { TrustBadges } from "@/components/ui/TrustBadges";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Statement() {
  const sectionRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -150px 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setParticles(
      [...Array(10)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        xOffset: Math.random() * 50 - 25,
        duration: 10 + Math.random() * 10,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#012810]"
    >
      {/* ── Desktop: Split layout ── */}
      <div className="hidden md:grid md:grid-cols-2 min-h-[90vh]">

        {/* Left — Founders Video */}
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
          {/* Cinematic color grade overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#012810]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#012810]/60 via-transparent to-[#012810]/30" />
          {/* Gold accent line on the edge */}
          <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#F5CC05]/30 to-transparent" />
        </div>

        {/* Right — Manifesto Text */}
        <div className="relative flex flex-col justify-center px-[clamp(40px,5vw,80px)] py-24">

          {/* Floating pollen */}
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#F5CC05]"
              style={{ left: p.left, top: p.top }}
              animate={{
                y: [0, -80, 0],
                x: [0, p.xOffset, 0],
                opacity: [0, 0.4, 0],
              }}
              transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
            />
          ))}

          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
          >
            <div className="w-8 h-px bg-[#F5CC05]" />
            <p className="font-body text-[#F5CC05] text-[0.7rem] font-bold tracking-[0.4em] uppercase m-0">The Core Mission</p>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-display text-[clamp(36px,4vw,72px)] font-[900] uppercase leading-[0.95] text-white mb-8 tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 1, ease: EASE }}
            style={{ textShadow: "3px 3px 0px #011a0a, 6px 6px 0px rgba(0,0,0,0.3)" }}
          >
            Built because
            <br />
            <span className="font-serif italic normal-case font-normal text-[#F5CC05] block mt-1 drop-shadow-[0_4px_12px_rgba(245,204,5,0.3)]"
              style={{ textShadow: "3px 3px 0px #011a0a, 7px 7px 0px rgba(0,0,0,0.45)" }}
            >Families Deserve</span>
            <span className="block mt-1">Better.</span>
          </motion.h2>

          {/* Quote */}
          <div className="max-w-[520px] mb-10 relative">
            <span className="absolute -top-8 -left-4 text-[7rem] font-serif text-[#F5CC05]/10 pointer-events-none leading-none">&ldquo;</span>

            <motion.p
              className="font-body text-[1rem] md:text-[1.15rem] leading-[1.8] text-white/70 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 1 }}
            >
              Buzz Off started as a personal decision for our own families. We&apos;re in our non-toxic era, paying attention to what surrounds our kids.{" "}
              <span className="text-[#F5CC05] font-bold">Peace of mind shouldn&apos;t be optional</span> when it comes to your home.
            </motion.p>
          </div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <div className="w-24 h-px bg-gradient-to-r from-[#F5CC05]/50 to-transparent mb-6" />
            <p className="font-serif italic text-[1.4rem] text-white mb-1">
              Hayley &amp; Veronnica
            </p>
            <p className="font-body text-[0.65rem] font-black tracking-[0.25em] text-white/30 uppercase">
              Moms &amp; Founders of Buzz Off
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Mobile: Stacked layout ── */}
      <div className="md:hidden">
        {/* Video */}
        <div className="relative h-[50vh] overflow-hidden">
          <motion.div className="absolute inset-0 h-[120%]" style={{ y: imgY }}>
            <video
              ref={mobileVideoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/assets/family-about-us.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#012810]/30 via-transparent to-[#012810]" />
        </div>

        {/* Text */}
        <div className="relative px-6 pb-16 -mt-12">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div className="w-6 h-px bg-[#F5CC05]" />
            <p className="font-body text-[#F5CC05] text-[0.65rem] font-bold tracking-[0.3em] uppercase m-0">The Core Mission</p>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-display text-[clamp(28px,8vw,40px)] font-[900] uppercase leading-[0.95] text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 1, ease: EASE }}
            style={{ textShadow: "2px 2px 0px #011a0a, 4px 4px 0px rgba(0,0,0,0.3)" }}
          >
            Built because
            <br />
            <span className="font-serif italic normal-case font-normal text-[#F5CC05] block mt-1"
              style={{ textShadow: "2px 2px 0px #011a0a, 5px 5px 0px rgba(0,0,0,0.45)" }}
            >Families Deserve</span>
            <span className="block mt-1">Better.</span>
          </motion.h2>

          {/* Quote */}
          <motion.p
            className="font-body text-[0.9rem] leading-[1.8] text-white/70 font-medium mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 1 }}
          >
            Buzz Off started as a personal decision for our own families. We&apos;re in our non-toxic era, paying attention to what surrounds our kids.{" "}
            <span className="text-[#F5CC05] font-bold">Peace of mind shouldn&apos;t be optional</span> when it comes to your home.
          </motion.p>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4 }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-[#F5CC05]/50 to-transparent mb-5" />
            <p className="font-serif italic text-[1.2rem] text-white mb-1">
              Hayley &amp; Veronnica
            </p>
            <p className="font-body text-[0.6rem] font-black tracking-[0.2em] text-white/30 uppercase">
              Moms &amp; Founders of Buzz Off
            </p>
          </motion.div>
        </div>
      </div>

      {/* Gold shimmer line at top */}
      <motion.div
        className="absolute top-0 left-0 w-[40%] h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, #F5CC05, transparent)" }}
        animate={{ x: ["-100%", "250%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
