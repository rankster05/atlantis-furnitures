import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  startAnimation?: boolean;
}

const HERO_VIDEO = '/atlantis-hero-video.mp4';
const HERO_VIDEO_MOBILE = '/atlantis-hero-video-mobil.mp4';
// The poster is the LCP element: it is preloaded in index.html and is the only
// hero media that touches the critical path. The video is deliberately NOT
// requested until the page has finished loading (see below).
// Deliberately a single file rather than a responsive srcset. `sizes="120vw"`
// on the element and `imagesizes="120vw"` on the <head> preload resolved to
// different candidates on mobile — the preload scanner runs before the viewport
// meta is applied — so both sizes were downloaded. One image, one request, no
// possible mismatch; it is a background that the video replaces within a second.
const HERO_POSTER = '/projects/AP AIR-V/hero-poster.webp';
const PLAYBACK_RATE = 0.85;

/**
 * The hero video is ~2.2 MB. Fetching it during page load made it compete with
 * the LCP image for bandwidth and pushed the total payload past 6 MB, so it is
 * requested only once the page has finished loading. It always autoplays, on
 * every connection — the delay is a fraction of a second and is invisible,
 * because the poster underneath is already on screen.
 */
const shouldLoadVideo = (): boolean => {
  if (typeof window === 'undefined') return false;
  // The prerenderer would otherwise sit on the page long enough for the idle
  // callback to fire, baking a `src` into the shipped HTML. The browser then
  // eagerly fetched *that* file on load, and hydration immediately swapped in
  // the correct one for the viewport — downloading both videos, 4.5 MB.
  if ((window as Window & { __PRERENDER__?: boolean }).__PRERENDER__) return false;
  return true;
};

const Hero: React.FC<HeroProps> = ({ startAnimation = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Empty until the page is idle — keeps the video off the critical path.
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!shouldLoadVideo()) return;

    let idleId: number | undefined;
    const start = () => {
      const schedule =
        window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
      idleId = schedule(() => {
        setVideoSrc(window.innerWidth < 768 ? HERO_VIDEO_MOBILE : HERO_VIDEO);
      }) as unknown as number;
    };

    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });

    return () => {
      window.removeEventListener('load', start);
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
    };
  }, []);

  // Robust autoplay + slow-motion playback, once a src has actually been set.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoSrc) return;
    v.playbackRate = PLAYBACK_RATE;
    const tryPlay = () => {
      v.playbackRate = PLAYBACK_RATE;
      v.play().catch(() => {
        /* autoplay blocked — poster stays visible, harmless */
      });
    };
    if (v.readyState >= 2) tryPlay();
    else v.addEventListener('loadeddata', tryPlay, { once: true });
    return () => v.removeEventListener('loadeddata', tryPlay);
  }, [videoSrc]);

  useLayoutEffect(() => {
    // If we shouldn't start animating yet (e.g. loader is still active), do nothing.
    if (!startAnimation) return;

    const ctx = gsap.context(() => {
      // The hero headline and subtitle are the page's largest paint. They must
      // therefore be *visible by default* — their hidden state is set here, in
      // a layout effect that runs before the browser paints, rather than via
      // CSS classes. Otherwise hydration re-hides text the static HTML already
      // painted, and LCP is recorded against the late re-reveal instead of the
      // first paint. The animation itself is unchanged.
      gsap.set('.hero-line, .hero-subtitle', { clearProps: 'all' });

      // Intro animation
      gsap.from('.hero-line', {
        y: '100%',
        scale: 1.1,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1.8,
        ease: 'power4.out',
        stagger: 0.15,
        delay: 0.2,
      });

      // Animate the glass container and text
      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 1.5,
        ease: 'power2.out'
      });

      // Parallax Effect — applied to the video container
      if (mediaRef.current) {
        const mm = gsap.matchMedia();

        // Desktop Parallax
        mm.add("(min-width: 768px)", () => {
          gsap.to(mediaRef.current, {
            yPercent: 10,
            scale: 1.05,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true
            }
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [startAnimation]);

  return (
    <section ref={containerRef} id="hero" className="h-[100dvh] w-full relative flex items-center justify-center overflow-hidden">
      {/* Hero video — muted autoplay loop, slow-motion, with a preloaded poster
          so the first paint (LCP) is instant. */}
      <div
        ref={mediaRef}
        className="absolute w-[120vw] max-w-none h-[130vh] will-change-transform"
        style={{ left: '-10vw', top: '-15vh' }}
      >
        {/* The LCP element. A real <img> (rather than the video's `poster`
            attribute) so the browser's preload scanner finds it in the raw
            HTML and fetches it at high priority before any script runs. */}
        <img
          src={HERO_POSTER}
          width={1600}
          height={1067}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Sits directly on top of the poster. A <video> paints nothing until it
            has frames, so the poster simply shows through until playback starts
            — no opacity gating, which could leave the video invisible if the
            'playing' event was ever missed. */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-center"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>

      <div ref={textRef} className="relative z-10 flex flex-col items-center justify-center w-full px-6 h-full pt-16 md:pt-0">
        {/* Artistic Text - Background Element */}
        <div className="text-center text-white mix-blend-difference mb-8 md:mb-10 select-none">
          <p className="font-display text-[12vw] md:text-[10.5vw] leading-[0.9] overflow-hidden m-0">
            <span className="block hero-line">DESIGN</span>
          </p>
          <p className="font-display text-[12vw] md:text-[10.5vw] leading-[0.9] overflow-hidden m-0">
            <span className="block hero-line">UNIC</span>
          </p>
        </div>

        {/* Main SEO Title - H1 - High Visibility Glass Card */}
        <div className="hero-subtitle w-full max-w-[90%] md:max-w-5xl mx-auto">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl md:rounded-full p-1.5 shadow-2xl">
            <h1 className="bg-black/60 rounded-xl md:rounded-full px-5 py-4 md:px-10 md:py-5 text-center text-white border border-white/5 shadow-lg flex flex-col md:flex-row items-center justify-center gap-1 md:gap-0">
              <span className="font-display text-base md:text-lg tracking-[0.2em] drop-shadow-md">
                Mobilier la Comanda
              </span>
              <span className="text-white/40 mx-3 text-lg font-thin hidden md:inline"> | </span>
              <span className="font-display text-xs md:text-sm tracking-[0.25em] uppercase opacity-90 drop-shadow-md">
                Atlantis Furnitures
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
