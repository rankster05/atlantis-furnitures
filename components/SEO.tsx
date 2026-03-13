import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  schema?: object;
  canonicalUrl?: string;
  keywords?: string;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "Mobila la comanda premium in Pitesti si Bucuresti. Bucatarii MDF, Dressinguri, Amenajari interioare complete.",
  image = "/projects/AP AIR-U/design-interior-apartament-modern-unirii-atlantis-furnitures.webp",
  schema,
  canonicalUrl,
  keywords = "mobila la comanda, bucatarii mdf, dressinguri, amenajari interioare, mobila bucuresti, mobila pitesti, atlantis furnitures",
  noindex = false
}) => {
  const siteTitle = "Atlantis Furnitures";
  const fullTitle = title.includes('|') ? title : (title === "Home" ? `Mobilier la Comanda Bucuresti | ${siteTitle}` : `${title} | ${siteTitle}`);
  // Use a fallback URL if window is undefined during build time (SSR safe)
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://atlantisfurnitures.ro');

  // Default Schema.org Structured Data for Local Business
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "name": "Atlantis Furnitures",
    "image": [image],
    "description": description,
    "url": "https://atlantisfurnitures.ro",
    "telephone": "+40732717666",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Aleea Argesului nr. 70",
      "addressLocality": "Budeasa Mare",
      "addressRegion": "Arges",
      "addressCountry": "RO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 44.9189,
      "longitude": 24.8392
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "19:00"
      }
    ],
    "areaServed": ["București", "Ilfov", "Argeș", "Pitești"],
    "priceRange": "$$$",
    "sameAs": [
      "https://www.facebook.com/profile.php?id=100057578914043",
      "https://www.instagram.com/atlantis_furnitures66/"
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Atlantis Furnitures",
    "url": "https://atlantisfurnitures.ro",
    "logo": "https://atlantisfurnitures.ro/vite.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+40732717666",
      "contactType": "customer service",
      "areaServed": "RO",
      "availableLanguage": "Romanian"
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=100057578914043",
      "https://www.instagram.com/atlantis_furnitures66/"
    ]
  };

  const structuredData = schema || [localBusinessSchema, organizationSchema];

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:locale" content="ro_RO" />
      <meta property="og:site_name" content="Atlantis Furnitures" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@atlantisfurnitures" />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;