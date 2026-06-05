import React from 'react';
import { Divider, Tag } from 'antd';
import {
  FileTextOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  BulbOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { DEPARTMENTS, PPE_ICON_MAP } from '../services/api.js';

const SummaryRow = ({ label, children }) => (
  <div className="summary-row">
    <span className="summary-label">{label}</span>
    <div className="summary-value">{children}</div>
  </div>
);

const AnalysisSummary = ({ result }) => {
  if (!result) return null;

  const {
    department,
    department_label,
    required_ppe = [],
    detected_ppe = [],
    missing_ppe = [],
    compliance_score = 0,
    status = 'NOT_ALLOWED',
    timestamp,
    model_version,
  } = result;

  const dept = DEPARTMENTS[department];
  const isAllowed = status === 'ALLOWED';
  const formattedTime = timestamp
    ? new Date(timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'medium' })
    : 'N/A';

  const recommendations = result.recommendations || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Summary Report Card ── */}
      <div className="ppe-card animate-fadeInUp">
        <div className="section-header">
          <div className="section-icon"><FileTextOutlined /></div>
          <div>
            <h3 style={{ margin: 0 }}>Analysis Summary</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
              Auto-generated compliance report
            </p>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Tag style={{
              fontSize: 10,
              color: 'var(--text-muted)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-card)',
              borderRadius: 4,
              fontFamily: 'monospace',
            }}>
              {formattedTime}
            </Tag>
          </div>
        </div>

        <SummaryRow label="Department">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>{dept?.icon || '🏭'}</span>
            <span style={{ fontWeight: 600, color: 'var(--text-bright)' }}>
              {department_label || dept?.label || department}
            </span>
          </div>
        </SummaryRow>

        <SummaryRow label="Required PPE">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {required_ppe.map(item => (
              <span key={item} style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-card)',
                borderRadius: 4,
                padding: '2px 8px',
                fontSize: 12,
                color: 'var(--text-secondary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}>
                {PPE_ICON_MAP[item] || '🔰'} {item}
              </span>
            ))}
          </div>
        </SummaryRow>

        <SummaryRow label="Detected PPE">
          {detected_ppe.length === 0 ? (
            <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>None detected</span>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {detected_ppe.map(item => (
                <span key={item} className="ppe-tag-detected" style={{
                  background: 'var(--color-success-bg)',
                  border: '1px solid var(--color-success-border)',
                  color: 'var(--color-success)',
                  borderRadius: 4,
                  padding: '2px 8px',
                  fontSize: 12,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontWeight: 500,
                }}>
                  <CheckCircleFilled style={{ fontSize: 11 }} />
                  {PPE_ICON_MAP[item] || '✅'} {item}
                </span>
              ))}
            </div>
          )}
        </SummaryRow>

        <SummaryRow label="Missing PPE">
          {missing_ppe.length === 0 ? (
            <span style={{ color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircleFilled /> All items present
            </span>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {missing_ppe.map(item => (
                <span key={item} style={{
                  background: 'var(--color-danger-bg)',
                  border: '1px solid var(--color-danger-border)',
                  color: 'var(--color-danger)',
                  borderRadius: 4,
                  padding: '2px 8px',
                  fontSize: 12,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontWeight: 500,
                }}>
                  <CloseCircleFilled style={{ fontSize: 11 }} />
                  {PPE_ICON_MAP[item] || '❌'} {item}
                </span>
              ))}
            </div>
          )}
        </SummaryRow>

        <SummaryRow label="Compliance Score">
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20,
            fontWeight: 700,
            color: compliance_score >= 80 ? 'var(--color-success)' : compliance_score >= 50 ? 'var(--color-warning)' : 'var(--color-danger)',
          }}>
            {compliance_score}%
          </span>
        </SummaryRow>

        <SummaryRow label="Final Decision">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 6,
            background: isAllowed ? 'var(--color-success-bg)' : 'var(--color-danger-bg)',
            border: `1px solid ${isAllowed ? 'var(--color-success-border)' : 'var(--color-danger-border)'}`,
          }}>
            {isAllowed
              ? <CheckCircleFilled style={{ color: 'var(--color-success)', fontSize: 16 }} />
              : <CloseCircleFilled style={{ color: 'var(--color-danger)', fontSize: 16 }} />
            }
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '1px',
              color: isAllowed ? 'var(--color-success)' : 'var(--color-danger)',
            }}>
              {isAllowed ? 'ALLOWED' : 'NOT ALLOWED'}
            </span>
          </div>
        </SummaryRow>

        <SummaryRow label="AI Model">
          <span style={{
            fontFamily: 'monospace',
            fontSize: 12,
            color: 'var(--text-muted)',
            background: 'var(--bg-elevated)',
            padding: '2px 8px',
            borderRadius: 4,
            border: '1px solid var(--border-card)',
          }}>
            {model_version || 'YOLOv8-PPE-v2.1.0'}
          </span>
        </SummaryRow>
      </div>

      {/* ── Safety Recommendations ── */}
      {recommendations.length > 0 && (
        <div className="ppe-card animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div className="section-header">
            <div className="section-icon" style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', color: 'var(--color-warning)' }}>
              <BulbOutlined />
            </div>
            <div>
              <h3 style={{ margin: 0 }}>Safety Recommendations</h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
                Corrective actions to achieve full compliance
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="recommendation-item animate-slideInLeft"
                style={{ animationDelay: `${idx * 0.07}s` }}
              >
                <InfoCircleOutlined className="rec-icon" />
                <span className="rec-text">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisSummary;
