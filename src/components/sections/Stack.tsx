"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Spotlight } from "@/components/ui/motion/Spotlight";
import { IconBob } from "@/components/ui/motion/IconBob";
import { stack } from "@/content/stack";

export function Stack() {
  const t = useTranslations("home.stack");
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="relative overflow-hidden border-y border-border bg-bg-soft/40 py-20 sm:py-28">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(34,211,238,0.08), transparent 70%)",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, 30, -20, 0], y: [0, -20, 10, 0] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container-page relative">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />

        <Reveal>
          <Spotlight
            color="rgba(34,211,238,0.15)"
            size={420}
            className="mt-14 rounded-2xl"
          >
            <div className="group/stack overflow-hidden rounded-2xl border border-border bg-border/40">
              <motion.div
                className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-4"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.1,
                    },
                  },
                }}
              >
                {stack.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      variants={{
                        hidden: { opacity: 0, y: 10, scale: 0.96 },
                        show: { opacity: 1, y: 0, scale: 1 },
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="group relative flex aspect-[4/3] flex-col items-center justify-center gap-5 bg-bg-soft/60 transition-all duration-300 hover:bg-bg-elev/80 group-hover/stack:opacity-50 hover:!opacity-100 sm:aspect-[5/4]"
                    >
                      <IconBob delay={i * 0.15} amplitude={3} duration={5}>
                        <motion.span
                          className="inline-flex"
                          whileHover={
                            prefersReducedMotion
                              ? undefined
                              : { rotate: [0, -6, 6, 0], scale: 1.2 }
                          }
                          transition={{ duration: 0.55 }}
                        >
                          <Icon
                            className="h-12 w-12 text-ink transition-colors duration-300 group-hover:text-accent sm:h-14 sm:w-14"
                            aria-hidden
                          />
                        </motion.span>
                      </IconBob>
                      <span className="text-sm text-ink-muted transition-colors group-hover:text-ink sm:text-base">
                        {item.name}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </Spotlight>
        </Reveal>
      </div>
    </section>
  );
}
