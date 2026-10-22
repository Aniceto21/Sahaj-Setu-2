import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { getPhraseText, CATEGORY_LABELS, CONTEXT_LABELS } from '../data/curatedPhrases';
import { CommunicationPhrase, PhraseCategory, QuickContext, SupportedLanguage } from '../types';
import { translationService } from '../services/translationService';
import { storageService } from '../services/storageService';
import {
  Volume2,
  VolumeX,
  Maximize2,
  Copy,
  Trash2,
  Star,
  Plus,
  Search,
  Check,
  Languages,
  Sparkles,
  Save,
  HelpCircle,
  X,
  Activity,
  HeartPulse,
} from 'lucide-react';

export const CommunicationBoardPage: React.FC = () => {
  const {
    phrases,
    favorites,
    toggleFavorite,
    addCustomPhrase,
    deleteCustomPhrase,
    composedMessage,
    setComposedMessage,
    appendToComposed,
    clearComposed,
    interfaceLang,
    passport,
    openFullscreen,
    speakText,
    stopSpeaking,
    isSpeaking,
    selectedContext,
    setSelectedContext,
    ui,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<PhraseCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPainScale, setShowPainScale] = useState(false);
  const [painLevel, setPainLevel] = useState<number>(5);
  const [painLocation, setPainLocation] = useState<string>('Head');

  // Translation state for composer
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationNotice, setTranslationNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [savedOk, setSavedOk] = useState(false);

  // New phrase form state
  const [newEn, setNewEn] = useState('');
  const [newKokDeva, setNewKokDeva] = useState('');
  const [newKokRomi, setNewKokRomi] = useState('');
  const [newHi, setNewHi] = useState('');
  const [newMr, setNewMr] = useState('');
  const [newCategory, setNewCategory] = useState<PhraseCategory>('basic_needs');

  // Filter phrases based on Context, Category, Search
  const filteredPhrases = useMemo(() => {
    return phrases.filter((phrase) => {
      // Context filter
      if (selectedContext !== 'general') {
        if (!phrase.contexts || !phrase.contexts.includes(selectedContext)) {
          return false;
        }
      }

      // Category filter
      if (activeCategory !== 'all' && phrase.category !== activeCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const en = phrase.translations.en.toLowerCase();
        const kd = phrase.translations.kok_deva.toLowerCase();
        const kr = phrase.translations.kok_romi.toLowerCase();
        const hi = phrase.translations.hi.toLowerCase();
        const mr = phrase.translations.mr.toLowerCase();
        return en.includes(q) || kd.includes(q) || kr.includes(q) || hi.includes(q) || mr.includes(q);
      }

      return true;
    });
  }, [phrases, selectedContext, activeCategory, searchQuery]);

  const handleCardClick = (phrase: CommunicationPhrase) => {
    const text = getPhraseText(phrase, interfaceLang, passport.konkaniScript);
    appendToComposed(text);
  };

  const handleCardSpeak = (phrase: CommunicationPhrase, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = getPhraseText(phrase, interfaceLang, passport.konkaniScript);
    speakText(text, interfaceLang);
  };

  const handleCardFullscreen = (phrase: CommunicationPhrase, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = getPhraseText(phrase, interfaceLang, passport.konkaniScript);
    const categoryLabel = CATEGORY_LABELS[phrase.category]?.en || 'Communication';
    openFullscreen(text, interfaceLang, passport.konkaniScript, categoryLabel);
  };

  const handleTranslateComposed = async () => {
    if (!composedMessage.trim()) return;
    setIsTranslating(true);
    setTranslationNotice(null);
    try {
      // If currently English, translate to Konkani (or user's communication language). If in Konkani, translate to English.
      const targetLang: SupportedLanguage = interfaceLang === 'en' ? 'kok' : 'en';
      const result = await translationService.translateText(
        composedMessage,
        'auto',
        targetLang,
        passport.konkaniScript
      );
      setComposedMessage(result.translatedText);
      setTranslationNotice(
        `Translated to ${targetLang === 'kok' ? 'Konkani' : 'English'}${
          result.isOfflineFallback ? ' (using verified offline phrase pack)' : ''
        }`
      );
    } catch (err: any) {
      setTranslationNotice(`Translation error: ${err.message}`);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = () => {
    if (!composedMessage.trim()) return;
    navigator.clipboard.writeText(composedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveMessage = () => {
    if (!composedMessage.trim()) return;
    storageService.saveMessage(composedMessage, interfaceLang);
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 2000);
  };

  const handleAddPhraseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEn.trim() && !newKokDeva.trim()) return;

    addCustomPhrase({
      category: newCategory,
      icon: 'MessageSquare',
      translations: {
        en: newEn.trim() || newKokDeva.trim(),
        kok_deva: newKokDeva.trim() || newEn.trim(),
        kok_romi: newKokRomi.trim() || newEn.trim(),
        hi: newHi.trim() || newEn.trim(),
        mr: newMr.trim() || newEn.trim(),
      },
      contexts: ['general'],
      urgency: 'normal',
    });

    // Reset & close
    setNewEn('');
    setNewKokDeva('');
    setNewKokRomi('');
    setNewHi('');
    setNewMr('');
    setShowAddModal(false);
  };

  const bodyParts = [
    { name: 'Head / डोकें', en: 'Head' },
    { name: 'Chest / हर्दें', en: 'Chest' },
    { name: 'Stomach / पोट', en: 'Stomach' },
    { name: 'Back / फाट', en: 'Back' },
    { name: 'Throat / गळो', en: 'Throat' },
    { name: 'Arm / हात', en: 'Arm' },
    { name: 'Leg / पांय', en: 'Leg' },
  ];

  const handleInsertPain = () => {
    const text =
      interfaceLang === 'kok'
        ? `म्हाका ${painLocation} दुखता. दुखपाची पातळी १० तली ${painLevel} आसा.`
        : interfaceLang === 'hi'
        ? `मुझे ${painLocation} में दर्द है। दर्द का स्तर 10 में से ${painLevel} है।`
        : interfaceLang === 'mr'
        ? `मला ${painLocation} दुखत आहे. वेदनांची पातळी 10 पैकी ${painLevel} आहे.`
        : `I have pain in my ${painLocation}. My pain level is ${painLevel} out of 10.`;
    appendToComposed(text);
    setShowPainScale(false);
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {ui.board.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {ui.board.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Pain Scale Toggle */}
          <button
            onClick={() => setShowPainScale(!showPainScale)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition min-h-[44px] cursor-pointer shadow-xs ${
              showPainScale
                ? 'bg-rose-600 text-white'
                : 'border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100'
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            <span>Pain Meter</span>
          </button>

          {/* Add Custom Phrase */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white transition min-h-[44px] cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{ui.board.customPhraseBtn}</span>
          </button>
        </div>
      </div>

      {/* Pain Scale Interactive Drawer / Card */}
      {showPainScale && (
        <div className="rounded-2xl border-2 border-rose-400 dark:border-rose-800 bg-rose-50/90 dark:bg-rose-950/40 p-4 sm:p-6 space-y-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-200">
              <Activity className="w-5 h-5" />
              <h3 className="font-bold text-sm sm:text-base">{ui.board.painScaleTitle}</h3>
            </div>
            <button
              onClick={() => setShowPainScale(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-rose-700 dark:text-rose-300">
            {ui.board.painScaleDesc}
          </p>

          {/* 1 - 10 Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1.5">
              Pain Severity: <span className="text-base text-rose-600 font-extrabold">{painLevel} / 10</span>
              {painLevel <= 3 && ' (Mild discomfort)'}
              {painLevel > 3 && painLevel <= 7 && ' (Moderate to severe pain)'}
              {painLevel > 7 && ' (CRITICAL / EMERGENCY PAIN)'}
            </label>
            <div className="grid grid-cols-10 gap-1 sm:gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                const isSelected = painLevel === num;
                const bg =
                  num <= 3
                    ? 'bg-emerald-500'
                    : num <= 6
                    ? 'bg-amber-500'
                    : num <= 8
                    ? 'bg-orange-500'
                    : 'bg-red-600';
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPainLevel(num)}
                    className={`py-3 rounded-xl text-center text-xs sm:text-sm font-black transition cursor-pointer min-h-[44px] ${
                      isSelected
                        ? `${bg} text-white ring-4 ring-rose-300 dark:ring-rose-800 scale-105 shadow-md`
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Body Region Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1.5">
              Where does it hurt? / खंय दुखता?
            </label>
            <div className="flex flex-wrap gap-2">
              {bodyParts.map((part) => {
                const isSelected = painLocation === part.en;
                return (
                  <button
                    key={part.en}
                    type="button"
                    onClick={() => setPainLocation(part.en)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition min-h-[44px] cursor-pointer ${
                      isSelected
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {part.name}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={handleInsertPain}
            className="w-full rounded-xl bg-rose-600 hover:bg-rose-700 text-white py-3 text-xs sm:text-sm font-bold shadow-sm transition min-h-[44px]"
          >
            Insert Pain Statement into Composed Message
          </button>
        </div>
      )}

      {/* MESSAGE COMPOSER BAR (Sticky or High Priority) */}
      <div className="sticky top-18 z-30 rounded-2xl border-2 border-teal-500 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 shadow-lg space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
          <span>{ui.board.composedLabel}</span>
          {composedMessage && (
            <span className="text-teal-600 dark:text-teal-400">
              {composedMessage.split(/\s+/).filter(Boolean).length} words
            </span>
          )}
        </div>

        {/* Text Input / Preview */}
        <textarea
          rows={2}
          value={composedMessage}
          onChange={(e) => setComposedMessage(e.target.value)}
          placeholder={ui.board.composePlaceholder}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3 py-2 text-base sm:text-lg font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
        />

        {translationNotice && (
          <p className="text-xs font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/50 p-2 rounded-lg">
            {translationNotice}
          </p>
        )}

        {/* Composer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            {/* Speak Composed */}
            <button
              onClick={() => {
                if (isSpeaking) {
                  stopSpeaking();
                } else {
                  speakText(composedMessage, interfaceLang);
                }
              }}
              disabled={!composedMessage.trim()}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition min-h-[44px] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                isSpeaking
                  ? 'bg-amber-500 text-black animate-pulse'
                  : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? ui.common.stop : ui.board.speakComposed}</span>
            </button>

            {/* Show Fullscreen Card */}
            <button
              onClick={() => {
                if (!composedMessage.trim()) return;
                openFullscreen(composedMessage, interfaceLang, passport.konkaniScript, 'Communication Message');
              }}
              disabled={!composedMessage.trim()}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-black dark:bg-slate-800 dark:hover:bg-slate-700 text-white transition min-h-[44px] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
              title="Show huge text on screen"
            >
              <Maximize2 className="w-4 h-4" />
              <span>{ui.board.fullscreenCard}</span>
            </button>

            {/* Translate Composed */}
            <button
              onClick={handleTranslateComposed}
              disabled={!composedMessage.trim() || isTranslating}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition min-h-[44px] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Languages className={`w-4 h-4 text-teal-600 ${isTranslating ? 'animate-spin' : ''}`} />
              <span>{isTranslating ? ui.common.translating : ui.board.translateComposed}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Save to History */}
            <button
              onClick={handleSaveMessage}
              disabled={!composedMessage.trim()}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition min-h-[44px] min-w-[44px] flex items-center justify-center disabled:opacity-40"
              title="Save message"
            >
              {savedOk ? <Check className="w-4 h-4 text-emerald-600" /> : <Save className="w-4 h-4" />}
            </button>

            {/* Copy */}
            <button
              onClick={handleCopy}
              disabled={!composedMessage.trim()}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition min-h-[44px] min-w-[44px] flex items-center justify-center disabled:opacity-40"
              title="Copy message"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Clear */}
            <button
              onClick={clearComposed}
              disabled={!composedMessage.trim()}
              className="flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition min-h-[44px] disabled:opacity-40"
              title="Clear text"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">{ui.board.clearComposed}</span>
            </button>
          </div>
        </div>
      </div>

      {/* CONTEXT FILTER CHIPS */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          Current Context / परिस्थिती:
        </label>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {Object.entries(CONTEXT_LABELS).map(([key, item]) => {
            const isSelected = selectedContext === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedContext(key as QuickContext)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer min-h-[40px] flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{item.en}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CATEGORY TABS & SEARCH */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Dropdown or Chip strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-1">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition min-h-[40px] ${
              activeCategory === 'all'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {ui.board.allCategories}
          </button>
          {Object.entries(CATEGORY_LABELS).map(([catKey, cat]) => {
            const isSelected = activeCategory === catKey;
            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setActiveCategory(catKey as PhraseCategory)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition min-h-[40px] ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat.en}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={ui.board.searchPlaceholder}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-9 pr-3 py-2 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* PHRASE CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5" role="region" aria-label="Phrase Cards">
        {filteredPhrases.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-8">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              No matching phrases found in this context or category.
            </p>
            <button
              onClick={() => {
                setSelectedContext('general');
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-bold text-teal-600 underline"
            >
              Reset filters to show all phrases
            </button>
          </div>
        ) : (
          filteredPhrases.map((phrase) => {
            const isFav = favorites.includes(phrase.id);
            const mainText = getPhraseText(phrase, interfaceLang, passport.konkaniScript);

            // Sub-translation (if current is not English, show English; if English, show Konkani)
            const subText =
              interfaceLang === 'kok'
                ? phrase.translations.en
                : interfaceLang === 'hi' || interfaceLang === 'mr'
                ? phrase.translations.en
                : passport.konkaniScript === 'romi'
                ? phrase.translations.kok_romi
                : phrase.translations.kok_deva;

            const isEmergency = phrase.urgency === 'emergency';
            const isHigh = phrase.urgency === 'high';

            return (
              <div
                key={phrase.id}
                onClick={() => handleCardClick(phrase)}
                className={`relative group flex flex-col justify-between p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer select-none active:scale-98 shadow-xs hover:shadow-md ${
                  isEmergency
                    ? 'border-red-400 bg-red-50/70 dark:bg-red-950/40 hover:border-red-500'
                    : isHigh
                    ? 'border-amber-300 bg-amber-50/60 dark:bg-amber-950/30 hover:border-amber-400'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-teal-500'
                }`}
              >
                {/* Top Row: Category tag, Favorite star, Fullscreen trigger */}
                <div className="flex items-center justify-between gap-2 pb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-md">
                    {CATEGORY_LABELS[phrase.category]?.en || phrase.category}
                  </span>

                  <div className="flex items-center gap-1">
                    {/* Fullscreen Button */}
                    <button
                      type="button"
                      onClick={(e) => handleCardFullscreen(phrase, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[36px] min-w-[36px] flex items-center justify-center"
                      title="Show large on screen"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Speak Button */}
                    <button
                      type="button"
                      onClick={(e) => handleCardSpeak(phrase, e)}
                      className="p-1.5 rounded-lg text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/50 min-h-[36px] min-w-[36px] flex items-center justify-center"
                      title="Speak phrase"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    {/* Favorite Star */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(phrase.id);
                      }}
                      className={`p-1.5 rounded-lg min-h-[36px] min-w-[36px] flex items-center justify-center transition ${
                        isFav ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600 hover:text-slate-400'
                      }`}
                      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Main Phrase Text */}
                <div className="py-2">
                  <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {mainText}
                  </p>
                  {subText && subText !== mainText && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                      {subText}
                    </p>
                  )}
                </div>

                {/* Bottom metadata / Tap hint */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Tap to add to sentence</span>
                  {phrase.isCustom && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCustomPhrase(phrase.id);
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ADD CUSTOM PHRASE MODAL */}
      {showAddModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {ui.board.addPhraseModalTitle}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPhraseSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Category:
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as PhraseCategory)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                >
                  {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v.en} ({v.kok})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Phrase in English:
                </label>
                <input
                  type="text"
                  required
                  value={newEn}
                  onChange={(e) => setNewEn(e.target.value)}
                  placeholder="e.g. Please bring my spectacles from the bag."
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Konkani (Devanagari script):
                </label>
                <input
                  type="text"
                  value={newKokDeva}
                  onChange={(e) => setNewKokDeva(e.target.value)}
                  placeholder="उदा. उपकार करून म्हजो चश्मो ब्यागेतल्यान हाडात."
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Konkani (Roman / Romi script):
                </label>
                <input
                  type="text"
                  value={newKokRomi}
                  onChange={(e) => setNewKokRomi(e.target.value)}
                  placeholder="Ex: Upkar korun mhozo choxmo bagentlo haddat."
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-xs font-bold text-white shadow-sm"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
