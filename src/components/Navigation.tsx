import React from 'react';
import { useApp } from '../context/AppContext';
import { LanguageSelector } from './LanguageSelector';
import { PWAInstallButton } from './PWAInstallButton';
import {
  Home,
  MessageSquare,
  FileSearch,
  UserCheck,
  Bookmark,
  Settings,
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, passport, updatePassport, ui } = useApp();

  const toggleContrast = () => {
    updatePassport({ highContrast: !passport.highContrast });
  };

  const navItems = [
    { id: 'home', label: ui.nav.home, icon: Home },
    { id: 'board', label: ui.nav.board, icon: MessageSquare },
    { id: 'understand', label: ui.nav.understand, icon: FileSearch },
    { id: 'listener', label: ui.nav.listener, icon: UserCheck },
    { id: 'passport', label: ui.nav.passport, icon: Sparkles },
    { id: 'saved', label: ui.nav.saved, icon: Bookmark },
    { id: 'settings', label: ui.nav.settings, icon: Settings },
  ];

  return (
    <>
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Tagline */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-xl p-1"
            aria-label="Sahaj Setu Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-teal-500 flex items-center justify-center shadow-md shadow-teal-700/20 text-white shrink-0">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19C8 12 16 12 20 19" />
                <path d="M3 19h18" />
                <circle cx="8" cy="8" r="3" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
                <circle cx="16" cy="8" r="3" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
              </svg>
            </div>
            <div className="hidden xs:block">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white block leading-tight">
                {ui.appName}
              </span>
              <span className="text-[10px] text-teal-700 dark:text-teal-400 font-medium tracking-wide block truncate max-w-[170px] sm:max-w-xs">
                {ui.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition min-h-[44px] cursor-pointer ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: High Contrast, PWA Install, Language Selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            <PWAInstallButton />

            {/* High Contrast Mode Quick Toggle */}
            <button
              onClick={toggleContrast}
              className={`p-2 rounded-xl border border-slate-300 dark:border-slate-700 transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center ${
                passport.highContrast
                  ? 'bg-amber-400 text-black border-amber-500 font-bold'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              title={passport.highContrast ? 'Switch to Standard Theme' : 'Enable High-Contrast Theme'}
              aria-label={passport.highContrast ? 'High Contrast Mode is On' : 'Turn on High Contrast'}
            >
              {passport.highContrast ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Persistent Language Dropdown */}
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Bottom Sticky Navigation Bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 backdrop-blur-md px-1 py-1 shadow-lg"
        aria-label="Mobile Navigation"
      >
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center flex-1 py-1.5 px-0.5 rounded-xl transition min-h-[50px] min-w-[44px] cursor-pointer ${
                  isActive
                    ? 'text-teal-600 dark:text-teal-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                }`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={item.label}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-teal-100 dark:bg-teal-950/60' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-tight truncate max-w-[60px] text-center mt-0.5">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
