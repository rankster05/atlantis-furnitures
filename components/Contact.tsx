import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  ArrowRight,
  ArrowDown,
  ChevronDown,
  Check,
  Loader2,
  Plus,
  Star,
} from 'lucide-react';
import SEO from './SEO';
import { HOME_CRUMB, SITE_URL, pageGraph } from '../schema';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_URL = `${SITE_URL}/contact/`;
const CONTACT_IMAGE =
  '/projects/AP AIR-U/design-interior-apartament-modern-unirii-atlantis-furnitures.webp';

const PHONE_DISPLAY = '0732 717 666';
const PHONE_TEL = '+40732717666';
const WHATSAPP_NUMBER = '40732717666';
const FORM_ID = 'formular-oferta';

const WhatsAppIcon = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
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
    className={className}
    aria-hidden="true"
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

/**
 * Signature motif: the page reads like a shop drawing. Each figure is a
 * dimension callout sitting under its own extension line + tick.
 */
const specs = [
  { value: '24 h', label: 'Primesti oferta' },
  { value: '0 lei', label: 'Masuratori la fata locului' },
  { value: '100%', label: 'Productie in atelier propriu' },
];

const steps = [
  {
    id: '01',
    title: 'Te sunam inapoi',
    desc: 'Trecem impreuna prin ce ai scris, clarificam ce lipseste si fixam data pentru masuratori. De obicei in aceeasi zi lucratoare.',
  },
  {
    id: '02',
    title: 'Masuram si desenam',
    desc: 'Venim la tine, luam cotele exacte si transformam ideile in randari 3D pe care le vezi inainte sa taiem prima placa.',
  },
  {
    id: '03',
    title: 'Primesti oferta ferma',
    desc: 'Un deviz clar, defalcat pe corpuri, materiale si finisaje. Ce semnezi este ce platesti la final.',
  },
];

const projectTypes = [
  'Bucatarie',
  'Dressing sau dulap',
  'Living si biblioteca',
  'Dormitor',
  'Mobilier baie',
  'Office sau spatiu comercial',
  'Amenajare completa',
];

const budgets = [
  'Sub 3.000 EUR',
  '3.000 – 7.000 EUR',
  '7.000 – 15.000 EUR',
  'Peste 15.000 EUR',
  'Nu stiu inca',
];

const faqs = [
  {
    q: 'In cat timp primesc oferta?',
    a: 'In maximum 24 de ore lucratoare de la momentul in care ne trimiti detaliile. Daca proiectul este amplu, o casa intreaga de exemplu, te sunam intai ca sa stabilim etapele si abia apoi trimitem oferta, ca sa nu primesti un pret rupt de realitate.',
  },
  {
    q: 'Masuratorile si deplasarea costa ceva?',
    a: 'Nu. Ne deplasam la tine in Bucuresti sau Ilfov, luam cotele exacte si discutam pe loc materiale, finisaje si solutii de depozitare. Nu platesti nimic pentru etapa asta si nu esti obligat sa comanzi dupa.',
  },
  {
    q: 'Pot vedea cum arata mobilierul inainte sa comand?',
    a: 'Da. Primesti randari 3D ale proiectului tau, cu finisajele si culorile alese, inainte ca ceva sa intre in productie. Modificam impreuna pana cand ce vezi pe ecran este exact ce vrei in casa.',
  },
  {
    q: 'Ce materiale si feronerie folositi?',
    a: 'MDF vopsit, MDF furniruit, PAL melaminat, corian, lemn masiv si combinatii cu sticla, ratan sau oglinda. Feroneria este Blum sau Hettich, iar iluminatul LED se integreaza in corpuri inca din faza de proiectare, nu adaugat pe urma.',
  },
  {
    q: 'In ce zone livrati si montati mobilierul la comanda?',
    a: 'Bucuresti, toate sectoarele, plus judetul Ilfov. Livram si in Pitesti si judetul Arges, unde avem atelierul. Pentru proiecte din restul tarii evaluam individual fezabilitatea transportului si a montajului.',
  },
  {
    q: 'Cat dureaza executia si montajul?',
    a: 'Termenul depinde de volumul lucrarii si de finisajele alese, asa ca nu il inventam la telefon. Il stabilim dupa masuratori si il primesti in scris, odata cu oferta, ca termen ferm.',
  },
  {
    q: 'Lucrati si cu arhitecti sau designeri de interior?',
    a: 'Da, o buna parte din proiectele noastre vin din colaborarea cu studiouri de arhitectura. Daca ai deja un proiect tehnic, il executam dupa planurile tale si ne ocupam de partea de productie si montaj.',
  },
];

