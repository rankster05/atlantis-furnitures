/**
 * Regenerate image-dimensions.json — the intrinsic size of every image in
 * public/, keyed by its public URL path.
 *
 * Components read this to put real `width`/`height` on every <img>. The numbers
 * have to be the file's actual pixels: a wrong pair is worse than none, because
 * the browser then reserves a box the image never fills. So they are measured,
 * never typed by hand.
 *
 * Not wired into `npm run build` on purpose — it needs `sharp`, and a failed
 * optional dependency should never be able to break a deploy. Run it manually
 * after adding or replacing images:
 *
 *   node scripts/image-dimensions.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');

const EXT = new Set(['.webp', '.jpg', '.jpeg', '.png', '.avif']);

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (EXT.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

const files = await walk(publicDir);
const map = {};

for (const file of files) {
  try {
    const { width, height } = await sharp(file).metadata();
    if (!width || !height) continue;
    // Key by the URL the markup uses: leading slash, OS separators normalised.
    const key = '/' + path.relative(publicDir, file).split(path.sep).join('/');
    map[key] = [width, height];
  } catch {
    /* unreadable file — skip rather than emit a wrong size */
  }
}

const sorted = Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
await fs.writeFile(
  path.join(root, 'image-dimensions.json'),
  JSON.stringify(sorted, null, 2) + '\n',
  'utf-8'
);

console.log(`✓ image-dimensions.json — ${Object.keys(sorted).length} images measured`);
