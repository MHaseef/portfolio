import React, { useState, useEffect } from 'react';
import { ImageUploadDropzone } from './ImageUploadDropzone';
import { SkillTagPicker } from './SkillTagPicker';

export interface ExperienceFormValues {
  id?: string;
  title: string;
  company: string;
  type?: string;
  logo?: string;
  location?: string;
  startMonth?: string;
  startYear?: string;
  endMonth?: string;
  endYear?: string;
  current?: boolean;
  startDate?: string;
  endDate?: string;
  dates?: string;
  teaser?: string;
  description?: string;
  linkedSkills?: string[];
  is_published?: boolean;
}

interface ExperienceFormModalProps {
  isOpen: boolean;
  initialValues?: ExperienceFormValues | null;
  availableSkills?: string[];
  onSave: (values: ExperienceFormValues) => Promise<void>;
  onClose: () => void;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const YEARS = Array.from({ length: 30 }, (_, i) => String(2026 - i));

export const ExperienceFormModal: React.FC<ExperienceFormModalProps> = ({
  isOpen,
  initialValues,
  availableSkills = [],
  onSave,
  onClose,
}) => {
  const [form, setForm] = useState<ExperienceFormValues>({
    title: '',
    company: '',
    type: 'Full-time',
    logo: '',
    location: '',
    startMonth: 'Jan',
    startYear: '2024',
    endMonth: 'Dec',
    endYear: '2024',
    current: false,
    teaser: '',
    description: '',
    linkedSkills: [],
    is_published: true,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setForm({
        id: initialValues.id,
        title: initialValues.title || '',
        company: initialValues.company || '',
        type: initialValues.type || 'Full-time',
        logo: initialValues.logo || '',
        location: initialValues.location || '',
        startMonth: initialValues.startMonth || 'Jan',
        startYear: initialValues.startYear || '2024',
        endMonth: initialValues.endMonth || 'Dec',
        endYear: initialValues.endYear || '2024',
        current: initialValues.current || false,
        teaser: initialValues.teaser || '',
        description: initialValues.description || '',
        linkedSkills: initialValues.linkedSkills || [],
        is_published: initialValues.is_published !== false,
      });
    } else {
      setForm({
        title: '',
        company: '',
        type: 'Full-time',
        logo: '',
        location: '',
        startMonth: 'Jan',
        startYear: '2024',
        endMonth: 'Dec',
        endYear: '2024',
        current: false,
        teaser: '',
        description: '',
        linkedSkills: [],
        is_published: true,
      });
    }
  }, [initialValues, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.company.trim()) {
      alert('Job Title and Organization are required.');
      return;
    }

    setSaving(true);
    try {
      const startDateStr = `${form.startMonth} ${form.startYear}`;
      const endDateStr = form.current ? 'Present' : `${form.endMonth} ${form.endYear}`;
      const datesStr = `${form.startYear} — ${form.current ? 'Present' : form.endYear}`;

      await onSave({
        ...form,
        startDate: startDateStr,
        endDate: endDateStr,
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
          maxWidth: '680px',
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
            {form.id ? 'Edit Experience' : 'Add Experience'}
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
          {/* Job Title & Organization */}
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
                Job Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Senior WebGIS Developer"
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
                Organization / Company *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. GeoSpatial Solutions"
                value={form.company}
                onChange={e => setForm({ ...form, company: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
              />
            </div>
          </div>

          {/* Logo Upload Dropzone */}
          <ImageUploadDropzone
            label="Company Logo Upload"
            value={form.logo}
            onChange={url => setForm({ ...form, logo: url })}
            hint="Accepts .png, .jpg, .svg, .webp. Displays next to timeline entry."
          />

          {/* Employment Type & Location */}
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
                Employment Type
              </label>
              <input
                type="text"
                placeholder="e.g. Contractor, Full-time, Freelance Core, Research Fellow"
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
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
                Location
              </label>
              <input
                type="text"
                placeholder="e.g. Islamabad, PK"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
              />
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
              I currently work here
            </label>
            {form.current && (
              <span style={{ background: '#E3F1FB', color: '#1B6FA8', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px' }}>
                End Date set to Present
              </span>
            )}
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

          {/* Headline Teaser */}
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
              Summary Teaser
            </label>
            <input
              type="text"
              placeholder="e.g. Building WebGIS platforms and spatial data pipelines for municipal clients."
              value={form.teaser}
              onChange={e => setForm({ ...form, teaser: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
            />
          </div>

          {/* Description & Character Limit Counter (0/2,000) */}
          <div style={{ marginBottom: '16px' }}>
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
                Detailed Description
              </label>
              <span style={{ fontSize: '11px', color: (form.description?.length || 0) > 2000 ? '#D32F2F' : '#8A8F94' }}>
                {form.description?.length || 0}/2,000
              </span>
            </div>
            <textarea
              rows={4}
              maxLength={2000}
              placeholder="Detailed description of your accomplishments and technical responsibilities..."
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                border: '1px solid #D5D9DE',
                fontSize: '14px',
                lineHeight: 1.5,
              }}
            />
          </div>

          {/* Linked Skills Tag Picker */}
          <SkillTagPicker
            label="Linked Skills"
            selectedTags={form.linkedSkills || []}
            allAvailableSkills={availableSkills}
            onChange={tags => setForm({ ...form, linkedSkills: tags })}
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
          <div
            style={{
              marginTop: '24px',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
            }}
          >
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
              {saving ? 'Saving...' : form.id ? 'Update Experience' : 'Add Experience'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
