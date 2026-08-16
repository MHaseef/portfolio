import React, { useState, useEffect } from 'react';
import { ImageUploadDropzone } from './ImageUploadDropzone';
import { SkillTagPicker } from './SkillTagPicker';

export interface EducationFormValues {
  degree: string;
  university: string;
  fieldOfStudy?: string;
  logo?: string;
  startYear?: string;
  endYear?: string;
  dates?: string;
  gradeActivities?: string;
  description?: string;
  linkedSkills?: string[];
}

interface EducationFormModalProps {
  isOpen: boolean;
  initialValues?: EducationFormValues | null;
  availableSkills?: string[];
  onSave: (values: EducationFormValues) => Promise<void>;
  onClose: () => void;
}

const YEARS = Array.from({ length: 35 }, (_, i) => String(2030 - i));

export const EducationFormModal: React.FC<EducationFormModalProps> = ({
  isOpen,
  initialValues,
  availableSkills = [],
  onSave,
  onClose,
}) => {
  const [form, setForm] = useState<EducationFormValues>({
    degree: '',
    university: '',
    fieldOfStudy: '',
    logo: '',
    startYear: '2024',
    endYear: '2028',
    dates: '2024 — 2028',
    gradeActivities: '',
    description: '',
    linkedSkills: [],
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setForm({
        degree: initialValues.degree || '',
        university: initialValues.university || '',
        fieldOfStudy: initialValues.fieldOfStudy || '',
        logo: initialValues.logo || '',
        startYear: initialValues.startYear || '2024',
        endYear: initialValues.endYear || '2028',
        dates: initialValues.dates || '2024 — 2028',
        gradeActivities: initialValues.gradeActivities || '',
        description: initialValues.description || '',
        linkedSkills: initialValues.linkedSkills || [],
      });
    } else {
      setForm({
        degree: 'BE Geoinformatics Engineering',
        university: 'National University of Sciences and Technology (NUST)',
        fieldOfStudy: 'Geoinformatics Engineering',
        logo: '/images/uploads/nust-logo.png',
        startYear: '2024',
        endYear: '2028',
        dates: '2024 — 2028',
        gradeActivities: '',
        description: '',
        linkedSkills: [],
      });
    }
  }, [initialValues, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.university.trim() || !form.degree.trim()) {
      alert('School / Institution and Degree are required.');
      return;
    }

    setSaving(true);
    try {
      const datesStr = `${form.startYear} — ${form.endYear}`;
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
          maxWidth: '660px',
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
            Edit Education Details
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
          {/* School & Degree */}
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
                School / Institution *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. NUST Islamabad"
                value={form.university}
                onChange={e => setForm({ ...form, university: e.target.value })}
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
                Degree *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. BE Geoinformatics Engineering"
                value={form.degree}
                onChange={e => setForm({ ...form, degree: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
              />
            </div>
          </div>

          {/* Field of Study */}
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
              Field of Study
            </label>
            <input
              type="text"
              placeholder="e.g. Geoinformatics Engineering & Spatial Data Science"
              value={form.fieldOfStudy}
              onChange={e => setForm({ ...form, fieldOfStudy: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
            />
          </div>

          {/* Institution Logo */}
          <ImageUploadDropzone
            label="Institution Logo / Crest Upload"
            value={form.logo}
            onChange={url => setForm({ ...form, logo: url })}
            hint="Upload university/school badge or crest image."
          />

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
                Start Year
              </label>
              <select
                value={form.startYear}
                onChange={e => setForm({ ...form, startYear: e.target.value })}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
              >
                {YEARS.map(y => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
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
                End Year / Expected
              </label>
              <select
                value={form.endYear}
                onChange={e => setForm({ ...form, endYear: e.target.value })}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
              >
                {YEARS.map(y => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grade / Activities Counter (0/500) */}
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
                Grade / Activities & Honors
              </label>
              <span style={{ fontSize: '11px', color: (form.gradeActivities?.length || 0) > 500 ? '#D32F2F' : '#8A8F94' }}>
                {form.gradeActivities?.length || 0}/500
              </span>
            </div>
            <textarea
              rows={2}
              maxLength={500}
              placeholder="e.g. GPA 3.8/4.0, President of Geospatial Society, Best FYP Award"
              value={form.gradeActivities}
              onChange={e => setForm({ ...form, gradeActivities: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE', fontSize: '13px' }}
            />
          </div>

          {/* Extended Description (0/1,000) */}
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
                Program Description
              </label>
              <span style={{ fontSize: '11px', color: (form.description?.length || 0) > 1000 ? '#D32F2F' : '#8A8F94' }}>
                {form.description?.length || 0}/1,000
              </span>
            </div>
            <textarea
              rows={3}
              maxLength={1000}
              placeholder="Summary of coursework, spatial AI research, and focus areas..."
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE', fontSize: '13px' }}
            />
          </div>

          {/* Linked Skills Tag Picker */}
          <SkillTagPicker
            label="Linked Technologies & Subjects"
            selectedTags={form.linkedSkills || []}
            allAvailableSkills={availableSkills}
            onChange={tags => setForm({ ...form, linkedSkills: tags })}
          />

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
              {saving ? 'Saving...' : 'Save Education'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
