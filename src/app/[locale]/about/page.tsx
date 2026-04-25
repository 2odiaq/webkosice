import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Hammer, MessageCircleHeart, Handshake, Minimize2, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { Stack } from "@/components/sections/Stack";
import { Process } from "@/components/sections/Process";
import { Reveal } from "@/components/ui/motion/Reveal";
import { TextReveal } from "@/components/ui/motion/TextReveal";
import { TiltCard } from "@/components/ui/motion/TiltCard";
import { Spotlight } from "@/components/ui/motion/Spotlight";
import { Magnetic } from "@/components/ui/motion/Magnetic";
import { Shine } from "@/components/ui/motion/Shine";

const VALUES = [
  { key: "craft", icon: Hammer },
  { key: "honesty", icon: MessageCircleHeart },
  { key: "longterm", icon: Handshake },
  { key: "simple", icon: Minimize2 },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `/${locale}/about` },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutInner />;
}

function AboutInner() {
  const t = useTranslations();
  return (
    <>
      <section className="relative overflow-hidden pt-14 sm:pt-20">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[400px] bg-radial-fade"
        />
        <div className="container-page relative">
          <Reveal>
            <span className="kicker">{t("about.hero.kicker")}</span>
          </Reveal>
          <h1 className="heading-xl mt-5 max-w-3xl">
            <TextReveal as="span" text={t.raw("about.hero.title") as string} />
          </h1>
          <Reveal delay={0.2}>
            <p className="text-lead mt-6 max-w-2xl">{t("about.hero.lead")}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-4 max-w-2xl text-base text-ink-muted sm:text-lg">
              {t("about.hero.secondary")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <h2 className="heading-md max-w-2xl">
            <TextReveal as="span" text={t("about.valuesTitle")} />
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.key} delay={i * 0.06} variant="fadeUp">
                  <TiltCard max={5} scale={1.02} className="h-full">
                    <Spotlight
                      color="rgba(34,211,238,0.18)"
                      size={300}
                      className="h-full rounded-2xl"
                    >
                      <div className="card card-sheen h-full">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                          <Icon className="h-5 w-5" aria-hidden />
                        </div>
                        <h3 className="mt-5 text-lg font-semibold text-ink">
                          {t(`about.values.${v.key}.title`)}
                        </h3>
                        <p className="mt-2 text-sm text-ink-muted">
                          {t(`about.values.${v.key}.description`)}
                        </p>
                      </div>
                    </Spotlight>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-4 sm:py-8">
        <div className="container-page">
          <h2 className="heading-md max-w-2xl">
            <TextReveal as="span" text={t("about.processTitle")} />
          </h2>
        </div>
      </section>
      <Process />

      <Stack />

      <section className="py-20 sm:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-lg">
              <TextReveal as="span" text={t("about.cta.title")} />
            </h2>
            <Reveal delay={0.2}>
              <p className="text-lead mt-4">{t("about.cta.subtitle")}</p>
            </Reveal>
            <Reveal delay={0.35}>
              <Magnetic strength={12} className="mt-8">
                <Link
                  href="/contact"
                  className="relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-lg bg-accent px-6 text-sm font-medium text-bg shadow-glow hover:bg-accent-soft"
                >
                  <Shine color="rgba(255,255,255,0.5)" duration={1.3} interval={5} />
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {t("about.cta.button")}
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
