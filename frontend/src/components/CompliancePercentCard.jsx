import React from 'react';
import { PercentageOutlined } from '@ant-design/icons';

const CompliancePercentCard = ({ percentage = 0, framesAnalyzed = 0, framesCompliant = 0 }) => {
  const getColor = (p) => {
    if (p >= 80) return { primary: '#10b981', secondary: '#34d399', glow: 'rgba(16,185,129,0.25)' };
    if (p >= 50) return { primary: '#f59e0b', secondary: '#fcd34d', glow: 'rgba(245,158,11,0.25)' };
    return { primary: '#ef4444', secondary: '#f87171', glow: 'rgba(239,68,68,0.25)' };
  };

  const colors = getColor(percentage);

  const getGrade = (p) => {
    if (p >= 90) return { grade: 'A+', label: 'Exceptional' };
    if (p >= 80) return { grade: 'A', label: 'Compliant' };
    if (p >= 70) return { grade: 'B', label: 'Acceptable' };
    if (p >= 50) return { grade: 'C', label: 'Marginal' };
    return { grade: 'F', label: 'Non-Compliant' };
  };

  const { grade, label } = getGrade(percentage);

  return (
    <div className="compliance-percent-card" style={{
      boxShadow: `0 0 40px ${colors.glow}`,
      border: `1px solid ${colors.primary}30`,
    }}>

      {/* Icon */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 8,
      }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          background: `${colors.primary}18`,
          border: `1px solid ${colors.primary}35`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <PercentageOutlined style={{ fontSize: 18, color: colors.primary }} />
        </div>
      </div>

      {/* Title */}
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        marginBottom: 4,
      }}>
        Compliance Rate
      </div>

      {/* Big Number */}
      <div className="compliance-percent-value" style={{
        background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textShadow: 'none',
        filter: `drop-shadow(0 0 16px ${colors.glow})`,
      }}>
        {percentage}%
      </div>

      {/* Grade Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        marginBottom: 16,
        padding: '4px 14px',
        borderRadius: 20,
        background: `${colors.primary}18`,
        border: `1px solid ${colors.primary}35`,
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 14,
          fontWeight: 800,
          color: colors.primary,
        }}>
          {grade}
        </span>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          {label}
        </span>
      </div>

      {/* Mini Stats */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 20,
        paddingTop: 14,
        borderTop: '1px solid var(--border-subtle)',
        fontSize: 12,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: colors.primary, fontFamily: 'var(--font-display)' }}>
            {framesCompliant}
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Compliant
          </div>
        </div>
        <div style={{ width: 1, background: 'var(--border-subtle)' }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-bright)', fontFamily: 'var(--font-display)' }}>
            {framesAnalyzed}
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Total Frames
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompliancePercentCard;
