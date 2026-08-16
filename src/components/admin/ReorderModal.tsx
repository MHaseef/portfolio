import React, { useState, useEffect } from 'react';

export interface ReorderItem {
  id: string;
  title: string;
  subtitle?: string;
  logo?: string;
  dates?: string;
  [key: string]: any;
}

interface ReorderModalProps {
  isOpen: boolean;
  title: string;
  items: ReorderItem[];
  onSave: (reorderedItems: ReorderItem[]) => Promise<void>;
  onClose: () => void;
}

export const ReorderModal: React.FC<ReorderModalProps> = ({
  isOpen,
  title,
  items,
  onSave,
  onClose,
}) => {
  const [list, setList] = useState<ReorderItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    setList([...items]);
  }, [items, isOpen]);

  if (!isOpen) return null;

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newList = [...list];
    const draggedItem = newList[draggedIndex];
    newList.splice(draggedIndex, 1);
    newList.splice(index, 0, draggedItem);
    setDraggedIndex(index);
    setList(newList);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newList = [...list];
    const temp = newList[index - 1];
    newList[index - 1] = newList[index];
    newList[index] = temp;
    setList(newList);
  };

  const moveDown = (index: number) => {
    if (index === list.length - 1) return;
    const newList = [...list];
    const temp = newList[index + 1];
    newList[index + 1] = newList[index];
    newList[index] = temp;
    setList(newList);
  };

  const handleSaveClick = async () => {
    setSaving(true);
    try {
      await onSave(list);
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
          maxWidth: '600px',
          width: '100%',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(16,24,32,0.25)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
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
            {title}
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              color: '#8A8F94',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        <p style={{ padding: '12px 24px 0', fontSize: '13px', color: '#5C6167', margin: 0 }}>
          Drag items using the handle (≡) or use arrow buttons to adjust position.
        </p>

        {/* List Body */}
        <div style={{ padding: '16px 24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {list.map((item, idx) => {
            const isBeingDragged = draggedIndex === idx;
            return (
              <div
                key={item.id || item.name || idx}
                draggable
                onDragStart={e => handleDragStart(e, idx)}
                onDragOver={e => handleDragOver(e, idx)}
                onDragEnd={handleDragEnd}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  background: isBeingDragged ? '#E3F1FB' : '#FFFFFF',
                  border: `1px solid ${isBeingDragged ? '#1B6FA8' : '#E6E4DF'}`,
                  borderRadius: '8px',
                  padding: '12px 16px',
                  opacity: isBeingDragged ? 0.6 : 1,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                  transition: 'background 0.15s ease',
                }}
              >
                {/* Logo / Thumbnail */}
                {item.logo || item.thumbnail || item.icon ? (
                  <img
                    src={item.logo || item.thumbnail || item.icon}
                    alt={item.title || item.name}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '6px',
                      objectFit: 'contain',
                      background: '#F7F6F3',
                      border: '1px solid #E6E4DF',
                      padding: '2px',
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '6px',
                      background: '#0F2036',
                      color: '#5FA8D3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 700,
                      fontSize: '14px',
                      flexShrink: 0,
                    }}
                  >
                    {(item.title || item.name || '?').charAt(0).toUpperCase()}
                  </div>
                )}

                {/* Title & Subtitle */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#16181C',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.title || item.name}
                  </div>
                  {(item.subtitle || item.company || item.category || item.dates) && (
                    <div style={{ fontSize: '12px', color: '#5C6167' }}>
                      {[item.company || item.category, item.dates].filter(Boolean).join(' — ')}
                    </div>
                  )}
                </div>

                {/* Manual Move Buttons */}
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    type="button"
                    onClick={() => moveUp(idx)}
                    disabled={idx === 0}
                    style={{
                      background: '#F7F6F3',
                      border: '1px solid #E6E4DF',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      cursor: idx === 0 ? 'default' : 'pointer',
                      opacity: idx === 0 ? 0.3 : 1,
                    }}
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(idx)}
                    disabled={idx === list.length - 1}
                    style={{
                      background: '#F7F6F3',
                      border: '1px solid #E6E4DF',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      cursor: idx === list.length - 1 ? 'default' : 'pointer',
                      opacity: idx === list.length - 1 ? 0.3 : 1,
                    }}
                  >
                    ▼
                  </button>
                </div>

                {/* Drag Handle */}
                <div
                  style={{
                    fontSize: '20px',
                    color: '#8A8F94',
                    cursor: 'grab',
                    padding: '0 4px',
                    userSelect: 'none',
                  }}
                  title="Drag to reorder"
                >
                  ≡
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid #E6E4DF',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            background: '#F7F6F3',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid #D5D9DE',
              borderRadius: '6px',
              padding: '8px 18px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#5C6167',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveClick}
            disabled={saving}
            style={{
              background: '#1B6FA8',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 20px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: saving ? 'wait' : 'pointer',
            }}
          >
            {saving ? 'Saving...' : 'Save Order'}
          </button>
        </div>
      </div>
    </div>
  );
};
