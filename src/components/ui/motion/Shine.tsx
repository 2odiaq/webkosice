"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** Apply the shine continuously (looped) vs only when parent is hovered. */
  always?: boolean;
  /** CSS color of the highlight. */
  color?: string;
  /** Sweep duration in seconds. */
  duration?: number;
  /** Interval between sweeps (seconds, always mode only). */
  interval?: number;
};

/**
 * Positions itself absolutely inside a relative parent and draws a rolling
 * highlight stripe across the parent. Place inside a `relative overflow-hidden`
 * container whose own border-radius matches the intent.
 */
export function Shine({
  className,
  always = true,
  color = "rgba(255,255,255,0.28)",
  duration = 1.2,
  interval = 5,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;
  if (!always) return null;

  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className,
      )}
    >
      <motion.span
        className="absolute inset-y-0 -left-1/2 block w-1/2 -skew-x-12"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
        }}
        animate={{ x: ["-180%", "260%"] }}
        transition={{
          duration,
          repeat: Infinity,
          repeatDelay: interval,
          ease: "easeInOut",
        }}
      />
    </span>
  );
}
