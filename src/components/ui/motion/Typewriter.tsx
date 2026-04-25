"use client";

import { useReducedMotion } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/cn";

type Props = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  caretClassName?: string;
  /** ms per character */
  speed?: number;
  /** delay before starting in ms */
  startDelay?: number;
  /** delay between lines in ms */
  lineDelay?: number;
  /** render a custom line (e.g., with syntax highlighting) — receives the typed substring */
  renderLine?: (line: string, index: number, typed: string) => React.ReactNode;
  /** loop back after finishing (defaults to false — types once and persists) */
  loop?: boolean;
  /** start only once the element enters the viewport */
  startOnView?: boolean;
};

export function Typewriter({
  lines,
  className,
  lineClassName,
  caretClassName,
  speed = 22,
  startDelay = 120,
  lineDelay = 80,
  renderLine,
  loop = false,
  startOnView = true,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const [lineIdx, setLineIdx] = React.useState(0);
  const [charIdx, setCharIdx] = React.useState(0);
  const [started, setStarted] = React.useState(!startOnView);
  const [done, setDone] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!startOnView || started) return;
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStarted(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [startOnView, started]);

  React.useEffect(() => {
    if (!started || prefersReducedMotion || done) return;
    if (lineIdx >= lines.length) {
      if (loop) {
        const t = setTimeout(() => {
          setLineIdx(0);
          setCharIdx(0);
        }, 1400);
        return () => clearTimeout(t);
      }
      setDone(true);
      return;
    }

    const current = lines[lineIdx] ?? "";

    if (charIdx === 0 && current.length === 0) {
      const t = setTimeout(() => setLineIdx((i) => i + 1), lineDelay + 40);
      return () => clearTimeout(t);
    }

    if (charIdx < current.length) {
      const delay = lineIdx === 0 && charIdx === 0 ? startDelay : speed;
      const t = setTimeout(() => setCharIdx((i) => i + 1), delay);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, lineDelay);
    return () => clearTimeout(t);
  }, [started, prefersReducedMotion, done, lineIdx, charIdx, lines, speed, startDelay, lineDelay, loop]);

  const isFullyTyped = prefersReducedMotion || done || lineIdx >= lines.length;

  return (
    <div ref={rootRef} className={className} aria-label={lines.join("\n")}>
      {lines.map((line, i) => {
        const showFull = prefersReducedMotion || i < lineIdx || (i === lineIdx && charIdx >= line.length) || done;
        const typed = showFull
          ? line
          : i === lineIdx
            ? line.slice(0, charIdx)
            : "";
        const isCurrent = !isFullyTyped && i === lineIdx;
        const isLast = i === lines.length - 1;
        return (
          <div key={i} className={cn("relative", lineClassName)}>
            {renderLine ? renderLine(line, i, typed) : <span>{typed || "\u00A0"}</span>}
            {(isCurrent || (isFullyTyped && isLast)) ? (
              <span
                aria-hidden
                className={cn(
                  "ml-0.5 inline-block h-[1em] w-[0.55ch] translate-y-[0.14em] animate-caret-blink bg-accent align-middle",
                  caretClassName,
                )}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
