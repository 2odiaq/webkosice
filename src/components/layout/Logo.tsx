"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg";

type Props = {
  className?: string;
  showWordmark?: boolean;
  size?: Size;
};

const MARK_SIZE: Record<Size, { box: string; img: number }> = {
  sm: { box: "h-11 w-11", img: 44 },
  md: { box: "h-12 w-12 lg:h-14 lg:w-14", img: 56 },
  lg: { box: "h-14 w-14 lg:h-16 lg:w-16", img: 64 },
};

const WORDMARK_SIZE: Record<Size, string> = {
  sm: "text-lg",
  md: "text-lg lg:text-xl",
  lg: "text-xl lg:text-2xl",
};

const WORDMARK_WEB = "web";
const WORDMARK_KOSICE = "kosice";

export function Logo({ className, showWordmark = true, size = "sm" }: Props) {
  const { box, img } = MARK_SIZE[size];
  const prefersReducedMotion = useReducedMotion();

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-3 font-semibold tracking-tight text-ink transition-[font-size] duration-500",
        className,
      )}
      aria-label="WebKosice — home"
    >
      <motion.span
        aria-hidden
        className={cn(
          "relative flex shrink-0 items-center justify-center transition-all duration-500",
          box,
        )}
        whileHover={
          prefersReducedMotion ? undefined : { scale: 1.08, rotate: 6 }
        }
        transition={{ type: "spring", stiffness: 320, damping: 16 }}
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-accent/20 opacity-0 blur-xl"
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: [0.25, 0.55, 0.25] }
          }
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="relative inline-flex h-full w-full"
          animate={
            prefersReducedMotion
              ? undefined
              : { rotate: [0, -2.5, 2.5, 0] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/logo-mark.png"
            alt=""
            width={img}
            height={img}
            priority
            className="h-full w-full object-contain drop-shadow-[0_0_14px_rgba(255,255,255,0.12)]"
          />
        </motion.span>
      </motion.span>
      {showWordmark ? (
        <motion.span
          className={cn(
            "hidden transition-all duration-500 sm:inline",
            WORDMARK_SIZE[size],
          )}
          initial={prefersReducedMotion ? false : "hidden"}
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
          }}
          aria-label="webkosice"
        >
          {Array.from(WORDMARK_WEB).map((c, i) => (
            <motion.span
              key={`w-${i}`}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            >
              {c}
            </motion.span>
          ))}
          {Array.from(WORDMARK_KOSICE).map((c, i) => (
            <motion.span
              key={`k-${i}`}
              className="inline-block text-accent"
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            >
              {c}
            </motion.span>
          ))}
        </motion.span>
      ) : null}
    </Link>
  );
}
