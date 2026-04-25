"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/cn";

type Segment =
  | { kind: "text"; text: string }
  | { kind: "accent"; text: string };

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

type Props = {
  /** Plain string version; can include <accent>...</accent> pseudo-tags. */
  text?: string;
  /** Alternative: pass parts as React — plain strings become word-staggered, ReactElements are rendered as-is (still word-split internally if they are spans with string children). */
  children?: React.ReactNode;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  distance?: number;
  /** Wrap each word in a span with this className (useful for preserving existing heading styles). */
  wordClassName?: string;
  /** Trigger once when entering the viewport. */
  once?: boolean;
  /** Viewport amount visibility threshold. */
  amount?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

function parseTextWithAccent(input: string): Segment[] {
  const regex = /<accent>(.*?)<\/accent>/g;
  const segments: Segment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ kind: "text", text: input.slice(lastIndex, match.index) });
    }
    segments.push({ kind: "accent", text: match[1] });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < input.length) {
    segments.push({ kind: "text", text: input.slice(lastIndex) });
  }
  return segments;
}

function splitWordsPreservingSpaces(str: string): string[] {
  return str.split(/(\s+)/);
}

export function TextReveal({
  text,
  children,
  as = "span",
  className,
  delay = 0,
  stagger = 0.05,
  duration = 0.65,
  distance = 18,
  wordClassName,
  once = true,
  amount = 0.3,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const Tag = as as React.ElementType;
  const MotionSpan = motion.span;

  const segments: Segment[] = React.useMemo(() => {
    if (typeof text === "string") return parseTextWithAccent(text);
    if (typeof children === "string") return parseTextWithAccent(children);
    return [];
  }, [text, children]);

  if (prefersReducedMotion) {
    return (
      <Tag className={className}>
        {segments.map((seg, i) =>
          seg.kind === "accent" ? (
            <span key={i} className="text-accent">
              {seg.text}
            </span>
          ) : (
            <React.Fragment key={i}>{seg.text}</React.Fragment>
          ),
        )}
      </Tag>
    );
  }

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: distance, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, ease: EASE },
    },
  };

  // Flatten all segments into an array of {content, accent} word tokens
  type WordToken =
    | { kind: "word"; text: string; accent: boolean }
    | { kind: "space"; text: string };

  const tokens: WordToken[] = [];
  for (const seg of segments) {
    const parts = splitWordsPreservingSpaces(seg.text);
    for (const p of parts) {
      if (p.length === 0) continue;
      if (/^\s+$/.test(p)) {
        tokens.push({ kind: "space", text: p });
      } else {
        tokens.push({ kind: "word", text: p, accent: seg.kind === "accent" });
      }
    }
  }

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {segments.length === 0 && children ? (
        <>{children}</>
      ) : (
        tokens.map((tok, i) => {
          if (tok.kind === "space") {
            return <React.Fragment key={i}>{tok.text}</React.Fragment>;
          }
          return (
            <span
              key={i}
              className={cn(
                "inline-block whitespace-pre",
                wordClassName,
              )}
              style={{ willChange: "transform, opacity, filter" }}
            >
              <MotionSpan
                variants={wordVariants}
                className={cn(
                  "inline-block",
                  tok.accent && "text-accent",
                )}
              >
                {tok.text}
              </MotionSpan>
            </span>
          );
        })
      )}
    </motion.span>
  );
}
