import React from 'react';
import { Tooltip } from 'antd';
import { DatabaseOutlined, CheckCircleFilled, WarningFilled } from '@ant-design/icons';
import { MODEL_COVERAGE } from '../services/api.js';

const DatasetCoverage = () => {
  return (
    <div className="ppe-card animate-fadeInUp" style={{ animationDelay: '0.25s' }}>
      <div className="section-header">
        <div className="section-icon" style={{
          background: 'rgba(245,158,11,0.12)',
          border: '1px solid rgba(245,158,11,0.3)',
          color: 'var(--color-warning)',
        }}>
          <DatabaseOutlined />
        </div>
        <div>
          <h3 style={{ margin: 0 }}>Dataset Coverage</h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
            AI model detection capabilities
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* ── Detectable ── */}
        <div>
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--color-success)',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <CheckCircleFilled />
            Detected by AI Model
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {MODEL_COVERAGE.detectable.map((item) => (
              <div key={item.id} className="dataset-item available">
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span>{item.label}</span>
                <CheckCircleFilled style={{ marginLeft: 'auto', fontSize: 12 }} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Not Detectable ── */}
        <div>
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--color-warning)',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <WarningFilled />
            Not In Dataset
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {MODEL_COVERAGE.not_detectable.map((item) => (
              <Tooltip
                key={item.id}
                title="Not detectable by current model version"
                placement="left"
              >
                <div className="dataset-item unavailable" style={{ cursor: 'help' }}>
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  <span>{item.label}</span>
                  <WarningFilled style={{ marginLeft: 'auto', fontSize: 12 }} />
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{
        marginTop: 16,
        padding: '12px 14px',
        background: 'rgba(245,158,11,0.07)',
        border: '1px solid rgba(245,158,11,0.2)',
        borderRadius: 8,
        fontSize: 12,
        color: 'var(--color-warning)',
        lineHeight: 1.6,
      }}>
        <WarningFilled style={{ marginRight: 6 }} />
        <strong>Dataset Limitation Notice:</strong> PPE items listed under "Not In Dataset" are required by
        certain departments but are <em>not currently detectable</em> by the trained model due to insufficient
        training data. Future model versions will expand coverage.
      </div>
    </div>
  );
};

export default DatasetCoverage;
