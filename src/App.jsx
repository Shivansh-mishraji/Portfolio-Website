import React, { useState, useEffect, useRef } from 'react';
import CinematicBackground from './components/CinematicBackground';
import CustomCursor from './components/CustomCursor';
import Onboarding from './components/Onboarding';
import Sidebar from './components/Sidebar';
import gsap from 'gsap';

// A helper to dangerously render the original static HTML content for the portfolio sections
// to save time on manual JSX conversion, while still benefiting from the React shell.
// We'll replace this with proper components if needed, but for a 1:1 migration of content,
// injecting the modified HTML is safest to preserve their exact structure.

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [performanceMode, setPerformanceMode] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const contentRef = useRef(null);

  // Handle intersection observer for scroll animations
  useEffect(() => {
    if (showOnboarding) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          
          // Animate progress bars if they exist
          const bars = entry.target.querySelectorAll('.bar-fill');
          bars.forEach(b => {
            b.style.width = b.getAttribute('data-pct') + '%';
          });

          // Animate counters
          const counters = entry.target.querySelectorAll('[data-count]');
          counters.forEach(el => {
            const target = +el.getAttribute('data-count');
            let c = 0;
            const step = Math.ceil(target / 40);
            const tmr = setInterval(() => {
              c = Math.min(c + step, target);
              el.textContent = c + '+';
              if (c >= target) clearInterval(tmr);
            }, 38);
            el.removeAttribute('data-count'); // prevent re-triggering
          });
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.rv, .rvl, .rvr');
    animatedElements.forEach(el => observer.observe(el));

    // Section tracking
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });

    const sections = document.querySelectorAll('section');
    sections.forEach(sec => sectionObserver.observe(sec));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
      sections.forEach(sec => sectionObserver.unobserve(sec));
    };
  }, [showOnboarding]);

  // Audio setup
  useEffect(() => {
    if (!showOnboarding && !performanceMode) {
      // Synthesize a cinematic whoosh/pad using Web Audio API
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      
      // Whoosh
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
    }
  }, [showOnboarding, performanceMode]);

  const handleNavigate = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOnboardingComplete = (isPerformanceMode) => {
    setPerformanceMode(isPerformanceMode);
    setShowOnboarding(false);
  };

  return (
    <>
      <CustomCursor />
      
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
      
      {!showOnboarding && (
        <>
          <CinematicBackground performanceMode={performanceMode} />
          <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />
          
          <main 
            ref={contentRef}
            className="reveal-cinematic"
            style={{
              position: 'relative',
              zIndex: 10,
              marginLeft: window.innerWidth > 768 ? '80px' : '0', // Adjust for collapsed sidebar
              padding: '2rem',
              transition: 'margin-left 0.6s'
            }}
          >
            {/* 
              We will inject the converted JSX of the sections here.
              For now, I am placing the Hero section properly converted.
            */}
            
            <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '5rem', overflow: 'hidden' }}>
              <div className="con">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '4rem', alignItems: 'center' }}>
                  <div>
                    <div className="rv" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(124,58,237,.1)', border: '1px solid rgba(124,58,237,.28)', borderRadius: '50px', padding: '0.38rem 1rem', fontSize: '0.78rem', color: 'var(--violet-l)', marginBottom: '1.75rem', fontFamily: 'var(--mono)' }}>
                      <span style={{ width: '7px', height: '7px', background: 'var(--green)', borderRadius: '50%', boxShadow: '0 0 10px var(--green)' }}></span>
                      Actively seeking Internships in ML, AI & Data Science
                    </div>
                    <h1 className="rv" style={{ fontFamily: 'var(--head)', fontSize: 'clamp(2.8rem,7vw,5.5rem)', fontWeight: 700, letterSpacing: '-.04em', lineHeight: 1.05, marginBottom: '1rem' }}>
                      <span className="heading-gradient text-morph">Shivansh</span><br/>Mishra
                    </h1>
                    <div className="rv" style={{ fontFamily: 'var(--head)', fontSize: 'clamp(1.1rem,2.5vw,1.6rem)', color: 'var(--txt2)', fontWeight: 400, marginBottom: '1.4rem' }}>
                      I'm a <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>Machine Learning Engineer</span>
                    </div>
                    <p className="rv" style={{ fontSize: '1rem', color: 'var(--txt2)', maxWidth: '560px', lineHeight: 1.85, marginBottom: '2.2rem' }}>
                      Pre-Final Year <strong style={{ color: 'var(--violet-l)' }}>Machine Learning Engineer</strong> | Data Scientist & AI Strategist.<br/>
                      I design robust ML pipelines, deploy scalable AI-first architectures, and leverage rapid prototyping to deliver production-grade data products and actionable business insights.
                    </p>
                    <div className="rv" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem', marginBottom: '2.2rem' }}>
                      <button className="btn-magnetic" onClick={() => handleNavigate('projects')}>View Projects</button>
                      <a href="resume-master.html" target="_blank" rel="noreferrer" className="btn-magnetic" style={{ background: 'transparent', border: '1px solid var(--violet)', color: 'var(--violet-l)', boxShadow: 'none' }}>Download Resume</a>
                    </div>
                  </div>
                  <div className="rv" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '320px', height: '320px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--violet), var(--cyan), var(--pink))', padding: '3px', boxShadow: '0 0 60px rgba(124,58,237,.4), 0 0 120px rgba(6,182,212,.15)' }}>
                      <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: 'var(--bg2)' }}>
                        <img src="/profile.jpg" alt="Shivansh" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="about" className="section-padding">
              <div className="con">
                <div className="rvl">
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '.78rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '.6rem', display: 'block' }}>// about me</span>
                  <h2 className="heading-gradient" style={{ fontSize: 'clamp(1.9rem,4vw,2.8rem)', marginBottom: '2rem' }}>Building at the intersection of Data & AI</h2>
                  <p style={{ color: 'var(--txt2)', maxWidth: '800px', fontSize: '1.1rem' }}>
                    I'm <strong style={{ color: 'var(--violet-l)' }}>Shivansh Mishra</strong>, a 3rd-year CS student operating with the rigor of an experienced Machine Learning Engineer and Data Scientist. I specialize in building scalable, production-ready AI software, architecting end-to-end ML pipelines, and transforming raw data into high-impact strategic business assets.
                  </p>
                </div>
                
                <div className="rvr" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
                  {[
                    { count: 10, label: 'Projects Shipped' },
                    { count: 15, label: 'Technologies Used' },
                    { count: 3, label: 'Live Deployments' },
                    { count: 2, label: 'Events / Pitches' }
                  ].map((stat, i) => (
                    <div key={i} className="glass-panel" style={{ padding: '2rem', textAlign: 'center', borderRadius: '1rem' }}>
                      <div className="heading-gradient" style={{ fontSize: '3rem', fontWeight: 'bold' }} data-count={stat.count}>0</div>
                      <div style={{ color: 'var(--txt2)', fontSize: '0.9rem' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="projects" className="section-padding">
              <div className="con">
                 <div className="rv">
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '.78rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: '.6rem', display: 'block' }}>// work</span>
                  <h2 className="heading-gradient" style={{ fontSize: 'clamp(1.9rem,4vw,2.8rem)', marginBottom: '2rem' }}>Projects & Builds</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                  {[
                    { title: 'Nyaya Mitra', desc: 'AI-first legal super-app focused on practical problem-solving.', tags: ['AI', 'Legal Tech'], link: '#' },
                    { title: 'Contact Forge', desc: 'A deployed web project representing hands-on experience in building usable applications.', tags: ['Web', 'Vercel'], link: 'https://contactforge-cloud-web.vercel.app/' },
                    { title: 'House Price Prediction', desc: 'Fully deployed Streamlit web app predicting house prices using an ML regression model.', tags: ['Python', 'Scikit-Learn'], link: 'https://house-price-prediction-app-tau.vercel.app' }
                  ].map((proj, i) => (
                    <div key={i} className="glass-panel rv" style={{ padding: '2rem', borderRadius: '1rem', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--txt)' }}>{proj.title}</h3>
                      <p style={{ color: 'var(--txt2)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{proj.desc}</p>
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        {proj.tags.map(tag => <span key={tag} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(124,58,237,0.1)', color: 'var(--violet-l)', borderRadius: '4px' }}>{tag}</span>)}
                      </div>
                      <a href={proj.link} target="_blank" rel="noreferrer" className="btn-magnetic" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>View Live</a>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </main>
        </>
      )}
    </>
  );
}

export default App;
