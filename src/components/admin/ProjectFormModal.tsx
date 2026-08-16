import React, { useState, useEffect } from 'react';
import { ImageUploadDropzone } from './ImageUploadDropzone';
import { SkillTagPicker } from './SkillTagPicker';

export interface ProjectFormValues {
  id?: string;
  title: string;
  category?: string;
  thumbnail?: string;
  mediaGallery?: string[];
  teaser?: string;
  problem?: string;
  solution?: string;
  demoUrl?: string;
  githubUrl?: string;
  tags?: string[];
  contributors?: string[];
  current?: boolean;
  startMonth?: string;
  startYear?: string;
  endMonth?: string;
  endYear?: string;
  dates?: string;
  is_published?: boolean;
}

interface ProjectFormModalProps {
  isOpen: boolean;
  initialValues?: ProjectFormValues | null;
  availableSkills?: string[];
  onSave: (values: ProjectFormValues) => Promise<void>;
  onClose: () => void;
}

const CATEGORIES = ['WebGIS', 'Spatial AI', 'Analytics', 'Tools', 'Remote Sensing'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const YEARS = Array.from({ length: 30 }, (_, i) => String(2026 - i));

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  isOpen,
  initialValues,
  availableSkills = [],
  onSave,
  onClose,
}) => {
  const [form, setForm] = useState<ProjectFormValues>({
    title: '',
    category: 'WebGIS',
    thumbnail: '',
    mediaGallery: [],
    teaser: '',
    problem: '',
    solution: '',
    demoUrl: '',
    githubUrl: '',
    tags: [],
    contributors: [],
    current: false,
    startMonth: 'Jan',
    startYear: '2024',
    endMonth: 'Dec',
    endYear: '2024',
    is_published: true,
  });

  const [saving, setSaving] = useState(false);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  useEffect(() => {
    if (initialValues) {
      setForm({
        id: initialValues.id,
        title: initialValues.title || '',
        category: initialValues.category || 'WebGIS',
        thumbnail: initialValues.thumbnail || '',
        mediaGallery: initialValues.mediaGallery || [],
        teaser: initialValues.teaser || '',
        problem: initialValues.problem || '',
        solution: initialValues.solution || '',
        demoUrl: initialValues.demoUrl || '',
        githubUrl: initialValues.githubUrl || '',
        tags: initialValues.tags || [],
        contributors: initialValues.contributors || [],
        current: initialValues.current || false,
        startMonth: initialValues.startMonth || 'Jan',
        startYear: initialValues.startYear || '2024',
        endMonth: initialValues.endMonth || 'Dec',
        endYear: initialValues.endYear || '2024',
        is_published: initialValues.is_published !== false,
      });
    } else {
      setForm({
        title: '',
        category: 'WebGIS',
        thumbnail: '',
        mediaGallery: [],
        teaser: '',
        problem: '',
        solution: '',
        demoUrl: '',
        githubUrl: '',
        tags: [],
        contributors: [],
        current: false,
        startMonth: 'Jan',
        startYear: '2024',
        endMonth: 'Dec',
        endYear: '2024',
        is_published: true,
      });
    }
  }, [initialValues, isOpen]);

  if (!isOpen) return null;

  const handleGalleryUpload = async (file: File) => {
    if (!file) return;
    if ((form.mediaGallery?.length || 0) >= 10) {
      alert('Maximum 10 media gallery photos allowed.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok && data.url) {
        setForm(prev => ({ ...prev, mediaGallery: [...(prev.mediaGallery || []), data.url] }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addGalleryUrl = () => {
    const trimmed = newGalleryUrl.trim();
    if (trimmed) {
      if ((form.mediaGallery?.length || 0) >= 10) {
        alert('Maximum 10 media gallery photos allowed.');
        return;
      }
      setForm(prev => ({ ...prev, mediaGallery: [...(prev.mediaGallery || []), trimmed] }));
      setNewGalleryUrl('');
    }
  };

  const removeGalleryImage = (idx: number) => {
    setForm(prev => ({
      ...prev,
      mediaGallery: (prev.mediaGallery || []).filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert('Project Name is required.');
      return;
    }

    setSaving(true);
    try {
      const datesStr = `${form.startYear} — ${form.current ? 'Present' : form.endYear}`;
      await onSave({
        ...form,
        dates: datesStr,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(15,32,54,0.6)',
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
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(16,24,32,0.25)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 28px',
            borderBottom: '1px solid #E6E4DF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#F7F6F3',
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: '18px',
              color: '#0F2036',
            }}
          >
            {form.id ? 'Edit Project' : 'Add New Project'}
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '20px', color: '#8A8F94', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
          {/* Project Name (Capped 255) & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    fontSize: '12px',
                    color: '#0F2036',
                    textTransform: 'uppercase',
                  }}
                >
                  Project Name *
                </label>
                <span style={{ fontSize: '11px', color: form.title.length > 255 ? '#D32F2F' : '#8A8F94' }}>
                  {form.title.length}/255
                </span>
              </div>
              <input
                type="text"
                required
                maxLength={255}
                placeholder="e.g. TerraWatch Spatial AI"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: '12px',
                  color: '#0F2036',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                Category
              </label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Project Cover / Primary Thumbnail Dropzone */}
          <ImageUploadDropzone
            label="Project Cover / Thumbnail Upload"
            value={form.thumbnail}
            onChange={url => setForm({ ...form, thumbnail: url })}
            hint="Primary Card Thumbnail: Single image used for main grid cards and listings."
          />

          {/* Media Gallery (Up to 10 photos) */}
          <div style={{ marginBottom: '18px', background: '#FAFAFA', border: '1px solid #E6E4DF', borderRadius: '8px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: '12px',
                  color: '#0F2036',
                  textTransform: 'uppercase',
                }}
              >
                Media Gallery (Up to 10 Photos / Screenshots)
              </label>
              <span style={{ fontSize: '11px', color: '#8A8F94', fontWeight: 600 }}>
                {form.mediaGallery?.length || 0}/10
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
              {(form.mediaGallery || []).map((imgUrl, i) => (
                <div
                  key={i}
                  style={{
                    width: '74px',
                    height: '56px',
                    borderRadius: '6px',
                    border: '1px solid #D5D9DE',
                    background: '#FFFFFF',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <img src={imgUrl} alt={`Gallery ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(i)}
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      background: 'rgba(211,47,47,0.9)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      fontSize: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Paste image URL for detail modal gallery..."
                value={newGalleryUrl}
                onChange={e => setNewGalleryUrl(e.target.value)}
                style={{ flex: 1, padding: '6px 12px', borderRadius: '6px', border: '1px solid #D5D9DE', fontSize: '12px' }}
              />
              <button
                type="button"
                onClick={addGalleryUrl}
                style={{ background: '#1B6FA8', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '6px 14px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
              >
                + Add Photo
              </button>
              <label
                style={{
                  background: '#0F2036',
                  color: '#FFFFFF',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                Upload
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.svg,.webp"
                  style={{ display: 'none' }}
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      handleGalleryUpload(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          {/* Active Status Toggle */}
          <div
            style={{
              background: '#F7F6F3',
              border: '1px solid #E6E4DF',
              borderRadius: '8px',
              padding: '12px 16px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', color: '#0F2036' }}>
              <input
                type="checkbox"
                checked={form.current}
                onChange={e => setForm({ ...form, current: e.target.checked })}
                style={{ width: '16px', height: '16px', accentColor: '#1B6FA8', cursor: 'pointer' }}
              />
              I am currently working on this project
            </label>
          </div>

          {/* Timeline Dropdowns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: '12px',
                  color: '#0F2036',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                Start Date
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select
                  value={form.startMonth}
                  onChange={e => setForm({ ...form, startMonth: e.target.value })}
                  style={{ flex: 1, padding: '8px 10px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
                >
                  {MONTHS.map(m => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  value={form.startYear}
                  onChange={e => setForm({ ...form, startYear: e.target.value })}
                  style={{ flex: 1, padding: '8px 10px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
                >
                  {YEARS.map(y => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {!form.current && (
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    fontSize: '12px',
                    color: '#0F2036',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  End Date
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select
                    value={form.endMonth}
                    onChange={e => setForm({ ...form, endMonth: e.target.value })}
                    style={{ flex: 1, padding: '8px 10px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
                  >
                    {MONTHS.map(m => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    value={form.endYear}
                    onChange={e => setForm({ ...form, endYear: e.target.value })}
                    style={{ flex: 1, padding: '8px 10px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
                  >
                    {YEARS.map(y => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Teaser Headline */}
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: '12px',
                color: '#0F2036',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              Summary Teaser Tagline
            </label>
            <input
              type="text"
              placeholder="e.g. Satellite land-cover change detector for agricultural monitoring."
              value={form.teaser}
              onChange={e => setForm({ ...form, teaser: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
            />
          </div>

          {/* Problem & Solution Architecture (0/2,000) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: '12px',
                  color: '#0F2036',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                Case Study Problem
              </label>
              <textarea
                rows={3}
                placeholder="What challenge or gap did this project address?"
                value={form.problem}
                onChange={e => setForm({ ...form, problem: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE', fontSize: '13px' }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: '12px',
                  color: '#0F2036',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                Solution & Architecture
              </label>
              <textarea
                rows={3}
                placeholder="How was the architecture designed and implemented?"
                value={form.solution}
                onChange={e => setForm({ ...form, solution: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE', fontSize: '13px' }}
              />
            </div>
          </div>

          {/* Live Demo & GitHub Links */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: '12px',
                  color: '#0F2036',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                Live Demo URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/demo"
                value={form.demoUrl}
                onChange={e => setForm({ ...form, demoUrl: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: '12px',
                  color: '#0F2036',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                GitHub Repository URL
              </label>
              <input
                type="url"
                placeholder="https://github.com/yourhandle/repo"
                value={form.githubUrl}
                onChange={e => setForm({ ...form, githubUrl: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
              />
            </div>
          </div>

          {/* Linked Skills Tag Picker */}
          <SkillTagPicker
            label="Linked Skills & Frameworks"
            selectedTags={form.tags || []}
            allAvailableSkills={availableSkills}
            onChange={tags => setForm({ ...form, tags: tags })}
          />

          {/* Contributors & Profile Links System */}
          <SkillTagPicker
            label="Contributors & Profile Links"
            selectedTags={form.contributors || []}
            allAvailableSkills={[]}
            onChange={contribs => setForm({ ...form, contributors: contribs })}
          />

          {/* Published Toggle */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E6E4DF' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', color: '#0F2036' }}>
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={e => setForm({ ...form, is_published: e.target.checked })}
                style={{ width: '16px', height: '16px', accentColor: '#1B6FA8', cursor: 'pointer' }}
              />
              Published to public portfolio (Uncheck for Draft state)
            </label>
          </div>

          {/* Submit Action Bar */}
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'transparent',
                border: '1px solid #D5D9DE',
                borderRadius: '6px',
                padding: '10px 20px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#5C6167',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{
                background: '#1B6FA8',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 24px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: saving ? 'wait' : 'pointer',
              }}
            >
              {saving ? 'Saving...' : form.id ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
