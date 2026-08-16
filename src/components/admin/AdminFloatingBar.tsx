import React from 'react';

interface AdminFloatingBarProps {
  isPreviewMode: boolean;
  onTogglePreviewMode: () => void;
  onAddExperience: () => void;
  onAddProject: () => void;
  onAddSkill: () => void;
  onEditEducation: () => void;
  onLockSession?: () => void;
}

export const AdminFloatingBar: React.FC<AdminFloatingBarProps> = ({
  isPreviewMode,
  onTogglePreviewMode,
  onAddExperience,
  onAddProject,
  onAddSkill,
  onEditEducation,
  onLockSession,
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 900,
        background: '#0F2036',
        border: '1px solid #1C3A57',
        borderRadius: '36px',
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
        backdropFilter: 'blur(8px)',
        color: '#FFFFFF',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '13px',
      }}
    >
      {/* Admin Status Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '12px', borderRight: '1px solid #1C3A57' }}>
        <span
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: isPreviewMode ? '#FFB74D' : '#4CAF50',
            boxShadow: `0 0 8px ${isPreviewMode ? '#FFB74D' : '#4CAF50'}`,
          }}
        />
        <span style={{ fontWeight: 700, fontSize: '12px', letterSpacing: '0.5px' }}>
          {isPreviewMode ? 'Public Preview' : 'Admin Mode Active'}
        </span>
      </div>

      {/* Quick Action Buttons */}
      {!isPreviewMode && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={onAddExperience}
            style={{
              background: '#1B6FA8',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            + Experience
          </button>
          <button
            type="button"
            onClick={onAddProject}
            style={{
              background: '#1B6FA8',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            + Project
          </button>
          <button
            type="button"
            onClick={onAddSkill}
            style={{
              background: '#1B6FA8',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            + Skill
          </button>
          <button
            type="button"
            onClick={onEditEducation}
            style={{
              background: '#1B6FA8',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Edit Education
          </button>
        </div>
      )}

      {/* Preview Toggle & Lock Controls */}
      <div style={{ borderLeft: '1px solid #1C3A57', paddingLeft: '12px', display: 'flex', gap: '8px' }}>
        <button
          type="button"
          onClick={onTogglePreviewMode}
          style={{
            background: isPreviewMode ? '#1B6FA8' : '#1A3454',
            color: '#FFFFFF',
            border: '1px solid #2A4A68',
            borderRadius: '20px',
            padding: '6px 16px',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>{isPreviewMode ? '✏️ Edit Mode' : '👁️ Preview Public View'}</span>
        </button>

        {onLockSession && (
          <button
            type="button"
            onClick={onLockSession}
            style={{
              background: '#D32F2F',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
            title="Lock Admin Session"
          >
            🔒 Lock
          </button>
        )}
      </div>
    </div>
  );
};
