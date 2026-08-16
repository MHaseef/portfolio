import React, { useState, useEffect } from 'react';
import { ImageUploadDropzone } from './ImageUploadDropzone';

export interface HeroProfileFormValues {
  name: string;
  role: string;
  avatar: string;
  initials: string;
  location: string;
  heroHeadline?: string;
  heroBio?: string;
  bioText?: string;
}

interface HeroProfileFormModalProps {
  isOpen: boolean;
  initialValues?: HeroProfileFormValues | null;
  onSave: (values: HeroProfileFormValues) => Promise<void>;
  onClose: () => void;
}

export const HeroProfileFormModal: React.FC<HeroProfileFormModalProps> = ({
  isOpen,
  initialValues,
  onSave,
  onClose,
}) => {
  const [form, setForm] = useState<HeroProfileFormValues>({
    name: 'Muhammad Haseef',
    role: 'Geoinformatics Engineer · GIS Developer & Analyst',
    avatar: '',
    initials: 'MH',
    location: 'Islamabad, PK',
    heroHeadline: 'Spatial thinking, engineered.',
    heroBio:
      "Welcome. I'm Haseef — a GIS developer and spatial data analyst who enjoys turning raw geographic data into tools people can actually use. I build WebGIS platforms, automate spatial workflows, and dig into geospatial datasets to find patterns worth acting on.",
    bioText: '',
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name || 'Muhammad Haseef',
        role: initialValues.role || 'Geoinformatics Engineer · GIS Developer & Analyst',
        avatar: initialValues.avatar || '',
        initials: initialValues.initials || 'MH',
        location: initialValues.location || 'Islamabad, PK',
        heroHeadline: initialValues.heroHeadline || 'Spatial thinking, engineered.',
        heroBio:
          initialValues.heroBio ||
          "Welcome. I'm Haseef — a GIS developer and spatial data analyst who enjoys turning raw geographic data into tools people can actually use.",
        bioText: initialValues.bioText || '',
      });
    }
  }, [initialValues, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(form);
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
            Edit Profile & Hero Section
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
          {/* Avatar Upload Dropzone */}
          <ImageUploadDropzone
            label="Profile Avatar Photo"
            value={form.avatar}
            onChange={url => setForm({ ...form, avatar: url })}
            hint="Upload your avatar photo. Appears in navigation header & about me modal."
          />

          {/* Full Name & Initials */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
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
                Full Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
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
                Initials Fallback
              </label>
              <input
                type="text"
                maxLength={4}
                value={form.initials}
                onChange={e => setForm({ ...form, initials: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
              />
            </div>
          </div>

          {/* Role & Location */}
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
                Role Title
              </label>
              <input
                type="text"
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
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
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
              />
            </div>
          </div>

          {/* Hero Headline */}
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
              Hero Main Headline
            </label>
            <input
              type="text"
              value={form.heroHeadline}
              onChange={e => setForm({ ...form, heroHeadline: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE', fontSize: '16px', fontWeight: 600 }}
            />
          </div>

          {/* Hero Bio Paragraph */}
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
              Hero Subtitle / Bio Paragraph
            </label>
            <textarea
              rows={4}
              value={form.heroBio}
              onChange={e => setForm({ ...form, heroBio: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE', fontSize: '14px', lineHeight: 1.6 }}
            />
          </div>

          {/* Detailed About Me Paragraphs */}
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
              About Me Modal Detailed Paragraphs
            </label>
            <textarea
              rows={5}
              placeholder="Full About Me bio text (paragraphs separated by blank lines)..."
              value={form.bioText}
              onChange={e => setForm({ ...form, bioText: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE', fontSize: '14px', lineHeight: 1.6 }}
            />
          </div>

          {/* Action Buttons */}
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
              {saving ? 'Saving...' : 'Save Profile & Hero'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
