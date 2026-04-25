"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";
import { site } from "@/lib/site";
import { Aurora } from "@/components/ui/motion/Aurora";
import { Magnetic } from "@/components/ui/motion/Magnetic";
import { Shine } from "@/components/ui/motion/Shine";
import { TextReveal } from "@/components/ui/motion/TextReveal";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Typewriter } from "@/components/ui/motion/Typewriter";

const CONSOLE_LINES = [
  "$ ./start-project.sh",
  "",
  "> scheduling discovery call...",
  "> sending calendar invite...",
  "> preparing questions list...",
  "",
  "✓ reply in < 24h",
];

export function CTA() {
  const t = useTranslations("home.cta");
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-bg-soft p-8 sm:p-14">
          <Aurora variant="soft" />
          <div
            aria-hidden
            className="absolute inset-0 bg-radial-fade"
          />
          <div
            aria-hidden
            className="absolute inset-0 grid-bg opacity-70"
            style={{ maskImage: undefined }}
          />
          {/* Rolling shine across the whole box */}
          <Shine color="rgba(34,211,238,0.2)" duration={2} interval={6} />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="max-w-2xl">
              <h2 className="heading-lg">
                <TextReveal as="span" text={t("title")} stagger={0.05} />
              </h2>
              <Reveal delay={0.25}>
                <p className="text-lead mt-4">{t("subtitle")}</p>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <Magnetic strength={14}>
                    <Link
                      href="/contact"
                      className="relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-lg bg-accent px-6 text-sm font-medium text-bg shadow-glow transition-colors hover:bg-accent-soft"
                    >
                      <Shine
                        color="rgba(255,255,255,0.5)"
                        duration={1.3}
                        interval={4.5}
                      />
                      <span className="relative z-10 inline-flex items-center gap-2">
                        {t("button")}
                        <motion.span
                          whileHover={
                            prefersReducedMotion
                              ? undefined
                              : { x: 2, y: -2, rotate: 10 }
                          }
                          className="inline-flex"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </motion.span>
                      </span>
                    </Link>
                  </Magnetic>
                  <div className="flex items-center gap-2 text-sm text-ink-muted">
                    <span>{t("secondary")}</span>
                    <a
                      href={`mailto:${site.email}`}
                      className="link-underline font-mono"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.3} className="relative hidden lg:block">
              <div className="rounded-xl border border-border bg-bg/80 p-5 font-mono text-xs text-ink-muted shadow-glow-soft backdrop-blur">
                <div className="flex items-center gap-2 text-ink-dim">
                  <Mail className="h-4 w-4" aria-hidden />
                  next_step.sh
                </div>
                <div className="mt-3 text-ink">
                  <Typewriter
                    lines={CONSOLE_LINES}
                    speed={22}
                    startDelay={450}
                    lineDelay={120}
                    renderLine={(line, _i, typed) => (
                      <span
                        className={
                          line.startsWith("✓")
                            ? "text-accent2"
                            : line.startsWith(">")
                              ? "text-accent"
                              : ""
                        }
                      >
                        {typed || "\u00A0"}
                      </span>
                    )}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
