"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/motion/Reveal";
import { TiltCard } from "@/components/ui/motion/TiltCard";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/content/projects";
import { cn } from "@/lib/cn";

const ACCENT_GRADIENTS: Record<string, string> = {
  cyan: "from-cyan-500/30 via-cyan-500/5 to-transparent",
  emerald: "from-emerald-500/30 via-emerald-500/5 to-transparent",
  violet: "from-violet-500/30 via-violet-500/5 to-transparent",
  rose: "from-rose-500/30 via-rose-500/5 to-transparent",
};

type Props = {
  limit?: number;
};

export function Projects({ limit }: Props) {
  const t = useTranslations();
  const locale = useLocale() as "sk" | "en";
  const prefersReducedMotion = useReducedMotion();
  const items = (limit ? projects.slice(0, limit) : projects).filter(
    (p) => !limit || p.featured,
  );

  return (
    <section className="py-20 sm:py-28" id="projects">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker={t("home.projects.kicker")}
            title={t("home.projects.title")}
            subtitle={t("home.projects.subtitle")}
          />
          <Link
            href="/portfolio"
            className="group hidden items-center gap-2 text-sm text-accent hover:text-accent-soft sm:inline-flex"
          >
            {t("home.projects.cta")}
            <motion.span
              className="inline-flex"
              whileHover={
                prefersReducedMotion ? undefined : { x: 3, y: -3, rotate: 8 }
              }
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.span>
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((project, i) => {
            const locContent = project[locale];
            return (
              <Reveal
                key={project.slug}
                delay={i * 0.06}
                variant={i % 2 === 0 ? "fadeRight" : "fadeLeft"}
              >
                <TiltCard max={5} scale={1.01} className="h-full">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="group block h-full"
                  >
                    <article className="card card-hover card-sheen h-full overflow-hidden p-0">
                      <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-bg-elev">
                        <div
                          aria-hidden
                          className={cn(
                            "absolute inset-0 bg-gradient-to-br bg-[length:200%_200%] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]",
                            ACCENT_GRADIENTS[project.accent],
                            !prefersReducedMotion && "animate-gradient-pan",
                          )}
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 grid-bg opacity-60 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
                          style={{ maskImage: undefined }}
                        />
                        <div className="absolute inset-0 flex items-end p-6">
                          <div>
                            <div className="font-mono text-xs text-ink-dim">
                              {project.year} · {locContent.category}
                            </div>
                            <div className="mt-1 text-2xl font-semibold text-ink">
                              {locContent.title}
                            </div>
                          </div>
                        </div>
                        {project.sample ? (
                          <motion.div
                            className="absolute right-4 top-4"
                            animate={
                              prefersReducedMotion
                                ? undefined
                                : {
                                    rotate: [0, -3, 3, 0],
                                  }
                            }
                            transition={{
                              duration: 3.6,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.4,
                            }}
                          >
                            <Badge tone="accent">
                              {t("portfolio.sampleBadge")}
                            </Badge>
                          </motion.div>
                        ) : null}
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-ink-muted">
                          {locContent.summary}
                        </p>
                        <motion.div
                          className="mt-5 flex flex-wrap gap-2"
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true, amount: 0.3 }}
                          variants={{
                            hidden: {},
                            show: {
                              transition: {
                                staggerChildren: 0.05,
                                delayChildren: 0.2,
                              },
                            },
                          }}
                        >
                          {project.stack.slice(0, 4).map((s) => (
                            <motion.span
                              key={s}
                              variants={{
                                hidden: { opacity: 0, y: 6 },
                                show: { opacity: 1, y: 0 },
                              }}
                              transition={{
                                duration: 0.4,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="rounded-full border border-border bg-bg px-2.5 py-1 font-mono text-[11px] text-ink-muted"
                            >
                              {s}
                            </motion.span>
                          ))}
                        </motion.div>
                        <div className="mt-6 flex items-center gap-2 text-sm text-accent transition-colors group-hover:text-accent-soft">
                          {t("home.projects.viewCase")}
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-12" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
