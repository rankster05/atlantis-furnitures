import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      // Initial state
      gsap.set('.logo-dot', { scale: 0, opacity: 0 });
      gsap.set('.logo-text-main', { y: 20, opacity: 0 });
      gsap.set('.logo-text-sub', { y: 10, opacity: 0 });

      tl.to(barRef.current, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut'
      })
      // Animate dots popping in
      .to('.logo-dot', {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }, "-=1")
      // Animate ATLANTIS text
      .to('.logo-text-main', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out'
      }, "-=0.6")
      // Animate Furnitures text
      .to('.logo-text-sub', {
        y: 0,
        opacity: 0.8,
        duration: 0.6,
        ease: 'power3.out'
      }, "-=0.4")
      // Exit
      .to(logoRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        delay: 0.5
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut'
      });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 bg-black z-[9999] flex justify-center items-center text-white">
      <div ref={logoRef} className="flex flex-col items-start">
         {/* Logo Dots */}
         <div className="flex gap-4 mb-6 pl-1">
          <div className="logo-dot w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#FF6B6B]"></div>
          <div className="logo-dot w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#9CA3AF]"></div>
          <div className="logo-dot w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#FACC15]"></div>
        </div>
        
        <div className="text-left">
          <div className="logo-text-main font-display text-4xl md:text-7xl tracking-[0.1em] leading-none mb-2">
            ATLANTIS
          </div>
          <div className="logo-text-sub text-sm md:text-xl tracking-[0.4em] uppercase opacity-70 font-body pl-1">
            Furnitures
          </div>
        </div>
      </div>
      <div ref={barRef} className="absolute bottom-0 left-0 h-1 bg-white w-0" />
    </div>
  );
};

export default Loader;