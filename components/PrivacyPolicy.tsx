import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import SEO from './SEO';

const LAST_UPDATED = '13 mai 2026';

const PrivacyPolicy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pp-anim', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.1,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-atl-bg text-atl-dark">
      <SEO
        title="Politica de Confidentialitate | Atlantis Furnitures"
        description="Politica de confidentialitate si protectie a datelor personale conform GDPR pentru Atlantis Furnitures."
        canonicalUrl="https://atlantisfurnitures.ro/politica-confidentialitate/"
        noindex={true}
      />

      <section className="pt-32 md:pt-48 pb-24 md:pb-32 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
        <Link
          to="/"
          className="pp-anim inline-flex items-center gap-3 text-atl-dark/60 hover:text-atl-dark transition-colors duration-300 group mb-12 md:mb-20"
          aria-label="Inapoi la pagina principala"
        >
          <div className="w-10 h-10 rounded-full border border-atl-dark/20 flex items-center justify-center group-hover:bg-atl-dark group-hover:text-atl-bg transition-all duration-300">
            <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] font-medium">Inapoi Acasa</span>
        </Link>

        <div className="pp-anim flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-atl-accent"></div>
          <span className="uppercase tracking-[0.3em] text-xs text-atl-dark/50 font-medium">Document Legal</span>
        </div>

        {/* "Confidentialitate" is a single 17-character word set in a very wide
            display face, so at the previous sizes it ran outside the column at
            every breakpoint — including desktop. Sized to fit, with hyphenation
            and word-breaking as guarantees. */}
        <h1 className="pp-anim font-display text-[7vw] sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-6 break-words hyphens-auto">
          Politica de Confidentialitate
        </h1>

        <p className="pp-anim text-atl-dark/60 text-sm md:text-base font-light mb-16 md:mb-20">
          Ultima actualizare: {LAST_UPDATED}
        </p>

        <div className="pp-anim prose prose-lg max-w-none font-light text-atl-dark/85 leading-relaxed space-y-12">

          <section>
            <h2 className="font-display text-2xl md:text-3xl mb-4 text-atl-dark">1. Operatorul de date</h2>
            <p>
              Prezenta politica de confidentialitate reglementeaza modul in care
              <strong> Atlantis Furnitures</strong> colecteaza, prelucreaza si protejeaza datele cu
              caracter personal ale utilizatorilor website-ului{' '}
              <a href="https://atlantisfurnitures.ro/" className="inline-block min-h-[24px] py-0.5 underline hover:no-underline">atlantisfurnitures.ro</a>,
              in conformitate cu Regulamentul (UE) 2016/679 (GDPR) si legislatia romana aplicabila.
            </p>
            <p className="mt-4">
              <strong>Date de contact ale operatorului:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Denumire: <strong>Atlantis Furnitures</strong></li>
              <li>Adresa: Aleea Argesului nr. 70, Budeasa Mare, judetul Arges, Romania</li>
              <li>Telefon: 0732 717 666</li>
              <li>Website: <a href="https://atlantisfurnitures.ro/" className="inline-block min-h-[24px] py-0.5 underline">atlantisfurnitures.ro</a></li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl md:text-3xl mb-4 text-atl-dark">2. Ce date colectam</h2>
            <p>
              In functie de interactiunea ta cu website-ul nostru, putem colecta urmatoarele
              categorii de date:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Date de contact</strong>: nume, prenume, adresa de email, numar de telefon — atunci cand completezi formularul de contact sau ne soliciti o oferta.</li>
              <li><strong>Detalii despre proiect</strong>: descrierea spatiului, tipul de mobilier dorit, locatie aproximativa, buget estimativ — comunicate voluntar de tine.</li>
              <li><strong>Date tehnice</strong>: adresa IP, tipul de browser, sistemul de operare, paginile vizitate, timp petrecut pe site — colectate automat prin cookie-uri si tehnologii similare.</li>
              <li><strong>Comunicari</strong>: continutul mesajelor pe care ni le trimiti prin formular, email, WhatsApp sau telefon.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl md:text-3xl mb-4 text-atl-dark">3. Scopurile prelucrarii</h2>
            <p>Datele tale sunt prelucrate strict pentru urmatoarele scopuri:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Pentru a raspunde solicitarilor tale de oferta sau intrebarilor adresate</li>
              <li>Pentru a executa contractul de furnizare mobilier (masuratori, proiectare, productie, montaj)</li>
              <li>Pentru imbunatatirea experientei pe site si analiza traficului</li>
              <li>Pentru indeplinirea obligatiilor legale (fiscale, contabile)</li>
              <li>Pentru protectia intereselor noastre legitime (securitatea site-ului, prevenirea fraudei)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl md:text-3xl mb-4 text-atl-dark">4. Temeiul legal al prelucrarii</h2>
            <p>Prelucram datele tale in baza urmatoarelor temeiuri legale (art. 6 GDPR):</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Consimtamantul</strong> (art. 6(1)(a)) — pentru cookie-uri non-esentiale si comunicari de marketing</li>
              <li><strong>Executarea unui contract</strong> (art. 6(1)(b)) — atunci cand soliciti o oferta sau incheiem un contract</li>
              <li><strong>Obligatie legala</strong> (art. 6(1)(c)) — pentru raportari fiscale si contabile</li>
              <li><strong>Interes legitim</strong> (art. 6(1)(f)) — pentru securitatea si imbunatatirea serviciilor</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl md:text-3xl mb-4 text-atl-dark">5. Cookie-uri</h2>
            <p>
              Website-ul nostru foloseste cookie-uri pentru a-ti oferi o experienta optima.
              Folosim doar cookie-uri esentiale (necesare functionarii site-ului). Nu folosim
              in mod implicit cookie-uri de tracking sau publicitate.
            </p>
            <p className="mt-4">
              Poti gestiona cookie-urile prin setarile browser-ului. Dezactivarea cookie-urilor
              esentiale poate afecta functionarea site-ului.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl md:text-3xl mb-4 text-atl-dark">6. Cui transmitem datele</h2>
            <p>
              Nu vindem si nu inchiriem datele tale catre terti. Le putem dezvalui doar:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Furnizorilor nostri de servicii (gazduire web, email, contabilitate) — toti supusi unor obligatii stricte de confidentialitate</li>
              <li>Autoritatilor publice — doar in baza unei cerinte legale</li>
              <li>Partenerilor implicati in livrare si montaj — strict pentru executarea proiectului tau</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl md:text-3xl mb-4 text-atl-dark">7. Cat timp pastram datele</h2>
            <p>
              Pastram datele tale doar atat timp cat este necesar pentru scopurile pentru care
              au fost colectate:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Datele din formularul de contact: maxim 3 ani de la ultima interactiune</li>
              <li>Datele contractuale: 10 ani conform legislatiei fiscale romane</li>
              <li>Datele tehnice (loguri server): maxim 12 luni</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl md:text-3xl mb-4 text-atl-dark">8. Drepturile tale conform GDPR</h2>
            <p>In calitate de persoana vizata, ai urmatoarele drepturi:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Dreptul de acces</strong> — sa stii ce date detinem despre tine</li>
              <li><strong>Dreptul la rectificare</strong> — sa corectezi date inexacte</li>
              <li><strong>Dreptul la stergere</strong> ("dreptul de a fi uitat")</li>
              <li><strong>Dreptul la restrictionarea prelucrarii</strong></li>
              <li><strong>Dreptul la portabilitatea datelor</strong></li>
              <li><strong>Dreptul de opozitie</strong> la prelucrare</li>
              <li><strong>Dreptul de a-ti retrage consimtamantul</strong> in orice moment</li>
              <li><strong>Dreptul de a depune plangere</strong> la Autoritatea Nationala de Supraveghere a Prelucrarii Datelor cu Caracter Personal (<a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="inline-block min-h-[24px] py-0.5 underline">www.dataprotection.ro</a>)</li>
            </ul>
            <p className="mt-4">
              Pentru a-ti exercita oricare dintre aceste drepturi, ne poti contacta la numarul
              de telefon <strong>0732 717 666</strong> sau prin formularul de contact de pe site.
              Vom raspunde solicitarii tale in termen de maxim 30 de zile.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl md:text-3xl mb-4 text-atl-dark">9. Securitatea datelor</h2>
            <p>
              Implementam masuri tehnice si organizatorice rezonabile pentru protectia datelor
              tale: conexiune HTTPS criptata, acces restrictionat la informatii, copii de
              siguranta periodice si proceduri interne de management al incidentelor.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl md:text-3xl mb-4 text-atl-dark">10. Modificari ale politicii</h2>
            <p>
              Ne rezervam dreptul de a actualiza aceasta politica de confidentialitate.
              Versiunea actuala este intotdeauna disponibila pe aceasta pagina. Data ultimei
              actualizari este indicata la inceputul documentului.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl md:text-3xl mb-4 text-atl-dark">11. Contact</h2>
            <p>
              Pentru orice intrebari legate de prelucrarea datelor tale personale sau pentru
              exercitarea drepturilor tale, ne poti contacta:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Telefon / WhatsApp: <a href="tel:0732717666" className="inline-block min-h-[24px] py-0.5 underline">0732 717 666</a></li>
              <li>Adresa: Aleea Argesului nr. 70, Budeasa Mare, judetul Arges</li>
              <li>Formular contact pe website</li>
            </ul>
          </section>

        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
