import React, { useState, useEffect } from 'react';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'blogs', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

export const HeaderNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const line = 140;
      let current = NAV_LINKS[0].id;
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= line) {
          current = link.id;
        }
      }
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
        current = NAV_LINKS[NAV_LINKS.length - 1].id;
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 56px',
        background: '#0F2036',
        borderBottom: '1px solid #1C3A57',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#1B6FA8',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: '14px',
          }}
        >
          MH
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: '20px',
            color: '#FFFFFF',
          }}
        >
          Muhammad Haseef
        </div>
      </div>

      <nav style={{ display: 'flex', gap: '32px' }}>
        {NAV_LINKS.map(link => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              style={{
                textDecoration: isActive ? 'underline' : 'none',
                fontSize: '14px',
                fontWeight: 600,
                color: isActive ? '#5FA8D3' : '#B9C9D8',
                transition: 'color 0.2s ease',
              }}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
};
