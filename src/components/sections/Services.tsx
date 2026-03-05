"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useInView, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import {
  SERVICES_FEATURED,
  SERVICES_SMALL,
  BOOKING_URL,
} from "@/lib/constants";
import { TrustBadges } from "@/components/ui/TrustBadges";

const EASE = [0.16, 1, 0.3, 1];

/* ── Detailed Marching Ant Row ── */
function AntRow() {
  return (
    <div className="flex items-center justify-center gap-4 h-12 overflow-visible pointer-events-none w-full max-w-[320px] mx-auto relative">
      {/* Faint dotted trail */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-transparent border-t-2 border-dashed border-[#016d30]/15" />
      
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="relative z-10"
          animate={{ 
            y: [0, -4, 0],
            rotate: [-6, 6, -6]
          }}
          transition={{
            y: { duration: 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 },
            rotate: { duration: 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }
          }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="currentColor" className="text-[#014a20] drop-shadow-sm">
            {/* Rotate 90deg so the ant faces to the right */}
            <g transform="rotate(90 16 16)">
              {/* Head */}
              <path d="M16 11 C18 11 19 9 19 7 C19 5 17 4 16 4 C15 4 13 5 13 7 C13 9 14 11 16 11 Z" />
              {/* Thorax */}
              <path d="M16 17 C17.5 17 18.5 14.5 18.5 13 C18.5 11.5 17 10.5 16 10.5 C15 10.5 13.5 11.5 13.5 13 C13.5 14.5 14.5 17 16 17 Z" />
              {/* Abdomen */}
              <path d="M16 27 C19 27 21.5 23 21.5 20 C21.5 17 18 16 16 16 C14 16 10.5 17 10.5 20 C10.5 23 13 27 16 27 Z" />
              {/* Antennae */}
              <path d="M14.5 5 Q11 2 9 4 M17.5 5 Q21 2 23 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              {/* Legs Left */}
              <path d="M14 12 L9 10 L7 13 M13.5 14 L8 14 L6 17 M14 16 L9 19 L8 23" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Legs Right */}
              <path d="M18 12 L23 10 L25 13 M18.5 14 L24 14 L26 17 M18 16 L23 19 L24 23" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Nav-Consistent "Pill-Style" Flip Card ── */
function ServiceCard({ service, index, isSmall = false, isInView }: { service: any, index: number, isSmall?: boolean, isInView: boolean }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`group relative ${isSmall ? 'h-[320px]' : 'h-[500px]'} w-full perspective-[1000px] cursor-pointer`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={{ opacity: 0, y: 50, rotateY: 0 }}
        animate={isInView ? { opacity: 1, y: 0, rotateY: isFlipped ? 180 : 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ── FRONT OF CARD (Full Image & Title) ── */}
        <div 
          className="absolute inset-0 backface-hidden bg-[#016d30] shadow-[0_12px_40px_rgba(1,40,18,0.15)]"
          style={{ borderRadius: isSmall ? 40 : 56, padding: "3px", backfaceVisibility: "hidden" }}
        >
          <div className="relative w-full h-full bg-white overflow-hidden flex flex-col" style={{ borderRadius: isSmall ? 38 : 54 }}>
            {/* Full Cover Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#012810]/90 via-[#012810]/20 to-transparent" />
            </div>

            {/* Front Content */}
            <div className="relative z-10 flex flex-col h-full justify-end p-8 text-center pb-10">
              <span className="font-body text-[0.65rem] font-black uppercase tracking-[0.3em] text-[#F5CC05] mb-3 drop-shadow-md">
                {service.label}
              </span>
              <h3 
                className={`font-display font-[1000] uppercase tracking-tight leading-[0.95] text-white ${isSmall ? 'text-[1.8rem]' : 'text-[2.8rem]'}`}
                style={{ textShadow: "3px 3px 0px rgba(0,0,0,0.5)" }}
              >
                {service.title}
              </h3>
            </div>
          </div>
        </div>

        {/* ── BACK OF CARD (Details & CTA) ── */}
        <div 
          className="absolute inset-0 backface-hidden bg-[#016d30] shadow-[0_12px_40px_rgba(1,40,18,0.15)]"
          style={{ 
            borderRadius: isSmall ? 40 : 56, 
            padding: "3px", 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)" 
          }}
        >
          <div className="relative w-full h-full bg-[#fdfbf7] overflow-hidden flex flex-col items-center justify-center p-8 text-center" style={{ borderRadius: isSmall ? 38 : 54 }}>
            {/* Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: "url('/assets/logo-large.png')", backgroundSize: "300px" }} />
            
            <h4 className={`font-display font-[900] uppercase text-[#012810] mb-4 ${isSmall ? 'text-[1.4rem]' : 'text-[2rem]'}`}>
              {service.title}
            </h4>
            
            {!isSmall && (
              <>
                <p className="font-body text-[0.95rem] leading-relaxed text-[#2d4a35] font-medium mb-6">
                  {service.description}
                </p>
                <ul className="flex flex-col gap-2 mb-8 items-center text-[#014a20] font-body text-[0.85rem]">
                  {service.bullets?.map((b: string) => (
                    <li key={b} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5CC05]" /> {b}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {isSmall && (
              <p className="font-body text-[0.85rem] leading-relaxed text-[#2d4a35] font-medium mb-6 line-clamp-3">
                {service.description}
              </p>
            )}

            <a 
              href={BOOKING_URL}
              className="group/btn inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-red-500 text-white font-body text-[0.75rem] font-black uppercase tracking-widest transition-all duration-300 shadow-md hover:bg-red-600 hover:scale-105"
              style={{ border: "2px solid #016d30" }}
            >
              Book Now <ArrowIcon className="group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const titleWords = "Our Services".split(" ");

  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden bg-[#F5F0E8]" ref={ref}>
      
      {/* ── ENVIRONMENTAL LAYER ── */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: "url('/assets/logo-large.png')", backgroundSize: "600px", backgroundPosition: "center" }} />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-[clamp(20px,4vw,64px)]">
        
        {/* ── HEADER ── */}
        <div className="text-center mb-20 lg:mb-28">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#016d30]/5 border border-[#016d30]/10 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="text-sm">🍃</span>
            <p className="font-body text-[0.7rem] font-black tracking-[0.2em] uppercase text-[#016d30] m-0">What We Do</p>
          </motion.div>

          <div className="relative mb-8">
            <h2 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-[1000] uppercase leading-none text-center flex flex-wrap justify-center gap-x-[0.25em]">
              {titleWords.map((word, wIdx) => (
                <span key={wIdx} className="relative inline-block overflow-hidden pb-4">
                  <motion.span 
                    className="inline-block" 
                    initial={{ y: "100%", rotate: 8 }} 
                    animate={isInView ? { y: "0%", rotate: 0 } : {}} 
                    transition={{ duration: 0.6, delay: wIdx * 0.1, type: "spring", bounce: 0.5 }}
                    style={{
                      color: "#016d30",
                      textShadow: "4px 4px 0px #F5CC05",
                      WebkitTextStroke: "1px #016d30"
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>

          {/* Simple Ant Row under title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mb-10"
          >
            <AntRow />
          </motion.div>

          <motion.p
            className="font-serif italic text-[1.2rem] md:text-[1.5rem] text-[#2d4a35] max-w-[500px] mx-auto leading-relaxed mt-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            Pure, botanical protection crafted for <span className="font-bold border-b-2 border-[#F5CC05]">your family&apos;s sanctuary.</span>
          </motion.p>
        </div>

        {/* ── FEATURED GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {SERVICES_FEATURED.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} isInView={isInView} />
          ))}
        </div>

        {/* ── SMALL GRID ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_SMALL.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i + 2} isSmall={true} isInView={isInView} />
          ))}
        </div>

        <motion.div 
          className="mt-20 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <TrustBadges items={["100% Plant-Based", "Safe for Kids", "Pet Friendly"]} theme="dark" />
        </motion.div>

      </div>
    </section>
  );
}

