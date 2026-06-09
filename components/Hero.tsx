import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  startAnimation?: boolean;
}

// Hero slideshow — first image is the LCP (matches the preload in index.html).
// Each item has a full HD image (desktop) and a lighter 1600px variant (mobile).
const heroImages = [
  {
    hd: '/projects/AP AIR-V/hero-living-victoriei-hd.webp',
    m: '/projects/AP AIR-V/hero-living-victoriei-hd-m.webp',
    alt: 'Mobilier la comanda - apartament modern Bucuresti, design interior premium',
  },
  {
    hd: '/projects/AP AIR-V/hero-camera-copil.webp',
    m: '/projects/AP AIR-V/hero-camera-copil-m.webp',
    alt: 'Mobilier camera copil la comanda - pat personalizat',
  },
  {
    hd: '/projects/AP AIR-V/hero-living-pipera.webp',
    m: '/projects/AP AIR-V/hero-living-pipera-m.webp',
    alt: 'Living si bucatarie open space la comanda - MDF furnir',
  },
  {
    hd: '/projects/AP AIR-V/hero-dormitor-riflat.webp',
    m: '/projects/AP AIR-V/hero-dormitor-riflat-m.webp',
    alt: 'Mobilier dormitor modern la comanda - perete riflat din lemn',
  },
  {
    hd: '/projects/AP AIR-V/hero-baie-oglinda.webp',
    m: '/projects/AP AIR-V/hero-baie-oglinda-m.webp',
    alt: 'Mobilier baie la comanda - oglinda rotunda iluminata',
  },
];

const SLIDE_INTERVAL = 3000; // ms between slides

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Hero: React.FC<HeroProps> = ({ startAnimation = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Auto-advance the slideshow (paused for reduced-motion users).
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % heroImages.length);
    }, SLIDE_INTERVAL);
    return () => window.clearInterval(id);
  }, []);

  useLayoutEffect(() => {
    // If we shouldn't start animating yet (e.g. loader is still active), do nothing.
    if (!startAnimation) return;

    const ctx = gsap.context(() => {
      // Intro animation
      gsap.fromTo('.hero-line',
        { y: '100%', scale: 1.1, opacity: 0, filter: 'blur(10px)' },
        {
          y: '0%',
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.8,
          ease: 'power4.out',
          stagger: 0.15,
          delay: 0.2
        }
      );

      // Animate the glass container and text
      gsap.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.5,
        ease: 'power2.out'
      });

      // Parallax Effect — applied to the whole slideshow container
      if (slidesRef.current) {
        const mm = gsap.matchMedia();

        // Desktop Parallax
        mm.add("(min-width: 768px)", () => {
          gsap.to(slidesRef.current, {
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

        // Mobile Parallax - Simplified to prevent stuttering
        mm.add("(max-width: 767px)", () => {
          gsap.to(slidesRef.current, {
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
      {/* Slideshow container (parallax target). Images crossfade every 3s. */}
      <div
        ref={slidesRef}
        className="absolute w-[120vw] max-w-none h-[130vh] will-change-transform"
        style={{ left: '-10vw', top: '-15vh' }}
      >
        {heroImages.map((img, i) => (
          <picture key={img.hd} className="contents">
            <source media="(max-width: 820px)" srcSet={img.m} />
            <img
              src={img.hd}
              className={`absolute inset-0 w-full h-full object-cover object-center brightness-[0.85] contrast-[1.05] transition-opacity ease-in-out motion-reduce:transition-none ${
                i === active ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDuration: '1500ms' }}
              alt={img.alt}
              fetchPriority={i === 0 ? 'high' : 'low'}
              decoding="async"
              aria-hidden={i === active ? undefined : true}
            />
          </picture>
        ))}
      </div>

      <div ref={textRef} className="relative z-10 flex flex-col items-center justify-center w-full px-6 h-full pt-16 md:pt-0">
        {/* Artistic Text - Background Element */}
        <div className="text-center text-white mix-blend-difference mb-8 md:mb-10 select-none">
          <p className="font-display text-[12vw] md:text-[10.5vw] leading-[0.9] overflow-hidden m-0">
            <span className="block hero-line translate-y-full opacity-0">DESIGN</span>
          </p>
          <p className="font-display text-[12vw] md:text-[10.5vw] leading-[0.9] overflow-hidden m-0">
            <span className="block hero-line translate-y-full opacity-0">UNIC</span>
          </p>
        </div>

        {/* Main SEO Title - H1 - High Visibility Glass Card */}
        <div className="hero-subtitle opacity-0 translate-y-10 w-full max-w-[90%] md:max-w-5xl mx-auto">
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

      {/* Slide indicators (subtle, premium) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Vezi imaginea ${i + 1} din ${heroImages.length}`}
            className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
              i === active ? 'w-7 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
