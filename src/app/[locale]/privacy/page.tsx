import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/motion/Reveal";
import { TextReveal } from "@/components/ui/motion/TextReveal";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const isSk = locale === "sk";

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page max-w-3xl">
        <Reveal>
          <span className="kicker">{t("footer.legal")}</span>
        </Reveal>
        <h1 className="heading-lg mt-4">
          <TextReveal as="span" text={t("footer.privacy")} />
        </h1>
        <Reveal as="div" delay={0.15} className="prose prose-invert mt-8 space-y-5 text-ink-muted">
          {isSk ? (
            <>
              <p>
                Táto stránka sumarizuje, ako spracúvam vaše osobné údaje v súlade
                s GDPR (nariadenie EÚ 2016/679). Konkrétne znenie vám rád zašlem
                na vyžiadanie.
              </p>
              <h2 className="text-ink">Prevádzkovateľ</h2>
              <p>
                {site.name}, {t("brand.location")}. Kontakt: {site.email}.
              </p>
              <h2 className="text-ink">Aké údaje spracúvam</h2>
              <p>
                Len údaje, ktoré mi dobrovoľne pošlete cez kontaktný formulár
                (meno, email, prípadne firma a správa). Neprofilujem, nepredávam
                dáta tretím stranám.
              </p>
              <h2 className="text-ink">Ako dlho</h2>
              <p>
                Korešpondenciu uchovávam maximálne 24 mesiacov, alebo dovtedy,
                kým ma neinformujete, že si želáte jej vymazanie.
              </p>
              <h2 className="text-ink">Vaše práva</h2>
              <p>
                Máte právo na prístup, opravu, výmaz a prenositeľnosť svojich
                údajov. Stačí napísať na {site.email}.
              </p>
              <p className="text-xs text-ink-dim">
                Toto je stručná verzia. Pred spustením webu si prosím doplňte
                konkrétne znenie podľa vlastných procesov.
              </p>
            </>
          ) : (
            <>
              <p>
                This page summarises how I process your personal data under GDPR
                (EU Regulation 2016/679). I&apos;ll gladly share the full policy
                on request.
              </p>
              <h2 className="text-ink">Controller</h2>
              <p>
                {site.name}, {t("brand.location")}. Contact: {site.email}.
              </p>
              <h2 className="text-ink">What I process</h2>
              <p>
                Only data you voluntarily submit via the contact form (name,
                email, optional company and message). I don&apos;t profile and
                don&apos;t sell data to third parties.
              </p>
              <h2 className="text-ink">Retention</h2>
              <p>
                I keep correspondence for a maximum of 24 months, or until you
                ask me to delete it.
              </p>
              <h2 className="text-ink">Your rights</h2>
              <p>
                You have the right to access, rectify, erase and port your data.
                Just email {site.email}.
              </p>
              <p className="text-xs text-ink-dim">
                This is a short version. Please replace with your full policy
                before launch.
              </p>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
