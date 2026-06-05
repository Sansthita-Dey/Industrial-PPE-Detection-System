import React, { useState, useEffect } from 'react';
import { Badge, Tooltip } from 'antd';
import {
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  WifiOutlined,
  AlertOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { DEPARTMENTS } from '../services/api.js';

const Navbar = ({ selectedDepartment }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemOnline] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => date.toLocaleTimeString('en-IN', { hour12: false });
  const formatDate = (date) => date.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  const dept = selectedDepartment ? DEPARTMENTS[selectedDepartment] : null;

  return (
    <header style={{
      background: 'linear-gradient(180deg, rgba(10, 22, 40, 0.98) 0%, rgba(6, 13, 26, 0.95) 100%)',
      borderBottom: '1px solid rgba(14, 165, 233, 0.15)',
      backdropFilter: 'blur(20px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
    }}>
      <div className="page-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 70,
        gap: 16,
      }}>

        {/* ── Brand ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(14, 165, 233, 0.4)',
            flexShrink: 0,
          }}>
            <SafetyCertificateOutlined style={{ fontSize: 22, color: '#fff' }} />
          </div>

          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 14,
              fontWeight: 700,
              color: '#e2e8f0',
              letterSpacing: '0.5px',
              lineHeight: 1.2,
            }}>
              AI PPE Compliance
            </div>
            <div style={{
              fontSize: 10,
              color: 'var(--text-muted)',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}>
              Detection System v2.1
            </div>
          </div>
        </div>

        {/* ── Active Department Badge ── */}
        {dept && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>{dept.icon}</span>
            <div style={{
              background: 'rgba(14, 165, 233, 0.1)',
              border: '1px solid rgba(14, 165, 233, 0.25)',
              borderRadius: 20,
              padding: '4px 14px',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--brand-primary)',
              letterSpacing: '0.3px',
            }}>
              {dept.label}
            </div>
          </div>
        )}

        {/* ── Right Controls ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'flex-end' }}>

          {/* System Status */}
          <Tooltip title={systemOnline ? 'AI System Online' : 'System Offline'}>
            <div className={`status-badge ${systemOnline ? 'online' : 'offline'}`}>
              <span className="pulse-dot" />
              <WifiOutlined />
              <span style={{ fontSize: 11 }}>{systemOnline ? 'ONLINE' : 'OFFLINE'}</span>
            </div>
          </Tooltip>

          {/* Clock */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 1,
          }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '0.5px',
            }}>
              <ClockCircleOutlined style={{ marginRight: 5, fontSize: 11, opacity: 0.6 }} />
              {formatTime(currentTime)}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.3px' }}>
              {formatDate(currentTime)}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sub-bar ── */}
      <div style={{
        background: 'rgba(14, 165, 233, 0.04)',
        borderTop: '1px solid rgba(14, 165, 233, 0.08)',
        padding: '6px 0',
      }}>
        <div className="page-container" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 11,
          color: 'var(--text-muted)',
          letterSpacing: '0.5px',
        }}>
          <DashboardOutlined style={{ fontSize: 11 }} />
          <span>INDUSTRIAL SAFETY MONITORING PLATFORM</span>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
            <AlertOutlined style={{ color: 'var(--color-warning)', fontSize: 11 }} />
            ZERO HARM POLICY IN EFFECT
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
