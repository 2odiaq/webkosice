"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import * as React from "react";

export function BackToTop() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 480);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onClick() {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={onClick}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={
            prefersReducedMotion
              ? undefined
              : { y: -3, scale: 1.05 }
          }
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-bg-soft/80 text-accent shadow-glow-soft backdrop-blur-md hover:border-accent hover:text-bg hover:bg-accent"
        >
          <motion.span
            animate={
              prefersReducedMotion
                ? undefined
                : { y: [0, -3, 0] }
            }
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-flex"
          >
            <ArrowUp className="h-5 w-5" aria-hidden />
          </motion.span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
