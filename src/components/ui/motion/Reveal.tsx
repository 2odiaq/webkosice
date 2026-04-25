"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import * as React from "react";

export type RevealVariant =
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "scale"
  | "blur"
  | "rotate";

type Tag = "div" | "section" | "article" | "li" | "span" | "ul" | "ol" | "aside" | "header" | "footer" | "main" | "p";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: Tag;
  variant?: RevealVariant;
  amount?: number;
  once?: boolean;
  duration?: number;
  distance?: number;
  stagger?: boolean;
  staggerAmount?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

function makeVariants(
  variant: RevealVariant,
  distance: number,
): Variants {
  switch (variant) {
    case "fadeDown":
      return {
        hidden: { opacity: 0, y: -distance },
        show: { opacity: 1, y: 0 },
      };
    case "fadeLeft":
      return {
        hidden: { opacity: 0, x: -distance * 1.5 },
        show: { opacity: 1, x: 0 },
      };
    case "fadeRight":
      return {
        hidden: { opacity: 0, x: distance * 1.5 },
        show: { opacity: 1, x: 0 },
      };
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.92 },
        show: { opacity: 1, scale: 1 },
      };
    case "blur":
      return {
        hidden: { opacity: 0, y: distance, filter: "blur(8px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      };
    case "rotate":
      return {
        hidden: { opacity: 0, rotate: -4, y: distance },
        show: { opacity: 1, rotate: 0, y: 0 },
      };
    case "fadeUp":
    default:
      return {
        hidden: { opacity: 0, y: distance },
        show: { opacity: 1, y: 0 },
      };
  }
}

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  variant = "fadeUp",
  amount = 0.2,
  once = true,
  duration = 0.55,
  distance = 14,
  stagger = false,
  staggerAmount = 0.08,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as] as React.ElementType;

  if (prefersReducedMotion) {
    const Tag = as as React.ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  if (stagger) {
    const container: Variants = {
      hidden: {},
      show: {
        transition: {
          staggerChildren: staggerAmount,
          delayChildren: delay,
        },
      },
    };

    return (
      <MotionTag
        className={className}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once, amount }}
      >
        {children}
      </MotionTag>
    );
  }

  const variants = makeVariants(variant, distance);

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

type RevealItemProps = {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  variant?: RevealVariant;
  distance?: number;
  duration?: number;
};

export function RevealItem({
  children,
  className,
  as = "div",
  variant = "fadeUp",
  distance = 12,
  duration = 0.5,
}: RevealItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as] as React.ElementType;

  if (prefersReducedMotion) {
    const Tag = as as React.ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants = makeVariants(variant, distance);

  return (
    <MotionTag
      className={className}
      variants={variants}
      transition={{ duration, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
