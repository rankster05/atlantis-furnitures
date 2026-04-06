import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Ruler, PenTool, Hammer, Home } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    icon: Ruler,
    title: "Consultanta si Masuratori Gratuite",
    desc: "Ne deplasam la locatia ta pentru masuratori exacte si discutii despre materiale, culori si functionalitate."
  },
  {
    id: 2,
    icon: PenTool,
    title: "Proiectare 3D Personalizata",
    desc: "Transformam ideile in realitate virtuala. Primesti randari fotorealiste pentru a vizualiza exact cum va arata mobilierul in spatiul tau."
  },
  {
    id: 3,
    icon: Hammer,
    title: "Productie Custom in Atelier Propriu",
    desc: "Folosim utilaje de precizie si finisaje premium (MDF vopsit, frezat, lemn) in atelierul nostru propriu, garantand calitatea executiei."
  },
  {
    id: 4,
    icon: Home,
    title: "Montaj si Livrare Bucuresti",
    desc: "Echipa noastra de montaj asigura instalarea perfecta, curatenia la locul de munca si verificarile finale de functionalitate."
  }
];

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.process-item');
      
      gsap.from(items, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });

      // Line animation
      gsap.from('.process-line', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-atl-bg text-atl-dark relative px-6 md:px-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-20 md:mb-28">
           <span className="text-sm uppercase tracking-[0.3em] text-atl-accent mb-4 block opacity-90">Metodologia Noastra</span>
           <h2 className="font-display text-3xl md:text-5xl lg:text-6xl">Cum Lucram</h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
           {/* Connecting Line (Hidden on mobile, visible on desktop) */}
           <div className="process-line absolute top-12 left-0 w-full h-0.5 bg-atl-accent/20 hidden lg:block" />

           {steps.map((step) => (
             <div key={step.id} className="process-item relative flex flex-col items-center text-center">
                {/* Icon Circle */}
                <div className="w-24 h-24 rounded-full bg-white border border-atl-accent/10 flex items-center justify-center mb-8 relative z-10 shadow-lg group hover:scale-110 transition-transform duration-300">
                   <step.icon size={32} strokeWidth={1.5} className="text-atl-accent" />
                   <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-atl-dark text-white flex items-center justify-center text-sm font-bold font-display border-2 border-white">
                     {step.id}
                   </div>
                </div>

                <h3 className="font-display text-xl mb-4 min-h-[3rem] flex items-center">{step.title}</h3>
                <p className="text-gray-800 font-normal text-base leading-relaxed max-w-xs">
                  {step.desc}
                </p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Process;