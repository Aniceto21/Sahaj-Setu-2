import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/curatedPhrases';
import { SupportedLanguage, KonkaniScript } from '../types';
import { Globe, Check, ChevronDown } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { interfaceLang, setInterfaceLang, passport, updatePassport } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === interfaceLang) || LANGUAGES[0];

  const handleSelectLang = (code: SupportedLanguage) => {
    setInterfaceLang(code);
    setIsOpen(false);
  };

  const handleToggleScript = (script: KonkaniScript, e: React.MouseEvent) => {
    e.stopPropagation();
    updatePassport({ konkaniScript: script });
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-100 shadow-sm hover:border-teal-500 hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition cursor-pointer min-h-[44px]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Select interface language. Currently selected: ${currentLang.name}`}
      >
        <Globe className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
        <span className="font-medium truncate max-w-[120px] sm:max-w-none">
          {currentLang.nativeName}
        </span>
        {interfaceLang === 'kok' && (
          <span className="rounded bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 text-[10px] px-1.5 py-0.5 font-bold uppercase tracking-wider">
            {passport.konkaniScript === 'romi' ? 'Romi' : 'देव'}
          </span>
        )}
        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Supported Languages"
          className="absolute right-0 z-50 mt-2 w-72 origin-top-right rounded-2xl bg-white dark:bg-slate-900 p-2 shadow-2xl ring-1 ring-black/10 dark:ring-white/10 focus:outline-none animate-in fade-in zoom-in-95 duration-100 border border-slate-200 dark:border-slate-800"
        >
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Choose Language / भास वेंचून काडात
            </p>
          </div>

          <div className="py-1 space-y-1">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === interfaceLang;
              return (
                <div
                  key={lang.code}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelectLang(lang.code)}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm cursor-pointer transition ${
                    isSelected
                      ? 'bg-teal-50 text-teal-950 font-semibold dark:bg-teal-950/60 dark:text-teal-100'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{lang.nativeName}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {lang.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Konkani script switch inside dropdown */}
                    {lang.code === 'kok' && (
                      <div
                        className="flex items-center rounded-lg bg-slate-200 dark:bg-slate-700 p-0.5 text-[11px]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={(e) => handleToggleScript('deva', e)}
                          title="Devanagari script (देवनागरी)"
                          className={`px-2 py-0.5 rounded font-semibold transition ${
                            passport.konkaniScript === 'deva'
                              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs'
                              : 'text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          देव
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleToggleScript('romi', e)}
                          title="Roman / Romi script (Goa church & daily script)"
                          className={`px-2 py-0.5 rounded font-semibold transition ${
                            passport.konkaniScript === 'romi'
                              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs'
                              : 'text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          Romi
                        </button>
                      </div>
                    )}

                    {isSelected && (
                      <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-1 pt-2 border-t border-slate-100 dark:border-slate-800 px-3 pb-1 text-[11px] text-slate-400 dark:text-slate-500">
            Note: Changing language retains all your saved phrases and notes.
          </div>
        </div>
      )}
    </div>
  );
};
