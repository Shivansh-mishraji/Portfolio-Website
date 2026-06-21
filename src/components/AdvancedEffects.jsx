import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AdvancedEffects() {
  useEffect(() => {
    const isMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) return; // nothing if user prefers reduced motion

    // 1. Batch scroll reveals — ONE ScrollTrigger per group, not per element
    ScrollTrigger.batch('.ttl', {
      start: 'top 90%',
      onEnter: (els) => gsap.fromTo(els,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.05 }
      ),
      once: true
    });

    ScrollTrigger.batch('.fc, .icard, .scard', {
      start: 'top 92%',
      onEnter: (els) => gsap.fromTo(els,
        { opacity: 0, y: 22, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out', stagger: 0.06 }
      ),
      once: true
    });

    // 2. Magnetic buttons — throttled, desktop only
    if (isMouse) {
      const cleanup = [];
      document.querySelectorAll('.btn-p, .btn-o, .nav-cta').forEach((el) => {
        let raf;
        const onMove = (e) => {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            const r = el.getBoundingClientRect();
            gsap.to(el, {
              x: (e.clientX - r.left - r.width  / 2) * 0.28,
              y: (e.clientY - r.top  - r.height / 2) * 0.28,
              duration: 0.35, ease: 'power2.out', overwrite: true
            });
          });
        };
        const onLeave = () => {
          cancelAnimationFrame(raf);
          gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)', overwrite: true });
        };
        el.addEventListener('mousemove', onMove, { passive: true });
        el.addEventListener('mouseleave', onLeave);
        cleanup.push(() => {
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
          cancelAnimationFrame(raf);
        });
      });

      // 3. Card tilt — .tl-card only, no glare div injection (DOM mutation causes reflow)
      document.querySelectorAll('.tl-card').forEach((card) => {
        let raf2;
        const onMove = (e) => {
          cancelAnimationFrame(raf2);
          raf2 = requestAnimationFrame(() => {
            const r = card.getBoundingClientRect();
            gsap.to(card, {
              rotateX: ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -5,
              rotateY: ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  5,
              duration: 0.4, ease: 'power2.out',
              transformPerspective: 900, overwrite: 'auto'
            });
          });
        };
        const onLeave = () => {
          cancelAnimationFrame(raf2);
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'power2.out', overwrite: 'auto' });
        };
        card.addEventListener('mousemove', onMove, { passive: true });
        card.addEventListener('mouseleave', onLeave);
        cleanup.push(() => {
          card.removeEventListener('mousemove', onMove);
          card.removeEventListener('mouseleave', onLeave);
          cancelAnimationFrame(raf2);
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
        cleanup.forEach(fn => fn());
      };
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return null;
}
