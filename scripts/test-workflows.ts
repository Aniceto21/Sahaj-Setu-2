/**
 * Core Workflow Automated Test Suite for Sahaj Setu
 */
import { INITIAL_PHRASES, getPhraseText, LANGUAGES } from '../src/data/curatedPhrases.ts';
import { storageService, DEFAULT_PASSPORT } from '../src/services/storageService.ts';
import { speechService } from '../src/services/speechService.ts';
import { simplificationService } from '../src/services/simplificationService.ts';
import { SupportedLanguage } from '../src/types/index.ts';

// Mock localStorage for node test runner
class MockLocalStorage {
  private store: Record<string, string> = {};
  getItem(key: string) { return this.store[key] || null; }
  setItem(key: string, value: string) { this.store[key] = value.toString(); }
  removeItem(key: string) { delete this.store[key]; }
  clear() { this.store = {}; }
}
(globalThis as any).localStorage = new MockLocalStorage();
try {
  Object.defineProperty(globalThis, 'navigator', {
    value: { onLine: false },
    configurable: true,
    writable: true,
  });
} catch (e) {
  // Ignore if already defined
}

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
    failed++;
  }
}

async function runTests() {
  console.log('\n--- Running Sahaj Setu Automated Test Suite ---\n');

  // Test 1: Language switching & coverage
  const langCodes = LANGUAGES.map(l => l.code);
  assert(
    langCodes.includes('en') && langCodes.includes('kok') && langCodes.includes('hi') && langCodes.includes('mr'),
    'Test 1: Supports English, Konkani, Hindi, and Marathi'
  );

  // Test 2: Konkani Devanagari vs Romi script rendering
  const testPhrase = INITIAL_PHRASES.find(p => p.id === 'p-need-1')!;
  const devaText = getPhraseText(testPhrase, 'kok', 'deva');
  const romiText = getPhraseText(testPhrase, 'kok', 'romi');
  assert(
    devaText.includes('आदार') && romiText.toLowerCase().includes('adar'),
    'Test 2: Correctly renders Konkani in both Devanagari and Romi scripts'
  );

  // Test 3: Language selection persistence does not reset demo data
  storageService.savePassport({ ...DEFAULT_PASSPORT, interfaceLanguage: 'kok' });
  const retrieved = storageService.getPassport();
  assert(retrieved.interfaceLanguage === 'kok', 'Test 3: Language selection persists in storage');

  // Test 4: Reset Demo preserves chosen language
  storageService.resetDemoData();
  const afterReset = storageService.getPassport();
  assert(
    afterReset.interfaceLanguage === 'kok',
    'Test 4: Reset Demo preserves active language preference without resetting it'
  );

  // Test 5: Preserves custom phrases and favorites
  const custom = storageService.addCustomPhrase({
    category: 'basic_needs',
    icon: 'MessageSquare',
    translations: {
      en: 'Please turn on the fan',
      kok_deva: 'उपकार करून पंखो चालू करात',
      kok_romi: 'Upkar korun pankho chalu korat',
      hi: 'कृपया पंखा चला दें',
      mr: 'कृपया पंखा सुरू करा'
    }
  });
  const allPhrases = storageService.getPhrases();
  assert(allPhrases.some(p => p.id === custom.id), 'Test 5: Custom phrase successfully created and stored locally');

  // Test 6: Offline notice simplification fallback
  const sampleNotice = "GOVERNMENT OF GOA NOTICE: All bus passes expire on 30th November 2026. Helpline 0832-2438034.";
  const simplified = (simplificationService as any).offlineFallbackSimplification(sampleNotice, 'en');
  assert(
    simplified.contactInfo.some((c: string) => c.includes('0832-2438034')),
    'Test 6: Offline notice simplification preserves contact numbers verbatim'
  );

  // Test 7: Speech availability checks for kok-IN
  const voiceCheck = speechService.checkVoiceAvailability('kok');
  assert(
    voiceCheck.langTag === 'kok-IN',
    'Test 7: Voice service checks kok-IN tags and provides honest status notice if missing'
  );

  // Test 8: Toggling favorites
  const unfavPhrase = INITIAL_PHRASES.find(p => !p.isFavorite)!;
  const favList = storageService.toggleFavorite(unfavPhrase.id);
  assert(favList.includes(unfavPhrase.id), 'Test 8: Favorite toggle successfully persists card ID');

  console.log(`\nTest Results: ${passed} passed, ${failed} failed.\n`);
  if (failed > 0) process.exit(1);
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
