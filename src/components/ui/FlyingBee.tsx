"use client";

import { motion } from "framer-motion";

export function FlyingBee({ delay = 0, scale = 1, path = "M -100,100 C 200,-50 400,250 700,50 C 1000,-100 1200,300 1500,100" }: { delay?: number, scale?: number, path?: string }) {
  return (
    <motion.div
      className="absolute z-0 pointer-events-none"
      initial={{ offsetDistance: "0%", opacity: 0, scale: 0 }}
      animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0], scale }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear", delay }}
      style={{
        offsetPath: `path('${path}')`,
        offsetRotate: "auto"
      }}
    >
      <motion.svg 
        width="40" height="40" viewBox="0 0 40 40" fill="none" className="drop-shadow-lg"
        animate={{ y: [-4, 4, -4], rotate: [-5, 5, -5] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Wings (Fast Flutter) */}
        <motion.path d="M20 15 C15 5 5 10 15 20 Z" fill="white" opacity="0.8" animate={{ rotateX: [0, 60, 0] }} transition={{ duration: 0.05, repeat: Infinity }} style={{ originX: "20px", originY: "20px" }} />
        <motion.path d="M20 15 C25 5 35 10 25 20 Z" fill="white" opacity="0.8" animate={{ rotateX: [0, 60, 0] }} transition={{ duration: 0.05, repeat: Infinity, delay: 0.02 }} style={{ originX: "20px", originY: "20px" }} />
        {/* Body */}
        <ellipse cx="20" cy="20" rx="10" ry="6" fill="#F5CC05" />
        {/* Stripes */}
        <path d="M16 15 Q18 20 16 25" stroke="#012810" strokeWidth="2" fill="none" />
        <path d="M20 14 Q22 20 20 26" stroke="#012810" strokeWidth="2.5" fill="none" />
        <path d="M24 15 Q26 20 24 25" stroke="#012810" strokeWidth="2" fill="none" />
        {/* Head */}
        <circle cx="12" cy="20" r="4" fill="#012810" />
        {/* Stinger */}
        <path d="M30 20 L34 20" stroke="#012810" strokeWidth="1.5" strokeLinecap="round" />
      </motion.svg>
    </motion.div>
  );
}
