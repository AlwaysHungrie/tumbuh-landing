import { FinalCtaSection } from "@/components/landing/FinalCtaSection";
import { HeroSection } from "@/components/landing/Hero/HeroSection";
import { IdeaSection } from "@/components/landing/Idea/IdeaSection";
import { LayersSection } from "@/components/landing/Architecture/LayersSection";
import { ScenarioSection } from "@/components/landing/Participate/ScenarioSection";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteNav } from "@/components/landing/SiteNav";
import { SmoothAnchorScroll } from "@/components/landing/SmoothAnchorScroll";

export default function Page() {
  return (
    <div id="top" className="min-h-full w-full">
      <SmoothAnchorScroll />
      <SiteNav />
      <HeroSection />
      <IdeaSection />
      <LayersSection />
      <ScenarioSection />
      <FinalCtaSection />
      <SiteFooter />
    </div>
  );
}
