import React, { useState, useEffect } from 'react';

export interface ExperienceData {
  id: string;
  title: string;
  company?: string;
  type?: string;
  logo?: string;
  location?: string;
  dates?: string;
  startDate?: string;
  endDate?: string;
  teaser?: string;
  description?: string;
  bullets?: string[];
}

interface ExperienceTimelineProps {
  items: ExperienceData[];
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ items }) => {
  const [activeItem, setActiveItem] = useState<ExperienceData | null>(null);

  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [activeItem]);

  return (
    <section
      id="experience"
      style={{
        background: '#F7F6F3',
        padding: '48px 32px',
        borderTop: '1px solid #E6E4DF',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: '920px', margin: '0 auto' }}>
        <div
          style={{
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '2px',
            color: '#1B6FA8',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          Experience
        </div>
        <h2
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 36px)',
            margin: '0 0 24px',
            color: '#16181C',
          }}
        >
          Where I've worked
        </h2>

        <div
          style={{
            position: 'relative',
            paddingLeft: '24px',
            borderLeft: '2px solid #E6E4DF',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {items.map(job => {
            const displayDates = job.dates || (job.startDate ? `${job.startDate} — ${job.endDate || 'Present'}` : '');
            const companyInitial = job.company ? job.company.charAt(0).toUpperCase() : job.title.charAt(0).toUpperCase();
            return (
              <div
                key={job.id}
                onClick={() => setActiveItem(job)}
                style={{
                  position: 'relative',
                  background: '#FFFFFF',
                  border: '1px solid #E6E4DF',
                  borderRadius: '10px',
                  padding: '18px 22px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(16,24,32,0.03), 0 8px 20px rgba(16,24,32,0.04)',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '-29px',
                    top: '24px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#1B6FA8',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginBottom: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {job.logo ? (
                      <img
                        src={job.logo}
                        alt={job.company || job.title}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '8px',
                          objectFit: 'contain',
                          border: '1px solid #E6E4DF',
                          background: '#FFFFFF',
                          padding: '4px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                          flexShrink: 0,
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '8px',
                          background: '#0F2036',
                          color: '#5FA8D3',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 700,
                          fontSize: '18px',
                          flexShrink: 0,
                        }}
                      >
                        {companyInitial}
                      </div>
                    )}
                    <div>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 600,
                          fontSize: '17px',
                          color: '#16181C',
                        }}
                      >
                        {job.title}
                      </div>
                      <div style={{ color: '#1B6FA8', fontSize: '14px', fontWeight: 600, marginTop: '2px' }}>
                        {job.company}{job.location ? ` · ${job.location}` : ''} {job.type ? ` (${job.type})` : ''}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', color: '#5C6167', fontWeight: 600 }}>{displayDates}</div>
                </div>
                <div style={{ color: '#5C6167', fontSize: '14px', lineHeight: 1.55 }}>{job.teaser}</div>
              </div>
            );
          })}
        </div>
      </div>

      {activeItem && (
        <div
          onClick={() => setActiveItem(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(22,24,28,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E6E4DF',
              borderRadius: '14px',
              maxWidth: '640px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '40px',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(16,24,32,0.2)',
            }}
          >
            <button
              onClick={() => setActiveItem(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: '#8A8F94',
                fontSize: '22px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
              {activeItem.logo && (
                <img
                  src={activeItem.logo}
                  alt={activeItem.company || activeItem.title}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '8px',
                    objectFit: 'contain',
                    border: '1px solid #E6E4DF',
                    background: '#FFFFFF',
                    padding: '4px',
                    flexShrink: 0,
                  }}
                />
              )}
              <div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    fontSize: '22px',
                    marginBottom: '2px',
                    color: '#16181C',
                  }}
                >
                  {activeItem.title}
                </div>
                <div style={{ color: '#1B6FA8', fontSize: '14px', fontWeight: 600 }}>
                  {activeItem.company}{activeItem.location ? ` · ${activeItem.location}` : ''}
                </div>
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#8A8F94', fontWeight: 600, marginBottom: '24px' }}>
              {activeItem.dates}
            </div>
            {activeItem.description && (
              <div
                style={{
                  color: '#3E4349',
                  fontSize: '15px',
                  lineHeight: 1.75,
                  marginBottom: activeItem.bullets && activeItem.bullets.length > 0 ? '18px' : '0',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {activeItem.description}
              </div>
            )}
            {activeItem.bullets && activeItem.bullets.length > 0 && (
              <ul style={{ color: '#3E4349', fontSize: '14px', lineHeight: 1.9, paddingLeft: '20px', margin: 0 }}>
                {activeItem.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
