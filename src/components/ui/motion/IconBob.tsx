"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  delay?: number;
  /** Pixels of travel. */
  amplitude?: number;
  /** Seconds for a full cycle. */
  duration?: number;
  className?: string;
};

export function IconBob({
  children,
  delay = 0,
  amplitude = 4,
  duration = 4,
  className,
}: Props) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={cn("inline-flex", className)}>{children}</span>;
  }

  return (
    <motion.span
      className={cn("inline-flex will-change-transform", className)}
      animate={{ y: [0, -amplitude, 0, amplitude, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.span>
  );
}
