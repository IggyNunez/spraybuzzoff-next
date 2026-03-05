"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, fadeUpDelayed } from "@/lib/animation-variants";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  eyebrowColor?: "red" | "gold";
  titleColor?: string;
  subtitleColor?: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  eyebrowColor = "red",
  titleColor = "text-green-800",
  subtitleColor = "text-gray-500",
  className = "",
}: SectionHeaderProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  const eyebrowClasses =
    eyebrowColor === "red" ? "text-red-500" : "text-gold-500";

  return (
    <div ref={ref} className={`text-center mb-16 ${className}`}>
      <motion.p
        className={`font-body text-[0.7rem] font-bold tracking-[0.2em] uppercase mb-4 flex items-center justify-center gap-3 ${eyebrowClasses}`}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <span className={`w-10 h-[2px] ${eyebrowColor === "red" ? "bg-red-500" : "bg-gold-500"}`} />
        {eyebrow}
      </motion.p>
      <motion.h2
        className={`font-display text-[clamp(2rem,5vw,3.2rem)] font-bold uppercase leading-[1.1] ${titleColor}`}
        variants={fadeUpDelayed(0.1)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className={`font-body text-base font-light italic mt-4 ${subtitleColor}`}
          variants={fadeUpDelayed(0.2)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
