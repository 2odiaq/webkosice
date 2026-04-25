"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Star, MessageSquareHeart } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/ui/motion/Reveal";
import { TextReveal } from "@/components/ui/motion/TextReveal";
import { TiltCard } from "@/components/ui/motion/TiltCard";
import { Spotlight } from "@/components/ui/motion/Spotlight";
import { Magnetic } from "@/components/ui/motion/Magnetic";
import { Shine } from "@/components/ui/motion/Shine";
import { testimonialKeys } from "@/content/testimonials";
import { cn } from "@/lib/cn";

const AVATAR_GRADIENTS = [
  "bg-gradient-to-br from-cyan-400/30 to-cyan-600/40 text-cyan-100 border-cyan-400/40",
  "bg-gradient-to-br from-emerald-400/30 to-emerald-600/40 text-emerald-100 border-emerald-400/40",
  "bg-gradient-to-br from-violet-400/30 to-violet-600/40 text-violet-100 border-violet-400/40",
  "bg-gradient-to-br from-rose-400/30 to-rose-600/40 text-rose-100 border-rose-400/40",
  "bg-gradient-to-br from-amber-400/30 to-amber-600/40 text-amber-100 border-amber-400/40",
];

export function Testimonials() {
  const t = useTranslations();
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[32px] border border-border bg-bg-soft/40 px-5 pb-14 pt-16 sm:px-10 sm:py-20 lg:py-24">
          {/* Breathing ambient soft glow from the top */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
            style={{
              background:
                "radial-gradient(ellipse 55% 80% at 50% 0%, rgba(34,211,238,0.22), transparent 65%)",
            }}
            animate={
              prefersReducedMotion
                ? undefined
                : { opacity: [0.75, 1, 0.75], scale: [1, 1.04, 1] }
            }
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Rotating light rays — fanning downward */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
            style={{
              background: `conic-gradient(
                from 90deg at 50% 0%,
                transparent 0deg,
                transparent 28deg,
                rgba(34,211,238,0.11) 30deg,
                transparent 32deg,
                transparent 55deg,
                rgba(34,211,238,0.16) 58deg,
                transparent 61deg,
                transparent 76deg,
                rgba(34,211,238,0.22) 79deg,
                transparent 82deg,
                transparent 88deg,
                rgba(34,211,238,0.28) 90deg,
                transparent 92deg,
                transparent 98deg,
                rgba(34,211,238,0.22) 101deg,
                transparent 104deg,
                transparent 119deg,
                rgba(34,211,238,0.16) 122deg,
                transparent 125deg,
                transparent 148deg,
                rgba(34,211,238,0.11) 150deg,
                transparent 152deg,
                transparent 180deg
              )`,
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 35%, transparent 85%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 35%, transparent 85%)",
              filter: "blur(1.5px)",
              transformOrigin: "50% 0%",
            }}
            animate={
              prefersReducedMotion
                ? undefined
                : { rotate: [0, 1.8, 0, -1.8, 0] }
            }
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative">
            {/* Header */}
            <div className="flex flex-col items-center text-center">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent backdrop-blur-sm">
                  <MessageSquareHeart
                    className="h-3.5 w-3.5"
                    aria-hidden
                  />
                  {t("home.testimonials.badge")}
                </span>
              </Reveal>
              <h2 className="heading-lg mt-6">
                <TextReveal
                  as="span"
                  text={t("home.testimonials.title")}
                  stagger={0.05}
                />
              </h2>
              <Reveal delay={0.2}>
                <p className="text-lead mt-4 max-w-md text-ink-muted">
                  {t("home.testimonials.subtitle")}
                </p>
              </Reveal>
            </div>

            {/* Cards */}
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {testimonialKeys.map((key, i) => {
                const author = t(`testimonials.items.${key}.author`);
                const role = t(`testimonials.items.${key}.role`);
                const quote = t(`testimonials.items.${key}.quote`);
                const initials = toInitials(author);
                const gradient =
                  AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length];
                return (
                  <Reveal
                    key={key}
                    delay={i * 0.08}
                    variant="fadeUp"
                    className="h-full"
                  >
                    <TiltCard max={5} scale={1.015} className="h-full">
                      <Spotlight
                        color="rgba(34,211,238,0.2)"
                        size={340}
                        className="h-full rounded-2xl"
                      >
                        <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-elev/70 p-6 backdrop-blur-sm transition-colors hover:border-accent/40">
                          {/* Subtle noise texture */}
                          <div
                            aria-hidden
                            className="noise pointer-events-none absolute inset-0"
                          />

                          <div className="relative">
                            {/* Avatar */}
                            <div className="flex items-center gap-3">
                              <motion.div
                                className={cn(
                                  "flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold",
                                  gradient,
                                )}
                                animate={
                                  prefersReducedMotion
                                    ? undefined
                                    : { y: [0, -2, 0, 2, 0] }
                                }
                                transition={{
                                  duration: 5,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: i * 0.5,
                                }}
                              >
                                {initials}
                              </motion.div>
                            </div>

                            {/* Stars — staggered pop */}
                            <motion.div
                              className="mt-5 flex gap-0.5 text-accent"
                              initial="hidden"
                              whileInView="show"
                              viewport={{ once: true, amount: 0.5 }}
                              variants={{
                                hidden: {},
                                show: {
                                  transition: {
                                    staggerChildren: 0.06,
                                    delayChildren: 0.25 + i * 0.08,
                                  },
                                },
                              }}
                            >
                              {Array.from({ length: 5 }).map((_, s) => (
                                <motion.span
                                  key={s}
                                  variants={{
                                    hidden: { scale: 0, opacity: 0, rotate: -30 },
                                    show: {
                                      scale: 1,
                                      opacity: 1,
                                      rotate: 0,
                                    },
                                  }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 380,
                                    damping: 18,
                                  }}
                                  className="inline-flex"
                                >
                                  <Star
                                    className="h-4 w-4 fill-current"
                                    aria-hidden
                                  />
                                </motion.span>
                              ))}
                              <span className="sr-only">5 / 5</span>
                            </motion.div>

                            {/* Quote */}
                            <blockquote className="mt-4 text-[15px] leading-relaxed text-ink">
                              &ldquo;
                              <TextReveal
                                as="span"
                                text={quote}
                                stagger={0.015}
                                duration={0.4}
                                distance={8}
                                amount={0.4}
                              />
                              &rdquo;
                            </blockquote>
                          </div>

                          {/* Footer — author + role */}
                          <footer className="relative mt-auto pt-8">
                            <div className="font-medium text-ink">{author}</div>
                            <div className="mt-0.5 text-sm text-ink-muted">
                              {role}
                            </div>
                          </footer>
                        </article>
                      </Spotlight>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-14 flex flex-col items-center text-center">
              <Reveal>
                <p className="font-medium text-ink">
                  {t("home.testimonials.bottomTitle")}
                </p>
                <p className="mt-1.5 max-w-sm text-sm text-ink-muted">
                  {t("home.testimonials.bottomSubtitle")}
                </p>
              </Reveal>
              <Magnetic strength={12} className="mt-6">
                <Link
                  href="/contact"
                  className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg shadow-glow-soft transition-colors hover:bg-accent-soft"
                >
                  <Shine color="rgba(255,255,255,0.5)" duration={1.4} interval={5} />
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {t("home.testimonials.bottomCta")}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function toInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
