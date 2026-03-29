import HeroSection from "@/components/HeroSection";
import WhatWeOffer from "@/components/WhatWeOffer";
import LatestNews from "@/components/LatestNews";
import ClientsSection from "@/components/ClientsSection";
import BreakingNews from "@/components/BreakingNews";

const Index = () => {
  return (
    <>
      <BreakingNews />
      <HeroSection />
      <WhatWeOffer />
      <ClientsSection />
      <LatestNews />
    </>
  );
};

export default Index;
