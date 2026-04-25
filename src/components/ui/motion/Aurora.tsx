"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "hero" | "soft" | "cta";

type Props = {
  variant?: Variant;
  className?: string;
};

const PALETTES: Record<Variant, Array<{ color: string; size: number; x: number; y: number; duration: number }>> = {
  hero: [
    { color: "rgba(34,211,238,0.45)", size: 520, x: -10, y: 0, duration: 18 },
    { color: "rgba(52,211,153,0.35)", size: 480, x: 70, y: 20, duration: 22 },
    { color: "rgba(99,102,241,0.35)", size: 560, x: 40, y: 80, duration: 26 },
  ],
  soft: [
    { color: "rgba(34,211,238,0.25)", size: 420, x: 5, y: 10, duration: 22 },
    { color: "rgba(52,211,153,0.22)", size: 400, x: 75, y: 60, duration: 28 },
  ],
  cta: [
    { color: "rgba(34,211,238,0.35)", size: 480, x: 15, y: 20, duration: 24 },
    { color: "rgba(168,85,247,0.3)", size: 520, x: 70, y: 70, duration: 28 },
  ],
};

export function Aurora({ variant = "hero", className }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const orbs = PALETTES[variant];

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      style={{
        maskImage:
          "radial-gradient(ellipse 80% 70% at 50% 45%, black 40%, transparent 85%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 70% at 50% 45%, black 40%, transparent 85%)",
      }}
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 65%)`,
            filter: "blur(60px)",
            willChange: "transform",
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, 40, -30, 15, 0],
                  y: [0, -25, 30, -10, 0],
                  scale: [1, 1.1, 0.95, 1.05, 1],
                }
          }
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  );
}
