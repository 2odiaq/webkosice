"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import * as React from "react";

type Props = {
  /** Accepts numbers or strings with embedded numbers, e.g. "€99 – €199" or "1 200". */
  value: string | number;
  className?: string;
  duration?: number;
  /** Number to start from. */
  from?: number;
};

function formatInt(n: number, separator: string) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export function CountUp({
  value,
  className,
  duration = 1.2,
  from = 0,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const stringValue = typeof value === "number" ? String(value) : value;
  const [rendered, setRendered] = React.useState<string>(stringValue);

  React.useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion) {
      setRendered(stringValue);
      return;
    }

    const regex = /(\d[\d,. ]*)/g;
    const matches: { value: number; separator: string; raw: string; index: number }[] = [];
    let match: RegExpExecArray | null;
    while ((match = regex.exec(stringValue)) !== null) {
      const raw = match[1];
      const cleaned = raw.replace(/[,\s]/g, "");
      const num = parseFloat(cleaned);
      if (Number.isNaN(num)) continue;
      const hasComma = raw.includes(",");
      const hasSpace = /\s/.test(raw);
      const separator = hasComma ? "," : hasSpace ? " " : "";
      matches.push({ value: num, separator, raw, index: match.index });
    }

    if (matches.length === 0) {
      setRendered(stringValue);
      return;
    }

    const current = matches.map(() => from);

    const render = () => {
      let out = stringValue;
      let offset = 0;
      matches.forEach((mm, mi) => {
        const formatted = formatInt(current[mi]!, mm.separator);
        const start = mm.index + offset;
        out = out.slice(0, start) + formatted + out.slice(start + mm.raw.length);
        offset += formatted.length - mm.raw.length;
      });
      setRendered(out);
    };

    const controls = matches.map((m, i) =>
      animate(from, m.value, {
        duration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate(latest) {
          current[i] = latest;
          render();
        },
      }),
    );

    return () => {
      controls.forEach((c) => c.stop());
    };
  }, [inView, stringValue, duration, from, prefersReducedMotion]);

  // Initialize with zeroed-out formatted version until in view
  React.useEffect(() => {
    if (prefersReducedMotion) return;
    const regex = /(\d[\d,. ]*)/g;
    let out = stringValue;
    let offset = 0;
    let m: RegExpExecArray | null;
    const _temp = stringValue;
    while ((m = regex.exec(_temp)) !== null) {
      const raw = m[1];
      const hasComma = raw.includes(",");
      const hasSpace = /\s/.test(raw);
      const separator = hasComma ? "," : hasSpace ? " " : "";
      const formatted = formatInt(from, separator);
      const start = m.index + offset;
      out = out.slice(0, start) + formatted + out.slice(start + raw.length);
      offset += formatted.length - raw.length;
    }
    setRendered(out);
  }, [stringValue, from, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {rendered}
    </span>
  );
}
