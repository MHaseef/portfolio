import React, { useState } from 'react';

interface SkillTagPickerProps {
  label: string;
  selectedTags: string[];
  allAvailableSkills: string[];
  onChange: (tags: string[]) => void;
}

export const SkillTagPicker: React.FC<SkillTagPickerProps> = ({
  label,
  selectedTags = [],
  allAvailableSkills = [],
  onChange,
}) => {
  const [customTagInput, setCustomTagInput] = useState('');

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter(t => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  const addCustomTag = () => {
    const trimmed = customTagInput.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      onChange([...selectedTags, trimmed]);
      setCustomTagInput('');
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
          marginBottom: '8px',
        }}
      >
        {label}
      </label>

      {/* Selected Tags Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
        {selectedTags.map((tag, i) => (
          <span
            key={i}
            style={{
              background: '#1B6FA8',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {tag}
            <button
              type="button"
              onClick={() => toggleTag(tag)}
              style={{
                background: 'none',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                fontSize: '12px',
                padding: 0,
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </span>
        ))}
        {selectedTags.length === 0 && (
          <span style={{ fontSize: '12px', color: '#8A8F94', italic: 'true' }}>
            No skills linked yet
          </span>
        )}
      </div>

      {/* Available Preset Skills */}
      {allAvailableSkills.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
          {allAvailableSkills.map(skill => {
            const isSelected = selectedTags.includes(skill);
            if (isSelected) return null;
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleTag(skill)}
                style={{
                  background: '#FFFFFF',
                  color: '#5C6167',
                  border: '1px solid #D5D9DE',
                  borderRadius: '16px',
                  padding: '3px 10px',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                + {skill}
              </button>
            );
          })}
        </div>
      )}

      {/* Add Custom Tag Input */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="Add custom skill or contributor..."
          value={customTagInput}
          onChange={e => setCustomTagInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addCustomTag();
            }
          }}
          style={{
            flex: 1,
            fontSize: '13px',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #D5D9DE',
          }}
        />
        <button
          type="button"
          onClick={addCustomTag}
          style={{
            background: '#0F2036',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};
