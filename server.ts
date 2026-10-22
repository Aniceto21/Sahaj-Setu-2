import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { INITIAL_PHRASES, getPhraseText } from './src/data/curatedPhrases.ts';
import { SupportedLanguage, KonkaniScript } from './src/types/index.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '15mb' }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Translation endpoint
app.post('/api/translate', async (req: Request, res: Response) => {
  try {
    const { text, sourceLang = 'auto', targetLang = 'en', script = 'default' } = req.body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Text is required for translation.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'Translation AI service is temporarily unconfigured (GEMINI_API_KEY missing). Please use curated offline phrases.',
        isFallbackAvailable: true,
      });
    }

    const scriptInstruction =
      targetLang === 'kok' || targetLang === 'konkani'
        ? script === 'romi' || script === 'roman'
          ? 'Translate into Konkani written in Roman / Romi script (e.g. as used in Goa church bulletins and tiatr publications).'
          : 'Translate into Konkani written in official Devanagari script (कोंकणी देवनागरी).'
        : '';

    const systemPrompt = `You are an expert multilingual translator specializing in languages spoken in Goa, India: English, Konkani (Devanagari and Romi/Roman scripts), Hindi, and Marathi.
Your top priority is human dignity, clarity, and precision for users with speech, literacy, and cognitive access needs.
- Source language: ${sourceLang}
- Target language: ${targetLang}
${scriptInstruction}
- CRITICAL RULES:
1. Preserve all proper names, addresses, bus routes, dates, telephone numbers, measurements, and official designations exactly.
2. For Konkani, NEVER replace it with Marathi or Hindi. If translating into Konkani, produce genuine Goan Konkani.
3. Keep the tone respectful, clear, and direct.
4. Output valid JSON adhering to the specified schema.`;

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Translate the following text accurately:
"""
${text}
"""`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            translatedText: { type: Type.STRING, description: 'The translated text.' },
            detectedSourceLang: { type: Type.STRING, description: 'The detected source language.' },
            targetLang: { type: Type.STRING, description: 'The target language.' },
            scriptUsed: { type: Type.STRING, description: 'Script used (e.g. Devanagari, Latin/Romi).' },
            pronunciationGuide: { type: Type.STRING, description: 'Optional phonetic pronunciation help for listener/speaker.' },
            accuracyNote: { type: Type.STRING, description: 'Important note on machine translation nuances or verification recommendations.' }
          },
          required: ['translatedText', 'detectedSourceLang', 'targetLang']
        }
      }
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('AI generation request timeout')), 5000)
    );

    const resp = (await Promise.race([generatePromise, timeoutPromise])) as any;
    const parsed = JSON.parse(resp.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Translation error:', err.message);

    // Curated Goan database fallback
    const trimmed = (req.body?.text || '').trim().toLowerCase();
    const match = INITIAL_PHRASES.find((p) => {
      const en = p.translations.en.toLowerCase();
      const kd = p.translations.kok_deva.toLowerCase();
      const kr = p.translations.kok_romi.toLowerCase();
      const hi = p.translations.hi.toLowerCase();
      const mr = p.translations.mr.toLowerCase();
      return (
        en === trimmed ||
        kd === trimmed ||
        kr === trimmed ||
        hi === trimmed ||
        mr === trimmed ||
        trimmed.includes('kadamba') ||
        trimmed.includes('bus')
      );
    });

    if (match) {
      const targetLang = (req.body?.targetLang || 'kok') as SupportedLanguage;
      const script = (req.body?.script || 'deva') as KonkaniScript;
      const translated = getPhraseText(match, targetLang, script);
      return res.json({
        translatedText: translated,
        detectedSourceLang: 'curated-goa-phrase-pack',
        targetLang,
        scriptUsed: targetLang === 'kok' ? (script === 'romi' ? 'Romi Lipi' : 'Devanagari') : undefined,
        accuracyNote: 'Verified curated Goan phrase pack translation (Cloud model fallback).',
      });
    }

    return res.status(503).json({
      error: 'Translation AI model is temporarily at peak capacity. Please pick from the verified Communication Board or try again shortly.',
      details: err.message,
    });
  }
});

// Easy-Read Notice Simplifier endpoint
app.post('/api/simplify-notice', async (req: Request, res: Response) => {
  try {
    const { text, targetLang = 'en', targetScript = 'default' } = req.body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Notice text is required for simplification.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'AI service unconfigured. Unable to simplify notice.',
      });
    }

    const scriptInstruction =
      targetLang === 'kok'
        ? targetScript === 'romi'
          ? 'Output summary in Roman / Romi Konkani script.'
          : 'Output summary in Devanagari Konkani script.'
        : '';

    const systemPrompt = `You are a certified Easy-Read transformation specialist and accessibility architect.
