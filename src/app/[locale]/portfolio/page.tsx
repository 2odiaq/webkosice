import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { projects } from "@/content/projects";
import { Reveal } from "@/components/ui/motion/Reveal";
import { TiltCard } from "@/components/ui/motion/TiltCard";
import { TextReveal } from "@/components/ui/motion/TextReveal";
import { Badge } from "@/components/ui/Badge";
import { CTA } from "@/components/sections/CTA";
import { cn } from "@/lib/cn";

const ACCENT_GRADIENTS: Record<string, string> = {
  cyan: "from-cyan-500/30 via-cyan-500/5 to-transparent",
  emerald: "from-emerald-500/30 via-emerald-500/5 to-transparent",
  violet: "from-violet-500/30 via-violet-500/5 to-transparent",
  rose: "from-rose-500/30 via-rose-500/5 to-transparent",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `/${locale}/portfolio` },
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PortfolioInner />;
}

function PortfolioInner() {
  const t = useTranslations();
  const locale = useLocale() as "sk" | "en";

  return (
    <>
      <section className="relative overflow-hidden pt-14 sm:pt-20">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[400px] bg-radial-fade"
        />
        <div className="container-page relative">
          <Reveal>
            <span className="kicker">{t("portfolio.hero.kicker")}</span>
          </Reveal>
          <h1 className="heading-xl mt-5 max-w-3xl">
            <TextReveal as="span" text={t("portfolio.hero.title")} />
          </h1>
          <Reveal delay={0.15}>
            <p className="text-lead mt-5 max-w-2xl">
              {t("portfolio.hero.subtitle")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => {
              const content = project[locale];
              return (
                <Reveal
                  key={project.slug}
                  delay={i * 0.06}
                  variant={i % 2 === 0 ? "fadeRight" : "fadeLeft"}
                >
                  <TiltCard max={4} scale={1.01} className="h-full">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="group block h-full"
                    >
                      <article className="card card-hover card-sheen h-full overflow-hidden p-0">
                        <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-bg-elev">
                          <div
                            aria-hidden
                            className={cn(
                              "absolute inset-0 bg-gradient-to-br bg-[length:200%_200%] animate-gradient-pan transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]",
                              ACCENT_GRADIENTS[project.accent],
                            )}
                          />
                          <div
                            aria-hidden
                            className="absolute inset-0 grid-bg opacity-60 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
                            style={{ maskImage: undefined }}
                          />
                          <div className="absolute inset-0 flex items-end p-6">
                            <div>
                              <div className="font-mono text-xs text-ink-dim">
                                {project.year} · {content.category}
                              </div>
                              <div className="mt-1 text-2xl font-semibold text-ink">
                                {content.title}
                              </div>
                            </div>
                          </div>
                          {project.sample ? (
                            <div className="absolute right-4 top-4">
                              <Badge tone="accent">
                                {t("portfolio.sampleBadge")}
                              </Badge>
                            </div>
                          ) : null}
                        </div>
                        <div className="p-6">
                          <p className="text-sm text-ink-muted">
                            {content.summary}
                          </p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {project.stack.slice(0, 4).map((s) => (
                              <span
                                key={s}
                                className="rounded-full border border-border bg-bg px-2.5 py-1 font-mono text-[11px] text-ink-muted"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                          <div className="mt-6 flex items-center gap-2 text-sm text-accent transition-colors group-hover:text-accent-soft">
                            {t("portfolio.viewProject")}
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-12" />
                          </div>
                        </div>
                      </article>
                    </Link>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
