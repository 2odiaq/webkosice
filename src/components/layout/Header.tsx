"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link, usePathname } from "@/i18n/routing";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Magnetic } from "@/components/ui/motion/Magnetic";
import { Shine } from "@/components/ui/motion/Shine";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/services", key: "services" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const activeHref =
    hovered ?? NAV_ITEMS.find((item) => item.href === pathname)?.href ?? null;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[padding,border-color] duration-500",
        scrolled
          ? "border-b border-transparent pt-4"
          : "border-b border-border/50",
      )}
    >
      <div className="container-page relative">
        {/* Ambient glow that fades in as the pill forms on scroll */}
        <motion.div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -left-8 -right-8 -top-10 h-36 sm:-left-16 sm:-right-16 sm:-top-12 sm:h-40",
            !prefersReducedMotion && "animate-drift",
          )}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background:
              "radial-gradient(ellipse 45% 140% at 8% 60%, rgba(59,130,246,0.9), transparent 60%), " +
              "radial-gradient(ellipse 50% 160% at 92% 60%, rgba(168,85,247,0.8), transparent 60%), " +
              "radial-gradient(ellipse 35% 140% at 50% 60%, rgba(34,211,238,0.5), transparent 70%)",
            filter: "blur(36px)",
          }}
        />

        {/* Nav bar — morphs between flat (top of page) and pill (scrolled) */}
        <div
          className={cn(
            "relative flex items-center justify-between gap-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            scrolled
              ? "h-[72px] rounded-full border border-white/10 bg-bg-soft/70 pl-5 pr-2.5 shadow-[0_18px_48px_-16px_rgba(0,0,0,0.7)] backdrop-blur-xl"
              : "h-24 rounded-none border border-transparent bg-transparent px-0 sm:h-28",
          )}
        >
          <Logo size={scrolled ? "md" : "lg"} />

          <nav
            aria-label="Primary"
            className="hidden flex-1 items-center justify-center md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className={cn(
                "flex items-center transition-all duration-500",
                scrolled ? "gap-1" : "gap-1 sm:gap-2",
              )}
            >
              {NAV_ITEMS.map((item) => {
                const active = activeHref === item.href;
                const currentRoute = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setHovered(item.href)}
                    className={cn(
                      "relative whitespace-nowrap rounded-full transition-all duration-500",
                      scrolled
                        ? "px-4 py-2 text-base"
                        : "px-4 py-2.5 text-lg lg:text-xl",
                      currentRoute
                        ? "text-ink"
                        : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden
                        className={cn(
                          "absolute inset-0 rounded-full",
                          scrolled
                            ? "bg-white/[0.07] ring-1 ring-white/10"
                            : "bg-white/[0.05] ring-1 ring-white/10",
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    ) : null}
                    <span className="relative z-10">{t(item.key)}</span>
                    {!scrolled && currentRoute ? (
                      <motion.span
                        layoutId="nav-underline"
                        aria-hidden
                        className="absolute inset-x-4 -bottom-0.5 h-px bg-accent"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <LocaleSwitcher className="hidden sm:inline-flex" />
            <Magnetic strength={10} className="hidden md:inline-flex">
              <Link
                href="/contact"
                className={cn(
                  "relative inline-flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-accent font-medium text-bg shadow-glow-soft transition-all hover:bg-accent-soft",
                  scrolled
                    ? "px-5 py-2.5 text-base"
                    : "px-6 py-3 text-base lg:px-7 lg:text-lg",
                )}
              >
                <Shine color="rgba(255,255,255,0.45)" interval={6} duration={1.4} />
                <span className="relative z-10 inline-flex items-center gap-2">
                  {t("cta")}
                  <motion.span
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : { x: 2, y: -2, rotate: 8 }
                    }
                    className="inline-flex"
                  >
                    <ArrowUpRight
                      className={scrolled ? "h-5 w-5" : "h-5 w-5 lg:h-6 lg:w-6"}
                    />
                  </motion.span>
                </span>
              </Link>
            </Magnetic>
            <motion.button
              type="button"
              onClick={() => setOpen((v) => !v)}
              whileTap={{ scale: 0.9 }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink md:hidden"
              aria-label={open ? t("close") : t("menu")}
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden"
          >
            <div className="container-page mt-3">
              <div className="rounded-2xl border border-white/10 bg-bg-soft/90 p-4 backdrop-blur-xl">
                <motion.nav
                  aria-label="Mobile"
                  className="flex flex-col gap-1"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: { staggerChildren: 0.05, delayChildren: 0.08 },
                    },
                  }}
                >
                  {NAV_ITEMS.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <motion.div
                        key={item.href}
                        variants={{
                          hidden: { opacity: 0, x: -12 },
                          show: { opacity: 1, x: 0 },
                        }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "block rounded-lg px-3 py-3 text-base transition-colors",
                            active
                              ? "bg-bg-elev text-ink"
                              : "text-ink-muted hover:bg-bg-elev hover:text-ink",
                          )}
                        >
                          {t(item.key)}
                        </Link>
                      </motion.div>
                    );
                  })}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      show: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-3 flex items-center justify-between gap-2 border-t border-white/10 pt-3"
                  >
                    <LocaleSwitcher />
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-bg"
                    >
                      {t("cta")}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </motion.nav>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