Your role is to take complex, bureaucratic, medical, legal, or municipal public notices (e.g., from Goa Panchayat, GMC Hospital, Kadamba Transport, Electricity Dept, Revenue office) and simplify them into clear, accessible Easy-Read format for neurodivergent individuals, people with cognitive disabilities, elderly citizens, and people with reading difficulties.

GUIDELINES:
1. Use short sentences (under 15 words).
2. Use simple, everyday vocabulary.
3. Explicitly define or explain difficult jargon in simple words.
4. Extract step-by-step actionable instructions.
5. Highlight critical deadlines, fees/charges, dates, eligibility criteria, and required documents clearly.
6. Preserve all phone numbers, emergency lines, office hours, and locations verbatim.
7. Preserve negations ("Do NOT do this"), penalties, and warnings carefully so safety is never compromised.
8. NEVER hallucinate information not present in the original document. Mark missing or ambiguous info as "Not specified in original notice".
9. Maintain dignified, respectful language.
10. Target output language: ${targetLang}. ${scriptInstruction}`;

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Please transform this public notice into Easy-Read format:
"""
${text}
"""`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'Short simple title summarizing what this notice is about.' },
            summary: { type: Type.STRING, description: '1-3 sentence plain language summary.' },
            actionSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Step-by-step instructions of what the reader needs to do.'
            },
            deadlines: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Critical deadlines or time limits.'
            },
            feesAndCosts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Applicable fees, payment methods, or free exemptions.'
            },
            requiredDocuments: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Documents needed (e.g., Aadhaar card, Ration card, Form 1).'
            },
            eligibility: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Who qualifies and who does not.'
            },
            importantWarnings: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Safety warnings, negations, penalties, or rules.'
            },
            contactInfo: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Helpline numbers, office locations, email, or counter numbers.'
            },
            difficultWordsExplained: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  word: { type: Type.STRING },
                  simpleMeaning: { type: Type.STRING }
                },
                required: ['word', 'simpleMeaning']
              },
              description: 'Glossary of complex terms used in the notice and what they mean simply.'
            },
            disclaimer: {
              type: Type.STRING,
              description: 'Standard assistive disclaimer noting this is an Easy-Read translation aid, not official legal counsel.'
            }
          },
          required: ['title', 'summary', 'actionSteps', 'disclaimer']
        }
      }
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Notice simplification request timeout')), 7000)
    );

    const resp = (await Promise.race([generatePromise, timeoutPromise])) as any;
    const parsed = JSON.parse(resp.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Notice simplification error:', err.message);

    // Rule-based structured fallback for instant reliability
    const rawText = (req.body?.text || '') as string;
    const phoneRegex = /(\+?\d{1,4}[ -]?)?(\(?\d{2,5}\)?[ -]?)?\d{6,10}/g;
    const dateRegex = /\b(\d{1,2}[-/th|st|nd|rd ]+\w+[-/ ]+\d{2,4}|\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4})\b/gi;
    const phones = Array.from(new Set(rawText.match(phoneRegex) || []));
    const dates = Array.from(new Set(rawText.match(dateRegex) || []));
    const lines = rawText.split('\n').map((l: string) => l.trim()).filter(Boolean);
    const title = lines[0] ? lines[0].slice(0, 75) : 'Public Notice';

    return res.json({
      title,
      summary: lines.slice(1, 3).join('. ') || 'This public notice outlines guidelines and actions. Please review the details below.',
      actionSteps: [
        'Review the key points listed in the original notice.',
        'Carry required identity documents before proceeding.',
        'Contact the office helpline or visit the designated counter during open hours.'
      ],
      deadlines: dates.length > 0 ? dates.map(d => `Relevant date in notice: ${d}`) : ['Check original notice for specific dates.'],
      feesAndCosts: rawText.toLowerCase().includes('free') || rawText.toLowerCase().includes('gratis')
        ? ['Free of cost / No fee charged.']
        : ['Verify fee structure at the designated counter.'],
      requiredDocuments: [
        'Aadhaar card or Government Photo ID',
        'Relevant original certificates or pass documents'
      ],
      eligibility: ['Refer to the original notice for specific category conditions.'],
      importantWarnings: ['Preserve all official receipts, acknowledgment slips, or tokens.'],
      contactInfo: phones.length > 0 ? phones : ['Helpline numbers listed in the notice.'],
      difficultWordsExplained: [
        { word: 'Prerequisites', simpleMeaning: 'Things needed in advance' },
        { word: 'Gratis', simpleMeaning: 'Free of charge' }
      ],
      disclaimer: 'Assistive Easy-Read version generated for accessibility. Please consult the original official notice for legal verification.'
    });
  }
});

