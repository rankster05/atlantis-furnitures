import React, { useEffect, useState, useRef, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import NotFound from './components/NotFound';
import CookieBanner from './components/CookieBanner';

// Lazy Load Pages for Performance
const Home = React.lazy(() => import('./components/Home'));
const Portfolio = React.lazy(() => import('./components/Portfolio'));
const ProjectDetail = React.lazy(() => import('./components/ProjectDetail'));
const Services = React.lazy(() => import('./components/Services'));
const PrivacyPolicy = React.lazy(() => import('./components/PrivacyPolicy'));
const Contact = React.lazy(() => import('./components/Contact'));

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

const LOADER_SESSION_KEY = 'atlantis_loader_shown';

const getInitialLoadingState = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return !window.sessionStorage.getItem(LOADER_SESSION_KEY);
  } catch {
    return true;
  }
};

const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(getInitialLoadingState);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const { pathname } = useLocation();
  const navType = useNavigationType();

  // Initialize Lenis (respect reduced-motion preference for accessibility & low-end perf)
  useEffect(() => {
    if (prefersReducedMotion()) {
      // Skip smooth scroll entirely — native scroll for accessibility users
      return;
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // OPTIMIZATION: Use standard lag smoothing instead of 0.
    // (1000, 16) allows for smooth recovery from CPU hiccups.
    gsap.ticker.lagSmoothing(1000, 16);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // Handle Scroll Reset on Route Change (SPA Behavior)
  useEffect(() => {
    // Only scroll to top if NOT a back/forward navigation (POP)
    if (navType !== 'POP') {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
    
    // Refresh ScrollTrigger to recalculate positions for the new page content
    requestAnimationFrame(() => {
        ScrollTrigger.refresh();
    });

    return () => {};
  }, [pathname, navType]);

  const handleLoadComplete = () => {
    setIsLoading(false);
    try {
      window.sessionStorage.setItem(LOADER_SESSION_KEY, '1');
    } catch {
      // sessionStorage blocked — fine, loader will run again next session
    }
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  const toggleContactModal = () => {
    setIsContactOpen(!isContactOpen);
  };

  // Global Contact Modal
  useEffect(() => {
    const handleOpenContact = () => setIsContactOpen(true);
    window.addEventListener('openContactModal', handleOpenContact);
    return () => window.removeEventListener('openContactModal', handleOpenContact);
  }, []);

  return (
    <>
      {isLoading && <Loader onComplete={handleLoadComplete} />}

      {/* Noise Overlay - inline SVG data URI (no third-party request) */}
      <div
        className="fixed inset-0 pointer-events-none z-[9000] opacity-[0.03] bg-repeat"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
        aria-hidden="true"
      />

      {/* Global Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      <Navbar onContactClick={toggleContactModal} />

      {/* Main Content Wrapper - Needs marginBottom for Fixed Footer Reveal */}
      <div id="main-wrapper" className="relative z-10 bg-atl-bg shadow-2xl mb-[100dvh] min-h-screen">
        <Suspense fallback={<div className="h-screen w-full bg-atl-bg" />}>
          <Routes>
            <Route path="/" element={<Home isLoaded={!isLoading} />} />
            <Route path="/proiecte" element={<Portfolio />} />
            <Route path="/proiecte/:slug" element={<ProjectDetail />} />
            <Route path="/servicii" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/politica-confidentialitate" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      <Footer />

      {/* Cookie consent banner — persistent via localStorage */}
      <CookieBanner />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;