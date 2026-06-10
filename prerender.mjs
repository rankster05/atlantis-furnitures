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
    description: 'Producem mobilier la comanda din MDF si PAL pentru Bucuresti si Ilfov. Bucatarii, livinguri, dormitoare, dressing-uri, office. Cere oferta gratuita azi!',
    // Homepage hero is a video; the OG image stays the HD still, but the LCP
    // preload is the lightweight video poster (single image, matches <video poster>).
    image: '/projects/AP AIR-V/hero-living-victoriei-hd.webp',
    posterPreload: '/projects/AP AIR-V/hero-living-victoriei-hd-m.webp',
  },
  {
    path: '/servicii',
    title: 'Servicii Mobilier la Comanda | Atlantis Furnitures',
    description: 'Bucatarii, livinguri, dormitoare si mobilier office la comanda in Bucuresti si Ilfov. Materiale premium, montaj inclus. Solicita oferta gratuita!',
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
    title: 'Portofoliu Mobilier la Comanda | Atlantis Furnitures',
    description: 'Vezi proiectele noastre finalizate de mobilier la comanda in Bucuresti si Ilfov. Bucatarii, livinguri, dormitoare si spatii comerciale. Inspira-te acum!',
    image: '/projects/ap-cosmo/amenajare-open-space-living-bucatarie-apartament-modern.webp',
  },
  {
    path: '/proiecte/ap-so',
    title: 'Penthouse Vasile Lascar – Mobilier Premium | Atlantis',
    description: 'Proiect mobilier la comanda pentru penthouse in zona Vasile Lascar, Bucuresti. MDF furniruit, design minimalist. Vrei un rezultat similar? Contacteaza-ne!',
    image: '/projects/ap-so/penthouse-vasile-lascar-mobilier-living-mdf-vopsit.webp',
  },
  {
    path: '/proiecte/ap-cosmo',
    title: 'Mobilier Apartament Cosmopolis Ilfov | Atlantis Furnitures',
    description: 'Mobilier dormitor si living la comanda pentru apartament in Cosmopolis, Ilfov. PAL si MDF premium, executie si montaj 2024. Cere oferta pentru proiectul tau!',
    image: '/projects/ap-cosmo/mobilier-dormitor-mat-mdf-vopsit-lemn-cosmopolis.webp',
  },
  {
    path: '/proiecte/csm',
    title: 'Mobilier Cabinet Medical Pitesti | Atlantis Furnitures',
    description: 'Mobilier la comanda pentru cabinet medical in Pitesti. Executie precisa, materiale durabile, montaj profesional. Ai un spatiu similar? Hai sa discutam!',
    image: '/projects/CSM/receptie-pediatrie-corian-mdf-vopsit-csm-pitesti.webp',
  },
  {
    path: '/proiecte/s-house',
    title: 'Living si Dormitor la Comanda Pipera | Atlantis',
    description: 'Proiect S House Pipera – mobilier living si dormitor din MDF furniruit. Design minimalist, texturi calde. Transforma-ti spatiul – cere oferta gratuita!',
    image: '/projects/S House/s-house-living-bucatarie-open-space-mdf-furnir-pipera.webp',
  },
  {
    path: '/proiecte/ap-air-u',
    title: 'Mobilier Apartament Modern Bucuresti | Atlantis Furnitures',
    description: 'Mobilier complet la comanda pentru apartament in Bucuresti. MDF si PAL premium, design personalizat, montaj inclus. Hai sa construim impreuna spatiul ideal!',
    image: '/projects/AP AIR-U/design-interior-apartament-modern-unirii-atlantis-furnitures.webp',
  },
  {
    path: '/proiecte/ap-air-v',
    title: 'Mobilier Apartament Modern la Comanda | Atlantis Furnitures',
    description: 'Proiect mobilier la comanda pentru apartament modern in Bucuresti. MDF si PAL premium, design personalizat, montaj inclus. Vrei acelasi rezultat? Contacteaza-ne!',
    image: '/projects/AP AIR-V/mobilier-living-modern-mdf-vopsit-albastru-victoriei-bucuresti.webp',
  },
  {
    path: '/proiecte/studio-air-v',
    title: 'Mobilier Studio la Comanda Bucuresti | Atlantis Furnitures',
    description: 'Amenajare mobilier la comanda pentru studio in Bucuresti. Solutii inteligente de depozitare, materiale premium. Maximeaza spatiul – cere oferta acum!',
    image: '/projects/STUDIO AIR-V/consola-tv-suspendata-lemn-si-baghete-decorative-perete.webp',
  },
  {
    path: '/proiecte/tei-house',
    title: 'Mobilier Casa Zona Tei Bucuresti | Atlantis Furnitures',
    description: 'Mobilier la comanda pentru casa in zona Tei, Bucuresti. Living, dormitor si spatii functionale din MDF si PAL. Vrei acelasi rezultat? Contacteaza-ne!',
    image: '/projects/TEI HOUSE/amenajare-open-space-dining-living-casa-tei-house.webp',
  },
  {
    path: '/proiecte/office',
    title: 'Mobilier Office la Comanda Bucuresti | Atlantis Furnitures',
    description: 'Mobilier de birou la comanda in Bucuresti. Birouri, dulapuri si spatii de lucru personalizate din MDF si PAL premium. Solicita oferta pentru biroul tau!',
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

const baseHtml = await fs.readFile(path.join(distDir, 'index.html'), 'utf-8');

const outPathFor = (routePath) =>
  routePath === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, routePath.replace(/^\//, ''), 'index.html');

const canonicalFor = (routePath) =>
  routePath === '/' ? `${SITE}/` : `${SITE}${routePath}/`;

// ── Per-route LCP preload ────────────────────────────────────────────────────
// Project pages preload a responsive pair (mobile + desktop) that matches their
// <picture> source. The homepage hero is a <video> with a single poster, so it
// preloads one image (route.posterPreload) — matching the poster, no double-load.
const preloadTag = (route) => {
  if (route.posterPreload) {
    return `<link rel="preload" as="image" href="${encodeURI(route.posterPreload)}" fetchpriority="high">`;
  }
  const full = encodeURI(route.image);
  const mobile = encodeURI(route.image.replace(/\.webp$/, '-m.webp'));
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
function metaInject(route) {
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
    await fs.writeFile(outPath, metaInject(route), 'utf-8');
    console.log(`  ✓ ${route.path} (meta)`);
  }
  const nf = baseHtml
    .replace(/<title>[\s\S]*?<\/title>/, `<title>Pagina Nu A Fost Gasita | Atlantis Furnitures</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="Pagina cautata nu exista sau a fost mutata.">`)
    .replace(/<meta name="robots" content="[^"]*">/, `<meta name="robots" content="noindex, nofollow">`);
  await fs.writeFile(path.join(distDir, '404.html'), nf, 'utf-8');
  console.log('  ✓ /404 (meta)');
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
  console.log(`\n✅ Prerendered ${count} routes (full HTML) to dist/`);
} catch (err) {
  try { if (browser) await browser.close(); } catch {}
  try { if (server) server.close(); } catch {}
  await runMetaOnly(err.message?.split('\n')[0] || 'browser error');
}
