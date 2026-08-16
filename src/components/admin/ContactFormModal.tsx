import React, { useState, useEffect } from 'react';

export interface SocialLinkItem {
  label: string;
  url: string;
  value?: string;
}

export interface ContactFormValues {
  title: string;
  email: string;
  location: string;
  socialLinks: SocialLinkItem[];
}

interface ContactFormModalProps {
  isOpen: boolean;
  initialValues?: ContactFormValues | null;
  onSave: (values: ContactFormValues) => Promise<void>;
  onClose: () => void;
}

export const ContactFormModal: React.FC<ContactFormModalProps> = ({
  isOpen,
  initialValues,
  onSave,
  onClose,
}) => {
  const [form, setForm] = useState<ContactFormValues>({
    title: "Let's build something spatial.",
    email: '',
    location: '',
    socialLinks: [],
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setForm({
        title: initialValues.title || "Let's build something spatial.",
        email: initialValues.email || '',
        location: initialValues.location || '',
        socialLinks: initialValues.socialLinks || [],
      });
    }
  }, [initialValues, isOpen]);

  if (!isOpen) return null;

  const addSocialLink = () => {
    setForm(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { label: 'LinkedIn', url: 'https://', value: '' }],
    }));
  };

  const updateSocialLink = (idx: number, field: keyof SocialLinkItem, val: string) => {
    setForm(prev => {
      const updated = [...prev.socialLinks];
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, socialLinks: updated };
    });
  };

  const removeSocialLink = (idx: number) => {
    setForm(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== idx),
    }));
  };

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
          maxWidth: '640px',
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
            Edit Contact & Social Links
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
          {/* Headline Title */}
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
              Contact Headline Title
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D5D9DE' }}
            />
          </div>

          {/* Primary Email & Location */}
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
                Primary Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
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

          {/* Social Links List */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: '12px',
                  color: '#0F2036',
                  textTransform: 'uppercase',
                }}
              >
                Contact & Social Links Buttons
              </label>
              <button
                type="button"
                onClick={addSocialLink}
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
                + Add Link
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {form.socialLinks.map((link, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr 1fr auto',
                    gap: '8px',
                    alignItems: 'center',
                    background: '#FAFAFA',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #E6E4DF',
                  }}
                >
                  <input
                    type="text"
                    placeholder="Platform (e.g. GitHub)"
                    value={link.label}
                    onChange={e => updateSocialLink(i, 'label', e.target.value)}
                    style={{ padding: '6px 8px', fontSize: '12px', borderRadius: '4px', border: '1px solid #D5D9DE' }}
                  />
                  <input
                    type="text"
                    placeholder="URL (e.g. https://github.com/handle)"
                    value={link.url}
                    onChange={e => updateSocialLink(i, 'url', e.target.value)}
                    style={{ padding: '6px 8px', fontSize: '12px', borderRadius: '4px', border: '1px solid #D5D9DE' }}
                  />
                  <input
                    type="text"
                    placeholder="Display text"
                    value={link.value || ''}
                    onChange={e => updateSocialLink(i, 'value', e.target.value)}
                    style={{ padding: '6px 8px', fontSize: '12px', borderRadius: '4px', border: '1px solid #D5D9DE' }}
                  />
                  <button
                    type="button"
                    onClick={() => removeSocialLink(i)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#D32F2F',
                      fontSize: '16px',
                      cursor: 'pointer',
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
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
              {saving ? 'Saving...' : 'Save Contact Details'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
