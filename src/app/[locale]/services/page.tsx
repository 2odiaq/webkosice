import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { services } from "@/content/services";
import { Reveal } from "@/components/ui/motion/Reveal";
import { TextReveal } from "@/components/ui/motion/TextReveal";
import { TiltCard } from "@/components/ui/motion/TiltCard";
import { Magnetic } from "@/components/ui/motion/Magnetic";
import { Badge } from "@/components/ui/Badge";
import { Pricing } from "@/components/sections/Pricing";
import { CTA } from "@/components/sections/CTA";
import { cn } from "@/lib/cn";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `/${locale}/services` },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesInner />;
}

function ServicesInner() {
  const t = useTranslations();
  return (
    <>
      <section className="relative overflow-hidden pt-14 sm:pt-20">
        <div
          aria-hidden
          className="absolute inset-0 grid-bg opacity-80"
          style={{ maskImage: undefined }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[400px] bg-radial-fade"
        />
        <div className="container-page relative">
          <Reveal>
            <span className="kicker">{t("services.hero.kicker")}</span>
          </Reveal>
          <h1 className="heading-xl mt-5 max-w-3xl">
            <TextReveal as="span" text={t("services.hero.title")} />
          </h1>
          <Reveal delay={0.2}>
            <p className="text-lead mt-5 max-w-2xl">
              {t("services.hero.subtitle")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page space-y-12 sm:space-y-16">
          {services.map((service, i) => {
            const Icon = service.icon;
            const deliverables = t.raw(
              `services.items.${service.key}.deliverables`,
            ) as string[];
            return (
              <Reveal
                key={service.key}
                delay={0.05 * i}
                variant={i % 2 === 0 ? "fadeRight" : "fadeLeft"}
              >
                <TiltCard max={3} scale={1.005} className="block">
                <article
                  id={service.slug}
                  className="card-sheen grid gap-8 rounded-2xl border border-border bg-bg-soft/40 p-6 sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:gap-12"
                >
                  <div className="flex flex-col justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-lg border border-accent/30 bg-accent/10",
                            service.accent === "emerald"
                              ? "text-accent2"
                              : "text-accent",
                          )}
                        >
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <span className="font-mono text-xs text-ink-dim">
                          {"> service_" + service.number}
                        </span>
                      </div>
                      <h2 className="heading-md mt-6">
                        {t(`services.items.${service.key}.title`)}
                      </h2>
                      <p className="mt-2 text-ink-muted">
                        {t(`services.items.${service.key}.tagline`)}
                      </p>
                      <p className="mt-5 text-sm text-ink-muted sm:text-base">
                        {t(`services.items.${service.key}.description`)}
                      </p>
                    </div>
                    <div className="grid gap-3 pt-2">
                      <Row
                        label={t("services.idealForLabel")}
                        value={t(`services.items.${service.key}.idealFor`)}
                      />
                      <Row
                        label={t("services.pricingLabel")}
                        value={
                          <span className="font-mono text-ink">
                            {t(`services.items.${service.key}.priceRange`)}
                          </span>
                        }
                      />
                      <div className="pt-3">
                        <Magnetic strength={8}>
                          <Link
                            href="/contact"
                            className="group/link inline-flex items-center gap-2 text-sm text-accent hover:text-accent-soft"
                          >
                            {t("services.ctaLabel")}
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:rotate-12" />
                          </Link>
                        </Magnetic>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Badge tone="accent">
                        {t("services.deliverablesLabel")}
                      </Badge>
                    </div>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-2.5 rounded-lg border border-border bg-bg px-4 py-3 text-sm text-ink-muted"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                            aria-hidden
                          />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Pricing />

      <CTA />
    </>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-border pt-3 text-sm">
      <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-dim">
        {label}
      </span>
      <span className="text-right text-ink-muted">{value}</span>
    </div>
  );
}
