import React, { useState } from 'react';
import { HeaderNav } from '../HeaderNav';
import { AboutModal } from '../AboutModal';
import type { BioData } from '../AboutModal';
import { SkillsMatrix } from '../SkillsMatrix';
import type { SkillItem } from '../SkillsMatrix';
import { ExperienceTimeline } from '../ExperienceTimeline';
import type { ExperienceData } from '../ExperienceTimeline';
import { ProjectsGrid } from '../ProjectsGrid';
import type { ProjectData } from '../ProjectsGrid';
import { BlogsPreview } from '../BlogsPreview';
import type { BlogItem } from '../BlogsPreview';
import { ContactSection } from '../ContactSection';

import { AdminFloatingBar } from './AdminFloatingBar';
import { SectionAdminHeader } from './SectionAdminHeader';
import { ToastNotification } from './ToastNotification';
import { ExperienceFormModal } from './ExperienceFormModal';
import type { ExperienceFormValues } from './ExperienceFormModal';
import { EducationFormModal } from './EducationFormModal';
import type { EducationFormValues } from './EducationFormModal';
import { ProjectFormModal } from './ProjectFormModal';
import type { ProjectFormValues } from './ProjectFormModal';
import { SkillFormModal } from './SkillFormModal';
import type { SkillFormValues } from './SkillFormModal';
import { ReorderModal } from './ReorderModal';
import type { ReorderItem } from './ReorderModal';

interface AdminPortfolioAppProps {
  initialExperienceItems: ExperienceData[];
  initialProjectItems: ProjectData[];
  initialBlogItems: BlogItem[];
  initialBioData?: BioData;
  initialSkillsData?: SkillItem[];
  initialContactData?: any;
}

