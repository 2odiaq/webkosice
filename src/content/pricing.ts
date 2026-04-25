import type { LucideIcon } from "lucide-react";
import { Rocket, Star, Crown } from "lucide-react";

export type PlanKey = "basic" | "standard" | "premium";

export type Plan = {
  key: PlanKey;
  icon: LucideIcon;
  popular?: boolean;
  accent: "cyan" | "emerald" | "violet";
};

export const plans: Plan[] = [
  { key: "basic", icon: Rocket, accent: "emerald" },
  { key: "standard", icon: Star, popular: true, accent: "cyan" },
  { key: "premium", icon: Crown, accent: "violet" },
];
