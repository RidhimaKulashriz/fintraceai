import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AnimatePresence } from 'motion/react';
import Lenis from 'lenis';

const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const SignInPage = React.lazy(() => import('./pages/SignInPage'));
const SignUpPage = React.lazy(() => import('./pages/SignUpPage'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const GraphExplorer = React.lazy(() => import('./pages/GraphExplorer'));
const InvestigationPanel = React.lazy(() => import('./pages/InvestigationPanel'));
const Copilot = React.lazy(() => import('./pages/Copilot'));
const BlockchainEvidence = React.lazy(() => import('./pages/BlockchainEvidence'));
const CaseReports = React.lazy(() => import('./pages/CaseReports'));
const Technology = React.lazy(() => import('./pages/Technology'));
const HowItWorks = React.lazy(() => import('./pages/HowItWorks'));
const Settings = React.lazy(() => import('./pages/Settings'));

import Layout from './components/Layout';
import { SmoothScroll } from './components/SmoothScroll';
import { ChatAssistant } from './components/ChatAssistant';

const LoadingFallback = () => (
  <div className="h-screen w-full flex items-center justify-center bg-bg-dark">
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <div className="absolute inset-0 w-16 h-16 bg-primary/20 blur-xl rounded-full animate-pulse" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-lg font-bold text-white tracking-tight">FinTrace <span className="text-primary">AI</span></p>
        <p className="text-[10px] font-bold text-primary animate-pulse uppercase tracking-[0.3em]">Initializing Platform</p>
      </div>
    </div>
  </div>
);

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <SmoothScroll>
          <React.Suspense fallback={<LoadingFallback />}>
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/technology" element={<Technology />} />
                <Route path="/how-it-works" element={<HowItWorks />} />

                {/* App Routes (Protected - though we don't have real auth yet) */}
                <Route element={<Layout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/graph" element={<GraphExplorer />} />
                  <Route path="/investigation" element={<InvestigationPanel />} />
                  <Route path="/copilot" element={<Copilot />} />
                  <Route path="/blockchain" element={<BlockchainEvidence />} />
                  <Route path="/reports" element={<CaseReports />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </React.Suspense>
          <ChatAssistant />
        </SmoothScroll>
      </Router>
    </ThemeProvider>
  );
}
