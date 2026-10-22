export type SupportedLanguage = 'en' | 'kok' | 'hi' | 'mr';

export type KonkaniScript = 'deva' | 'romi';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  subLabel?: string;
  speechTag: string;
}

export type ReadingLevel = 'easy-read' | 'standard' | 'detailed';

export type ButtonSize = 'normal' | 'large' | 'jumbo';

export type TextSize = 'normal' | 'large' | 'xl';

export interface CommunicationPassport {
  preferredName?: string;
  interfaceLanguage: SupportedLanguage;
  communicationLanguage: SupportedLanguage;
  translationTargetLanguage: SupportedLanguage;
  konkaniScript: KonkaniScript;
  readingLevel: ReadingLevel;
  preferredCommunicationMethod: string[]; // 'text', 'pictograms', 'phrases', 'speech', 'large_display'
  speechRate: number; // 0.8 to 1.2
  speechVoiceName?: string;
  speechFallbackPermitted: boolean; // if kok voice is missing, allowed to use Hindi voice with notification
  textSize: TextSize;
  buttonSize: ButtonSize;
  highContrast: boolean;
  reducedMotion: boolean;
  quietSensoryMode: boolean;
  communicationInstructions: string[];
  customNotes?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  lastUpdated: string;
}

export type PhraseCategory =
  | 'greetings'
  | 'basic_needs'
  | 'food_water'
  | 'medical'
  | 'pain'
  | 'emergency'
  | 'feelings'
  | 'travel'
  | 'shopping'
  | 'government'
  | 'education'
  | 'assistance'
  | 'preferences'
  | 'social';

export type QuickContext =
  | 'hospital'
  | 'pharmacy'
  | 'transport'
  | 'government'
  | 'market'
  | 'education'
  | 'home'
  | 'emergency'
  | 'general';

export interface PhraseTranslations {
  en: string;
  kok_deva: string;
  kok_romi: string;
  hi: string;
  mr: string;
}

export interface CommunicationPhrase {
  id: string;
  category: PhraseCategory;
  contexts?: QuickContext[];
  icon: string; // Lucide icon name or emoji
  translations: PhraseTranslations;
  isCustom?: boolean;
  isFavorite?: boolean;
  urgency?: 'low' | 'normal' | 'high' | 'emergency';
}

export interface SimplifiedNotice {
  id: string;
  title: string;
  summary: string;
  actionSteps: string[];
  deadlines: string[];
  feesAndCosts: string[];
  requiredDocuments: string[];
  eligibility: string[];
  importantWarnings: string[];
  contactInfo: string[];
  difficultWordsExplained: { word: string; simpleMeaning: string }[];
  disclaimer: string;
  originalText: string;
  extractedFromImage?: boolean;
  savedAt: string;
  language: SupportedLanguage;
  script?: string;
}

export interface ListenerCardData {
  title: string;
  headline: string;
  messageLines: string[];
  preferredScript: KonkaniScript;
  customTip?: string;
}
