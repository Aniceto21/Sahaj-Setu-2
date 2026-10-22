import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-teal-700 active:scale-95 transition focus:outline-none focus:ring-2 focus:ring-teal-400"
        title="Install Sahaj Setu as an offline app"
        aria-label="Install Sahaj Setu App on device"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-lg border border-teal-300 dark:border-teal-700 bg-teal-50 dark:bg-teal-950 px-2.5 py-1 text-xs font-medium text-teal-800 dark:text-teal-200 hover:bg-teal-100 transition"
          aria-label="Install Sahaj Setu on iPhone or iPad"
        >
          <Smartphone className="w-3.5 h-3.5 text-teal-600" />
          <span>Install on iOS</span>
        </button>

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-modal-title"
          >
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 id="ios-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                  Install on iPhone / iPad
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="rounded-full p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  aria-label="Close installation instructions"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <p className="flex items-start gap-2">
                  <span className="font-bold text-teal-600">1.</span>
                  <span>Tap the <strong>Share</strong> button <span className="inline-block px-1.5 py-0.5 bg-slate-100 rounded text-xs">⎋</span> in your Safari toolbar.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-bold text-teal-600">2.</span>
                  <span>Scroll down and tap <strong>Add to Home Screen</strong> (+)</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-bold text-teal-600">3.</span>
                  <span>Tap <strong>Add</strong> at the top right to enable offline use anytime.</span>
                </p>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-teal-600 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 transition"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
