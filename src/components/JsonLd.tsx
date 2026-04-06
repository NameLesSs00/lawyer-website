import Head from "next/head";

const JsonLd = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "مكتب الأستاذ ميلاد يعقوب بولس للمحاماة والاستشارات القانونية",
    "alternateName": "ميلاد يعقوب بولس",
    "url": "https://miladyacoub-law.com",
    "logo": "https://miladyacoub-law.com/images/hero.jpeg", // Using hero image as placeholder logo
    "image": "https://miladyacoub-law.com/images/hero.jpeg",
    "description": "مكتب قانوني متخصص في الجنايات، النقض، والمنازعات العقارية والجرائم الاقتصادية في الغردقة والبحر الأحمر.",
    "telephone": "+201229149719",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "الغردقة",
      "addressRegion": "البحر الأحمر",
      "addressCountry": "EG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 27.2574,
      "longitude": 33.8129
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "09:00",
        "closes": "21:00"
      }
    ],
    "priceRange": "$$",
    "sameAs": [
      "https://maps.app.goo.gl/UpX2ZhYrPyQvrmW97",
      "https://wa.me/201229149719"
    ]
  };

  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "ميلاد يعقوب بولس",
    "jobTitle": "محام بالنقض والدستورية العليا",
    "description": "باحث في قانون الإجراءات الجنائية وقانون الإثبات في المواد المدنية. متخصص في الجنايات والمنازعات العقارية والجرائم الاقتصادية.",
    "url": "https://miladyacoub-law.com",
    "image": "https://miladyacoub-law.com/images/hero.jpeg",
    "affiliation": {
      "@type": "Organization",
      "name": "مكتب ميلاد يعقوب بولس للمحاماة"
    },
    "knowsAbout": [
      "الجنايات",
      "النقض",
      "المنازعات العقارية",
      "الجرائم الاقتصادية",
      "جرائم الإنترنت",
      "الأحوال الشخصية"
    ]
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
      />
    </Head>
  );
};

export default JsonLd;
