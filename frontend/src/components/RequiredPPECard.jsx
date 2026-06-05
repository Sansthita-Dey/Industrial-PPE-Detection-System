import React from 'react';
import { Tooltip, Tag } from 'antd';
import { CheckCircleFilled, SafetyOutlined } from '@ant-design/icons';
import { DEPARTMENTS, PPE_ICON_MAP } from '../services/api.js';

const RequiredPPECard = ({ department }) => {
  if (!department) {
    return (
      <div className="ppe-card animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
        <div className="section-header">
          <div className="section-icon"><SafetyOutlined /></div>
          <div>
            <h3 style={{ margin: 0 }}>Required PPE</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>PPE requirements per department</p>
          </div>
        </div>
        <div style={{
          textAlign: 'center',
          padding: '32px 20px',
          color: 'var(--text-muted)',
          border: '1px dashed var(--border-subtle)',
          borderRadius: 10,
          fontSize: 13,
        }}>
          <SafetyOutlined style={{ fontSize: 36, opacity: 0.3, display: 'block', marginBottom: 10 }} />
          Select a department to view required PPE
        </div>
      </div>
    );
  }

  const dept = DEPARTMENTS[department];
  if (!dept) return null;

  return (
    <div className="ppe-card animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
      <div className="section-header">
        <div className="section-icon">
          <SafetyOutlined />
        </div>
        <div>
          <h3 style={{ margin: 0 }}>Required PPE</h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
            {dept.label} — Mandatory Equipment
          </p>
        </div>
        <Tag style={{
          marginLeft: 'auto',
          background: `${dept.color}18`,
          border: `1px solid ${dept.color}45`,
          color: dept.color,
          fontWeight: 700,
          borderRadius: 20,
          padding: '2px 10px',
        }}>
          {dept.required_ppe.length} MANDATORY
        </Tag>
      </div>

      {/* PPE Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {dept.required_ppe.map((item, idx) => (
          <div
            key={item}
            className="ppe-required-item animate-slideInLeft"
            style={{ animationDelay: `${idx * 0.06}s` }}
          >
            <span className="item-icon">{PPE_ICON_MAP[item] || '🔰'}</span>
            <span className="item-name">{item}</span>
            <Tooltip title="Mandatory PPE">
              <CheckCircleFilled className="item-check" />
            </Tooltip>
            <Tag style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.5px',
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.3)',
              color: '#10b981',
              borderRadius: 4,
              padding: '0 6px',
            }}>
              REQUIRED
            </Tag>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div style={{
        marginTop: 16,
        padding: '10px 14px',
        background: 'rgba(245, 158, 11, 0.07)',
        border: '1px solid rgba(245, 158, 11, 0.2)',
        borderRadius: 8,
        display: 'flex',
        gap: 8,
        alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: 14, flexShrink: 0 }}>⚠️</span>
        <span style={{ fontSize: 12, color: 'var(--color-warning)', lineHeight: 1.5 }}>
          All listed PPE items are mandatory per industrial safety regulations.
          Failure to comply may result in restricted entry.
        </span>
      </div>
    </div>
  );
};

export default RequiredPPECard;
