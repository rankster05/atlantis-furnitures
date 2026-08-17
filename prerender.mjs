import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');
const SITE = 'https://atlantisfurnitures.ro';
const PORT = 4498;

const encodeOgImage = (p) => `${SITE}${p.split('/').map(encodeURIComponent).join('/')}`;

// title + description are used ONLY by the meta-only fallback (when no browser
// is available). The Puppeteer path captures the real runtime <head> set by
// the SEO component, so these stay in sync with the components.
const routes = [
  {
    path: '/',
    title: 'Mobilier la Comanda Bucuresti | Atlantis Furnitures',
    description: 'Mobilier la comanda din MDF si PAL pentru Bucuresti si Ilfov: bucatarii, dressinguri, livinguri, office. Atelier propriu, montaj inclus, oferta in 24h.',
    // The OG image stays the full-resolution still (social crawlers want the
    // big one), while the LCP is a separate, much lighter hero poster crop.
    image: '/projects/AP AIR-V/hero-living-victoriei-hd.webp',
    poster: '/projects/AP AIR-V/hero-poster.webp',
  },
  {
    path: '/servicii',
    title: 'Servicii si Parteneri Mobilier la Comanda | Atlantis',
    description: 'Reteaua cu care executam fiecare proiect de mobilier la comanda: studiouri de arhitectura, furnizori de finisaje si feronerie premium Blum si Hettich.',
    image: '/projects/S House/s-house-living-bucatarie-open-space-mdf-furnir-pipera.webp',
  },
  {
    path: '/contact',
    title: 'Contact Mobilier la Comanda Bucuresti | Atlantis Furnitures',
    description: 'Contacteaza Atlantis Furnitures pentru mobilier la comanda in Bucuresti si Ilfov. Telefon 0732 717 666, WhatsApp, formular online. Oferta gratuita in 24h.',
    image: '/projects/AP AIR-U/design-interior-apartament-modern-unirii-atlantis-furnitures.webp',
  },
  {
    path: '/proiecte',
    title: 'Portofoliu Mobilier la Comanda Bucuresti | Atlantis',
    description: 'Noua proiecte de mobilier la comanda finalizate in Bucuresti, Ilfov si Arges: bucatarii, livinguri, dressinguri, un cabinet medical si un birou. Vezi executia.',
    image: '/projects/ap-cosmo/amenajare-open-space-living-bucatarie-apartament-modern.webp',
    // The page's LCP is the decorative header crop, not the OG image.
    lcpImage: '/projects/ap-cosmo/portfolio-header-texture.webp',
  },
  {
    path: '/proiecte/ap-so',
    title: 'Mobilier Penthouse Vasile Lascar Bucuresti | Atlantis',
    description: 'Mobilier la comanda pentru un penthouse in Vasile Lascar: MDF vopsit, insertii de ceramica si accente de lemn. Vezi executia si cere o oferta.',
    image: '/projects/ap-so/penthouse-vasile-lascar-mobilier-living-mdf-vopsit.webp',
  },
  {
    path: '/proiecte/ap-cosmo',
    title: 'Mobilier Apartament Cosmopolis Ilfov | Atlantis Furnitures',
    description: 'Dormitor si living la comanda intr-un apartament din Cosmopolis, Ilfov. MDF vopsit, PAL si depozitare pe masura, executat si montat in 2024. Cere o oferta.',
    image: '/projects/ap-cosmo/mobilier-dormitor-mat-mdf-vopsit-lemn-cosmopolis.webp',
  },
  {
    path: '/proiecte/csm',
    title: 'Mobilier Cabinet Medical Pitesti | Atlantis Furnitures',
    description: 'Mobilier la comanda pentru un cabinet de pediatrie din Pitesti: receptie din corian, chicineta si vestiare cu inchidere electronica. Ai un spatiu similar?',
    image: '/projects/CSM/receptie-pediatrie-corian-mdf-vopsit-csm-pitesti.webp',
  },
  {
    path: '/proiecte/s-house',
    title: 'Mobilier Living si Dormitor Pipera | Atlantis Furnitures',
    description: 'Living si dormitor la comanda in Pipera, cu pereti riflati din lemn si MDF furniruit. Texturi calde si linii curate. Vezi proiectul si cere o oferta gratuita.',
    image: '/projects/S House/s-house-living-bucatarie-open-space-mdf-furnir-pipera.webp',
  },
  {
    path: '/proiecte/ap-air-u',
    title: 'Mobilier Apartament Unirii Bucuresti | Atlantis Furnitures',
    description: 'Amenajare completa cu mobilier la comanda intr-un apartament din Unirii: bucatarie albastra din MDF vopsit, living si un pat din ratan. Cere oferta gratuita.',
    image: '/projects/AP AIR-U/design-interior-apartament-modern-unirii-atlantis-furnitures.webp',
  },
  {
    path: '/proiecte/ap-air-v',
    title: 'Mobilier Apartament Victoriei Bucuresti | Atlantis',
    description: 'Apartament in zona Victoriei mobilat integral la comanda: bucatarie din MDF vopsit mat, comoda TV suspendata si dressing. Vezi finisajele si cere o oferta.',
    image: '/projects/AP AIR-V/mobilier-living-modern-mdf-vopsit-albastru-victoriei-bucuresti.webp',
  },
  {
    path: '/proiecte/studio-air-v',
    title: 'Mobilier Studio la Comanda Victoriei | Atlantis',
    description: 'Studio in zona Victoriei optimizat cu mobilier la comanda: consola TV suspendata, baghete decorative si depozitare ascunsa. Vezi cum castigi metri patrati.',
    image: '/projects/STUDIO AIR-V/consola-tv-suspendata-lemn-si-baghete-decorative-perete.webp',
  },
  {
    path: '/proiecte/tei-house',
    title: 'Mobilier Casa Lacul Tei Bucuresti | Atlantis Furnitures',
    description: 'Casa in zona Lacul Tei mobilata la comanda: open space dining si living, biblioteca din MDF vopsit si camere de copii personalizate. Vezi tot proiectul.',
    image: '/projects/TEI HOUSE/amenajare-open-space-dining-living-casa-tei-house.webp',
  },
  {
    path: '/proiecte/office',
    title: 'Mobilier Birou la Comanda Bucuresti | Atlantis Furnitures',
    description: 'Birou mobilat la comanda in Bucuresti: masa de sedinte din lemn, biblioteca cu rafturi deschise din MDF furniruit si depozitare. Cere oferta pentru sediu.',
    image: '/projects/OFFICE/masa-sedinte-lemn-lustra-led-design-atlantis-furnitures.webp',
  },
  {
    path: '/politica-confidentialitate',
    title: 'Politica de Confidentialitate | Atlantis Furnitures',
    description: 'Politica de confidentialitate si protectie a datelor personale conform GDPR pentru Atlantis Furnitures.',
    image: '/projects/AP AIR-U/design-interior-apartament-modern-unirii-atlantis-furnitures.webp',
    noindex: true,
  },
];

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ── og:image dimensions ──────────────────────────────────────────────────────
/**
 * Read a WebP file's intrinsic size straight from its header.
 *
 * og:image:width/height used to be hard-coded to 1200x630 while every image the
 * site actually ships is 1920x1280 or taller — so Facebook and LinkedIn cropped
 * against a box the file does not have. The numbers have to come from the file.
 *
 * Deliberately dependency-free: this runs inside the build, and pulling in an
 * image library to read six bytes would be one more thing that can fail a
 * deploy. Returns null for anything it cannot parse, and the caller then simply
 * omits the tags — no tag at all beats a wrong one.
 */
