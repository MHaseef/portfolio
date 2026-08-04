import React, { useState } from 'react';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  tags: string[];
  teaser: string;
  problem: string;
  solution: string;
  demoUrl?: string;
  githubUrl?: string;
  thumbnail?: string;
}

interface ProjectsGridProps {
  items: ProjectData[];
  activeFilter: string | null;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ items, activeFilter }) => {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);

  const filteredItems = activeFilter
    ? items.filter(p => (p.tags || []).includes(activeFilter))
    : items;

  return (
    <section
      id="projects"
      style={{
        background: '#FFFFFF',
        padding: '48px 32px',
        borderTop: '1px solid #E6E4DF',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
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
          Projects
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
          Selected work
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {filteredItems.map(proj => (
            <div
              key={proj.id}
              onClick={() => setActiveProject(proj)}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E6E4DF',
                borderRadius: '10px',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 1px 2px rgba(16,24,32,0.03), 0 8px 20px rgba(16,24,32,0.04)',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '140px',
                  background: 'linear-gradient(135deg, #0F2036 0%, #1B6FA8 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: '16px',
                  padding: '16px',
                  textAlign: 'center',
                }}
              >
                {proj.title}
              </div>

              <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                    fontSize: '16px',
                    color: '#16181C',
                  }}
                >
                  {proj.title}
                </div>
                <div style={{ color: '#5C6167', fontSize: '13px', lineHeight: 1.5, flex: 1 }}>
                  {proj.teaser}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {proj.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '11px',
                        color: '#5C6167',
                        border: '1px solid #E6E4DF',
                        padding: '2px 9px',
                        borderRadius: '20px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        background: '#1B6FA8',
                        color: '#FFFFFF',
                        fontWeight: 600,
                        fontSize: '12px',
                        padding: '8px 0',
                        borderRadius: '6px',
                        textDecoration: 'none',
                      }}
                    >
                      Live Demo
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        background: 'transparent',
                        color: '#16181C',
                        fontWeight: 600,
                        fontSize: '12px',
                        padding: '8px 0',
                        borderRadius: '6px',
                        border: '1px solid #E6E4DF',
                        textDecoration: 'none',
                      }}
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeProject && (
        <div
          onClick={() => setActiveProject(null)}
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
              maxWidth: '760px',
              width: '100%',
              maxHeight: '88vh',
              overflowY: 'auto',
              padding: '40px',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(16,24,32,0.2)',
            }}
          >
            <button
              onClick={() => setActiveProject(null)}
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
                fontSize: '24px',
                marginBottom: '18px',
                color: '#16181C',
              }}
            >
              {activeProject.title}
            </div>

            <div
              style={{
                width: '100%',
                height: '240px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0F2036 0%, #1B6FA8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '20px',
                fontWeight: 700,
                marginBottom: '24px',
              }}
            >
              {activeProject.title} — Case Study Architecture
            </div>

            <div style={{ fontWeight: 700, fontSize: '14px', color: '#1B6FA8', marginBottom: '8px' }}>
              Problem
            </div>
            <p style={{ color: '#3E4349', fontSize: '14px', lineHeight: 1.7, margin: '0 0 20px' }}>
              {activeProject.problem}
            </p>

            <div style={{ fontWeight: 700, fontSize: '14px', color: '#1B6FA8', marginBottom: '8px' }}>
              Solution & Architecture
            </div>
            <p style={{ color: '#3E4349', fontSize: '14px', lineHeight: 1.7, margin: '0 0 24px' }}>
              {activeProject.solution}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              {activeProject.tags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '12px',
                    color: '#5C6167',
                    border: '1px solid #E6E4DF',
                    padding: '3px 10px',
                    borderRadius: '20px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              {activeProject.demoUrl && (
                <a
                  href={activeProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#1B6FA8',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '13px',
                    padding: '11px 24px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                  }}
                >
                  Live Demo
                </a>
              )}
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'transparent',
                    color: '#16181C',
                    fontWeight: 600,
                    fontSize: '13px',
                    padding: '11px 24px',
                    borderRadius: '6px',
                    border: '1px solid #E6E4DF',
                    textDecoration: 'none',
                  }}
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
