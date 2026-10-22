import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  SupportedLanguage,
  KonkaniScript,
  CommunicationPassport,
  CommunicationPhrase,
  QuickContext,
} from '../types';
import { storageService, DEFAULT_PASSPORT } from '../services/storageService';
import { speechService } from '../services/speechService';
import { UI_STRINGS } from '../data/uiTranslations';

interface FullscreenData {
  isOpen: boolean;
  text: string;
  lang: SupportedLanguage;
  script?: KonkaniScript;
  title?: string;
  subtitle?: string;
}

interface AppContextType {
  interfaceLang: SupportedLanguage;
  setInterfaceLang: (lang: SupportedLanguage) => void;
  passport: CommunicationPassport;
  updatePassport: (updated: Partial<CommunicationPassport>) => void;
  phrases: CommunicationPhrase[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  addCustomPhrase: (phrase: Omit<CommunicationPhrase, 'id' | 'isCustom'>) => void;
  deleteCustomPhrase: (id: string) => void;
  composedMessage: string;
  setComposedMessage: React.Dispatch<React.SetStateAction<string>>;
  appendToComposed: (text: string) => void;
  clearComposed: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedContext: QuickContext;
  setSelectedContext: (ctx: QuickContext) => void;
  fullscreenModal: FullscreenData;
  openFullscreen: (text: string, lang?: SupportedLanguage, script?: KonkaniScript, title?: string, subtitle?: string) => void;
  closeFullscreen: () => void;
  isSpeaking: boolean;
  speakText: (text: string, lang?: SupportedLanguage) => { started: boolean; notice?: string };
  stopSpeaking: () => void;
  ui: typeof UI_STRINGS['en'];
  resetDemo: () => void;
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [passport, setPassport] = useState<CommunicationPassport>(() => storageService.getPassport());
  const [interfaceLang, setInterfaceLangState] = useState<SupportedLanguage>(() => {
    const saved = storageService.getPassport().interfaceLanguage;
    return saved || 'en';
  });
  const [phrases, setPhrases] = useState<CommunicationPhrase[]>(() => storageService.getPhrases());
  const [favorites, setFavorites] = useState<string[]>(() => storageService.getFavorites());
  const [composedMessage, setComposedMessage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedContext, setSelectedContext] = useState<QuickContext>('general');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const [fullscreenModal, setFullscreenModal] = useState<FullscreenData>({
    isOpen: false,
    text: '',
    lang: 'en',
  });

  // Track speech synthesizer state
  useEffect(() => {
    const unsubscribe = speechService.subscribeState((speaking) => {
      setIsSpeaking(speaking);
    });
    return () => unsubscribe();
  }, []);

  // Update interface language separately without resetting data
  const setInterfaceLang = (lang: SupportedLanguage) => {
    setInterfaceLangState(lang);
    const updated = { ...passport, interfaceLanguage: lang };
    setPassport(updated);
    storageService.savePassport(updated);
  };

  const updatePassport = (updatedFields: Partial<CommunicationPassport>) => {
    const next = { ...passport, ...updatedFields };
    setPassport(next);
    storageService.savePassport(next);
  };

  const toggleFavorite = (id: string) => {
    const next = storageService.toggleFavorite(id);
    setFavorites(next);
    setPhrases((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: next.includes(id) } : p))
    );
  };

  const addCustomPhrase = (newPhrase: Omit<CommunicationPhrase, 'id' | 'isCustom'>) => {
    const created = storageService.addCustomPhrase(newPhrase);
    setPhrases((prev) => [created, ...prev]);
  };

  const deleteCustomPhrase = (id: string) => {
    storageService.deleteCustomPhrase(id);
    setPhrases((prev) => prev.filter((p) => p.id !== id));
  };

  const appendToComposed = (text: string) => {
    setComposedMessage((prev) => {
      const trimmed = prev.trim();
      return trimmed ? `${trimmed} ${text}` : text;
    });
  };

  const clearComposed = () => {
    setComposedMessage('');
  };

  const openFullscreen = (
    text: string,
    lang?: SupportedLanguage,
    script?: KonkaniScript,
    title?: string,
    subtitle?: string
  ) => {
    setFullscreenModal({
      isOpen: true,
      text,
      lang: lang || interfaceLang,
      script: script || passport.konkaniScript,
      title,
      subtitle,
    });
  };

  const closeFullscreen = () => {
    setFullscreenModal((prev) => ({ ...prev, isOpen: false }));
  };

  const speakText = (text: string, lang?: SupportedLanguage) => {
    const targetLang = lang || interfaceLang;
    return speechService.speak(text, targetLang, {
      rate: passport.speechRate || 0.95,
      allowFallback: passport.speechFallbackPermitted,
    });
  };

  const stopSpeaking = () => {
    speechService.stop();
  };

  const refreshData = () => {
    setPassport(storageService.getPassport());
    setPhrases(storageService.getPhrases());
    setFavorites(storageService.getFavorites());
  };

  const resetDemo = () => {
    storageService.resetDemoData();
    refreshData();
    setComposedMessage('');
  };

  const ui = UI_STRINGS[interfaceLang] || UI_STRINGS.en;

  // Apply high-contrast or text-size class to document root
  useEffect(() => {
    const root = document.documentElement;
    if (passport.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (passport.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xl');
    root.classList.add(`text-size-${passport.textSize || 'normal'}`);
  }, [passport.highContrast, passport.reducedMotion, passport.textSize]);

  return (
    <AppContext.Provider
      value={{
        interfaceLang,
        setInterfaceLang,
        passport,
        updatePassport,
        phrases,
        favorites,
        toggleFavorite,
        addCustomPhrase,
        deleteCustomPhrase,
        composedMessage,
        setComposedMessage,
        appendToComposed,
        clearComposed,
        activeTab,
        setActiveTab,
        selectedContext,
        setSelectedContext,
        fullscreenModal,
        openFullscreen,
        closeFullscreen,
        isSpeaking,
        speakText,
        stopSpeaking,
        ui,
        resetDemo,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
