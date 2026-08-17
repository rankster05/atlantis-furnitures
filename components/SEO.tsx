import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  /** Omit only on pages that have no indexable URL of their own (the 404). */
  canonicalUrl?: string;
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

/** Drop a meta tag entirely (all copies of it), if present. */
const removeMeta = (attr: 'name' | 'property', key: string) => {
  document.head.querySelectorAll(`meta[${attr}="${key}"]`).forEach((el) => el.remove());
};

const SCHEMA_ATTR = 'data-seo-schema';

/**
 * Inject the page-level JSON-LD graph. Tagged with `data-seo-schema` so the
 * copy left behind by the prerender (or by a previous route) is removed first
 * — the page must never ship two competing graphs for the same URL.
 */
const setSchema = (json: string) => {
  document.head.querySelectorAll(`script[${SCHEMA_ATTR}]`).forEach((el) => el.remove());
  if (!json) return;
  const tag = document.createElement('script');
  tag.type = 'application/ld+json';
  tag.setAttribute(SCHEMA_ATTR, '');
  tag.textContent = json;
  document.head.appendChild(tag);
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
  schema,
  noindex = false,
}) => {
  const siteTitle = 'Atlantis Furnitures';
  const fullTitle = title.includes('|') ? title : `${title} | ${siteTitle}`;
  // Project folders contain spaces ("/projects/AP AIR-U/..."), so the path has
  // to be percent-encoded segment by segment. Without this the og:image and
  // twitter:image URLs shipped with raw spaces in them, which social crawlers
  // and card validators reject.
  const absoluteImage = image.startsWith('http')
    ? image
    : `${SITE_URL}${image.split('/').map(encodeURIComponent).join('/')}`;
  // Serialize once so the effect keys off a stable string instead of a new
  // object identity on every render.
  const schemaJson = schema ? JSON.stringify(schema) : '';

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
    if (canonicalUrl) setMeta('property', 'og:url', canonicalUrl);
    else removeMeta('property', 'og:url');
    setMeta('property', 'og:type', 'website');

    // og:image:width/height describe the file we just pointed at, and we do not
    // know its dimensions in the browser. Stale numbers are worse than none —
    // they make crawlers crop against a box the image does not have — so the
    // pair is dropped here and re-injected per route, from the real file
    // header, by prerender.mjs. Crawlers only ever read that prerendered HTML.
    removeMeta('property', 'og:image:width');
    removeMeta('property', 'og:image:height');

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', absoluteImage);

    // Canonical. A page without an indexable URL of its own declares none,
    // rather than pointing at a URL that does not resolve.
    if (canonicalUrl) {
      setLink('canonical', canonicalUrl);
    } else {
      document.head.querySelectorAll('link[rel="canonical"]').forEach((el) => el.remove());
    }

    // Page-level structured data (optional, per route)
    setSchema(schemaJson);
  }, [
    fullTitle,
    description,
    canonicalUrl,
    absoluteImage,
    schemaJson,
    noindex,
  ]);

  return null;
};

export default SEO;
