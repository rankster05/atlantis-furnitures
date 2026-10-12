import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, MapPin, MousePointerClick, Star } from 'lucide-react';

// The embed generated from the Google Business Profile ("Share → Embed a map").
// Both locale pairs were switched from `en` to `ro` (!1sro) so the map's own
// labels and controls speak the same language as the rest of the site.
const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d348592.9332027324!2d25.811729214336907!3d44.50170279368291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2bbc70ecbf671%3A0x4680e0736fc71a40!2sAtlantis%20Furnitures!5e1!3m2!1sro!2sro!4v1791791148432!5m2!1sro!2sro';

export const MAP_PROFILE_URL = 'https://www.google.com/maps?cid=5080307166075099712';

// How far ahead of the viewport the iframe starts loading. The embed pulls in
// well over a megabyte of Maps JS and satellite tiles, so it stays off the page
// entirely until the reader is actually on their way to it.
const PRELOAD_MARGIN = '800px 0px';
const REVEAL_DELAY = 600;

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6B6B]';

/**
 * The live Google Maps embed on its own: lazy-mounted, with a placeholder until
 * it paints and a scroll shield for mouse users. The parent sets its size.
 */
export const MapFrame: React.FC<{ className?: string }> = ({ className = '' }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  // With a mouse, the wheel over a live iframe is swallowed by the map and
  // Lenis loses the scroll mid-glide. The map stays inert until it is clicked,
  // and goes back to sleep as soon as the pointer leaves it.
  const [isInteractive, setIsInteractive] = useState(false);
  const revealTimer = useRef(0);

  // The iframe's `load` fires before Google has drawn any tiles, and until
  // then the embed is an opaque black box. Holding the placeholder a moment
  // longer means the map fades in already painted.
  const handleLoad = () => {
    revealTimer.current = window.setTimeout(() => setIsLoaded(true), REVEAL_DELAY);
  };

  useEffect(() => () => window.clearTimeout(revealTimer.current), []);

  useEffect(() => {
    // The prerenderer scrolls every page top to bottom; without this the
    // captured HTML would ship with the iframe already in it.
    if ((window as Window & { __PRERENDER__?: boolean }).__PRERENDER__) return;

    const el = frameRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: PRELOAD_MARGIN }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    // A set height (not the iframe's own 800×600) so nothing shifts when it
    // loads. `isolate` + `transform-gpu` make Safari clip the iframe to the
    // rounded corners.
    <div
      ref={frameRef}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') setIsInteractive(false);
      }}
      className={`relative isolate transform-gpu overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-[#111] ${className}`}
    >
      {/* Placeholder: a drafting grid with the pin, shown until the map paints */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-5 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] bg-center transition-opacity duration-700 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      >
        <span className="relative flex w-14 h-14 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-[#FF6B6B]/20 motion-safe:animate-ping" />
          <span className="relative w-14 h-14 rounded-full border border-white/10 bg-[#161616] flex items-center justify-center">
            <MapPin size={20} strokeWidth={1.5} className="text-[#FF6B6B]" />
          </span>
        </span>
        <span className="text-[11px] uppercase tracking-[0.28em] text-white/35">Se incarca harta</span>
      </div>

      {shouldLoad && (
        <iframe
          src={MAP_EMBED_SRC}
          title="Atlantis Furnitures pe Google Maps"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          onLoad={handleLoad}
          className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Scroll shield — mouse users only. Touch scrolling is native (Lenis
          leaves it alone) and Google's own two-finger gesture already keeps
          the page moving, so phones get the live map straight away. Keyboard
          users tab into the iframe directly; this layer never takes focus. */}
      {isLoaded && !isInteractive && (
        <div
          onClick={() => setIsInteractive(true)}
          className="group/shield absolute inset-0 z-10 hidden pointer-fine:flex items-end justify-center pb-16 cursor-pointer"
          aria-hidden="true"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full bg-atl-dark/85 backdrop-blur-md border border-white/10 px-5 py-3 text-[13px] text-white/85 shadow-2xl opacity-0 translate-y-2 transition-all duration-300 group-hover/shield:opacity-100 group-hover/shield:translate-y-0">
            <MousePointerClick size={15} strokeWidth={1.75} />
            Da click ca sa folosesti harta
          </span>
        </div>
      )}
    </div>
  );
};

