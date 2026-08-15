import React from 'react';

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  icon?: string;
}

const DEFAULT_SKILLS: SkillItem[] = [
  { id: 's1', name: 'Python', category: 'Languages & Frameworks' },
  { id: 's2', name: 'JavaScript', category: 'Languages & Frameworks' },
  { id: 's3', name: 'C++', category: 'Languages & Frameworks' },
  { id: 's4', name: 'Java', category: 'Languages & Frameworks' },
  { id: 's5', name: 'React', category: 'Languages & Frameworks' },
  { id: 's6', name: 'Astro', category: 'Languages & Frameworks' },
  { id: 's7', name: 'Angular', category: 'Languages & Frameworks' },
  { id: 's8', name: 'Node.js', category: 'Languages & Frameworks' },
  { id: 's9', name: 'Tailwind CSS', category: 'Languages & Frameworks' },
  { id: 's10', name: 'Leaflet', category: 'Tools & Platforms' },
  { id: 's11', name: 'MapLibre GL', category: 'Tools & Platforms' },
  { id: 's12', name: 'Turf.js', category: 'Tools & Platforms' },
  { id: 's13', name: 'GeoServer', category: 'Tools & Platforms' },
  { id: 's14', name: 'PostGIS', category: 'Tools & Platforms' },
  { id: 's15', name: 'QGIS', category: 'Tools & Platforms' },
  { id: 's16', name: 'Google Earth Engine', category: 'Tools & Platforms' },
  { id: 's17', name: 'Firebase', category: 'Tools & Platforms' },
  { id: 's18', name: 'Supabase', category: 'Tools & Platforms' },
  { id: 's19', name: 'Geopandas', category: 'Tools & Platforms' },
];

interface SkillsMatrixProps {
  activeFilter: string | null;
  onSelectSkill: (skillName: string | null) => void;
  skills?: SkillItem[];
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ activeFilter, onSelectSkill, skills }) => {
  const skillList = skills && skills.length > 0 ? skills : DEFAULT_SKILLS;

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleSkillClick = (name: string) => {
    if (activeFilter === name) {
      onSelectSkill(null);
    } else {
      onSelectSkill(name);
      scrollToProjects();
    }
  };

  return (
    <section
      id="skills"
      style={{
        background: '#FFFFFF',
        padding: '48px 32px',
        borderTop: '1px solid #E6E4DF',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
          Tech Stack
        </div>
        <h2
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 36px)',
            margin: '0 0 12px',
            color: '#16181C',
          }}
        >
          Skills & Toolkit
        </h2>
        <p style={{ color: '#5C6167', fontSize: '15px', margin: '0 0 24px' }}>
          Click any skill to see related projects.
        </p>

        {activeFilter && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '14px', color: '#5C6167', fontWeight: 600 }}>Filtering by:</span>
            <span
              style={{
                background: '#E3F1FB',
                color: '#1B6FA8',
                border: '1px solid #1B6FA8',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              {activeFilter}
            </span>
            <button
              onClick={() => onSelectSkill(null)}
              style={{
                background: 'none',
                border: 'none',
                color: '#5C6167',
                textDecoration: 'underline',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Show all projects
            </button>
          </div>
        )}

        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E6E4DF',
            borderRadius: '10px',
            padding: '24px 28px',
            boxShadow: '0 1px 2px rgba(16,24,32,0.03), 0 8px 20px rgba(16,24,32,0.04)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          {skillList.map((skill, idx) => {
            const isSelected = activeFilter === skill.name;
            const skillId = skill.id || `s-${idx}`;
            return (
              <button
                key={skill.id || skill.name || idx}
                onClick={() => handleSkillClick(skill.name)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  fontSize: '13px',
                  fontWeight: 600,
                  padding: '7px 14px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  border: `1px solid ${isSelected ? '#1B6FA8' : '#E6E4DF'}`,
                  background: isSelected ? '#E3F1FB' : '#FFFFFF',
                  color: isSelected ? '#1B6FA8' : '#5C6167',
                  transition: 'all 0.2s ease',
                }}
              >
                {skill.icon ? (
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      objectFit: 'contain',
                      background: '#FFFFFF',
                      border: '1px solid #D5D9DE',
                      padding: '2px',
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: isSelected ? '#1B6FA8' : '#EAF2F8',
                      color: isSelected ? '#FFFFFF' : '#1B6FA8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 700,
                      fontFamily: "'JetBrains Mono', monospace",
                      flexShrink: 0,
                    }}
                  >
                    {skill.name.charAt(0).toUpperCase()}
                  </div>
                )}
                {skill.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
