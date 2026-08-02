import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Facebook, ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Custom WhatsApp Icon to match Lucide style
const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    aria-hidden="true"
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

// Pre-desaturated and downscaled: it renders at 10% opacity behind an opaque
// panel, so colour data and full resolution were pure weight (113 KB → 22 KB).
const FOOTER_BG = '/projects/S House/footer-texture.webp';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  // The footer is position:fixed and full-height, so it sits inside the
  // viewport from the very first frame of every route — completely covered by
  // #main-wrapper, but painted all the same. Chrome's Largest Contentful Paint
  // does not test for occlusion, so the giant CONTACT headline down here was
  // being recorded as the LCP of the *homepage*, at ~4s.
  //
  // Nothing in the footer is reachable without scrolling, so we keep it out of
  // the render until the reader scrolls. `visibility: hidden` (rather than
  // unmounting) keeps the whole footer in the DOM for crawlers, and the flip
  // happens on the very first scroll event — thousands of pixels before any of
  // it is actually uncovered, so there is no visible change whatsoever.
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (hasScrolled) return;
    // The prerenderer scrolls the page to materialise lazy content; opting out
    // keeps the pre-reveal state in the shipped HTML, which is the whole point.
    if ((window as Window & { __PRERENDER__?: boolean }).__PRERENDER__) return;
    const reveal = () => setHasScrolled(true);
    // Any of these means LCP has been finalised — safe to paint the footer.
    window.addEventListener('scroll', reveal, { once: true, passive: true });
    window.addEventListener('pointerdown', reveal, { once: true, passive: true });
    window.addEventListener('keydown', reveal, { once: true });
    return () => {
      window.removeEventListener('scroll', reveal);
      window.removeEventListener('pointerdown', reveal);
      window.removeEventListener('keydown', reveal);
    };
  }, [hasScrolled]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Content Reveal Animation
      //
      // The trigger is #main-wrapper's bottom edge, NOT the footer itself. The
      // footer is position:fixed and fills the viewport from the first frame,
      // so "footer top hits 80% of viewport" was already true at load — the
      // reveal fired immediately, which meant GSAP hid the footer's huge
      // CONTACT headline at hydration and repainted it ~1s later. That late
      // repaint was being recorded as the page's Largest Contentful Paint on
      // every single route. Tying it to the wrapper's bottom means it fires
      // when the footer is genuinely being revealed — after the reader has
      // scrolled, by which point LCP is already settled.
      const mainWrapper = document.getElementById('main-wrapper');
      if (!mainWrapper) return;

      // The footer is uncovered as #main-wrapper slides up past it — one full
      // viewport of scroll. Everything below is scrubbed against exactly that
      // range, so the motion is driven by the reader's scroll rather than a
      // timer that happens to fire nearby.
      // `end` is expressed as a distance from `start` rather than as a second
      // edge position. The homepage's content-visibility sections change the
      // document height as they render, so anything anchored to the very bottom
      // of the page drifts; a relative range only depends on where the reveal
      // begins, which is stable.
      const revealTrigger = {
        trigger: mainWrapper,
        start: 'bottom bottom',
        end: () => '+=' + window.innerHeight,
        scrub: 0.6,
        invalidateOnRefresh: true,
      };

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          still: '(prefers-reduced-motion: reduce)',
          isPhone: '(max-width: 767px)',
        },
        (context) => {
          const { motion, isPhone } = context.conditions as {
            motion: boolean;
            isPhone: boolean;
          };

          // Reduced motion: land every layer in its final state, no travel.
          if (!motion) {
            gsap.set('.footer-anim', { y: 0, opacity: 1 });
            if (bgRef.current) gsap.set(bgRef.current, { yPercent: 0, scale: 1 });
            return;
          }

          // Three planes, each moving a different distance across the same
          // scroll. The texture is deepest and barely shifts; the CONTACT
          // wordmark sits behind the surface; the details ride on top and
          // settle last. That separation is what reads as depth — a single
          // drifting layer just reads as a moving photo.
          const depth = isPhone
            ? { texture: 10, headline: 46, detail: 26, meta: 16 }
            : { texture: 16, headline: 88, detail: 48, meta: 30 };

          if (bgRef.current) {
            gsap.fromTo(
              bgRef.current,
              { yPercent: -depth.texture, scale: 1.12 },
              { yPercent: 0, scale: 1, ease: 'none', scrollTrigger: revealTrigger }
            );
          }

          // Each layer finishes well before the scroll does. Two reasons: the
          // reader should never have to reach the very last pixel to see the
          // footer complete, and the homepage's `content-visibility: auto`
          // sections change the document height as they render, so the end of
          // the range is not a position we can rely on landing on exactly.
          const layers: Array<[string, number, number]> = [
            // selector, travel, fraction of the reveal it takes to settle
            ['[data-depth="headline"]', depth.headline, 0.55],
            ['[data-depth="detail"]', depth.detail, 0.7],
            ['[data-depth="meta"]', depth.meta, 0.8],
          ];

          layers.forEach(([selector, travel, settleAt]) => {
            const el = footerRef.current?.querySelector(selector);
            if (!el) return;
            gsap.fromTo(
              el,
              { y: travel, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                ease: 'none',
                scrollTrigger: {
                  ...revealTrigger,
                  end: () => '+=' + Math.round(window.innerHeight * settleAt),
                },
              }
            );
          });
        }
      );
    }, footerRef);

    return () => ctx.revert();
    // Re-runs once the decorative background mounts, so the parallax gets wired
    // to a real element instead of a null ref.
  }, [hasScrolled]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      id="contact"
      style={{ visibility: hasScrolled ? 'visible' : 'hidden' }}
      className="fixed bottom-0 left-0 w-full h-[100dvh] z-[1] bg-atl-dark text-white flex flex-col justify-center items-center overflow-hidden"
    >
      
      {/* CSS for hiding scrollbar but keeping functionality */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Decorative background + parallax ref. Mounted only after first scroll
          (see hasScrolled above) so its bytes stay off the critical path. */}
      {hasScrolled && (
        <img
          ref={bgRef}
          src={FOOTER_BG}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          width={1280}
          height={855}
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
          alt=""
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center px-6 pt-12 pb-12 md:pb-6 md:p-12 text-center overflow-y-auto no-scrollbar">
        
        <div className="flex-grow flex flex-col justify-center items-center w-full max-w-[1920px] mx-auto">
          <div data-depth="headline" className="mb-8 md:mb-16 footer-anim w-full shrink-0">
            <div className="text-sm md:text-base uppercase tracking-[0.3em] mb-4 md:mb-6 text-gray-400">Ai un proiect in minte?</div>
            <a href="tel:0732717666" className="font-display text-[12vw] md:text-[10vw] lg:text-9xl leading-none hover:text-gray-400 transition-colors block mix-blend-difference" aria-label="Suna acum la 0732 717 666">
              CONTACT
            </a>
          </div>

          <div data-depth="detail" className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-24 text-center md:text-left footer-anim w-full max-w-6xl justify-items-center md:justify-items-start shrink-0">
            
            <div className="flex flex-col items-center md:items-start">
              <p className="uppercase tracking-widest text-sm text-gray-400 font-medium mb-3">Atelier</p>
              <p className="font-normal text-gray-200 text-base md:text-lg">Aleea Argesului nr. 70</p>
              <p className="font-normal text-gray-200 text-base md:text-lg">Budeasa Mare, Romania</p>
            </div>

            <div className="flex flex-col items-center md:items-start w-full max-w-xs md:max-w-none">
              <p className="uppercase tracking-widest text-sm text-gray-400 font-medium mb-3">Telefon & Program</p>
              <a href="tel:0732717666" className="font-medium text-white text-xl md:text-2xl hover:opacity-70 transition-opacity mb-1" aria-label="Apeleaza 0732 717 666">
                0732 717 666
              </a>
              <p className="text-sm text-gray-400 mb-0 md:mb-8">Luni - Vineri: 08:00 - 19:00</p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <p className="uppercase tracking-widest text-sm text-gray-400 font-medium mb-4">Social</p>
              <div className="flex flex-col gap-4 font-normal text-base md:text-lg text-gray-200">
                 <a 
                   href="https://www.instagram.com/atlantis_furnitures66/" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="flex items-center gap-3 hover:text-white transition-colors group w-fit"
                   aria-label="Viziteaza pagina noastra de Instagram"
                 >
                   <Instagram size={20} className="stroke-[1.5px] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" aria-hidden="true" />
                   <span className="relative overflow-hidden">
                     Instagram
                     <span className="absolute bottom-0 left-0 w-full h-px bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                   </span>
                 </a>
                 
                 <a 
                   href="https://www.facebook.com/profile.php?id=100057578914043" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="flex items-center gap-3 hover:text-white transition-colors group w-fit"
                   aria-label="Viziteaza pagina noastra de Facebook"
                 >
                   <Facebook size={20} className="stroke-[1.5px] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" aria-hidden="true" />
                   <span className="relative overflow-hidden">
                     Facebook
                     <span className="absolute bottom-0 left-0 w-full h-px bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                   </span>
                 </a>
                 
                 <a 
                   href="https://wa.me/40732717666" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="flex items-center gap-3 hover:text-white transition-colors group w-fit"
                   aria-label="Contacteaza-ne pe WhatsApp"
                 >
                   <WhatsAppIcon size={20} className="stroke-[1.5px] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                   <span className="relative overflow-hidden">
                     WhatsApp
                     <span className="absolute bottom-0 left-0 w-full h-px bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                   </span>
                 </a>
              </div>
            </div>

          </div>
        </div>

        <div data-depth="meta" className="w-full flex flex-col md:flex-row justify-between items-center gap-12 md:gap-6 text-xs text-gray-500 uppercase tracking-widest footer-anim mt-16 md:mt-0 shrink-0 relative">
          
          {/* Left side (empty on desktop to balance the right side) */}
          <div className="hidden md:block md:w-32"></div>

          {/* Center content */}
          {/* Centred with inset-x-0 + w-max + mx-auto rather than
              left-1/2 + -translate-x-1/2. The translate only shifts the box
              visually — for layout the element still starts at the 50% mark, so
              it could only ever be half the bar wide, and the copyright and
              "Designed by" lines were wrapping onto two rows on desktop. */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 md:absolute md:inset-x-0 md:mx-auto md:w-max">
            <span className="leading-none whitespace-nowrap">© {new Date().getFullYear()} ATLANTIS FURNITURES</span>
            <span className="hidden md:block leading-none opacity-20 text-gray-500">|</span>
            <Link
              to="/politica-confidentialitate/"
              className="inline-flex items-center min-h-[24px] py-1.5 leading-none whitespace-nowrap opacity-60 hover:opacity-100 hover:text-white transition-all duration-300"
              aria-label="Politica de Confidentialitate GDPR"
            >
              Confidentialitate
            </Link>
            <span className="hidden md:block leading-none opacity-20 text-gray-500">|</span>
            <a
              href="https://www.rankster.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 min-h-[24px] py-1.5 whitespace-nowrap opacity-60 hover:opacity-100 hover:text-white transition-all duration-300 leading-none"
              aria-label="Website creat de Rankster"
            >
              <span>Designed by</span>
              <span className="font-bold relative">
                Rankster
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </span>
            </a>
          </div>

          {/* Right side */}
          <button 
            onClick={scrollToTop}
            className="group flex flex-col md:flex-row items-center gap-4 hover:text-white transition-colors duration-300 md:w-auto"
            aria-label="Inapoi sus"
          >
            <span className="text-xs tracking-[0.2em] font-medium order-2 md:order-1 leading-none">Inapoi Sus</span>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 order-1 md:order-2 shrink-0">
              <ArrowUp size={16} className="transform group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;