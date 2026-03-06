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
  "group inline-flex items-center justify-center gap-2 font-body text-[13px] font-bold tracking-[0.12em] uppercase text-[#1A5C32] rounded-full cursor-pointer border-2 border-[#1A5C32] bg-transparent hover:bg-[#1A5C32] hover:text-white px-10 py-4 transition-colors duration-200";

const HOVER = { y: -2 };
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
      whileHover={HOVER}
      transition={TRANSITION}
    >
      {children}
      {showArrow && <ArrowIcon className="group-hover:translate-x-1" />}
    </motion.button>
  );
}
