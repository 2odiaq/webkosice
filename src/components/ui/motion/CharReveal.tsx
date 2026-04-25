"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
};

export function CharReveal({
  text,
  className,
  delay = 0,
  stagger = 0.02,
  duration = 0.45,
  once = true,
  amount = 0.4,
}: Props) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const char: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      aria-label={text}
    >
      {Array.from(text).map((c, i) => (
        <motion.span
          key={i}
          variants={char}
          className="inline-block"
          aria-hidden
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </motion.span>
  );
}