async function webpSize(absPath) {
  let fh;
  try {
    fh = await fs.open(absPath, 'r');
    const { buffer } = await fh.read(Buffer.alloc(32), 0, 32, 0);
    if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') {
      return null;
    }
    const fourcc = buffer.toString('ascii', 12, 16);
    if (fourcc === 'VP8 ') {
      // Lossy: 14-bit width/height at offset 26, after the 3-byte start code.
      return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
    }
    if (fourcc === 'VP8L') {
      // Lossless: 14 bits each, packed little-endian from offset 21.
      const bits = buffer.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (fourcc === 'VP8X') {
      // Extended: 24-bit width-1 / height-1 at offset 24.
      const w = buffer[24] | (buffer[25] << 8) | (buffer[26] << 16);
      const h = buffer[27] | (buffer[28] << 8) | (buffer[29] << 16);
      return { width: w + 1, height: h + 1 };
    }
    return null;
  } catch {
    return null;
  } finally {
    await fh?.close();
  }
}

/**
 * Replace og:image:width/height, or insert them after og:image when the runtime
 * SEO component has removed them (which it does on every route — see SEO.tsx).
 */
function setOgDimensions(html, size) {
  if (!size) return html;
  const stripped = html
    .replace(/\s*<meta property="og:image:width" content="[^"]*">/g, '')
    .replace(/\s*<meta property="og:image:height" content="[^"]*">/g, '');
  return stripped.replace(
    /(<meta property="og:image" content="[^"]*">)/,
    `$1\n    <meta property="og:image:width" content="${size.width}">\n` +
      `    <meta property="og:image:height" content="${size.height}">`
  );
}

