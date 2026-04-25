import * as React from "react";
import { cn } from "@/lib/cn";
import { TextReveal } from "@/components/ui/motion/TextReveal";
import { Reveal } from "@/components/ui/motion/Reveal";

type Props = {
  kicker?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  /** When the title is a string with optional <accent>...</accent> pseudo-tags, enable word-by-word reveal. */
  animatedTitle?: boolean;
};

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "left",
  className,
  animatedTitle = true,
}: Props) {
  const useTextReveal = animatedTitle && typeof title === "string";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {kicker ? (
        <Reveal>
          <span className="kicker">{kicker}</span>
        </Reveal>
      ) : null}
      <h2 className="heading-lg mt-4">
        {useTextReveal ? (
          <TextReveal as="span" text={title as string} stagger={0.05} />
        ) : (
          title
        )}
      </h2>
      {subtitle ? (
        <Reveal delay={0.15}>
          <p className="text-lead mt-4">{subtitle}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
