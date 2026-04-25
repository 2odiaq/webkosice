"use client";

import { motion, useReducedMotion, useSpring } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Max displacement in pixels. */
  strength?: number;
  /** Radius around the element where the effect kicks in. */
  range?: number;
  as?: "div" | "span" | "li";
};

function useIsTouch() {
  const [touch, setTouch] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setTouch(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return touch;
}

export function Magnetic({
  children,
  className,
  strength = 12,
  range = 90,
  as = "div",
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();
  const MotionTag = motion[as] as React.ElementType;

  const ref = React.useRef<HTMLElement | null>(null);
  const x = useSpring(0, { stiffness: 220, damping: 20, mass: 0.3 });
  const y = useSpring(0, { stiffness: 220, damping: 20, mass: 0.3 });

  const skip = prefersReducedMotion || isTouch;

  React.useEffect(() => {
    if (skip) return;
    const el = ref.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > rect.width / 2 + range) {
        x.set(0);
        y.set(0);
        return;
      }
      const ratio = Math.min(1, dist / (rect.width / 2 + range));
      x.set(dx * 0.3 * (1 - ratio * 0.3) * (strength / 12));
      y.set(dy * 0.3 * (1 - ratio * 0.3) * (strength / 12));
    }

    function onLeave() {
      x.set(0);
      y.set(0);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [skip, strength, range, x, y]);

  if (skip) {
    return <div className={className}>{children}</div>;
  }

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLElement>}
      className={cn("inline-block", className)}
      style={{ x, y, willChange: "transform" }}
    >
      {children}
    </MotionTag>
  );
}
