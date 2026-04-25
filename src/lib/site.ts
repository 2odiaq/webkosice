export const site = {
  name: "WebKosice",
  shortName: "WebKosice",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://webkosice.sk",
  email: "olegpelipenko1505@gmail.com",
  phone: "+421 952 050 656",
  location: {
    city: "Košice",
    region: "Košický kraj",
    country: "SK",
  },
  social: {
    instagram: "https://www.instagram.com/webkosice/",
  },
  foundedYear: 2023,
} as const;

export type SiteConfig = typeof site;
