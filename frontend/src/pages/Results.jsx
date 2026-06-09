import React from 'react';
import { Button, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons';
import ComplianceCard from '../components/ComplianceCard.jsx';
import EntryDecisionCard from '../components/EntryDecisionCard.jsx';
import PPEStatusCard from '../components/PPEStatusCard.jsx';
import DatasetCoverage from '../components/DatasetCoverage.jsx';
import { DEPARTMENTS } from '../services/api.js';

// ─── No Result Fallback ───────────────────────────────────────────────────
const NoResult = ({ navigate }) => (
  <div className="page-container" style={{ textAlign: 'center', padding: '80px 24px' }}>
    <div style={{ fontSize: 64, marginBottom: 20 }}>📊</div>
    <h2 style={{ color: 'var(--text-bright)', marginBottom: 12 }}>No Analysis Results</h2>
    <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 15 }}>
      Please go back to the dashboard, upload a file, and run an analysis.
    </p>
    <Button
      type="primary"
      size="large"
      icon={<ArrowLeftOutlined />}
      onClick={() => navigate('/')}
      style={{ borderRadius: 10, height: 48, padding: '0 32px' }}
    >
      Back to Dashboard
    </Button>
  </div>
);

// ─── Results Header ───────────────────────────────────────────────────────
const ResultsHeader = ({ result, navigate }) => {
  const dept = DEPARTMENTS[result?.department];
  const isAllowed = result?.status === 'ALLOWED';

  return (
    <div style={{
      padding: '28px 0 20px',
      borderBottom: '1px solid var(--border-subtle)',
      marginBottom: 28,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        {/* Back Button */}
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/')}
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-card)',
            color: 'var(--text-secondary)',
            borderRadius: 8,
          }}
        >
          New Analysis
        </Button>

        <div style={{ flex: 1, minWidth: 200 }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(16px, 2.5vw, 22px)',
            fontWeight: 700,
            color: 'var(--text-bright)',
            margin: 0,
            lineHeight: 1.2,
          }}>
            Compliance Analysis Results
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 12, margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: 8 }}>
            {dept && <span>{dept.icon} {dept.label}</span>}
            <span>·</span>
            <span>{new Date(result.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
          </p>
        </div>

        {/* Final Status Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 20px',
          borderRadius: 10,
          background: isAllowed ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
          border: `1px solid ${isAllowed ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
        }}>
          <span style={{ fontSize: 20 }}>{isAllowed ? '✅' : '🚫'}</span>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              fontWeight: 800,
              color: isAllowed ? '#10b981' : '#ef4444',
              letterSpacing: '1px',
            }}>
              {isAllowed ? 'ALLOWED' : 'NOT ALLOWED'}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Entry Decision</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Results Page ─────────────────────────────────────────────────────────
const Results = ({ result }) => {
  const navigate = useNavigate();

  if (!result) return <NoResult navigate={navigate} />;

  const {
    detected_ppe = [],
    missing_ppe = [],
    required_ppe = [],
    compliance_score = 0,
    compliance_percentage = 0,
    status = 'NOT_ALLOWED',
    frames_analyzed = 0,
    frames_with_compliance = 0,
    frames_with_violations = 0,
    frame_images = [],
  } = result;

  return (
    <div>
      <div className="page-container page-content">
        <ResultsHeader result={result} navigate={navigate} />

        {/* ── Row 1: Entry Decision (full width) ── */}
        <div style={{ marginBottom: 20 }}>
          <EntryDecisionCard status={status} />
        </div>

        {/* ── Row 2: Compliance Score ── */}
<div style={{ marginBottom: 20 }}>
  <ComplianceCard
    score={compliance_score}
    detected={detected_ppe.length}
    required={required_ppe.length}
  />
</div>
          

        {/* ── Row 3: PPE Status (full width) ── */}
        <div style={{ marginBottom: 20 }}>
          <PPEStatusCard
            detectedPPE={detected_ppe}
            missingPPE={missing_ppe}
          />
        </div>

        

        {/* ── Row 7: Dataset Coverage ── */}
        <div style={{ marginBottom: 36 }}>
          <DatasetCoverage />
        </div>

        {/* ── Action Bar ── */}
        <div style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          padding: '24px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: 24,
        }}>
          <Button
            type="primary"
            size="large"
            icon={<ReloadOutlined />}
            onClick={() => navigate('/')}
            style={{ height: 48, padding: '0 32px', borderRadius: 10 }}
          >
            Run New Analysis
          </Button>
          <Button
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/')}
            style={{
              height: 48,
              padding: '0 24px',
              borderRadius: 10,
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-card)',
              color: 'var(--text-secondary)',
            }}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
