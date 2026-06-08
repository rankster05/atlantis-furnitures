import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import SEO from './SEO';

const WhatsAppIcon = ({ size = 22 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

const openContactModal = () => {
  window.dispatchEvent(new CustomEvent('openContactModal'));
};

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-anim', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.1,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-atl-dark text-atl-bg relative overflow-hidden">
      <SEO
        title="Contact Mobilier la Comanda Bucuresti | Atlantis Furnitures"
        description="Contacteaza Atlantis Furnitures pentru mobilier la comanda in Bucuresti si Ilfov. Telefon 0732 717 666, WhatsApp, formular online. Oferta gratuita in 24h."
        canonicalUrl="https://atlantisfurnitures.ro/contact/"
      />

      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF6B6B]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-atl-bg/5 rounded-full blur-[150px] pointer-events-none" />

      <section className="pt-40 pb-20 md:pt-52 md:pb-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto relative z-10">
        <Link
          to="/"
          className="contact-anim inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 group mb-12 md:mb-20"
          aria-label="Inapoi la pagina principala"
        >
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
            <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] font-medium">Inapoi Acasa</span>
        </Link>

        <div className="contact-anim flex items-center gap-4 mb-6 md:mb-8">
          <div className="w-12 h-px bg-[#FF6B6B]" />
          <span className="uppercase tracking-[0.3em] text-xs md:text-sm text-gray-400 font-medium">Ia legatura cu noi</span>
        </div>

        <h1 className="contact-anim font-display text-[10vw] sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 max-w-4xl">
          Sa construim impreuna spatiul tau ideal
        </h1>

        <p className="contact-anim text-gray-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-16 md:mb-24">
          Trimite-ne detaliile proiectului tau si revenim cu o oferta gratuita personalizata in maxim 24 de ore. Ne ocupam de tot procesul: masuratori, proiectare 3D, executie si montaj in Bucuresti si Ilfov.
        </p>

        {/* Contact methods grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
          <a
            href="tel:0732717666"
            className="contact-anim group p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-white/30 hover:-translate-y-1 transition-all duration-500"
            aria-label="Suna la 0732 717 666"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-all duration-300">
              <Phone size={20} strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-2xl md:text-3xl text-white mb-2">Telefon</h2>
            <p className="text-gray-400 text-sm mb-4">Luni - Vineri, 08:00 - 19:00</p>
            <p className="font-medium text-lg text-white">0732 717 666</p>
          </a>

          <a
            href="https://wa.me/40732717666"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-anim group p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-white/30 hover:-translate-y-1 transition-all duration-500"
            aria-label="Scrie-ne pe WhatsApp"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-all duration-300">
              <WhatsAppIcon size={20} />
            </div>
            <h2 className="font-display text-2xl md:text-3xl text-white mb-2">WhatsApp</h2>
            <p className="text-gray-400 text-sm mb-4">Raspuns rapid, 7 zile / 7</p>
            <p className="font-medium text-lg text-white">Scrie-ne acum</p>
          </a>

          <button
            onClick={openContactModal}
            className="contact-anim group p-8 rounded-2xl bg-atl-bg/10 border border-atl-bg/30 hover:bg-atl-bg hover:text-atl-dark hover:-translate-y-1 transition-all duration-500 text-left"
            aria-label="Deschide formularul de oferta"
          >
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-6 group-hover:bg-atl-dark group-hover:text-white transition-all duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h2 className="font-display text-2xl md:text-3xl mb-2">Formular oferta</h2>
            <p className="text-sm opacity-70 mb-4">Detaliaza proiectul tau in 2 minute</p>
            <p className="font-medium text-lg">Solicita oferta gratuita</p>
          </button>
        </div>

        {/* Service area + workshop info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-16 border-t border-white/10">
          <div className="contact-anim">
            <div className="flex items-center gap-3 mb-4">
              <MapPin size={20} strokeWidth={1.5} className="text-atl-bg/70" />
              <h2 className="font-display text-2xl text-white">Zone de livrare</h2>
            </div>
            <p className="text-gray-300 font-light leading-relaxed">
              Livram si montam in <strong className="text-white">Bucuresti</strong> (toate sectoarele) si <strong className="text-white">judetul Ilfov</strong>. Pentru proiecte premium acceptam si comenzi din restul tarii, evaluate individual.
            </p>
          </div>

          <div className="contact-anim">
            <div className="flex items-center gap-3 mb-4">
              <Clock size={20} strokeWidth={1.5} className="text-atl-bg/70" />
              <h2 className="font-display text-2xl text-white">Program</h2>
            </div>
            <p className="text-gray-300 font-light leading-relaxed mb-2">
              Luni — Vineri: <strong className="text-white">08:00 — 19:00</strong>
            </p>
            <p className="text-gray-300 font-light leading-relaxed">
              Sambata: <strong className="text-white">la cerere</strong>, in baza programarii prealabile.
            </p>
          </div>
        </div>

        {/* Social */}
        <div className="contact-anim flex items-center gap-6 mt-16 pt-12 border-t border-white/10">
          <span className="text-xs uppercase tracking-[0.3em] text-gray-500 font-medium">Urmareste-ne</span>
          <a
            href="https://www.instagram.com/atlantis_furnitures66/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Instagram Atlantis Furnitures"
          >
            <Instagram size={20} strokeWidth={1.5} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100057578914043"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Facebook Atlantis Furnitures"
          >
            <Facebook size={20} strokeWidth={1.5} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
