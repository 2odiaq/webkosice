export type Project = {
  slug: string;
  year: number;
  duration: string;
  services: ("business" | "eshop" | "webapp" | "landing" | "redesign" | "seo")[];
  stack: string[];
  accent: "cyan" | "emerald" | "violet" | "rose";
  featured?: boolean;
  sample?: boolean;
  url?: string;
  sk: ProjectLocale;
  en: ProjectLocale;
};

export type ProjectLocale = {
  title: string;
  client: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: "amendment-studio",
    year: 2025,
    duration: "7 týždňov",
    services: ["eshop", "business"],
    stack: ["Next.js", "React", "Supabase", "TypeScript", "Tailwind CSS"],
    accent: "cyan",
    featured: true,
    url: "https://amendment.studio/",
    sk: {
      title: "Amendment Studio",
      client: "Kanadská odevná značka",
      category: "E-shop s limitovanými kolekciami",
      summary:
        "Online obchod pre kanadskú módnu značku Amendment, ktorá predáva limitované edície odevov s unikátnym dizajnom — každý kus v náklade len 35 kusov.",
      challenge:
        "Značka potrebovala e-shop, ktorý svojou estetikou odrazí premium a umelecký charakter kolekcií. Dôraz bol na rýchlosť, jednoduchý checkout pre medzinárodných zákazníkov a galérsku prezentáciu každého produktu ako samostatného diela.",
      solution:
        "Postavil som e-shop v Next.js s databázou a správou obrázkov cez Supabase. Produktové stránky sú riešené ako editoriálne kompozície s veľkými fotografiami a diskrétnou typografiou. Košík, účty a checkout sú optimalizované pre mobil a funkčné na globálnom trhu.",
      results: [
        "Rýchly, vizuálne výrazný e-shop nasadený v produkcii",
        "Plne responzívny dizajn od mobilu po desktop",
        "Administrácia produktov bez zásahu do kódu",
        "Optimalizácia obrázkov cez Supabase Storage",
      ],
      highlights: [
        "Editoriálny produktový layout",
        "Používateľské účty a história objednávok",
        "Medzinárodný checkout s USD",
        "Optimalizácia obrázkov a Core Web Vitals",
      ],
    },
    en: {
      title: "Amendment Studio",
      client: "Canadian fashion label",
      category: "Limited-edition e-commerce",
      summary:
        "Online store for Amendment, a Canadian fashion label selling limited-edition clothing — each design capped at 35 pieces.",
      challenge:
        "The brand needed an e-shop whose aesthetic matches the premium, artistic nature of its collections. The priorities were speed, a frictionless international checkout, and a gallery-style presentation treating every product as a standalone artwork.",
      solution:
        "I built the store in Next.js with Supabase for database and image storage. Product pages are designed as editorial compositions with large imagery and restrained typography. Cart, accounts and checkout are mobile-optimised and ready for a global audience.",
      results: [
        "Fast, visually striking e-shop shipped to production",
        "Fully responsive design from mobile to desktop",
        "Non-technical product administration",
        "Image optimisation via Supabase Storage",
      ],
      highlights: [
        "Editorial product layout",
        "User accounts and order history",
        "International USD checkout",
        "Optimised images and Core Web Vitals",
      ],
    },
  },
  {
    slug: "iuris-consulti",
    year: 2025,
    duration: "5 týždňov",
    services: ["business", "seo"],
    stack: ["Next.js", "React", "Tailwind CSS", "Netlify"],
    accent: "emerald",
    featured: true,
    url: "https://lurisconsulti-temporary.netlify.app/",
    sk: {
      title: "Iuris Consulti",
      client: "Advokátska kancelária Košice & Prešov",
      category: "Prezentačný web + SEO",
      summary:
        "Moderný prezentačný web pre advokátsku kanceláriu Iuris Consulti s pobočkami v Košiciach a Prešove. Dôraz na dôveryhodnosť, jasnú komunikáciu a rýchlu konverziu dopytov.",
      challenge:
        "Klient potreboval web, ktorý komunikuje serióznosť advokátskej profesie, no zároveň pôsobí moderne a prístupne. Bolo dôležité zrozumiteľne predstaviť právne oblasti, tím advokátov, proces spolupráce a FAQ — a konvertovať návštevníka na konzultáciu.",
      solution:
        "Navrhol som informačnú architektúru okolo právnych oblastí a procesu spolupráce. Každá oblasť a člen tímu má vlastnú sekciu s detailom. Pridal som štruktúrované FAQ, referencie klientov a kontaktný formulár s priamym napojením na email kancelárie.",
      results: [
        "Jasná prezentácia 8 právnych oblastí",
        "Detailné profily advokátov so špecializáciami",
        "FAQ sekcia znižujúca dopyty o bežné otázky",
        "Formulár s priamou cestou k úvodnej konzultácii",
      ],
      highlights: [
        "Stránky pre každú právnu oblasť",
        "Profily advokátov s reg. SAK číslami",
        "Proces spolupráce krok po kroku",
        "Viacerá forma kontaktu (tel, email, formulár)",
      ],
    },
    en: {
      title: "Iuris Consulti",
      client: "Law firm, Kosice & Prešov",
      category: "Presentation site + SEO",
      summary:
        "Modern presentation site for the Iuris Consulti law firm with offices in Kosice and Prešov. Focused on trust, clear communication and converting enquiries quickly.",
      challenge:
        "The client needed a site that communicates the gravitas of a law practice while still feeling modern and approachable. The priority was clearly introducing practice areas, the team of lawyers, the working process and FAQs — and turning visitors into consultation requests.",
      solution:
        "I designed the information architecture around practice areas and the working process. Each area and team member has a dedicated section with detail. I added a structured FAQ, client testimonials and a contact form wired directly to the firm's email.",
      results: [
        "Clear presentation of 8 practice areas",
        "Detailed lawyer profiles with specialisations",
        "FAQ section reducing routine enquiries",
        "Form with a direct route to initial consultation",
      ],
      highlights: [
        "Dedicated page per practice area",
        "Lawyer profiles with SAK registration numbers",
        "Step-by-step working process",
        "Multiple contact channels (phone, email, form)",
      ],
    },
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
