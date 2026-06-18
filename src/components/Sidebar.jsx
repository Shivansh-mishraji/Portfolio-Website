import React, { useState } from 'react';
import { Home, User, Code, Briefcase, FileText, GraduationCap, Mail, ChevronRight, ChevronLeft, Activity } from 'lucide-react';

export default function Sidebar({ activeSection, onNavigate }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: 'hero', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'experience', icon: Activity, label: 'Experience' },
    { id: 'resume', icon: FileText, label: 'Resume' },
    { id: 'education', icon: GraduationCap, label: 'Education' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <div 
      className="frosted-neon"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: isCollapsed ? '80px' : '260px',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.6s cubic-bezier(0.77, 0, 0.175, 1), clip-path 0.6s',
        clipPath: isCollapsed ? 'circle(40px at 40px 40px)' : 'circle(150% at 40px 40px)',
        borderRight: '1px solid rgba(124, 58, 237, 0.3)',
      }}
    >
      <div style={{ padding: '2rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {!isCollapsed && (
          <div className="heading-gradient" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            SM<span style={{ color: 'var(--cyan)' }}>.</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ background: 'transparent', border: 'none', color: 'var(--txt)', cursor: 'pointer', padding: '0.5rem', marginLeft: isCollapsed ? 'auto' : '0', marginRight: isCollapsed ? 'auto' : '0' }}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {!isCollapsed && (
        <div className="holographic" style={{ margin: '0 1.5rem 2rem', padding: '1rem', background: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--violet), var(--cyan))', padding: '2px' }}>
            <img src="/profile.jpg" alt="Shivansh" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} onError={(e) => {e.target.style.display='none'}} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--txt)' }}>Shivansh M.</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--cyan)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', background: 'var(--cyan)', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 5px var(--cyan)', animation: 'pulse 2s infinite' }} />
              System Online
            </div>
          </div>
        </div>
      )}

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0 1rem' }}>
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                if (window.innerWidth < 768) setIsCollapsed(true);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem 1rem',
                background: isActive ? 'rgba(124, 58, 237, 0.15)' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: isActive ? 'var(--txt)' : 'var(--txt2)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                position: 'relative',
                overflow: 'hidden',
                justifyContent: isCollapsed ? 'center' : 'flex-start'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--txt)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isActive ? 'var(--txt)' : 'var(--txt2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Icon size={20} style={{ color: isActive ? 'var(--cyan)' : 'inherit', flexShrink: 0 }} />
              {!isCollapsed && <span style={{ fontSize: '0.9rem', fontWeight: isActive ? '600' : '500' }}>{item.label}</span>}
              {isActive && !isCollapsed && (
                <span style={{ position: 'absolute', bottom: 0, left: '1rem', right: '1rem', height: '2px', background: 'linear-gradient(90deg, var(--violet), var(--cyan))' }} />
              )}
            </button>
          );
        })}
      </nav>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
}
