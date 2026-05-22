import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  image?: string;
  schema?: object;
  noindex?: boolean;
}

const SITE_URL = 'https://atlantisfurnitures.ro';
const DEFAULT_IMAGE =
  '/projects/AP AIR-U/design-interior-apartament-modern-unirii-atlantis-furnitures.webp';

/**
 * Ensure exactly one <meta> tag with the given attribute key exists in <head>,
 * and that its `content` matches the value. Removes duplicates left over from
 * the prerender so SPA navigation always shows the current page's metadata.
 */
const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  const selector = `meta[${attr}="${key}"]`;
  const existing = document.head.querySelectorAll(selector);
  existing.forEach((el, idx) => {
    if (idx > 0) el.remove();
  });
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

/** Same as setMeta, but for <link rel="..."> tags (e.g. canonical). */
const setLink = (rel: string, href: string) => {
  const selector = `link[rel="${rel}"]`;
  const existing = document.head.querySelectorAll(selector);
  existing.forEach((el, idx) => {
    if (idx > 0) el.remove();
  });
  let tag = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = DEFAULT_IMAGE,
  canonicalUrl,
  noindex = false,
}) => {
  const siteTitle = 'Atlantis Furnitures';
  const fullTitle = title.includes('|') ? title : `${title} | ${siteTitle}`;
  const absoluteImage = image.startsWith('http')
    ? image
    : `${SITE_URL}${image}`;

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Title
    if (document.title !== fullTitle) {
      document.title = fullTitle;
    }

    // Standard meta
    setMeta('name', 'description', description);
    setMeta(
      'name',
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', absoluteImage);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', 'website');

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', absoluteImage);

    // Canonical
    setLink('canonical', canonicalUrl);
  }, [
    fullTitle,
    description,
    canonicalUrl,
    absoluteImage,
    noindex,
  ]);

  return null;
};

export default SEO;
