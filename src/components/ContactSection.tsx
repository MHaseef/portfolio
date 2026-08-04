import React from 'react';

export const ContactSection: React.FC = () => {
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <section
        id="contact"
        style={{
          background: '#FFFFFF',
          padding: '48px 32px 64px',
          borderTop: '1px solid #E6E4DF',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: '640px',
            margin: '0 auto',
            background: '#0F2036',
            border: '1px solid #1C3A57',
            borderRadius: '12px',
            padding: '32px 40px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '2px',
              color: '#5FA8D3',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            Contact
          </div>
          <h2
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: 'clamp(24px, 3.5vw, 32px)',
              margin: '0 0 20px',
              color: '#FFFFFF',
            }}
          >
            Let's build something spatial.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a
              href="mailto:hello@haseef.gis"
              style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '15px', fontWeight: 600 }}
            >
              Email — hello@haseef.gis
            </a>
            <a
              href="https://github.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '15px', fontWeight: 600 }}
            >
              GitHub — github.com/yourhandle
            </a>
            <a
              href="https://linkedin.com/in/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '15px', fontWeight: 600 }}
            >
              LinkedIn — linkedin.com/in/yourhandle
            </a>
          </div>
        </div>
      </section>

      <footer
        style={{
          borderTop: '1px solid #1C3A57',
          padding: '28px 56px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          background: '#0F2036',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span style={{ color: '#8FA3B8', fontSize: '12px' }}>
          © 2026 Muhammad Haseef ·{' '}
          <a href="/admin/" style={{ color: '#8FA3B8', textDecoration: 'underline' }}>
            Admin Dashboard
          </a>
        </span>
        <button
          onClick={backToTop}
          style={{
            background: 'none',
            border: '1px solid #2A4A68',
            color: '#B9C9D8',
            fontSize: '12px',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          ↑ Back to top
        </button>
      </footer>
    </>
  );
};
