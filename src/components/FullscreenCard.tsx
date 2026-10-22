import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, VolumeX, X, Copy, Check } from 'lucide-react';

export const FullscreenCard: React.FC = () => {
  const { fullscreenModal, closeFullscreen, speakText, stopSpeaking, isSpeaking, ui } = useApp();
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFullscreen();
    };
    if (fullscreenModal.isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fullscreenModal.isOpen, closeFullscreen]);

  if (!fullscreenModal.isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullscreenModal.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(fullscreenModal.text, fullscreenModal.lang);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen Communication Card"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-black text-white p-6 sm:p-12 select-none animate-in fade-in duration-200"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/20">
        <div className="flex items-center gap-3">
          <span className="inline-block w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
          <h2 className="text-sm sm:text-base font-bold tracking-wider uppercase text-amber-300">
            {fullscreenModal.title || 'Sahaj Setu — Please Read'}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 px-3.5 py-2 text-xs font-semibold text-white transition min-h-[44px]"
            title="Copy message"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? ui.common.copied : ui.common.copy}</span>
          </button>

          <button
            onClick={closeFullscreen}
            className="flex items-center gap-1.5 rounded-xl bg-red-600 hover:bg-red-700 px-4 py-2 text-sm font-bold text-white shadow-lg transition min-h-[44px]"
            aria-label="Close fullscreen card"
          >
            <X className="w-5 h-5" />
            <span>{ui.common.close}</span>
          </button>
        </div>
      </div>

      {/* Main Message Area: High contrast, extra large, readable from across a counter */}
      <div className="my-auto py-8 text-center flex flex-col items-center justify-center">
        {fullscreenModal.subtitle && (
          <p className="text-base sm:text-xl text-teal-300 font-medium mb-4">
            {fullscreenModal.subtitle}
          </p>
        )}
        <div className="max-w-4xl px-4">
          <p
            className="text-3xl sm:text-5xl md:text-6xl font-black leading-snug tracking-tight text-white drop-shadow-md select-text"
            style={{ wordBreak: 'break-word' }}
          >
            "{fullscreenModal.text}"
          </p>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/20">
        <p className="text-xs sm:text-sm text-slate-300">
          Tip: You can show this phone screen directly to a conductor, physician, or officer.
        </p>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            onClick={handleToggleSpeak}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2.5 rounded-2xl px-6 py-3.5 text-base font-bold shadow-xl transition min-h-[48px] ${
              isSpeaking
                ? 'bg-amber-500 hover:bg-amber-600 text-black animate-pulse'
                : 'bg-teal-500 hover:bg-teal-400 text-black'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            <span>{isSpeaking ? ui.common.stop : ui.common.speak}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
