export type ShowcaseItem = {
  key:
    | "ecommerce"
    | "legal"
    | "cafe"
    | "restaurant"
    | "fitness"
    | "realestate"
    | "agency"
    | "startup";
  image: string;
  tag: string;
};

export const showcaseItems: ShowcaseItem[] = [
  {
    key: "ecommerce",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=960&auto=format&q=80",
    tag: "Next.js · Stripe",
  },
  {
    key: "legal",
    image:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=960&auto=format&q=80",
    tag: "Presentation · SEO",
  },
  {
    key: "cafe",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=960&auto=format&q=80",
    tag: "CMS · Menu",
  },
  {
    key: "restaurant",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=960&auto=format&q=80",
    tag: "Bookings · i18n",
  },
  {
    key: "fitness",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=960&auto=format&q=80",
    tag: "Memberships",
  },
  {
    key: "realestate",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=960&auto=format&q=80",
    tag: "Listings · Maps",
  },
  {
    key: "agency",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=960&auto=format&q=80",
    tag: "Portfolio · CMS",
  },
  {
    key: "startup",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=960&auto=format&q=80",
    tag: "SaaS · Dashboard",
  },
];
