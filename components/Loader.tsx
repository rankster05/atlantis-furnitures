import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Logo, { LOGO_VIEWBOX_HEIGHT } from './Logo';

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

      // GSAP moves SVG children in viewBox units, not CSS pixels. Convert so the
      // text still rises 20px / 10px on screen whatever size the logo renders at.
      const svg = logoRef.current?.querySelector('svg');
      const px = svg ? LOGO_VIEWBOX_HEIGHT / svg.getBoundingClientRect().height : 1;

      // Initial state
      gsap.set('.logo-dot', { scale: 0, opacity: 0, transformOrigin: '50% 50%' });
      gsap.set('.logo-text-main', { y: 20 * px, opacity: 0 });
      gsap.set('.logo-text-sub', { y: 10 * px, opacity: 0 });

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
      // Animate ATLANTIS® text
      .to('.logo-text-main', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out'
      }, "-=0.6")
      // Animate FURNITURES text
      .to('.logo-text-sub', {
        y: 0,
        opacity: 1,
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
      <div ref={logoRef}>
        <Logo className="w-[280px] md:w-[560px] h-auto text-white" title="Atlantis Furnitures" />
      </div>
      <div ref={barRef} className="absolute bottom-0 left-0 h-1 bg-white w-0" />
    </div>
  );
};

export default Loader;
