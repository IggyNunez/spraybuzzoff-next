"use client";

import { motion } from "framer-motion";
import { driftVariants } from "@/lib/animation-variants";

interface PestFloatProps {
  children: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
  driftVariant?: 1 | 2 | 3;
  opacity?: number;
}

export function PestFloat({
  children,
  size = 32,
  style,
  driftVariant = 1,
  opacity = 0.07,
}: PestFloatProps) {
  const drift = driftVariants[driftVariant];

  return (
    <motion.div
      className="absolute pointer-events-none z-0"
      style={{ width: size, height: size, opacity, ...style }}
      animate={{
        x: drift.x,
        y: drift.y,
        rotate: drift.rotate,
      }}
      transition={drift.transition}
    >
      {children}
    </motion.div>
  );
}
