import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import anime from 'animejs';

export default function Onboarding({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const subtitleRef = useRef(null);

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
      span.innerText = l === ' ' ? '\u00A0' : l;
      span.style.opacity = 0;
      logoRef.current.appendChild(span);
    });

    const subtitleLetters = subtitleRef.current.innerText.split('');
    subtitleRef.current.innerText = '';
    subtitleLetters.forEach((l) => {
      const span = document.createElement('span');
      span.innerText = l === ' ' ? '\u00A0' : l;
      span.style.opacity = 0;
      subtitleRef.current.appendChild(span);
    });

    const timeline = anime.timeline({
      easing: 'easeOutElastic(1, .8)'
    });

    timeline
      .add({
        targets: logoRef.current.children,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100, { start: 500 })
      })
      .add({
        targets: subtitleRef.current.children,
        opacity: [0, 1],
        translateY: [-10, 0],
        delay: anime.stagger(50),
        complete: () => {
          // Hold for 1.5 seconds, then fade out directly to the website
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
      }, '-=500'); // start slightly before the first animation finishes

  }, [onComplete]);

  return (
    <div ref={containerRef} style={{
      position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#02020a', overflow: 'hidden'
    }} className="page-container">
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Logo */}
        <div ref={logoRef} className="heading-gradient" style={{
          fontSize: '3rem', fontWeight: 'bold', letterSpacing: '0.2em', opacity: 0, marginBottom: '0.5rem', textAlign: 'center'
        }}>
          SHIVANSH MISHRA
        </div>
        
        {/* Subtitle */}
        <div ref={subtitleRef} style={{
          fontFamily: 'var(--mono)', fontSize: '1rem', color: 'var(--cyan)', letterSpacing: '0.3em', opacity: 1, textAlign: 'center', textTransform: 'uppercase'
        }}>
          Future ML Engineer
        </div>
      </div>

    </div>
  );
}
