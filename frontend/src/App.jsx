import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ConfigProvider, theme, App as AntApp } from 'antd';
import Dashboard from './pages/Dashboard.jsx';
import Results from './pages/Results.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import './index.css';

// ─── Ant Design Industrial Dark Theme ────────────────────────────────────
const industrialTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#0ea5e9',
    colorBgBase: '#060d1a',
    colorBgContainer: '#0e1f38',
    colorBgElevated: '#162b47',
    colorBgLayout: '#060d1a',
    colorBorder: 'rgba(148, 163, 184, 0.1)',
    colorBorderSecondary: 'rgba(148, 163, 184, 0.06)',
    colorText: '#e2e8f0',
    colorTextSecondary: '#94a3b8',
    colorTextTertiary: '#64748b',
    colorSuccess: '#10b981',
    colorError: '#ef4444',
    colorWarning: '#f59e0b',
    colorInfo: '#0ea5e9',
    borderRadius: 10,
    borderRadiusLG: 16,
    borderRadiusSM: 6,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 14,
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
    boxShadowSecondary: '0 2px 8px rgba(0, 0, 0, 0.4)',
    controlHeight: 40,
    controlHeightLG: 48,
    lineWidth: 1,
    wireframe: false,
  },
  components: {
    Button: {
      primaryColor: '#ffffff',
      colorPrimary: '#0ea5e9',
      colorPrimaryHover: '#38bdf8',
      colorPrimaryActive: '#0284c7',
      borderRadius: 8,
      controlHeight: 44,
      controlHeightLG: 52,
      fontSizeLG: 16,
    },
    Select: {
      colorBgContainer: '#162b47',
      colorBorder: 'rgba(14, 165, 233, 0.25)',
      controlHeight: 44,
      optionSelectedBg: 'rgba(14, 165, 233, 0.12)',
      optionActiveBg: 'rgba(14, 165, 233, 0.06)',
    },
    Upload: {
      colorBgContainer: '#162b47',
    },
    Card: {
      colorBgContainer: '#0e1f38',
      colorBorderSecondary: 'rgba(148, 163, 184, 0.1)',
    },
    Progress: {
      defaultColor: '#0ea5e9',
      remainingColor: 'rgba(148, 163, 184, 0.12)',
    },
    Modal: {
      contentBg: '#0a1628',
      headerBg: '#0a1628',
    },
    Tag: {
      borderRadius: 6,
    },
    Tooltip: {
      colorBgSpotlight: '#162b47',
    },
  },
};

// ─── Scan Line Effect ─────────────────────────────────────────────────────
const ScanLine = () => <div className="scan-overlay" aria-hidden="true" />;

// ─── App Content (with Router context) ───────────────────────────────────
function AppContent() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScanLine />
      <Navbar selectedDepartment={selectedDepartment} />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                onAnalysisComplete={handleAnalysisComplete}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                selectedDepartment={selectedDepartment}
                setSelectedDepartment={setSelectedDepartment}
              />
            }
          />
          <Route
            path="/results"
            element={
              <Results
                result={analysisResult}
                selectedDepartment={selectedDepartment}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────
function App() {
  return (
    <ConfigProvider theme={industrialTheme}>
      <AntApp>
        <Router>
          <AppContent />
        </Router>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