// Built with the shared helpers so the ContactPage node, its breadcrumb and its
// links back to the site-wide entities stay identical in shape to every other
// page. The FAQ block is this page's own addition.
const contactSchema = pageGraph(
  {
    url: CONTACT_URL,
    name: 'Contact Atlantis Furnitures',
    description:
      'Cere o oferta gratuita pentru mobilier la comanda in Bucuresti si Ilfov. Telefon, WhatsApp si formular online. Raspuns in maximum 24 de ore.',
    type: 'ContactPage',
    image: CONTACT_IMAGE,
    crumbs: [HOME_CRUMB, { name: 'Contact', url: CONTACT_URL }],
  },
  [
    {
      '@type': 'FAQPage',
      '@id': `${CONTACT_URL}#faq`,
      inLanguage: 'ro-RO',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]
);

const fieldClass =
  'w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3.5 text-[15px] text-white placeholder:text-white/25 outline-none transition-all duration-300 hover:border-white/20 focus:border-atl-bg/60 focus:bg-white/[0.06]';

const labelClass = 'block text-[11px] uppercase tracking-[0.25em] text-white/45 font-medium mb-2.5';

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6B6B]';

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
    consent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const text = `Salut! Vreau o oferta pentru mobilier la comanda.

*Detalii proiect*
• Nume: ${formData.name}
• Telefon: ${formData.phone}
• Email: ${formData.email || '-'}
• Tip proiect: ${formData.projectType || '-'}
• Buget estimativ: ${formData.budget || '-'}

*Mesaj*
${formData.message || '-'}`;

    const encoded = encodeURIComponent(text);

    // Short delay so the state change is perceivable before the tab opens.
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank', 'noopener');
      setStatus('success');
    }, 700);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      projectType: '',
      budget: '',
      message: '',
      consent: false,
    });
    setStatus('idle');
  };

  const scrollToForm = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(FORM_ID);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Everything below is enhancement only — the page renders complete
      // without it, so reduced-motion users simply get the static layout.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const intro = gsap.timeline({ delay: 0.05 });

        intro
          .from('.reveal-hero', {
            y: 34,
            opacity: 0,
            duration: 1,
            stagger: 0.09,
            ease: 'power3.out',
          })
          .from(
            '.spec-rule',
            { scaleX: 0, transformOrigin: 'left center', duration: 1.1, stagger: 0.1, ease: 'expo.out' },
            '-=0.5'
          )
          .from(
            '.spec-tick',
            { scaleY: 0, transformOrigin: 'top center', duration: 0.5, stagger: 0.1, ease: 'power2.out' },
            '-=0.85'
          )
          .from(
            '.spec-body',
            { y: 18, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
            '-=0.75'
          );

        gsap.utils.toArray<HTMLElement>('.reveal-block').forEach((el) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          });
        });

        gsap.utils.toArray<HTMLElement>('.reveal-stagger').forEach((group) => {
          gsap.from(group.children, {
            y: 32,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: group, start: 'top 85%' },
          });
        });

        gsap.utils.toArray<HTMLElement>('.rule-draw').forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 92%' },
          });
        });
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-atl-dark text-atl-bg relative overflow-hidden">
      <SEO
        title="Contact Mobilier la Comanda Bucuresti | Atlantis Furnitures"
        description="Contacteaza Atlantis Furnitures pentru mobilier la comanda in Bucuresti si Ilfov. Telefon 0732 717 666, WhatsApp, formular online. Oferta gratuita in 24h."
        canonicalUrl={CONTACT_URL}
        image={CONTACT_IMAGE}
        schema={contactSchema}
      />

      {/* Ambient depth — kept very low so the page stays flat and quiet */}
      <div className="absolute top-0 left-1/4 w-[36rem] h-[36rem] bg-[#FF6B6B]/[0.045] rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-[45%] right-0 w-[34rem] h-[34rem] bg-atl-bg/[0.04] rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 max-w-[1240px] mx-auto pt-36 md:pt-48 pb-10 md:pb-16">
        <nav aria-label="Firul Ariadnei" className="reveal-hero mb-14 md:mb-20">
          <ol className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
            <li>
              <Link to="/" className={`inline-flex items-center min-h-[24px] py-1 hover:text-white transition-colors duration-300 ${focusRing}`}>
                Acasa
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/20">/</li>
            <li className="text-white/70">Contact</li>
          </ol>
        </nav>

        <div className="reveal-hero flex items-center gap-4 mb-8">
          <span className="w-10 h-px bg-[#FF6B6B]" aria-hidden="true" />
          <span className="uppercase tracking-[0.3em] text-[11px] md:text-xs text-white/50 font-medium">
            Ia legatura cu atelierul
          </span>
        </div>

        {/* max-width is tuned to the measured Syncopate advance so the line
            always breaks as "Sa vorbim despre / proiectul tau" from sm up. */}
        <h1 className="reveal-hero font-display text-[9vw] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.12] tracking-[-0.01em] max-w-[58rem] mb-8">
          Sa vorbim despre proiectul tau
        </h1>

        <p className="reveal-hero text-white/55 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
          Scrie-ne ce vrei sa schimbi si cam ce dimensiuni are spatiul. Revenim cu o oferta pentru
          mobilierul tau la comanda in maximum 24 de ore, iar deplasarea, masuratorile si discutia
          despre materiale nu te costa nimic.
        </p>

        <div className="reveal-hero flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mt-10 md:mt-12">
          <a
            href={`tel:${PHONE_TEL}`}
            className={`group inline-flex items-center justify-center gap-3 rounded-full bg-atl-bg text-atl-dark px-7 py-4 font-medium transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0 ${focusRing}`}
          >
            <Phone size={17} strokeWidth={1.75} />
            <span className="tracking-wide">{PHONE_DISPLAY}</span>
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex items-center justify-center gap-3 rounded-full border border-white/20 px-7 py-4 font-medium text-white/85 transition-all duration-300 hover:border-white/50 hover:text-white hover:-translate-y-0.5 ${focusRing}`}
          >
            <WhatsAppIcon size={18} />
            <span className="tracking-wide">Scrie pe WhatsApp</span>
          </a>

          <a
            href={`#${FORM_ID}`}
            onClick={scrollToForm}
            className={`group inline-flex items-center justify-center gap-2.5 px-2 py-4 text-sm text-white/45 hover:text-white transition-colors duration-300 ${focusRing}`}
          >
            <span className="tracking-wide">Sau completeaza formularul</span>
            <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-1" />
          </a>
        </div>

        {/* Dimension callouts — the page's signature */}
        <dl className="mt-20 md:mt-28 grid grid-cols-1 sm:grid-cols-3">
          {specs.map((spec) => (
            <div key={spec.value} className="relative pt-8 sm:pr-8">
              <span className="spec-rule absolute left-0 top-0 h-px w-full bg-white/12" aria-hidden="true" />
              <span className="spec-tick absolute left-0 top-0 h-3 w-px bg-[#FF6B6B]" aria-hidden="true" />
              <div className="spec-body">
                <dt className="sr-only">{spec.label}</dt>
                <dd className="m-0">
                  <span className="block font-display text-3xl md:text-4xl text-white leading-none">
                    {spec.value}
                  </span>
                  <span className="block mt-4 text-[11px] uppercase tracking-[0.24em] text-white/40 pb-8 sm:pb-0">
                    {spec.label}
                  </span>
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      {/* ── FORM ─────────────────────────────────────────────────────────── */}
      <section
        id={FORM_ID}
        className="relative z-10 px-6 md:px-12 lg:px-20 max-w-[1240px] mx-auto pt-20 md:pt-28 pb-14 md:pb-20 scroll-mt-24"
        aria-labelledby="titlu-formular"
      >
        <div className="reveal-block max-w-2xl mb-14 md:mb-20">
          <span className="block uppercase tracking-[0.3em] text-[11px] text-[#FF6B6B]/80 font-medium mb-6">
            Cere oferta
          </span>
          <h2
            id="titlu-formular"
            className="font-display text-[7.5vw] sm:text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.18] text-white mb-6"
          >
            Mobilier la comanda in Bucuresti si Ilfov
          </h2>
          <p className="text-white/55 text-base md:text-lg font-light leading-relaxed">
            Cu cat stim mai multe despre spatiu, cu atat oferta pe care o primesti este mai aproape
            de pretul final. Doua minute de completat, restul facem noi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Form card */}
          <div className="lg:col-span-7">
            <div className="reveal-block rounded-3xl border border-white/10 bg-[#0a0a0a]/80 p-6 sm:p-9 md:p-11">
              {status === 'success' ? (
                <div className="flex flex-col items-start text-left py-8">
                  <span className="w-14 h-14 rounded-full bg-[#25D366]/12 border border-[#25D366]/30 text-[#25D366] flex items-center justify-center mb-7">
                    <Check size={26} strokeWidth={1.75} />
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl text-white mb-4">
                    Mesajul tau e pregatit
                  </h3>
                  <p className="text-white/55 font-light leading-relaxed max-w-md mb-8">
                    S-a deschis WhatsApp cu toate detaliile completate. Apasa trimite acolo si iti
                    raspundem in maximum 24 de ore. Daca fereastra nu s-a deschis, suna-ne la{' '}
                    <a
                      href={`tel:${PHONE_TEL}`}
                      className={`inline-block min-h-[24px] py-0.5 text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors ${focusRing}`}
                    >
                      {PHONE_DISPLAY}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className={`inline-flex items-center gap-2.5 text-sm text-white/50 hover:text-white transition-colors duration-300 ${focusRing}`}
                  >
                    Trimite inca o cerere
                    <ArrowRight size={15} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative">
                  {status === 'loading' && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-[#0a0a0a]/70 backdrop-blur-[2px]">
                      <Loader2 className="w-7 h-7 animate-spin text-white/70" aria-hidden="true" />
                      <span className="sr-only">Se pregateste mesajul</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    <div className="sm:col-span-2">
                      <label htmlFor="of-name" className={labelClass}>
                        Nume si prenume <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <input
                        id="of-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Andrei Popescu"
                        className={fieldClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="of-phone" className={labelClass}>
                        Telefon <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <input
                        id="of-phone"
                        name="phone"
                        type="tel"
                        required
                        inputMode="tel"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="07xx xxx xxx"
                        className={fieldClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="of-email" className={labelClass}>
                        Email <span className="normal-case tracking-normal text-white/30">(optional)</span>
                      </label>
                      <input
                        id="of-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nume@exemplu.ro"
                        className={fieldClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="of-projectType" className={labelClass}>
                        Tip proiect <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="of-projectType"
                          name="projectType"
                          required
                          value={formData.projectType}
                          onChange={handleChange}
                          className={`${fieldClass} cursor-pointer appearance-none pr-11 ${
                            formData.projectType ? 'text-white' : 'text-white/35'
                          }`}
                        >
                          <option value="" disabled className="bg-atl-dark">
                            Alege
                          </option>
                          {projectTypes.map((t) => (
                            <option key={t} value={t} className="bg-atl-dark text-white">
                              {t}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={15}
                          strokeWidth={1.75}
                          aria-hidden="true"
                          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="of-budget" className={labelClass}>
                        Buget estimativ{' '}
                        <span className="normal-case tracking-normal text-white/30">(optional)</span>
                      </label>
                      <div className="relative">
                        <select
                          id="of-budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className={`${fieldClass} cursor-pointer appearance-none pr-11 ${
                            formData.budget ? 'text-white' : 'text-white/35'
                          }`}
                        >
                          <option value="" disabled className="bg-atl-dark">
                            Alege
                          </option>
                          {budgets.map((b) => (
                            <option key={b} value={b} className="bg-atl-dark text-white">
                              {b}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={15}
                          strokeWidth={1.75}
                          aria-hidden="true"
                          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="of-message" className={labelClass}>
                        Detalii despre spatiu
                      </label>
                      <textarea
                        id="of-message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Ex: bucatarie in L de 3,2 x 2,1 m intr-un apartament din Sectorul 2, vreau fronturi mate si blat ceramic."
                        className={`${fieldClass} resize-none leading-relaxed`}
                      />
                      <p className="mt-2.5 text-xs text-white/30 leading-relaxed">
                        Dimensiunile aproximative, zona si finisajele care iti plac ne ajuta sa
                        estimam corect din prima.
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 flex items-start gap-3.5">
                    {/* -m-2 / p-2 grows the checkbox's hit area to 34px without
                        moving it visually — an 18px box is below the WCAG 2.2
                        minimum target size and is genuinely fiddly on a phone. */}
                    <span className="relative mt-0.5 shrink-0 -m-2 p-2">
                      <input
                        id="of-consent"
                        name="consent"
                        type="checkbox"
                        required
                        checked={formData.consent}
                        onChange={handleChange}
                        className="peer h-6 w-6 cursor-pointer appearance-none rounded-[5px] border border-white/25 bg-white/[0.03] transition-colors duration-200 checked:border-atl-bg checked:bg-atl-bg focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#FF6B6B]"
                      />
                      <Check
                        size={14}
                        strokeWidth={3.5}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-atl-dark opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                      />
                    </span>
                    <label htmlFor="of-consent" className="text-[13px] leading-relaxed text-white/45 cursor-pointer">
                      Sunt de acord ca datele mele sa fie folosite pentru a primi oferta, conform{' '}
                      <Link
                        to="/politica-confidentialitate/"
                        className={`inline-block min-h-[24px] py-0.5 text-white/75 underline underline-offset-2 decoration-white/25 hover:decoration-white transition-colors ${focusRing}`}
                      >
                        politicii de confidentialitate
                      </Link>
                      .
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`group mt-8 w-full inline-flex items-center justify-center gap-3 rounded-full bg-atl-bg px-8 py-4 text-atl-dark font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:translate-y-0 disabled:cursor-not-allowed ${focusRing}`}
                  >
                    <span>{status === 'loading' ? 'Se pregateste mesajul…' : 'Trimite cererea'}</span>
                    <WhatsAppIcon
                      size={18}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </button>

                  <p className="mt-4 text-center text-xs text-white/30 leading-relaxed">
                    Se deschide WhatsApp cu mesajul deja completat. Nimic nu pleaca fara sa apesi tu
                    trimite.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* What happens next — a real sequence, so it is numbered */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="reveal-block">
              <h3 className="font-display text-lg md:text-xl leading-[1.35] text-white mb-9">
                Ce se intampla dupa ce trimiti
              </h3>

              <ol className="reveal-stagger space-y-px">
                {steps.map((step) => (
                  <li key={step.id} className="relative pt-7 pb-7 border-t border-white/10">
                    <span className="absolute left-0 top-0 h-2.5 w-px bg-[#FF6B6B]/70" aria-hidden="true" />
                    <div className="flex gap-5">
                      <span className="font-display text-[11px] text-white/30 pt-1 shrink-0 tracking-widest">
                        {step.id}
                      </span>
                      <div>
                        <h4 className="text-[15px] font-medium text-white mb-2.5">{step.title}</h4>
                        <p className="text-sm text-white/45 font-light leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              <a
                href="https://www.google.com/maps?cid=5080307166075099712"
                target="_blank"
                rel="noopener noreferrer"
                className={`group mt-8 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-5 transition-colors duration-300 hover:border-white/25 ${focusRing}`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-display text-lg text-white leading-none">5.0</span>
                    <span className="flex gap-0.5" aria-hidden="true">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} size={12} className="fill-[#FACC15] text-[#FACC15]" />
                      ))}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 tracking-wide">Recenzii verificate pe Google</p>
                </div>
                <ArrowRight
                  size={17}
                  className="text-white/35 transition-all duration-300 group-hover:text-white group-hover:translate-x-1"
                />
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ── COORDONATE ───────────────────────────────────────────────────── */}
      <section
        className="relative z-10 px-6 md:px-12 lg:px-20 max-w-[1240px] mx-auto pt-14 md:pt-20 pb-4 md:pb-6"
        aria-labelledby="titlu-coordonate"
      >
        <div className="rule-draw h-px w-full bg-white/10 mb-14 md:mb-20" aria-hidden="true" />

        <h2
          id="titlu-coordonate"
          className="reveal-block font-display text-3xl sm:text-4xl md:text-5xl leading-[1.15] text-white mb-14 md:mb-20 max-w-xl"
        >
          Unde ne gasesti
        </h2>

        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Phone size={17} strokeWidth={1.5} className="text-[#FF6B6B]" aria-hidden="true" />
              <h3 className="text-[11px] uppercase tracking-[0.26em] text-white/50 font-medium">
                Telefon si program
              </h3>
            </div>
            <a
              href={`tel:${PHONE_TEL}`}
              className={`block font-display text-xl md:text-2xl text-white hover:text-white/70 transition-colors duration-300 mb-5 ${focusRing}`}
            >
              {PHONE_DISPLAY}
            </a>
            <p className="text-white/45 font-light leading-relaxed text-[15px]">
              Luni – Vineri, 08:00 – 19:00.
              <br />
              Sambata mergem la masuratori pe baza de programare.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <MapPin size={17} strokeWidth={1.5} className="text-[#FF6B6B]" aria-hidden="true" />
              <h3 className="text-[11px] uppercase tracking-[0.26em] text-white/50 font-medium">
                Atelier de productie
              </h3>
            </div>
            <address className="not-italic text-white text-[17px] leading-relaxed mb-5">
              Aleea Argesului nr. 70
              <br />
              Budeasa Mare, judetul Arges
            </address>
            <p className="text-white/45 font-light leading-relaxed text-[15px]">
              Aici se taie, se vopseste si se asambleaza tot. Fara subcontractori si fara comenzi
              trimise mai departe.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <Clock size={17} strokeWidth={1.5} className="text-[#FF6B6B]" aria-hidden="true" />
              <h3 className="text-[11px] uppercase tracking-[0.26em] text-white/50 font-medium">
                Zone de livrare si montaj
              </h3>
            </div>
            <p className="text-white text-[17px] leading-relaxed mb-5">
              Bucuresti (toate sectoarele) si judetul Ilfov
            </p>
            <p className="text-white/45 font-light leading-relaxed text-[15px]">
              Livram si in Pitesti si judetul Arges. Pentru proiecte din restul tarii evaluam
              individual transportul si montajul.
            </p>
          </div>
        </div>

        <div className="reveal-block flex flex-wrap items-center gap-6 mt-16 md:mt-20 pt-10 border-t border-white/10">
          <span className="text-[11px] uppercase tracking-[0.28em] text-white/35 font-medium">
            Urmareste atelierul
          </span>
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/atlantis_furnitures66/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center -m-2.5 p-2.5 text-white/45 hover:text-white transition-colors duration-300 ${focusRing}`}
              aria-label="Instagram Atlantis Furnitures"
            >
              <Instagram size={19} strokeWidth={1.5} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100057578914043"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center -m-2.5 p-2.5 text-white/45 hover:text-white transition-colors duration-300 ${focusRing}`}
              aria-label="Facebook Atlantis Furnitures"
            >
              <Facebook size={19} strokeWidth={1.5} />
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center -m-2.5 p-2.5 text-white/45 hover:text-white transition-colors duration-300 ${focusRing}`}
              aria-label="WhatsApp Atlantis Furnitures"
            >
              <WhatsAppIcon size={19} />
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section
        className="relative z-10 px-6 md:px-12 lg:px-20 max-w-[1240px] mx-auto py-20 md:py-28"
        aria-labelledby="titlu-intrebari"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <div className="reveal-block lg:sticky lg:top-28">
              <span className="block uppercase tracking-[0.3em] text-[11px] text-[#FF6B6B]/80 font-medium mb-6">
                Inainte sa scrii
              </span>
              <h2
                id="titlu-intrebari"
                className="font-display text-3xl sm:text-4xl lg:text-[2rem] xl:text-[2.4rem] leading-[1.15] text-white mb-6 break-words"
              >
                Intrebari frecvente
              </h2>
              <p className="text-white/45 font-light leading-relaxed">
                Raspunsurile pe care le dam cel mai des la telefon. Daca al tau nu e aici, suna-ne
                la{' '}
                <a
                  href={`tel:${PHONE_TEL}`}
                  className={`inline-block min-h-[24px] py-0.5 text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors ${focusRing}`}
                >
                  {PHONE_DISPLAY}
                </a>
                .
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ul className="reveal-stagger border-t border-white/10">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <li key={faq.q} className="border-b border-white/10">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-button-${i}`}
                        className={`group flex w-full items-start justify-between gap-6 py-7 text-left ${focusRing}`}
                      >
                        <span
                          className={`min-w-0 flex-1 text-[15px] md:text-[17px] leading-snug transition-colors duration-300 ${
                            isOpen ? 'text-white' : 'text-white/70 group-hover:text-white'
                          }`}
                        >
                          {faq.q}
                        </span>
                        {/* The icon rotates inside a fixed 28px box rather than
                            being rotated itself: a rotated square's bounding box
                            is √2 times wider, so the open state used to poke 4px
                            past the list's right edge. */}
                        <span
                          className={`mt-0.5 shrink-0 w-7 h-7 flex items-center justify-center transition-colors duration-300 ${
                            isOpen ? 'text-[#FF6B6B]' : 'text-white/35 group-hover:text-white/70'
                          }`}
                          aria-hidden="true"
                        >
                          <Plus
                            size={18}
                            strokeWidth={1.5}
                            className={`transition-transform duration-500 ease-out ${isOpen ? 'rotate-[135deg]' : ''}`}
                          />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-button-${i}`}
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-8 pr-8 text-[15px] text-white/50 font-light leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 max-w-[1240px] mx-auto pb-24 md:pb-36">
        <div className="reveal-block rounded-3xl bg-atl-bg text-atl-dark px-7 py-14 sm:px-12 md:px-16 md:py-20">
          <div className="max-w-2xl">
            <span className="block uppercase tracking-[0.3em] text-[11px] text-atl-dark/45 font-medium mb-7">
              Ultimul pas
            </span>
            <h2 className="font-display text-[7.5vw] sm:text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.18] mb-6">
              Cel mai rapid raspuns e la telefon
            </h2>
            <p className="text-atl-dark/65 text-base md:text-lg font-light leading-relaxed mb-10">
              Spune-ne in doua minute ce ai in cap. Iti zicem pe loc daca se poate face, cam ce
              inseamna ca buget si cand am putea veni la masuratori.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a
                href={`tel:${PHONE_TEL}`}
                className={`group inline-flex items-center justify-center gap-3 rounded-full bg-atl-dark text-atl-bg px-8 py-4 font-medium transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-atl-dark`}
              >
                <Phone size={17} strokeWidth={1.75} />
                <span className="tracking-wide">Suna la {PHONE_DISPLAY}</span>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center justify-center gap-3 rounded-full border border-atl-dark/20 px-8 py-4 font-medium transition-all duration-300 hover:border-atl-dark/60 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-atl-dark`}
              >
                <WhatsAppIcon size={18} />
                <span className="tracking-wide">Scrie pe WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
