"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";
import { Link } from "@/i18n/routing";
import { TextReveal } from "@/components/ui/motion/TextReveal";
import { CharReveal } from "@/components/ui/motion/CharReveal";
import { Magnetic } from "@/components/ui/motion/Magnetic";
import { Shine } from "@/components/ui/motion/Shine";
import { TiltCard } from "@/components/ui/motion/TiltCard";
import { Typewriter } from "@/components/ui/motion/Typewriter";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const t = useTranslations("home.hero");
  const lines = t.raw("code.lines") as string[];
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="container-page relative z-10 flex w-full flex-col gap-16 py-16 sm:py-20 lg:grid lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14 lg:py-24 xl:gap-16 xl:py-28">
      <div className="max-w-3xl">
        <CharReveal text={t("kicker")} className="kicker text-sm" />
        <h1
          className="mt-6 text-5xl font-semibold tracking-tight text-ink sm:text-6xl md:text-7xl xl:text-[5.5rem] xl:leading-[1.02]"
          style={{ letterSpacing: "-0.025em" }}
        >
          <TextReveal
            as="span"
            text={t.raw("title") as string}
            stagger={0.06}
            duration={0.75}
            distance={24}
            delay={0.1}
          />
        </h1>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.1, delayChildren: 0.7 },
            },
          }}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-8 max-w-2xl text-lg text-ink-muted sm:text-xl md:text-2xl md:leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <Magnetic strength={14}>
              <Link
                href="/contact"
                className="group/cta relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-lg bg-accent px-7 text-base font-medium text-bg shadow-glow transition-all hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:text-lg"
              >
                <Shine color="rgba(255,255,255,0.5)" interval={4.5} duration={1.3} />
                <span className="relative z-10 inline-flex items-center gap-2">
                  {t("ctaPrimary")}
                  <motion.span
                    className="inline-flex"
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : { x: 2, y: -2, rotate: 10 }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 14,
                    }}
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </motion.span>
                </span>
              </Link>
            </Magnetic>
            <Magnetic strength={10}>
              <Link
                href="/portfolio"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-lg border border-border-strong bg-bg-soft/30 px-7 text-base font-medium text-ink backdrop-blur-sm transition-all hover:border-accent hover:text-accent hover:shadow-glow-soft sm:text-lg"
              >
                {t("ctaSecondary")}
              </Link>
            </Magnetic>
          </motion.div>

          <motion.ul
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
            className="mt-12 grid gap-3 text-base text-ink-muted sm:grid-cols-3 sm:text-[15px]"
          >
            {(["one", "two", "three"] as const).map((key) => (
              <motion.li
                key={key}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex items-center gap-2"
              >
                <motion.span
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 1.2,
                    type: "spring",
                    stiffness: 260,
                    damping: 18,
                  }}
                  className="inline-flex"
                >
                  <CheckCircle2
                    className="h-5 w-5 shrink-0 text-accent"
                    aria-hidden
                  />
                </motion.span>
                {t(`bullets.${key}`)}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.9,
          ease: EASE,
          delay: 0.35,
        }}
        className={prefersReducedMotion ? undefined : "animate-float-slow"}
      >
        <CodeBlock title={t("code.title")} lines={lines} />
      </motion.div>
    </div>
  );
}

function CodeBlock({ title, lines }: { title: string; lines: string[] }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <TiltCard max={5} scale={1.01}>
      <div className="relative">
        <motion.div
          aria-hidden
          className="absolute -inset-8 rounded-2xl bg-accent/10 blur-3xl"
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: [0.55, 1, 0.55], scale: [1, 1.05, 1] }
          }
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-soft/80 shadow-glow-soft backdrop-blur">
          <div className="flex items-center gap-2 border-b border-border px-5 py-4">
            {["#ff5f57", "#febc2e", "#28c840"].map((color, i) => (
              <motion.span
                key={color}
                aria-hidden
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: color }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.6 + i * 0.08,
                  type: "spring",
                  stiffness: 320,
                  damping: 18,
                }}
              />
            ))}
            <span className="ml-3 font-mono text-xs text-ink-dim sm:text-[13px]">
              {title}
            </span>
          </div>
          <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed sm:p-7 sm:text-[15px]">
            <code className="block text-ink">
              <Typewriter
                lines={lines}
                speed={22}
                startDelay={650}
                lineDelay={90}
                renderLine={(_fullLine, index, typed) => (
                  <span className="grid grid-cols-[2.75rem_1fr]">
                    <span className="select-none text-ink-dim">
                      {index + 1}
                    </span>
                    <span>{colorize(typed)}</span>
                  </span>
                )}
                caretClassName="bg-accent"
              />
            </code>
          </pre>
          {/* subtle scan-line effect */}
          {!prefersReducedMotion ? (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div
                className="absolute inset-x-0 h-24 animate-scan-line"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(34,211,238,0.06), transparent)",
                  animationDuration: "4.5s",
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </TiltCard>
  );
}

function colorize(line: string): React.ReactNode {
  const tokens: React.ReactNode[] = [];
  const kwRegex = /\b(const|export|default)\b/g;
  const stringRegex = /'([^']*)'/g;

  let rest = line;
  let idx = 0;

  rest = rest.replace(stringRegex, (_m, g1) => `__STR_OPEN__${g1}__STR_CLOSE__`);

  const parts = rest.split(/(\b(?:const|export|default)\b|__STR_OPEN__|__STR_CLOSE__)/g);

  let inString = false;
  let stringBuf = "";

  for (const part of parts) {
    if (part === "__STR_OPEN__") {
      inString = true;
      stringBuf = "";
      continue;
    }
    if (part === "__STR_CLOSE__") {
      inString = false;
      tokens.push(
        <span key={idx++} className="text-accent2">
          &apos;{stringBuf}&apos;
        </span>,
      );
      continue;
    }
    if (inString) {
      stringBuf += part;
      continue;
    }
    if (kwRegex.test(part)) {
      kwRegex.lastIndex = 0;
      tokens.push(
        <span key={idx++} className="text-accent">
          {part}
        </span>,
      );
    } else {
      tokens.push(<span key={idx++}>{part}</span>);
    }
  }
  return tokens;
}
