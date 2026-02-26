import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Pages
import LandingPage from './pages/LandingPage';
import SelectionPage from './pages/SelectionPage';
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
        {/* Landing and Selection */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/selection" element={<SelectionPage />} />

        {/* Dashboard and Content */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/circular" element={<CircularGeneratorNew />} />
        <Route path="/proposal" element={<ProposalGeneratorNew />} />
        <Route path="/report" element={<ReportGeneratorNew />} />

        {/* Fallback old pages */}
        <Route path="/circular-old" element={<CircularPage />} />
        <Route path="/proposal-old" element={<ProposalPage />} />
        <Route path="/report-old" element={<ReportPage />} />

        {/* Default redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
