import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  startAnimation?: boolean;
}

const Hero: React.FC<HeroProps> = ({ startAnimation = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // If we shouldn't start animating yet (e.g. loader is still active), do nothing.
    // The CSS classes (opacity-0, translate-y-full) ensure elements remain hidden.
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

      // Parallax Effect - Subtle depth
      if (imgRef.current) {
        const mm = gsap.matchMedia();
        
        // Desktop Parallax
        mm.add("(min-width: 768px)", () => {
          gsap.to(imgRef.current, {
            yPercent: 10, // Moves image down slightly as we scroll down
            scale: 1.05, // Subtle scale up for drama
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
          gsap.to(imgRef.current, {
            scale: 1.05, // Only scale, no yPercent translation to keep it smooth
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
    <section ref={containerRef} id="hero" className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* OPTIMIZATION: fetchpriority="high" and decoding="sync" ensures this LCP element loads ASAP */}
      <img 
        ref={imgRef}
        src="/projects/AP AIR-V/amenajare-open-space-apartament-modern-victoriei-atlantis.webp" 
        className="absolute w-[120vw] max-w-none h-[130vh] object-cover object-center brightness-[0.85] contrast-[1.05] will-change-transform" 
        style={{ left: '-10vw', top: '-15vh' }}
        alt="Modern Kitchen Hero"
        fetchPriority="high"
        decoding="sync"
      />
      
      <div ref={textRef} className="relative z-10 flex flex-col items-center justify-center w-full px-6 h-full pt-16 md:pt-0">
        {/* Artistic Text - H2 - Background Element */}
        {/* Optimized sizing: text-[12vw] instead of 13vw for mobile breathing room */}
        <div className="text-center text-white mix-blend-difference mb-8 md:mb-10 select-none">
          <p className="font-display text-[12vw] md:text-[10.5vw] leading-[0.9] overflow-hidden m-0">
            <span className="block hero-line translate-y-full will-change-transform opacity-0">DESIGN</span>
          </p>
          <p className="font-display text-[12vw] md:text-[10.5vw] leading-[0.9] overflow-hidden m-0">
            <span className="block hero-line translate-y-full will-change-transform opacity-0">UNIC</span>
          </p>
        </div>
        
        {/* Main SEO Title - H1 - High Visibility Glass Card */}
        <div className="hero-subtitle opacity-0 translate-y-10 w-full max-w-[90%] md:max-w-5xl mx-auto">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl md:rounded-full p-1.5 shadow-2xl">
            <h1 className="bg-black/60 rounded-xl md:rounded-full px-5 py-4 md:px-10 md:py-5 text-center text-white border border-white/5 shadow-lg flex flex-col md:flex-row items-center justify-center gap-1 md:gap-0">
              <span className="font-display text-base md:text-lg tracking-[0.2em] drop-shadow-md">
                Mobilier la Comanda in Bucuresti
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