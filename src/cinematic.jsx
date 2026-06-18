
import { createRoot } from 'react-dom/client';
import CinematicBackground from './components/CinematicBackground';
import CustomCursor from './components/CustomCursor';
import Onboarding from './components/Onboarding';
import AdvancedEffects from './components/AdvancedEffects';

// Inject Custom Cursor
const cursorContainer = document.getElementById('custom-cursor-container');
if (cursorContainer) {
  createRoot(cursorContainer).render(<CustomCursor />);
}

// Inject Cinematic Background
const bgContainer = document.getElementById('cinematic-bg-container');
if (bgContainer) {
  createRoot(bgContainer).render(<CinematicBackground performanceMode={false} />);
}

// Inject Onboarding Sequence
const onboardingContainer = document.getElementById('onboarding-container');
if (onboardingContainer) {
  const handleComplete = () => {
    // If they chose performance mode, we could trigger a custom event or update a global var
    // For now, simply removing the onboarding is enough.
    onboardingContainer.style.display = 'none';
    
    // Play cinematic whoosh sound
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 1.5);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);
    
    osc.start();
    osc.stop(ctx.currentTime + 2);
  };
  
  createRoot(onboardingContainer).render(<Onboarding onComplete={handleComplete} />);
}

// Inject Advanced Effects
const effectsContainer = document.createElement('div');
effectsContainer.id = 'advanced-effects-container';
document.body.appendChild(effectsContainer);
createRoot(effectsContainer).render(<AdvancedEffects />);
