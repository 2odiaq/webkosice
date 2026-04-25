"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/motion/Reveal";
import { TiltCard } from "@/components/ui/motion/TiltCard";
import { Spotlight } from "@/components/ui/motion/Spotlight";
import { Shine } from "@/components/ui/motion/Shine";
import { CountUp } from "@/components/ui/motion/CountUp";
import { AnimatedBorder } from "@/components/ui/motion/AnimatedBorder";
import { plans } from "@/content/pricing";
import { cn } from "@/lib/cn";

export function Pricing() {
  const t = useTranslations("pricing");
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="relative py-20 sm:py-28" id="pricing">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[360px] bg-radial-fade"
      />
      <div className="container-page relative">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />
        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const features = t.raw(`plans.${plan.key}.features`) as string[];
            const isPopular = Boolean(plan.popular);
            const card = (
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-6 transition-all sm:p-8",
                  isPopular
                    ? "border-accent/60 bg-bg-soft shadow-glow md:-translate-y-2 md:scale-[1.02]"
                    : "border-border bg-bg-soft/60 hover:border-border-strong",
                )}
              >
                {isPopular ? (
                  <>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/20 via-transparent to-transparent"
                    />
                    <motion.div
                      className="absolute -top-3 left-1/2 z-10 -translate-x-1/2"
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : { y: [0, -3, 0] }
                      }
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent bg-bg px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-accent shadow-glow-soft">
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 animate-glow-pulse-strong rounded-full bg-accent"
                        />
                        {t("popularBadge")}
                      </span>
                    </motion.div>
                  </>
                ) : null}

                <div className="relative flex items-start justify-between">
                  <motion.div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-lg border",
                      isPopular
                        ? "border-accent/50 bg-accent/15 text-accent"
                        : "border-border bg-bg-elev text-ink-muted",
                    )}
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : { rotate: [0, -8, 8, 0], scale: 1.1 }
                    }
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </motion.div>
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-dim">
                    0{i + 1}
                  </span>
                </div>

                <div className="relative mt-6">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-semibold text-ink">
                      {t(`plans.${plan.key}.name`)}
                    </h3>
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-dim">
                      {t(`plans.${plan.key}.subtitle`)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-ink-muted">
                    {t(`plans.${plan.key}.tagline`)}
                  </p>
                </div>

                <div className="relative mt-6 space-y-4 border-y border-border py-5">
                  <PriceRow
                    label={t("setupLabel")}
                    value={
                      <CountUp
                        value={t(`plans.${plan.key}.setup`)}
                        duration={1.4}
                      />
                    }
                    emphasis
                    isPopular={isPopular}
                  />
                  <PriceRow
                    label={t("monthlyLabel")}
                    value={
                      <>
                        <CountUp
                          value={t(`plans.${plan.key}.monthly`)}
                          duration={1.2}
                        />
                        <span className="ml-1 text-xs text-ink-dim">
                          {t("monthSuffix")}
                        </span>
                      </>
                    }
                    isPopular={isPopular}
                  />
                </div>

                <div className="relative mt-5">
                  <div className="font-mono text-xs uppercase tracking-[0.14em] text-ink-dim">
                    {t("includesLabel")}
                  </div>
                  <motion.ul
                    className="mt-3 space-y-2.5 text-sm"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                      hidden: {},
                      show: {
                        transition: {
                          staggerChildren: 0.06,
                          delayChildren: 0.15,
                        },
                      },
                    }}
                  >
                    {features.map((f) => (
                      <motion.li
                        key={f}
                        variants={{
                          hidden: { opacity: 0, x: -8 },
                          show: { opacity: 1, x: 0 },
                        }}
                        transition={{
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-start gap-2.5 text-ink-muted"
                      >
                        <Check
                          className={cn(
                            "mt-0.5 h-4 w-4 shrink-0",
                            isPopular ? "text-accent" : "text-accent2",
                          )}
                          aria-hidden
                        />
                        <span>{f}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                <div className="relative mt-8 flex-1" />

                <div className="relative mt-6">
                  <Link
                    href="/contact"
                    className={cn(
                      "relative inline-flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-lg px-4 text-sm font-medium transition-colors",
                      isPopular
                        ? "bg-accent text-bg shadow-glow hover:bg-accent-soft"
                        : "border border-border-strong text-ink hover:border-accent hover:text-accent",
                    )}
                  >
                    {isPopular ? (
                      <Shine
                        color="rgba(255,255,255,0.5)"
                        duration={1.3}
                        interval={4.5}
                      />
                    ) : null}
                    <span className="relative z-10 inline-flex items-center gap-2">
                      {t("cta")}
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </article>
            );
            return (
              <Reveal
                key={plan.key}
                delay={i * 0.08}
                className="h-full"
                variant="fadeUp"
              >
                {isPopular ? (
                  <AnimatedBorder className="h-full" radius={16} duration={8}>
                    <Spotlight
                      color="rgba(34,211,238,0.2)"
                      size={360}
                      className="h-full rounded-2xl"
                    >
                      {card}
                    </Spotlight>
                  </AnimatedBorder>
                ) : (
                  <TiltCard max={4} scale={1.015} className="h-full">
                    <Spotlight
                      color="rgba(52,211,153,0.18)"
                      size={340}
                      className="h-full rounded-2xl"
                    >
                      {card}
                    </Spotlight>
                  </TiltCard>
                )}
              </Reveal>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-ink-dim">{t("note")}</p>
      </div>
    </section>
  );
}

function PriceRow({
  label,
  value,
  emphasis = false,
  isPopular = false,
}: {
  label: string;
  value: React.ReactNode;
  emphasis?: boolean;
  isPopular?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim">
        {label}
      </span>
      <span
        className={cn(
          "font-mono text-right",
          emphasis ? "text-lg font-semibold text-ink" : "text-sm text-ink",
          isPopular && emphasis && "text-accent",
        )}
      >
        {value}
      </span>
    </div>
  );
}
