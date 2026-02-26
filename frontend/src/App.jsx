import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Pages
import Dashboard from './pages/Dashboard';
import CircularGeneratorNew from './pages/CircularGeneratorNew';
import ProposalGeneratorNew from './pages/ProposalGeneratorNew';
import ReportGeneratorNew from './pages/ReportGeneratorNew';

// Fallback old pages for backwards compatibility
import CircularPage from './pages/CircularPage';
import ProposalPage from './pages/ProposalPage';
import ReportPage from './pages/ReportPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* New SaaS-style generators */}
        <Route path="/circular" element={<CircularGeneratorNew />} />
        <Route path="/proposal" element={<ProposalGeneratorNew />} />
        <Route path="/report" element={<ReportGeneratorNew />} />

        {/* Fallback old pages */}
        <Route path="/circular-old" element={<CircularPage />} />
        <Route path="/proposal-old" element={<ProposalPage />} />
        <Route path="/report-old" element={<ReportPage />} />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
