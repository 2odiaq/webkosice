"use client";

import { useState, useRef, useEffect } from "react";
import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Check, Copy, Mail, Loader2, AlertCircle } from "lucide-react";
import {
  submitContact,
  type ContactState,
} from "@/app/actions/contact";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const initial: ContactState = { status: "idle" };

const ERROR_SHAKE = { x: [-8, 8, -6, 6, -3, 3, 0] };

const FIELD_VARIANTS = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const [state, action, pending] = useActionState(submitContact, initial);
  const startedAt = useRef<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [shakeKey, setShakeKey] = useState(0);

  useEffect(() => {
    startedAt.current = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status === "success" && formRef.current) {
      formRef.current.reset();
    }
    if (state.status === "error") {
      setShakeKey((k) => k + 1);
    }
  }, [state.status]);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  }

  const mailtoBody =
    typeof window !== "undefined" && formRef.current
      ? encodeURIComponent(
          (formRef.current.elements.namedItem("message") as HTMLTextAreaElement)
            ?.value ?? "",
        )
      : "";
  const mailtoSubject = encodeURIComponent("Nová poptávka z webu");
  const mailtoHref = `mailto:${site.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  const shakeProps =
    prefersReducedMotion || state.status !== "error"
      ? {}
      : {
          animate: ERROR_SHAKE,
          transition: { duration: 0.5, ease: "easeInOut" as const },
        };

  return (
    <div className="relative">
      <motion.form
        ref={formRef}
        key={shakeKey}
        action={action}
        {...shakeProps}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
          },
        }}
        className={cn(
          "space-y-5 rounded-2xl border border-border bg-bg-soft/60 p-6 sm:p-8",
          state.status === "success" && "pointer-events-none opacity-70",
        )}
        noValidate
      >
        <input type="hidden" name="locale" value={locale} />
        <input
          type="hidden"
          name="startedAt"
          defaultValue={startedAt.current}
        />
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        <motion.div
          variants={FIELD_VARIANTS}
          className="grid gap-5 sm:grid-cols-2"
        >
          <Field
            id="name"
            name="name"
            label={t("name")}
            placeholder={t("namePlaceholder")}
            required
            error={mapError(state.fieldErrors?.name, t)}
          />
          <Field
            id="email"
            name="email"
            type="email"
            label={t("email")}
            placeholder={t("emailPlaceholder")}
            required
            error={mapError(state.fieldErrors?.email, t)}
          />
        </motion.div>

        <motion.div
          variants={FIELD_VARIANTS}
          className="grid gap-5 sm:grid-cols-2"
        >
          <Field
            id="company"
            name="company"
            label={t("company")}
            placeholder={t("companyPlaceholder")}
          />
          <div>
            <label
              htmlFor="budget"
              className="mb-2 inline-flex font-mono text-xs uppercase tracking-[0.14em] text-ink-muted"
            >
              {t("budget")}
            </label>
            <select
              id="budget"
              name="budget"
              defaultValue=""
              className="h-11 w-full rounded-lg border border-border bg-bg px-3 text-sm text-ink transition-[border-color,box-shadow] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
            >
              <option value="">—</option>
              <option value="small">{t("budgetOptions.small")}</option>
              <option value="medium">{t("budgetOptions.medium")}</option>
              <option value="large">{t("budgetOptions.large")}</option>
              <option value="enterprise">
                {t("budgetOptions.enterprise")}
              </option>
              <option value="unsure">{t("budgetOptions.unsure")}</option>
            </select>
          </div>
        </motion.div>

        <motion.div variants={FIELD_VARIANTS}>
          <label
            htmlFor="message"
            className="mb-2 inline-flex font-mono text-xs uppercase tracking-[0.14em] text-ink-muted"
          >
            {t("message")} <span className="ml-1 text-accent">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder={t("messagePlaceholder")}
            className={cn(
              "w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-dim transition-[border-color,box-shadow] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40",
              state.fieldErrors?.message && "border-rose-500/60",
            )}
          />
          {state.fieldErrors?.message ? (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
              <AlertCircle className="h-3.5 w-3.5" />
              {mapError(state.fieldErrors.message, t)}
            </p>
          ) : null}
        </motion.div>

        <motion.p variants={FIELD_VARIANTS} className="text-xs text-ink-dim">
          {t("consent")}
        </motion.p>

        <motion.div variants={FIELD_VARIANTS}>
          <motion.button
            type="submit"
            disabled={pending}
            whileHover={
              prefersReducedMotion ? undefined : { scale: 1.01 }
            }
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            className="relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-accent px-6 text-sm font-medium text-bg shadow-glow transition-colors hover:bg-accent-soft disabled:opacity-70 sm:w-auto"
          >
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                {t("submitting")}
              </>
            ) : (
              t("submit")
            )}
          </motion.button>
        </motion.div>

        {state.status === "error" && !state.fieldErrors ? (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200"
          >
            <AlertCircle className="h-4 w-4" />
            {t("error")}
          </motion.p>
        ) : null}
      </motion.form>

      <AnimatePresence>
        {state.status === "success" ? (
          <SuccessOverlay />
        ) : state.status === "mailto" ? (
          <MailtoOverlay mailtoHref={mailtoHref} onCopy={onCopy} copied={copied} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function mapError(
  code: string | undefined,
  t: (k: string) => string,
): string | undefined {
  if (!code) return;
  if (code === "invalid_string" || code === "invalid_format") return t("invalidEmail");
  if (code === "too_small") return t("tooShort");
  return t("required");
}

function Field({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 inline-flex font-mono text-xs uppercase tracking-[0.14em] text-ink-muted"
      >
        {label}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={cn(
          "h-11 w-full rounded-lg border border-border bg-bg px-3 text-sm text-ink placeholder:text-ink-dim transition-[border-color,box-shadow] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40",
          error && "border-rose-500/60",
        )}
      />
      {error ? (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SuccessOverlay() {
  const t = useTranslations("contact.form");
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 22,
      }}
      className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5"
    >
      <motion.span
        className="relative inline-flex"
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 16,
          delay: 0.1,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
          aria-hidden
        >
          <motion.path
            d="M5 12l4 4L19 6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.5,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </svg>
        {!prefersReducedMotion ? (
          <>
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const dx = Math.cos(angle) * 30;
              const dy = Math.sin(angle) * 30;
              return (
                <motion.span
                  key={i}
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 inline-block h-1 w-1 rounded-full bg-emerald-400"
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: dx,
                    y: dy,
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.9,
                    ease: "easeOut",
                    delay: 0.35 + i * 0.02,
                  }}
                />
              );
            })}
          </>
        ) : null}
      </motion.span>
      <div>
        <p className="font-medium text-ink">{t("success")}</p>
      </div>
    </motion.div>
  );
}

function MailtoOverlay({
  mailtoHref,
  onCopy,
  copied,
}: {
  mailtoHref: string;
  onCopy: () => void;
  copied: boolean;
}) {
  const t = useTranslations("contact.form");
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="mt-6 flex flex-col gap-3 rounded-xl border border-accent/30 bg-accent/5 p-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm text-ink">{t("successMailto")}</p>
      <div className="flex flex-wrap gap-2">
        <a
          href={mailtoHref}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg hover:bg-accent-soft"
        >
          <Mail className="h-4 w-4" />
          {t("openMail")}
        </a>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-2 rounded-lg border border-border-strong px-4 py-2 text-sm text-ink hover:border-accent hover:text-accent"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              {t("copied")}
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              {t("copyEmail")}
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
