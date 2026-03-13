import React, { useEffect, useState, useRef, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HelmetProvider } from 'react-helmet-async';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import NotFound from './components/NotFound';

// Lazy Load Pages for Performance
const Home = React.lazy(() => import('./components/Home'));
const Portfolio = React.lazy(() => import('./components/Portfolio'));
const ProjectDetail = React.lazy(() => import('./components/ProjectDetail'));
const Services = React.lazy(() => import('./components/Services'));

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const { pathname } = useLocation();
  const navType = useNavigationType();

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
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
    const timer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, navType]);

  const handleLoadComplete = () => {
    setIsLoading(false);
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
      
      {/* Noise Overlay - Optimized opacity for better text contrast */}
      <div className="fixed inset-0 pointer-events-none z-[9000] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
};

export default App;