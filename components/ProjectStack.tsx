import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { ArrowRight } from 'lucide-react';
import { getOptimizedImageUrl } from '../utils';

gsap.registerPlugin(ScrollTrigger);

interface ProjectWithTarget extends Project {
  targetCategory: string;
}

const projects: ProjectWithTarget[] = [
  {
    id: 1,
    number: "01",
    title: "Bucatarii la Comanda",
    location: "MDF VOPSIT / FREZAT / PROIECTARE 3D",
    description: "Transformam inima casei tale intr-un spatiu functional si elegant. Producem mobila de bucatarie personalizata, optimizata pentru orice tip de spatiu, de la apartamente de bloc la case spatioase. Folosim exclusiv fronturi din MDF vopsit sau infoliat si sisteme de feronerie Blum cu amortizare, garantand durabilitate si un design unitar.",
    imageUrl: "/projects/S House/s-house-living-bucatarie-open-space-mdf-furnir-pipera.webp",
    targetCategory: "Bucatarie"
  },
  {
    id: 2,
    number: "02",
    title: "Dressing-uri si Livinguri",
    location: "COMPARTIMENTARE INTELIGENTA / USI GLISANTE",
    description: "Solutii complete de amenajare pentru linistea ta. Realizam dressinguri la comanda cu usi glisante, ideale pentru holuri inguste sau dormitoare matrimoniale, unde fiecare centimetru conteaza. Completam designul casei cu mobilier de living minimalist, comode TV suspendate si biblioteci care mascheaza cablurile sau elementele tehnice.",
    imageUrl: "/projects/S House/amenajare-living-modern-panouri-lemn-atlantis-furnitures.webp",
    targetCategory: "Living"
  },
  {
    id: 3,
    number: "03",
    title: "Office si Spatii Comerciale",
    location: "RECEPTII / BIROURI / SPATII HORECA",
    description: "Imaginea afacerii tale construita prin design. Proiectam si executam mobilier pentru spatii comerciale, receptii custom si birouri ergonomice care rezista la trafic intens. Oferim solutii de amenajare interioara care imbina estetica brandului tau cu functionalitatea necesara echipei, totul la un pret de producator direct.",
    imageUrl: "/projects/OFFICE/amenajare-sala-meeting-moderna-masa-organica-lemn.webp",
    targetCategory: "Office"
  }
];

const ProjectCard = React.memo(({ project }: { project: ProjectWithTarget }) => {
  return (
    <div className="card-item sticky top-[5dvh] h-[90dvh] w-full flex items-center justify-center mb-[5vh]">
      <div className="card-inner group w-full h-full bg-[#1a1a1a] border border-white/10 relative overflow-hidden flex flex-col md:flex-row shadow-2xl will-change-transform rounded-xl md:rounded-none">
        
        {/* Content Panel */}
        <div className="card-content flex flex-col flex-1 z-10 bg-[#1a1a1a] order-last md:order-first relative p-5 md:p-12 lg:p-16 w-full md:w-1/2 overflow-hidden">
          
          <div className="flex-1 flex flex-col justify-start md:justify-center">
            <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-8 leading-tight shrink-0 text-white">
              {project.title}
            </h3>
            
            <div className="text-gray-300 font-normal leading-relaxed text-base lg:text-lg">
              {project.description}
            </div>
          </div>
          
          {/* Button Area */}
          <div className="mt-4 pt-4 md:mt-6 md:pt-6 border-t border-white/5 w-full shrink-0">
            <Link 
              to="/proiecte"
              aria-label={`Vezi detalii despre ${project.title}`}
              className="group/btn relative inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-transparent border border-white/20 overflow-hidden transition-all duration-500 hover:border-white hover:bg-white"
            >
              <span className="relative z-10 text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-white transition-colors duration-500 group-hover/btn:text-black">
                Vezi Detalii
              </span>
              <ArrowRight className="relative z-10 w-4 h-4 text-white transition-all duration-500 group-hover/btn:text-black group-hover/btn:translate-x-1" />
            </Link>
          </div>

        </div>

        {/* Image Panel */}
        <div className="card-img-wrap relative w-full md:w-1/2 h-[35%] md:h-full overflow-hidden order-first md:order-last border-b md:border-b-0 md:border-l border-white/5 shrink-0">
          <img 
            src={getOptimizedImageUrl(project.imageUrl)} 
            loading="lazy"
            decoding="async"
            fetchpriority="low"
            className="card-img w-full h-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-105 group-hover:brightness-120 brightness-110 contrast-105" 
            alt={project.title} 
          />
        </div>

      </div>
    </div>
  );
});

const ProjectStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.card-item');
      
      cards.forEach((card: HTMLElement, i) => {
        const nextCard = cards[i + 1] as HTMLElement;
        const innerCard = card.querySelector('.card-inner');

        if (nextCard && innerCard) {
          gsap.to(innerCard, {
            scale: 0.9,
            opacity: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top bottom",
              end: "top 10dvh",
              scrub: true
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="work" className="py-20 bg-atl-dark text-atl-bg relative">
      <div className="text-center mb-16 px-6">
        <span className="block text-sm uppercase tracking-widest mb-4 opacity-70">Expertiza Noastra</span>
        <h2 className="font-display text-3xl md:text-6xl flex items-center justify-center gap-3 md:gap-5">
          Proiecte Recente de Mobilier la Comanda
        </h2>
      </div>

      <div className="w-full max-w-[1600px] mx-auto pb-[10vh] px-4 md:px-6">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectStack;