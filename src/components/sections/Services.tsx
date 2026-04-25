"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/motion/Reveal";
import { TiltCard } from "@/components/ui/motion/TiltCard";
import { Spotlight } from "@/components/ui/motion/Spotlight";
import { Magnetic } from "@/components/ui/motion/Magnetic";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

export function Services() {
  const t = useTranslations();
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="py-20 sm:py-28" id="services-preview">
      <div className="container-page">
        <SectionHeading
          kicker={t("home.services.kicker")}
          title={t("home.services.title")}
          subtitle={t("home.services.subtitle")}
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isEmerald = service.accent === "emerald";
            const accentText = isEmerald ? "text-accent2" : "text-accent";
            const accentBorder = isEmerald
              ? "group-hover:border-accent2/40"
              : "group-hover:border-accent/40";
            const accentGlow = isEmerald
              ? ""
              : "group-hover:shadow-glow-soft";
            const spotlightColor = isEmerald
              ? "rgba(52,211,153,0.22)"
              : "rgba(34,211,238,0.22)";
            return (
              <Reveal key={service.key} delay={i * 0.06} variant="fadeUp">
                <TiltCard max={5} scale={1.02} className="h-full">
                  <Spotlight color={spotlightColor} size={340}>
                    <Link
                      href="/services"
                      className="group block h-full"
                    >
                      <div
                        className={cn(
                          "card card-hover card-sheen relative h-full overflow-hidden transition-all",
                          accentBorder,
                          accentGlow,
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <motion.div
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-elev",
                              accentText,
                            )}
                            whileHover={
                              prefersReducedMotion
                                ? undefined
                                : { rotate: [0, -8, 8, 0], scale: 1.12 }
                            }
                            transition={{ duration: 0.55 }}
                          >
                            <Icon className="h-5 w-5" aria-hidden />
                          </motion.div>
                          <motion.span
                            className="font-mono text-xs text-ink-dim"
                            initial={{ opacity: 0, x: 6 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{
                              delay: 0.15 + i * 0.05,
                              duration: 0.5,
                            }}
                          >
                            {service.number}
                          </motion.span>
                        </div>
                        <h3 className="mt-6 text-xl font-semibold text-ink transition-colors group-hover:text-accent">
                          {t(`services.items.${service.key}.title`)}
                        </h3>
                        <p className="mt-2 text-sm text-ink-muted">
                          {t(`services.items.${service.key}.tagline`)}
                        </p>
                        <div
                          className={cn(
                            "mt-5 flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.14em] transition-all duration-300",
                            accentText,
                            "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                          )}
                        >
                          <span>read more</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </Spotlight>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-12 flex justify-center">
          <Magnetic strength={10}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-lg border border-border-strong px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {t("home.services.cta")}
              <motion.span
                className="inline-flex"
                whileHover={
                  prefersReducedMotion ? undefined : { x: 4 }
                }
              >
                <ArrowUpRight className="h-4 w-4" />
              </motion.span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
