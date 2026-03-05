"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ButtonGold } from "@/components/ui/ButtonGold";
import { ButtonOutline } from "@/components/ui/ButtonOutline";
import { CheckmarkSVG } from "@/components/ui/CheckmarkSVG";
import { HERO_STATS, BOOKING_URL } from "@/lib/constants";
import { MosquitoSVG } from "@/components/ui/pests/MosquitoSVG";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { FlyingBee } from "@/components/ui/FlyingBee";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const STAGGER_DELAYS = [
  { circle: 0.3, check: 1.0 },
  { circle: 1.2, check: 1.9 },
  { circle: 2.1, check: 2.8 },
  { circle: 3.0, check: 3.7 },
];

/* ── Organic Botanical Background Overlay ── */
function OrganicHeroOverlay() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setParticles(
      [...Array(15)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        xOffset: Math.random() * 80 - 40,
        duration: 12 + Math.random() * 10,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Light text-protection vignette — subtle, not dirty */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#012810]/30 via-transparent to-[#012810]/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#012810]/40 via-transparent to-transparent" />
      
      {/* Warm Golden Sun Ray */}
      <motion.div 
        className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, #F5CC05 0%, transparent 70%)", filter: "blur(80px)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Botanical Pollen */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#F5CC05]"
          style={{
            left: p.left,
            top: p.top,
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, p.xOffset, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay
          }}
        />
      ))}

      {/* The Pollinators */}
      <FlyingBee delay={2} scale={0.8} path="M -100,50 C 200,-50 400,150 700,50 C 1000,-100 1200,200 1500,50" />
      <FlyingBee delay={8} scale={1.2} path="M 1500,200 C 1200,300 1000,100 700,200 C 400,300 200,100 -100,200" />

    </div>
  );
}

/* ── Mosquito Zap Animation ── */
function MosquitoZap() {
  const ZAP_DELAY = 3;       // seconds before the zap (flight time)
  const CYCLE = 10;           // total loop cycle in seconds

  return (
    <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden hidden md:block">
      {/* The mosquito flying in */}
      <motion.div
        className="absolute"
        style={{ top: "28%", right: "-60px" }}
        animate={{
          x: [0, -450, -480, -480],
          y: [0, 60, 55, 200],
          rotate: [0, -15, -15, 40],
          opacity: [1, 1, 1, 0],
          scale: [1, 1, 1.1, 0],
        }}
        transition={{
          duration: CYCLE,
          times: [0, ZAP_DELAY / CYCLE, (ZAP_DELAY + 0.1) / CYCLE, (ZAP_DELAY + 0.5) / CYCLE],
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 2,
        }}
      >
        <MosquitoSVG className="w-12 h-12 opacity-60 -rotate-90" />
      </motion.div>

      {/* The zap flash */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: "calc(28% + 55px)",
          right: "480px",
          width: 60,
          height: 60,
          background: "radial-gradient(circle, rgba(245,204,5,0.9) 0%, rgba(245,204,5,0) 70%)",
          filter: "blur(4px)",
        }}
        animate={{
          scale: [0, 0, 2.5, 0],
          opacity: [0, 0, 0.9, 0],
        }}
        transition={{
          duration: CYCLE,
          times: [0, ZAP_DELAY / CYCLE, (ZAP_DELAY + 0.15) / CYCLE, (ZAP_DELAY + 0.6) / CYCLE],
          repeat: Infinity,
          ease: "easeOut",
          repeatDelay: 2,
        }}
      />

      {/* Tiny zap spark lines */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <motion.div
          key={angle}
          className="absolute"
          style={{
            top: "calc(28% + 55px)",
            right: "505px",
            width: 2,
            height: 14,
            background: "#F5CC05",
            borderRadius: 2,
            transformOrigin: "center 30px",
            transform: `rotate(${angle}deg)`,
          }}
          animate={{
            scale: [0, 0, 1, 0],
            opacity: [0, 0, 1, 0],
          }}
          transition={{
            duration: CYCLE,
            times: [0, ZAP_DELAY / CYCLE, (ZAP_DELAY + 0.1) / CYCLE, (ZAP_DELAY + 0.4) / CYCLE],
            repeat: Infinity,
            ease: "easeOut",
            repeatDelay: 2,
          }}
        />
      ))}
    </div>
  );
}

