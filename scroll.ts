import type Lenis from 'lenis';

/**
 * One way to scroll the page.
 *
 * Lenis owns the scroll position: it writes it every frame from its own rAF
 * loop. Anything that calls `window.scrollTo({ behavior: 'smooth' })` while
 * Lenis is running is therefore fighting it — the browser starts its own
 * animation, Lenis overwrites the position on the very next frame, and the
 * result is a jump, a stall, or nothing at all. Every scroll in the app goes
 * through here so there is only ever one thing driving the page.
 */

let instance: Lenis | null = null;

/** App registers the live instance; null when Lenis is not running. */
export const registerLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  !!window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Scroll to an absolute Y position, or to an element.
 *
 * `offset` shifts the landing point — negative to leave room under the fixed
 * header. Falls back to the native API when Lenis is absent (reduced motion,
 * or before the app has mounted), and to an instant jump when the reader has
 * asked for reduced motion.
 */
export const scrollTo = (
  target: number | string | HTMLElement,
  { offset = 0, immediate = false }: { offset?: number; immediate?: boolean } = {}
) => {
  if (typeof window === 'undefined') return;

  const reduced = prefersReducedMotion();

  if (instance) {
    instance.scrollTo(target, {
      offset,
      immediate: immediate || reduced,
      // Long enough to read as deliberate, short enough not to feel like a
      // ride. The easing is the same expo-out shape the rest of the site uses.
      duration: 1.15,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    });
    return;
  }

  // No Lenis: resolve the target ourselves and use the platform.
  let top: number;
  if (typeof target === 'number') {
    top = target;
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    top = el.getBoundingClientRect().top + window.scrollY;
  }
  window.scrollTo({ top: top + offset, behavior: immediate || reduced ? 'auto' : 'smooth' });
};

export const scrollToTop = (opts?: { immediate?: boolean }) => scrollTo(0, opts);
