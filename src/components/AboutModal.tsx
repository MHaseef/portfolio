import React from 'react';

export interface BioData {
  name?: string;
  avatar?: string;
  initials?: string;
  role?: string;
  location?: string;
  bio?: string[];
  education?: {
    degree?: string;
    university?: string;
    logo?: string;
    dates?: string;
  };
  achievements?: string[];
}

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  bioData?: BioData;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, bioData }) => {
  if (!isOpen) return null;

  const name = bioData?.name || 'Muhammad Haseef';
  const avatar = bioData?.avatar || '';
  const initials = bioData?.initials || 'MH';
  const role = bioData?.role || 'Geoinformatics Engineer · GIS Developer & Analyst';
  const bio = bioData?.bio || [
    "At my core, I'm a builder who enjoys solving puzzle-like problems.",
    "I've always been fascinated by how small, intentional design choices can completely change the way we interact with information. For me, the beauty of technical work lies in the process: peeling back layers of a problem, asking the right questions, and finding the most elegant, efficient path forward.",
    "I don't believe in overcomplicating things for the sake of it. I value clarity, precision, and building tools that make people's lives just a little bit simpler and more intuitive.",
  ];

  const education = {
    degree: bioData?.education?.degree || 'BE Geoinformatics Engineering',
    university: bioData?.education?.university || 'National University of Sciences and Technology (NUST), Islamabad',
    logo: bioData?.education?.logo || '',
    dates: bioData?.education?.dates || '2024 — 2028',
  };

  const achievements = bioData?.achievements || [
    'Best Final Year Project — Spatial AI for Flood Risk Mapping',
    'Google Earth Engine certified developer',
    'Published technical writing on WebGIS architecture',
  ];


  return (
    <div
      onClick={onClose}
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
          maxWidth: '720px',
          width: '100%',
          maxHeight: '88vh',
          overflowY: 'auto',
          padding: '44px',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(16,24,32,0.2)',
        }}
      >
        <button
          onClick={onClose}
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

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '36px' }}>
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #1B6FA8',
                flexShrink: 0,
              }}
            />
          ) : (
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: '#1B6FA8',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: '24px',
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
          )}
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: '22px',
                color: '#16181C',
              }}
            >
              {name}
            </div>
            <div style={{ color: '#1B6FA8', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>
              {role}
            </div>
          </div>
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600,
            fontSize: '13px',
            letterSpacing: '0.5px',
            color: '#1B6FA8',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
        >
          About me
        </div>
        {bio.map((para, i) => (
          <p key={i} style={{ color: '#3E4349', fontSize: '15px', lineHeight: 1.75, margin: '0 0 18px' }}>
            {para}
          </p>
        ))}

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600,
            fontSize: '13px',
            letterSpacing: '0.5px',
            color: '#1B6FA8',
            textTransform: 'uppercase',
            margin: '28px 0 12px',
          }}
        >
          Education
        </div>
        <div
          style={{
            background: '#F7F6F3',
            border: '1px solid #E6E4DF',
            borderRadius: '10px',
            padding: '18px',
            marginBottom: '28px',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          {education.logo ? (
            <img
              src={education.logo}
              alt={education.university}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                objectFit: 'contain',
                background: '#FFFFFF',
                border: '1px solid #E6E4DF',
                padding: '4px',
                flexShrink: 0,
              }}
            />
          ) : (
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                background: '#0F2036',
                color: '#5FA8D3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: '14px',
                flexShrink: 0,
              }}
            >
              NUST
            </div>
          )}
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: '15px', color: '#16181C' }}>
              {education.degree}
            </div>
            <div style={{ color: '#1B6FA8', fontSize: '13px', fontWeight: 600, margin: '4px 0' }}>
              {education.university}
            </div>
            <div style={{ color: '#5C6167', fontSize: '13px' }}>{education.dates}</div>
          </div>
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600,
            fontSize: '13px',
            letterSpacing: '0.5px',
            color: '#1B6FA8',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
        >
          Achievements
        </div>
        <ul style={{ color: '#3E4349', fontSize: '14px', lineHeight: 1.9, paddingLeft: '20px', margin: 0 }}>
          {achievements.map((ach, i) => (
            <li key={i}>{ach}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
