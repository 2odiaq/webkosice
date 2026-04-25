import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/sections/Hero";
import { Showcase } from "@/components/sections/Showcase";
import { Services } from "@/components/sections/Services";
import { Pricing } from "@/components/sections/Pricing";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Stack } from "@/components/sections/Stack";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Aurora } from "@/components/ui/motion/Aurora";
import { CursorGlow } from "@/components/ui/motion/CursorGlow";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <section className="relative flex min-h-[calc(100svh-6rem)] items-center overflow-hidden sm:min-h-[calc(100svh-7rem)]">
        {/* Animated aurora orbs drifting behind the hero */}
        <Aurora variant="hero" />
        {/* Cursor-following glow (desktop only) */}
        <CursorGlow size={600} color="rgba(34,211,238,0.18)" />
        {/* Grid backdrop — fades toward the bottom so the section blends into Showcase */}
        <div
          aria-hidden
          className="absolute inset-0 grid-bg"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
          }}
        />
        {/* Accent glow at the top of the hero */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[720px] bg-radial-fade"
        />
        <Hero />
      </section>
      <Showcase />
      <Services />
      <Pricing />
      <Projects limit={4} />
      <Process />
      <Stack />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
