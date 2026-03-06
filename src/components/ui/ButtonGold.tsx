"use client";

import { motion } from "framer-motion";
import { ArrowIcon } from "./ArrowIcon";

interface ButtonGoldProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
  type?: "button" | "submit";
}

const BASE =
  "group inline-flex items-center justify-center gap-2 font-body text-[13px] font-bold tracking-[0.12em] uppercase text-white bg-[#1A5C32] hover:bg-[#0F3D20] px-10 py-4 rounded-full transition-colors duration-200 cursor-pointer";

const HOVER = { y: -3, boxShadow: "0 8px 32px rgba(26,92,50,0.35)" };
const TRANSITION = { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

export function ButtonGold({
  children,
  href,
  onClick,
  className = "",
  showArrow = true,
  type = "button",
}: ButtonGoldProps) {
  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${BASE} ${className}`}
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
      type={type}
      onClick={onClick}
      className={`${BASE} ${className}`}
      whileHover={HOVER}
      transition={TRANSITION}
    >
      {children}
      {showArrow && <ArrowIcon className="group-hover:translate-x-1" />}
    </motion.button>
  );
}
