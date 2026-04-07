import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft } from 'lucide-react';
import SEO from './SEO';

const NotFound: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nf-anim', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full bg-atl-dark text-atl-bg flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <SEO 
        title="Pagina Nu A Fost Gasita | Atlantis Furnitures" 
        description="Ne cerem scuze, dar pagina pe care o cautati nu exista sau a fost mutata."
        canonicalUrl="https://atlantisfurnitures.ro/404"
        noindex={true}
      />
      
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white/5 rounded-full blur-[100px]" />
      </div>

      <div className="text-center relative z-10">
        <h1 className="nf-anim font-display text-[15vw] md:text-[12vw] leading-none text-white/10 select-none">
          404
        </h1>
        <div className="nf-anim -mt-8 md:-mt-16 mb-8">
          <h2 className="text-2xl md:text-4xl font-light mb-4">Pagina Nu A Fost Gasita</h2>
          <p className="text-gray-400 font-light max-w-md mx-auto text-sm md:text-base">
            Se pare ca ai ajuns intr-o zona neproiectata. Aceasta pagina nu exista sau a fost mutata.
          </p>
        </div>
        
        <Link 
          to="/" 
          className="nf-anim group inline-flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-[0.2em] text-white">Inapoi Acasa</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;