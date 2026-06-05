import React from 'react';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

const EntryDecisionCard = ({ status = 'NOT_ALLOWED' }) => {
  const isAllowed = status === 'ALLOWED';

  return (
    <div className={`entry-decision-card ${isAllowed ? 'allowed' : 'denied'} animate-fadeIn`}>

      {/* Animated background radial */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isAllowed
          ? 'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.08) 0%, transparent 70%)'
          : 'radial-gradient(circle at 50% 50%, rgba(239,68,68,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Icon */}
      <div className="entry-decision-icon">
        {isAllowed ? '✅' : '🚫'}
      </div>

      {/* Main Label */}
      <div className="entry-decision-label">
        {isAllowed ? 'ALLOWED' : 'NOT ALLOWED'}
      </div>

      {/* Subtitle */}
      <div className="entry-decision-sub" style={{ marginBottom: 24 }}>
        {isAllowed ? 'Entry to work zone permitted' : 'Entry to work zone denied'}
      </div>

      {/* Check/Cross */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        padding: '12px 24px',
        borderRadius: 10,
        background: isAllowed ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
        border: `1px solid ${isAllowed ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
        display: 'inline-flex',
      }}>
        {isAllowed
          ? <CheckCircleFilled style={{ fontSize: 20, color: '#10b981' }} />
          : <CloseCircleFilled style={{ fontSize: 20, color: '#ef4444' }} />
        }
        <span style={{
          fontSize: 13,
          fontWeight: 600,
          color: isAllowed ? '#10b981' : '#ef4444',
          letterSpacing: '0.5px',
        }}>
          {isAllowed
            ? 'All critical PPE requirements met'
            : 'PPE compliance below required threshold'
          }
        </span>
      </div>

      {/* Regulatory note */}
      <div style={{
        marginTop: 16,
        fontSize: 11,
        color: 'var(--text-muted)',
        letterSpacing: '0.3px',
      }}>
        Threshold: ≥80% compliance required for entry authorization
      </div>
    </div>
  );
};

export default EntryDecisionCard;
