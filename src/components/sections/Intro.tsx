"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { INTRO_CARDS, BOOKING_URL } from "@/lib/constants";
import { ButtonGold } from "@/components/ui/ButtonGold";
import { NonToxicSign } from "@/components/ui/NonToxicSign";
import { TrustBadges } from "@/components/ui/TrustBadges";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Realistic Ant Component (Matches the successful "Difference" style) ── */
function RealisticAnt({ delay = 0, scale = 1 }: { delay?: number, scale?: number }) {
  return (
    <motion.div
      animate={{ 
        y: [0, -2, 0],
        rotate: [-5, 5, -5]
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      style={{ scale }}
    >
      <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor" className="text-[#014a20]">
        <g transform="rotate(90 16 16)">
          <path d="M16 11 C18 11 19 9 19 7 C19 5 17 4 16 4 C15 4 13 5 13 7 C13 9 14 11 16 11 Z" />
          <path d="M16 17 C17.5 17 18.5 14.5 18.5 13 C18.5 11.5 17 10.5 16 10.5 C15 10.5 13.5 11.5 13.5 13 C13.5 14.5 14.5 17 16 17 Z" />
          <path d="M16 27 C19 27 21.5 23 21.5 20 C21.5 17 18 16 16 16 C14 16 10.5 17 10.5 20 C10.5 23 13 27 16 27 Z" />
          <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
            <path d="M14.5 5 Q11 2 9 4 M17.5 5 Q21 2 23 4" />
            <path d="M14 12 L9 10 M13.5 14 L8 14 M14 16 L9 19" />
            <path d="M18 12 L23 10 M18.5 14 L24 14 M18 16 L23 19" />
          </g>
        </g>
      </svg>
    </motion.div>
  );
}

/* ── Compact Specimen Pill ── */
function SpecimenPill({ card, index, isInView }: { card: any, index: number, isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const icons = ["❓", "📓", "🏘️", "🌿"];

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center w-full group cursor-default"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
    >
      {/* Nav-Pill Frame */}
      <div 
        className="w-full bg-[#016d30] shadow-lg transition-all duration-500 group-hover:scale-[1.02]" 
        style={{ borderRadius: 100, padding: "2px" }}
      >
        <div className="relative w-full h-full bg-white rounded-full flex items-center p-2 sm:p-3 overflow-hidden">
          
          {/* Logo Texture */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply" style={{ backgroundImage: "url('/assets/logo-large.png')", backgroundSize: "300px" }} />
          
          {/* Icon Badge */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F5F0E8] border border-[#016d30]/10 flex items-center justify-center text-2xl shadow-inner z-10">
            <motion.span animate={isHovered ? { scale: 1.2, rotate: [0, 10, -10, 0] } : {}}>{icons[index]}</motion.span>
          </div>

          {/* Text Content */}
          <div className="flex-1 px-5 text-left">
            <h4 className="font-display font-[1000] uppercase text-[1rem] sm:text-[1.2rem] text-[#012810] leading-tight mb-1 group-hover:text-[#016d30] transition-colors">
              {card.title}
            </h4>
            <p className="font-body text-[0.8rem] sm:text-[0.88rem] text-[#2d4a35] font-medium opacity-80 leading-snug pr-4">
              {card.desc}
            </p>
          </div>

          {/* Scurrying Border Ant (Visible on Hover) */}
          <motion.div 
            className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 pointer-events-none z-20"
            initial={{ offsetDistance: "0%" }}
            animate={isHovered ? { offsetDistance: "100%" } : { offsetDistance: "0%" }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ offsetPath: "path('M 40,2 L 960,2 A 38,38 0 0 1 960,78 L 40,78 A 38,38 0 0 1 40,2 Z')" }}
          >
            <RealisticAnt scale={0.4} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function Intro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -150px 0px" });
  const titleWords = "You're Not Overthinking It".split(" ");

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-[#F5F0E8]">
      
      {/* ── NATURAL ENVIRONMENT ── */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: "url('/assets/logo-large.png')", backgroundSize: "600px", backgroundPosition: "center" }} />
      
      {/* Subtle Kinetic Background */}
      <motion.div 
        className="absolute inset-[-10%] opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(circle at 30% 20%, #016d30 0%, transparent 40%), radial-gradient(circle at 70% 80%, #F5CC05 0%, transparent 40%)" }}
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-[clamp(20px,4vw,64px)]">

        {/* ── HEADER ── */}
        <div className="text-center mb-20">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#016d30]/5 border border-[#016d30]/10 mb-8"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={isInView ? { opacity: 1, scale: 1 } : {}} 
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="w-2 h-2 rounded-full bg-[#F5CC05] animate-pulse" />
            <p className="font-body text-[0.7rem] font-black tracking-[0.2em] uppercase text-[#016d30] m-0">The Problem</p>
          </motion.div>

          <div className="relative mb-12">
            <h2 
              className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-[1000] uppercase leading-none text-center flex flex-wrap justify-center gap-x-[0.25em]"
              style={{ color: "#016d30", letterSpacing: "-0.04em" }}
            >
              <span className="sr-only">You&apos;re Not Overthinking It</span>
              {titleWords.map((word, wIdx) => (
                <span key={wIdx} className="relative inline-block overflow-hidden pb-4">
                  <motion.span 
                    className="inline-block relative" 
                    initial={{ y: "100%", rotate: 8 }} 
                    animate={isInView ? { y: "0%", rotate: 0 } : {}} 
                    transition={{ duration: 0.7, delay: 0.1 + wIdx * 0.1, type: "spring", bounce: 0.4 }}
                    style={{
                      textShadow: "4px 4px 0px #F5CC05",
                      WebkitTextStroke: "1.5px #016d30"
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>

          <motion.div
            className="flex items-center justify-center mx-auto"
            style={{ maxWidth: 600, width: "100%" }}
            initial={{ opacity: 0, filter: "blur(20px)", y: 40 }}
            animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.8, ease: EASE }}
          >
            <NonToxicSign />
          </motion.div>
        </div>

        {/* ── COMPACT SPECIMEN TRAY ── */}
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
          {INTRO_CARDS.map((card, i) => (
            <SpecimenPill key={card.title} card={card} index={i} isInView={isInView} />
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          className="flex flex-col items-center gap-6 mt-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <ButtonGold href={BOOKING_URL} className="px-10 py-4 shadow-xl text-lg mb-2">
            Book Your Free Estimate
          </ButtonGold>
          <TrustBadges items={["No Contracts", "No Harsh Chemicals", "Just Results"]} theme="dark" />
        </motion.div>

      </div>
    </section>
  );
}
