import React from 'react';

export interface SocialLink {
  label: string;
  url: string;
  value?: string;
}

export interface ContactData {
  title?: string;
  email?: string;
  location?: string;
  socialLinks?: SocialLink[];
}

interface ContactSectionProps {
  data?: ContactData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const headline = data?.title || "Let's build something spatial.";
  const defaultLinks: SocialLink[] = [
    { label: 'Email', url: 'mailto:hello@haseef.gis', value: 'hello@haseef.gis' },
    { label: 'GitHub', url: 'https://github.com/yourhandle', value: 'github.com/yourhandle' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/yourhandle', value: 'linkedin.com/in/yourhandle' },
  ];

  const linksList = data?.socialLinks && data.socialLinks.length > 0 ? data.socialLinks : defaultLinks;

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
            borderRadius: '14px',
            padding: '36px 40px',
            textAlign: 'center',
            boxShadow: '0 8px 30px rgba(15,32,54,0.12)',
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
              margin: '0 0 24px',
              color: '#FFFFFF',
            }}
          >
            {headline}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
            {linksList.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                style={{
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  padding: '10px 22px',
                  borderRadius: '30px',
                  border: '1px solid rgba(95, 168, 211, 0.2)',
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{ color: '#5FA8D3', fontWeight: 700 }}>{link.label}:</span>
                <span>{link.value || link.url}</span>
              </a>
            ))}
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
