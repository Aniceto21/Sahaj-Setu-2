import { SimplifiedNotice, SupportedLanguage, KonkaniScript } from '../types';
import { SAMPLE_NOTICES, getSampleNoticeEasyRead } from '../data/sampleNotices';
import { translationService } from './translationService';

export class SimplificationService {
  public async simplifyNotice(
    text: string,
    targetLang: SupportedLanguage = 'en',
    targetScript: KonkaniScript = 'deva'
  ): Promise<SimplifiedNotice> {
    if (!text || !text.trim()) {
      throw new Error('Notice text cannot be empty.');
    }

    // Check if the input text corresponds to one of the verified Goan sample notices
    const trimmed = text.trim();
    const matchedSample = SAMPLE_NOTICES.find(
      (s) =>
        s.text.trim() === trimmed ||
        trimmed.includes(s.title) ||
        trimmed.includes(s.source) ||
        (s.id === 'sample-gmc' && trimmed.includes('GMC/OPD/2026/418')) ||
        (s.id === 'sample-ktcl' && (trimmed.includes('KTCL') || trimmed.includes('KADAMBA TRANSPORT'))) ||
        (s.id === 'sample-panchayat' && trimmed.includes('CALANGUTE')) ||
        (s.id === 'sample-electricity' && trimmed.includes('ELECTRICITY DEPARTMENT'))
    );

    if (matchedSample) {
      const verified = getSampleNoticeEasyRead(matchedSample.id, targetLang, targetScript);
      if (verified) {
        verified.originalText = text;
        return verified;
      }
    }

    if (!navigator.onLine) {
      return this.offlineFallbackSimplification(text, targetLang, targetScript);
    }

    try {
      const res = await fetch('/api/simplify-notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          targetLang,
          targetScript,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Simplification failed with status ${res.status}`);
      }

      const data = await res.json();
      return {
        id: 'notice-' + Date.now(),
        title: data.title || 'Public Notice Summary',
        summary: data.summary || '',
        actionSteps: data.actionSteps || [],
        deadlines: data.deadlines || [],
        feesAndCosts: data.feesAndCosts || [],
        requiredDocuments: data.requiredDocuments || [],
        eligibility: data.eligibility || [],
        importantWarnings: data.importantWarnings || [],
        contactInfo: data.contactInfo || [],
        difficultWordsExplained: data.difficultWordsExplained || [],
        disclaimer:
          data.disclaimer ||
          'Assistive Easy-Read version generated for accessibility. Please consult the original official notice for legal verification.',
        originalText: text,
        savedAt: new Date().toISOString(),
        language: targetLang,
        script: targetLang === 'kok' ? targetScript : undefined,
      };
    } catch (err: any) {
      console.warn('AI Simplification error, using fallback:', err);
      return this.offlineFallbackSimplification(text, targetLang, targetScript, err.message);
    }
  }

  public async translateFullNotice(
    notice: SimplifiedNotice,
    targetLang: SupportedLanguage,
    targetScript: KonkaniScript = 'deva'
  ): Promise<SimplifiedNotice> {
    // 1. Check if it's one of the sample notices
    const matchedSample = SAMPLE_NOTICES.find(
      (s) =>
        notice.originalText.includes(s.title) ||
        notice.originalText.includes(s.source) ||
        (s.id === 'sample-gmc' && notice.originalText.includes('GMC/OPD/2026/418')) ||
        (s.id === 'sample-ktcl' && (notice.originalText.includes('KTCL') || notice.originalText.includes('KADAMBA'))) ||
        (s.id === 'sample-panchayat' && notice.originalText.includes('CALANGUTE')) ||
        (s.id === 'sample-electricity' && notice.originalText.includes('ELECTRICITY'))
    );

    if (matchedSample) {
      const sampleResult = getSampleNoticeEasyRead(matchedSample.id, targetLang, targetScript);
      if (sampleResult) {
        sampleResult.originalText = notice.originalText;
        return sampleResult;
      }
    }

    // 2. Otherwise translate all fields
    try {
      const translateItem = async (str: string) => {
        if (!str || !str.trim()) return str;
        const res = await translationService.translateText(str, 'auto', targetLang, targetScript);
        return res.translatedText || str;
      };

      const [translatedTitle, translatedSummary] = await Promise.all([
        translateItem(notice.title),
        translateItem(notice.summary),
      ]);

      const translatedActionSteps = await Promise.all(notice.actionSteps.map(translateItem));
      const translatedDeadlines = await Promise.all(notice.deadlines.map(translateItem));
      const translatedFees = await Promise.all(notice.feesAndCosts.map(translateItem));
      const translatedDocuments = await Promise.all(notice.requiredDocuments.map(translateItem));
      const translatedEligibility = await Promise.all(notice.eligibility.map(translateItem));
      const translatedWarnings = await Promise.all(notice.importantWarnings.map(translateItem));

      return {
        ...notice,
        title: translatedTitle,
        summary: translatedSummary,
        actionSteps: translatedActionSteps,
        deadlines: translatedDeadlines,
        feesAndCosts: translatedFees,
        requiredDocuments: translatedDocuments,
        eligibility: translatedEligibility,
        importantWarnings: translatedWarnings,
        language: targetLang,
        script: targetLang === 'kok' ? targetScript : undefined,
      };
    } catch (e) {
      console.warn('Full notice translation error, returning fallback:', e);
      return this.offlineFallbackSimplification(notice.originalText, targetLang, targetScript);
    }
  }

  private offlineFallbackSimplification(
    text: string,
    targetLang: SupportedLanguage,
    targetScript: KonkaniScript = 'deva',
    reason?: string
  ): SimplifiedNotice {
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    const firstLine = lines[0] || 'Notice';

    const phoneRegex = /(\+?\d{1,4}[ -]?)?(\(?\d{2,5}\)?[ -]?)?\d{6,10}/g;
    const dateRegex = /\b(\d{1,2}[-/th|st|nd|rd ]+\w+[-/ ]+\d{2,4}|\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4})\b/gi;
    const phones = Array.from(new Set(text.match(phoneRegex) || []));
    const dates = Array.from(new Set(text.match(dateRegex) || []));

    // Localized fallbacks
    const isKokRomi = targetLang === 'kok' && targetScript === 'romi';
    const isKokDeva = targetLang === 'kok' && targetScript === 'deva';
    const isHi = targetLang === 'hi';
    const isMr = targetLang === 'mr';

    let title = firstLine.length < 80 ? firstLine : 'Important Notice';
    let summary = 'This notice contains instructions and guidelines. Please review the key details below.';
    let actionSteps = [
      'Review the key points listed in the original notice.',
      'Carry required identity documents before proceeding.',
      'Contact the office helpline or visit the designated counter during open hours.',
    ];
    let deadlines = dates.length > 0 ? dates.map((d) => `Date mentioned in notice: ${d}`) : ['Check original notice for specific dates.'];
    let feesAndCosts = ['Check original notice for applicable fees or charges.'];
    let requiredDocuments = ['Carry original photo identity (Aadhaar / Voter ID / Ration Card).'];
    let eligibility = ['Refer to the original notice for specific qualifications.'];
    let importantWarnings = ['Preserve all official receipts, tokens, or reference numbers.'];

    if (isKokRomi) {
      title = 'Mukhel Sorkari Notice';
      summary = 'Hea notice-ant mhotvache niyam ani margdorxon asa. Sakail dil’le mud’de barikayen vachat.';
      actionSteps = [
        'Notice-ant dil’le mukhel mud’de vachat.',
        'Fuddem vochchea adim Aadhaar card ani zai aslole dakhle sangatak gheyat.',
        'Kacheriche helpline-acher phone korat vo counter-ar bhett diat.',
      ];
      deadlines = dates.length > 0 ? dates.map((d) => `Notice-ant dil’li tarikh: ${d}`) : ['Tarikh khatir mull notice polloiat.'];
      feesAndCosts = ['Fee aslear counter-ar vicharat.'];
      requiredDocuments = ['Aadhaar Card vo Photo vollokh-potr', 'Adle mull dakhle'];
      eligibility = ['Panchayat / hospital notice pormonem nagrik.'];
      importantWarnings = ['Sorkari receipt vo token samballun dovorat.'];
    } else if (isKokDeva) {
      title = 'महत्वाचें सरकारी परिपत्रक / नोटीस';
      summary = 'ह्या नोटिशींत महत्वाचे नेम आनी मार्गदर्शन दिलां. सकयल दिल्ले मुद्दे बारीकसाणेन वाच्यात.';
      actionSteps = [
        'नोटिशींतले मुखेल मुद्दे बारीकसाणेन वाच्यात.',
        'मुखार वचचे पयलीं आधार कार्ड आनी लागपी कागदपत्रां वांगडा दवरात.',
        'कचेरीच्या हेल्पलाईनीक फोन करात वा कावंटराक भेट दियात.',
      ];
      deadlines = dates.length > 0 ? dates.map((d) => `नोटिशींतली तारीख: ${d}`) : ['तारखे खातीर मूळ नोटीस पळयात.'];
      feesAndCosts = ['शुल्का खातीर कावंटराचेर खात्री करून घेवची.'];
      requiredDocuments = ['आधार कार्ड वा सरकारी फोटो वळखपत्र', 'मूळ कागदपत्रां'];
      eligibility = ['मूळ नोटिशींतल्या नेमां प्रमाण पात्र व्यक्ती.'];
      importantWarnings = ['सरकारी पावती वा टोकन सांबाळून दवरात.'];
    } else if (isHi) {
      title = 'महत्वपूर्ण सार्वजनिक नोटिस';
      summary = 'इस नोटिस में महत्वपूर्ण निर्देश और नियम दिए गए हैं। कृपया नीचे दिए गए बिंदुओं को ध्यान से पढ़ें।';
      actionSteps = [
        'नोटिस में दिए गए मुख्य बिंदुओं को ध्यान से पढ़ें।',
        'आगे बढ़ने से पहले आधार कार्ड और पहचान दस्तावेज साथ रखें।',
        'कार्यालय की हेल्पलाइन पर संपर्क करें या काउंटर पर जाएं।',
      ];
      deadlines = dates.length > 0 ? dates.map((d) => `नोटिस में उल्लिखित तारीख: ${d}`) : ['तारीख के लिए मूल नोटिस देखें।'];
      feesAndCosts = ['शुल्क के लिए काउंटर पर पुष्टि करें।'];
      requiredDocuments = ['आधार कार्ड या पहचान पत्र', 'मूल प्रमाण पत्र'];
      eligibility = ['नोटिस में उल्लिखित नियमानुसार पात्र नागरिक।'];
      importantWarnings = ['सभी आधिकारिक रसीदें और टोकन सुरक्षित रखें।'];
    } else if (isMr) {
      title = 'महत्त्वाची शासकीय सूचना';
      summary = 'या सूचनेमध्ये महत्त्वाचे नियम व मार्गदर्शन दिलेले आहे. खालील मुद्दे काळजीपूर्वक वाचावेत.';
      actionSteps = [
        'सूचनेतील महत्त्वाचे मुद्दे काळजीपूर्वक वाचा.',
        'पुढे जाण्यापूर्वी आधार कार्ड व आवश्यक कागदपत्रे सोबत ठेवा.',
        'कार्यालयीन हेल्पलाइनवर संपर्क साधा किंवा काउंटरला भेट द्या.',
      ];
      deadlines = dates.length > 0 ? dates.map((d) => `सूचनेतील तारीख: ${d}`) : ['तारखेसाठी मूळ सूचना पहावी.'];
      feesAndCosts = ['शुल्कासाठी काउंटरवर खात्री करावी.'];
      requiredDocuments = ['आधार कार्ड किंवा ओळखपत्र', 'मूळ कागदपत्रे'];
      eligibility = ['सूचनेतील नियमांनुसार पात्र नागरिक.'];
      importantWarnings = ['सर्व शासकीय पावत्या व टोकन जपून ठेवा.'];
    }

    return {
      id: 'notice-' + Date.now(),
      title,
      summary,
      actionSteps,
      deadlines,
      feesAndCosts,
      requiredDocuments,
      eligibility,
      importantWarnings,
      contactInfo: phones.length > 0 ? phones : ['0832-2458700'],
      difficultWordsExplained: [
        { word: 'Prerequisites', simpleMeaning: isKokRomi ? 'Adinch zai asleli vost' : isKokDeva ? 'पयलींच लागपी कागदपत्रां' : 'पूर्व-आवश्यकताएं' },
        { word: 'Gratis', simpleMeaning: isKokRomi ? 'Samkem fukott' : isKokDeva ? 'पुराय फुकट' : 'पूर्णतः निःशुल्क' },
      ],
      disclaimer: reason
        ? `Assistive simplification (${reason}). Verify with official original notice.`
        : 'Assistive Easy-Read version generated for accessibility. Please consult the original official notice for legal verification.',
      originalText: text,
      savedAt: new Date().toISOString(),
      language: targetLang,
      script: targetLang === 'kok' ? targetScript : undefined,
    };
  }
}

export const simplificationService = new SimplificationService();
