import React from 'react';
import { Divider } from 'antd';
import { SafetyCertificateOutlined, GithubOutlined, MailOutlined } from '@ant-design/icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'linear-gradient(180deg, rgba(6,13,26,0) 0%, rgba(6,13,26,1) 100%)',
      borderTop: '1px solid rgba(14, 165, 233, 0.1)',
      padding: '32px 0 20px',
      marginTop: 'auto',
    }}>
      <div className="page-container">

        {/* Top Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 32,
          marginBottom: 28,
        }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <SafetyCertificateOutlined style={{ color: '#fff', fontSize: 18 }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-bright)', fontFamily: 'var(--font-display)' }}>
                  AI PPE Detection
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                  Compliance System v2.1
                </div>
              </div>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 280 }}>
              Automated Personal Protective Equipment monitoring using computer vision
              and deep learning for industrial safety compliance.
            </p>
          </div>

          {/* Departments */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12 }}>
              Covered Departments
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { icon: '🔥', label: 'Blast Furnace' },
                { icon: '⚙️', label: 'Steel Melting Shop' },
                { icon: '🏭', label: 'Rolling Mill' },
                { icon: '🧪', label: 'Coke Oven Plant' },
                { icon: '⚡', label: 'Power Plant' },
                { icon: '🚧', label: 'Raw Material Handling' },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Safety Policy */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12 }}>
              Safety Standards
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'IS 2925 - Industrial Safety Helmets',
                'IS 6994 - Safety Footwear',
                'IS 4770 - Safety Gloves',
                'DGMS Safety Circulars',
                'Factory Act Compliance',
                'Zero Harm Policy',
              ].map(item => (
                <div key={item} style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: 'var(--brand-primary)', fontSize: 10 }}>▸</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Divider style={{ borderColor: 'rgba(148,163,184,0.08)', margin: '0 0 16px' }} />

        {/* Safety Slogan Banner */}
        <div style={{
          background: 'linear-gradient(90deg, rgba(14,165,233,0.05) 0%, rgba(14,165,233,0.1) 50%, rgba(14,165,233,0.05) 100%)',
          border: '1px solid rgba(14,165,233,0.15)',
          borderRadius: 8,
          padding: '12px 20px',
          textAlign: 'center',
          marginBottom: 16,
        }}>
          <p style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--brand-primary)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-display)',
          }}>
            ⚠️ &nbsp; Safety is Not an Option — It Is a Responsibility &nbsp; ⚠️
          </p>
        </div>

        {/* Bottom Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 11,
          color: 'var(--text-muted)',
          flexWrap: 'wrap',
          gap: 8,
        }}>
          <span>
            © {currentYear} AI PPE Compliance Detection System · Industrial Safety Division
          </span>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <span>Built by Sansthita</span>
            <span style={{ color: 'var(--border-card)' }}>|</span>
            <span>YOLOv8 · React · FastAPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
