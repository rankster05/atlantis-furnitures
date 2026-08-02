import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from './Hero';
import Intro from './Intro';
import ProjectStack from './ProjectStack';
import Process from './Process';
import Testimonials from './Testimonials';
import SEO from './SEO';

interface HomeProps {
  isLoaded?: boolean;
}

const Home: React.FC<HomeProps> = ({ isLoaded = true }) => {
  return (
    <>
      <SEO
        title="Mobilier la Comanda Bucuresti | Atlantis Furnitures"
        description="Mobilier la comanda din MDF si PAL pentru Bucuresti si Ilfov: bucatarii, dressinguri, livinguri, office. Atelier propriu, montaj inclus, oferta in 24h."
        canonicalUrl="https://atlantisfurnitures.ro/"
      />
      <Hero startAnimation={isLoaded} />
      <Intro />
      <ProjectStack />

      {/* Social Proof Section (Recenzii) — follows the dark project stack */}
      <Testimonials />

      {/* Methodology Section (Cum lucram) — now below the reviews */}
      <Process />

      {/* Philosophy / CTA Section before footer.
          Follows the cream Process section, so it carries a subtle divider and
          a trimmed top padding to avoid a doubled cream gap. */}
      <section className="pt-16 md:pt-20 pb-28 md:pb-36 bg-atl-bg text-center flex flex-col items-center justify-center relative z-10 px-6 border-t border-atl-dark/5">
        {/* The visible headline is the heading. There used to be a screen-reader
            -only <h2> with different wording above a plain <p> — two competing
            titles for one section, and the one crawlers read was invisible. */}
        <h2 className="font-display text-3xl md:text-5xl mb-8 m-0">De la Idee la Realitate</h2>
        <div className="max-w-3xl text-gray-800 font-light mb-12 leading-relaxed text-lg md:text-xl">
          Fie ca ai nevoie de o bucatarie moderna optimizata pentru spatii mici sau de un dressing complex,
          echipa noastra se ocupa de tot procesul: <strong>masuratori, proiectare 3D, executie si montaj</strong> in
          toata tara pentru proiecte premium.
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <Link
            to="/servicii/"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-atl-dark text-atl-bg rounded-full hover:bg-atl-accent transition-colors duration-300"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-medium">Vezi serviciile noastre</span>
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contact/"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-atl-dark/30 text-atl-dark rounded-full hover:bg-atl-dark hover:text-atl-bg transition-colors duration-300"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-medium">Cere oferta</span>
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;