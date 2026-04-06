import Head from "next/head";
import { useRouter } from "next/router";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  article?: boolean;
}

const SEO = ({ 
  title = "ميلاد يعقوب بولس | محامي في الغردقة | استشارات قانونية البحر الأحمر", 
  description = "مكتب الأستاذ ميلاد يعقوب بولس للمحاماة والاستشارات القانونية بالغردقة. محامٍ بالنقض والدستورية العليا متخصص في الجنايات، النقض، المنازعات العقارية، والجرائم الاقتصادية في البحر الأحمر.", 
  keywords = "محامي في الغردقة, محامي البحر الأحمر, ميلاد بولس, محامي جنائي الغردقة, استشارات قانونية الغردقة, محامي نقض, مكتب محاماة الغردقة, محامي عقارات البحر الأحمر, ميلاد يعقوب بولس",
  image = "/images/hero.jpeg",
  article = false
}: SEOProps) => {
  const router = useRouter();
  const siteUrl = "https://miladyacoub-law.com"; // Updated domain
  const canonicalUrl = `${siteUrl}${router.asPath}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Language and Region */}
      <meta name="language" content="Arabic" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="ميلاد يعقوب بولس" />

      {/* Local SEO Meta Tags */}
      <meta name="geo.region" content="EG-BA" />
      <meta name="geo.placename" content="Hurghada" />
      <meta name="geo.position" content="27.2574;33.8129" />
      <meta name="ICBM" content="27.2574, 33.8129" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="ar_EG" />
      <meta property="og:site_name" content="مكتب ميلاد يعقوب بولس للمحاماة" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${image}`} />

      {/* Mobile Header Color */}
      <meta name="theme-color" content="#c5a059" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
    </Head>
  );
};

export default SEO;
