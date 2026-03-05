"use client";

import { motion } from "framer-motion";

interface TrustBadgesProps {
  items: string[];
  className?: string;
  theme?: "light" | "dark"; // Light for dark backgrounds, dark for light backgrounds
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
          className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-md border ${
            isLight 
              ? "bg-white/5 border-white/10 text-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.1)]" 
              : "bg-[#016d30]/5 border-[#016d30]/10 text-[#014a20] shadow-[0_4px_12px_rgba(1,40,18,0.05)]"
          }`}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-[#F5CC05]" : "bg-[#016d30]"}`} />
          <span className="font-body text-[0.6rem] md:text-[0.65rem] font-bold uppercase tracking-[0.15em] whitespace-nowrap">
            {item}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
