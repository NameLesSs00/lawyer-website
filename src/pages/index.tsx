import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhatWeOffer from "@/components/WhatWeOffer";
import LatestNews from "@/components/LatestNews";
import ClientsSection from "@/components/ClientsSection";
import StatsSection from "@/components/StatsSection";
import BreakingNews from "@/components/BreakingNews";
import GovLinksSection from "@/components/GovLinksSection";

const Index = () => {
  return (
    <>
      <BreakingNews />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <WhatWeOffer />
      <GovLinksSection />
      <LatestNews />
      <ClientsSection />
    </>
  );
};

export default Index;
