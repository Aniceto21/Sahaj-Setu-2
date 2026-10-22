import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SupportedLanguage } from '../types';
import {
  Maximize2,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Printer,
  Sparkles,
  Info,
  Globe,
  Settings,
} from 'lucide-react';

export const ListenerCardPage: React.FC = () => {
  const { passport, openFullscreen, speakText, stopSpeaking, isSpeaking, setActiveTab, ui } = useApp();

  const [activeLang, setActiveLang] = useState<SupportedLanguage>('kok');
  const [copied, setCopied] = useState(false);

  const cardMessages: Record<
    SupportedLanguage,
    {
      title: string;
      greeting: string;
      body: string[];
      tip: string;
    }
  > = {
    en: {
      title: 'COMMUNICATION ASSISTANCE CARD',
      greeting: 'Hello / Namaskar',
      body: [
        'I communicate using this digital device.',
        'Please look at me and speak directly to me in normal tone.',
        'Please allow me 10 to 15 seconds to compose or tap my reply.',
        'You can read my answer directly on this screen, or listen to the voice.',
        'Thank you for your patience, dignity, and respect.',
      ],
      tip: 'Please do not grab my phone or finish my words for me.',
    },
    kok: {
      title: 'संवाद आदार कार्ड • Communication Card',
      greeting: 'नमस्कार / देव बरें करूं',
      body:
        passport.konkaniScript === 'romi'
          ? [
              'Hanv hea digital sadhnan (device) ulounk xoktam.',
              'Upkar korun moje kodden polloiat ani somjikayen uloiat.',
              'Mozo zobab tayar korunk mhaka 10 te 15 second vell diat.',
              'Tumi mozo sondex hea screenacher vachunk xoktat, vo avaz aikonk xoktat.',
              'Moje lagim xantin ani manan uloilolea khatir dev borem korum.',
            ]
          : [
              'हांव ह्या उपकरणाच्या (device) आदारान संवाद सादतां.',
              'उपकार करून म्हजे कडेन पळयात आनी सादारण आवाजांत उलययात.',
              'म्हजो संदेश तयार करपाक म्हाका १० ते १५ सेकंद वेळ दियात.',
              'तुमी म्हजो संदेश ह्या स्क्रीनार वाचूंक शकतात वा आवाज आयकूंक शकतात.',
              'तुमच्या संयमा खातीर आनी आदरा खातीर देव बरें करूं.',
            ],
      tip:
        passport.konkaniScript === 'romi'
          ? 'Upkar korun mozo phone hatant dhorunk naka vo moje zobab adhinch sangunk naka.'
          : 'उपकार करून म्हजो फोन हातांत घेव नाकात वा म्हजे खातीर वाक्यो पुराय करूंक वच नाकात.',
    },
    hi: {
      title: 'संचार सहायता कार्ड • Communication Card',
      greeting: 'नमस्ते / नमस्कार',
      body: [
        'मैं इस डिवाइस के माध्यम से संवाद करता हूँ।',
        'कृपया सीधे मेरी ओर देखकर सहज आवाज़ में बात करें।',
        'मुझे अपना उत्तर लिखने या चुनने के लिए 10-15 सेकंड का समय दें।',
        'आप मेरा संदेश इस स्क्रीन पर पढ़ सकते हैं या आवाज़ सुन सकते हैं।',
        'आपके धैर्य, सम्मान और सहयोग के लिए बहुत-बहुत धन्यवाद।',
      ],
      tip: 'कृपया बिना पूछे मेरा फ़ोन न लें और मेरे वाक्य स्वयं पूरे न करें।',
    },
    mr: {
      title: 'संवाद साहाय्य कार्ड • Communication Card',
      greeting: 'नमस्कार',
      body: [
        'मी या उपकरणाच्या माध्यमातून संवाद साधतो.',
        'कृपया माझ्याकडे पाहून सहज आवाजात बोलावे.',
        'मला उत्तर तयार करण्यासाठी किंवा निवडण्यासाठी 10-15 सेकंद वेळ द्यावा.',
        'तुम्ही माझा संदेश थेट या स्क्रीनवर वाचू शकता किंवा आवाज ऐकू शकता.',
        'तुमच्या सहकार्याबद्दल आणि आदराबद्दल मनःपूर्वक धन्यवाद.',
      ],
      tip: 'कृपया विचारल्याशिवाय माझा फोन घेऊ नका आणि माझी वाक्ये स्वतः पूर्ण करू नका.',
    },
  };

  const currentMsg = cardMessages[activeLang] || cardMessages.en;
  const fullTextToSpeak = `${currentMsg.greeting}. ${currentMsg.body.join(' ')}`;

  const handleFullscreen = () => {
    openFullscreen(
      `${currentMsg.greeting}!\n\n${currentMsg.body.join('\n\n')}`,
      activeLang,
      passport.konkaniScript,
      currentMsg.title
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${currentMsg.title}\n\n${fullTextToSpeak}\n\nTip: ${currentMsg.tip}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {ui.listener.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {ui.listener.subtitle}
          </p>
        </div>

        {/* Language selector chips for the card */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          {(['kok', 'en', 'hi', 'mr'] as SupportedLanguage[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition min-h-[36px] cursor-pointer ${
                activeLang === lang
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {lang === 'kok' ? 'कोंकणी' : lang === 'hi' ? 'हिन्दी' : lang === 'mr' ? 'मराठी' : 'English'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Listener Card Display */}
      <div className="rounded-3xl border-4 border-teal-600 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-2xl space-y-6 print:border-black print:shadow-none">
        {/* Top Card Banner */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-teal-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-black text-lg">
              💬
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-teal-600 dark:text-teal-400 block">
                Sahaj Setu • Facilitated Communication
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {currentMsg.title}
              </h2>
            </div>
          </div>
          {passport.preferredName && (
            <span className="text-xs font-bold px-3 py-1 bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-200 rounded-full border border-teal-200">
              User: {passport.preferredName}
            </span>
          )}
        </div>

        {/* Large Greeting */}
        <div className="text-2xl sm:text-3xl font-black text-teal-700 dark:text-teal-400">
          {currentMsg.greeting}!
        </div>

        {/* Message Lines */}
        <div className="space-y-3.5">
          {currentMsg.body.map((line, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
                {line}
              </p>
            </div>
          ))}
        </div>

        {/* Listener Tip Note */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-100">
            {currentMsg.tip}
          </p>
        </div>

        {/* Custom Passport Notes if provided by user */}
        {passport.customNotes && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Personal Communication Preference:
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
              "{passport.customNotes}"
            </p>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Show Fullscreen across counter */}
            <button
              onClick={handleFullscreen}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-black dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs sm:text-sm shadow-md transition min-h-[44px]"
            >
              <Maximize2 className="w-4 h-4 text-amber-400" />
              <span>{ui.listener.showFullscreen}</span>
            </button>

            {/* Read Aloud */}
            <button
              onClick={() => {
                if (isSpeaking) {
                  stopSpeaking();
                } else {
                  speakText(fullTextToSpeak, activeLang);
                }
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-sm transition min-h-[44px] ${
                isSpeaking
                  ? 'bg-amber-500 text-black animate-pulse'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? ui.common.stop : ui.listener.speakCard}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Copy */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition min-h-[44px]"
              title="Copy card text"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span className="text-xs font-semibold">{copied ? ui.common.copied : ui.common.copy}</span>
            </button>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition min-h-[44px]"
              title="Print listener card"
            >
              <Printer className="w-4 h-4" />
              <span className="text-xs font-semibold">Print</span>
            </button>
          </div>
        </div>
      </div>

      {/* Customize in Passport shortcut */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-800 dark:text-teal-200">
        <span>Want to change your personal communication tips or emergency instructions?</span>
        <button
          onClick={() => setActiveTab('passport')}
          className="flex items-center gap-1 font-bold text-teal-700 dark:text-teal-300 underline"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>{ui.listener.editTips}</span>
        </button>
      </div>
    </div>
  );
};
