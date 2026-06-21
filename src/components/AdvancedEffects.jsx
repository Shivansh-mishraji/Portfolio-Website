import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AdvancedEffects() {
  useEffect(() => {
    // Only apply heavy effects on non-touch, fine-pointer devices
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // 1. Magnetic Buttons — only on desktop/mouse
    if (isFinePointer) {
      const magneticElements = document.querySelectorAll('.btn-p, .btn-o, .spill, .nav-ul a');

      magneticElements.forEach((el) => {
        const onMove = (e) => {
          const rect = el.getBoundingClientRect();
          const x = (e.clientX - rect.left) - rect.width / 2;
          const y = (e.clientY - rect.top) - rect.height / 2;
          gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: 'power2.out' });
        };
        const onLeave = () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
        };
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        // Store for cleanup
        el._magneticMove = onMove;
        el._magneticLeave = onLeave;
      });
    }

    // 2. Cinematic Scroll Reveals on headings
    // NOTE: We do NOT split heading text into spans — that breaks CSS gradient clip.
    // Instead, we animate the whole heading element with a smooth reveal.
    const headings = document.querySelectorAll('.ttl');
    headings.forEach((heading) => {
      ScrollTrigger.create({
        trigger: heading,
        start: 'top 88%',
        onEnter: () => {
          gsap.fromTo(heading,
            { opacity: 0, y: 20, skewY: 1 },
            { opacity: 1, y: 0, skewY: 0, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true
      });
    });

    // 3. 3D Glassmorphism Cards — tl-card and resume-role-card only
    // (pcard tilt is handled in main.js to avoid conflicts)
    if (isFinePointer) {
      const cards = document.querySelectorAll('.tl-card, .resume-role-card');

      cards.forEach((card) => {
        // Ensure perspective on parent
        if (card.parentNode) {
          card.parentNode.style.perspective = '1000px';
        }

        // Create glare element
        const glare = document.createElement('div');
        glare.className = 'card-glare';
        glare.style.cssText = `
          position:absolute;top:0;left:0;width:100%;height:100%;
          background:linear-gradient(105deg,transparent 20%,rgba(255,255,255,0.12) 25%,transparent 30%);
          transform:translateX(-100%);pointer-events:none;z-index:10;border-radius:inherit;
        `;

        if (window.getComputedStyle(card).position === 'static') {
          card.style.position = 'relative';
        }
        card.style.overflow = 'hidden';
        card.appendChild(glare);

        const onMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
          const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;

          gsap.to(card, {
            rotateX,
            rotateY,
            translateY: -4,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 1000,
            overwrite: 'auto'
          });

          const glareX = (x / rect.width) * 200 - 100;
          gsap.to(glare, { x: `${glareX}%`, duration: 0.2 });
        };

        const onLeave = () => {
          gsap.to(card, {
            rotateX: 0, rotateY: 0, translateY: 0,
            duration: 0.8, ease: 'power2.out', overwrite: 'auto'
          });
          gsap.to(glare, { x: '-100%', duration: 0.8 });
        };

        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        card._advMove = onMove;
        card._advLeave = onLeave;
      });
    }

    // 4. Staggered section entry animations (focus cards, interest cards)
    const groups = [
      { selector: '.focus-cards .fc', delay: 0.08 },
      { selector: '.int-g .icard', delay: 0.05 },
      { selector: '.stats-g .scard', delay: 0.1 },
    ];

    groups.forEach(({ selector, delay }) => {
      const items = document.querySelectorAll(selector);
      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 90%',
          onEnter: () => {
            gsap.fromTo(item,
              { opacity: 0, y: 24, scale: 0.97 },
              { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out', delay: i * delay }
            );
          },
          once: true
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());

      // Remove magnetic listeners
      document.querySelectorAll('.btn-p, .btn-o, .spill, .nav-ul a').forEach((el) => {
        if (el._magneticMove) el.removeEventListener('mousemove', el._magneticMove);
        if (el._magneticLeave) el.removeEventListener('mouseleave', el._magneticLeave);
      });

      // Remove card listeners
      document.querySelectorAll('.tl-card, .resume-role-card').forEach((card) => {
        if (card._advMove) card.removeEventListener('mousemove', card._advMove);
        if (card._advLeave) card.removeEventListener('mouseleave', card._advLeave);
        const glare = card.querySelector('.card-glare');
        if (glare) glare.remove();
      });
    };
  }, []);

  return null;
}
