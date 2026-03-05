"use client";

import { motion } from "framer-motion";

export function NonToxicSign() {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center w-full max-w-[480px] mx-auto overflow-visible"
      animate={{ y: [-5, 5, -5], rotate: [-1, 1, -1] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      role="img"
      aria-label="You're entering your Non-Toxic Era."
      style={{ aspectRatio: "2 / 1.1" }}
    >
      {/* ── THE GIANT LEAF CONTAINER ── */}
      <svg 
        className="absolute inset-0 w-full h-full drop-shadow-[0_12px_32px_rgba(1,40,18,0.12)]" 
        viewBox="0 0 400 220" 
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="leaf-texture"><feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.05 0" /></filter>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5F0E8" />
            <stop offset="100%" stopColor="#E8E2D5" />
          </linearGradient>
        </defs>

        {/* Outer Leaf Path */}
        <path 
          d="M 20,110 C 20,40 100,10 200,10 C 300,10 380,80 380,110 C 380,180 300,210 200,210 C 100,210 20,150 20,110 Z" 
          fill="url(#leafGrad)" 
          stroke="#016d30" 
          strokeWidth="2" 
          strokeOpacity="0.15"
        />
        
        {/* Paper Noise Texture overlaying the leaf */}
        <path 
          d="M 20,110 C 20,40 100,10 200,10 C 300,10 380,80 380,110 C 380,180 300,210 200,210 C 100,210 20,150 20,110 Z" 
          fill="none"
          filter="url(#leaf-texture)"
        />
      </svg>

      {/* ── Typography (Centered inside the Leaf) ── */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-2">
        {/* Eyebrow */}
        <p className="font-body text-[#014a20] tracking-[0.25em] uppercase text-[0.7rem] sm:text-[0.8rem] font-bold mb-2 opacity-80 text-center">
          You&apos;re entering your
        </p>

        {/* Main Title - Elegant Serif */}
        <h3 className="font-serif text-[clamp(2rem,5vw,3rem)] leading-none font-normal italic tracking-tight text-[#012810] text-center">
          Non-Toxic <span className="text-[#014a20]">Era.</span>
        </h3>
        
        {/* Delicate animated droplet at the tip of the title */}
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-[#F5CC05] mt-4"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
