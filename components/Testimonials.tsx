import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ExternalLink, Map, ArrowRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Google Logo Component for authenticity
const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.734 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
    </g>
  </svg>
);

const reviews = [
  {
    id: 1,
    name: "Magda Baciu",
    date: "acum 6 ore",
    text: "I have already worked with Nicu's team twice, and I am very happy with how the furniture looks. The Atlantis team knows how to work with technical details, and to translate exactly what appears in the renderings. I also appreciated that when there was something I wanted to change because I changed my mind, they were open and took care of it. I recommend them as a partner",
    initial: "M"
  },
  {
    id: 2,
    name: "Ionut Mihai Avram",
    date: "acum 4 luni",
    text: "I recommend with confidence! Team of professionals!",
    initial: "I"
  },
  {
    id: 3,
    name: "Gabriela Radu",
    date: "acum 4 luni",
    text: "Totul a decurs impecabil, nu am nimic de reprosat. Orice dubiu sau nemultumire ai, discuti si se rezolva, sunt niste oameni foarte implicati in ceea ce fac si se axeaza pe “clientul multumit, aduce alti clienti”. Mi-au facut doua bucatarii superbe si le multumesc.",
    initial: "G"
  },
  {
    id: 4,
    name: "OV",
    date: "acum 4 luni",
    text: "O echipa de nota 10. Sunt profesionisti iar montajul si mobila de calitate exceptionala! Totul s-a potrivit cum nu speram mai bine! Va multumim si cu incredere mai apelam la voi pentru urmatorul proiect. Sa tot lucrezi cu oameni ca voi! Respect!",
    initial: "O"
  },
  {
    id: 5,
    name: "Andreea Curea",
    date: "acum 5 luni",
    text: "Echipa a dat dovada de profesionalism si seriozitate. Mobila este de calitate si montajul a fost rapid si curat. Au fost respectate toate cerintele noastre de design si ni s-au oferit solutii practice. Recomand Atlantis!",
    initial: "A"
  },
  {
    id: 6,
    name: "Andra Neacsa",
    date: "acum 5 luni",
    text: "Am facut 90% din mobila casei la Atlantis. Mobilier de calitate, foarte bine lucrat, exact cum mi-am dorit si la un pret bun. Echipa este serioasa, prietenoasa si mereu gata sa ajute. Recomand cu drag!",
    initial: "A"
  },
  {
    id: 7,
    name: "alina velicu",
    date: "acum 6 luni",
    text: "I turned to Atlantis 7 years ago to furnish my entire apartment and it was one of the best decisions. The furniture they made is not only beautiful and practical, but also extremely durable – after so many years it looks and works flawlessly, as on the first day. Everything was done with attention to detail, seriousness and respect for the customer. I highly recommend them to anyone who wants quality, custom-made furniture that will last over time.",
    initial: "A"
  },
  {
    id: 8,
    name: "Diana Nicolae",
    date: "acum 6 luni",
    text: "With Atlantis, dreams come true!",
    initial: "D"
  },
  {
    id: 9,
    name: "Cristiana-Sorina Stroe-Mihai",
    date: "acum 6 luni",
    text: "Impeccable services! I recommend with all sincerity!",
    initial: "C"
  },
  {
    id: 10,
    name: "Cristina Patru",
    date: "acum 6 luni",
    text: "Attention to detail and perfect professionalism!",
    initial: "C"
  }
];

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from('.header-anim', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });

      // Map Animation
      gsap.from('.map-card', {
        scale: 0.98,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.map-section',
          start: "top 80%",
        }
      });

      // Infinite Marquee Animation
      const slider = sliderRef.current;
      if (slider) {
        gsap.to(slider, {
          x: "-50%", 
          duration: 50, // Even smoother
          ease: "none",
          repeat: -1,
        });

        slider.addEventListener("mouseenter", () => gsap.globalTimeline.timeScale(0));
        slider.addEventListener("mouseleave", () => gsap.globalTimeline.timeScale(1));
        slider.addEventListener("touchstart", () => gsap.globalTimeline.timeScale(0));
        slider.addEventListener("touchend", () => gsap.globalTimeline.timeScale(1));
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-[#0a0a0a] text-white relative overflow-hidden border-t border-white/5">
      
      <div className="max-w-[1920px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-24 px-6 md:px-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div className="header-anim max-w-2xl w-full">
            <div className="flex items-center gap-3 mb-6">
               <GoogleLogo />
               <h3 className="text-sm font-bold text-white tracking-wide m-0">Recenzii Verificate Google</h3>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl mb-8 leading-[1.1] md:leading-none">
              Ce Spun Clientii Nostri
            </h2>
            
            {/* Google Badge - Official Look */}
            <a 
              href="https://maps.app.goo.gl/XTWjkhW4PmYDpWGG8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 bg-[#1a1a1a] border border-white/10 rounded-lg p-4 hover:border-white/30 transition-all duration-300"
              aria-label="Vezi recenziile noastre pe Google"
            >
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-xl text-white">5.0</span>
                        <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(i => (
                                <Star key={i} size={16} fill="#FACC15" className="text-yellow-400" />
                            ))}
                        </div>
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                        Bazat pe recenzii reale Google
                    </span>
                </div>
                <ArrowRight size={20} className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </a>
          </div>
        </div>

        {/* Infinite Slider Section - Google Card Style */}
        <div className="relative w-full overflow-hidden mb-24 md:mb-32 cursor-grab active:cursor-grabbing py-4">
           {/* Gradient Masks for smooth fade */}
           <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
           <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

           <div ref={sliderRef} className="flex w-max gap-6 px-6">
              {/* Double array for loop */}
              {[...reviews, ...reviews].map((review, index) => (
                <div 
                  key={`${review.id}-${index}`} 
                  className="w-[300px] md:w-[400px] bg-[#161616] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between shrink-0 group hover:border-white/20 hover:bg-[#1a1a1a] transition-all duration-300 shadow-lg"
                >
                    {/* User Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center font-bold text-sm text-white border border-white/10">
                                {review.initial}
                            </div>
                            <div>
                                <p className="font-bold text-sm text-white m-0">{review.name}</p>
                                <span className="text-xs text-gray-500">{review.date}</span>
                            </div>
                        </div>
                        <GoogleLogo />
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} size={14} fill="#FACC15" className="text-yellow-400" />
                        ))}
                    </div>

                    {/* Review Text */}
                    <p className="font-normal text-gray-300 text-sm md:text-base leading-relaxed mb-6 line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                      "{review.text}"
                    </p>

                    {/* Footer */}
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-medium text-blue-400 opacity-80 group-hover:opacity-100 transition-opacity">
                        <Quote size={12} className="fill-current" />
                        <span>Recenzie Verificata</span>
                    </div>
                </div>
              ))}
           </div>
        </div>

        {/* Service Area Map Module - Optimized Visibility */}
        <div className="map-section px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
           <a 
             href="https://maps.app.goo.gl/XTWjkhW4PmYDpWGG8"
             target="_blank"
             rel="noopener noreferrer"
             className="map-card group block relative w-full h-[400px] sm:h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden rounded-2xl md:rounded-3xl border border-white/5 shadow-2xl"
             aria-label="Deschide locatia noastra in Google Maps"
           >
              {/* Map Container - Deep Dark Premium Filter */}
              <div className="absolute inset-0 bg-[#050505] transition-transform duration-[2s] group-hover:scale-105">
                 <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d182276.57463765476!2d25.95455268487771!3d44.43792697843339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f93abf3cad4f%3A0xac0632e37c9ca628!2sBucure%C8%99ti!5e0!3m2!1sen!2sro!4v1710000000000!5m2!1sen!2sro" 
                   width="100%" 
                   height="100%" 
                   style={{border:0, filter: 'grayscale(100%) invert(92%) contrast(83%) brightness(85%) hue-rotate(180deg)'}} 
                   allowFullScreen={false} 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   className="opacity-50 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                   title="Zona de Acoperire Atlantis Furnitures"
                 ></iframe>
              </div>
              
              {/* Overlay Gradients - Vignette and Bottom Fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent opacity-95"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_100%)] opacity-40"></div>

              {/* Content Overlay - Minimalist & Mobile Optimized */}
              <div className="absolute inset-0 p-6 sm:p-8 md:p-12 flex flex-col justify-end z-10">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 w-full">
                    <div className="w-full md:w-auto max-w-xl">
                       <div className="flex items-center gap-3 mb-4">
                          <div className="p-2.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 group-hover:border-atl-accent/50 transition-colors duration-500">
                             <Map className="w-4 h-4 text-atl-accent" />
                          </div>
                          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/80">Zona de Acoperire</span>
                       </div>
                       
                       <p className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-3 md:mb-4 leading-tight tracking-tight m-0">
                         Acoperire Nationala
                       </p>
                       
                       <p className="text-gray-400 font-light text-sm sm:text-base max-w-md leading-relaxed">
                         Oferim servicii complete de masuratori, proiectare si montaj la nivel national pentru proiecte premium.
                       </p>
                    </div>

                    <div className="w-full md:w-auto flex justify-start md:justify-end shrink-0">
                       <div className="inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 w-full md:w-auto bg-white text-black rounded-full font-medium text-xs sm:text-sm uppercase tracking-widest group-hover:bg-atl-accent group-hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                          <span>Deschide Harta</span>
                          <ExternalLink className="w-4 h-4" />
                       </div>
                    </div>
                 </div>
              </div>
           </a>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;