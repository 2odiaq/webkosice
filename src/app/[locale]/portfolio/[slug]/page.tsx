import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { projects, getProjectBySlug } from "@/content/projects";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/motion/Reveal";
import { TextReveal } from "@/components/ui/motion/TextReveal";
import { CTA } from "@/components/sections/CTA";
import { cn } from "@/lib/cn";

const ACCENT_GRADIENTS: Record<string, string> = {
  cyan: "from-cyan-500/40 via-cyan-500/10 to-transparent",
  emerald: "from-emerald-500/40 via-emerald-500/10 to-transparent",
  violet: "from-violet-500/40 via-violet-500/10 to-transparent",
  rose: "from-rose-500/40 via-rose-500/10 to-transparent",
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const content = project[locale];
  return {
    title: content.title,
    description: content.summary,
    alternates: { canonical: `/${locale}/portfolio/${slug}` },
    openGraph: {
      title: content.title,
      description: content.summary,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectInner slug={slug} />;
}

function ProjectInner({ slug }: { slug: string }) {
  const t = useTranslations();
  const locale = useLocale() as "sk" | "en";
  const project = getProjectBySlug(slug);
  if (!project) return null;
  const content = project[locale];

  return (
    <article>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 animate-gradient-pan bg-gradient-to-br bg-[length:200%_200%]",
            ACCENT_GRADIENTS[project.accent],
          )}
        />
        <div
          aria-hidden
          className="absolute inset-0 grid-bg opacity-70"
          style={{ maskImage: undefined }}
        />
        <div className="container-page relative pt-10 pb-12 sm:pt-14 sm:pb-16">
          <Link
            href="/portfolio"
            className="group/link inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover/link:-translate-x-0.5" />
            {t("portfolio.detail.backToAll")}
          </Link>
          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.sample ? (
                <Badge tone="accent">{t("portfolio.sampleBadge")}</Badge>
              ) : null}
              <span className="font-mono text-xs text-ink-dim">
                {project.year} · {content.category}
              </span>
            </div>
          </Reveal>
          <h1 className="heading-xl mt-6 max-w-3xl">
            <TextReveal as="span" text={content.title} />
          </h1>
          <Reveal delay={0.2}>
            <p className="text-lead mt-5 max-w-2xl">{content.summary}</p>
          </Reveal>
          <dl className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            <Reveal delay={0.3}>
              <Fact
                label={t("portfolio.detail.client")}
                value={content.client}
              />
            </Reveal>
            <Reveal delay={0.36}>
              <Fact
                label={t("portfolio.detail.year")}
                value={String(project.year)}
              />
            </Reveal>
            <Reveal delay={0.42}>
              <Fact
                label={t("portfolio.detail.duration")}
                value={project.duration}
              />
            </Reveal>
          </dl>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-12">
            <Reveal>
              <div>
                <div className="kicker">01 · {t("portfolio.detail.challenge")}</div>
                <p className="mt-4 text-base text-ink-muted sm:text-lg">
                  {content.challenge}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div>
                <div className="kicker">02 · {t("portfolio.detail.solution")}</div>
                <p className="mt-4 text-base text-ink-muted sm:text-lg">
                  {content.solution}
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {content.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2.5 rounded-lg border border-border bg-bg-soft px-4 py-3 text-sm text-ink-muted"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        aria-hidden
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <div className="kicker">03 · {t("portfolio.detail.results")}</div>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {content.results.map((r) => (
                    <li
                      key={r}
                      className="relative overflow-hidden rounded-xl border border-accent/30 bg-accent/5 px-5 py-4"
                    >
                      <div
                        aria-hidden
                        className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-accent/20 to-transparent"
                      />
                      <span className="relative text-sm font-medium text-ink">
                        {r}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
          <aside className="space-y-6">
            <div className="sticky top-24">
              <div className="rounded-xl border border-border bg-bg-soft p-6">
                <div className="kicker">{t("portfolio.detail.stack")}</div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-border bg-bg px-3 py-1 font-mono text-xs text-ink-muted"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-border pt-5">
                  <div className="kicker">{t("portfolio.detail.services")}</div>
                  <ul className="mt-4 space-y-1.5 text-sm text-ink-muted">
                    {project.services.map((s) => (
                      <li key={s} className="flex items-center gap-2">
                        <span
                          aria-hidden
                          className="h-1 w-1 rounded-full bg-accent"
                        />
                        {t(`services.items.${s}.title`)}
                      </li>
                    ))}
                  </ul>
                </div>
                {project.url ? (
                  <div className="mt-6 border-t border-border pt-5">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-4 py-2.5 text-sm font-medium text-accent hover:border-accent hover:bg-accent hover:text-bg"
                    >
                      {t("portfolio.visitSite")}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                ) : null}
                <div className="mt-3 border-t border-border pt-5">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-bg hover:bg-accent-soft"
                  >
                    {t("services.ctaLabel")}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CTA />
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-bg-soft/60 px-4 py-3">
      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim">
        {label}
      </div>
      <div className="mt-1 text-sm text-ink">{value}</div>
    </div>
  );
}
