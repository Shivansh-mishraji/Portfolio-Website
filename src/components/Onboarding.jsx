import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import anime from 'animejs';

export default function Onboarding({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef([]);

  const [phase, setPhase] = useState(1);

  useEffect(() => {
    // Phase 1: Logo Reveal with Anime.js Scramble
    anime({
      targets: logoRef.current,
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 2000,
      easing: 'easeOutExpo',
      delay: 500
    });

    const letters = logoRef.current.innerText.split('');
    logoRef.current.innerText = '';
    letters.forEach((l) => {
      const span = document.createElement('span');
      span.innerText = l;
      span.style.opacity = 0;
      logoRef.current.appendChild(span);
    });

    anime({
      targets: logoRef.current.children,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100, { start: 500 }),
      easing: 'easeOutElastic(1, .8)',
      complete: () => {
        // Hold for 1 second, then fade out directly to the website
        setTimeout(() => {
          gsap.to(containerRef.current, {
            opacity: 0,
            scale: 1.1,
            filter: 'blur(20px)',
            duration: 1.5,
            ease: 'power3.inOut',
            onComplete: () => onComplete(false)
          });
        }, 1500);
      }
    });
  }, [onComplete]);

  return (
    <div ref={containerRef} style={{
      position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#02020a', overflow: 'hidden'
    }} className="page-container">
      
      {/* Logo */}
      <div ref={logoRef} className="heading-gradient" style={{
        position: 'absolute', fontSize: '3rem', fontWeight: 'bold', letterSpacing: '0.2em', opacity: 0
      }}>
        SHIVANSH MISHRA
      </div>

    </div>
  );
}
