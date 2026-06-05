import React from 'react';
import { Divider } from 'antd';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { PPE_ICON_MAP } from '../services/api.js';

const PPEStatusCard = ({ detectedPPE = [], missingPPE = [] }) => {
  return (
    <div className="ppe-card">
      <div className="section-header">
        <div className="section-icon">
          <SafetyCertificateOutlined />
        </div>
        <h3 style={{ margin: 0 }}>PPE Detection Results</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* ── Detected PPE ── */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
            paddingBottom: 10,
            borderBottom: '1px solid var(--color-success-border)',
          }}>
            <CheckCircleFilled style={{ color: 'var(--color-success)', fontSize: 16 }} />
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--color-success)',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
            }}>
              Detected PPE
            </span>
            <span style={{
              marginLeft: 'auto',
              background: 'var(--color-success-bg)',
              border: '1px solid var(--color-success-border)',
              color: 'var(--color-success)',
              borderRadius: 20,
              padding: '1px 8px',
              fontSize: 11,
              fontWeight: 700,
            }}>
              {detectedPPE.length}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {detectedPPE.length === 0 ? (
              <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: '16px 0' }}>
                No PPE detected
              </div>
            ) : (
              detectedPPE.map((item, idx) => (
                <div
                  key={item}
                  className="ppe-status-item detected animate-fadeInUp"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <span style={{ fontSize: 18 }}>{PPE_ICON_MAP[item] || '✅'}</span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{item}</span>
                  <CheckCircleFilled style={{ fontSize: 14 }} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── Missing PPE ── */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
            paddingBottom: 10,
            borderBottom: '1px solid var(--color-danger-border)',
          }}>
            <CloseCircleFilled style={{ color: 'var(--color-danger)', fontSize: 16 }} />
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--color-danger)',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
            }}>
              Missing PPE
            </span>
            <span style={{
              marginLeft: 'auto',
              background: 'var(--color-danger-bg)',
              border: '1px solid var(--color-danger-border)',
              color: 'var(--color-danger)',
              borderRadius: 20,
              padding: '1px 8px',
              fontSize: 11,
              fontWeight: 700,
            }}>
              {missingPPE.length}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {missingPPE.length === 0 ? (
              <div style={{
                fontSize: 13,
                color: 'var(--color-success)',
                textAlign: 'center',
                padding: '16px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
              }}>
                <CheckCircleFilled style={{ fontSize: 24 }} />
                <span>All PPE Worn!</span>
              </div>
            ) : (
              missingPPE.map((item, idx) => (
                <div
                  key={item}
                  className="ppe-status-item missing animate-fadeInUp"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <span style={{ fontSize: 18 }}>{PPE_ICON_MAP[item] || '❌'}</span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{item}</span>
                  <CloseCircleFilled style={{ fontSize: 14 }} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PPEStatusCard;
