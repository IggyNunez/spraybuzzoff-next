"use client";

import { MotionConfig } from "framer-motion";

/**
 * Every framer-motion animation on the site honors the visitor's
 * "reduce motion" setting: movement is skipped, opacity fades still run.
 * Wraps the whole app so new animations get this for free.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
