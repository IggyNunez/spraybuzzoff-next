"use client";

import { motion } from "framer-motion";

interface CheckmarkSVGProps {
  circleDelay?: number;
  checkDelay?: number;
  animate?: boolean;
  size?: "sm" | "md";
}

export function CheckmarkSVG({
  circleDelay = 0,
  checkDelay = 0.45,
  animate = false,
  size = "md",
}: CheckmarkSVGProps) {
  const sizeClass = size === "sm" ? "w-5 h-5 shrink-0" : "w-10 h-10 shrink-0";

  return (
    <motion.svg
      viewBox="0 0 40 40"
      fill="none"
      className={sizeClass}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={
        animate
          ? { scale: [0.8, 1.15, 1], opacity: 1 }
          : { scale: 0.8, opacity: 0 }
      }
      transition={{
        duration: 0.5,
        delay: circleDelay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
    >
      {/* Gold glow bg */}
      <motion.circle
        cx={20}
        cy={20}
        r={18}
        fill="rgba(245,204,5,0.1)"
        initial={{ scale: 0 }}
        animate={animate ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: circleDelay, ease: "easeOut" }}
        style={{ transformOrigin: "20px 20px" }}
      />
      {/* Circle stroke — gold */}
      <motion.circle
        cx={20}
        cy={20}
        r={18}
        stroke="#F5CC05"
        strokeWidth={2}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.7, delay: circleDelay, ease: "easeOut" }}
      />
      {/* Bold strike check — gold, thick, confident */}
      <motion.path
        d="M11 21L17.5 28L29 13"
        stroke="#F5CC05"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.3, delay: checkDelay, ease: [0.34, 1.56, 0.64, 1] }}
      />
    </motion.svg>
  );
}
