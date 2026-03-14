import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation, Link } from 'react-router-dom';
import { portfolioItems } from '../data';
import { ArrowUpRight, ArrowLeft, Instagram } from 'lucide-react';
import SEO from './SEO';
import { getOptimizedImageUrl } from '../utils';

gsap.registerPlugin(ScrollTrigger);

// Categories updated - Removed "Baie" as per request
const categories = ["Toate", "Bucatarie", "Living", "Dormitor", "Office"];

const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [filteredItems, setFilteredItems] = useState(portfolioItems);

  useEffect(() => {
    if (location.state && location.state.category) {
      const targetCat = location.state.category;
      if (categories.includes(targetCat)) {
        setFilteredItems(portfolioItems.filter(item => item.category === targetCat));
      }
    }
  }, [location]);

  // Initial animation - Luxury Reveal
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from('.pf-header-anim', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.15
      });

      // Horizontal Line Animation
      gsap.from('.pf-line', {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        ease: "expo.out",
        delay: 0.5
      });

      // Items Scroll Animation - Fade In & Slide Up
      const items = gsap.utils.toArray('.pf-item');
      items.forEach((item: HTMLElement) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out"
        });
      });

      // Refresh ScrollTrigger after a short delay to ensure DOM is fully painted
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      
      // Also refresh when all images are fully loaded
      const images = containerRef.current?.querySelectorAll('img') || [];
      let loadedCount = 0;
      
      const onImageLoad = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          ScrollTrigger.refresh();
        }
      };

      images.forEach(img => {
        if (img.complete) {
          onImageLoad();
        } else {
          img.addEventListener('load', onImageLoad);
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO 
        title="Portofoliu Mobilier Premium | Proiecte Atlantis Furnitures" 
        description="Vezi galeria noastra de proiecte recente: bucatarii moderne, dressinguri si mobilier living realizate la comanda pentru proiecte premium." 
        keywords="portofoliu mobila mdf vopsit, poze bucatarii moderne la comanda, proiecte mobilier casa premium, design interior bucatarii premium, modele dressinguri dormitor, galerie proiecte mobila personalizata, executie mobilier mdf poze"
        canonicalUrl="https://atlantisfurnitures.ro/proiecte"
      />
      
      <section ref={containerRef} className="pt-28 md:pt-48 pb-16 md:pb-20 min-h-screen bg-atl-dark text-atl-bg px-4 md:px-12 relative overflow-hidden">
        {/* Subtle Background Image for Navbar Transparency Effect */}
        <div className="absolute top-0 left-0 w-full h-[60vh] opacity-20 pointer-events-none z-0">
          <img 
            src="/projects/ap-cosmo/amenajare-open-space-living-bucatarie-apartament-modern.webp" 
            alt="Fundal portofoliu mobila la comanda" 
            className="w-full h-full object-cover object-top mask-gradient-to-b"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-atl-dark/80 to-atl-dark" />
        </div>

        <div className="max-w-[1920px] mx-auto relative z-10">
          
          {/* Back Button */}
          <div className="flex justify-start mb-12 md:mb-24">
            <Link 
              to="/" 
              className="flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 group"
              aria-label="Inapoi la pagina principala"
            >
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
              </div>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium hidden sm:block">Inapoi Acasa</span>
            </Link>
          </div>

          {/* Header - Editorial Style */}
          <div className="mb-16 md:mb-32">
            <div className="pf-header-anim flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-12 h-px bg-[#FF6B6B]"></div>
              <span className="uppercase tracking-[0.3em] text-xs md:text-sm text-gray-400 font-medium">Selectia Noastra</span>
            </div>
            <h1 className="pf-header-anim font-display text-[10vw] sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8">
              Portofoliu & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-atl-bg to-gray-500">
                Proiecte
              </span>
            </h1>
            <h2 className="pf-header-anim text-gray-400 text-lg md:text-2xl font-light max-w-2xl leading-relaxed">
              Transformam viziunea ta intr-o realitate tangibila si functionala. Fiecare linie, fiecare material este ales cu grija pentru tine.
            </h2>
            
            {/* Horizontal Line Divider */}
            <div className="pf-line w-full h-px bg-white/10 mt-16 md:mt-24"></div>
          </div>

          {/* Luxury Grid Layout - Consistent Grid */}
          <div id="project-grid" className="pf-grid grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-10 gap-y-12 md:gap-y-32 min-h-[50vh]">
            {filteredItems.map((item, index) => (
              <Link 
                to={`/proiecte/${item.slug}`} 
                key={item.id} 
                className="pf-item group cursor-pointer block w-full"
                aria-label={`Vezi proiectul ${item.title}`}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-[#0a0a0a] mb-8">
                  {/* Image with subtle zoom on hover */}
                  <img 
                    src={getOptimizedImageUrl(item.mainImage)} 
                    alt={`Proiectul ${item.title} - ${item.category}`} 
                    loading="lazy"
                    decoding="async"
                    fetchpriority="low"
                    className="pf-img w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100 brightness-110 contrast-105"
                  />

                  {/* Hover Overlay - Minimal Tint */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                  
                  {/* Floating Action Button - Appears on Hover */}
                  <div className="absolute top-6 right-6 z-30 opacity-0 transform -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
                
                {/* Text Content - Minimalist & Typography focused */}
                {/* Removed left border for cleaner 'editorial' look matching the screenshot */}
                <div className="pf-text flex flex-col items-start pl-1 mt-4 md:mt-0">
                  <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs text-gray-300 uppercase tracking-[0.2em] mb-2 md:mb-3 font-medium">
                     <span className="text-white">0{index + 1}</span>
                     <span className="w-6 md:w-8 h-px bg-white/20"></span>
                     <span className="group-hover:text-white transition-colors">{item.category}</span>
                  </div>
                  
                  <h3 className="font-display text-2xl sm:text-3xl md:text-5xl text-white mb-1 md:mb-2 leading-none uppercase group-hover:text-gray-300 transition-colors">
                    {item.title}
                  </h3>
                  
                  {/* Small Description Below - Location & Year */}
                  <div className="text-gray-400 font-normal text-xs md:text-sm tracking-widest mt-1">
                    {item.location} <span className="mx-2 opacity-50">•</span> {item.year}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="w-full text-center py-32 opacity-70 text-sm uppercase tracking-widest text-gray-300 font-normal border-t border-white/5 mt-10" role="status">
              Niciun proiect in aceasta categorie momentan.
            </div>
          )}

        </div>
      </section>

      {/* CTA Section - Minimalist */}
      <section className="py-24 md:py-48 bg-atl-dark text-atl-bg text-center flex flex-col items-center justify-center relative z-10 px-4 border-t border-white/5">
        <h2 className="font-display text-4xl sm:text-5xl md:text-7xl mb-6 md:mb-12">Arta in Detalii.</h2>
        <div className="w-px h-16 md:h-20 bg-gradient-to-b from-transparent via-atl-accent to-transparent mb-8 md:mb-12"></div>
        <p className="max-w-2xl text-gray-300 font-normal mb-12 md:mb-16 leading-relaxed text-sm md:text-base tracking-wide px-4">
          Fiecare proiect pe care il realizam este o poveste despre rafinament, precizie si design atemporal.
          <br className="hidden md:block"/> Descopera mai multa inspiratie si exploreaza zeci de alte amenajari finalizate pe pagina noastra de Instagram.
        </p>
        <a 
          href="https://www.instagram.com/atlantis_furnitures66/" 
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full border border-white/20 overflow-hidden transition-all duration-700 hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          aria-label="Vezi mai multe proiecte pe Instagram"
        >
          {/* Background fill effect */}
          <div className="absolute inset-0 w-full h-full bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
          
          <Instagram size={20} className="relative z-10 text-white group-hover:text-black transition-colors duration-700" />
          <span className="relative z-10 text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-white group-hover:text-black transition-colors duration-700">
            Exploreaza pe Instagram
          </span>
        </a>
      </section>
    </>
  );
};

export default Portfolio;