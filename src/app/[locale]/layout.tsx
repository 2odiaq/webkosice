import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";
import { LocalBusinessJsonLd } from "@/lib/jsonld";
import { ScrollProgress } from "@/components/ui/motion/ScrollProgress";
import { BackToTop } from "@/components/ui/motion/BackToTop";
import { PageTransition } from "@/components/ui/motion/PageTransition";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });
  return {
    metadataBase: new URL(site.url),
    title: {
      default: t("title"),
      template: `%s · ${site.name}`,
    },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        sk: "/sk",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      siteName: site.name,
      locale: locale === "sk" ? "sk_SK" : "en_US",
      url: `/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocalBusinessJsonLd locale={locale} />
      <ScrollProgress />
      <div className="relative flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </div>
      <BackToTop />
    </NextIntlClientProvider>
  );
}
