import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { authApi } from '../services/api';
import { ShieldAlert, AlertTriangle, CheckCircle2, Lock } from 'lucide-react';

export default function SystemWarningModal() {
  const { user, refreshUser } = useAuth();
  const [acknowledging, setAcknowledging] = useState(false);

  if (!user || !user.systemWarnings || user.systemWarnings.length === 0) {
    return null;
  }

  // Find all unacknowledged warnings
  const pendingWarnings = user.systemWarnings.filter((w) => !w.acknowledged);
  if (pendingWarnings.length === 0) {
    return null;
  }

  const activeWarning = pendingWarnings[0];

  const handleAcknowledge = async () => {
    setAcknowledging(true);
    try {
      await authApi.acknowledgeWarning();
      if (refreshUser) await refreshUser();
    } catch (err) {
      console.error('Failed to acknowledge warning', err);
    } finally {
      setAcknowledging(false);
    }
  };

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'strike':
      case 'final_warning':
        return {
          badge: 'rgba(239, 68, 68, 0.2)',
          border: '1px solid #ef4444',
          color: '#ef4444',
          title: 'FORMAL DISCIPLINARY STRIKE',
        };
      default:
        return {
          badge: 'rgba(245, 158, 11, 0.2)',
          border: '1px solid #f59e0b',
          color: '#f59e0b',
          title: 'OFFICIAL SYSTEM DIRECTIVE',
        };
    }
  };

  const style = getSeverityStyle(activeWarning.severity);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: '560px',
          width: '100%',
          border: style.border,
          boxShadow: `0 0 50px ${style.color}25`,
          background: 'linear-gradient(180deg, #12151c 0%, #0a0c10 100%)',
          padding: '32px',
          borderRadius: '16px',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: style.badge,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: style.color,
            }}
          >
            <ShieldAlert size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '1.2px',
                  color: style.color,
                  textTransform: 'uppercase',
                }}
              >
                {style.title}
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#94a3b8',
                }}
              >
                {new Date(activeWarning.createdAt || activeWarning.issuedAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0 0 0', color: '#f8fafc' }}>
              Governance Notice for {user.name}
            </h2>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '18px 20px',
            marginBottom: '20px',
            fontSize: '0.92rem',
            lineHeight: 1.6,
            color: '#e2e8f0',
            whiteSpace: 'pre-wrap',
            fontFamily: 'inherit',
          }}
        >
          {activeWarning.message}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            fontSize: '0.78rem',
            color: '#94a3b8',
            marginBottom: '24px',
            lineHeight: 1.5,
          }}
        >
          <Lock size={15} style={{ flexShrink: 0, marginTop: '2px', color: '#64748b' }} />
          <span>
            This warning has been officially registered on your permanent developer profile. Continued irregular telemetry, unauthorized automation, or fair-play violations will trigger immediate leaderboard disqualification and account termination.
          </span>
        </div>

        <button
          type="button"
          onClick={handleAcknowledge}
          disabled={acknowledging}
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '14px',
            fontWeight: 700,
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: style.color,
            color: '#000',
            border: 'none',
          }}
        >
          <CheckCircle2 size={18} />
          {acknowledging ? 'Logging Acknowledgment...' : 'I Acknowledge & Accept Terms'}
        </button>
      </div>
    </div>
  );
}
