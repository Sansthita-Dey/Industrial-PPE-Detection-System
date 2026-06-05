import React from 'react';
import { Tooltip } from 'antd';
import {
  PlayCircleOutlined,
  CheckSquareOutlined,
  WarningOutlined,
  BarChartOutlined,
  FieldTimeOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const StatItem = ({ icon, color, value, label, bgIcon, delay = '0s' }) => (
  <div
    className="stat-card animate-fadeInUp"
    style={{ animationDelay: delay }}
  >
    <div className="stat-icon" style={{ color }}>{icon}</div>
    <div className="stat-value" style={{ color: 'var(--text-bright)' }}>{value.toLocaleString()}</div>
    <div className="stat-label">{label}</div>
    <div className="stat-bg-icon">{bgIcon}</div>
  </div>
);

const DetectionStatistics = ({ data = {} }) => {
  const {
    frames_analyzed = 0,
    frames_with_compliance = 0,
    frames_with_violations = 0,
    compliance_percentage = 0,
    processing_time_seconds = 0,
    model_version = 'N/A',
  } = data;

  const stats = [
    {
      icon: <PlayCircleOutlined />,
      color: 'var(--brand-primary)',
      value: frames_analyzed,
      label: 'Total Frames Analyzed',
      bgIcon: <VideoCameraOutlined />,
    },
    {
      icon: <CheckSquareOutlined />,
      color: 'var(--color-success)',
      value: frames_with_compliance,
      label: 'Frames With Compliance',
      bgIcon: <CheckSquareOutlined />,
    },
    {
      icon: <WarningOutlined />,
      color: 'var(--color-danger)',
      value: frames_with_violations,
      label: 'Frames With Violations',
      bgIcon: <WarningOutlined />,
    },
    {
      icon: <BarChartOutlined />,
      color: compliance_percentage >= 80 ? 'var(--color-success)' : compliance_percentage >= 50 ? 'var(--color-warning)' : 'var(--color-danger)',
      value: compliance_percentage,
      label: 'Compliance Percentage (%)',
      bgIcon: <BarChartOutlined />,
    },
  ];

  return (
    <div className="ppe-card">
      <div className="section-header" style={{ marginBottom: 20 }}>
        <div className="section-icon"><BarChartOutlined /></div>
        <div>
          <h3 style={{ margin: 0 }}>Detection Statistics</h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
            Frame-by-frame analysis summary
          </p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 16, alignItems: 'center' }}>
          <Tooltip title="AI Model Version">
            <div style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-card)',
              padding: '3px 10px',
              borderRadius: 4,
              fontFamily: 'monospace',
            }}>
              {model_version}
            </div>
          </Tooltip>
          {processing_time_seconds > 0 && (
            <Tooltip title="Processing Time">
              <div style={{
                fontSize: 11,
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}>
                <FieldTimeOutlined />
                {processing_time_seconds}s
              </div>
            </Tooltip>
          )}
        </div>
      </div>

      <div className="grid-4" style={{ gap: 12 }}>
        {stats.map((s, i) => (
          <StatItem key={i} {...s} delay={`${i * 0.08}s`} />
        ))}
      </div>

      {/* Visual compliance bar */}
      {frames_analyzed > 0 && (
        <div style={{ marginTop: 20 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 12,
            color: 'var(--text-muted)',
            marginBottom: 8,
          }}>
            <span>Compliant Frames</span>
            <span>Violation Frames</span>
          </div>
          <div style={{
            height: 10,
            borderRadius: 5,
            background: 'rgba(148,163,184,0.1)',
            overflow: 'hidden',
            display: 'flex',
          }}>
            <div style={{
              width: `${compliance_percentage}%`,
              background: 'linear-gradient(90deg, #10b981, #34d399)',
              transition: 'width 1s ease',
            }} />
            <div style={{
              flex: 1,
              background: 'linear-gradient(90deg, #ef4444, #f87171)',
            }} />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 11,
            color: 'var(--text-muted)',
            marginTop: 4,
          }}>
            <span style={{ color: 'var(--color-success)' }}>{compliance_percentage}%</span>
            <span style={{ color: 'var(--color-danger)' }}>{100 - compliance_percentage}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetectionStatistics;
