"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { PROCESS_STEPS, BOOKING_URL } from "@/lib/constants";
import { ButtonGold } from "@/components/ui/ButtonGold";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { FlyingBee } from "@/components/ui/FlyingBee";

const EASE = [0.16, 1, 0.3, 1];

const STEP_IMAGES = [
  "/assets/man-by-truck.jpg",
  "/assets/man-getting-spray-ready.jpg",
  "/assets/spraying-exterior.jpg",
  "/assets/spraying-bugs.jpg",
];

/* ── Clean Stationary Process Card ── */
function ProcessCard({ step, index, isInView }: { step: any, index: number, isInView: boolean }) {
  return (
    <div className="relative w-full pt-6">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      >
        {/* The Nav-Pill Frame */}
        <div 
          className="relative bg-[#016d30] shadow-[0_12px_40px_rgba(1,40,18,0.12)] group transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(1,40,18,0.2)]"
          style={{ borderRadius: 48, padding: "3px" }}
        >
          <div className="relative w-full h-full bg-white overflow-hidden flex flex-col p-2" style={{ borderRadius: 46 }}>
            
            {/* Paper Texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply" style={{ backgroundImage: "url('/assets/logo-large.png')", backgroundSize: "300px" }} />
            
            {/* Image Container (Polaroid/Lens Style) */}
            <div className="relative w-full h-[220px] rounded-[40px] overflow-hidden mb-4 shadow-inner mt-4">
              <Image
                src={STEP_IMAGES[index]}
                alt={step.title}
                fill
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#012810]/70 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content Area */}
            <div className="relative flex flex-col items-center text-center px-4 pb-6 z-10">
              
              {/* Ghost Number */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 font-display font-black text-[6rem] leading-none text-[#016d30] opacity-5 pointer-events-none select-none transition-opacity duration-500 group-hover:opacity-10">
                0{index + 1}
              </div>

              <span className="font-body text-[0.65rem] font-black uppercase tracking-[0.3em] text-[#F5CC05] bg-[#016d30] px-3 py-1 rounded-full mb-3 shadow-md relative z-10">
                Step 0{index + 1}
              </span>

              <h4 className="font-display font-[900] uppercase text-[#012810] text-[1.4rem] leading-tight mb-3 relative z-10">
                {step.title}
              </h4>
              
              <div className="w-8 h-[3px] bg-[#F5CC05] mb-4 rounded-full relative z-10" />

              <p className="font-body text-[0.9rem] leading-relaxed text-[#2d4a35] font-medium relative z-10">
                {step.desc}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const titleWords = "Simple As It Should Be".split(" ");

  const [particles, setParticles] = useState<any[]>([]);
  useEffect(() => {
    setParticles([...Array(10)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10
    })));
  }, []);

  return (
    <section ref={ref} className="relative py-24 md:py-36 overflow-hidden bg-[#fdfbf7]">
      
      {/* ── NATURAL ENVIRONMENT ── */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: "url('/assets/logo-large.png')", backgroundSize: "400px", backgroundPosition: "center", backgroundRepeat: "repeat" }} />
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#F5CC05] opacity-30 pointer-events-none"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, -100, 0], opacity: [0, 0.4, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
        />
      ))}

      {/* ── BACKGROUND FLIGHT PATH ── */}
      <div className="absolute top-[30%] left-0 right-0 h-0 pointer-events-none hidden lg:block overflow-visible z-0 opacity-20">
        <svg width="100%" height="400" viewBox="0 0 1400 400" preserveAspectRatio="none" className="overflow-visible">
          <motion.path 
            d="M -100,100 C 200,-50 400,250 700,50 C 1000,-100 1200,300 1500,100" 
            fill="none" stroke="#F5CC05" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 16"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
        </svg>
      </div>
      
      {/* Active Bees! */}
      {isInView && (
        <>
          <FlyingBee delay={0} />
          <FlyingBee delay={7.5} />
        </>
      )}

      <div className="relative z-10 max-w-[1400px] mx-auto px-[clamp(20px,4vw,64px)]">

        {/* ── HEADER ── */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#016d30]/5 border border-[#016d30]/10 mb-8 shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
          >
            <span className="w-2 h-2 rounded-full bg-[#F5CC05] animate-pulse" />
            <p className="font-body text-[0.7rem] font-black tracking-[0.2em] uppercase text-[#016d30] m-0">The Step-By-Step</p>
          </motion.div>

          <div className="relative mb-6">
            <h2 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-[1000] uppercase leading-none text-center flex flex-wrap justify-center gap-x-[0.25em]">
              {titleWords.map((word, wIdx) => (
                <span key={wIdx} className="relative inline-block overflow-hidden pb-6 -mb-6">
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
          </div>

          <motion.p
            className="font-serif italic text-[1.2rem] md:text-[1.5rem] text-[#014a20] max-w-[560px] mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            A refined journey from your first call to a <span className="font-bold border-b-2 border-[#F5CC05]">perfectly clear yard.</span>
          </motion.p>
        </div>

        {/* ── THE CLEAN PROCESS DECK ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10 pt-4">
          {PROCESS_STEPS.map((step, i) => (
            <ProcessCard key={step.num} step={step} index={i} isInView={isInView} />
          ))}
        </div>

        {/* ── FOOTER CTA ── */}
        <motion.div
          className="flex flex-col items-center gap-6 mt-20 lg:mt-28"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <ButtonGold href={BOOKING_URL} className="px-10 py-4 shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-lg mb-2">
            Book Your Free Estimate
          </ButtonGold>
          <TrustBadges items={["Zero Hassle", "Quick Booking", "Family Safe"]} theme="dark" />
        </motion.div>

      </div>
    </section>
  );
}
