"use client";

import { motion } from "framer-motion";
import { ArrowIcon } from "./ArrowIcon";

interface ButtonOutlineProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
}

const BASE =
  "group flex items-center gap-2 font-body text-[0.78rem] font-extrabold tracking-[0.08em] uppercase text-white rounded-full cursor-pointer";

const FROSTED = {
  background: "rgba(255,255,255,0.12)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1.5px solid rgba(255,255,255,0.22)",
  padding: "18px 36px",
};

const HOVER = {
  y: -2,
  background: "rgba(255,255,255,0.2)",
  borderColor: "rgba(255,255,255,0.38)",
};

const TRANSITION = { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

export function ButtonOutline({
  children,
  href,
  onClick,
  className = "",
  showArrow = false,
}: ButtonOutlineProps) {
  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={`${BASE} ${className}`}
        style={FROSTED}
        whileHover={HOVER}
        transition={TRANSITION}
      >
        {children}
        {showArrow && <ArrowIcon className="group-hover:translate-x-1" />}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${BASE} ${className}`}
      style={FROSTED}
      whileHover={HOVER}
      transition={TRANSITION}
    >
      {children}
      {showArrow && <ArrowIcon className="group-hover:translate-x-1" />}
    </motion.button>
  );
}
