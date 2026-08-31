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

  // When a skill filter is active, bring matching projects to the front instead of hiding others
  const sortedItems = activeFilter
    ? [...items].sort((a, b) => {
        const aMatches = (a.tags || []).some(t => t.toLowerCase() === activeFilter.toLowerCase());
        const bMatches = (b.tags || []).some(t => t.toLowerCase() === activeFilter.toLowerCase());
        if (aMatches && !bMatches) return -1;
        if (!aMatches && bMatches) return 1;
        return 0;
      })
    : items;

  return (
    <section
      id="projects"
      style={{
        background: '#FFFFFF',
        padding: '36px 32px',
        borderTop: '1px solid #E6E4DF',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            color: '#1B6FA8',
            textTransform: 'uppercase',
            marginBottom: '6px',
          }}
        >
          Projects
        </div>
        <h2
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: 'clamp(26px, 3.5vw, 32px)',
            margin: '0 0 20px',
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
          {sortedItems.map(proj => {
            const isSkillMatched =
              activeFilter && (proj.tags || []).some(t => t.toLowerCase() === activeFilter.toLowerCase());
            const hasDemo = Boolean(proj.demoUrl && proj.demoUrl.trim());
            const hasGithub = Boolean(proj.githubUrl && proj.githubUrl.trim());

            return (
              <div
                key={proj.id}
                onClick={() => setActiveProject(proj)}
                style={{
                  background: '#FFFFFF',
                  border: isSkillMatched ? '2px solid #1B6FA8' : '1px solid #E6E4DF',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: isSkillMatched
                    ? '0 4px 20px rgba(27,111,168,0.2)'
                    : '0 1px 2px rgba(16,24,32,0.03), 0 8px 20px rgba(16,24,32,0.04)',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
              >
                {isSkillMatched && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: '#1B6FA8',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '12px',
                      zIndex: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    }}
                  >
                    ★ Skill Matched
                  </div>
                )}
                {proj.thumbnail ? (
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    style={{
                      width: '100%',
                      height: '210px',
                      objectFit: 'cover',
                      borderBottom: '1px solid #E6E4DF',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '160px',
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
                )}

                <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 700,
                      fontSize: '18px',
                      color: '#16181C',
                    }}
                  >
                    {proj.title}
                  </div>
                  <div style={{ color: '#5C6167', fontSize: '14px', lineHeight: 1.55, flex: 1 }}>
                    {proj.teaser}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {(proj.tags || []).map((tag, idx) => {
                      const isMatchingTag =
                        activeFilter && tag.toLowerCase() === activeFilter.toLowerCase();
                      return (
                        <span
                          key={idx}
                          style={{
                            fontSize: '11px',
                            color: isMatchingTag ? '#1B6FA8' : '#5C6167',
                            border: `1px solid ${isMatchingTag ? '#1B6FA8' : '#E6E4DF'}`,
                            background: isMatchingTag ? '#E3F1FB' : 'transparent',
                            fontWeight: isMatchingTag ? 700 : 500,
                            padding: '2px 9px',
                            borderRadius: '20px',
                          }}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>

                  {(hasDemo || hasGithub) && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                      {hasDemo && (
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
                      {hasGithub && (
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
                  )}
                </div>
              </div>
            );
          })}
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

            {activeProject.thumbnail ? (
              <img
                src={activeProject.thumbnail}
                alt={activeProject.title}
                style={{
                  width: '100%',
                  height: '260px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                  marginBottom: '24px',
                  border: '1px solid #E6E4DF',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '200px',
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
            )}

            {activeProject.problem && (
              <>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#1B6FA8', marginBottom: '8px' }}>
                  Problem
                </div>
                <p style={{ color: '#3E4349', fontSize: '14px', lineHeight: 1.7, margin: '0 0 20px', whiteSpace: 'pre-wrap' }}>
                  {activeProject.problem}
                </p>
              </>
            )}

            {activeProject.solution && (
              <>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#1B6FA8', marginBottom: '8px' }}>
                  Solution & Architecture
                </div>
                <p style={{ color: '#3E4349', fontSize: '14px', lineHeight: 1.7, margin: '0 0 24px', whiteSpace: 'pre-wrap' }}>
                  {activeProject.solution}
                </p>
              </>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              {(activeProject.tags || []).map((tag, idx) => (
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

            {Boolean(
              (activeProject.demoUrl && activeProject.demoUrl.trim()) ||
                (activeProject.githubUrl && activeProject.githubUrl.trim())
            ) && (
              <div style={{ display: 'flex', gap: '12px' }}>
                {Boolean(activeProject.demoUrl && activeProject.demoUrl.trim()) && (
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
                {Boolean(activeProject.githubUrl && activeProject.githubUrl.trim()) && (
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
            )}
          </div>
        </div>
      )}
    </section>
  );
};
