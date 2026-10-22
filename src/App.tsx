/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { FullscreenCard } from './components/FullscreenCard';
import { OfflineIndicator } from './components/OfflineIndicator';
import { HomePage } from './pages/HomePage';
import { CommunicationBoardPage } from './pages/CommunicationBoardPage';
import { UnderstandWorldPage } from './pages/UnderstandWorldPage';
import { ListenerCardPage } from './pages/ListenerCardPage';
import { CommunicationPassportPage } from './pages/CommunicationPassportPage';
import { SavedItemsPage } from './pages/SavedItemsPage';
import { SettingsPage } from './pages/SettingsPage';

function AppContent() {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      {/* Skip to Main Content Link for Screen Readers & Keyboard Nav */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 px-4 py-2 bg-teal-700 text-white font-bold rounded-xl shadow-lg ring-2 ring-white"
      >
        Skip to main content
      </a>

      {/* Navigation Header */}
      <Navigation />

      {/* Main View Area */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'board' && <CommunicationBoardPage />}
        {activeTab === 'understand' && <UnderstandWorldPage />}
        {activeTab === 'listener' && <ListenerCardPage />}
        {activeTab === 'passport' && <CommunicationPassportPage />}
        {activeTab === 'saved' && <SavedItemsPage />}
        {activeTab === 'settings' && <SettingsPage />}
      </main>

      {/* Fullscreen High-Contrast Card Display */}
      <FullscreenCard />

      {/* Offline Status Badge */}
      <OfflineIndicator />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
