import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Menu, X, Instagram, Facebook } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Custom WhatsApp Icon
const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    aria-hidden="true"
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

interface NavbarProps {
  onContactClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Helper to check if link is active
  const isActive = (path: string) => location.pathname === path;

  // Handle Home click
  const handleHomeClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    closeMenu();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    onContactClick();
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  // Mobile Menu Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure initial state prevents FOUC issues
      gsap.set(menuRef.current, { yPercent: -100 });
      gsap.set('.mobile-nav-link', { y: 50, opacity: 0 });
      gsap.set('.mobile-nav-info', { y: 30, opacity: 0 });
      gsap.set('.mobile-social-item', { scale: 0, opacity: 0 });

      tlRef.current = gsap.timeline({ paused: true });

      tlRef.current
        .to(menuRef.current, {
          yPercent: 0,
          duration: 1.1,
          ease: "expo.inOut",
        })
        .to('.mobile-nav-link', {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out"
        }, "-=0.6")
        .to('.mobile-nav-info', {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out"
        }, "-=0.8")
        .to('.mobile-social-item', {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.5)"
        }, "-=0.8");
    }, menuRef);

    return () => ctx.revert();
  }, []);

  // Global Smart Scroll Logic - REMOVED for Static Transparent Header
  useLayoutEffect(() => {
    // Ensure navbar is always visible and at the top
    gsap.set(navRef.current, { yPercent: 0 });
    gsap.set(bgRef.current, { opacity: 0 }); // Always transparent background
  }, [location.pathname]);

  // Trigger menu animation and state overrides
  useEffect(() => {
    if (isMenuOpen) {
      tlRef.current?.play();
      // Force visible and solid background when menu opens
      gsap.to(navRef.current, { yPercent: 0, duration: 0.3, overwrite: true });
      gsap.to(bgRef.current, { opacity: 0, duration: 0.3 }); 
    } else {
      tlRef.current?.reverse();
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav 
        ref={navRef} 
        className="absolute top-0 left-0 w-full z-50 will-change-transform"
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Dynamic Background Layer - Hidden for transparent effect */}
        <div 
          ref={bgRef}
          className="absolute inset-0 bg-atl-dark/95 backdrop-blur-md border-b border-white/5 shadow-lg opacity-0 hidden"
        ></div>

        <div className="relative z-10 px-6 py-6 md:px-10 md:py-6 flex justify-between items-center w-full">
          
          {/* LOGO */}
          <Link 
            to="/" 
            onClick={handleHomeClick}
            className="cursor-pointer flex flex-col items-start group relative z-50"
            aria-label="Atlantis Furnitures Home"
          >
            {/* Logo Dots */}
            <div className="flex gap-2 mb-2 md:mb-2.5 transition-transform duration-500 group-hover:translate-x-1">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF6B6B]"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#9CA3AF]"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FACC15]"></div>
            </div>
            
            {/* Logo Text - Always visible now to fix missing branding in menu */}
            <div className="mix-blend-difference text-white transition-opacity duration-300">
              <div className="font-display text-2xl md:text-3xl tracking-[0.1em] leading-none">
                ATLANTIS
              </div>
              <div className="text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-70 mt-1 font-body font-medium pl-0.5">
                Furnitures
              </div>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-12 mix-blend-difference text-white">
            <div className="flex gap-10 text-xs uppercase tracking-widest font-medium">
              <Link 
                to="/" 
                onClick={handleHomeClick}
                className={`hover:text-gray-300 transition-colors ${isActive('/') ? 'underline underline-offset-4 decoration-white/50' : ''}`}
              >
                Home
              </Link>

              <Link 
                to="/proiecte" 
                className={`hover:text-gray-300 transition-colors ${isActive('/proiecte') ? 'underline underline-offset-4 decoration-white/50' : ''}`}
              >
                Proiecte
              </Link>

              <Link 
                to="/servicii" 
                className={`hover:text-gray-300 transition-colors ${isActive('/servicii') ? 'underline underline-offset-4 decoration-white/50' : ''}`}
              >
                Servicii
              </Link>
              
              <a 
                href="#contact" 
                onClick={handleContactClick}
                className="hover:text-gray-300 transition-colors"
              >
                Cere Oferta
              </a>
            </div>

            {/* Desktop Socials Separator */}
            <div className="w-px h-6 bg-white/30"></div>

            {/* Desktop Social Icons */}
            <div className="flex gap-6">
               <a href="https://www.instagram.com/atlantis_furnitures66/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 hover:scale-110 transition-all" aria-label="Instagram">
                 <Instagram size={18} />
               </a>
               <a href="https://www.facebook.com/profile.php?id=100057578914043" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 hover:scale-110 transition-all" aria-label="Facebook">
                 <Facebook size={18} />
               </a>
               <a href="https://wa.me/40732717666" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 hover:scale-110 transition-all" aria-label="WhatsApp">
                 <WhatsAppIcon size={18} />
               </a>
            </div>
          </div>
          
          {/* Mobile Menu Button - Visible on Tablet/Mobile */}
          <button 
            onClick={toggleMenu}
            className={`lg:hidden cursor-pointer relative z-50 p-2 -mr-2 transition-colors duration-300 ${isMenuOpen ? 'text-white' : 'mix-blend-difference text-white'}`}
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Moved outside nav flow */}
      <div 
        id="mobile-menu"
        ref={menuRef}
        className="fixed inset-0 z-[9999] flex flex-col bg-black lg:hidden text-white overflow-y-auto"
        aria-hidden={!isMenuOpen}
      >
        
        {/* Header Area (Logo & Close 'X' Button) */}
        <div className="w-full flex justify-between items-center px-6 py-6 shrink-0 relative z-[10000]">
             {/* LOGO (Cloned for Menu Context) */}
             <Link 
                to="/" 
                onClick={handleHomeClick}
                className="cursor-pointer flex flex-col items-start group relative"
              >
                <div className="flex gap-2 mb-2 md:mb-2.5">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF6B6B]"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#9CA3AF]"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FACC15]"></div>
                </div>
                
                <div className="text-white">
                  <div className="font-display text-2xl md:text-3xl tracking-[0.1em] leading-none">
                    ATLANTIS
                  </div>
                  <div className="text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-70 mt-1 font-body font-medium pl-0.5">
                    Furnitures
                  </div>
                </div>
              </Link>

              {/* Close Button */}
              <button 
                onClick={closeMenu}
                className="text-white p-2 -mr-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close Menu"
              >
                <X size={32} />
              </button>
        </div>

        {/* Main Content (Links, Offer Button, Contact, Socials) */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 overflow-y-auto pb-8 w-full">
              <Link 
                to="/" 
                onClick={handleHomeClick}
                className="mobile-nav-link font-display text-4xl tracking-widest hover:text-gray-400 transition-colors text-center"
              >
                HOME
              </Link>

              <Link 
                to="/proiecte" 
                onClick={closeMenu}
                className="mobile-nav-link font-display text-4xl tracking-widest hover:text-gray-400 transition-colors text-center"
              >
                PROIECTE
              </Link>

              <Link 
                to="/servicii" 
                onClick={closeMenu}
                className="mobile-nav-link font-display text-4xl tracking-widest hover:text-gray-400 transition-colors text-center"
              >
                SERVICII
              </Link>
              
              <div className="mobile-nav-link w-full max-w-[280px] pt-4">
                <a 
                  href="#contact" 
                  onClick={handleContactClick}
                  className="block w-full text-center font-display text-lg tracking-[0.2em] border border-white/20 py-5 hover:bg-white hover:text-black transition-all duration-300 active:scale-95"
                >
                  CERE OFERTA
                </a>
              </div>

              {/* Footer Info */}
              <div className="flex flex-col items-center gap-6 mt-6 w-full">
                <div className="mobile-nav-info flex flex-col items-center gap-2 text-center">
                    <p className="uppercase tracking-widest text-[10px] sm:text-xs text-gray-500">Acoperire Nationala</p>
                    <a href="tel:0732717666" className="font-light text-2xl sm:text-3xl hover:text-gray-300 transition-colors">
                      0732 717 666
                    </a>
                </div>

                <div className="flex gap-8 items-center justify-center pt-6 border-t border-white/10 w-64">
                    <a 
                      href="https://www.instagram.com/atlantis_furnitures66/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mobile-social-item p-3 bg-white/5 rounded-full text-white hover:bg-white hover:text-black transition-all"
                      aria-label="Instagram"
                    >
                      <Instagram size={20} />
                    </a>
                    <a 
                      href="https://www.facebook.com/profile.php?id=100057578914043" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mobile-social-item p-3 bg-white/5 rounded-full text-white hover:bg-white hover:text-black transition-all"
                      aria-label="Facebook"
                    >
                      <Facebook size={20} />
                    </a>
                    <a 
                      href="https://wa.me/40732717666" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mobile-social-item p-3 bg-white/5 rounded-full text-white hover:bg-white hover:text-black transition-all"
                      aria-label="WhatsApp"
                    >
                      <WhatsAppIcon size={20} />
                    </a>
                </div>
              </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;