/* Animate text per-letter but keep words from breaking apart */
function AnimatedWords({
  text,
  baseDelay,
  keyPrefix = "",
  hardShadow = false,
  shadowStyle,
}: {
  text: string;
  baseDelay: number;
  keyPrefix?: string;
  hardShadow?: boolean;
  shadowStyle?: React.CSSProperties;
}) {
  const words = text.split(" ");
  let cumulativeLength = 0;

  const defaultShadow: React.CSSProperties = {
    textShadow: "3px 3px 0px #012810, 6px 6px 0px rgba(0,0,0,0.3)",
  };

  return (
    <>
      {words.map((word, wi) => {
        const startIdx = cumulativeLength;
        cumulativeLength += word.length + 1;
        return (
          <span key={`${keyPrefix}w${wi}`} className="inline-flex mr-[0.3em]">
            {word.split("").map((char, ci) => (
              <span key={`${keyPrefix}mask${startIdx + ci}`} className="overflow-hidden inline-block pb-3 -mb-3">
                <motion.span
                  className="inline-block relative"
                  initial={{ y: "110%", rotate: 8 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: baseDelay + (startIdx + ci) * 0.03,
                    ease: EASE,
                  }}
                  style={hardShadow ? (shadowStyle || defaultShadow) : {}}
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </span>
        );
      })}
    </>
  );
}

export function Hero() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const mobileStatsRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 });
  const mobileStatsInView = useInView(mobileStatsRef, { once: true, amount: 0.5 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      if (video.currentTime >= 5) {
        video.currentTime = 0;
      }
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  return (
    <div className="p-1 md:p-1.5 bg-[#012810]">
    <section ref={sectionRef} className="relative h-[calc(100svh-8px)] md:h-[calc(100svh-12px)] overflow-hidden rounded-[16px] md:rounded-[20px] bg-[#012810]">
      {/* ── Cinematic Parallax Video Background ── */}
      <motion.div className="absolute inset-0 w-full h-[120%] z-0 rounded-[inherit]" style={{ y: videoY }}>
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

      {/* ── God-Tier Organic Overlays ── */}
      <OrganicHeroOverlay />

      {/* ── Mosquito Gets Zapped ── */}
      <MosquitoZap />

      {/* ── Main Content Container ── */}
      <motion.div
        className="relative z-10 flex flex-col justify-start md:justify-end h-full max-w-[1400px] mx-auto px-[clamp(20px,4vw,64px)] pt-[100px] md:pt-[120px] pb-[160px] md:pb-[clamp(200px,26vh,320px)]"
        style={{ y: textY }}
      >
        <div className="max-w-[900px] xl:max-w-[1000px]">

          {/* Headline — two-line stacked layout */}
          <h1 className="font-display text-[clamp(24px,6.8vw,38px)] md:text-[clamp(36px,4.5vw,72px)] font-[1000] uppercase leading-[1.08] text-white mb-4 tracking-tight">
            <span className="block drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
              <AnimatedWords text="Pest Control for the" baseDelay={0.3} keyPrefix="h1" hardShadow={true} />
            </span>
            <span className="block text-[clamp(32px,9vw,52px)] md:text-[clamp(48px,5.8vw,96px)]">
              <span className="inline-block text-[#F5CC05] drop-shadow-[0_4px_12px_rgba(245,204,5,0.4)]">
                <AnimatedWords
                  text="Non-Toxic Era."
                  baseDelay={0.6}
                  keyPrefix="h2"
                  hardShadow={true}
                  shadowStyle={{
                    textShadow: "3px 3px 0px #011a0a, 7px 7px 0px rgba(0,0,0,0.45)",
                  }}
                />
              </span>
            </span>
          </h1>

          {/* Elegant Serif Subheadline */}
          <motion.p
            className="font-serif italic text-[clamp(1.2rem,2.5vw,1.7rem)] text-white/90 mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: EASE }}
          >
            Live Outside Again,{" "}
            <span
              className="text-[#F12E04] font-bold italic"
              style={{
                WebkitTextStroke: "1.5px #016d30",
                paintOrder: "stroke fill",
              }}
            >Naturally.</span>
          </motion.p>

          {/* Description */}
          <motion.p
            className="font-body text-[0.95rem] md:text-[1.05rem] leading-[1.7] text-white/95 max-w-[480px] mb-8 font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <strong className="text-white font-extrabold">Plant-based treatments</strong> that work for real homes, real families, real life. Zero synthetic pesticides. FIFRA 25(b) exempt. Safe for kids &amp; pets.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
          >
            <ButtonGold href={BOOKING_URL} className="w-full sm:w-auto justify-center text-base px-7 py-3.5">
              Get Your Free Quote
            </ButtonGold>
            <ButtonOutline href="tel:9098988955" className="w-full sm:w-auto justify-center bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm text-base px-7 py-3.5">
              Call 909.898.8955
            </ButtonOutline>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Premium Deep Forest Glass Stats Bar ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Mobile Stats */}
        <div className="md:hidden px-4 mb-0">
          <div
            ref={mobileStatsRef}
            className="relative overflow-hidden grid grid-cols-2 gap-4 rounded-t-[24px] px-6 py-6"
            style={{
              background: "linear-gradient(to bottom, rgba(1, 40, 18, 0.85), rgba(1, 40, 18, 0.95))",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 -10px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(245,204,5,0.3)",
              borderTop: "1px solid rgba(245,204,5,0.2)",
            }}
          >
            {/* Organic Edge Shimmer */}
            <motion.div
              className="absolute top-0 left-0 w-[50%] h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, #F5CC05, transparent)" }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            {HERO_STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-start gap-3">
                <div className="mt-0.5">
                  <CheckmarkSVG size="sm" circleDelay={STAGGER_DELAYS[i].circle} checkDelay={STAGGER_DELAYS[i].check} animate={mobileStatsInView} />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-[0.75rem] font-black text-white uppercase leading-tight tracking-wide mb-0.5">
                    {stat.label}
                  </p>
                  <p className="font-body text-[0.65rem] text-[#86efac] leading-tight font-medium opacity-90">
                    {stat.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Stats */}
        <div className="hidden md:block max-w-[1400px] mx-auto px-[clamp(24px,4vw,64px)]">
          <div
            ref={statsRef}
            className="relative overflow-hidden flex flex-row items-center rounded-t-[32px] px-10 py-6 gap-0"
            style={{
              background: "linear-gradient(to bottom, rgba(1, 40, 18, 0.75), rgba(1, 40, 18, 0.95))",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              boxShadow: "0 -20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(245,204,5,0.3)",
              borderTop: "1px solid rgba(245,204,5,0.2)",
              borderLeft: "1px solid rgba(245,204,5,0.1)",
              borderRight: "1px solid rgba(245,204,5,0.1)",
            }}
          >
            {/* Organic Edge Shimmer */}
            <motion.div
              className="absolute top-0 left-0 w-[30%] h-[2px]"
              style={{ background: "linear-gradient(90deg, transparent, #F5CC05, transparent)" }}
              animate={{ x: ["-100%", "350%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
            />
            {HERO_STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-4 flex-1 justify-center">
                <CheckmarkSVG circleDelay={STAGGER_DELAYS[i].circle} checkDelay={STAGGER_DELAYS[i].check} animate={statsInView} />
                <div>
                  <p className="font-display text-[0.9rem] lg:text-[1.05rem] font-black text-white uppercase tracking-wide mb-1">
                    {stat.label}
                  </p>
                  <p className="font-body text-[0.75rem] lg:text-[0.85rem] text-[#86efac] font-medium opacity-90">
                    {stat.sub}
                  </p>
                </div>
                {i < HERO_STATS.length - 1 && (
                  <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#F5CC05]/20 to-transparent ml-auto" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* ── Bottom Transition Fade to Intro Section ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#012810] to-transparent z-[15] mix-blend-normal opacity-20 pointer-events-none rounded-b-[inherit]" />
    </section>
    </div>
  );
}
