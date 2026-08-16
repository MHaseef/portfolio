import React from 'react';

interface SectionAdminHeaderProps {
  sectionLabel: string;
  sectionTitle: string;
  isSectionVisible?: boolean;
  onToggleSectionVisibility?: () => void;
  onAddNewItem?: () => void;
  onOpenReorder?: () => void;
  isPreviewMode?: boolean;
}

export const SectionAdminHeader: React.FC<SectionAdminHeaderProps> = ({
  sectionLabel,
  sectionTitle,
  isSectionVisible = true,
  onToggleSectionVisibility,
  onAddNewItem,
  onOpenReorder,
  isPreviewMode = false,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px',
        opacity: !isSectionVisible && !isPreviewMode ? 0.55 : 1,
        transition: 'opacity 0.2s ease',
      }}
    >
      <div>
        <div
          style={{
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '2px',
            color: '#1B6FA8',
            textTransform: 'uppercase',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>{sectionLabel}</span>
          {!isSectionVisible && !isPreviewMode && (
            <span
              style={{
                background: '#FFF3E0',
                color: '#E65100',
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '10px',
                fontWeight: 700,
                textTransform: 'none',
              }}
            >
              🙈 Section Hidden from Public
            </span>
          )}
        </div>
        <h2
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 36px)',
            margin: 0,
            color: '#16181C',
          }}
        >
          {sectionTitle}
        </h2>
      </div>

      {/* Section Action Bar (Admin Mode Only) */}
      {!isPreviewMode && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#0F2036',
            padding: '6px 12px',
            borderRadius: '10px',
            boxShadow: '0 4px 14px rgba(15,32,54,0.15)',
          }}
        >
          {onAddNewItem && (
            <button
              type="button"
              onClick={onAddNewItem}
              style={{
                background: '#1B6FA8',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                padding: '7px 14px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
              title="Add New Item to Section"
            >
              <span>+ Add Item</span>
            </button>
          )}

          {onOpenReorder && (
            <button
              type="button"
              onClick={onOpenReorder}
              style={{
                background: '#1A3454',
                color: '#5FA8D3',
                border: '1px solid #2A4A68',
                borderRadius: '6px',
                padding: '7px 12px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
              title="Reorder items in section"
            >
              <span>≡ Reorder</span>
            </button>
          )}

          {onToggleSectionVisibility && (
            <button
              type="button"
              onClick={onToggleSectionVisibility}
              style={{
                background: isSectionVisible ? '#1A3454' : '#E65100',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                padding: '7px 12px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
              title={isSectionVisible ? 'Hide entire section from public' : 'Show section on public portfolio'}
            >
              <span>{isSectionVisible ? '👁️ Visible' : '🙈 Hidden'}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