interface LocationMapProps {
  /** h3 when the map sits inside another section (homepage reviews), h2 when it is a section of its own. */
  headingLevel?: 'h2' | 'h3';
  headingId?: string;
  className?: string;
}

/** Homepage version: a details card beside the map. */
const LocationMap: React.FC<LocationMapProps> = ({
  headingLevel: Heading = 'h2',
  headingId,
  className = '',
}) => (
  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 ${className}`}>
    <div className="lg:col-span-5 flex flex-col rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.025] p-7 sm:p-9 md:p-10 lg:p-8 xl:p-10">
      <div className="flex items-center gap-3 mb-8 md:mb-10">
        <span
          className="w-10 h-10 shrink-0 rounded-full border border-white/10 bg-white/5 flex items-center justify-center"
          aria-hidden="true"
        >
          <MapPin size={16} strokeWidth={1.75} className="text-[#FF6B6B]" />
        </span>
        <span className="uppercase tracking-[0.28em] text-[11px] text-white/55 font-medium">
          Zona de acoperire
        </span>
      </div>

      <Heading
        id={headingId}
        className="font-display text-[7.5vw] sm:text-3xl lg:text-[1.75rem] xl:text-[2rem] leading-[1.15] text-balance text-white mb-5"
      >
        Atlantis pe Google Maps
      </Heading>

      <p className="text-white/50 font-light leading-relaxed text-[15px] md:text-base mb-9">
        Facem mobilier la comanda in atelierul nostru din Budeasa Mare, langa Pitesti, si il montam la tine
        acasa in Bucuresti, Ilfov sau Arges. Pentru proiectele mai mari venim si in restul tarii.
      </p>

      <dl className="border-t border-white/10 mb-9 md:mb-10">
        <div className="flex items-baseline justify-between gap-6 py-4 border-b border-white/10">
          <dt className="text-[11px] uppercase tracking-[0.24em] text-white/40 shrink-0">Atelier</dt>
          <dd className="m-0 text-[15px] text-white text-right">Budeasa Mare, Arges</dd>
        </div>
        <div className="flex items-baseline justify-between gap-6 py-4 border-b border-white/10">
          <dt className="text-[11px] uppercase tracking-[0.24em] text-white/40 shrink-0">Montaj</dt>
          <dd className="m-0 text-[15px] text-white text-right">Bucuresti, Ilfov si Arges</dd>
        </div>
        <div className="flex items-center justify-between gap-6 py-4 border-b border-white/10">
          <dt className="text-[11px] uppercase tracking-[0.24em] text-white/40 shrink-0">Google</dt>
          <dd className="m-0 flex items-center gap-2.5">
            <span className="font-display text-[15px] text-white leading-none">
              5.0<span className="sr-only"> din 5 stele</span>
            </span>
            <span className="flex gap-0.5" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={12} className="fill-[#FACC15] text-[#FACC15]" />
              ))}
            </span>
          </dd>
        </div>
      </dl>

      <a
        href={MAP_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`group mt-auto flex w-full items-center justify-between gap-4 rounded-full bg-atl-bg text-atl-dark pl-6 sm:pl-7 pr-2 py-2 font-medium transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0 ${focusRing}`}
      >
        <span className="tracking-wide text-sm sm:text-[15px] whitespace-nowrap">Deschide in Google Maps</span>
        <span
          className="w-11 h-11 shrink-0 rounded-full bg-atl-dark text-atl-bg flex items-center justify-center"
          aria-hidden="true"
        >
          <ArrowUpRight
            size={17}
            strokeWidth={1.75}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </a>
    </div>

    <MapFrame className="lg:col-span-7 h-[420px] sm:h-[480px] lg:h-auto lg:min-h-[600px]" />
  </div>
);

export default LocationMap;
