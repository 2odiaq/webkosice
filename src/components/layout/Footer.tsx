"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, MapPin, Instagram, Phone } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Logo } from "./Logo";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Typewriter } from "@/components/ui/motion/Typewriter";

const NAV = [
  { href: "/services", key: "services" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Footer() {
  const t = useTranslations();
  const prefersReducedMotion = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border bg-bg-soft/40">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[680px] -translate-x-1/2 opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(34,211,238,0.15), transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : { x: ["-50%", "-48%", "-52%", "-50%"], opacity: [0.4, 0.6, 0.4] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container-page relative py-14">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <Reveal className="max-w-sm" delay={0}>
            <Logo />
            <p className="mt-4 text-sm text-ink-muted">{t("footer.tagline")}</p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-ink-muted">
              <a
                href={`mailto:${site.email}`}
                className="group/ic inline-flex items-center gap-2 hover:text-accent"
              >
                <motion.span
                  className="inline-flex"
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { scale: 1.15, rotate: [0, -10, 10, 0] }
                  }
                  transition={{ duration: 0.5 }}
                >
                  <Mail className="h-4 w-4" aria-hidden />
                </motion.span>
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="group/ic inline-flex items-center gap-2 hover:text-accent"
              >
                <motion.span
                  className="inline-flex"
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { scale: 1.15, rotate: [0, -10, 10, 0] }
                  }
                  transition={{ duration: 0.5 }}
                >
                  <Phone className="h-4 w-4" aria-hidden />
                </motion.span>
                {site.phone}
              </a>
              <span className="inline-flex items-center gap-2">
                <motion.span
                  className="inline-flex"
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { y: [0, -2, 0, 2, 0] }
                  }
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <MapPin className="h-4 w-4" aria-hidden />
                </motion.span>
                {t("brand.location")}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="kicker">{t("footer.explore")}</div>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group/link inline-block text-ink-muted transition-colors hover:text-ink"
                  >
                    <span className="underline-sweep">
                      {t(`nav.${item.key}` as const)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="kicker">{t("footer.legal")}</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="group/link inline-block text-ink-muted transition-colors hover:text-ink"
                >
                  <span className="underline-sweep">{t("footer.privacy")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="group/link inline-block text-ink-muted transition-colors hover:text-ink"
                >
                  <span className="underline-sweep">{t("footer.terms")}</span>
                </Link>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="kicker">{t("footer.social")}</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="group/soc inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-ink"
                >
                  <motion.span
                    className="inline-flex"
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : { rotate: [0, -10, 10, 0], scale: 1.15 }
                    }
                    transition={{ duration: 0.55 }}
                  >
                    <Instagram className="h-4 w-4" aria-hidden />
                  </motion.span>
                  @webkosice
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal
          delay={0.3}
          className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-ink-dim sm:flex-row sm:items-center"
        >
          <p>
            © {year} {site.name}. {t("footer.rights")}
          </p>
          <div className="font-mono">
            <Typewriter
              lines={[t("footer.madeIn")]}
              speed={28}
              startDelay={300}
              lineDelay={0}
            />
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
