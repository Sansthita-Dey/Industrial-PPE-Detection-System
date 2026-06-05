import React, { useState } from 'react';
import { Modal, Tag } from 'antd';
import { AppstoreOutlined, ZoomInOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

// Generate a canvas-based placeholder image for demo frames
const generatePlaceholderFrame = (index, compliant, color) => {
  // Return an SVG data URL as a colorful placeholder
  const bg = compliant ? '#0a2420' : '#210a0a';
  const accent = compliant ? '#10b981' : '#ef4444';
  const label = compliant ? 'COMPLIANT' : 'VIOLATION';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180">
      <rect width="320" height="180" fill="${bg}"/>
      <rect x="0" y="0" width="320" height="3" fill="${accent}" opacity="0.6"/>
      <rect x="0" y="177" width="320" height="3" fill="${accent}" opacity="0.6"/>
      <text x="160" y="70" text-anchor="middle" font-family="monospace" font-size="11" fill="${accent}" opacity="0.4">CCTV FRAME #${String(index).padStart(3,'0')}</text>
      <rect x="120" y="80" width="80" height="20" rx="4" fill="${accent}" opacity="0.15" stroke="${accent}" stroke-width="1" stroke-opacity="0.4"/>
      <text x="160" y="94" text-anchor="middle" font-family="monospace" font-size="9" fill="${accent}" font-weight="bold">${label}</text>
      <text x="160" y="130" text-anchor="middle" font-family="monospace" font-size="9" fill="${accent}" opacity="0.3">AI DETECTION ACTIVE</text>
      <circle cx="160" cy="50" r="16" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.3"/>
      <text x="160" y="55" text-anchor="middle" font-size="14" fill="${accent}" opacity="0.5">${compliant ? '✓' : '✕'}</text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const FrameGallery = ({ frames = [] }) => {
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openFrame = (frame) => {
    setSelectedFrame(frame);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedFrame(null);
  };

  if (!frames || frames.length === 0) {
    return (
      <div className="ppe-card">
        <div className="section-header">
          <div className="section-icon"><AppstoreOutlined /></div>
          <h3 style={{ margin: 0 }}>Frame Gallery</h3>
        </div>
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: 'var(--text-muted)',
          border: '1px dashed var(--border-subtle)',
          borderRadius: 10,
          fontSize: 13,
        }}>
          <AppstoreOutlined style={{ fontSize: 36, opacity: 0.3, display: 'block', marginBottom: 10 }} />
          No frames to display
        </div>
      </div>
    );
  }

  return (
    <div className="ppe-card">
      <div className="section-header" style={{ marginBottom: 20 }}>
        <div className="section-icon"><AppstoreOutlined /></div>
        <div>
          <h3 style={{ margin: 0 }}>Frame Gallery</h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
            Click any frame to enlarge
          </p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <Tag style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', borderRadius: 4, fontSize: 11 }}>
            ✓ {frames.filter(f => f.compliant).length} Compliant
          </Tag>
          <Tag style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', borderRadius: 4, fontSize: 11 }}>
            ✕ {frames.filter(f => !f.compliant).length} Violation
          </Tag>
        </div>
      </div>

      {/* Grid */}
      <div className="frame-grid">
        {frames.map((frame, idx) => {
          const src = frame.url || generatePlaceholderFrame(frame.id, frame.compliant, frame.color);
          return (
            <div
              key={frame.id}
              className="frame-item animate-fadeIn"
              style={{ animationDelay: `${idx * 0.04}s` }}
              onClick={() => openFrame({ ...frame, src })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openFrame({ ...frame, src })}
              aria-label={`View ${frame.label}`}
            >
              <img src={src} alt={frame.label} loading="lazy" />

              {/* Status badge overlay */}
              <div style={{
                position: 'absolute',
                top: 6,
                left: 6,
                background: frame.compliant ? 'rgba(16,185,129,0.85)' : 'rgba(239,68,68,0.85)',
                borderRadius: 4,
                padding: '2px 6px',
                fontSize: 10,
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '0.5px',
                backdropFilter: 'blur(4px)',
              }}>
                {frame.compliant ? '✓ OK' : '✕ VIOL'}
              </div>

              {/* Frame label */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                padding: '8px 8px 6px',
                fontSize: 10,
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'monospace',
              }}>
                {frame.label}
              </div>

              {/* Hover overlay */}
              <div className="frame-overlay">
                <ZoomInOutlined style={{ fontSize: 28, color: '#fff' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
        width={800}
        centered
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: 'var(--text-bright)', fontSize: 14, fontWeight: 600 }}>
              {selectedFrame?.label}
            </span>
            {selectedFrame && (
              selectedFrame.compliant
                ? <Tag icon={<CheckCircleFilled />} style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.4)', color: '#10b981', borderRadius: 4 }}>COMPLIANT</Tag>
                : <Tag icon={<CloseCircleFilled />} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#ef4444', borderRadius: 4 }}>VIOLATION</Tag>
            )}
          </div>
        }
      >
        {selectedFrame && (
          <div>
            <img
              src={selectedFrame.src}
              alt={selectedFrame.label}
              style={{
                width: '100%',
                borderRadius: 10,
                border: `2px solid ${selectedFrame.compliant ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
              }}
            />
            <div style={{
              marginTop: 12,
              padding: '10px 14px',
              background: 'var(--bg-elevated)',
              borderRadius: 8,
              fontSize: 12,
              color: 'var(--text-muted)',
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <span>Frame ID: #{selectedFrame.id}</span>
              <span>Status: {selectedFrame.compliant ? '✓ PPE Compliant' : '✕ PPE Violation Detected'}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FrameGallery;
