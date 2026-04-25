"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  max?: number;
  /** Scale on hover. */
  scale?: number;
  /** Disable tilt (returns a plain div). */
  disabled?: boolean;
  /** Apply a subtle glare overlay driven by pointer. */
  glare?: boolean;
  /** Render as a given element type. */
  as?: "div" | "article" | "li" | "section";
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

export function TiltCard({
  children,
  className,
  max = 7,
  scale = 1.015,
  disabled = false,
  glare = true,
  as = "div",
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();

  const ref = React.useRef<HTMLElement | null>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rX = useSpring(0, { stiffness: 200, damping: 22, mass: 0.4 });
  const rY = useSpring(0, { stiffness: 200, damping: 22, mass: 0.4 });
  const scaleSpring = useSpring(1, { stiffness: 200, damping: 22 });
  const glareBackground = useMotionTemplate`radial-gradient(340px circle at calc(${px} * 100%) calc(${py} * 100%), rgba(255,255,255,0.13), transparent 60%)`;

  const skip = disabled || prefersReducedMotion || isTouch;

  const MotionTag = motion[as] as React.ElementType;

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (skip) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    px.set(x);
    py.set(y);
    rY.set((x - 0.5) * max * 2);
    rX.set(-(y - 0.5) * max * 2);
  }

  function onLeave() {
    if (skip) return;
    rX.set(0);
    rY.set(0);
    scaleSpring.set(1);
  }

  function onEnter() {
    if (skip) return;
    scaleSpring.set(scale);
  }

  if (skip) {
    return <div className={className}>{children}</div>;
  }

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLElement>}
      className={cn("relative group/tilt [transform-style:preserve-3d]", className)}
      style={{
        rotateX: rX,
        rotateY: rY,
        scale: scaleSpring,
        transformPerspective: 1000,
        willChange: "transform",
      }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {children}
      {glare ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{ background: glareBackground }}
        />
      ) : null}
    </MotionTag>
  );
}
