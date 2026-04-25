import * as React from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "accent" | "warn";
};

export function Badge({ children, className, tone = "default" }: Props) {
  const tones = {
    default: "border-border bg-bg-elev text-ink-muted",
    accent: "border-accent/30 bg-accent/10 text-accent",
    warn: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
