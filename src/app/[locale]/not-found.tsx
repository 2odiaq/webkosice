"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { TextReveal } from "@/components/ui/motion/TextReveal";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Magnetic } from "@/components/ui/motion/Magnetic";
import { Shine } from "@/components/ui/motion/Shine";

export default function NotFound() {
  const t = useTranslations("errors.notFound");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-20">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(34,211,238,0.25), transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.55, 0.85, 0.55], scale: [1, 1.05, 1] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              404
            </div>
          </Reveal>

          <div className="relative mt-2 flex justify-center">
            <Glitch404 />
          </div>

          <h1 className="heading-lg mt-4">
            <TextReveal as="span" text={t("title")} />
          </h1>
          <Reveal delay={0.2}>
            <p className="text-lead mt-4">{t("subtitle")}</p>
          </Reveal>
          <Reveal delay={0.35}>
            <Magnetic strength={12} className="mt-8 inline-block">
              <Link
                href="/"
                className="relative inline-flex h-11 items-center overflow-hidden rounded-lg bg-accent px-5 text-sm font-medium text-bg shadow-glow hover:bg-accent-soft"
              >
                <Shine color="rgba(255,255,255,0.5)" duration={1.3} interval={5} />
                <span className="relative z-10">{t("home")}</span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Glitch404() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <span className="block font-mono text-[88px] font-bold leading-none text-ink sm:text-[128px]">
        404
      </span>
    );
  }

  return (
    <span className="relative block select-none font-mono text-[88px] font-bold leading-none tracking-tight text-ink sm:text-[128px]">
      <span aria-hidden className="relative z-10 inline-block">
        404
      </span>
      <motion.span
        aria-hidden
        className="absolute inset-0 text-accent"
        style={{ mixBlendMode: "screen" }}
        animate={{
          x: [0, -3, 2, -2, 3, 0],
          opacity: [0.6, 0.8, 0.4, 0.9, 0.5, 0.6],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        404
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute inset-0 text-rose-400"
        style={{ mixBlendMode: "screen" }}
        animate={{
          x: [0, 3, -2, 2, -3, 0],
          opacity: [0.35, 0.5, 0.25, 0.6, 0.3, 0.35],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        404
      </motion.span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-accent/60"
        animate={{ y: [0, 80, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
      />
    </span>
  );
}