/**
 * Which source files decide a route's content. Used only to date it — see
 * lastmodFor below.
 */
function sourcesFor(routePath) {
  if (routePath === '/') {
    return [
      'components/Home.tsx',
      'components/Hero.tsx',
      'components/Intro.tsx',
      'components/ProjectStack.tsx',
      'components/Process.tsx',
      'components/Testimonials.tsx',
    ];
  }
  if (routePath === '/proiecte') return ['components/Portfolio.tsx', 'data.ts'];
  if (routePath.startsWith('/proiecte/')) return ['components/ProjectDetail.tsx', 'data.ts'];
  if (routePath === '/servicii') return ['components/Services.tsx'];
  if (routePath === '/contact') return ['components/Contact.tsx'];
  if (routePath === '/politica-confidentialitate') return ['components/PrivacyPolicy.tsx'];
  return [];
}

/**
 * Last commit date of a route's sources.
 *
 * Every URL used to be stamped with the build date, so all thirteen changed
 * together on every deploy whether or not anything about them had — which is
 * exactly the signal Google learns to ignore. Commit dates are used rather than
 * file mtimes because CI clones the repo fresh, which would make every mtime
 * the checkout time and put us right back where we started.
 */
async function lastmodFor(routePath, fallback) {
  const files = sourcesFor(routePath);
  if (!files.length) return fallback;
  try {
    const { execFile } = await import('node:child_process');
    const { promisify } = await import('node:util');
    const run = promisify(execFile);
    const dates = await Promise.all(
      files.map(async (f) => {
        try {
          const { stdout } = await run('git', ['log', '-1', '--format=%cs', '--', f], {
            cwd: __dirname,
          });
          return stdout.trim();
        } catch {
          return '';
        }
      })
    );
    const newest = dates.filter(Boolean).sort().pop();
    return newest || fallback;
  } catch {
    return fallback;
  }
}

/**
 * Generate sitemap.xml from the same `routes` array the prerender walks, rather
 * than maintaining it by hand in public/. The hand-written copy had every URL
 * stamped with an identical, months-old <lastmod>, which Google learns to
 * ignore — and nothing stopped a new route from never reaching it at all.
 */
