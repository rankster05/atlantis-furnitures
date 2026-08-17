import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { portfolioItems } from '../data';
import { PortfolioItem } from '../types';
import SEO from './SEO';
import Lightbox from './Lightbox';
import { altFromImagePath, imageSize } from '../utils';
import { HOME_CRUMB, PROJECTS_CRUMB, SITE_URL, pageGraph } from '../schema';

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  
  const [project, setProject] = useState<PortfolioItem | null>(null);
  const [nextProject, setNextProject] = useState<PortfolioItem | null>(null);
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const allImages = project ? [project.mainImage, ...project.gallery.flat()] : [];

  // Per-project SEO lives in data.ts alongside the project itself — it used to
  // be duplicated in a map here as well, which is exactly the kind of thing that
  // drifts out of sync the moment one copy is edited.
  const seo = {
    title: project?.seoTitle || `Mobilier la comanda - ${project?.title ?? 'proiect'} | Atlantis Furnitures`,
    description:
      project?.seoDescription ||
      'Proiect de mobilier la comanda executat de Atlantis Furnitures in Bucuresti si Ilfov. Cere oferta!',
    canonicalUrl: `${SITE_URL}/proiecte/${slug ?? ''}/`,
  };

  // The descriptive headline — also the page's H1 (see the hero below).
  const projectHeading = project
    ? project.seoH1 || `Mobilier la comanda - ${project.title}`
    : '';

  const projectSchema = project
    ? pageGraph({
        url: seo.canonicalUrl,
        name: projectHeading,
        description: seo.description,
        image: project.mainImage,
        crumbs: [
          HOME_CRUMB,
          PROJECTS_CRUMB,
          { name: project.title, url: seo.canonicalUrl },
        ],
      })
    : undefined;

  const openLightbox = (imgSrc: string) => {
    const index = allImages.indexOf(imgSrc);
    if (index !== -1) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  };

  useEffect(() => {
    // Find project by Slug
    const foundProject = portfolioItems.find(p => p.slug === slug);
    if (foundProject) {
      setProject(foundProject);
      
      // Determine next project for footer nav
      const currentIndex = portfolioItems.findIndex(p => p.slug === slug);
      const nextIndex = (currentIndex + 1) % portfolioItems.length;
      setNextProject(portfolioItems[nextIndex]);
    } else {
      navigate('/proiecte/');
    }
  }, [slug, navigate]);

  // Animations
  useLayoutEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      // 1. Initial Reveal
      gsap.from('.dt-reveal', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2
      });

      // 2. Parallax Background Effect (Background moves at 50% speed)
      if (heroRef.current && heroBgRef.current) {
        const mm = gsap.matchMedia();
        
        mm.add("(min-width: 768px)", () => {
          gsap.to(heroBgRef.current, {
            yPercent: 50,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            }
          });
        });

      }

      // 3. Text Fades Out on Scroll
      if (heroRef.current && heroTextRef.current) {
        gsap.to(heroTextRef.current, {
          opacity: 0,
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // 4. Info Section Animation
      gsap.from('.dt-info-item', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.dt-info-grid',
          start: 'top 85%'
        }
      });

      // 5. Grid Image Parallax (Pure Parallax, static scale)
      const gridImages = document.querySelectorAll('.dt-grid-image-wrapper .dt-parallax-inner');
      const mmGrid = gsap.matchMedia();

      gridImages.forEach((inner) => {
        gsap.set(inner, { scale: 1.15 });
        
        mmGrid.add("(min-width: 768px)", () => {
          gsap.fromTo(inner, 
            { yPercent: -8 }, 
            { 
              yPercent: 8, 
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: inner.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true 
              }
            }
          );
        });

      });

      // Refresh ScrollTrigger after a short delay to ensure DOM is fully painted
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      
      // Also refresh when all images are fully loaded
      const images = containerRef.current?.querySelectorAll('img') || [];
      let loadedCount = 0;
      
      const onImageLoad = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          ScrollTrigger.refresh();
        }
      };

      images.forEach(img => {
        if (img.complete) {
          onImageLoad();
        } else {
          img.addEventListener('load', onImageLoad);
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) return null;

  return (
    <div ref={containerRef} className="bg-atl-dark text-atl-bg min-h-screen">
      <SEO
        title={seo.title}
        description={seo.description}
        canonicalUrl={seo.canonicalUrl}
        image={project.mainImage}
        schema={projectSchema}
      />
      
      {/* Parallax Hero Section */}
      <div ref={heroRef} className="relative w-full h-[100dvh] overflow-hidden bg-atl-dark">
        {/* Back Button */}
        <Link 
          to="/proiecte/" 
          className="absolute top-24 md:top-32 left-5 md:left-12 z-50 flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 group"
          aria-label="Inapoi la proiecte"
        >
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
            <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
          </div>
          <span className="text-[11px] md:text-xs uppercase tracking-[0.2em] font-medium hidden sm:block">Inapoi la proiecte</span>
        </Link>
        
        <div ref={heroBgRef} className="absolute inset-0 w-full h-full origin-center">
          <picture className="contents">
            <source media="(min-width: 821px)" srcSet={project.mainImage} />
            <img
              src={project.mainImage.replace(/\.webp$/, '-m.webp')}
              alt={altFromImagePath(project.mainImage, project.title)}
              {...imageSize(project.mainImage.replace(/\.webp$/, '-m.webp'))}
              className="w-full h-full object-cover object-center cursor-pointer transition-transform duration-700 hover:scale-105 brightness-125 contrast-105"
              onClick={() => openLightbox(project.mainImage)}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        
        {/* Hero Text Content */}
        <div ref={heroTextRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6 z-10 mt-16 md:mt-20">
          {/* Two lines, both visible, both unchanged on screen — only the tags
              swapped. The huge word is the project's internal code name ("AP
              SO", "OFFICE"), which carries no meaning for anyone arriving from
              search, so it is display text rather than the page's heading. The
              descriptive line under it — already visible to every reader — is
              the real title of the page, so it is the H1.

              Deliberately NOT a screen-reader-only H1: a heading that exists
              only for crawlers is what Google's spam policies call hidden text,
              and this page previously carried exactly that pattern before it
              was removed. Nothing here is hidden from anyone. */}
          <p className="dt-reveal font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-white max-w-6xl drop-shadow-2xl uppercase m-0">
            {project.title}
          </p>
          <h1 className="dt-reveal mt-5 md:mt-7 max-w-2xl text-sm md:text-base text-white/75 font-light tracking-wide drop-shadow-lg m-0">
            {projectHeading}
          </h1>
        </div>
      </div>

      {/* Stacked Slides Gallery */}
      <div className="relative bg-atl-dark">
         {project.gallery.map((item, idx) => {
           if (Array.isArray(item)) {
             // Grid Layout for Portrait/Grouped Images
             if (item.length === 2) {
               // 50/50 Solid Block Layout
               return (
                 <div 
                   key={idx} 
                   className="relative w-full max-w-[1920px] mx-auto bg-atl-dark flex flex-col md:flex-row dt-grid-section p-4 md:p-6 lg:p-8 gap-4 md:gap-6 lg:gap-8 items-center md:items-start justify-center" 
                   style={{ zIndex: 20 + idx }}
                 >
                   <div className="w-full aspect-[4/5] md:aspect-[3/4] md:w-1/2 relative overflow-hidden dt-grid-image-wrapper rounded-2xl md:rounded-[32px]">
                      <div className="w-full h-full dt-parallax-inner">
                        <img 
                          src={item[0]} 
                          alt={altFromImagePath(item[0], project.title)} 
                          {...imageSize(item[0])}
                          className="w-full h-full object-cover cursor-pointer transition-transform duration-700 hover:scale-105 brightness-110 contrast-105" 
                          onClick={() => openLightbox(item[0])}
                          loading="lazy" 
                          decoding="async"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10 pointer-events-none z-10" />
                   </div>
                   <div className="w-full aspect-[4/5] md:aspect-[3/4] md:w-1/2 relative overflow-hidden dt-grid-image-wrapper rounded-2xl md:rounded-[32px]">
                      <div className="w-full h-full dt-parallax-inner">
                        <img 
                          src={item[1]} 
                          alt={altFromImagePath(item[1], project.title)} 
                          {...imageSize(item[1])}
                          className="w-full h-full object-cover cursor-pointer transition-transform duration-700 hover:scale-105 brightness-110 contrast-105" 
                          onClick={() => openLightbox(item[1])}
                          loading="lazy" 
                          decoding="async"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10 pointer-events-none z-10" />
                   </div>
                 </div>
               );
             }

             // Layout for 3 or more images (60/40 split) - Matches Screenshot
             const isReversed = idx % 2 !== 0; // Alternate layout left/right
             return (
               <div 
                 key={idx} 
                 className={`relative w-full max-w-[1920px] mx-auto bg-atl-dark flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} dt-grid-section p-4 md:p-6 lg:p-8 gap-4 md:gap-6 lg:gap-8 items-center md:items-start`} 
                 style={{ zIndex: 20 + idx }}
               >
                 {/* Large Image Section (60%) */}
                 <div className="w-full aspect-[4/5] md:aspect-[3/4] md:w-[60%] relative overflow-hidden dt-grid-image-wrapper rounded-2xl md:rounded-[32px]">
                    <div className="w-full h-full dt-parallax-inner">
                      <img 
                        src={item[0]} 
                        alt={altFromImagePath(item[0], project.title)} 
                        {...imageSize(item[0])}
                        className="w-full h-full object-cover cursor-pointer transition-transform duration-700 hover:scale-105 brightness-110 contrast-105" 
                        onClick={() => openLightbox(item[0])}
                        loading="lazy" 
                        decoding="async"
                      />
                    </div>
                    {/* Cinematic Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none z-10" />
                 </div>
                 
                 {/* Stacked Images Section (40%) */}
                 <div className="w-full md:w-[40%] flex flex-col gap-4 md:gap-6 lg:gap-8">
                    {item.slice(1).map((subImg, subIdx) => (
                      <div key={subIdx} className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden dt-grid-image-wrapper rounded-2xl md:rounded-[32px]">
                         <div className="w-full h-full dt-parallax-inner">
                           <img 
                             src={subImg} 
                             alt={altFromImagePath(subImg, project.title)} 
                             {...imageSize(subImg)}
                             className="w-full h-full object-cover cursor-pointer transition-transform duration-700 hover:scale-105 brightness-110 contrast-105" 
                             onClick={() => openLightbox(subImg)}
                             loading="lazy" 
                             decoding="async"
                           />
                         </div>
                         {/* Cinematic Vignette */}
                         <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none z-10" />
                      </div>
                    ))}
                 </div>
               </div>
             );
           } else {
             // Full Screen Wide Image (Original Behavior - Stacked)
             return (
               <div key={idx} className="sticky top-0 h-[100dvh] w-full overflow-hidden">
                  <img 
                    src={item} 
                    alt={altFromImagePath(item, project.title)}
                    {...imageSize(item)}
                    className="w-full h-full object-cover cursor-pointer transition-transform duration-700 hover:scale-105 brightness-110 contrast-105"
                    onClick={() => openLightbox(item)}
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Subtle overlay to create depth between stacked slides */}
                  <div className="absolute inset-0 bg-black/20 pointer-events-none" />
               </div>
             );
           }
         })}
      </div>

      {/* Content Section - Clean & Minimalist */}
      <section className="px-5 md:px-12 pt-20 pb-20 md:pt-32 md:pb-32 max-w-[1400px] mx-auto bg-atl-dark relative z-20 flex flex-col gap-16 md:gap-24 dt-info-grid">
        
        {/* Description Section */}
        <div className="max-w-5xl">
            <h2 className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-gray-500 font-bold mb-6 md:mb-8 dt-info-item">Descriere Proiect</h2>
            <p className="text-xl md:text-3xl lg:text-4xl font-light text-gray-200 leading-relaxed dt-info-item">
              {project.description}
            </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 dt-info-item"></div>
        
        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full">
            <div className="dt-info-item">
              <h3 className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-gray-500 font-bold mb-3 md:mb-4">Locatie</h3>
              <p className="font-medium text-base md:text-lg text-white">{project.location || "Romania"}</p>
            </div>
            <div className="dt-info-item">
                <h3 className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-gray-500 font-bold mb-3 md:mb-4">Servicii</h3>
                <p className="font-medium text-base md:text-lg text-white">{project.services || "Design & Build"}</p>
            </div>
            
            {project.tags && (
              <div className="dt-info-item">
                  <h3 className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-gray-500 font-bold mb-4 md:mb-5">Materiale & Taguri</h3>
                  <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-[11px] md:text-xs uppercase tracking-widest font-medium text-gray-300 bg-white/5 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
        </div>
      </section>

      {/* Next Project Footer */}
      {nextProject && (
        <Link 
          to={`/proiecte/${nextProject.slug}/`}
          className="block group relative h-[40dvh] md:h-[50dvh] overflow-hidden"
          aria-label={`Vezi urmatorul proiect: ${nextProject.title}`}
        >
           <img 
             src={nextProject.mainImage}
             alt={`Urmatorul proiect: ${altFromImagePath(nextProject.mainImage, nextProject.title)}`}
             {...imageSize(nextProject.mainImage)}
             loading="lazy"
             decoding="async"
             className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 brightness-[0.9] group-hover:brightness-[1.1]"
           />
           <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 text-center">
              <span className="text-[11px] md:text-sm uppercase tracking-[0.3em] mb-3 md:mb-4 opacity-80 text-white font-medium">Urmatorul Proiect</span>
              <h2 className="font-display text-3xl sm:text-5xl md:text-7xl text-white uppercase">{nextProject.title}</h2>
              <ArrowRight className="mt-4 md:mt-6 w-6 h-6 md:w-8 md:h-8 text-white transform group-hover:translate-x-4 transition-transform duration-500" aria-hidden="true" />
           </div>
        </Link>
      )}

      {/* Lightbox */}
      <Lightbox 
        images={allImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

export default ProjectDetail;