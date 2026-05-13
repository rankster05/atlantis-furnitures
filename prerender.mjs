import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');
const SITE = 'https://atlantisfurnitures.ro';

const encodeOgImage = (p) => `${SITE}${p.split('/').map(encodeURIComponent).join('/')}`;

const routes = [
  {
    path: '/',
    title: 'Mobilier la Comanda Bucuresti | Atlantis Furnitures',
    description: 'Producem mobilier la comanda din MDF si PAL pentru Bucuresti si Ilfov. Bucatarii, livinguri, dormitoare, dressing-uri, office. Cere oferta gratuita azi!',
    image: '/projects/AP AIR-V/amenajare-open-space-apartament-modern-victoriei-atlantis.webp',
  },
  {
    path: '/servicii',
    title: 'Servicii Mobilier la Comanda | Atlantis Furnitures',
    description: 'Bucatarii, livinguri, dormitoare si mobilier office la comanda in Bucuresti si Ilfov. Materiale premium, montaj inclus. Solicita oferta gratuita!',
    image: '/projects/S House/s-house-living-bucatarie-open-space-mdf-furnir-pipera.webp',
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
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const baseHtml = await fs.readFile(path.join(distDir, 'index.html'), 'utf-8');

let count = 0;
for (const route of routes) {
  const canonical = `${SITE}${route.path === '/' ? '/' : route.path}`;
  const ogImage = encodeOgImage(route.image);
  const titleEsc = escapeHtml(route.title);
  const descEsc = escapeHtml(route.description);

  let html = baseHtml
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${titleEsc}</title>`)
    .replace(
      /<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${descEsc}">`
    )
    .replace(
      /<link rel="canonical" href="[^"]*">/,
      `<link rel="canonical" href="${canonical}">`
    )
    .replace(
      /<meta property="og:url" content="[^"]*">/,
      `<meta property="og:url" content="${canonical}">`
    )
    .replace(
      /<meta property="og:title" content="[^"]*">/,
      `<meta property="og:title" content="${titleEsc}">`
    )
    .replace(
      /<meta property="og:description" content="[^"]*">/,
      `<meta property="og:description" content="${descEsc}">`
    )
    .replace(
      /<meta property="og:image" content="[^"]*">/,
      `<meta property="og:image" content="${ogImage}">`
    )
    .replace(
      /<meta property="og:image:alt" content="[^"]*">/,
      `<meta property="og:image:alt" content="${titleEsc}">`
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*">/,
      `<meta name="twitter:title" content="${titleEsc}">`
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*">/,
      `<meta name="twitter:description" content="${descEsc}">`
    )
    .replace(
      /<meta name="twitter:image" content="[^"]*">/,
      `<meta name="twitter:image" content="${ogImage}">`
    )
    // Per-route LCP preload: each page hero/main image is the LCP
    .replace(
      /<link rel="preload" as="image" href="[^"]*" fetchpriority="high">/,
      `<link rel="preload" as="image" href="${encodeURI(route.image)}" fetchpriority="high">`
    );

  if (route.noindex) {
    html = html.replace(
      /<meta name="robots" content="[^"]*">/,
      `<meta name="robots" content="noindex, nofollow">`
    );
  }

  const outPath =
    route.path === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, route.path.replace(/^\//, ''), 'index.html');

  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, html, 'utf-8');
  count++;
  console.log(`  ✓ ${route.path}`);
}

console.log(`\n✅ Prerendered ${count} routes to dist/`);
