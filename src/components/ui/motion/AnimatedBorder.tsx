"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Rounded radius in pixels (used both for the outer glow and inner mask). */
  radius?: number;
  /** Border thickness in pixels. */
  thickness?: number;
  /** Optional duration override for the spin. */
  duration?: number;
};

/**
 * AnimatedBorder wraps children in a rotating conic-gradient "border".
 * Uses a radial+conic gradient pair and a mask trick to show only the border.
 */
export function AnimatedBorder({
  children,
  className,
  radius = 20,
  thickness = 1.5,
  duration = 6,
}: Props) {
  return (
    <div
      className={cn("relative", className)}
      style={{
        borderRadius: radius,
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px animate-border-spin"
        style={{
          borderRadius: radius,
          background:
            "conic-gradient(from 0deg, rgba(34,211,238,0.0) 0%, rgba(34,211,238,0.9) 12%, rgba(52,211,153,0.65) 28%, rgba(34,211,238,0.0) 45%, rgba(34,211,238,0.0) 100%)",
          WebkitMask: `linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)`,
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: thickness,
          animationDuration: `${duration}s`,
        }}
      />
      <div className="relative" style={{ borderRadius: radius }}>
        {children}
      </div>
    </div>
  );
}
