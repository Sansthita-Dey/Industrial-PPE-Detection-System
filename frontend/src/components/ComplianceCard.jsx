import React from 'react';
import { Progress, Tooltip } from 'antd';
import { TrophyOutlined, RiseOutlined } from '@ant-design/icons';

const ComplianceCard = ({ score = 0, detected = 0, required = 0 }) => {
  const getScoreColor = (s) => {
    if (s >= 80) return '#10b981';
    if (s >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreLabel = (s) => {
    if (s >= 90) return 'Excellent';
    if (s >= 80) return 'Compliant';
    if (s >= 60) return 'Partial';
    if (s >= 40) return 'Low';
    return 'Critical';
  };

  const color = getScoreColor(score);

  return (
    <div className="ppe-card" style={{ textAlign: 'center' }}>
      <div className="section-header" style={{ justifyContent: 'center', marginBottom: 24 }}>
        <div className="section-icon">
          <TrophyOutlined />
        </div>
        <h3 style={{ margin: 0 }}>Compliance Score</h3>
      </div>

      {/* Circular Progress */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <Progress
          type="circle"
          percent={score}
          size={160}
          strokeWidth={10}
          strokeColor={{
            '0%': color,
            '100%': color === '#10b981' ? '#34d399' : color === '#f59e0b' ? '#fcd34d' : '#f87171',
          }}
          trailColor="rgba(148,163,184,0.1)"
          format={(pct) => (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 32,
                fontWeight: 800,
                color: color,
                lineHeight: 1,
                textShadow: `0 0 20px ${color}60`,
              }}>
                {pct}%
              </div>
              <div style={{
                fontSize: 11,
                color: 'var(--text-muted)',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginTop: 4,
              }}>
                {getScoreLabel(pct)}
              </div>
            </div>
          )}
        />
      </div>

      {/* Stats Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 24,
        padding: '16px 0',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: 16,
      }}>
        <Tooltip title="PPE Items Detected">
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 24,
              fontWeight: 700,
              color: '#10b981',
              fontFamily: 'var(--font-display)',
            }}>
              {detected}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Detected
            </div>
          </div>
        </Tooltip>

        <div style={{ width: 1, background: 'var(--border-subtle)' }} />

        <Tooltip title="Total Required PPE">
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--text-bright)',
              fontFamily: 'var(--font-display)',
            }}>
              {required}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Required
            </div>
          </div>
        </Tooltip>

        <div style={{ width: 1, background: 'var(--border-subtle)' }} />

        <Tooltip title="Missing PPE Items">
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 24,
              fontWeight: 700,
              color: required - detected > 0 ? '#ef4444' : '#10b981',
              fontFamily: 'var(--font-display)',
            }}>
              {Math.max(0, required - detected)}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Missing
            </div>
          </div>
        </Tooltip>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
        <RiseOutlined style={{ color }} />
        Calculated from {required} required PPE items
      </div>
    </div>
  );
};

export default ComplianceCard;
