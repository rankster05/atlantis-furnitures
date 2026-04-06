import React from 'react';
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
        description="Producem mobilier la comanda din MDF si PAL pentru Bucuresti si Ilfov. Bucatarii, livinguri, dormitoare, dressing-uri, office. Cere oferta gratuita azi!"
        canonicalUrl="https://atlantisfurnitures.ro/"
      />
      <Hero startAnimation={isLoaded} />
      <Intro />
      <ProjectStack />
      
      {/* New Methodology Section */}
      <Process />

      {/* New Social Proof Section */}
      <Testimonials />
      
      {/* Philosophy / CTA Section before footer */}
      <section className="py-32 md:py-40 bg-atl-bg text-center flex flex-col items-center justify-center relative z-10 px-6">
        <h2 className="sr-only">Solicita o Oferta Gratuita</h2>
        <p className="font-display text-3xl md:text-5xl mb-8 m-0">De la Idee la Realitate</p>
        <div className="max-w-3xl text-gray-800 font-light mb-12 leading-relaxed text-lg md:text-xl">
          Fie ca ai nevoie de o bucatarie moderna optimizata pentru spatii mici sau de un dressing complex, 
          echipa noastra se ocupa de tot procesul: <strong>masuratori, proiectare 3D, executie si montaj</strong> in 
          toata tara pentru proiecte premium.
        </div>
      </section>
    </>
  );
};

export default Home;