import { SupportedLanguage } from '../types';

export interface VoiceStatus {
  available: boolean;
  voiceName?: string;
  langTag: string;
  isNative: boolean;
  message?: string;
}

export class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;
  private onStateChangeListeners: ((speaking: boolean) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    if (this.voices.length === 0) {
      this.voices = this.synth.getVoices();
    }
    return this.voices;
  }

  public subscribeState(listener: (speaking: boolean) => void): () => void {
    this.onStateChangeListeners.push(listener);
    return () => {
      this.onStateChangeListeners = this.onStateChangeListeners.filter((l) => l !== listener);
    };
  }

  private notifyState(speaking: boolean) {
    this.isSpeaking = speaking;
    this.onStateChangeListeners.forEach((l) => l(speaking));
  }

  public checkVoiceAvailability(lang: SupportedLanguage): VoiceStatus {
    const voices = this.getAvailableVoices();
    const isKok = lang === 'kok';
    const isHi = lang === 'hi';
    const isMr = lang === 'mr';

    if (isKok) {
      // Check for Konkani voice
      const kokVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith('kok') ||
          v.name.toLowerCase().includes('konkani')
      );
      if (kokVoice) {
        return {
          available: true,
          voiceName: kokVoice.name,
          langTag: 'kok-IN',
          isNative: true,
        };
      }
      // Konkani not natively present in most browser engines
      const fallbackVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith('hi') ||
          v.lang.toLowerCase().startsWith('mr') ||
          v.lang.toLowerCase().startsWith('en-in')
      );
      return {
        available: false,
        voiceName: fallbackVoice?.name,
        langTag: 'kok-IN',
        isNative: false,
        message:
          'Native Konkani (kok-IN) speech voice is not pre-installed on this device/browser. You can read using large visual display, or play with phonetic voice.',
      };
    }

    if (isHi) {
      const hiVoice = voices.find((v) => v.lang.toLowerCase().startsWith('hi'));
      return {
        available: !!hiVoice,
        voiceName: hiVoice?.name,
        langTag: 'hi-IN',
        isNative: !!hiVoice,
        message: hiVoice ? undefined : 'Hindi voice is not installed in this browser.',
      };
    }

    if (isMr) {
      const mrVoice = voices.find((v) => v.lang.toLowerCase().startsWith('mr'));
      return {
        available: !!mrVoice,
        voiceName: mrVoice?.name,
        langTag: 'mr-IN',
        isNative: !!mrVoice,
        message: mrVoice
          ? undefined
          : 'Marathi voice is not installed in this browser.',
      };
    }

    // English
    const enInVoice = voices.find((v) => v.lang.toLowerCase() === 'en-in') ||
      voices.find((v) => v.lang.toLowerCase().startsWith('en'));
    return {
      available: !!enInVoice,
      voiceName: enInVoice?.name,
      langTag: enInVoice?.lang || 'en-IN',
      isNative: !!enInVoice,
    };
  }

  public speak(
    text: string,
    lang: SupportedLanguage,
    options?: {
      rate?: number;
      allowFallback?: boolean;
      onEnd?: () => void;
      onError?: (err: any) => void;
    }
  ): { started: boolean; notice?: string } {
    if (!this.synth) {
      return { started: false, notice: 'Speech synthesis is not supported in this browser.' };
    }

    this.stop();

    if (!text.trim()) {
      return { started: false, notice: 'No text to speak.' };
    }

    const voiceStatus = this.checkVoiceAvailability(lang);
    const voices = this.getAvailableVoices();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options?.rate || 0.95;

    let notice: string | undefined = undefined;

    if (lang === 'kok') {
      const kokVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith('kok') ||
          v.name.toLowerCase().includes('konkani')
      );
      if (kokVoice) {
        utterance.voice = kokVoice;
        utterance.lang = 'kok-IN';
      } else if (options?.allowFallback) {
        // Fallback to Indian voice (Hindi or Indian English) with transparent notice
        const fallback = voices.find(
          (v) =>
            v.lang.toLowerCase().startsWith('hi') ||
            v.lang.toLowerCase().startsWith('mr') ||
            v.lang.toLowerCase().startsWith('en-in')
        );
        if (fallback) {
          utterance.voice = fallback;
          utterance.lang = fallback.lang;
          notice = `Playing Konkani using ${fallback.name} (no native kok-IN voice found).`;
        } else {
          notice = 'No Indian voice found for Konkani phonetic playback.';
        }
      } else {
        return {
          started: false,
          notice:
            'Native Konkani voice not detected. Please enable phonetic playback in Passport or use the Large Visual Card display.',
        };
      }
    } else if (lang === 'hi') {
      const hiVoice = voices.find((v) => v.lang.toLowerCase().startsWith('hi'));
      if (hiVoice) {
        utterance.voice = hiVoice;
        utterance.lang = 'hi-IN';
      } else {
        utterance.lang = 'hi-IN';
      }
    } else if (lang === 'mr') {
      const mrVoice = voices.find((v) => v.lang.toLowerCase().startsWith('mr'));
      if (mrVoice) {
        utterance.voice = mrVoice;
        utterance.lang = 'mr-IN';
      } else {
        utterance.lang = 'mr-IN';
      }
    } else {
      const enVoice =
        voices.find((v) => v.lang.toLowerCase() === 'en-in') ||
        voices.find((v) => v.lang.toLowerCase().startsWith('en'));
      if (enVoice) {
        utterance.voice = enVoice;
        utterance.lang = enVoice.lang;
      } else {
        utterance.lang = 'en-IN';
      }
    }

    utterance.onstart = () => {
      this.notifyState(true);
    };

    utterance.onend = () => {
      this.notifyState(false);
      options?.onEnd?.();
    };

    utterance.onerror = (e) => {
      this.notifyState(false);
      options?.onError?.(e);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);

    return { started: true, notice };
  }

  public stop() {
    if (!this.synth) return;
    this.synth.cancel();
    this.notifyState(false);
    this.currentUtterance = null;
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const speechService = new SpeechService();
