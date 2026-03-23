import React, { useRef, useLayoutEffect } from 'react';
import SEO from './SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, PenTool, Layers, Handshake, Component } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const partnerCategories = [
  {
    title: 'Design & Arhitectura',
    description: 'Colaboram cu studiouri de top pentru a transforma viziunea ta intr-o realitate functionala si estetica.',
    icon: <PenTool className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />,
    partners: [
      {
        name: 'Laboratorul de Arhitectura',
        url: 'https://laboratorul.ro',
        description: 'Studio de arhitectura si design interior cu o vasta experienta in proiecte rezidentiale premium. Echipa se remarca prin amenajari spectaculoase pentru apartamente si penthouse-uri, oferind un design rafinat, atentie obsesiva la detalii si solutii personalizate care redefinesc standardele locuirii moderne.'
      },
      {
        name: 'Above Interiors',
        url: 'https://aboveinteriors.ro',
        description: 'Echipa dedicata de designeri ce ofera servicii complete si integrate. Procesul lor acopera absolut totul: de la conceptul initial, relevee si randari 3D ultra-realiste, pana la schite tehnice, planuri detaliate, coordonarea atenta a santierului si executia finala a proiectului, transformand orice spatiu intr-un camin ideal.'
      },
      {
        name: 'Postcard Projects',
        url: 'https://postcardprojects.ro',
        description: 'Studioul de design interior si consultanta care ajuta parintii sa mobileze si sa personalizeze camerele si spatiile de joaca ale copiilor. Se axeaza pe mobilier modular, rezistent in timp si 100% functional. Ofera o atentie deosebita detaliilor estetice, amenajand spatiul conform etapelor de dezvoltare ale copilului - o camera care creste odata cu el.'
      },
      {
        name: 'Because DMA',
        url: 'https://becausedma.com',
        description: 'Design Matters Architects ofera servicii complete de proiectare, arhitectura de interior, concept de mobilier si management de proiect. Echipa creeaza spatii de locuit unice si durabile, adaptate stilului tau de viata, punand accent pe un design elegant, materiale de inalta calitate si solutii functionale care imbina perfect estetica si confortul.'
      }
    ]
  },
  {
    title: 'Accesorii Mobilier si Pereti Volumetrici',
    description: 'Detaliile fac diferenta. Colaboram cu furnizori de top pentru feronerie premium, sisteme inteligente si elemente decorative volumetrice care completeaza perfect designul mobilierului.',
    icon: <Component className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />,
    partners: [
      {
        name: 'Radical RP',
        url: 'https://radicalrp.ro/',
        description: 'Cu o experienta solida pe piata din 1994, Radical RP este un furnizor de incredere pentru accesorii de mobilier si feronerie premium. Portofoliul lor vast include manere de design, adezivi profesionali si solutii tehnice de inalta calitate, esentiale pentru realizarea unui mobilier durabil si impecabil finisat.'
      },
      {
        name: 'Brico Wood Trade',
        url: 'https://bricowoodtrade.ro/',
        description: 'Partener de incredere in distributia de materiale si accesorii pentru industria mobilei, Brico Wood Trade se distinge prin calitatea superioara a produselor si promptitudinea serviciilor. Oferind solutii tehnice de top, precum sistemele avansate Hettich, ei asigura functionalitatea perfecta si fiabilitatea fiecarui proiect.'
      },
      {
        name: 'Vila Home Design',
        url: 'https://vilahomedesign.ro/',
        description: 'Producator romanesc specializat in solutii decorative inovatoare, de la panouri volumetrice si riflaje din lemn, pana la masti de calorifer si decoratiuni personalizate. Vila Home Design imbina estetica moderna cu functionalitatea, oferind elemente arhitecturale care transforma orice spatiu intr-un ambient rafinat.'
      }
    ]
  },
  {
    title: 'Finisaje Interioare',
    description: 'Lucram cu cei mai buni furnizori de materiale pentru a garanta calitatea si durabilitatea fiecarui detaliu din casa ta.',
    icon: <Layers className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />,
    partners: [
      {
        name: 'Varese',
        url: 'https://varese.ro',
        description: 'Distribuitor unic al brandului premium Betek, Varese ofera o gama completa de finisaje in constructii fabricate dupa o tehnologie germana de ultima generatie. Portofoliul lor include vopsele lavabile pentru interior si exterior, tencuieli decorative, lacuri si vopsele pentru lemn, oferind totodata productia de culori personalizate pe loc prin sistemul inovator Betekmix.'
      },
      {
        name: 'House of VLAdiLA',
        url: 'https://vladila.ro',
        description: 'Brand romanesc de lux, recunoscut international pentru colectiile sale spectaculoase de tapet realizate de designeri talentati. Pe langa tapetul cu un puternic impact vizual, portofoliul lor s-a extins cu linii de mobilier exclusivist si materiale textile premium, oferind solutii complete pentru amenajari interioare cu o personalitate artistica inconfundabila.'
      },
      {
        name: 'Orient Ceramic',
        url: 'https://orientceramic.ro',
        description: 'Cu o experienta de peste 15 ani, Orient Ceramic este cel mai mare importator si distribuitor de finisaje premium. Ofera o selectie impresionanta de gresie portelanata rectificata, faianta, parchet laminat, covoare ceramice, mozaic, piatra naturala, marmura si granit, punand la dispozitie si un simulator AI avansat pentru vizualizarea finisajelor in spatiul tau.'
      }
    ]
  }
];

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from('.hero-elem', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.1
      });

      // Line animation
      gsap.from('.hero-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.5,
        ease: 'expo.inOut',
        delay: 0.5
      });

      // CTA Animation
      gsap.from('.cta-section', {
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Refresh ScrollTrigger after a short delay to ensure DOM is fully painted
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const openContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const event = new CustomEvent('openContactModal');
    window.dispatchEvent(event);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-atl-dark text-atl-bg relative overflow-hidden">
      <SEO 
        title="Servicii de Proiectare si Montaj Mobila | Atlantis Furnitures" 
        description="Consultanta design premium ✓ productie din mdf vopsit ✓ montaj profesional. Transforma-ti ideile in realitate ⭐ cu Atlantis Furnitures. Cere o oferta!"
        keywords="proiectare 3d mobila gratuita, masuratori mobila la domiciliu, montaj mobilier inclus, proces vopsire mdf, consultanta design mobilier, feronerie blum premium, servicii proiectare bucatarii, producator mobila cu montaj inclus"
        canonicalUrl="https://atlantisfurnitures.ro/servicii"
      />

      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF6B6B]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-atl-bg/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="pt-40 pb-20 md:pt-52 md:pb-32 px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto relative z-10">
        <div className="max-w-4xl">
          <div className="hero-elem flex items-center gap-4 mb-6 md:mb-8">
            <div className="w-12 h-px bg-[#FF6B6B]"></div>
            <span className="uppercase tracking-[0.3em] text-xs md:text-sm text-gray-400 font-medium">Reteaua Noastra</span>
          </div>
          <h1 className="hero-elem font-display text-[10vw] sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8">
            Servicii & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-atl-bg to-gray-500">
              Parteneri
            </span>
          </h1>
          <h2 className="hero-elem text-gray-400 text-lg md:text-2xl font-light max-w-2xl leading-relaxed">
            Calitatea exceptionala a mobilierului nostru este rezultatul unei munci de echipa si al parteneriatelor solide pe care le-am construit de-a lungul timpului.
          </h2>
        </div>
      </section>

      {/* Services List */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto pb-32 relative z-10">
        <div className="hero-line w-full h-px bg-atl-bg/10 mb-16 md:mb-24"></div>
        
        <div className="flex flex-col gap-24 md:gap-32">
          {partnerCategories.map((category, catIndex) => (
            <div key={catIndex} className="service-category">
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start mb-12 md:mb-16">
                <div className="p-4 rounded-full bg-atl-bg/5 border border-atl-bg/10 text-atl-accent">
                  {category.icon}
                </div>
                <div>
                  <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-[1.1]">
                    {category.title}
                  </h2>
                  <p className="text-gray-300 font-normal leading-relaxed text-base md:text-lg max-w-3xl tracking-wide">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${category.partners.length >= 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-3'} gap-6 md:gap-8`}>
                {category.partners.map((partner, pIndex) => (
                  <a 
                    key={pIndex}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partner-card group flex flex-col justify-between p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl hover:bg-white/[0.02]"
                  >
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl text-white mb-6 group-hover:text-gray-200 transition-colors">
                        {partner.name}
                      </h3>
                      <p className="text-gray-400 font-normal leading-relaxed text-sm tracking-wide mb-8">
                        {partner.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-auto pt-6 border-t border-white/5">
                      <span className="text-xs uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors duration-300 font-medium">
                        Viziteaza Site
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:-rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto pb-32 relative z-10">
        <div className="cta-section relative overflow-hidden rounded-3xl bg-gradient-to-br from-atl-bg/10 to-atl-bg/5 border border-atl-bg/10 p-10 md:p-20 text-center flex flex-col items-center justify-center">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-atl-bg/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          
          <Handshake className="w-12 h-12 md:w-16 md:h-16 text-atl-bg/50 mb-8" strokeWidth={1} />
          
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-6 text-white leading-[1.1]">
            Devino Partener
          </h2>
          
          <p className="text-gray-300 font-normal leading-relaxed text-base md:text-lg max-w-2xl mx-auto mb-10 tracking-wide">
            Esti furnizor de materiale, designer sau arhitect? Suntem mereu deschisi la noi colaborari de succes care sa aduca valoare clientilor nostri.
          </p>
          
          <a 
            href="#contact" 
            onClick={openContact}
            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-atl-bg text-atl-dark rounded-full overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <span className="relative z-10 font-medium tracking-widest uppercase text-sm">
              Contacteaza-ne
            </span>
            <div className="relative z-10 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <ArrowRight size={16} />
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;
