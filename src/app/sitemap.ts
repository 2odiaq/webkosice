import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { projects } from "@/content/projects";
import { site } from "@/lib/site";

const STATIC_PATHS = [
  "",
  "/services",
  "/portfolio",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      urls.push({
        url: `${site.url}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${site.url}/${l}${path}`]),
          ),
        },
      });
    }
    for (const project of projects) {
      urls.push({
        url: `${site.url}/${locale}/portfolio/${project.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return urls;
}
