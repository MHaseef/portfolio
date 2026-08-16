import React, { useState } from 'react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onAuthenticate: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ isOpen, onAuthenticate }) => {
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default passcode check (accepts "admin" or "haseef" or custom password)
    if (passcode.trim() === 'admin' || passcode.trim() === 'haseef' || passcode.trim() === '123456') {
      onAuthenticate();
    } else {
      setErrorMsg('Incorrect passcode. Please try again.');
    }
  };

  const handleNetlifyLogin = () => {
    if ((window as any).netlifyIdentity) {
      (window as any).netlifyIdentity.open();
    } else {
      alert('Netlify Identity widget initializing...');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(11, 23, 39, 0.82)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          background: '#0F2036',
          border: '1px solid #1C3A57',
          borderRadius: '16px',
          maxWidth: '440px',
          width: '100%',
          padding: '36px 32px',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          color: '#FFFFFF',
          fontFamily: "'Source Sans 3', sans-serif",
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#1B6FA8',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '26px',
            margin: '0 auto 18px',
            boxShadow: '0 4px 16px rgba(27,111,168,0.4)',
          }}
        >
          🔒
        </div>

        <h2
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: '22px',
            color: '#FFFFFF',
            margin: '0 0 8px',
          }}
        >
          Admin Authentication
        </h2>
        <p style={{ color: '#8FA3B8', fontSize: '14px', margin: '0 0 24px', lineHeight: 1.5 }}>
          Enter your admin passcode or authenticate to unlock in-context portfolio editing.
        </p>

        {errorMsg && (
          <div
            style={{
              background: 'rgba(211,47,47,0.15)',
              border: '1px solid #D32F2F',
              color: '#FF8A80',
              padding: '10px',
              borderRadius: '6px',
              fontSize: '13px',
              marginBottom: '16px',
              fontWeight: 600,
            }}
          >
            {errorMsg}
          </div>
        )}

        <form onSubmit={handlePasscodeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <input
              type="password"
              required
              placeholder="Enter Admin Passcode (e.g. admin)"
              value={passcode}
              onChange={e => {
                setPasscode(e.target.value);
                setErrorMsg('');
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #2A4A68',
                background: '#0B1727',
                color: '#FFFFFF',
                fontSize: '15px',
                textAlign: 'center',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              background: '#1B6FA8',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(27, 111, 168, 0.4)',
              transition: 'background 0.2s ease',
            }}
          >
            Unlock Admin Command Center ⚡
          </button>
        </form>

        <div style={{ margin: '20px 0 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ flex: 1, height: '1px', background: '#1C3A57' }} />
          <span style={{ fontSize: '12px', color: '#5FA8D3', fontWeight: 600 }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#1C3A57' }} />
        </div>

        <button
          type="button"
          onClick={handleNetlifyLogin}
          style={{
            width: '100%',
            background: '#1A3454',
            color: '#FFFFFF',
            border: '1px solid #2A4A68',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <span>🔑 Login with Identity / GitHub</span>
        </button>
      </div>
    </div>
  );
};
