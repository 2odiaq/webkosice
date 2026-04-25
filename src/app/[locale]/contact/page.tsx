import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Clock, Timer } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { ContactForm } from "@/components/sections/ContactForm";
import { FAQ } from "@/components/sections/FAQ";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/motion/Reveal";
import { TextReveal } from "@/components/ui/motion/TextReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactInner />;
}

function ContactInner() {
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
            <span className="kicker">{t("contact.hero.kicker")}</span>
          </Reveal>
          <h1 className="heading-xl mt-5 max-w-3xl">
            <TextReveal as="span" text={t("contact.hero.title")} />
          </h1>
          <Reveal delay={0.2}>
            <p className="text-lead mt-5 max-w-2xl">
              {t("contact.hero.subtitle")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />
          <Reveal as="aside" variant="fadeLeft" delay={0.15} className="space-y-6">
            <div className="rounded-2xl border border-border bg-bg-soft/60 p-6">
              <h2 className="text-lg font-semibold text-ink">
                {t("contact.info.title")}
              </h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  <div>
                    <div className="font-mono text-xs uppercase tracking-[0.14em] text-ink-dim">
                      {t("contact.info.emailLabel")}
                    </div>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-ink hover:text-accent"
                    >
                      {site.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  <div>
                    <div className="font-mono text-xs uppercase tracking-[0.14em] text-ink-dim">
                      {t("contact.info.phoneLabel")}
                    </div>
                    <a
                      href={`tel:${site.phone.replace(/\s/g, "")}`}
                      className="text-ink hover:text-accent"
                    >
                      {site.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  <div>
                    <div className="font-mono text-xs uppercase tracking-[0.14em] text-ink-dim">
                      {t("contact.info.locationLabel")}
                    </div>
                    <div className="text-ink">{t("brand.location")}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Timer
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  <div>
                    <div className="font-mono text-xs uppercase tracking-[0.14em] text-ink-dim">
                      {t("contact.info.responseLabel")}
                    </div>
                    <div className="text-ink">
                      {t("contact.info.responseValue")}
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  <div>
                    <div className="font-mono text-xs uppercase tracking-[0.14em] text-ink-dim">
                      {t("contact.info.hoursLabel")}
                    </div>
                    <div className="text-ink">{t("contact.info.hoursValue")}</div>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <h2 className="heading-md">
            <TextReveal as="span" text={t("contact.faqTitle")} />
          </h2>
          <div className="mt-6">
            <FAQ compact />
          </div>
        </div>
      </section>
    </>
  );
}
