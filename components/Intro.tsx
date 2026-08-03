import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Single source of truth: the same string is both animated word-by-word and
// exposed to assistive tech, so it must not be written out twice.
const INTRO_PARAGRAPHS = [
  'Intelegem provocarile apartamentelor noi, de aceea suntem specializati in amenajari interioare inteligente si mobilier incastrat.',
  'In atelierul nostru, transformam materie prima de top – de la MDF vopsit si frezat pana la lemn masiv – in piese de mobilier unicat. Oferim solutii complete de bucatarii la comanda, dressinguri walk-in si mobilier comercial, folosind exclusiv feronerie de durata si finisaje premium.',
];

const Intro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const splitText = (text: string) => {
    return text.split(' ').map((word, i) => (
      <React.Fragment key={i}>
        <span className="word-wrap inline-block">
          <span className="word-inner">{word}</span>
        </span>
        {" "}
      </React.Fragment>
    ));
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Select all elements that need splitting animation
      const splitElements = gsap.utils.toArray('.split-animate');
      
      splitElements.forEach((el: any) => {
        // Find inner words
        const words = el.querySelectorAll('.word-inner');
        
        // Convert NodeList to Array to avoid GSAP warning
        if (words.length > 0) {
          gsap.to(Array.from(words), {
            y: "0%",
            duration: 1,
            ease: "power3.out",
            stagger: 0.02,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="py-24 md:py-32 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-[1800px] mx-auto bg-atl-bg">
      <div className="text-center md:text-left">
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl leading-[1.3] md:leading-[1.2] text-gray-900" aria-label="Mobilier Modern Adaptat Nevoilor Tale">
          <span className="split-animate block" aria-hidden="true">
            {splitText("Mobilier Modern Adaptat Nevoilor Tale")}
          </span>
        </h2>
      </div>
      <div className="text-lg md:text-xl font-normal leading-relaxed text-gray-900 text-center md:text-left">
        {/* The visible text is split into one span per word so it can animate.
            Those spans are hidden from assistive tech, and the readable copy
            used to live in an aria-label on the <p> — but a paragraph cannot
            be named, so that label was simply dropped and these two paragraphs
            reached screen readers and AI agents as empty. The real text now
            sits in a visually-hidden span, which is readable by both. */}
        {INTRO_PARAGRAPHS.map((text) => (
          <p key={text.slice(0, 24)} className="mb-8 split-animate">
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">{splitText(text)}</span>
          </p>
        ))}
        
        <div className="h-px w-full bg-black/10 my-8"></div>
        
        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-8 md:gap-12 split-animate">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 font-bold">Materiale Premium</h3>
            <p className="text-xs uppercase tracking-widest font-medium text-gray-900">MDF Vopsit / Frezat / Furnir / Lemn Masiv</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 font-bold">Acoperire Bucuresti si Ilfov</h3>
            <p className="text-xs uppercase tracking-widest font-medium text-gray-900">Nationala / Calitate Premium</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;