"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import * as React from "react";

type Props = {
  /** Diameter of the glow in pixels. */
  size?: number;
  /** Inner color. */
  color?: string;
  /** Restrict to cursor hovering within a specific parent selector (if absent, uses the mounting position in its parent). */
  className?: string;
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

export function CursorGlow({
  size = 520,
  color = "rgba(34,211,238,0.25)",
  className,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();
  const ref = React.useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.4 });
  const [visible, setVisible] = React.useState(false);

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${sx}px ${sy}px, ${color}, transparent 60%)`;

  React.useEffect(() => {
    if (prefersReducedMotion || isTouch) return;
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    function onMove(e: MouseEvent) {
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const inside =
        mx >= 0 && my >= 0 && mx <= rect.width && my <= rect.height;
      if (!inside) {
        setVisible(false);
        return;
      }
      setVisible(true);
      x.set(mx);
      y.set(my);
    }

    function onLeave() {
      setVisible(false);
    }

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [prefersReducedMotion, isTouch, x, y]);

  if (prefersReducedMotion || isTouch) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${className ?? ""} ${visible ? "opacity-100" : "opacity-0"}`}
      style={{ background }}
    />
  );
}
