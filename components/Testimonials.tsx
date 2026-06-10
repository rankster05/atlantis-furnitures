import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ExternalLink, Map, ArrowRight, Quote, Instagram, Facebook, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type VipReview = {
  id: string;
  name: string;
  role?: string;
  image: string;
  instagram?: string;
  facebook?: string;
  text: string;
};

// VIP / featured testimonials — personalitati cunoscute.
const vipReviews: VipReview[] = [
  {
    id: 'vip-alexia',
    name: 'Alexia Talavutis',
    role: 'Artist & Prezentator TV',
    image: '/testimonials-vip/alexia-talavutis.jpg',
    instagram: 'https://www.instagram.com/alexia.talavutis',
    text: 'Mi-am dorit ca fiecare colt din casa noastra sa aiba personalitate, asa ca am ales mobilier facut complet la comanda. Un proiect mare, pe 3 nivele, cu multe detalii si idei curajoase. Nicu si echipa de la Atlantis Furnitures au inteles exact ce ne dorim si au dus totul pana la capat cu multa rabdare si implicare. Cred ca asta face diferenta: oamenii care pun suflet in ceea ce construiesc.',
  },
  {
    id: 'vip-sore',
    name: 'Sore',
    role: 'Artista',
    image: '/testimonials-vip/sore-mihalache.jpg',
    instagram: 'https://www.instagram.com/soreonline',
    text: 'Orice idei creative pentru mobilier am avut, Atlantis Furnitures a fost alaturi de mine. La ei nu exista „nu se poate!”.',
  },
  {
    id: 'vip-pautov',
    name: 'Dr. Mihail Pautov',
    role: 'Medic',
    image: '/testimonials-vip/dr-mihail-pautov.jpg',
    instagram: 'https://www.instagram.com/doctor.mihail',
    text: 'Sunt genul de om care observa detaliile. Iar spatiul in care filmez trebuia sa fie exact cum imi imaginam: simplu, curat si fara nimic in plus. Echipa Atlantis Furnitures a avut rabdarea sa faca totul pana la ultimul detaliu. Si cred ca asta face diferenta intre ceva facut „ok” si ceva facut foarte bine. Un spatiu bine gandit iti da liniste si claritate fara sa-ti dai seama.',
  },
  {
    id: 'vip-cristina',
    name: 'Cristina Stroe',
    role: 'Arhitect & Designer Interior',
    image: '/testimonials-vip/cristina-stroe.jpg',
    instagram: 'https://www.instagram.com/cri_stroe/',
    text: 'Am colaborat cu Atlantis Furniture de-a lungul anilor atat din perspectiva de arhitect si designer de interior, cat si din cea de client, iar unul dintre lucrurile pe care le-am apreciat cel mai mult a fost disponibilitatea lor de a gasi solutii chiar si atunci cand termenele erau foarte stranse. M-au ajutat in numeroase proiecte cu deadline-uri dificile, printr-o comunicare eficienta si solutii adaptate atat cerintelor proiectului, cat si bugetului disponibil. Le multumesc pentru colaborarea de pana acum si pentru sprijinul oferit de-a lungul anilor.',
  },
  {
    id: 'vip-virgil',
    name: 'Virgil Iantu',
    role: 'Prezentator TV',
    image: '/testimonials-vip/virgil-iantu.jpg',
    facebook: 'https://www.facebook.com/iantu.virgil',
    text: 'Mai o schita, mai o explicatie, mai o gluma si mobila e gata. Asa am crezut, pana cand Jasmina a realizat ca nuanta mobilei din camera ei nu e cea dorita. Nicu a ras si s-a executat. Altfel eram eu cel executat. Multumesc pentru gasirea de solutii, pentru efort si pentru rezultat. Spor!',
  },
];

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
  const vipTrackRef = useRef<HTMLDivElement>(null);
  // Which VIP card is expanded (tap-to-reveal on touch devices)
  const [activeVip, setActiveVip] = useState<string | null>(null);
  const activeVipRef = useRef<string | null>(null);

  const toggleVip = (id: string) => {
    setActiveVip((prev) => {
      const next = prev === id ? null : id;
      activeVipRef.current = next;
      return next;
    });
  };

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

      // VIP carousel — fade the whole strip in once on scroll into view.
      gsap.from('.vip-carousel-anim', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.vip-carousel-anim', start: 'top 85%' },
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

  // VIP carousel — native horizontal scroll (real touch-swipe) + slow auto-scroll.
  // Cards are duplicated so the rightward auto-scroll loops seamlessly. Auto-scroll
  // pauses on hover (desktop) and on touch/drag (mobile), resuming after inactivity.
  useEffect(() => {
    const el = vipTrackRef.current;
    if (!el) return;

    // The carousel always auto-scrolls (it's a core brand element). It still
    // pauses on hover / touch so users can read a card.
    let paused = false;
    let resumeTimer = 0;
    let raf = 0;
    let pos = el.scrollLeft; // float accumulator (scrollLeft rounds sub-pixel)
    const SPEED = 0.5; // px/frame — slow, premium

    const tick = () => {
      if (!paused && !activeVipRef.current && el.scrollWidth > el.clientWidth) {
        const half = el.scrollWidth / 2;
        pos += SPEED;
        if (pos >= half) pos -= half; // seamless loop
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft; // stay in sync during manual scroll / pause
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Keep manual scrolling within the first copy so swiping right is infinite too.
    const onScroll = () => {
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) {
        el.scrollLeft -= half;
        pos = el.scrollLeft;
      }
    };

    const pause = () => {
      paused = true;
      window.clearTimeout(resumeTimer);
    };
    const resume = () => {
      paused = false;
    };
    const resumeLater = () => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        paused = false;
      }, 1500);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);
    el.addEventListener('pointerdown', pause);
    el.addEventListener('pointerup', resumeLater);
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('touchend', resumeLater, { passive: true });
    el.addEventListener('wheel', () => { pause(); resumeLater(); }, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resumeTimer);
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
      el.removeEventListener('pointerdown', pause);
      el.removeEventListener('pointerup', resumeLater);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend', resumeLater);
    };
  }, []);

  return (
    <section ref={containerRef} className="content-visibility-auto py-20 md:py-32 bg-[#0a0a0a] text-white relative overflow-hidden border-t border-white/5">

      {/* VIP carousel + Instagram CTA pulse */}
      <style>{`
        /* Instagram CTA attention pulse */
        @keyframes vipIgPulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(1.7); opacity: 0;   }
          100% { transform: scale(1.7); opacity: 0;   }
        }
        .vip-ig-ring { animation: vipIgPulse 2.4s cubic-bezier(0.22,1,0.36,1) infinite; }
        .vip-ig:hover .vip-ig-ring { animation-play-state: paused; opacity: 0; }

        /* Hidden scrollbar but native touch-swipe stays fully functional */
        .vip-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
        }
        .vip-track::-webkit-scrollbar { display: none; }

        /* DEFAULT (mobile/touch): clean card — image in colour, review collapsed.
           Tapping the card adds .is-active which reveals the review elegantly. */
        .vip-review      { grid-template-rows: 0fr; }
        .vip-review-text { opacity: 0; transform: translateY(8px); transition-delay: 150ms; }
        .vip-accent      { transform: scaleX(0); }
        .vip-img         { filter: grayscale(0); transform: scale(1); }

        .vip-card.is-active .vip-review      { grid-template-rows: 1fr; }
        .vip-card.is-active .vip-review-text { opacity: 1; transform: translateY(0); }
        .vip-card.is-active .vip-accent      { transform: scaleX(1); }
        .vip-card.is-active .vip-name        { transform: translateY(-4px); }
        .vip-card.is-active .vip-img         { transform: scale(1.04); }

        /* DESKTOP (hover-capable pointers): grayscale photo, reveal on hover. */
        @media (hover: hover) and (pointer: fine) {
          .vip-tap-hint    { display: none; }
          .vip-img         { filter: grayscale(0.8); }
          .vip-card:hover .vip-review      { grid-template-rows: 1fr; }
          .vip-card:hover .vip-review-text { opacity: 1; transform: translateY(0); }
          .vip-card:hover .vip-accent      { transform: scaleX(1); }
          .vip-card:hover .vip-name        { transform: translateY(-4px); }
          .vip-card:hover .vip-img         { filter: grayscale(0); transform: scale(1.05); }
        }

        @media (prefers-reduced-motion: reduce) {
          .vip-ig-ring { animation: none; opacity: 0.4; }
        }
      `}</style>

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
              href="https://www.google.com/maps?cid=5080307166075099712" 
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

        {/* VIP / Featured Testimonials — infinite auto-scroll carousel */}
        <div className="vip-carousel-anim mb-24 md:mb-32">
          <div className="px-6 md:px-20">
            <div className="flex items-center gap-3 mb-8 md:mb-12">
              <span className="uppercase tracking-[0.3em] text-[11px] md:text-xs text-atl-accent font-medium">
                Au ales Atlantis
              </span>
              <span className="w-12 h-px bg-white/20" />
            </div>
          </div>

          <div className="relative">
            {/* Edge fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-10 md:w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-10 md:w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

            {/* Native horizontal scroll = real touch-swipe; JS adds slow auto-scroll */}
            <div
              ref={vipTrackRef}
              className="vip-track flex gap-5 md:gap-7 overflow-x-auto px-6 md:px-20 py-2"
              role="list"
              aria-label="Recenzii de la personalitati care au ales Atlantis"
            >
              {[...vipReviews, ...vipReviews].map((vip, idx) => {
                const isActive = activeVip === `${vip.id}-${idx}`;
                return (
                <article
                  key={`${vip.id}-${idx}`}
                  role="listitem"
                  tabIndex={0}
                  aria-expanded={isActive}
                  aria-label={`Recenzie de la ${vip.name} — apasa pentru a citi`}
                  onClick={() => toggleVip(`${vip.id}-${idx}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleVip(`${vip.id}-${idx}`);
                    }
                  }}
                  className={`vip-card group relative shrink-0 w-[300px] sm:w-[340px] md:w-[380px] aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl bg-[#161616] border border-white/10 cursor-pointer select-none ${isActive ? 'is-active' : ''}`}
                >
                  {/* Portrait */}
                  <img
                    src={vip.image}
                    alt={`${vip.name} — recenzie Atlantis Furnitures`}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="vip-img absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out"
                  />

                  {/* Gradient scrim for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Social CTA (top-right) — Instagram or Facebook */}
                  {(vip.instagram || vip.facebook) && (
                    <a
                      href={vip.instagram || vip.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Vezi profilul ${vip.instagram ? 'de Instagram' : 'de Facebook'} al lui ${vip.name}`}
                      className="vip-ig group/ig absolute top-5 right-5 z-30 w-11 h-11"
                    >
                      <span className="vip-ig-ring absolute inset-0 rounded-full border border-white/40 pointer-events-none" />
                      {vip.instagram ? (
                        <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white transition-all duration-300 group-hover/ig:scale-110 group-hover/ig:border-transparent group-hover/ig:bg-[linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)] group-hover/ig:shadow-[0_0_28px_rgba(214,41,118,0.6)]">
                          <Instagram size={20} strokeWidth={1.8} />
                        </span>
                      ) : (
                        <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white transition-all duration-300 group-hover/ig:scale-110 group-hover/ig:border-transparent group-hover/ig:bg-[#1877F2] group-hover/ig:shadow-[0_0_28px_rgba(24,119,242,0.6)]">
                          <Facebook size={20} strokeWidth={1.8} />
                        </span>
                      )}
                    </a>
                  )}

                  {/* Tap hint (touch only) — elegant "+" that rotates when open */}
                  <div className="vip-tap-hint absolute top-5 left-5 z-20 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white pointer-events-none">
                    <Plus
                      size={18}
                      strokeWidth={1.8}
                      className={`transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? 'rotate-[135deg]' : 'rotate-0'}`}
                    />
                  </div>

                  {/* Content: name + review (reveals on hover / tap) */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
                    <div className="vip-name transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
                      {vip.role && (
                        <p className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-white/60 mb-2 font-medium">
                          {vip.role}
                        </p>
                      )}
                      <h3 className="font-display text-2xl md:text-3xl text-white leading-tight">
                        {vip.name}
                      </h3>
                    </div>

                    {/* Accent line */}
                    <div className="vip-accent mt-4 h-px w-10 bg-atl-accent origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />

                    {/* Review — smooth height reveal via grid-rows, no layout jump */}
                    <div className="vip-review grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
                      <div className="overflow-hidden">
                        <p className="vip-review-text pt-4 text-sm md:text-[15px] text-gray-200 font-light leading-relaxed transition-all duration-500 ease-out">
                          {vip.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
                );
              })}
            </div>
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
             href="https://www.google.com/maps?cid=5080307166075099712"
             target="_blank"
             rel="noopener noreferrer"
             className="map-card group block relative w-full h-[400px] sm:h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden rounded-2xl md:rounded-3xl border border-white/5 shadow-2xl"
             aria-label="Deschide locatia noastra in Google Maps"
           >
              {/* Map Container - Deep Dark Premium Filter */}
              <div className="absolute inset-0 bg-[#050505] transition-transform duration-[2s] group-hover:scale-105">
                 <iframe
                   src="https://maps.google.com/maps?cid=5080307166075099712&z=13&output=embed"
                   width="100%"
                   height="100%"
                   style={{border:0, filter: 'grayscale(100%) invert(92%) contrast(83%) brightness(85%) hue-rotate(180deg)'}}
                   allowFullScreen={false}
                   loading="lazy"
                   referrerPolicy="no-referrer-when-downgrade"
                   className="opacity-50 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                   title="Locatia Atlantis Furnitures pe Google Maps"
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
                          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/80">Zona de Acoperire</span>
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