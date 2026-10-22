import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { storageService } from '../services/storageService';
import { SimplifiedNotice, SupportedLanguage } from '../types';
import { getPhraseText, CATEGORY_LABELS } from '../data/curatedPhrases';
import {
  FileText,
  Bookmark,
  Volume2,
  VolumeX,
  Maximize2,
  Trash2,
  Copy,
  Check,
  Calendar,
  AlertTriangle,
  History,
  FileCheck,
} from 'lucide-react';

export const SavedItemsPage: React.FC = () => {
  const {
    favorites,
    phrases,
    deleteCustomPhrase,
    openFullscreen,
    speakText,
    stopSpeaking,
    isSpeaking,
    interfaceLang,
    passport,
    ui,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'notices' | 'phrases' | 'history'>('notices');
  const [savedNotices, setSavedNotices] = useState<SimplifiedNotice[]>([]);
  const [savedMessages, setSavedMessages] = useState<
    { id: string; text: string; date: string; lang: SupportedLanguage }[]
  >([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setSavedNotices(storageService.getSavedNotices());
    setSavedMessages(storageService.getSavedMessages());
  }, []);

  const handleDeleteNotice = (id: string) => {
    storageService.deleteNotice(id);
    setSavedNotices((prev) => prev.filter((n) => n.id !== id));
  };

  const handleDeleteMessage = (id: string) => {
    storageService.deleteSavedMessage(id);
    setSavedMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Get favorite phrases
  const favoritePhrases = phrases.filter((p) => favorites.includes(p.id) || p.isFavorite);

  return (
    <div className="space-y-6 pb-20 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {ui.nav.saved}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Access your offline saved notices, favorite communication cards, and composed message history.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 max-w-md">
        <button
          onClick={() => setActiveTab('notices')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition min-h-[44px] flex items-center justify-center gap-1.5 ${
            activeTab === 'notices'
              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Notices ({savedNotices.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('phrases')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition min-h-[44px] flex items-center justify-center gap-1.5 ${
            activeTab === 'phrases'
              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Favorites ({favoritePhrases.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition min-h-[44px] flex items-center justify-center gap-1.5 ${
            activeTab === 'history'
              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Messages ({savedMessages.length})</span>
        </button>
      </div>

      {/* TAB 1: SAVED NOTICES */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          {savedNotices.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <FileText className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                No saved notices yet.
              </p>
              <p className="text-xs text-slate-500">
                Go to "Understand the World", simplify any notice, and tap "Save Notice Locally".
              </p>
            </div>
          ) : (
            savedNotices.map((notice) => (
              <div
                key={notice.id}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-7 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">
                      Saved {new Date(notice.savedAt).toLocaleDateString()}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {notice.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => speakText(`${notice.title}. ${notice.summary}`, notice.language)}
                      className="p-2 rounded-xl bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 min-h-[40px] min-w-[40px] flex items-center justify-center"
                      title="Speak summary"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleCopy(`${notice.title}\n\n${notice.summary}`, notice.id)}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 min-h-[40px] min-w-[40px] flex items-center justify-center"
                      title="Copy"
                    >
                      {copiedId === notice.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => handleDeleteNotice(notice.id)}
                      className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 min-h-[40px] min-w-[40px] flex items-center justify-center"
                      title="Delete notice"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {notice.summary}
                </p>

                {notice.actionSteps.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Steps to take:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                      {notice.actionSteps.slice(0, 3).map((s, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-teal-600 font-bold">{idx + 1}.</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: FAVORITE PHRASES */}
      {activeTab === 'phrases' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {favoritePhrases.length === 0 ? (
            <div className="col-span-full p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <Bookmark className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                No favorite phrases yet.
              </p>
              <p className="text-xs text-slate-500">
                Tap the star icon on any card on the Communication Board to favorite it.
              </p>
            </div>
          ) : (
            favoritePhrases.map((phrase) => {
              const text = getPhraseText(phrase, interfaceLang, passport.konkaniScript);
              return (
                <div
                  key={phrase.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">
                      {CATEGORY_LABELS[phrase.category]?.en || phrase.category}
                    </span>
                    <p className="text-base font-bold text-slate-900 dark:text-white mt-2 leading-snug">
                      {text}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => speakText(text, interfaceLang)}
                      className="p-2 rounded-xl text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/50 min-h-[40px] min-w-[40px] flex items-center justify-center"
                      title="Speak"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() =>
                        openFullscreen(
                          text,
                          interfaceLang,
                          passport.konkaniScript,
                          CATEGORY_LABELS[phrase.category]?.en
                        )
                      }
                      className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[40px] min-w-[40px] flex items-center justify-center"
                      title="Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 3: SAVED COMPOSED MESSAGES */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {savedMessages.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <History className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                No saved messages in history.
              </p>
              <p className="text-xs text-slate-500">
                When you compose a sentence on the Communication Board, tap the Save icon to keep it here.
              </p>
            </div>
          ) : (
            savedMessages.map((msg) => (
              <div
                key={msg.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    "{msg.text}"
                  </p>
                  <span className="text-[10px] text-slate-400">
                    {new Date(msg.date).toLocaleDateString()} • {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => speakText(msg.text, msg.lang)}
                    className="p-2 rounded-xl text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/50 min-h-[40px] min-w-[40px] flex items-center justify-center"
                    title="Speak"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => openFullscreen(msg.text, msg.lang, undefined, 'Saved Message')}
                    className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 min-h-[40px] min-w-[40px] flex items-center justify-center"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 min-h-[40px] min-w-[40px] flex items-center justify-center"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
