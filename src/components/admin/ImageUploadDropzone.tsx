import React, { useState, useRef } from 'react';

interface ImageUploadDropzoneProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  hint?: string;
}

export const ImageUploadDropzone: React.FC<ImageUploadDropzoneProps> = ({
  label,
  value,
  onChange,
  hint,
}) => {
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onChange(data.url);
      } else {
        alert(data.error || 'Failed to upload file');
      }
    } catch (err) {
      console.error(err);
      alert('Upload error occurred');
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div style={{ marginBottom: '18px' }}>
      <label
        style={{
          display: 'block',
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          fontSize: '12px',
          color: '#0F2036',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '6px',
        }}
      >
        {label}
      </label>
      {hint && <p style={{ fontSize: '12px', color: '#5C6167', margin: '0 0 8px' }}>{hint}</p>}

      {value ? (
        /* Preview Box with Replace & Remove Controls */
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            background: '#FFFFFF',
            border: '1px solid #E6E4DF',
            borderRadius: '8px',
            padding: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '8px',
              background: '#F7F6F3',
              border: '1px solid #E6E4DF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <img
              src={value}
              alt="Preview"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={e => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: '12px',
                color: '#16181C',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {value}
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  background: '#E3F1FB',
                  color: '#1B6FA8',
                  border: '1px solid #1B6FA8',
                  borderRadius: '4px',
                  padding: '4px 10px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Replace File
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                style={{
                  background: 'transparent',
                  color: '#D32F2F',
                  border: '1px solid #D32F2F',
                  borderRadius: '4px',
                  padding: '4px 10px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Drag and Drop Zone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${isDragging ? '#1B6FA8' : '#D5D9DE'}`,
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            background: isDragging ? '#E3F1FB' : '#FAFAFA',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ fontSize: '24px', marginBottom: '6px' }}>📁</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#16181C' }}>
            {uploading ? 'Uploading...' : 'Drag & drop image here, or click to browse'}
          </div>
          <div style={{ fontSize: '11px', color: '#8A8F94', marginTop: '4px' }}>
            Supports .png, .jpg, .svg, .webp
          </div>
        </div>
      )}

      {/* URL Fallback Input */}
      <div style={{ marginTop: '8px' }}>
        <input
          type="text"
          placeholder="Or paste image URL (e.g. /images/uploads/logo.png)"
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          style={{
            width: '100%',
            fontSize: '12px',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #E6E4DF',
            background: '#FFFFFF',
          }}
        />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.svg,.webp"
        style={{ display: 'none' }}
        onChange={e => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
          }
        }}
      />
    </div>
  );
};
