export const faqKeys = [
  "timeline",
  "price",
  "ownership",
  "hosting",
  "support",
  "cms",
] as const;

export type FaqKey = (typeof faqKeys)[number];
