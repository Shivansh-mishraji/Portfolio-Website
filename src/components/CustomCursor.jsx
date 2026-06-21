import { useEffect, useRef } from 'react';

// Lightweight cursor: single RAF loop, no GSAP, no trail dots
// Uses CSS transform only (GPU-composited, never triggers layout)
export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const isMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isMouse) return;

    document.body.style.cursor = 'none';

    let mx = -200, my = -200;   // mouse target
    let rx = -200, ry = -200;   // ring (lagging)
    let rafId;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    // Single RAF loop — moves both elements each frame
    const loop = () => {
      // Dot snaps immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 3}px,${my - 3}px)`;
      }
      // Ring lerps (smooth lag)
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - 20}px,${ry - 20}px)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    const onOver = (e) => {
      const el = e.target.closest('a,button,[role="button"]');
      if (ringRef.current) {
        ringRef.current.style.borderColor = el ? 'rgba(6,182,212,0.9)' : 'rgba(124,58,237,0.55)';
        ringRef.current.style.scale = el ? '1.6' : '1';
      }
      if (dotRef.current) {
        dotRef.current.style.background = el ? 'var(--cyan)' : 'var(--violet-l)';
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    loop();

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafId);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <div style={{ pointerEvents:'none', zIndex:9999, position:'fixed', inset:0 }}>
      {/* Ring (lagging) */}
      <div ref={ringRef} style={{
        position:'absolute', top:0, left:0,
        width:40, height:40, borderRadius:'50%',
        border:'1.5px solid rgba(124,58,237,0.55)',
        transition:'border-color 0.2s, scale 0.25s',
        willChange:'transform', pointerEvents:'none'
      }} />
      {/* Center dot */}
      <div ref={dotRef} style={{
        position:'absolute', top:0, left:0,
        width:6, height:6, borderRadius:'50%',
        background:'var(--violet-l)',
        boxShadow:'0 0 8px var(--violet-l)',
        willChange:'transform', pointerEvents:'none'
      }} />
    </div>
  );
}
