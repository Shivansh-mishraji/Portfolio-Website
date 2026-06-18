import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';

gsap.registerPlugin(ScrollTrigger);

export default function AdvancedEffects() {
  useEffect(() => {
    // 1. Magnetic Buttons
    const magneticElements = document.querySelectorAll('.btn-p, .btn-o, .spill, .nav-ul a');
    
    magneticElements.forEach((el) => {
      // We wrap the text in a span so we can move the button but keep text relatively stable if we wanted to
      // But standard magnetic is just moving the whole element
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) - rect.width / 2;
        const y = (e.clientY - rect.top) - rect.height / 2;
        
        gsap.to(el, {
          x: x * 0.4,
          y: y * 0.4,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
      
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });

    // 2. Cinematic Scroll Text Reveals
    const headings = document.querySelectorAll('.ttl');
    
    headings.forEach((heading) => {
      // Basic text splitting
      const text = heading.innerText;
      heading.innerHTML = '';
      text.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char === ' ' ? '\u00A0' : char; // preserve spaces
        span.style.opacity = 0;
        span.style.display = 'inline-block';
        heading.appendChild(span);
      });

      ScrollTrigger.create({
        trigger: heading,
        start: 'top 85%',
        onEnter: () => {
          anime({
            targets: heading.children,
            opacity: [0, 1],
            translateY: [20, 0],
            translateZ: 0,
            rotateZ: [5, 0],
            delay: anime.stagger(30),
            easing: 'easeOutElastic(1, .8)',
            duration: 1200
          });
        },
        once: true
      });
    });

    // 3. 3D Glassmorphism Cards
    const cards = document.querySelectorAll('.pcard, .tl-card, .resume-role-card');
    
    cards.forEach((card) => {
      // Remove original CSS transition on transform to prevent fighting with GSAP
      card.style.transition = 'border-color 0.3s, box-shadow 0.3s';
      card.parentNode.style.perspective = '1000px';
      
      // Create glare element
      const glare = document.createElement('div');
      glare.style.position = 'absolute';
      glare.style.top = '0';
      glare.style.left = '0';
      glare.style.width = '100%';
      glare.style.height = '100%';
      glare.style.background = 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.15) 25%, transparent 30%)';
      glare.style.transform = 'translateX(-100%)';
      glare.style.pointerEvents = 'none';
      glare.style.zIndex = '10'; // Above content
      
      // Ensure card has position relative and hidden overflow for glare
      if (window.getComputedStyle(card).position === 'static') {
        card.style.position = 'relative';
      }
      card.style.overflow = 'hidden';
      card.appendChild(glare);

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8; // subtle tilt
        const rotateY = ((x - centerX) / centerX) * 8;
        
        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.5,
          ease: 'power2.out',
          transformPerspective: 1000
        });

        // Glare effect follows mouse horizontally
        const glareX = (x / rect.width) * 200 - 100;
        gsap.to(glare, {
          x: `${glareX}%`,
          duration: 0.2
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
        gsap.to(glare, {
          x: '-100%',
          duration: 0.8
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return null; // Invisible component
}
