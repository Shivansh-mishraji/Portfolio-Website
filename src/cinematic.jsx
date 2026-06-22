import { createRoot } from 'react-dom/client';
import CinematicBackground from './components/CinematicBackground';
import CustomCursor from './components/CustomCursor';
import Onboarding from './components/Onboarding';
import AdvancedEffects from './components/AdvancedEffects';

// CSS-only cinematic background (no Three.js / WebGL)
const bgContainer = document.getElementById('cinematic-bg-container');
if (bgContainer) {
  createRoot(bgContainer).render(<CinematicBackground />);
}

// Custom cursor (desktop only, single RAF loop)
const cursorContainer = document.getElementById('custom-cursor-container');
if (cursorContainer) {
  createRoot(cursorContainer).render(<CustomCursor />);
}

// Onboarding splash — renders then calls onComplete to reveal site
const onboardingContainer = document.getElementById('onboarding-container');
if (onboardingContainer) {
  createRoot(onboardingContainer).render(
    <Onboarding onComplete={() => {
      onboardingContainer.style.display = 'none';
    }} />
  );
}

// Advanced scroll/hover effects (GSAP batched, RAF-throttled)
// Defer until after first paint so it doesn't block LCP
const initAdvancedEffects = () => {
  const el = document.createElement('div');
  document.body.appendChild(el);
  createRoot(el).render(<AdvancedEffects />);
};

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(initAdvancedEffects);
} else {
  setTimeout(initAdvancedEffects, 300);
}
