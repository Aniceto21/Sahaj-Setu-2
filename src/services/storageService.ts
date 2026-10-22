import {
  CommunicationPassport,
  CommunicationPhrase,
  SimplifiedNotice,
  SupportedLanguage,
  KonkaniScript,
} from '../types';
import { INITIAL_PHRASES } from '../data/curatedPhrases';

const PASSPORT_KEY = 'sahaj_setu_passport_v1';
const PHRASES_KEY = 'sahaj_setu_phrases_v1';
const FAVORITES_KEY = 'sahaj_setu_favorites_v1';
const NOTICES_KEY = 'sahaj_setu_notices_v1';
const SAVED_MESSAGES_KEY = 'sahaj_setu_saved_messages_v1';

export const DEFAULT_PASSPORT: CommunicationPassport = {
  preferredName: '',
  interfaceLanguage: 'en',
  communicationLanguage: 'kok',
  translationTargetLanguage: 'kok',
  konkaniScript: 'deva',
  readingLevel: 'easy-read',
  preferredCommunicationMethod: ['text', 'pictograms', 'phrases', 'speech'],
  speechRate: 0.95,
  speechFallbackPermitted: true,
  textSize: 'normal',
  buttonSize: 'normal',
  highContrast: false,
  reducedMotion: false,
  quietSensoryMode: false,
  communicationInstructions: [
    'Please give me 10-15 seconds to reply.',
    'Speak directly to me in a calm voice.',
    'You can read my answer on the screen.',
    'Please do not finish my sentences for me.',
  ],
  customNotes: 'I communicate independently using Sahaj Setu.',
  emergencyContactName: '',
  emergencyContactPhone: '',
  lastUpdated: new Date().toISOString(),
};

