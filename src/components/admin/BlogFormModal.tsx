import React, { useState, useEffect } from 'react';
import { ImageUploadDropzone } from './ImageUploadDropzone';

export interface BlogFormValues {
  slug?: string;
  oldSlug?: string;
  title: string;
  category: string;
  date?: string;
  readTime?: string;
  heroImage?: string;
  excerpt?: string;
  body?: string;
  is_published?: boolean;
}

interface BlogFormModalProps {
  isOpen: boolean;
  initialValues?: BlogFormValues | null;
  onSave: (values: BlogFormValues) => Promise<void>;
  onClose: () => void;
}

const CATEGORIES = ['MAPPING', 'BACKEND', 'SPATIAL AI', 'FRONTEND', 'TUTORIALS'];

export const BlogFormModal: React.FC<BlogFormModalProps> = ({
  isOpen,
  initialValues,
  onSave,
  onClose,
}) => {
  const [form, setForm] = useState<BlogFormValues>({
    title: '',
    category: 'MAPPING',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min',
    heroImage: '',
    excerpt: '',
    body: '',
    is_published: true,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setForm({
        slug: initialValues.slug,
        oldSlug: initialValues.slug,
        title: initialValues.title || '',
        category: initialValues.category || 'MAPPING',
        date: initialValues.date || new Date().toISOString().split('T')[0],
        readTime: initialValues.readTime || '5 min',
        heroImage: initialValues.heroImage || '',
        excerpt: initialValues.excerpt || '',
        body: initialValues.body || '',
        is_published: initialValues.is_published !== false,
      });
    } else {
      setForm({
        title: '',
        category: 'MAPPING',
        date: new Date().toISOString().split('T')[0],
        readTime: '5 min',
        heroImage: '',
        excerpt: '',
        body: '',
        is_published: true,
      });
    }
  }, [initialValues, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert('Blog Post Title is required.');
      return;
    }

    setSaving(true);
    try {
      const generatedSlug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      await onSave({
        ...form,
        slug: generatedSlug,
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
          maxWidth: '700px',
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
            {initialValues ? 'Edit Blog Article' : 'Add New Blog Article'}
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
          {/* Post Title */}
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
              Post Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Building High-Performance Vector Tile Servers with PostGIS"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
            />
          </div>

          {/* Category & Read Time & Publish Date */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '16px' }}>
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
                Read Time
              </label>
              <input
                type="text"
                placeholder="e.g. 5 min"
                value={form.readTime}
                onChange={e => setForm({ ...form, readTime: e.target.value })}
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
                Publish Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
              />
            </div>
          </div>

          {/* Cover / Hero Image Dropzone */}
          <ImageUploadDropzone
            label="Cover / Hero Image Upload"
            value={form.heroImage}
            onChange={url => setForm({ ...form, heroImage: url })}
            hint="Upload cover photo for article card preview."
          />

          {/* Excerpt */}
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
              Short Excerpt / Teaser
            </label>
            <textarea
              rows={2}
              placeholder="Brief overview of the article content..."
              value={form.excerpt}
              onChange={e => setForm({ ...form, excerpt: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE', fontSize: '13px' }}
            />
          </div>

          {/* Article Body */}
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
              Full Article Content
            </label>
            <textarea
              rows={6}
              placeholder="Full article content in Markdown or Plain Text..."
              value={form.body}
              onChange={e => setForm({ ...form, body: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE', fontSize: '14px', lineHeight: 1.6 }}
            />
          </div>

          {/* Published Toggle */}
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E6E4DF' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', color: '#0F2036' }}>
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={e => setForm({ ...form, is_published: e.target.checked })}
                style={{ width: '16px', height: '16px', accentColor: '#1B6FA8', cursor: 'pointer' }}
              />
              Published on blog listing
            </label>
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
              {saving ? 'Saving...' : initialValues ? 'Update Article' : 'Publish Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
