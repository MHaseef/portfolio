import React, { useState, useEffect, useRef } from 'react';

export interface ReorderItem {
  id: string;
  title?: string;
  name?: string;
  subtitle?: string;
  company?: string;
  category?: string;
  logo?: string;
  thumbnail?: string;
  icon?: string;
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

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  useEffect(() => {
    setList([...items]);
  }, [items, isOpen]);

  if (!isOpen) return null;

  const handleDragStart = (e: React.DragEvent, index: number) => {
    dragItem.current = index;
    setDraggedIndex(index);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(index));
    }
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    dragOverItem.current = index;
    if (dragItem.current !== null && dragItem.current !== index) {
      const newList = [...list];
      const draggedObj = newList[dragItem.current];
      newList.splice(dragItem.current, 1);
      newList.splice(index, 0, draggedObj);
      dragItem.current = index;
      setDraggedIndex(index);
      setList(newList);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnd = () => {
    dragItem.current = null;
    dragOverItem.current = null;
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
            const itemTitle = item.title || item.name || `Item ${idx + 1}`;
            const itemSubtitle = [item.company || item.category, item.dates].filter(Boolean).join(' — ');

            return (
              <div
                key={item.id || item.name || idx}
                draggable
                onDragStart={e => handleDragStart(e, idx)}
                onDragEnter={e => handleDragEnter(e, idx)}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  background: isBeingDragged ? '#E3F1FB' : '#FFFFFF',
                  border: `1.5px solid ${isBeingDragged ? '#1B6FA8' : '#E6E4DF'}`,
                  borderRadius: '8px',
                  padding: '12px 16px',
                  opacity: isBeingDragged ? 0.5 : 1,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                  transition: 'transform 0.15s ease, background 0.15s ease',
                  cursor: 'grab',
                }}
              >
                {/* Logo / Thumbnail */}
                {item.logo || item.thumbnail || item.icon ? (
                  <img
                    src={item.logo || item.thumbnail || item.icon}
                    alt={itemTitle}
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
                    {itemTitle.charAt(0).toUpperCase()}
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
                    {itemTitle}
                  </div>
                  {itemSubtitle && (
                    <div style={{ fontSize: '12px', color: '#5C6167' }}>
                      {itemSubtitle}
                    </div>
                  )}
                </div>

                {/* Manual Move Buttons */}
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      moveUp(idx);
                    }}
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
                    onClick={e => {
                      e.stopPropagation();
                      moveDown(idx);
                    }}
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
