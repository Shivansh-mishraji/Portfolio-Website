import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const dotsRef = useRef([]);
  const [hoverState, setHoverState] = useState('default');

  useEffect(() => {
    // Only activate custom cursor on non-touch, fine-pointer devices
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isTouchOnly = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (!isFinePointer || isTouchOnly) {
      // Hide all cursor elements and leave system cursor unchanged
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      if (ringRef.current) ringRef.current.style.display = 'none';
      dotsRef.current.forEach(d => d && (d.style.display = 'none'));
      return; // Don't attach any listeners
    }

    // Hide default cursor only on desktop
    document.body.style.cursor = 'none';

    const onMouseMove = (e) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
      gsap.to(ringRef.current, { x: e.clientX, y: e.clientY, duration: 0.4, ease: 'power3.out' });
      dotsRef.current.forEach((dot, index) => {
        if (dot) {
          gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.2 + index * 0.05, ease: 'power2.out' });
        }
      });
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' ||
          target.closest('a') || target.closest('button') || target.closest('[role="button"]')) {
        setHoverState('active');
        if (target.classList.contains('danger') || target.closest('.danger')) setHoverState('danger');
        if (target.classList.contains('success') || target.closest('.success')) setHoverState('success');
      } else {
        setHoverState('default');
      }
    };

    const onMouseDown = () => { gsap.to(ringRef.current, { scale: 0.5, duration: 0.15 }); };
    const onMouseUp = () => { gsap.to(ringRef.current, { scale: 1, duration: 0.2 }); };

    // Hide cursor when it leaves the window
    const onMouseLeave = () => {
      gsap.to([cursorRef.current, ringRef.current], { opacity: 0, duration: 0.2 });
    };
    const onMouseEnter = () => {
      gsap.to([cursorRef.current, ringRef.current], { opacity: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      // Restore cursor on cleanup
      document.body.style.cursor = 'auto';
    };
  }, []);

  const getRingColor = () => {
    switch (hoverState) {
      case 'active': return 'rgba(6, 182, 212, 0.8)';
      case 'danger': return 'rgba(239, 68, 68, 0.8)';
      case 'success': return 'rgba(16, 185, 129, 0.8)';
      default: return 'rgba(124, 58, 237, 0.5)';
    }
  };

  const getRingScale = () => hoverState === 'active' ? 1.5 : 1;

  return (
    <div style={{ pointerEvents: 'none', zIndex: 9999, position: 'fixed', inset: 0 }}>
      {/* Trails */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={el => dotsRef.current[i] = el}
          style={{
            position: 'absolute',
            top: -4, left: -4, width: 8, height: 8,
            borderRadius: '50%',
            background: 'var(--violet)',
            opacity: 0.3 - (i * 0.05),
            transform: 'translate(-50%, -50%)',
            willChange: 'transform',
          }}
        />
      ))}

      {/* Outer Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'absolute',
          top: -20, left: -20, width: 40, height: 40,
          borderRadius: '50%',
          border: `2px solid ${getRingColor()}`,
          transition: 'border-color 0.3s, transform 0.3s',
          transform: `translate(-50%, -50%) scale(${getRingScale()})`,
          willChange: 'transform',
        }}
      />

      {/* Center Dot */}
      <div
        ref={cursorRef}
        style={{
          position: 'absolute',
          top: -3, left: -3, width: 6, height: 6,
          borderRadius: '50%',
          background: hoverState === 'active' ? 'var(--cyan)' : 'var(--violet-l)',
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 10px ${hoverState === 'active' ? 'var(--cyan)' : 'var(--violet-l)'}`,
          willChange: 'transform',
        }}
      />
    </div>
  );
}
