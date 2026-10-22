import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { storageService } from '../services/storageService';
import {
  RotateCcw,
  Shield,
  Eye,
  Download,
  Upload,
  AlertTriangle,
  Check,
  X,
  FileCheck,
  Heart,
  Globe,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { passport, updatePassport, resetDemo, ui } = useApp();
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleExecuteReset = () => {
    resetDemo();
    setShowConfirmReset(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);
  };

  const handleExport = () => {
    const data = storageService.exportAllData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sahaj_setu_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {ui.nav.settings} & Privacy
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Configure accessibility settings, manage offline data storage, and review privacy assurances.
        </p>
      </div>

      {resetSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Demo data reset successfully. Your active language remains preserved.</span>
        </div>
      )}

      {/* 1. Quick Accessibility Controls */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
          <Eye className="w-4 h-4" />
          <span>Quick Accessibility Options</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white block">
                High-Contrast Mode
              </span>
              <span className="text-[11px] text-slate-500">
                Enhance color borders and text readability
              </span>
            </div>
            <input
              type="checkbox"
              checked={passport.highContrast}
              onChange={(e) => updatePassport({ highContrast: e.target.checked })}
              className="w-5 h-5 accent-teal-600 rounded cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white block">
                Reduced Motion
              </span>
              <span className="text-[11px] text-slate-500">
                Minimize UI animations for vestibular safety
              </span>
            </div>
            <input
              type="checkbox"
              checked={passport.reducedMotion}
              onChange={(e) => updatePassport({ reducedMotion: e.target.checked })}
              className="w-5 h-5 accent-teal-600 rounded cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* 2. Data Management & Safe Demo Reset */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
          <FileCheck className="w-4 h-4" />
          <span>Local Data Management</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Sahaj Setu stores your communication cards, preferences, and saved notices locally on this device in your browser's private offline storage.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs transition min-h-[44px]"
          >
            <Download className="w-4 h-4" />
            <span>Export All Local Data (JSON)</span>
          </button>

          {/* Reset Demo Button - Explicitly distinct from language selector */}
          <button
            onClick={() => setShowConfirmReset(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-300 dark:border-red-900 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-bold text-xs transition min-h-[44px]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Data</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-400 italic">
          * Note: Resetting demo data restores default phrases and notices, but preserves your chosen interface language.
        </p>
      </section>

      {/* 3. Privacy & Ethics Disclosure (Requirement 12, 18) */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
          <Shield className="w-4 h-4" />
          <span>Privacy & Data Transparency Notice</span>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            <strong>Local-First Architecture:</strong> Your communication preferences, emergency contacts, custom phrases, and saved items never require login, registration, or cloud user profiles.
          </p>
          <p>
            <strong>External AI Processing:</strong> When you request AI text simplification, image OCR, or machine translation, text or photo data is processed securely through server-side APIs to generate the assistance. We never sell or track your private communication data.
          </p>
          <p>
            <strong>Medical & Legal Notice:</strong> AI simplifications and translations are assistive tools designed for communication accessibility. For critical prescription dosages, medical consents, or legal actions, verify details with clinical professionals or authorized officials.
          </p>
          <p>
            <strong>Dignity & Accessibility:</strong> Sahaj Setu adheres to universal design principles to ensure every individual is treated with autonomy, respect, and confidence.
          </p>
        </div>
      </section>

      {/* CONFIRM RESET MODAL */}
      {showConfirmReset && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Confirm Demo Reset?
              </h3>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              This will clear custom added phrases and restore initial Goan public notices. Your selected interface language and theme will NOT be changed.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 min-h-[40px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteReset}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm min-h-[40px]"
              >
                Yes, Reset Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
