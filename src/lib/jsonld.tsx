import { site } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

type Props = { locale: Locale };

export function LocalBusinessJsonLd({ locale }: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#org`,
    name: site.name,
    url: `${site.url}/${locale}`,
    email: site.email,
    telephone: site.phone,
    image: `${site.url}/opengraph-image`,
    priceRange: "€€",
    description:
      locale === "sk"
        ? "Tvorba webov, e-shopov a webových aplikácií na mieru v Košiciach."
        : "Custom websites, e-shops and web applications built in Kosice.",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.country,
    },
    areaServed: { "@type": "Country", name: "Slovakia" },
    foundingDate: `${site.foundedYear}-01-01`,
    sameAs: Object.values(site.social),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
