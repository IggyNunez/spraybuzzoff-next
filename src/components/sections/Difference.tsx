"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { DIFFERENCE_CARDS, BOOKING_URL } from "@/lib/constants";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { TrustBadges } from "@/components/ui/TrustBadges";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Highly Detailed "Actual Bug" SVG ── */
function DetailedAnt({ delay = 0, scale = 1 }: { delay?: number, scale?: number }) {
  return (
    <motion.div
      animate={{ 
        y: [0, -3, 0],
        rotate: [-8, 8, -8],
        x: [-2, 2, -2]
      }}
      transition={{
        duration: 0.25,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      style={{ scale }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" className="text-[#014a20] drop-shadow-md">
        <g transform="rotate(90 16 16)">
          {/* Head & Antennae */}
          <path d="M16 11 C18 11 19 9 19 7 C19 5 17 4 16 4 C15 4 13 5 13 7 C13 9 14 11 16 11 Z" />
          <path d="M14.5 5 Q11 2 9 4 M17.5 5 Q21 2 23 4" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          {/* Thorax (Middle) */}
          <path d="M16 17 C17.5 17 18.5 14.5 18.5 13 C18.5 11.5 17 10.5 16 10.5 C15 10.5 13.5 11.5 13.5 13 C13.5 14.5 14.5 17 16 17 Z" />
          {/* Abdomen (Rear) */}
          <path d="M16 27 C19 27 21.5 23 21.5 20 C21.5 17 18 16 16 16 C14 16 10.5 17 10.5 20 C10.5 23 13 27 16 27 Z" />
          {/* 6 Jointed Legs */}
          <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 12 L9 10 L7 13 M13.5 14 L8 14 L6 17 M14 16 L9 19 L8 23" />
            <path d="M18 12 L23 10 L25 13 M18.5 14 L24 14 L26 17 M18 16 L23 19 L24 23" />
          </g>
        </g>
      </svg>
    </motion.div>
  );
}

/* ── Compact Horizontal Specimen Tag ── */
function SpecimenTag({ card, index, isInView }: { card: any, index: number, isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center w-full group cursor-default"
      initial={{ opacity: 0, x: 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 + index * 0.1, ease: EASE }}
    >
      {/* The "Nav-Pill" Frame */}
      <div 
        className="w-full bg-[#016d30] shadow-xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[#F5CC05]/10" 
        style={{ borderRadius: 100, padding: "2px" }}
      >
        <div className="relative w-full h-full bg-white rounded-full flex items-center p-3 sm:p-4 overflow-hidden">
          
          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply" style={{ backgroundImage: "url('/assets/logo-large.png')", backgroundSize: "300px" }} />
          
          {/* Metallic Icon Container */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#014a20] to-[#012810] flex items-center justify-center text-3xl shadow-lg border border-white/10 shrink-0 z-10">
            <motion.span animate={isHovered ? { scale: 1.2, rotate: [0, 10, -10, 0] } : {}}>{card.icon}</motion.span>
            {/* Inner Glow */}
            <div className="absolute inset-0 rounded-full bg-radial-gradient from-white/10 to-transparent pointer-events-none" />
          </div>

          {/* Text Content */}
          <div className="flex-1 px-6 text-left">
            <h4 className="font-display font-[1000] uppercase text-[1.1rem] sm:text-[1.3rem] text-[#012810] leading-none mb-1 group-hover:text-[#016d30] transition-colors">
              {card.title}
            </h4>
            <p className="font-body text-[0.8rem] sm:text-[0.9rem] text-[#2d4a35] font-medium opacity-70 group-hover:opacity-100 transition-opacity line-clamp-1 sm:line-clamp-none">
              {card.desc}
            </p>
          </div>

          {/* Gold Detail Arrow */}
          <div className="mr-4 w-10 h-10 rounded-full border border-[#016d30]/10 flex items-center justify-center group-hover:bg-[#F5CC05] group-hover:border-[#F5CC05] transition-all duration-300">
            <ArrowIcon className="text-[#016d30] group-hover:text-[#012810] transition-colors" />
          </div>

          {/* Scurrying Border Ant (Visible on Hover) */}
          <motion.div 
            className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 pointer-events-none"
            initial={{ offsetDistance: "0%" }}
            animate={isHovered ? { offsetDistance: "100%" } : { offsetDistance: "0%" }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ offsetPath: "path('M 32,2 L 968,2 A 30,30 0 0 1 968,62 L 32,62 A 30,30 0 0 1 32,2 Z')" }}
          >
            <DetailedAnt scale={0.4} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function Difference() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -150px 0px" });
  const titleWords = "The Smarter, Safer Difference".split(" ");

  const [particles, setParticles] = useState<any[]>([]);
  useEffect(() => {
    setParticles([...Array(8)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
    })));
  }, []);

  return (
    <section id="difference" className="relative py-24 md:py-32 overflow-hidden bg-[#F5F0E8]" ref={ref}>
      
      {/* ── NATURAL ENVIRONMENT ── */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: "url('/assets/logo-large.png')", backgroundSize: "600px", backgroundPosition: "center" }} />
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[#016d30] opacity-[0.05]"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, -120, 0], opacity: [0, 0.15, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
        />
      ))}

      <div className="relative z-10 max-w-[1400px] mx-auto px-[clamp(20px,4vw,64px)]">
        
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24">
          
          {/* ── LEFT SIDE: CONTENT & ANTS ── */}
          <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-start text-center lg:text-left">
            
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#016d30]/5 border border-[#016d30]/10 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
            >
              <span className="w-2 h-2 rounded-full bg-[#F5CC05] animate-pulse" />
              <p className="font-body text-[0.7rem] font-black tracking-[0.2em] uppercase text-[#016d30] m-0">The Buzz Off Edge</p>
            </motion.div>

            <div className="relative mb-8">
              <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-[1000] uppercase leading-none flex flex-wrap justify-center lg:justify-start gap-x-[0.25em]">
                {titleWords.map((word, wIdx) => (
                  <span key={wIdx} className="relative inline-block overflow-hidden pb-4">
                    <motion.span 
                      className="inline-block" 
                      initial={{ y: "100%", rotate: 8 }} 
                      animate={isInView ? { y: "0%", rotate: 0 } : {}} 
                      transition={{ duration: 0.7, delay: wIdx * 0.1, type: "spring", bounce: 0.4 }}
                      style={{
                        color: "#016d30",
                        textShadow: "4px 4px 0px #F5CC05",
                        WebkitTextStroke: "1.5px #016d30"
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-12"
            >
              <TrustBadges items={["Zero Synthetic Pesticides", "Infinite Peace of Mind", "Guaranteed Results"]} theme="dark" />
            </motion.div>
            </div>

            {/* ── THE MARCHING ARMY ── */}
            <div className="flex flex-col items-center lg:items-start gap-6 mt-4">
               <div className="flex gap-4">
                  {[...Array(5)].map((_, i) => (
                    <DetailedAnt key={i} delay={i * 0.12} />
                  ))}
               </div>
               <p className="font-body text-[0.65rem] font-black uppercase tracking-[0.4em] text-[#016d30]/30">The Bug-Free Standard</p>
            </div>

          </div>

          {/* ── RIGHT SIDE: COMPACT SPECIMEN TAGS ── */}
          <div className="w-full lg:w-[55%] flex flex-col gap-6 lg:pt-10">
            {DIFFERENCE_CARDS.map((card, i) => (
              <SpecimenTag key={card.title} card={card} index={i} isInView={isInView} />
            ))}
            
            <motion.div
              className="mt-6 flex justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
            >
               <a 
                 href={BOOKING_URL} 
                 className="font-body text-[0.85rem] font-black uppercase tracking-widest text-[#016d30] border-b-2 border-[#016d30] hover:text-[#F5CC05] hover:border-[#F5CC05] transition-all pb-1"
               >
                 View All Benefits
               </a>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
