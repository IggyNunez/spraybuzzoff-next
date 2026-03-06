"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ButtonGold } from "@/components/ui/ButtonGold";
import { StatsBar } from "@/components/sections/StatsBar";
import { BOOKING_URL } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      if (video.currentTime >= 5) video.currentTime = 0;
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden bg-[#1A5C32]"
    >
      {/* Video Background */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] z-0"
        style={{ y: videoY }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark overlays — rich green tint to kill the gray sky */}
      <div className="absolute inset-0 bg-[#0F3D20]/40 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-[1]" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-center h-full max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)] pt-[100px] pb-[80px] md:pt-[120px] md:pb-[120px]"
        style={{ y: textY }}
      >
        <div className="max-w-[1000px]">
          {/* Line 1: Welcome to the Non-Toxic Era. */}
          <motion.h1
            className="font-display text-[clamp(42px,8vw,110px)] font-[900] uppercase leading-[0.95] text-white mb-4 md:mb-6 tracking-[0.03em]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            Welcome to the<br />Non-Toxic Era.
          </motion.h1>

          {/* Line 2: Live Outside Again, Naturally. */}
          <motion.p
            className="font-quote italic text-[clamp(1.3rem,3.5vw,2.6rem)] text-[#F0C060] mb-4 md:mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          >
            Live Outside Again, Naturally.
          </motion.p>

          {/* Line 3: Description */}
          <motion.p
            className="font-body text-[0.9rem] md:text-[1.15rem] leading-[1.6] text-white/90 max-w-[560px] mb-6 md:mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            100% plant-based pest control. Safe for kids, pets, and the people you love.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
          >
            <ButtonGold href={BOOKING_URL} className="w-full sm:w-auto justify-center">
              Book Your First Service
            </ButtonGold>
            <a
              href="tel:9098988955"
              className="inline-flex items-center justify-center font-body text-[0.78rem] font-bold tracking-[0.08em] uppercase text-white border border-white/20 bg-white/[0.08] backdrop-blur-md hover:bg-white/[0.15] hover:border-white/40 px-8 py-4 rounded-full transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
            >
              Call the Team
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Frosted stats bar overlaying bottom of hero video */}
      <StatsBar />
    </section>
  );
}
