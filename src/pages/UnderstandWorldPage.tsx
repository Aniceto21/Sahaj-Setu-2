import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SAMPLE_NOTICES, SampleNotice } from '../data/sampleNotices';
import { simplificationService } from '../services/simplificationService';
import { ocrService } from '../services/ocrService';
import { translationService } from '../services/translationService';
import { storageService } from '../services/storageService';
import { SimplifiedNotice, SupportedLanguage, KonkaniScript } from '../types';
import {
  Upload,
  Camera,
  FileText,
  Sparkles,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Save,
  Languages,
  AlertTriangle,
  Calendar,
  DollarSign,
  FileCheck,
  Users,
  PhoneCall,
  BookOpen,
  Split,
  Eye,
  RefreshCw,
  X,
} from 'lucide-react';

export const UnderstandWorldPage: React.FC = () => {
  const { interfaceLang, passport, speakText, stopSpeaking, isSpeaking, ui } = useApp();

  const [activeTab, setActiveTab] = useState<'upload' | 'paste' | 'samples'>('samples');
  const [inputText, setInputText] = useState<string>(SAMPLE_NOTICES[0].text);
  const [selectedSample, setSelectedSample] = useState<string>(SAMPLE_NOTICES[0].id);

  // OCR state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isOcrProcessing, setIsOcrProcessing] = useState<boolean>(false);
  const [ocrConfidence, setOcrConfidence] = useState<string | null>(null);

  // Simplification state
  const [isSimplifying, setIsSimplifying] = useState<boolean>(false);
  const [simplifiedResult, setSimplifiedResult] = useState<SimplifiedNotice | null>(null);
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Initialize sample notice in current language on mount
  useEffect(() => {
    if (!simplifiedResult && SAMPLE_NOTICES[0]) {
      const initial = simplificationService.simplifyNotice(
        SAMPLE_NOTICES[0].text,
        interfaceLang,
        passport.konkaniScript
      );
      initial.then((res) => setSimplifiedResult(res)).catch(() => {});
    }
  }, []);

  // Synchronize simplified notice when top navigation language or Konkani script changes
  useEffect(() => {
    if (simplifiedResult && inputText.trim()) {
      setIsSimplifying(true);
      simplificationService
        .simplifyNotice(inputText, interfaceLang, passport.konkaniScript)
        .then((res) => {
          setSimplifiedResult(res);
        })
        .catch((e) => console.warn('Language sync error:', e))
        .finally(() => setIsSimplifying(false));
    }
  }, [interfaceLang, passport.konkaniScript]);

  // Handle image upload / camera
  const handleImageFile = async (file: File) => {
    try {
      setIsOcrProcessing(true);
      setErrorMsg(null);
      const { base64, mimeType } = await ocrService.prepareImage(file);
      setImagePreview(base64);

      const ocrData = await ocrService.extractTextFromImage(base64, mimeType);
      setInputText(ocrData.extractedText);
      setOcrConfidence(`${ocrData.confidence} confidence • ${ocrData.detectedLanguage}`);
      setActiveTab('paste');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to extract text from image.');
    } finally {
      setIsOcrProcessing(false);
    }
  };

  const handleSimplify = async () => {
    if (!inputText.trim()) return;
    setIsSimplifying(true);
    setErrorMsg(null);
    try {
      const result = await simplificationService.simplifyNotice(
        inputText,
        interfaceLang,
        passport.konkaniScript
      );
      setSimplifiedResult(result);
    } catch (err: any) {
      setErrorMsg(err.message || 'Simplification failed.');
    } finally {
      setIsSimplifying(false);
    }
  };

  const handleSwitchNoticeLanguage = async (
    targetLang: SupportedLanguage,
    targetScript: KonkaniScript = 'deva'
  ) => {
    if (!simplifiedResult) return;
    setIsSimplifying(true);
    setErrorMsg(null);
    try {
      const updated = await simplificationService.simplifyNotice(
        inputText,
        targetLang,
        targetScript
      );
      setSimplifiedResult(updated);
    } catch (err: any) {
      setErrorMsg('Failed to change notice language: ' + err.message);
    } finally {
      setIsSimplifying(false);
    }
  };

  const handleSaveNotice = () => {
    if (!simplifiedResult) return;
    storageService.saveNotice(simplifiedResult);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectSample = (sample: SampleNotice) => {
    setSelectedSample(sample.id);
    setInputText(sample.text);
    setOcrConfidence(null);
    setImagePreview(null);
    setIsSimplifying(true);
    simplificationService
      .simplifyNotice(sample.text, interfaceLang, passport.konkaniScript)
      .then((res) => setSimplifiedResult(res))
      .catch((e) => setErrorMsg(e.message))
      .finally(() => setIsSimplifying(false));
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {ui.understand.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {ui.understand.subtitle}
        </p>
      </div>

      {errorMsg && (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-200 text-xs sm:text-sm">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">{errorMsg}</p>
          </div>
          <button onClick={() => setErrorMsg(null)} className="p-1 hover:text-black">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* INPUT METHODS TABS */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 max-w-xl">
        <button
          onClick={() => setActiveTab('samples')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition min-h-[44px] cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'samples'
              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{ui.understand.tabSamples}</span>
        </button>

        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition min-h-[44px] cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'upload'
              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>{ui.understand.tabUpload}</span>
        </button>

        <button
          onClick={() => setActiveTab('paste')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition min-h-[44px] cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'paste'
              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{ui.understand.tabPaste}</span>
        </button>
      </div>

      {/* TAB CONTENT: SAMPLES */}
      {activeTab === 'samples' && (
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Select a verified Goan public notice to simplify:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SAMPLE_NOTICES.map((sample) => {
              const isSelected = selectedSample === sample.id;
              return (
                <div
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`p-4 rounded-2xl border transition cursor-pointer select-none ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50/70 dark:bg-teal-950/40 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900/60 px-2 py-0.5 rounded-md">
                    {sample.category}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mt-1.5 leading-snug">
                    {sample.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                    Source: {sample.source}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT: UPLOAD / CAMERA (OCR) */}
      {activeTab === 'upload' && (
        <div className="p-6 rounded-3xl border-2 border-dashed border-teal-400/60 bg-teal-50/40 dark:bg-slate-900 space-y-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
            <Camera className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Scan Notice Image with OCR
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {ui.understand.ocrPrompt}
            </p>
          </div>

          {/* Action buttons: Camera vs File Upload */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleImageFile(e.target.files[0]);
              }}
            />
            <button
              onClick={() => cameraInputRef.current?.click()}
              disabled={isOcrProcessing}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-md transition min-h-[44px]"
            >
              <Camera className="w-4 h-4" />
              <span>{ui.understand.cameraBtn}</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleImageFile(e.target.files[0]);
              }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isOcrProcessing}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-teal-300 dark:border-teal-700 bg-white dark:bg-slate-800 text-teal-800 dark:text-teal-200 font-bold text-sm shadow-xs hover:bg-teal-50 transition min-h-[44px]"
            >
              <Upload className="w-4 h-4" />
              <span>{ui.understand.uploadBtn}</span>
            </button>
          </div>

          {isOcrProcessing && (
            <div className="flex items-center justify-center gap-2 pt-3 text-xs font-bold text-teal-700 dark:text-teal-300">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Processing image with OCR & extracting legible text...</span>
            </div>
          )}

          {imagePreview && (
            <div className="mt-4 max-w-xs mx-auto rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
              <img src={imagePreview} alt="Scanned Notice" className="w-full h-40 object-cover" />
            </div>
          )}
        </div>
      )}

      {/* NOTICE TEXT INPUT / REVIEW AREA */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
          <span>{ui.understand.originalNotice}:</span>
          {ocrConfidence && (
            <span className="text-teal-600 font-semibold bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">
              OCR: {ocrConfidence}
            </span>
          )}
        </div>
        <textarea
          rows={6}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={ui.understand.pastePlaceholder}
          className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-xs"
        />

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <p className="text-[11px] text-slate-400">
            {inputText.length} characters • Ready for Easy-Read simplification
          </p>

          <button
            onClick={handleSimplify}
            disabled={!inputText.trim() || isSimplifying}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm sm:text-base shadow-lg transition active:scale-98 disabled:opacity-40 min-h-[48px]"
          >
            <Sparkles className={`w-5 h-5 ${isSimplifying ? 'animate-spin' : ''}`} />
            <span>{isSimplifying ? ui.understand.analyzing : ui.understand.simplifyBtn}</span>
          </button>
        </div>
      </div>

      {/* EASY-READ SIMPLIFIED NOTICE RESULTS CARD */}
      {simplifiedResult && (
        <section
          className="rounded-3xl border-2 border-teal-500 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl space-y-6 animate-fade-in"
          role="region"
          aria-label="Easy-Read Notice Results"
        >
          {/* NOTICE LANGUAGE SELECTION TOOLBAR */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/80">
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
              <span className="text-xs font-bold text-teal-950 dark:text-teal-100">
                Notice Language / भास बदलात:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleSwitchNoticeLanguage('en')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition min-h-[38px] cursor-pointer ${
                  simplifiedResult.language === 'en'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => handleSwitchNoticeLanguage('kok', 'romi')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition min-h-[38px] cursor-pointer ${
                  simplifiedResult.language === 'kok' && simplifiedResult.script === 'romi'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                कोंकणी (Romi)
              </button>
              <button
                type="button"
                onClick={() => handleSwitchNoticeLanguage('kok', 'deva')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition min-h-[38px] cursor-pointer ${
                  simplifiedResult.language === 'kok' && simplifiedResult.script !== 'romi'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                कोंकणी (देवनागरी)
              </button>
              <button
                type="button"
                onClick={() => handleSwitchNoticeLanguage('hi')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition min-h-[38px] cursor-pointer ${
                  simplifiedResult.language === 'hi'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                हिन्दी
              </button>
              <button
                type="button"
                onClick={() => handleSwitchNoticeLanguage('mr')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition min-h-[38px] cursor-pointer ${
                  simplifiedResult.language === 'mr'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                मराठी
              </button>
            </div>
          </div>

          {/* Header & Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{ui.understand.easyReadTitle}</span>
                <span className="ml-1 text-[10px] bg-teal-200 dark:bg-teal-900 px-1.5 py-0.5 rounded font-black">
                  {simplifiedResult.language === 'kok'
                    ? simplifiedResult.script === 'romi'
                      ? 'KONKANI ROMI'
                      : 'KONKANI DEVANAGARI'
                    : simplifiedResult.language.toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {simplifiedResult.title}
              </h2>
            </div>

            {/* Quick Action Strip */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Read Aloud */}
              <button
                onClick={() => {
                  if (isSpeaking) {
                    stopSpeaking();
                  } else {
                    const stepLead =
                      simplifiedResult.language === 'kok'
                        ? simplifiedResult.script === 'romi'
                          ? 'Karunk zai asleli pavlam:'
                          : 'करपाचीं पावलां:'
                        : simplifiedResult.language === 'hi'
                        ? 'किए जाने वाले कार्य:'
                        : simplifiedResult.language === 'mr'
                        ? 'करावयाच्या पायऱ्या:'
                        : 'Steps to take:';
                    const stepsText = simplifiedResult.actionSteps
                      .map((s, idx) => `${idx + 1}. ${s}`)
                      .join('. ');
                    const deadlinesText =
                      simplifiedResult.deadlines.length > 0
                        ? simplifiedResult.deadlines.join('. ')
                        : '';
                    const feesText =
                      simplifiedResult.feesAndCosts.length > 0
                        ? simplifiedResult.feesAndCosts.join('. ')
                        : '';
                    const fullSpoken = `${simplifiedResult.title}. ${simplifiedResult.summary}. ${stepLead} ${stepsText}. ${deadlinesText}. ${feesText}`;
                    speakText(fullSpoken, simplifiedResult.language);
                  }
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition min-h-[44px] cursor-pointer shadow-xs ${
                  isSpeaking
                    ? 'bg-amber-500 text-black animate-pulse'
                    : 'bg-teal-600 hover:bg-teal-700 text-white'
                }`}
                title={`Read aloud in ${simplifiedResult.language}`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isSpeaking ? ui.common.stop : ui.common.speak}</span>
              </button>

              {/* Compare with Original */}
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition min-h-[44px] cursor-pointer ${
                  compareMode
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                }`}
              >
                <Split className="w-4 h-4" />
                <span>{ui.understand.compareBtn}</span>
              </button>

              {/* Save Notice */}
              <button
                onClick={handleSaveNotice}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition min-h-[44px] cursor-pointer"
                title="Save for offline viewing"
              >
                {savedSuccess ? <Check className="w-4 h-4 text-emerald-600" /> : <Save className="w-4 h-4" />}
                <span>{savedSuccess ? 'Saved!' : ui.understand.saveNoticeBtn}</span>
              </button>

              {/* Copy */}
              <button
                onClick={() => handleCopy(`${simplifiedResult.title}\n\n${simplifiedResult.summary}`)}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Copy summary"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Side-by-Side Comparison if toggled */}
          {compareMode && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs animate-in fade-in">
              <div>
                <h4 className="font-bold text-slate-500 uppercase tracking-wider mb-2">Original Bureaucratic Notice:</h4>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl max-h-60 overflow-y-auto font-mono text-[11px] leading-relaxed">
                  {inputText}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-teal-600 uppercase tracking-wider mb-2">Simplified Easy-Read Version:</h4>
                <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl max-h-60 overflow-y-auto font-sans text-xs leading-relaxed space-y-2">
                  <p className="font-bold text-slate-900 dark:text-white">{simplifiedResult.title}</p>
                  <p>{simplifiedResult.summary}</p>
                </div>
              </div>
            </div>
          )}

          {/* 1. Plain Language Summary */}
          <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60">
            <h3 className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider mb-1">
              Plain Language Summary / सोंपे सांगणी:
            </h3>
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 font-medium leading-relaxed">
              {simplifiedResult.summary}
            </p>
          </div>

          {/* 2. Step-by-Step Action Checklist */}
          {simplifiedResult.actionSteps.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-teal-600" />
                <span>{ui.understand.actionSteps}</span>
              </h3>
              <div className="space-y-2">
                {simplifiedResult.actionSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80"
                  >
                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Deadlines & Dates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Deadlines */}
            {simplifiedResult.deadlines.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-2">
                <h4 className="text-xs font-bold text-amber-800 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>{ui.understand.deadlines}</span>
                </h4>
                <ul className="space-y-1.5">
                  {simplifiedResult.deadlines.map((dl, i) => (
                    <li key={i} className="text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-100 flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      <span>{dl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Fees & Costs */}
            {simplifiedResult.feesAndCosts.length > 0 && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>{ui.understand.fees}</span>
                </h4>
                <ul className="space-y-1.5">
                  {simplifiedResult.feesAndCosts.map((fee, i) => (
                    <li key={i} className="text-xs sm:text-sm font-bold text-emerald-950 dark:text-emerald-100 flex items-start gap-2">
                      <span className="text-emerald-500">•</span>
                      <span>{fee}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 4. Required Documents & Eligibility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {simplifiedResult.requiredDocuments.length > 0 && (
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-2">
                <h4 className="text-xs font-bold text-blue-800 dark:text-blue-200 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>{ui.understand.documents}</span>
                </h4>
                <ul className="space-y-1.5">
                  {simplifiedResult.requiredDocuments.map((doc, i) => (
                    <li key={i} className="text-xs sm:text-sm font-semibold text-blue-950 dark:text-blue-100 flex items-start gap-2">
                      <span className="text-blue-500">✓</span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {simplifiedResult.eligibility.length > 0 && (
              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60 space-y-2">
                <h4 className="text-xs font-bold text-purple-800 dark:text-purple-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>{ui.understand.eligibility}</span>
                </h4>
                <ul className="space-y-1.5">
                  {simplifiedResult.eligibility.map((item, i) => (
                    <li key={i} className="text-xs sm:text-sm font-semibold text-purple-950 dark:text-purple-100 flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 5. Important Warnings & Penalties (Preserved negations!) */}
          {simplifiedResult.importantWarnings.length > 0 && (
            <div className="p-4 rounded-2xl bg-red-50/80 dark:bg-red-950/30 border border-red-300 dark:border-red-900/60 space-y-2">
              <h4 className="text-xs font-bold text-red-800 dark:text-red-200 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>{ui.understand.warnings}</span>
              </h4>
              <ul className="space-y-1.5">
                {simplifiedResult.importantWarnings.map((warn, i) => (
                  <li key={i} className="text-xs sm:text-sm font-bold text-red-950 dark:text-red-200 flex items-start gap-2">
                    <span className="text-red-500">!</span>
                    <span>{warn}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 6. Contacts & Office Counters */}
          {simplifiedResult.contactInfo.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-teal-600" />
                <span>{ui.understand.contacts}</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {simplifiedResult.contactInfo.map((contact, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700"
                  >
                    {contact}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 7. Difficult Words Explained */}
          {simplifiedResult.difficultWordsExplained && simplifiedResult.difficultWordsExplained.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {ui.understand.difficultWords}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {simplifiedResult.difficultWordsExplained.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs"
                  >
                    <span className="font-bold text-teal-700 dark:text-teal-300 block mb-0.5">
                      "{item.word}"
                    </span>
                    <span className="text-slate-600 dark:text-slate-300">{item.simpleMeaning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legal Disclaimer */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 italic">
            {simplifiedResult.disclaimer}
          </div>
        </section>
      )}
    </div>
  );
};
