"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqKeys } from "@/content/faq";
import { cn } from "@/lib/cn";

type Props = {
  compact?: boolean;
};

export function FAQ({ compact = false }: Props) {
  const t = useTranslations();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={cn(compact ? "py-12" : "py-20 sm:py-28")}>
      <div className="container-page">
        {!compact && (
          <SectionHeading
            kicker={t("home.faq.kicker")}
            title={t("home.faq.title")}
            subtitle={t("home.faq.subtitle")}
          />
        )}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.06, delayChildren: 0.1 },
            },
          }}
          className={cn(
            "mx-auto max-w-3xl divide-y divide-border rounded-xl border border-border bg-bg-soft/40",
            !compact && "mt-14",
          )}
        >
          {faqKeys.map((key, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={key}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group/row relative"
              >
                {/* Accent bar on hover */}
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute left-0 top-2 bottom-2 w-0.5 origin-top rounded-full bg-accent transition-all duration-300",
                    isOpen
                      ? "scale-y-100 opacity-100"
                      : "scale-y-0 opacity-0 group-hover/row:scale-y-100 group-hover/row:opacity-60",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition-colors hover:text-ink sm:px-6 sm:py-6"
                >
                  <span className="text-base font-medium text-ink sm:text-lg">
                    {t(`faq.items.${key}.question`)}
                  </span>
                  <motion.span
                    aria-hidden
                    className={cn(
                      "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                      isOpen
                        ? "border-accent/50 bg-accent/10 text-accent"
                        : "border-border text-ink-muted",
                    )}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 340,
                      damping: 22,
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0.001 }
                          : {
                              height: {
                                duration: 0.35,
                                ease: [0.22, 1, 0.36, 1],
                              },
                              opacity: {
                                duration: 0.25,
                                ease: "easeOut",
                              },
                            }
                      }
                      className="overflow-hidden px-5 sm:px-6"
                    >
                      <motion.p
                        initial={{ y: -6, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -6, opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                        className="max-w-2xl pb-5 text-sm text-ink-muted sm:pb-6 sm:text-base"
                      >
                        {t(`faq.items.${key}.answer`)}
                      </motion.p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
