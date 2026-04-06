import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  image?: string;
  schema?: object;
  keywords?: string;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description,
  image = "/projects/AP AIR-U/design-interior-apartament-modern-unirii-atlantis-furnitures.webp",
  schema,
  canonicalUrl,
  keywords = "mobila la comanda, bucatarii mdf, dressinguri, amenajari interioare, mobila premium, atlantis furnitures",
  noindex = false
}) => {
  const siteTitle = "Atlantis Furnitures";
  const fullTitle = title.includes('|') ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
