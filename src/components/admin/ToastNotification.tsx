import React from 'react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'error' | 'info';
  onClose?: () => void;
}

export const ToastNotification: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  const bg = type === 'error' ? '#D32F2F' : type === 'info' ? '#0F2036' : '#1B6FA8';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '80px',
        right: '24px',
        zIndex: 9999,
        background: bg,
        color: '#FFFFFF',
        padding: '12px 20px',
        borderRadius: '8px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '13px',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        animation: 'slideUp 0.3s ease-out',
      }}
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#FFFFFF',
            fontSize: '16px',
            cursor: 'pointer',
            padding: '0 4px',
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};