export const AdminPortfolioApp: React.FC<AdminPortfolioAppProps> = ({
  initialExperienceItems = [],
  initialProjectItems = [],
  initialBlogItems = [],
  initialBioData,
  initialSkillsData = [],
  initialContactData,
}) => {
  // State Data
  const [experienceList, setExperienceList] = useState<ExperienceData[]>(initialExperienceItems);
  const [projectsList, setProjectsList] = useState<ProjectData[]>(initialProjectItems);
  const [skillsList, setSkillsList] = useState<SkillItem[]>(initialSkillsData);
  const [bio, setBio] = useState<BioData | undefined>(initialBioData);

  // Admin State
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Section Visibilities
  const [sectionVisibilities, setSectionVisibilities] = useState({
    skills: true,
    experience: true,
    projects: true,
    blog: true,
  });

  // Modal Control States
  const [expModalOpen, setExpModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<ExperienceFormValues | null>(null);

  const [eduModalOpen, setEduModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<EducationFormValues | null>(null);

  const [projModalOpen, setProjModalOpen] = useState(false);
  const [editingProj, setEditingProj] = useState<ProjectFormValues | null>(null);

  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillFormValues | null>(null);

  const [reorderTarget, setReorderTarget] = useState<'experience' | 'projects' | 'skills' | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const availableSkillNames = skillsList.map(s => s.name);

  // ----------------------------------------------------
  // EXPERIENCE HANDLERS
  // ----------------------------------------------------
  const handleSaveExperience = async (values: ExperienceFormValues) => {
    try {
      const res = await fetch('/api/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok && data.experience) {
        setExperienceList(data.experience);
        showToast('Experience successfully saved to portfolio!');
      } else {
        alert(data.error || 'Failed to save experience');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving experience');
    }
  };

  const handleDeleteExperience = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this experience record?')) return;
    try {
      const res = await fetch(`/api/experience?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.experience) {
        setExperienceList(data.experience);
        showToast('Experience deleted');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------------------------------------------
  // PROJECT HANDLERS
  // ----------------------------------------------------
  const handleSaveProject = async (values: ProjectFormValues) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok && data.projects) {
        setProjectsList(data.projects);
        showToast('Project successfully saved!');
      } else {
        alert(data.error || 'Failed to save project');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving project');
    }
  };

  const handleDeleteProject = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.projects) {
        setProjectsList(data.projects);
        showToast('Project deleted');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------------------------------------------
  // SKILL HANDLERS
  // ----------------------------------------------------
  const handleSaveSkill = async (values: SkillFormValues) => {
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok && data.skills) {
        setSkillsList(data.skills);
        showToast('Skill tag saved!');
      } else {
        alert(data.error || 'Failed to save skill');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving skill');
    }
  };

  const handleDeleteSkill = async (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`Are you sure you want to delete "${name}" skill tag?`)) return;
    try {
      const res = await fetch(`/api/skills?name=${encodeURIComponent(name)}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.skills) {
        setSkillsList(data.skills);
        showToast('Skill deleted');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------------------------------------------
  // EDUCATION HANDLERS
  // ----------------------------------------------------
  const handleSaveEducation = async (values: EducationFormValues) => {
    try {
      const updatedBio = {
        ...bio,
        education: {
          degree: values.degree,
          university: values.university,
          dates: values.dates,
          logo: values.logo,
        },
      };

      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBio),
      });
      const data = await res.json();
      if (res.ok && data.bio) {
        setBio(data.bio);
        showToast('Education details updated successfully!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------------------------------------------
  // REORDER HANDLER
  // ----------------------------------------------------
  const handleSaveReorder = async (reordered: ReorderItem[]) => {
    if (!reorderTarget) return;

    try {
      if (reorderTarget === 'experience') {
        const res = await fetch('/api/experience', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reorder: reordered }),
        });
        const data = await res.json();
        if (res.ok && data.experience) setExperienceList(data.experience);
      } else if (reorderTarget === 'projects') {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reorder: reordered }),
        });
        const data = await res.json();
        if (res.ok && data.projects) setProjectsList(data.projects);
      } else if (reorderTarget === 'skills') {
        const res = await fetch('/api/skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reorder: reordered }),
        });
        const data = await res.json();
        if (res.ok && data.skills) setSkillsList(data.skills);
      }
      showToast(`${reorderTarget.toUpperCase()} sequence updated!`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ position: 'relative', zIndex: 1, paddingBottom: '90px' }}>
      <HeaderNav avatar={bio?.avatar} initials={bio?.initials} name={bio?.name} />

      {/* Hero Section */}
      <section
        id="home"
        style={{
          minHeight: '65vh',
          display: 'flex',
          alignItems: 'center',
          padding: '40px 56px 60px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(105deg, #FFFFFF 0%, #FFFFFF 34%, rgba(255,255,255,0.75) 52%, rgba(255,255,255,0) 72%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', textAlign: 'left' }}>
          <h1
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: 'clamp(32px, 5vw, 54px)',
              lineHeight: 1.35,
              margin: '0 0 26px',
              color: '#16181C',
            }}
          >
            Spatial thinking, engineered.
          </h1>
          <p style={{ color: '#3E4349', fontSize: '17px', lineHeight: 1.75, margin: '0 0 36px' }}>
            Welcome. I'm Haseef — a GIS developer and spatial data analyst who enjoys turning raw
            geographic data into tools people can actually use. I build WebGIS platforms, automate
            spatial workflows, and dig into geospatial datasets to find patterns worth acting on.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setAboutOpen(true)}
              style={{
                background: '#1B6FA8',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '15px',
                padding: '14px 30px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(27, 111, 168, 0.3)',
              }}
            >
              About Me & Education
            </button>
            {!isPreviewMode && (
              <button
                onClick={() => {
                  setEditingEdu({
                    degree: bio?.education?.degree || '',
                    university: bio?.education?.university || '',
                    dates: bio?.education?.dates || '',
                    logo: bio?.education?.logo || '',
                  });
                  setEduModalOpen(true);
                }}
                style={{
                  background: '#0F2036',
                  color: '#5FA8D3',
                  fontWeight: 600,
                  fontSize: '14px',
                  padding: '14px 22px',
                  borderRadius: '6px',
                  border: '1px solid #1C3A57',
                  cursor: 'pointer',
                }}
              >
                ✏️ Edit Education Form
              </button>
            )}
          </div>
        </div>
      </section>

      <div style={{ height: '80px' }} />

      {/* SKILLS SECTION WITH IN-CONTEXT CONTROLS */}
      {(sectionVisibilities.skills || !isPreviewMode) && (
        <section
          id="skills"
          style={{
            background: '#FFFFFF',
            padding: '48px 32px',
            borderTop: '1px solid #E6E4DF',
            position: 'relative',
            opacity: !sectionVisibilities.skills && !isPreviewMode ? 0.6 : 1,
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <SectionAdminHeader
              sectionLabel="Tech Stack"
              sectionTitle="Skills & Toolkit"
              isSectionVisible={sectionVisibilities.skills}
              isPreviewMode={isPreviewMode}
              onToggleSectionVisibility={() =>
                setSectionVisibilities(prev => ({ ...prev, skills: !prev.skills }))
              }
              onAddNewItem={() => {
                setEditingSkill(null);
                setSkillModalOpen(true);
              }}
              onOpenReorder={() => setReorderTarget('skills')}
            />

            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #E6E4DF',
                borderRadius: '12px',
                padding: '32px 36px',
                boxShadow: '0 1px 2px rgba(16,24,32,0.03), 0 8px 20px rgba(16,24,32,0.04)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
              }}
            >
              {skillsList.map((skill, idx) => (
                <div
                  key={skill.id || skill.name || idx}
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '16px',
                      fontWeight: 600,
                      padding: '11px 22px',
                      borderRadius: '36px',
                      border: '1.5px solid #D5D9DE',
                      background: '#FFFFFF',
                      color: '#2D3136',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                  >
                    {skill.icon ? (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          objectFit: 'contain',
                          background: '#FFFFFF',
                          border: '1.5px solid #D5D9DE',
                          padding: '3px',
                          flexShrink: 0,
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          background: '#EAF2F8',
                          color: '#1B6FA8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '15px',
                          fontWeight: 700,
                          fontFamily: "'JetBrains Mono', monospace",
                          flexShrink: 0,
                        }}
                      >
                        {skill.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {skill.name}
                  </div>

                  {/* Skill Item Admin Controls */}
                  {!isPreviewMode && (
                    <div
                      style={{
                        display: 'flex',
                        gap: '4px',
                        marginLeft: '6px',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSkill({
                            name: skill.name,
                            category: skill.category,
                            icon: skill.icon,
                          });
                          setSkillModalOpen(true);
                        }}
                        style={{
                          background: '#E3F1FB',
                          color: '#1B6FA8',
                          border: '1px solid #1B6FA8',
                          borderRadius: '50%',
                          width: '26px',
                          height: '26px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        title="Edit Skill Tag"
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        onClick={e => handleDeleteSkill(skill.name, e)}
                        style={{
                          background: '#FFEBEE',
                          color: '#D32F2F',
                          border: '1px solid #D32F2F',
                          borderRadius: '50%',
                          width: '26px',
                          height: '26px',
                          fontSize: '11px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        title="Delete Skill Tag"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div style={{ height: '80px' }} />

      {/* EXPERIENCE SECTION WITH IN-CONTEXT CONTROLS */}
      {(sectionVisibilities.experience || !isPreviewMode) && (
        <section
          id="experience"
          style={{
            background: '#F7F6F3',
            padding: '48px 32px',
            borderTop: '1px solid #E6E4DF',
            position: 'relative',
            opacity: !sectionVisibilities.experience && !isPreviewMode ? 0.6 : 1,
          }}
        >
          <div style={{ maxWidth: '920px', margin: '0 auto' }}>
            <SectionAdminHeader
              sectionLabel="Experience"
              sectionTitle="Where I've worked"
              isSectionVisible={sectionVisibilities.experience}
              isPreviewMode={isPreviewMode}
              onToggleSectionVisibility={() =>
                setSectionVisibilities(prev => ({ ...prev, experience: !prev.experience }))
              }
              onAddNewItem={() => {
                setEditingExp(null);
                setExpModalOpen(true);
              }}
              onOpenReorder={() => setReorderTarget('experience')}
            />

            <div
              style={{
                position: 'relative',
                paddingLeft: '24px',
                borderLeft: '2px solid #E6E4DF',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {experienceList.map(job => {
                const displayDates =
                  job.dates || (job.startDate ? `${job.startDate} — ${job.endDate || 'Present'}` : '');
                const companyInitial = job.company
                  ? job.company.charAt(0).toUpperCase()
                  : job.title.charAt(0).toUpperCase();

                return (
                  <div
                    key={job.id}
                    style={{
                      position: 'relative',
                      background: '#FFFFFF',
                      border: '1px solid #E6E4DF',
                      borderRadius: '10px',
                      padding: '20px 24px',
                      boxShadow: '0 1px 2px rgba(16,24,32,0.03), 0 8px 20px rgba(16,24,32,0.04)',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        left: '-31px',
                        top: '26px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: '#1B6FA8',
                      }}
                    />

                    {/* Item Admin Action Bar */}
                    {!isPreviewMode && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          display: 'flex',
                          gap: '6px',
                          zIndex: 2,
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setEditingExp(job);
                            setExpModalOpen(true);
                          }}
                          style={{
                            background: '#1B6FA8',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '4px 10px',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          type="button"
                          onClick={e => handleDeleteExperience(job.id, e)}
                          style={{
                            background: '#FFEBEE',
                            color: '#D32F2F',
                            border: '1px solid #D32F2F',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '12px',
                        marginBottom: '10px',
                        paddingRight: !isPreviewMode ? '120px' : '0',
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
                            {job.company}
                            {job.location ? ` · ${job.location}` : ''} {job.type ? ` (${job.type})` : ''}
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
        </section>
      )}

      <div style={{ height: '80px' }} />

      {/* PROJECTS SECTION WITH IN-CONTEXT CONTROLS */}
      {(sectionVisibilities.projects || !isPreviewMode) && (
        <section
          id="projects"
          style={{
            background: '#FFFFFF',
            padding: '48px 32px',
            borderTop: '1px solid #E6E4DF',
            position: 'relative',
            opacity: !sectionVisibilities.projects && !isPreviewMode ? 0.6 : 1,
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <SectionAdminHeader
              sectionLabel="Projects"
              sectionTitle="Selected work"
              isSectionVisible={sectionVisibilities.projects}
              isPreviewMode={isPreviewMode}
              onToggleSectionVisibility={() =>
                setSectionVisibilities(prev => ({ ...prev, projects: !prev.projects }))
              }
              onAddNewItem={() => {
                setEditingProj(null);
                setProjModalOpen(true);
              }}
              onOpenReorder={() => setReorderTarget('projects')}
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
              }}
            >
              {projectsList.map(proj => (
                <div
                  key={proj.id}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E6E4DF',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 1px 2px rgba(16,24,32,0.03), 0 8px 20px rgba(16,24,32,0.04)',
                    position: 'relative',
                  }}
                >
                  {/* Item Admin Action Buttons */}
                  {!isPreviewMode && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 10,
                        display: 'flex',
                        gap: '6px',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProj(proj);
                          setProjModalOpen(true);
                        }}
                        style={{
                          background: '#0F2036',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '5px 10px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        }}
                      >
                        ✏️ Edit Project
                      </button>
                      <button
                        type="button"
                        onClick={e => handleDeleteProject(proj.id, e)}
                        style={{
                          background: '#D32F2F',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '5px 8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  )}

                  {proj.thumbnail ? (
                    <img
                      src={proj.thumbnail}
                      alt={proj.title}
                      style={{
                        width: '100%',
                        height: '180px',
                        objectFit: 'cover',
                        borderBottom: '1px solid #E6E4DF',
                      }}
                    />
                  ) : (
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
                  )}

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
                      {(proj.tags || []).map((tag, idx) => (
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blogs Preview */}
      <div style={{ height: '80px' }} />
      <BlogsPreview posts={initialBlogItems} />

      {/* Contact Section & Footer */}
      <div style={{ height: '80px' }} />
      <ContactSection data={initialContactData} />

      {/* About & Education Modal */}
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} bioData={bio} />

      {/* PINNED GLOBAL ADMINISTRATIVE FLOATING BAR */}
      <AdminFloatingBar
        isPreviewMode={isPreviewMode}
        onTogglePreviewMode={() => setIsPreviewMode(!isPreviewMode)}
        onAddExperience={() => {
          setEditingExp(null);
          setExpModalOpen(true);
        }}
        onAddProject={() => {
          setEditingProj(null);
          setProjModalOpen(true);
        }}
        onAddSkill={() => {
          setEditingSkill(null);
          setSkillModalOpen(true);
        }}
        onEditEducation={() => {
          setEditingEdu({
            degree: bio?.education?.degree || '',
            university: bio?.education?.university || '',
            dates: bio?.education?.dates || '',
            logo: bio?.education?.logo || '',
          });
          setEduModalOpen(true);
        }}
      />

      {/* TOAST NOTIFICATION */}
      <ToastNotification message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* FORM MODALS */}
      <ExperienceFormModal
        isOpen={expModalOpen}
        initialValues={editingExp}
        availableSkills={availableSkillNames}
        onSave={handleSaveExperience}
        onClose={() => setExpModalOpen(false)}
      />

      <EducationFormModal
        isOpen={eduModalOpen}
        initialValues={editingEdu}
        availableSkills={availableSkillNames}
        onSave={handleSaveEducation}
        onClose={() => setEduModalOpen(false)}
      />

      <ProjectFormModal
        isOpen={projModalOpen}
        initialValues={editingProj}
        availableSkills={availableSkillNames}
        onSave={handleSaveProject}
        onClose={() => setProjModalOpen(false)}
      />

      <SkillFormModal
        isOpen={skillModalOpen}
        initialValues={editingSkill}
        onSave={handleSaveSkill}
        onClose={() => setSkillModalOpen(false)}
      />

      {/* REORDER MODAL */}
      <ReorderModal
        isOpen={Boolean(reorderTarget)}
        title={
          reorderTarget === 'experience'
            ? 'Reorder Experience'
            : reorderTarget === 'projects'
            ? 'Reorder Projects'
            : 'Reorder Skills'
        }
        items={
          reorderTarget === 'experience'
            ? experienceList
            : reorderTarget === 'projects'
            ? (projectsList as any)
            : (skillsList as any)
        }
        onSave={handleSaveReorder}
        onClose={() => setReorderTarget(null)}
      />
    </div>
  );
};