export const storageService = {
  getPassport(): CommunicationPassport {
    try {
      const data = localStorage.getItem(PASSPORT_KEY);
      if (data) {
        return { ...DEFAULT_PASSPORT, ...JSON.parse(data) };
      }
    } catch (e) {
      console.warn('Error reading passport from localStorage:', e);
    }
    return DEFAULT_PASSPORT;
  },

  savePassport(passport: CommunicationPassport): void {
    try {
      localStorage.setItem(
        PASSPORT_KEY,
        JSON.stringify({ ...passport, lastUpdated: new Date().toISOString() })
      );
    } catch (e) {
      console.error('Error saving passport to localStorage:', e);
    }
  },

  getPhrases(): CommunicationPhrase[] {
    try {
      const custom = localStorage.getItem(PHRASES_KEY);
      const parsedCustom: CommunicationPhrase[] = custom ? JSON.parse(custom) : [];
      const favIds = this.getFavorites();

      const combined = [...INITIAL_PHRASES, ...parsedCustom].map((p) => ({
        ...p,
        isFavorite: favIds.includes(p.id) || !!p.isFavorite,
      }));

      return combined;
    } catch (e) {
      console.warn('Error reading phrases:', e);
      return INITIAL_PHRASES;
    }
  },

  addCustomPhrase(phrase: Omit<CommunicationPhrase, 'id' | 'isCustom'>): CommunicationPhrase {
    const newPhrase: CommunicationPhrase = {
      ...phrase,
      id: 'custom-' + Date.now(),
      isCustom: true,
    };
    try {
      const existing = localStorage.getItem(PHRASES_KEY);
      const list: CommunicationPhrase[] = existing ? JSON.parse(existing) : [];
      list.unshift(newPhrase);
      localStorage.setItem(PHRASES_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Error saving custom phrase:', e);
    }
    return newPhrase;
  },

  deleteCustomPhrase(id: string): void {
    try {
      const existing = localStorage.getItem(PHRASES_KEY);
      if (existing) {
        const list: CommunicationPhrase[] = JSON.parse(existing);
        const updated = list.filter((p) => p.id !== id);
        localStorage.setItem(PHRASES_KEY, JSON.stringify(updated));
      }
    } catch (e) {
      console.error('Error deleting custom phrase:', e);
    }
  },

  getFavorites(): string[] {
    try {
      const fav = localStorage.getItem(FAVORITES_KEY);
      if (fav) return JSON.parse(fav);
      return INITIAL_PHRASES.filter((p) => p.isFavorite).map((p) => p.id);
    } catch (e) {
      return [];
    }
  },

  toggleFavorite(id: string): string[] {
    const favs = this.getFavorites();
    const next = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id];
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    } catch (e) {
      console.error('Error updating favorites:', e);
    }
    return next;
  },

  getSavedNotices(): SimplifiedNotice[] {
    try {
      const notices = localStorage.getItem(NOTICES_KEY);
      return notices ? JSON.parse(notices) : [];
    } catch (e) {
      return [];
    }
  },

  saveNotice(notice: SimplifiedNotice): void {
    try {
      const list = this.getSavedNotices();
      const filtered = list.filter((n) => n.id !== notice.id);
      filtered.unshift(notice);
      localStorage.setItem(NOTICES_KEY, JSON.stringify(filtered.slice(0, 30)));
    } catch (e) {
      console.error('Error saving notice:', e);
    }
  },

  deleteNotice(id: string): void {
    try {
      const list = this.getSavedNotices();
      localStorage.setItem(NOTICES_KEY, JSON.stringify(list.filter((n) => n.id !== id)));
    } catch (e) {
      console.error('Error deleting notice:', e);
    }
  },

  getSavedMessages(): { id: string; text: string; date: string; lang: SupportedLanguage }[] {
    try {
      const raw = localStorage.getItem(SAVED_MESSAGES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  saveMessage(text: string, lang: SupportedLanguage) {
    if (!text.trim()) return;
    try {
      const list = this.getSavedMessages();
      list.unshift({
        id: 'msg-' + Date.now(),
        text: text.trim(),
        date: new Date().toISOString(),
        lang,
      });
      localStorage.setItem(SAVED_MESSAGES_KEY, JSON.stringify(list.slice(0, 25)));
    } catch (e) {
      console.error('Error saving message:', e);
    }
  },

  deleteSavedMessage(id: string) {
    try {
      const list = this.getSavedMessages().filter((m) => m.id !== id);
      localStorage.setItem(SAVED_MESSAGES_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Error deleting message:', e);
    }
  },

  exportAllData(): string {
    const exportBundle = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      passport: this.getPassport(),
      favorites: this.getFavorites(),
      customPhrases: JSON.parse(localStorage.getItem(PHRASES_KEY) || '[]'),
      savedNotices: this.getSavedNotices(),
      savedMessages: this.getSavedMessages(),
    };
    return JSON.stringify(exportBundle, null, 2);
  },

  importAllData(jsonString: string): boolean {
    try {
      const bundle = JSON.parse(jsonString);
      if (!bundle || typeof bundle !== 'object') return false;

      if (bundle.passport) localStorage.setItem(PASSPORT_KEY, JSON.stringify(bundle.passport));
      if (bundle.favorites) localStorage.setItem(FAVORITES_KEY, JSON.stringify(bundle.favorites));
      if (bundle.customPhrases) localStorage.setItem(PHRASES_KEY, JSON.stringify(bundle.customPhrases));
      if (bundle.savedNotices) localStorage.setItem(NOTICES_KEY, JSON.stringify(bundle.savedNotices));
      if (bundle.savedMessages) localStorage.setItem(SAVED_MESSAGES_KEY, JSON.stringify(bundle.savedMessages));

      return true;
    } catch (e) {
      console.error('Failed to import data:', e);
      return false;
    }
  },

  resetDemoData(): void {
    // Note: Preserves the user's active language preference to strictly adhere to requirement 3 & 12!
    const currentPassport = this.getPassport();
    const preservedLang = currentPassport.interfaceLanguage;
    const preservedScript = currentPassport.konkaniScript;

    localStorage.removeItem(PHRASES_KEY);
    localStorage.removeItem(NOTICES_KEY);
    localStorage.removeItem(SAVED_MESSAGES_KEY);
    localStorage.removeItem(FAVORITES_KEY);

    this.savePassport({
      ...DEFAULT_PASSPORT,
      interfaceLanguage: preservedLang,
      konkaniScript: preservedScript,
    });
  },
};
