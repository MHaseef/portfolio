import React, { useState } from 'react';

export interface ExperienceData {
  id: string;
  title: string;
  company?: string;
  location?: string;
  dates?: string;
  teaser?: string;
  bullets?: string[];
}

interface ExperienceTimelineProps {
  items: ExperienceData[];
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ items }) => {
  const [activeItem, setActiveItem] = useState<ExperienceData | null>(null);

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
          {items.map(job => (
            <div
              key={job.id}
              onClick={() => setActiveItem(job)}
              style={{
                position: 'relative',
                background: '#FFFFFF',
                border: '1px solid #E6E4DF',
                borderRadius: '8px',
                padding: '16px 20px',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(16,24,32,0.03), 0 8px 20px rgba(16,24,32,0.04)',
                transition: 'border-color 0.2s ease',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: '-29px',
                  top: '20px',
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
                  gap: '8px',
                  marginBottom: '4px',
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                    fontSize: '16px',
                    color: '#16181C',
                  }}
                >
                  {job.title}
                </div>
                <div style={{ fontSize: '13px', color: '#5C6167', fontWeight: 600 }}>{job.dates}</div>
              </div>
              <div style={{ color: '#1B6FA8', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
                {job.company} · {job.location}
              </div>
              <div style={{ color: '#5C6167', fontSize: '14px', lineHeight: 1.5 }}>{job.teaser}</div>
            </div>
          ))}
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
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: '22px',
                marginBottom: '4px',
                color: '#16181C',
              }}
            >
              {activeItem.title}
            </div>
            <div style={{ color: '#1B6FA8', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
              {activeItem.company} · {activeItem.location}
            </div>
            <div style={{ fontSize: '12px', color: '#8A8F94', fontWeight: 600, marginBottom: '24px' }}>
              {activeItem.dates}
            </div>
            <ul style={{ color: '#3E4349', fontSize: '14px', lineHeight: 1.9, paddingLeft: '20px', margin: 0 }}>
              {(activeItem.bullets || []).map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};
