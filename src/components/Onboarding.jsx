import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import * as animeModule from 'animejs';
const anime = animeModule.default || animeModule;

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
        setTimeout(() => setPhase(2), 1000);
      }
    });
  }, []);

  useEffect(() => {
    if (phase === 2) {
      const tl = gsap.timeline();
      
      tl.to(logoRef.current, {
        y: -100,
        scale: 0.6,
        opacity: 0,
        duration: 1,
        ease: 'power3.inOut'
      })
      .fromTo(textRef.current, {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, "-=0.5")
      .fromTo(cardsRef.current, {
        opacity: 0,
        rotationY: 90,
        z: -500
      }, {
        opacity: 1,
        rotationY: 0,
        z: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: 'back.out(1.7)'
      }, "-=0.5");
    }
  }, [phase]);

  const handleCardMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(card, {
      rotationY: x * 0.05,
      rotationX: -y * 0.05,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center"
    });
  };

  const handleCardMouseLeave = (index) => {
    const card = cardsRef.current[index];
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      ease: "power2.out"
    });
  };

  return (
    <div ref={containerRef} style={{
      position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#02020a', overflow: 'hidden'
    }} className="page-container">
      
      {/* Phase 1 Logo */}
      <div ref={logoRef} className="heading-gradient" style={{
        position: 'absolute', fontSize: '3rem', fontWeight: 'bold', letterSpacing: '0.2em', opacity: 0
      }}>
        SHIVANSH MISHRA
      </div>

      {/* Phase 2 Content */}
      <div style={{
        position: 'relative', zIndex: 10, width: '100%', maxWidth: '1000px', padding: '0 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: phase === 2 ? 'auto' : 'none'
      }}>
        <div ref={textRef} style={{ textAlign: 'center', opacity: 0, marginBottom: '4rem' }}>
          <h1 className="heading-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Enter the Experience</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--txt2)', fontFamily: 'var(--mono)' }}>Initializing Cinematic Neural Link...</p>
        </div>

        <div className="perspective-container" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%'
        }}>
          {['Performance Mode', 'Cinematic Mode'].map((mode, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="glass-panel"
              onMouseMove={(e) => handleCardMouseMove(e, i)}
              onMouseLeave={() => handleCardMouseLeave(i)}
              onClick={() => {
                gsap.to(containerRef.current, {
                  opacity: 0,
                  scale: 1.1,
                  filter: 'blur(20px)',
                  duration: 1.5,
                  ease: 'power3.inOut',
                  onComplete: () => onComplete(i === 0) // true if performance mode
                });
              }}
              style={{
                padding: '2.5rem', borderRadius: '1rem', cursor: 'pointer', transition: 'border-color 0.3s',
                opacity: 0,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(10, 10, 25, 0.6)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--violet)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
            >
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: i === 0 ? 'var(--cyan)' : 'var(--violet-l)' }}>
                {mode}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--txt2)' }}>
                {i === 0 
                  ? 'Optimized for battery and performance. Minimal 3D effects.' 
                  : 'Full WebGL experience with immersive particle effects.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
