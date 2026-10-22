import { SupportedLanguage, KonkaniScript } from '../types';
import { INITIAL_PHRASES, getPhraseText } from '../data/curatedPhrases';

export interface TranslationResult {
  translatedText: string;
  detectedSourceLang?: string;
  targetLang: SupportedLanguage;
  scriptUsed?: string;
  pronunciationGuide?: string;
  accuracyNote?: string;
  isOfflineFallback?: boolean;
}

export class TranslationService {
  public async translateText(
    text: string,
    sourceLang: string = 'auto',
    targetLang: SupportedLanguage = 'kok',
    script: KonkaniScript = 'deva'
  ): Promise<TranslationResult> {
    if (!text || !text.trim()) {
      return { translatedText: '', targetLang };
    }

    // Check offline dictionary match first for instant/offline response
    const trimmed = text.trim().toLowerCase();
    const offlineMatch = INITIAL_PHRASES.find((p) => {
      const en = p.translations.en.toLowerCase();
      const kd = p.translations.kok_deva.toLowerCase();
      const kr = p.translations.kok_romi.toLowerCase();
      const hi = p.translations.hi.toLowerCase();
      const mr = p.translations.mr.toLowerCase();
      return en === trimmed || kd === trimmed || kr === trimmed || hi === trimmed || mr === trimmed;
    });

    // If device is offline or user asks for curated phrase
    if (!navigator.onLine) {
      if (offlineMatch) {
        return {
          translatedText: getPhraseText(offlineMatch, targetLang, script),
          detectedSourceLang: 'curated-database',
          targetLang,
          scriptUsed: targetLang === 'kok' ? (script === 'romi' ? 'Romi Lipi' : 'Devanagari') : undefined,
          isOfflineFallback: true,
          accuracyNote: 'Verified offline Goan phrase pack translation.',
        };
      }
      throw new Error(
        'Device is offline. New AI translations require an internet connection. Please pick from the verified offline Communication Board.'
      );
    }

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          sourceLang,
          targetLang,
          script,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        // If curated offline match exists, fall back smoothly
        if (offlineMatch) {
          return {
            translatedText: getPhraseText(offlineMatch, targetLang, script),
            detectedSourceLang: 'curated-database',
            targetLang,
            scriptUsed: targetLang === 'kok' ? (script === 'romi' ? 'Romi Lipi' : 'Devanagari') : undefined,
            isOfflineFallback: true,
            accuracyNote: 'Curated phrase pack used (Server AI currently unreachable).',
          };
        }
        throw new Error(errorData.error || `Translation request failed with status ${response.status}`);
      }

      const data = await response.json();
      return {
        translatedText: data.translatedText || text,
        detectedSourceLang: data.detectedSourceLang,
        targetLang,
        scriptUsed: data.scriptUsed,
        pronunciationGuide: data.pronunciationGuide,
        accuracyNote:
          data.accuracyNote ||
          'Automated AI translation. For critical healthcare, medication, or legal actions, please verify with an official or fluent speaker.',
      };
    } catch (err: any) {
      if (offlineMatch) {
        return {
          translatedText: getPhraseText(offlineMatch, targetLang, script),
          detectedSourceLang: 'curated-database',
          targetLang,
          scriptUsed: targetLang === 'kok' ? (script === 'romi' ? 'Romi Lipi' : 'Devanagari') : undefined,
          isOfflineFallback: true,
          accuracyNote: 'Curated verified phrase used as fallback.',
        };
      }
      throw err;
    }
  }
}

export const translationService = new TranslationService();
