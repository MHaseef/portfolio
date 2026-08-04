import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeaderNav } from './HeaderNav';
import { AboutModal } from './AboutModal';
import { SkillsMatrix } from './SkillsMatrix';
import { ExperienceTimeline } from './ExperienceTimeline';
import type { ExperienceData } from './ExperienceTimeline';
import { ProjectsGrid } from './ProjectsGrid';
import type { ProjectData } from './ProjectsGrid';
import { BlogsPreview } from './BlogsPreview';
import type { BlogItem } from './BlogsPreview';
import { ContactSection } from './ContactSection';

interface MainPortfolioAppProps {
  experienceItems: ExperienceData[];
  projectItems: ProjectData[];
  blogItems: BlogItem[];
}

export const MainPortfolioApp: React.FC<MainPortfolioAppProps> = ({
  experienceItems,
  projectItems,
  blogItems,
}) => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <HeaderNav />

      {/* Hero Section */}
      <section
        id="home"
        style={{
          minHeight: '68vh',
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 1, maxWidth: '600px', textAlign: 'left' }}
        >
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
              transition: 'background 0.2s ease',
            }}
          >
            About Me
          </button>
        </motion.div>
      </section>

      <div style={{ height: '110px', background: 'transparent' }} />

      {/* Skills Matrix */}
      <SkillsMatrix activeFilter={activeFilter} onSelectSkill={setActiveFilter} />

      <div style={{ height: '110px', background: 'transparent' }} />

      {/* Experience Timeline */}
      <ExperienceTimeline items={experienceItems} />

      <div style={{ height: '110px', background: 'transparent' }} />

      {/* Projects Grid */}
      <ProjectsGrid items={projectItems} activeFilter={activeFilter} />

      <div style={{ height: '110px', background: 'transparent' }} />

      {/* Blog Preview */}
      <BlogsPreview posts={blogItems} />

      <div style={{ height: '110px', background: 'transparent' }} />

      {/* Contact & Footer */}
      <ContactSection />

      {/* About Modal */}
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
};
