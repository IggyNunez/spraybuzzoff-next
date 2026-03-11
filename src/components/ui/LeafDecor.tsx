"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export type LeafVariant = "ants" | "mosquito-left" | "mosquito-right" | "branch";

const LEAF_IMAGES: Record<LeafVariant, string> = {
  "ants": "/assets/leaf-ants.png",
  "mosquito-left": "/assets/leaf-mosquito-left.png",
  "mosquito-right": "/assets/leaf-mosquito-right.png",
  "branch": "/assets/leaf-branch.png",
};

/** Variants that need horizontal flip so the branch flows in from the right edge */
const FLIP_VARIANTS: Set<LeafVariant> = new Set(["branch", "mosquito-right"]);

interface LeafDecorProps {
  /** Which leaf image to use, default "ants" */
  variant?: LeafVariant;
  /** Vertical position from top in px or %, default "20%" */
  top?: string;
  /** Width in px, default 180 */
  size?: number;
  /** Opacity, default 0.18 */
  opacity?: number;
  className?: string;
}

export function LeafDecor({
  variant = "ants",
  top = "20%",
  size = 180,
  opacity = 0.18,
  className = "",
}: LeafDecorProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const shouldFlip = FLIP_VARIANTS.has(variant);

  return (
    <motion.div
      ref={ref}
      className={`absolute right-0 pointer-events-none select-none z-[1] ${className}`}
      style={{
        top,
        width: size,
        height: size * 0.6,
        transform: "translateX(25%)",
      }}
      initial={{ opacity: 0, x: 60 }}
      animate={inView ? { opacity, x: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <Image
        src={LEAF_IMAGES[variant]}
        alt=""
        width={size}
        height={Math.round(size * 0.6)}
        className={`w-full h-full object-contain${shouldFlip ? " -scale-x-100" : ""}`}
        aria-hidden="true"
      />
    </motion.div>
  );
}
