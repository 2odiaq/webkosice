import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiSupabase,
  SiStripe,
  SiSanity,
  SiVercel,
  SiFigma,
} from "react-icons/si";

export type StackItem = {
  name: string;
  category: "frontend" | "backend" | "tooling" | "design";
  icon: IconType;
};

export const stack: StackItem[] = [
  { name: "Next.js", category: "frontend", icon: SiNextdotjs },
  { name: "React", category: "frontend", icon: SiReact },
  { name: "TypeScript", category: "frontend", icon: SiTypescript },
  { name: "Tailwind CSS", category: "frontend", icon: SiTailwindcss },
  { name: "Node.js", category: "backend", icon: SiNodedotjs },
  { name: "PostgreSQL", category: "backend", icon: SiPostgresql },
  { name: "Prisma", category: "backend", icon: SiPrisma },
  { name: "Supabase", category: "backend", icon: SiSupabase },
  { name: "Stripe", category: "backend", icon: SiStripe },
  { name: "Sanity", category: "tooling", icon: SiSanity },
  { name: "Vercel", category: "tooling", icon: SiVercel },
  { name: "Figma", category: "design", icon: SiFigma },
];
