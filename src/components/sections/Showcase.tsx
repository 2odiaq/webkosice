"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { showcaseItems } from "@/content/showcase";
import { TextReveal } from "@/components/ui/motion/TextReveal";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Shine } from "@/components/ui/motion/Shine";

export function Showcase() {
  const t = useTranslations("showcase");
  const prefersReducedMotion = useReducedMotion();
  const looped = [...showcaseItems, ...showcaseItems];

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="kicker">{t("kicker")}</span>
          </Reveal>
          <h2 className="heading-md mt-4">
            <TextReveal as="span" text={t("title")} stagger={0.05} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-3 text-base text-ink-muted sm:text-lg">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-12 overflow-hidden">
        {/* Edge gradient fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent sm:w-40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent sm:w-40"
        />

        <div className="marquee-track flex w-max gap-5 px-5">
          {looped.map((item, i) => (
            <motion.article
              key={`${item.key}-${i}`}
              className="group relative h-56 w-72 shrink-0 overflow-hidden rounded-2xl border border-border bg-bg-soft [transform-style:preserve-3d] sm:h-64 sm:w-80 md:h-72 md:w-96"
              style={{ transformPerspective: 900 }}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      rotateX: -4,
                      rotateY: 4,
                      scale: 1.03,
                      zIndex: 5,
                    }
              }
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              aria-hidden={i >= showcaseItems.length ? true : undefined}
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 768px) 384px, (min-width: 640px) 320px, 288px"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
                priority={i < 4}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
              />
              <div
                aria-hidden
                className="absolute inset-0 ring-1 ring-inset ring-white/5 transition-colors group-hover:ring-accent/40"
              />
              {/* hover shine sweep */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              >
                <Shine
                  color="rgba(255,255,255,0.22)"
                  duration={1.2}
                  interval={1.5}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="text-lg font-semibold text-white sm:text-xl">
                  {t(`categories.${item.key}`)}
                </div>
                <div className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-white/70">
                  {item.tag}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
