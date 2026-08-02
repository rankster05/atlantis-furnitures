/**
 * Turn an image path into a readable alt text.
 *
 * Every project photo is already named descriptively — for example
 * `bucatarie-la-comanda-insula-ceramica-atlantis-furnitures.webp` — so the file
 * name is a far better description than the `"AP SO detail 0-1"` placeholders
 * the gallery used to emit. Redundant brand/suffix tokens are dropped, and the
 * project title is appended for context.
 */
const ALT_NOISE = new Set(['atlantis', 'furnitures', 'm', 'hd', 'detaliu']);

export const altFromImagePath = (src: string, projectTitle?: string): string => {
  const base = (src.split('/').pop() || '')
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/-m$/, '');

  const words = base
    .split('-')
    .filter((w) => w && !ALT_NOISE.has(w.toLowerCase()) && !/^\d+$/.test(w));

  if (!words.length) {
    return projectTitle ? `Mobilier la comanda - ${projectTitle}` : 'Mobilier la comanda';
  }

  const phrase = words.join(' ');
  const sentence = phrase.charAt(0).toUpperCase() + phrase.slice(1);
  return projectTitle ? `${sentence} - proiect ${projectTitle}` : sentence;
};

export const getOptimizedImageUrl = (url: string, width: number = 1200) => {
  if (!url || !url.includes('images.unsplash.com')) return url;
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('w', width.toString());
    urlObj.searchParams.set('q', '75');
    urlObj.searchParams.set('auto', 'format');
    urlObj.searchParams.set('fit', 'crop');
    return urlObj.toString();
  } catch {
    return url;
  }
};
