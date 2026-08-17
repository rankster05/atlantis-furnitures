/**
 * Structured data helpers.
 *
 * The site-wide nodes — the business, the Organization and the WebSite — live
 * once, in index.html, so every page ships them identically. Everything in this
 * file is the *page-level* layer: a WebPage/CollectionPage node plus its
 * breadcrumb trail, wired back to those site-wide nodes by `@id` rather than
 * repeating them. That is what keeps one entity in Google's graph instead of
 * fourteen unrelated copies.
 */

export const SITE_URL = 'https://atlantisfurnitures.ro';

/** `@id`s of the nodes declared statically in index.html. */
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Project folders contain spaces ("/projects/AP AIR-U/..."), so image paths
 * have to be percent-encoded segment by segment before they go into JSON-LD.
 */
export const absoluteImage = (path: string): string =>
  path.startsWith('http')
    ? path
    : `${SITE_URL}${path.split('/').map(encodeURIComponent).join('/')}`;

type Crumb = { name: string; url: string };

/**
 * A breadcrumb trail. The last item deliberately keeps its `item` URL — Google
 * accepts a self-referencing final crumb and it makes the list valid on its own.
 */
export const breadcrumbList = (pageUrl: string, crumbs: Crumb[]) => ({
  '@type': 'BreadcrumbList',
  '@id': `${pageUrl}#breadcrumb`,
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: c.url,
  })),
});

interface PageNodeInput {
  /** Canonical URL of the page, with trailing slash. */
  url: string;
  name: string;
  description: string;
  /** Defaults to WebPage; /proiecte/ uses CollectionPage. */
  type?: 'WebPage' | 'CollectionPage' | 'ContactPage' | 'AboutPage';
  image?: string;
}

/** The page node itself, tied to the site-wide website + business entities. */
export const pageNode = ({
  url,
  name,
  description,
  type = 'WebPage',
  image,
}: PageNodeInput) => ({
  '@type': type,
  '@id': `${url}#webpage`,
  url,
  name,
  description,
  inLanguage: 'ro-RO',
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': BUSINESS_ID },
  ...(image ? { primaryImageOfPage: absoluteImage(image) } : {}),
});

/**
 * Assemble a page's `@graph`. Passing `crumbs` adds the breadcrumb trail and
 * points the page node at it, which is the link Google actually follows.
 */
export const pageGraph = (
  page: PageNodeInput & { crumbs?: Crumb[] },
  extraNodes: object[] = []
) => {
  const { crumbs, ...pageInput } = page;
  const node = pageNode(pageInput);
  const graph: object[] = [
    crumbs?.length
      ? { ...node, breadcrumb: { '@id': `${pageInput.url}#breadcrumb` } }
      : node,
  ];
  if (crumbs?.length) graph.push(breadcrumbList(pageInput.url, crumbs));
  graph.push(...extraNodes);
  return { '@context': 'https://schema.org', '@graph': graph };
};

/** Every internal page hangs off the homepage. */
export const HOME_CRUMB: Crumb = { name: 'Acasa', url: `${SITE_URL}/` };
export const PROJECTS_CRUMB: Crumb = {
  name: 'Proiecte',
  url: `${SITE_URL}/proiecte/`,
};
