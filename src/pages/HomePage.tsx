import React from 'react';
import { useApp } from '../context/AppContext';
import { CONTEXT_LABELS } from '../data/curatedPhrases';
import { QuickContext } from '../types';
import {
  FileText,
  MessageSquare,
  AlertCircle,
  HelpCircle,
  Sparkles,
  UserCheck,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  Bus,
  Stethoscope,
  Building2,
  Store,
  Pill,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActiveTab, setSelectedContext, ui, interfaceLang, openFullscreen } = useApp();

  const handleOpenContext = (ctx: QuickContext) => {
    setSelectedContext(ctx);
    setActiveTab('board');
  };

  const goaContexts: { id: QuickContext; icon: any; title: string; desc: string; color: string }[] = [
    {
      id: 'hospital',
      icon: Stethoscope,
      title: 'Hospital & Clinic',
      desc: 'GMC, Asilo, Hospicio, PHC & doctor visits',
      color: 'border-rose-200 bg-rose-50/70 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300',
    },
    {
      id: 'transport',
      icon: Bus,
      title: 'Bus, Ferry & Rickshaw',
      desc: 'Kadamba buses, river ferries & pilots',
      color: 'border-sky-200 bg-sky-50/70 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300',
    },
    {
      id: 'government',
      icon: Building2,
      title: 'Panchayat & Govt Office',
      desc: 'Gram Panchayat, Mamlatdar & certificates',
      color: 'border-amber-200 bg-amber-50/70 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300',
    },
    {
      id: 'pharmacy',
      icon: Pill,
      title: 'Pharmacy & Medical Shop',
      desc: 'Buying medicines, doses & prescriptions',
      color: 'border-emerald-200 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300',
    },
    {
      id: 'market',
      icon: Store,
      title: 'Market & Local Bakery',
      desc: 'Mapusa/Margao market, fish stalls & bread',
      color: 'border-purple-200 bg-purple-50/70 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300',
    },
    {
      id: 'emergency',
      icon: ShieldAlert,
      title: 'Urgent Help & Safety',
      desc: '108 ambulance, police & emergency contacts',
      color: 'border-red-300 bg-red-100/80 dark:bg-red-950/50 text-red-800 dark:text-red-200',
    },
  ];

  return (
    <div className="space-y-8 pb-20 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-900 text-white p-6 sm:p-10 shadow-xl">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-900/60 border border-teal-400/30 px-3.5 py-1 text-xs font-semibold text-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Goa Multilingual Accessibility Bridge • कोंकणी • हिन्दी • मराठी • English</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {ui.home.heroTitle}
          </h1>
          <p className="text-sm sm:text-base text-teal-100 font-normal leading-relaxed">
            {ui.home.heroSubtitle}
          </p>
        </div>
      </section>

      {/* TWO PRIMARY ACTIONS (Prompt Priority 1 & 16) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5" aria-label="Core Capabilities">
        {/* ACTION 1: UNDERSTAND THE WORLD */}
        <div className="flex flex-col justify-between rounded-3xl border-2 border-teal-500/30 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-md hover:shadow-xl hover:border-teal-500 transition group">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-100 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300 flex items-center justify-center">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Action 1 • माहिती समजात
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                {ui.home.understandCardTitle}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {ui.home.understandCardDesc}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('understand')}
              className="w-full flex items-center justify-between rounded-2xl bg-teal-600 hover:bg-teal-700 active:scale-98 text-white px-5 py-3.5 text-sm sm:text-base font-bold shadow-md transition min-h-[48px]"
            >
              <span>{ui.home.understandCardAction}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* ACTION 2: BE UNDERSTOOD */}
        <div className="flex flex-col justify-between rounded-3xl border-2 border-emerald-500/30 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-md hover:shadow-xl hover:border-emerald-500 transition group">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Action 2 • तुमची गरज सांगात
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                {ui.home.beUnderstoodTitle}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {ui.home.beUnderstoodDesc}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                setSelectedContext('general');
                setActiveTab('board');
              }}
              className="w-full flex items-center justify-between rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white px-5 py-3.5 text-sm sm:text-base font-bold shadow-md transition min-h-[48px]"
            >
              <span>{ui.home.beUnderstoodAction}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Quick Situations in Goa */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {ui.home.quickContextsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Select a location to immediately open vetted phrases in Konkani, Hindi, Marathi, and English.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {goaContexts.map((ctx) => {
            const Icon = ctx.icon;
            return (
              <button
                key={ctx.id}
                onClick={() => handleOpenContext(ctx.id)}
                className={`flex flex-col text-left p-4 rounded-2xl border transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xs cursor-pointer min-h-[110px] justify-between ${ctx.color}`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base leading-snug">{ctx.title}</h3>
                  <p className="text-[11px] opacity-80 line-clamp-1">{ctx.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Listener Card Banner */}
      <section className="rounded-3xl border border-teal-200 dark:border-teal-800 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-slate-900 dark:to-teal-950/40 p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-teal-600 text-white shrink-0 mt-1 shadow-md">
            <UserCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {ui.home.listenerCardBannerTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              {ui.home.listenerCardBannerDesc}
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('listener')}
          className="w-full sm:w-auto shrink-0 rounded-xl bg-teal-700 hover:bg-teal-800 text-white px-5 py-3 text-sm font-semibold shadow-sm transition min-h-[44px]"
        >
          {ui.home.listenerCardBannerAction}
        </button>
      </section>

      {/* Emergency Quick Bar */}
      <section className="rounded-2xl border-2 border-red-300 dark:border-red-900 bg-red-50/90 dark:bg-red-950/40 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="p-2 rounded-xl bg-red-600 text-white shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-red-900 dark:text-red-200">
              {ui.home.emergencyBannerTitle}
            </h4>
            <p className="text-xs text-red-700 dark:text-red-300">
              Goa Ambulance 108 • Police 112 • Women Helpline 1091 • Childline 1098
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              openFullscreen(
                'I NEED IMMEDIATE MEDICAL HELP / AMBULANCE 108. PLEASE CALL FOR ME.',
                interfaceLang,
                undefined,
                'EMERGENCY ASSISTANCE'
              );
            }}
            className="flex-1 sm:flex-none rounded-xl bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider shadow-sm transition min-h-[44px]"
          >
            Show SOS Card
          </button>
          <button
            onClick={() => handleOpenContext('emergency')}
            className="flex-1 sm:flex-none rounded-xl border border-red-300 bg-white dark:bg-slate-900 text-red-700 dark:text-red-300 hover:bg-red-50 px-4 py-2.5 text-xs font-semibold shadow-xs transition min-h-[44px]"
          >
            {ui.home.emergencyBannerAction}
          </button>
        </div>
      </section>
    </div>
  );
};
