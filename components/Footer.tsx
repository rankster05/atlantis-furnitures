import React, { useLayoutEffect, useRef } from 'react';
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

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Content Reveal Animation
      gsap.from('.footer-anim', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%', // Triggers slightly before full reveal
          toggleActions: "play none none reverse"
        }
      });

      // 2. Background Parallax Logic
      // Since footer is fixed and revealed by margin-bottom of #main-wrapper
      // We trigger based on the main-wrapper position
      const mainWrapper = document.getElementById('main-wrapper');
      
      if (mainWrapper && bgRef.current) {
        gsap.fromTo(bgRef.current, 
          { 
            yPercent: -15, 
            scale: 1.1 
          },
          {
            yPercent: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: mainWrapper,
              start: "bottom bottom", // When content bottom hits viewport bottom (start of reveal)
              end: "bottom top",    // When content bottom hits viewport top (fully revealed + scrolled past if possible, but limited by doc height)
              scrub: true
            }
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} id="contact" className="fixed bottom-0 left-0 w-full h-[100dvh] z-[1] bg-atl-dark text-white flex flex-col justify-center items-center overflow-hidden">
      
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

      {/* Background with low opacity & Parallax Ref */}
      <img 
        ref={bgRef}
        src="/projects/S House/mobilier-dormitor-modern-perete-riflat-lemn-s-house.webp" 
        loading="lazy"
        fetchPriority="low"
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none grayscale"
        alt="Fundal Footer Atlantis Furnitures"
      />

      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center px-6 pt-12 pb-12 md:pb-6 md:p-12 text-center overflow-y-auto no-scrollbar">
        
        <div className="flex-grow flex flex-col justify-center items-center w-full max-w-[1920px] mx-auto">
          <div className="mb-8 md:mb-16 footer-anim w-full shrink-0">
            <div className="text-sm md:text-base uppercase tracking-[0.3em] mb-4 md:mb-6 text-gray-400">Ai un proiect in minte?</div>
            <a href="tel:0732717666" className="font-display text-[12vw] md:text-[10vw] lg:text-9xl leading-none hover:text-gray-400 transition-colors block mix-blend-difference" aria-label="Suna acum la 0732 717 666">
              CONTACT
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-24 text-center md:text-left footer-anim w-full max-w-6xl justify-items-center md:justify-items-start shrink-0">
            
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

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-12 md:gap-6 text-xs text-gray-500 uppercase tracking-widest footer-anim mt-16 md:mt-0 shrink-0 relative">
          
          {/* Left side (empty on desktop to balance the right side) */}
          <div className="hidden md:block md:w-32"></div>

          {/* Center content */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 md:absolute md:left-1/2 md:-translate-x-1/2">
            <span className="leading-none">© {new Date().getFullYear()} ATLANTIS FURNITURES</span>
            <span className="hidden md:block leading-none opacity-20 text-gray-500">|</span>
            <a 
              href="https://www.rankster.ro" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-1.5 opacity-60 hover:opacity-100 hover:text-white transition-all duration-300 leading-none"
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