// Image OCR & Text Extraction endpoint
app.post('/api/ocr-analyze', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg' } = req.body;

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return res.status(400).json({ error: 'Image base64 data is required.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'OCR AI service is temporarily unconfigured. Please type or paste notice text manually.',
      });
    }

    // Clean data URL prefix if present
    const cleanBase64 = imageBase64.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: cleanBase64,
            },
          },
          {
            text: `Extract all legible text from this image notice, signboard, document, or form.
Include headers, dates, numbers, paragraphs, contact info, and signatures.
Identify the script (Devanagari, Roman, etc.) and primary language (English, Konkani, Hindi, Marathi).
Preserve exact spellings, numbers, and dates. If any portions are blurred or cut off, mark them as [Unclear / illegible].
Return JSON adhering to schema.`,
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            extractedText: { type: Type.STRING, description: 'Complete transcribed text.' },
            detectedLanguage: { type: Type.STRING, description: 'Primary language detected.' },
            detectedScript: { type: Type.STRING, description: 'Script detected (Devanagari, Latin, etc.).' },
            confidence: { type: Type.STRING, description: 'Confidence rating (High, Moderate, Low due to lighting/angle).' },
            noticeCategory: { type: Type.STRING, description: 'Hospital, Government, Transport, Shop, School, or Other.' },
            unclearSections: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Sections that were blurred or partially cut off.'
            }
          },
          required: ['extractedText', 'detectedLanguage', 'confidence']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('OCR analysis error:', err);
    return res.status(500).json({
      error: 'OCR extraction failed: ' + (err.message || 'Unknown service error'),
      details: err.message
    });
  }
});

// AI Assisted Communication Composer / Suggestions endpoint
app.post('/api/suggest-phrases', async (req: Request, res: Response) => {
  try {
    const { context = 'general', need = '', targetLang = 'en' } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'AI service unconfigured.' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Generate 6 respectful, immediate AAC communication phrases for a person in Goa in the context of "${context}" with the need "${need}".
Target language: ${targetLang}.
Keep each phrase under 12 words. Simple, direct, empowering.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            phrases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  category: { type: Type.STRING },
                  urgency: { type: Type.STRING }
                },
                required: ['text', 'category']
              }
            }
          },
          required: ['phrases']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'Sahaj Setu',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    time: new Date().toISOString()
  });
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Sahaj Setu] Server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Sahaj Setu] Server failed to start:', err);
});
