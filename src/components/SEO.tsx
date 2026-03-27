import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const SEO = ({ 
  title = "مكتب ميلاد يعقوب بولس | محاماة واستشارات قانونية", 
  description = "مكتب ميلاد يعقوب بولس للمحاماة والاستشارات القانونية المتخصصة في القضايا الجنائية، المدنية، الجرائم الاقتصادية، وجرائم الإنترنت.", 
  keywords = "محامي, استشارات قانونية, ميلاد يعقوب بولس, قضايا جنائية, جرائم اقتصادية, جرائم انترنت, محامي بالنقض" 
}: SEOProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ar_EG" />
      <meta property="og:site_name" content="Milad Yacoub Boulos Law Firm" />
      <meta property="og:image" content="/images/profile.jpeg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="/images/profile.jpeg" />
    </Head>
  );
};

export default SEO;
