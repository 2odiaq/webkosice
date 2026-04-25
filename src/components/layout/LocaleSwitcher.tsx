"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname, routing } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
};

export function LocaleSwitcher({ className }: Props) {
  const t = useTranslations("locale");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: (typeof routing.locales)[number]) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(
        // preserve dynamic params (e.g. portfolio slug)
        // @ts-expect-error -- pathname + params typing is intentionally loose here
        { pathname, params },
        { locale: next },
      );
    });
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-border bg-bg-elev p-0.5 font-mono text-[11px] tracking-[0.14em]",
        isPending && "opacity-60",
        className,
      )}
      role="group"
      aria-label={t("switchTo")}
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-pressed={locale === l}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase transition-colors",
            locale === l
              ? "bg-accent text-bg"
              : "text-ink-muted hover:text-ink",
          )}
        >
          {t(l as "sk" | "en")}
        </button>
      ))}
    </div>
  );
}
