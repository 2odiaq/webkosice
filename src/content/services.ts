import type { LucideIcon } from "lucide-react";
import {
  Globe,
  ShoppingCart,
  Boxes,
  Rocket,
  RefreshCw,
  Gauge,
} from "lucide-react";

export type ServiceKey =
  | "business"
  | "eshop"
  | "webapp"
  | "landing"
  | "redesign"
  | "seo";

export type Service = {
  key: ServiceKey;
  slug: string;
  icon: LucideIcon;
  accent: "cyan" | "emerald";
  number: string;
};

export const services: Service[] = [
  { key: "business", slug: "weby", icon: Globe, accent: "cyan", number: "01" },
  {
    key: "eshop",
    slug: "e-shopy",
    icon: ShoppingCart,
    accent: "emerald",
    number: "02",
  },
  { key: "webapp", slug: "aplikacie", icon: Boxes, accent: "cyan", number: "03" },
  { key: "landing", slug: "landing", icon: Rocket, accent: "emerald", number: "04" },
  {
    key: "redesign",
    slug: "redesign",
    icon: RefreshCw,
    accent: "cyan",
    number: "05",
  },
  { key: "seo", slug: "seo", icon: Gauge, accent: "emerald", number: "06" },
];
