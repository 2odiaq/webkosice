"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Tailwind class/color for the spotlight gradient center. */
  color?: string;
  /** Pixel radius. */
  size?: number;
  /** Blend mode on the overlay. */
  blend?: "soft-light" | "screen" | "overlay" | "plus-lighter";
  /** Element type. */
  as?: "div" | "article" | "li" | "section";
};

export function Spotlight({
  children,
  className,
  color = "rgba(34,211,238,0.22)",
  size = 360,
  blend = "soft-light",
  as = "div",
}: Props) {
  const Tag = as as React.ElementType;
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={onMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300",
          visible && "opacity-100",
        )}
        style={{
          mixBlendMode: blend,
          background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 50%), ${color}, transparent 60%)`,
        }}
      />
    </Tag>
  );
}
