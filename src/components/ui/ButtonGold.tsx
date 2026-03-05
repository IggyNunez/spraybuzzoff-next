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
  "group flex items-center gap-2 font-body text-[0.78rem] font-extrabold tracking-[0.08em] uppercase text-white bg-red-500 hover:bg-red-600 px-9 py-[18px] rounded-full transition-colors duration-200 cursor-pointer";

const BORDER = { border: "2px solid #016d30" };

const HOVER = { y: -3, boxShadow: "0 8px 32px rgba(241,46,4,0.35)" };
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
        style={BORDER}
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
      style={BORDER}
      whileHover={HOVER}
      transition={TRANSITION}
    >
      {children}
      {showArrow && <ArrowIcon className="group-hover:translate-x-1" />}
    </motion.button>
  );
}
