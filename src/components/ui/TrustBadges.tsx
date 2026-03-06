"use client";

import { motion } from "framer-motion";

interface TrustBadgesProps {
  items: string[];
  className?: string;
  theme?: "light" | "dark";
}

export function TrustBadges({ items, className = "", theme = "light" }: TrustBadgesProps) {
  const isLight = theme === "light";

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 md:gap-3 ${className}`}>
      {items.map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
            isLight
              ? "bg-white/[0.18] border-white/30 text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
              : "bg-[#1A5C32]/10 border-[#1A5C32]/25 text-[#1C2B1E] shadow-[0_2px_8px_rgba(26,92,50,0.08)]"
          }`}
          style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
        >
          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isLight ? "bg-[#F0C060]" : "bg-[#1A5C32]"}`} />
          <span className="font-body text-[0.72rem] font-extrabold uppercase tracking-[0.08em] whitespace-nowrap">
            {item}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
