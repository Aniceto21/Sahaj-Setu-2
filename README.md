# Sahaj Setu (सहज सेतू)
### Inclusive, Multilingual Communication & Accessibility Platform for Goa
**"Your voice. Your language. Your way."**

---

## 1. Overview

**Sahaj Setu** is an accessible, responsive, installable Progressive Web Application (PWA) designed to bridge communication barriers for individuals with speech difficulties, cognitive disabilities, literacy barriers, neurodivergent conditions, and language differences in Goa, India.

It empowers users across two foundational activities:
1. **Understand the World:** Converts complex, bureaucratic, or medical public notices into simplified Easy-Read formats with step-by-step instructions, highlighted deadlines, fees, and contacts.
2. **Be Understood:** Facilitates instantaneous, dignified communication across hospital OPDs (GMC, Asilo, Hospicio), Kadamba buses, river ferries, local panchayats, and markets using multilingual communication boards, visual cards, and text-to-speech.

---

## 2. Core Features

### A. Multilingual Language System (High Priority)
- **Languages Supported:**
  - English
  - Konkani / कोंकणी (Supporting both **Devanagari** and **Roman/Romi** scripts)
  - Hindi / हिन्दी
  - Marathi / मराठी
- **Top Navigation Dropdown:**
  - Keyboard accessible (`Tab`, `Enter`, `Escape`)
  - Changing the language **never** deletes messages, favorites, saved phrases, or preferences.
  - Persists across app reopens.
  - Distinct from the "Reset Demo" button.

### B. Be Understood — Communication Board
- 14 categories including Greetings, Basic Needs, Food & Water, Medical, Emergency, Travel (Kadamba bus, ferry), Panchayat, and Market.
- Visual **Pain & Discomfort Meter** (1 to 10 scale + body region selector).
- **Message Composer:** Tap multiple cards to form a sentence, live preview, speak aloud, translate between languages, copy, and save.
- **Large Fullscreen Card:** High-contrast display mode designed to hold up across a counter, bus window, or doctor's desk.

### C. Understand the World — Notice Simplifier
- **3 Input Modes:**
  1. Camera Capture & Image Upload (Multimodal OCR analysis)
  2. Paste / Type Text
  3. Pre-loaded realistic Goan notices (GMC Bambolim, KTCL Bus Pass Renewal, Calangute Panchayat, Electricity Outage)
- **Easy-Read Transformation:**
  - Short sentences (<15 words)
  - Plain language vocabulary
  - Step-by-step instructions
  - Critical deadlines and fees highlighted
  - Preserved phone numbers, addresses, and safety warnings
  - Glossary of difficult words
  - Side-by-side "Compare with Original" toggle

### D. Listener Card
- Quick presentation card to show across a counter or bus window:
  *"Hello. I communicate using this device. Please give me time to respond. You can read my message on the screen or listen to the voice."*
- Fullscreen mode, speech output, and copy/print options.

### E. Communication Passport
- Personalization of communication preferences, preferred Konkani script (Devanagari vs Romi), reading level, speech speed (0.75x–1.25x), button size (Standard, Spacious, Jumbo), high contrast, and reduced motion.
- Full local data export and import (JSON).

### F. PWA & Offline Support
- Service worker registration with asset precaching.
- Installable on Android, Chrome, Edge, and iOS Safari.
- Complete core communication features work 100% offline using verified Goan phrase packs.

---

## 3. Architecture & Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion.
- **Backend:** Express full-stack server running with Vite middleware mode in development and static bundle in production.
- **AI Engine:** Google Gemini (`gemini-3.8-flash`) via the `@google/genai` TypeScript SDK for text simplification, OCR image extraction, and translation.
- **Speech:** Web Speech API (`SpeechSynthesis`) with detection for `kok-IN` voice availability and respectful phonetic fallback with user permission.
- **Local-First Storage:** `localStorage` & structured state management for zero-tracking privacy.

---

## 4. Getting Started

### Prerequisites
- Node.js 20+
- `GEMINI_API_KEY` (configured in `.env` or AI Studio Secrets)

### Development
```bash
npm run dev
```
The server will start at `http://localhost:3000`.

### Production Build
```bash
npm run build
npm start
```

---

## 5. Privacy & Accessibility Disclosures

1. **No Forced Login:** Basic usage does not require accounts or personal diagnosis disclosure.
2. **Local Storage:** Personal settings and saved items remain in the user's browser.
3. **Assistive Verification:** AI simplification and translation are assistive tools. Users are advised to verify critical medication or legal directives with official healthcare/administrative staff.
