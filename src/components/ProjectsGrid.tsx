import React, { useState, useMemo } from 'react';

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
  const [archiveDrawerOpen, setArchiveDrawerOpen] = useState(false);
  const [isExpandedOnPage, setIsExpandedOnPage] = useState(false);
  const [archiveSearch, setArchiveSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  React.useEffect(() => {
    if (activeProject || archiveDrawerOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [activeProject, archiveDrawerOpen]);

  // Sort items when a skill filter is active
  const sortedItems = useMemo(() => {
    if (!activeFilter) return items;
    return [...items].sort((a, b) => {
      const aMatches = (a.tags || []).some(t => t.toLowerCase() === activeFilter.toLowerCase());
      const bMatches = (b.tags || []).some(t => t.toLowerCase() === activeFilter.toLowerCase());
      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      return 0;
    });
  }, [items, activeFilter]);

  // Extract unique categories for drawer filtering
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach(item => {
      if (item.category) set.add(item.category);
    });
    return ['All', ...Array.from(set)];
  }, [items]);

  // Filtered items for archive drawer
  const filteredArchiveItems = useMemo(() => {
    return sortedItems.filter(proj => {
      const matchesCat = selectedCategory === 'All' || proj.category === selectedCategory;
      const matchesSearch =
        !archiveSearch.trim() ||
        proj.title.toLowerCase().includes(archiveSearch.toLowerCase()) ||
        proj.teaser.toLowerCase().includes(archiveSearch.toLowerCase()) ||
        (proj.tags || []).some(t => t.toLowerCase().includes(archiveSearch.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [sortedItems, selectedCategory, archiveSearch]);

  const hasMoreThanLimit = sortedItems.length > 3;

  const renderCard = (proj: ProjectData, isSkillMatched?: boolean, maxTagsToShow = 4) => {
    const hasDemo = Boolean(proj.demoUrl && proj.demoUrl.trim());
    const hasGithub = Boolean(proj.githubUrl && proj.githubUrl.trim());
    const tags = proj.tags || [];
    const visibleTags = tags.slice(0, maxTagsToShow);
    const hiddenTagCount = tags.length - visibleTags.length;

    return (
      <div
        key={proj.id}
        onClick={() => setActiveProject(proj)}
        style={{
          background: '#FFFFFF',
          border: isSkillMatched ? '2px solid #1B6FA8' : '1px solid #E6E4DF',
          borderRadius: '12px',
          overflow: 'hidden',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: isSkillMatched
            ? '0 6px 24px rgba(27,111,168,0.22)'
            : '0 2px 4px rgba(16,24,32,0.04), 0 10px 24px rgba(16,24,32,0.05)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
          position: 'relative',
          height: '100%',
        }}
      >
        {isSkillMatched && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: '#1B6FA8',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '12px',
              zIndex: 3,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            ★ Skill Matched
          </div>
        )}

        {/* Thumbnail Image Container with Aspect Ratio Protection */}
        <div
          style={{
            width: '100%',
            height: '200px',
            minHeight: '200px',
            maxHeight: '200px',
            overflow: 'hidden',
            background: '#0F2036',
            position: 'relative',
            borderBottom: '1px solid #E6E4DF',
          }}
        >
          {proj.thumbnail ? (
            <img
              src={proj.thumbnail}
              alt={proj.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
                display: 'block',
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #0F2036 0%, #1B6FA8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: '15px',
                padding: '16px',
                textAlign: 'center',
              }}
            >
              {proj.title}
            </div>
          )}
        </div>

        {/* Card Body */}
        <div
          style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: '17px',
                lineHeight: 1.35,
                margin: 0,
                color: '#16181C',
              }}
            >
              {proj.title}
            </h3>
            <p
              style={{
                color: '#4A5568',
                fontSize: '13.5px',
                lineHeight: 1.55,
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {proj.teaser}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '4px' }}>
            {/* Tags with Uniform Badge Dimensions & Wrap */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                alignItems: 'center',
                minHeight: '28px',
              }}
            >
              {visibleTags.map((tag, idx) => {
                const isMatchingTag =
                  activeFilter && tag.toLowerCase() === activeFilter.toLowerCase();
                return (
                  <span
                    key={idx}
                    style={{
                      fontSize: '11px',
                      lineHeight: '1.2',
                      color: isMatchingTag ? '#1B6FA8' : '#4A5568',
                      border: `1px solid ${isMatchingTag ? '#1B6FA8' : '#E2E8F0'}`,
                      background: isMatchingTag ? '#E3F1FB' : '#F8FAFC',
                      fontWeight: isMatchingTag ? 700 : 500,
                      padding: '3px 10px',
                      borderRadius: '20px',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
              {hiddenTagCount > 0 && (
                <span
                  style={{
                    fontSize: '11px',
                    lineHeight: '1.2',
                    color: '#1B6FA8',
                    background: '#E3F1FB',
                    fontWeight: 600,
                    padding: '3px 9px',
                    borderRadius: '20px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  +{hiddenTagCount} more
                </span>
              )}
            </div>

            {/* Action Buttons */}
            {(hasDemo || hasGithub) && (
              <div style={{ display: 'flex', gap: '8px', paddingTop: '4px' }}>
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
                      transition: 'background 0.2s ease',
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
                      background: '#F8FAFC',
                      color: '#16181C',
                      fontWeight: 600,
                      fontSize: '12px',
                      padding: '8px 0',
                      borderRadius: '6px',
                      border: '1px solid #E2E8F0',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="projects"
      style={{
        background: '#FFFFFF',
        padding: '36px 32px 48px',
        borderTop: '1px solid #E6E4DF',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
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
                margin: 0,
                color: '#16181C',
              }}
            >
              Selected work
            </h2>
          </div>

          {items.length > 3 && (
            <button
              onClick={() => setArchiveDrawerOpen(true)}
              style={{
                background: '#E3F1FB',
                color: '#1B6FA8',
                fontWeight: 600,
                fontSize: '13px',
                padding: '9px 18px',
                borderRadius: '20px',
                border: '1px solid rgba(27,111,168,0.2)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Explore All Projects ({items.length})</span>
              <span>→</span>
            </button>
          )}
        </div>

        {/* Main Grid View with Peek Container Effect */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              maxHeight: isExpandedOnPage || !hasMoreThanLimit ? 'none' : '710px',
              overflow: isExpandedOnPage || !hasMoreThanLimit ? 'visible' : 'hidden',
              position: 'relative',
              transition: 'max-height 0.4s ease',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
              }}
            >
              {sortedItems.map(proj => {
                const isSkillMatched =
                  activeFilter &&
                  (proj.tags || []).some(t => t.toLowerCase() === activeFilter.toLowerCase());
                return renderCard(proj, Boolean(isSkillMatched));
              })}
            </div>
          </div>

          {/* Peek Overlay Cutoff Gradient & Action Trigger */}
          {hasMoreThanLimit && !isExpandedOnPage && (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '240px',
                background:
                  'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.88) 55%, #FFFFFF 95%)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: '20px',
                zIndex: 4,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  pointerEvents: 'auto',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  background: '#FFFFFF',
                  padding: '8px 12px',
                  borderRadius: '30px',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                  border: '1px solid #E6E4DF',
                }}
              >
                <button
                  onClick={() => setIsExpandedOnPage(true)}
                  style={{
                    background: '#F8FAFC',
                    color: '#334155',
                    fontWeight: 600,
                    fontSize: '13px',
                    padding: '10px 20px',
                    borderRadius: '20px',
                    border: '1px solid #CBD5E1',
                    cursor: 'pointer',
                  }}
                >
                  Show More Here ↓
                </button>
                <button
                  onClick={() => setArchiveDrawerOpen(true)}
                  style={{
                    background: '#1B6FA8',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '13px',
                    padding: '10px 22px',
                    borderRadius: '20px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(27, 111, 168, 0.35)',
                  }}
                >
                  View All Projects Archive ({items.length}) →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FULL PROJECT ARCHIVE DRAWER / MODAL */}
      {archiveDrawerOpen && (
        <div
          onClick={() => setArchiveDrawerOpen(false)}
          onWheel={e => e.stopPropagation()}
          data-lenis-prevent
          data-lenis-prevent-wheel
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 120,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            onWheel={e => e.stopPropagation()}
            data-lenis-prevent
            data-lenis-prevent-wheel
            style={{
              width: '100%',
              maxWidth: '920px',
              height: '100vh',
              background: '#F8FAFC',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              animation: 'slideInRight 0.3s ease forwards',
            }}
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: '24px 32px',
                background: '#FFFFFF',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '1.2px',
                    color: '#1B6FA8',
                    textTransform: 'uppercase',
                  }}
                >
                  Complete Archive
                </div>
                <h2
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    fontSize: '22px',
                    margin: '4px 0 0',
                    color: '#0F172A',
                  }}
                >
                  All Projects ({items.length})
                </h2>
              </div>
              <button
                onClick={() => setArchiveDrawerOpen(false)}
                style={{
                  background: '#F1F5F9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  fontSize: '18px',
                  color: '#64748B',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div
              style={{
                padding: '16px 32px',
                background: '#FFFFFF',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <input
                type="text"
                placeholder="Search projects by title, tech stack, or keyword..."
                value={archiveSearch}
                onChange={e => setArchiveSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '14px',
                  outline: 'none',
                  background: '#F8FAFC',
                }}
              />
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {categories.map((cat, idx) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        background: isActive ? '#1B6FA8' : '#F1F5F9',
                        color: isActive ? '#FFFFFF' : '#475569',
                        fontSize: '12px',
                        fontWeight: 600,
                        padding: '5px 14px',
                        borderRadius: '20px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drawer Body - Project Cards Grid */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '32px',
              }}
            >
              {filteredArchiveItems.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    color: '#64748B',
                  }}
                >
                  <p style={{ fontSize: '16px', fontWeight: 600 }}>No projects found</p>
                  <p style={{ fontSize: '13px' }}>Try adjusting your search or category filter.</p>
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '20px',
                  }}
                >
                  {filteredArchiveItems.map(proj => {
                    const isSkillMatched =
                      activeFilter &&
                      (proj.tags || []).some(t => t.toLowerCase() === activeFilter.toLowerCase());
                    return renderCard(proj, Boolean(isSkillMatched), 6);
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CASE STUDY DETAIL MODAL */}
      {activeProject && (
        <div
          onClick={() => setActiveProject(null)}
          onWheel={e => e.stopPropagation()}
          data-lenis-prevent
          data-lenis-prevent-wheel
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 150,
            background: 'rgba(15,23,42,0.65)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            onWheel={e => e.stopPropagation()}
            data-lenis-prevent
            data-lenis-prevent-wheel
            style={{
              background: '#FFFFFF',
              border: '1px solid #E6E4DF',
              borderRadius: '14px',
              maxWidth: '780px',
              width: '100%',
              maxHeight: '88vh',
              overflowY: 'auto',
              padding: '40px',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(16,24,32,0.25)',
            }}
          >
            <button
              onClick={() => setActiveProject(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#F1F5F9',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: '#64748B',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
                  height: '280px',
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
                <p
                  style={{
                    color: '#3E4349',
                    fontSize: '14px',
                    lineHeight: 1.7,
                    margin: '0 0 20px',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {activeProject.problem}
                </p>
              </>
            )}

            {activeProject.solution && (
              <>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#1B6FA8', marginBottom: '8px' }}>
                  Solution & Architecture
                </div>
                <p
                  style={{
                    color: '#3E4349',
                    fontSize: '14px',
                    lineHeight: 1.7,
                    margin: '0 0 24px',
                    whiteSpace: 'pre-wrap',
                  }}
                >
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
                    color: '#475569',
                    border: '1px solid #CBD5E1',
                    background: '#F8FAFC',
                    padding: '4px 12px',
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

