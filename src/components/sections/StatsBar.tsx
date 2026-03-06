"use client";

import { motion } from "framer-motion";

function LeafIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="plantGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EBC078" />
          <stop offset="100%" stopColor="#C8973A" />
        </linearGradient>
      </defs>
      <path d="M40 70 Q40 40 35 15" fill="none" stroke="#C8973A" strokeWidth="4" strokeLinecap="round" />
      <path d="M35 15 C20 15 15 0 35 -10 C55 0 50 15 35 15" fill="url(#plantGrad)" transform="translate(0, 15) rotate(-10 35 15)" />
      <path d="M38 45 C25 45 20 30 38 25 C43 35 38 45 38 45" fill="#C8973A" fillOpacity="0.8" transform="rotate(-30 38 45)" />
      <path d="M42 55 C55 55 60 40 42 35 C38 45 42 55 42 55" fill="url(#plantGrad)" transform="rotate(20 42 55)" />
    </svg>
  );
}

function FamilyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="famGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EBC078" />
          <stop offset="100%" stopColor="#C8973A" />
        </linearGradient>
      </defs>
      <g transform="translate(10, 10)">
        <circle cx="20" cy="20" r="8" fill="url(#famGold)" />
        <path d="M10 55 C10 40 15 32 20 32 C25 32 30 40 30 55" fill="url(#famGold)" />
        <circle cx="40" cy="20" r="8" fill="url(#famGold)" fillOpacity="0.9" />
        <path d="M30 55 C30 40 35 32 40 32 C45 32 50 40 50 55" fill="url(#famGold)" fillOpacity="0.9" />
        <circle cx="25" cy="40" r="5" fill="#C8973A" />
        <path d="M18 60 C18 52 22 48 25 48 C28 48 32 52 32 60" fill="#C8973A" />
        <circle cx="45" cy="42" r="4" fill="#EBC078" />
        <path d="M38 60 C38 54 42 50 45 50 C48 50 52 54 52 60" fill="#EBC078" />
      </g>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="starPro" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F3D5A2" />
          <stop offset="100%" stopColor="#C8973A" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="32" fill="none" stroke="#C8973A" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="4 2" />
      <path d="M40 10 L48 32 H72 L54 45 L60 68 L40 55 L20 68 L26 45 L8 32 H32 L40 10Z" fill="url(#starPro)" />
      <path d="M40 15 L46 32 H65 L50 42 L55 58 L40 48 V15Z" fill="white" fillOpacity="0.2" />
    </svg>
  );
}

const STATS = [
  { icon: LeafIcon, label: "100% Plant-Based" },
  { icon: FamilyIcon, label: "Made for Families" },
  { icon: StarIcon, label: "5\u2605 Average" },
];

export function StatsBar() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-20"
      style={{
        background: "rgba(255, 255, 255, 0.12)",
        backdropFilter: "blur(20px) saturate(1.6)",
        WebkitBackdropFilter: "blur(20px) saturate(1.6)",
        borderTop: "1px solid rgba(255, 255, 255, 0.18)",
      }}
    >
      <div className="max-w-[1920px] mx-auto px-3 md:px-[clamp(20px,4vw,80px)] py-3 md:py-6">
        <div className="flex items-center justify-between md:justify-center gap-2 md:gap-20">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex items-center gap-1.5 md:gap-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="shrink-0 hidden md:block">
                <stat.icon />
              </div>
              <span className="font-body text-[0.6rem] md:text-[0.72rem] font-bold tracking-[0.06em] md:tracking-[0.15em] uppercase text-white">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
