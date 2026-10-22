import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SupportedLanguage, KonkaniScript, TextSize, ButtonSize, ReadingLevel } from '../types';
import { storageService } from '../services/storageService';
import {
  Sparkles,
  Download,
  Upload,
  Check,
  Save,
  Shield,
  HelpCircle,
  Plus,
  Trash2,
  Volume2,
  Type,
  Eye,
  Sliders,
  Phone,
  User,
} from 'lucide-react';

export const CommunicationPassportPage: React.FC = () => {
  const { passport, updatePassport, ui, refreshData } = useApp();

  const [name, setName] = useState(passport.preferredName || '');
  const [commLang, setCommLang] = useState<SupportedLanguage>(passport.communicationLanguage);
  const [script, setScript] = useState<KonkaniScript>(passport.konkaniScript);
  const [readingLevel, setReadingLevel] = useState<ReadingLevel>(passport.readingLevel);
  const [speechRate, setSpeechRate] = useState<number>(passport.speechRate || 0.95);
  const [speechFallback, setSpeechFallback] = useState<boolean>(passport.speechFallbackPermitted);
  const [textSize, setTextSize] = useState<TextSize>(passport.textSize);
  const [buttonSize, setButtonSize] = useState<ButtonSize>(passport.buttonSize);
  const [highContrast, setHighContrast] = useState<boolean>(passport.highContrast);
  const [reducedMotion, setReducedMotion] = useState<boolean>(passport.reducedMotion);
  const [quietSensory, setQuietSensory] = useState<boolean>(passport.quietSensoryMode);
  const [customNotes, setCustomNotes] = useState<string>(passport.customNotes || '');
  const [instructions, setInstructions] = useState<string[]>(passport.communicationInstructions || []);
  const [newInstruction, setNewInstruction] = useState('');
  const [contactName, setContactName] = useState(passport.emergencyContactName || '');
  const [contactPhone, setContactPhone] = useState(passport.emergencyContactPhone || '');

  const [savedOk, setSavedOk] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePassport({
      preferredName: name.trim(),
      communicationLanguage: commLang,
      konkaniScript: script,
      readingLevel,
      speechRate,
      speechFallbackPermitted: speechFallback,
      textSize,
      buttonSize,
      highContrast,
      reducedMotion,
      quietSensoryMode: quietSensory,
      customNotes: customNotes.trim(),
      communicationInstructions: instructions,
      emergencyContactName: contactName.trim(),
      emergencyContactPhone: contactPhone.trim(),
    });
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 2500);
  };

  const handleAddInstruction = () => {
    if (!newInstruction.trim()) return;
    setInstructions([...instructions, newInstruction.trim()]);
    setNewInstruction('');
  };

  const handleRemoveInstruction = (idx: number) => {
    setInstructions(instructions.filter((_, i) => i !== idx));
  };

  const handleExport = () => {
    const dataStr = storageService.exportAllData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sahaj_setu_passport_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = storageService.importAllData(content);
      if (success) {
        refreshData();
        setImportStatus('Data imported successfully!');
      } else {
        setImportStatus('Import failed: invalid file format.');
      }
      setTimeout(() => setImportStatus(null), 3000);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {ui.passport.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {ui.passport.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Export button */}
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition min-h-[44px]"
            title="Download JSON backup"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          {/* Import button */}
          <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition min-h-[44px] cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Import</span>
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>
      </div>

      {importStatus && (
        <div className="p-3 rounded-xl bg-teal-50 text-teal-800 dark:bg-teal-950 dark:text-teal-200 text-xs font-semibold">
          {importStatus}
        </div>
      )}

      {/* Main Passport Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Identity & Language Preferences */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
            <User className="w-4 h-4" />
            <span>Personal Profile & Script (Optional)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {ui.passport.nameField}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Maria, Rohan, or Auntie Fatima"
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Only shown on your Listener Card if you choose to display it.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {ui.passport.preferredLang}
              </label>
              <select
                value={commLang}
                onChange={(e) => setCommLang(e.target.value as SupportedLanguage)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
              >
                <option value="kok">Konkani / कोंकणी</option>
                <option value="en">English</option>
                <option value="hi">Hindi / हिन्दी</option>
                <option value="mr">Marathi / मराठी</option>
              </select>
            </div>
          </div>

          {/* Konkani Script Preference */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              {ui.passport.scriptField}:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition ${
                  script === 'deva'
                    ? 'border-teal-600 bg-teal-50/70 dark:bg-teal-950/40'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
                }`}
              >
                <input
                  type="radio"
                  name="script"
                  checked={script === 'deva'}
                  onChange={() => setScript('deva')}
                  className="mt-1"
                />
                <div>
                  <span className="font-bold text-sm text-slate-900 dark:text-white block">
                    Devanagari Script (कोंकणी देवनागरी)
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Official state script used in schools and government notices (उदा. म्हाका उदक जाय).
                  </span>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition ${
                  script === 'romi'
                    ? 'border-teal-600 bg-teal-50/70 dark:bg-teal-950/40'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
                }`}
              >
                <input
                  type="radio"
                  name="script"
                  checked={script === 'romi'}
                  onChange={() => setScript('romi')}
                  className="mt-1"
                />
                <div>
                  <span className="font-bold text-sm text-slate-900 dark:text-white block">
                    Roman / Romi Script (Konknni Romi Lipi)
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Widely used in Goan tiatr, daily communication, and church literature (Ex: Mhaka udok zai).
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Section 2: Speech & Sensory Settings */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
            <Volume2 className="w-4 h-4" />
            <span>Speech Synthesis & Sensory Preferences</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {ui.passport.speechRate}: <span className="text-teal-600">{speechRate}x</span>
              </label>
              <input
                type="range"
                min="0.75"
                max="1.25"
                step="0.05"
                value={speechRate}
                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0.75x (Slower)</span>
                <span>1.0x (Normal)</span>
                <span>1.25x (Faster)</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {ui.passport.readingLevel}
              </label>
              <select
                value={readingLevel}
                onChange={(e) => setReadingLevel(e.target.value as ReadingLevel)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
              >
                <option value="easy-read">Easy-Read (Short phrases, simple words, step-by-step)</option>
                <option value="standard">Standard (Everyday communication)</option>
                <option value="detailed">Detailed (Includes full grammatical nuances)</option>
              </select>
            </div>
          </div>

          {/* Konkani speech fallback consent */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={speechFallback}
                onChange={(e) => setSpeechFallback(e.target.checked)}
                className="mt-1 rounded accent-teal-600"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 dark:text-white block">
                  Permit Phonetic Voice Fallback for Konkani Speech
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  Most browsers do not have pre-installed native Konkani (kok-IN) speech engines. If native voice is missing, allow reading aloud with Indian phonetic engine while clearly displaying text.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Section 3: Visual & Accessibility Theme */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
            <Eye className="w-4 h-4" />
            <span>Accessibility & Visual Theme</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {ui.passport.textSize}
              </label>
              <select
                value={textSize}
                onChange={(e) => setTextSize(e.target.value as TextSize)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
              >
                <option value="normal">Normal (16px default)</option>
                <option value="large">Large (18px readable)</option>
                <option value="xl">Extra Large (20px high legibility)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Touch Button Size
              </label>
              <select
                value={buttonSize}
                onChange={(e) => setButtonSize(e.target.value as ButtonSize)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
              >
                <option value="normal">Standard (44px target)</option>
                <option value="large">Spacious (52px target)</option>
                <option value="jumbo">Jumbo (60px high accessibility)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Sensory Environment
              </label>
              <select
                value={quietSensory ? 'quiet' : 'standard'}
                onChange={(e) => setQuietSensory(e.target.value === 'quiet')}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
              >
                <option value="standard">Standard</option>
                <option value="quiet">Calm Sensory Mode (Muted sounds)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 cursor-pointer">
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                className="rounded accent-teal-600"
              />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {ui.passport.highContrast}
              </span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 cursor-pointer">
              <input
                type="checkbox"
                checked={reducedMotion}
                onChange={(e) => setReducedMotion(e.target.checked)}
                className="rounded accent-teal-600"
              />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {ui.passport.reducedMotion}
              </span>
            </label>
          </div>
        </div>

        {/* Section 4: Communication Instructions for Other People */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="font-bold text-sm text-teal-700 dark:text-teal-400">
              {ui.passport.instructionsTitle}
            </span>
            <span className="text-xs text-slate-400">Shown to listeners on your card</span>
          </div>

          <div className="space-y-2">
            {instructions.map((inst, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
              >
                <span className="font-medium text-slate-800 dark:text-slate-200">"{inst}"</span>
                <button
                  type="button"
                  onClick={() => handleRemoveInstruction(idx)}
                  className="text-red-500 hover:text-red-700 p-1 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={newInstruction}
              onChange={(e) => setNewInstruction(e.target.value)}
              placeholder="e.g. Please speak clearly, I read lips."
              className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white"
            />
            <button
              type="button"
              onClick={handleAddInstruction}
              disabled={!newInstruction.trim()}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs disabled:opacity-40 min-h-[40px]"
            >
              Add
            </button>
          </div>
        </div>

        {/* Section 5: Emergency Contact Info (Local Storage Only) */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-red-600 font-bold text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
            <Phone className="w-4 h-4" />
            <span>Emergency Contact (Stored strictly on this device)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Contact Person Name:
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g. Brother, Caregiver, Dr. Fernandes"
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Emergency Phone Number:
              </label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="e.g. +91 98230 XXXXX"
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-16 sm:bottom-6 z-20 flex items-center justify-between p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl">
          <span className="text-xs text-slate-500">
            {savedOk ? (
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <Check className="w-4 h-4" /> {ui.passport.savedSuccess}
              </span>
            ) : (
              'All settings stay safely on your local device.'
            )}
          </span>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition min-h-[44px]"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
