"use client";

import { useTranslations } from "next-intl";
import * as React from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  MessagesSquare,
  FileText,
  Palette,
  Code2,
  Rocket,
  TrendingUp,
  MapPin,
  Flag,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/motion/Reveal";
import { cn } from "@/lib/cn";

const STEPS = [
  { key: "discovery", icon: MessagesSquare },
  { key: "proposal", icon: FileText },
  { key: "design", icon: Palette },
  { key: "develop", icon: Code2 },
  { key: "launch", icon: Rocket },
  { key: "support", icon: TrendingUp },
] as const;

export function Process() {
  const t = useTranslations("home.process");
  const prefersReducedMotion = useReducedMotion();

  const roadRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: roadRef,
    offset: ["start 75%", "end 25%"],
  });
  const fillHeight = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    mass: 0.6,
  });
  const fillPct = useTransform(fillHeight, (v) => `${v * 100}%`);

  return (
    <section className="relative py-20 sm:py-28">
      {/* Soft map-like radial wash behind the route */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 65% at 50% 50%, rgba(34,211,238,0.07), transparent 70%)",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.04, 1], opacity: [0.8, 1, 0.8] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-page relative">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />

        <div ref={roadRef} className="relative mx-auto mt-16 max-w-4xl">
          {/* Dashed road — base */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-y-0 left-6 w-px md:left-1/2 md:-translate-x-1/2",
              !prefersReducedMotion && "dashed-road",
            )}
            style={
              prefersReducedMotion
                ? {
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, rgba(34,211,238,0.55) 0 8px, transparent 8px 16px)",
                  }
                : undefined
            }
          />
          {/* Scroll-linked fill */}
          {!prefersReducedMotion ? (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-6 top-0 w-[2px] origin-top rounded-full md:left-1/2 md:-translate-x-1/2"
              style={{
                height: fillPct,
                background:
                  "linear-gradient(to bottom, rgba(34,211,238,0.9), rgba(52,211,153,0.9))",
                boxShadow: "0 0 12px rgba(34,211,238,0.5)",
              }}
            />
          ) : null}

          {/* START marker */}
          <RouteEndpoint
            icon={MapPin}
            label={t("startLabel")}
            variant="start"
          />

          {/* Stations */}
          <ol className="relative mt-10 space-y-10 md:mt-14 md:space-y-6">
            {STEPS.map((step, i) => {
              const onRight = i % 2 === 0;
              const rawTitle = t(`steps.${step.key}.title`);
              const title = rawTitle.replace(/^\d+\.\s*/, "");
              return (
                <Station
                  key={step.key}
                  index={i}
                  total={STEPS.length}
                  icon={step.icon}
                  title={title}
                  description={t(`steps.${step.key}.description`)}
                  onRight={onRight}
                />
              );
            })}
          </ol>

          {/* FINISH marker */}
          <RouteEndpoint
            icon={Flag}
            label={t("endLabel")}
            variant="end"
            className="mt-10 md:mt-14"
          />
        </div>
      </div>
    </section>
  );
}

function Station({
  index,
  total,
  icon: Icon,
  title,
  description,
  onRight,
}: {
  index: number;
  total: number;
  icon: LucideIcon;
  title: string;
  description: string;
  onRight: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = React.useRef<HTMLLIElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <li ref={ref}>
      <div
        className={cn(
          "grid grid-cols-[3rem_1fr] items-center gap-x-4",
          "md:grid-cols-[1fr_3rem_1fr] md:gap-x-8",
        )}
      >
        {/* Station pin */}
        <div className="col-start-1 row-start-1 flex justify-center md:col-start-2">
          <div className="relative">
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-accent/25 blur-md"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : undefined}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
                delay: 0.05,
              }}
            />
            {!prefersReducedMotion ? (
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full border border-accent/40"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={
                  inView
                    ? {
                        scale: [1, 1.5, 1.5],
                        opacity: [0.6, 0, 0],
                      }
                    : undefined
                }
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.2 + index * 0.1,
                }}
              />
            ) : null}
            <motion.span
              className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent/50 bg-bg-elev shadow-glow-soft"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : undefined}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.12,
              }}
            >
              <motion.span
                initial={{ opacity: 0, rotate: -30 }}
                animate={inView ? { opacity: 1, rotate: 0 } : undefined}
                transition={{ duration: 0.4, delay: 0.22 }}
                className="inline-flex"
              >
                <Icon className="h-5 w-5 text-accent" aria-hidden />
              </motion.span>
            </motion.span>
          </div>
        </div>

        {/* Card */}
        <Reveal
          as="div"
          className={cn(
            "col-start-2 row-start-1",
            onRight ? "md:col-start-3" : "md:col-start-1",
          )}
          variant={onRight ? "fadeLeft" : "fadeRight"}
          delay={index * 0.04}
        >
          <div
            className={cn(
              "relative rounded-xl border border-border bg-bg-soft/60 p-5 backdrop-blur-sm transition-colors hover:border-accent/40 sm:p-6",
              !onRight && "md:text-right",
            )}
          >
            {/* Branch line from pin into the card (desktop) */}
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-r from-accent/60 to-transparent md:block",
                onRight ? "-left-8" : "-right-8 rotate-180",
              )}
            />

            <div
              className={cn(
                "flex items-center gap-3 text-ink-dim",
                !onRight && "md:flex-row-reverse",
              )}
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-accent/30 bg-accent/5 font-mono text-[11px] font-medium text-accent">
                {stepNumber}
              </span>
              <span className="h-px w-8 bg-border-strong" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                stop {index + 1} / {total}
              </span>
            </div>

            <h3 className="mt-3 text-lg font-semibold text-ink sm:text-xl">
              {title}
            </h3>
            <p className="mt-2 text-sm text-ink-muted">{description}</p>
          </div>
        </Reveal>
      </div>
    </li>
  );
}

function RouteEndpoint({
  icon: Icon,
  label,
  variant,
  className,
}: {
  icon: LucideIcon;
  label: string;
  variant: "start" | "end";
  className?: string;
}) {
  const isStart = variant === "start";
  const prefersReducedMotion = useReducedMotion();
  return (
    <div
      className={cn(
        "relative grid grid-cols-[3rem_1fr] items-center gap-x-4 md:grid-cols-[1fr_3rem_1fr] md:gap-x-8",
        className,
      )}
    >
      {/* Pin */}
      <div className="col-start-1 row-start-1 flex justify-center md:col-start-2">
        <motion.span
          className={cn(
            "relative inline-flex h-10 w-10 items-center justify-center rounded-full border-2 bg-bg-elev",
            isStart
              ? "border-accent text-accent shadow-glow-soft"
              : "border-accent2 text-accent2",
          )}
          style={
            isStart
              ? undefined
              : {
                  boxShadow:
                    "0 0 0 1px rgba(52,211,153,0.25), 0 0 24px -4px rgba(52,211,153,0.45)",
                }
          }
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, -3, 0, 3, 0] }
          }
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {!isStart && !prefersReducedMotion ? (
            <motion.span
              className="inline-flex"
              animate={{ rotate: [-6, 8, -6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon className="h-4 w-4" aria-hidden />
            </motion.span>
          ) : (
            <Icon className="h-4 w-4" aria-hidden />
          )}
        </motion.span>
      </div>

      {/* Label */}
      <div
        className={cn(
          "col-start-2 row-start-1",
          isStart ? "md:col-start-3" : "md:col-start-1 md:text-right",
        )}
      >
        <span
          className={cn(
            "font-mono text-xs uppercase tracking-[0.22em]",
            isStart ? "text-accent" : "text-accent2",
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
