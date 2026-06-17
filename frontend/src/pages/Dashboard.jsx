import React, { useState } from 'react';
import { Button, message, Divider, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  ExperimentOutlined,
} from '@ant-design/icons';
import UploadSection from '../components/UploadSection.jsx';
import DepartmentSelector from '../components/DepartmentSelector.jsx';
import RequiredPPECard from '../components/RequiredPPECard.jsx';
import DatasetCoverage from '../components/DatasetCoverage.jsx';
import { analyzeCompliance } from '../services/api.js';
import LiveCamera from "../components/LiveCamera";

// ─── Loading Overlay ──────────────────────────────────────────────────────
const LoadingOverlay = ({ isVideo }) => (
  <div className="analysis-loading-overlay">
    <div className="analysis-loading-content">
      <div style={{ position: 'relative', width: 100, height: 100, marginBottom: 8 }}>
        <div className="analysis-loading-ring" style={{ width: 100, height: 100 }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
        }}>
          🔍
        </div>
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 18,
        fontWeight: 700,
        color: 'var(--text-bright)',
        letterSpacing: '1px',
      }}>
        Analyzing PPE Compliance
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
        {isVideo
          ? 'Processing video frames through YOLOv8 model...'
          : 'Running object detection on image...'
        }
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {['Loading Model', 'Extracting Frames', 'Running Detection', 'Computing Score'].map((step, i) => (
          <div key={step} style={{
            fontSize: 11,
            color: 'var(--text-muted)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-card)',
            padding: '4px 10px',
            borderRadius: 4,
            fontFamily: 'monospace',
          }}>
            {step}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Hero Header ──────────────────────────────────────────────────────────
const HeroHeader = () => (
  <div style={{
    textAlign: 'center',
    padding: '48px 24px 36px',
    position: 'relative',
  }}>
    {/* Decorative top line */}
    <div style={{
      width: 60,
      height: 3,
      background: 'linear-gradient(90deg, transparent, var(--brand-primary), transparent)',
      margin: '0 auto 24px',
      borderRadius: 2,
    }} />

    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
      <div style={{
        width: 72,
        height: 72,
        borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(14,165,233,0.05))',
        border: '1px solid rgba(14,165,233,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 36,
        boxShadow: '0 0 40px rgba(14,165,233,0.2)',
        animation: 'glow-pulse 3s ease-in-out infinite',
      }}>
        ⛑️
      </div>
    </div>

    <h1 style={{
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(20px, 4vw, 32px)',
      fontWeight: 800,
      color: 'var(--text-bright)',
      marginBottom: 12,
      letterSpacing: '0.5px',
      lineHeight: 1.2,
    }}>
      AI-Based PPE Compliance Detection System
    </h1>

    <p style={{
      fontSize: 'clamp(13px, 2vw, 15px)',
      color: 'var(--text-secondary)',
      maxWidth: 600,
      margin: '0 auto 20px',
      lineHeight: 1.7,
    }}>
      Automated Personal Protective Equipment Monitoring for Industrial Safety
    </p>

    <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
      {[
        { icon: '🔥', label: 'Blast Furnace' },
        { icon: '⚙️', label: 'Steel Melting' },
        { icon: '🏭', label: 'Rolling Mill' },
        { icon: '🧪', label: 'Coke Oven' },
        { icon: '⚡', label: 'Power Plant' },
        { icon: '🚧', label: 'Raw Materials' },
      ].map(({ icon, label }) => (
        <div key={label} style={{
          fontSize: 11,
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-card)',
          padding: '4px 10px',
          borderRadius: 20,
        }}>
          <span>{icon}</span>
          {label}
        </div>
      ))}
    </div>
  </div>
);

// ─── Dashboard Page ───────────────────────────────────────────────────────
const Dashboard = ({
  onAnalysisComplete,
  selectedFile,
  setSelectedFile,
  selectedDepartment,
  setSelectedDepartment,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const isVideo = selectedFile?.type?.startsWith('video/') || false;

  const handleAnalyze = async () => {
    if (!selectedFile) {
      message.warning('Please upload a video or image file first.');
      return;
    }
    if (!selectedDepartment) {
      message.warning('Please select a department before analyzing.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await analyzeCompliance(selectedFile, selectedDepartment);
      if (response.success) {
        onAnalysisComplete(response.data);
        navigate('/results');
      } else {
    Modal.error({
  title: 'Validation Error',
  content: response.error,
  centered: true,
  className: 'ppe-modal',
});
}
    } catch (err) {
      console.error(err);
      message.error(err.message,15);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div>
      {isAnalyzing && <LoadingOverlay isVideo={isVideo} />}

      <div className="page-container">
        <HeroHeader />

        {/* ── Main Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          marginBottom: 20,
        }}>
          <UploadSection onFileSelected={setSelectedFile} selectedFile={selectedFile} />
          <DepartmentSelector value={selectedDepartment} onChange={setSelectedDepartment} />
        </div>

        {/* ── PPE Requirements Row ── */}
        <div style={{ marginBottom: 20 }}>
          <RequiredPPECard department={selectedDepartment} />
        </div>

        {/* ── Dataset Coverage ── */}
        <div style={{ marginBottom: 32 }}>
          <DatasetCoverage />
        </div>
<div style={{ marginBottom: 20 }}>
  <LiveCamera
    department={selectedDepartment}
  />
</div>
        {/* ── Analyze Button ── */}
        <div style={{
          textAlign: 'center',
          marginBottom: 48,
          padding: '32px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-xl)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative background gradient */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(14,165,233,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Readiness Indicators */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: selectedFile ? 'var(--color-success)' : 'var(--text-muted)',
                  boxShadow: selectedFile ? '0 0 8px var(--color-success)' : 'none',
                  transition: 'all 0.3s ease',
                }} />
                <span style={{ color: selectedFile ? 'var(--color-success)' : 'var(--text-muted)' }}>
                  File Uploaded
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: selectedDepartment ? 'var(--color-success)' : 'var(--text-muted)',
                  boxShadow: selectedDepartment ? '0 0 8px var(--color-success)' : 'none',
                  transition: 'all 0.3s ease',
                }} />
                <span style={{ color: selectedDepartment ? 'var(--color-success)' : 'var(--text-muted)' }}>
                  Department Selected
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: 'var(--color-success)',
                  boxShadow: '0 0 8px var(--color-success)',
                  animation: 'pulse-dot 2s infinite',
                }} />
                <span style={{ color: 'var(--color-success)' }}>
                  AI Model Ready
                </span>
              </div>
            </div>

            <Button
              type="primary"
              size="large"
              icon={<ThunderboltOutlined />}
              onClick={handleAnalyze}
              loading={isAnalyzing}
              disabled={!selectedFile || !selectedDepartment}
              style={{
                height: 56,
                padding: '0 48px',
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: '0.5px',
                borderRadius: 12,
                background: (!selectedFile || !selectedDepartment)
                  ? undefined
                  : 'linear-gradient(135deg, #0ea5e9, #0284c7)',
              }}
            >
              Analyze Compliance
            </Button>

            <p style={{
              marginTop: 14,
              fontSize: 12,
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}>
              <ExperimentOutlined />
              Powered by YOLOv8 Object Detection · {isVideo ? 'Video analysis ~2-5 seconds' : 'Image analysis ~0.5 seconds'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
