import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhatWeOffer from "@/components/WhatWeOffer";
import LatestNews from "@/components/LatestNews";
import ClientsSection from "@/components/ClientsSection";
import StatsSection from "@/components/StatsSection";
import BreakingNews from "@/components/BreakingNews";
import GovLinksSection from "@/components/GovLinksSection";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <>
      <SEO 
        title="ميلاد يعقوب بولس | محامي في الغردقة | استشارات قانونية البحر الأحمر"
        description="المكتب الرائد للمحاماة والاستشارات القانونية في الغردقة والبحر الأحمر. خبرة عريقة في القضايا الجنائية، النقض، المنازعات العقارية والجرائم الاقتصادية."
        keywords="محامي في الغردقة، محامي البحر الاحمر، ميلاد بولس، مكتب محاماة الغردقة، استشارات قانونية، محامي جنائي"
      />
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