async function writeSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const indexable = routes.filter((r) => !r.noindex);
  const entries = await Promise.all(
    indexable.map(async (r) => {
      const lastmod = await lastmodFor(r.path, today);
      return (
        `  <url>\n    <loc>${canonicalFor(r.path)}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `    <priority>${r.path === '/' ? '1.0' : r.path.split('/').length > 2 ? '0.6' : '0.8'}</priority>\n` +
        `  </url>`
      );
    })
  );
  const urls = entries.join('\n');
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await fs.writeFile(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');
  console.log(`  ✓ sitemap.xml (${indexable.length} indexable URLs, per-route lastmod)`);
}

const baseHtml = await fs.readFile(path.join(distDir, 'index.html'), 'utf-8');

const outPathFor = (routePath) =>
  routePath === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, routePath.replace(/^\//, ''), 'index.html');

const canonicalFor = (routePath) =>
  routePath === '/' ? `${SITE}/` : `${SITE}${routePath}/`;

// ── Per-route LCP preload ────────────────────────────────────────────────────
// The preload must mirror how the page's LCP element actually picks its source,
// or the browser downloads one file and renders another. Three shapes are in
// play: `route.poster` (an <img srcset> → imagesrcset), `route.lcpImage` (a
// single fixed <img> → one plain tag), and the default project-page <picture>
// with a media-switched <source> → a matching media-split pair.
const preloadTag = (route) => {
  const base = route.poster || route.image;
  const full = encodeURI(base);
  const mobile = encodeURI(base.replace(/\.webp$/, '-m.webp'));

  // The homepage hero is an <img srcset>/sizes, so its preload must use
  // imagesrcset/imagesizes — the browser then runs the *same* candidate
  // selection for both and fetches exactly one file. A media-query preload
  // here disagreed with the element's own choice and downloaded both.
  // The homepage hero poster is a single, non-responsive image on purpose
  // (see Hero.tsx) — one preload, one request, guaranteed to be the file the
  // element actually renders.
  if (route.poster) {
    return `<link rel="preload" as="image" href="${full}" fetchpriority="high">`;
  }

  // A single, non-responsive LCP image (the portfolio header crop) preloads
  // as one plain tag — a media-split pair would fetch a file that never renders.
  if (route.lcpImage) {
    return `<link rel="preload" as="image" href="${encodeURI(route.lcpImage)}" fetchpriority="high">`;
  }

  // Project pages use <picture> with a media-switched <source>, which the
  // media-query preload mirrors exactly.
  return (
    `<link rel="preload" as="image" href="${mobile}" media="(max-width: 820px)" fetchpriority="high">\n    ` +
    `<link rel="preload" as="image" href="${full}" media="(min-width: 821px)" fetchpriority="high">`
  );
};
// Replace the one-or-two consecutive image preload tags from the base HTML.
const fixPreload = (html, route) =>
  html.replace(
    /<link rel="preload" as="image"[^>]*>(\s*<link rel="preload" as="image"[^>]*>)?/,
    preloadTag(route)
  );

// ── FALLBACK: meta-only injection (no browser needed) ────────────────────────
async function metaInject(route) {
  const canonical = canonicalFor(route.path);
  const ogImage = encodeOgImage(route.image);
  const titleEsc = escapeHtml(route.title);
  const descEsc = escapeHtml(route.description);
  let html = baseHtml
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${titleEsc}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${descEsc}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonical}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${titleEsc}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${descEsc}">`)
    .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${ogImage}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${titleEsc}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${descEsc}">`)
    .replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${ogImage}">`);
  html = fixPreload(html, route);
  html = setOgDimensions(html, await webpSize(path.join(distDir, route.image)));
  if (route.noindex) {
    html = html.replace(/<meta name="robots" content="[^"]*">/, `<meta name="robots" content="noindex, nofollow">`);
  }
  return html;
}

async function runMetaOnly(reason) {
  console.warn(`\n⚠️  Full prerender unavailable (${reason}). Falling back to meta-only injection.`);
  for (const route of routes) {
    const outPath = outPathFor(route.path);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, await metaInject(route), 'utf-8');
    console.log(`  ✓ ${route.path} (meta)`);
  }
  const nf = baseHtml
    .replace(/<title>[\s\S]*?<\/title>/, `<title>Pagina Nu A Fost Gasita | Atlantis Furnitures</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="Pagina cautata nu exista sau a fost mutata.">`)
    .replace(/<meta name="robots" content="[^"]*">/, `<meta name="robots" content="noindex, nofollow">`);
  await fs.writeFile(path.join(distDir, '404.html'), nf, 'utf-8');
  console.log('  ✓ /404 (meta)');
  await writeSitemap();
  console.log(`\n✅ Prerendered ${routes.length} routes (meta-only) to dist/`);
}

// ── Static server (SPA fallback to pristine base HTML) ───────────────────────
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json', '.xml': 'application/xml', '.txt': 'text/plain',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer(async (req, res) => {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      const ext = path.extname(urlPath);
      if (ext) {
        const filePath = path.join(distDir, urlPath);
        if (existsSync(filePath)) {
          try {
            const data = await fs.readFile(filePath);
            res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
            res.end(data);
            return;
          } catch { /* fall through */ }
        }
        res.writeHead(404); res.end('not found'); return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(baseHtml);
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function revealAll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0; const step = 500;
      const timer = setInterval(() => {
        window.scrollTo(0, y); y += step;
        if (y >= document.body.scrollHeight + 1200) {
          clearInterval(timer); window.scrollTo(0, 0); setTimeout(resolve, 250);
        }
      }, 80);
    });
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function renderRoute(browser, route, { is404 = false } = {}) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900, deviceScaleFactor: 1 });
  await page.evaluateOnNewDocument(() => {
    try { window.sessionStorage.setItem('atlantis_loader_shown', '1'); } catch {}
    // revealAll() scrolls the whole page to force lazy content to materialise.
    // Anything that is deliberately deferred *because* it would otherwise
    // become a false LCP candidate must stay deferred in the captured HTML —
    // this flag lets those components opt out of the synthetic scroll.
    window.__PRERENDER__ = true;
  });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);

  const url = `http://localhost:${PORT}${is404 ? '/__not_found__' : route.path}`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
  await page.waitForSelector('h1', { timeout: 20000 }).catch(() => {});
  await sleep(is404 ? 600 : 1200);
  if (!is404) await revealAll(page);
  await sleep(400);

  let html = await page.content();
  await page.close();

  if (!is404) {
    html = fixPreload(html, route);
    // The runtime SEO component deliberately drops og:image:width/height (it
    // cannot know the dimensions of the file it just pointed at). This is where
    // they come back, measured from the file the page actually references.
    const ogImage = html.match(/<meta property="og:image" content="([^"]*)"/)?.[1];
    if (ogImage) {
      const rel = decodeURIComponent(ogImage.replace(SITE, ''));
      html = setOgDimensions(html, await webpSize(path.join(distDir, rel)));
    }
    html = html.replace(
      /<meta property="og:image:alt" content="[^"]*">/,
      `<meta property="og:image:alt" content="Atlantis Furnitures - mobilier la comanda">`
    );
    // React sets `muted` as a property, not an HTML attribute, so it's absent
    // from the captured markup. Re-add it so native autoplay works pre-hydration.
    html = html.replace(/<video (?![^>]*\bmuted\b)/g, '<video muted ');
  }
  if (!html.startsWith('<!DOCTYPE')) html = '<!DOCTYPE html>\n' + html;
  return html;
}

// ── Run ──────────────────────────────────────────────────────────────────────
let browser;
let server;
try {
  server = await startServer();
  browser = await puppeteer.launch({
    headless: 'shell',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars'],
  });

  let count = 0;
  for (const route of routes) {
    const html = await renderRoute(browser, route);
    const outPath = outPathFor(route.path);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, html, 'utf-8');
    count++;
    console.log(`  ✓ ${route.path}`);
  }

  const nf = await renderRoute(browser, null, { is404: true });
  await fs.writeFile(path.join(distDir, '404.html'), nf, 'utf-8');
  console.log('  ✓ /404 (Netlify default 404 page)');

  await browser.close();
  server.close();
  await writeSitemap();
  console.log(`\n✅ Prerendered ${count} routes (full HTML) to dist/`);
} catch (err) {
  try { if (browser) await browser.close(); } catch {}
  try { if (server) server.close(); } catch {}
  await runMetaOnly(err.message?.split('\n')[0] || 'browser error');
}
