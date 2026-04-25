import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/motion/Reveal";
import { TextReveal } from "@/components/ui/motion/TextReveal";

export default async function TermsPage({
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
          <TextReveal as="span" text={t("footer.terms")} />
        </h1>
        <Reveal as="div" delay={0.15} className="prose prose-invert mt-8 space-y-5 text-ink-muted">
          {isSk ? (
            <>
              <p>
                Táto stránka obsahuje rámcové obchodné podmienky pre dodávku
                web-developerských služieb. Konkrétna zmluva sa pri každom
                projekte dohadnuje individuálne.
              </p>
              <h2 className="text-ink">Dodávateľ</h2>
              <p>
                {site.name}, {t("brand.location")}. Kontakt: {site.email}.
              </p>
              <h2 className="text-ink">Rozsah služieb</h2>
              <p>
                Dizajn, vývoj a údržba webových stránok, e-shopov, webových
                aplikácií a landing pages podľa špecifikácie dohodnutej v
                objednávke.
              </p>
              <h2 className="text-ink">Cena a platba</h2>
              <p>
                Cena je uvedená v ponuke pred zahájením práce. Štandardne 50 %
                pri objednávke, 50 % pri spustení.
              </p>
              <h2 className="text-ink">Autorské práva</h2>
              <p>
                Po uhradení faktúry nadobúdate plné vlastníctvo kódu, dizajnu a
                obsahu vytvoreného pre váš projekt.
              </p>
              <p className="text-xs text-ink-dim">
                Toto je skrátená ukážka. Pred spustením si prosím doplňte plné
                znenie VOP podľa vašej praxe.
              </p>
            </>
          ) : (
            <>
              <p>
                This page provides a summary of my terms for delivering web
                development services. A specific contract is agreed
                individually per project.
              </p>
              <h2 className="text-ink">Supplier</h2>
              <p>
                {site.name}, {t("brand.location")}. Contact: {site.email}.
              </p>
              <h2 className="text-ink">Scope of services</h2>
              <p>
                Design, development and maintenance of websites, e-shops, web
                applications and landing pages per the scope agreed in the
                order.
              </p>
              <h2 className="text-ink">Price and payment</h2>
              <p>
                Price is stated in the quote before work starts. Standard terms
                are 50% at order, 50% at launch.
              </p>
              <h2 className="text-ink">Intellectual property</h2>
              <p>
                Upon full payment you own the code, design and content created
                for your project.
              </p>
              <p className="text-xs text-ink-dim">
                This is a short placeholder. Please replace with your full
                terms before launch.
              </p>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
