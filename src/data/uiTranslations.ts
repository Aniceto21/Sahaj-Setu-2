import { SupportedLanguage, KonkaniScript } from '../types';

export const UI_STRINGS: Record<
  SupportedLanguage,
  {
    appName: string;
    tagline: string;
    nav: {
      home: string;
      board: string;
      understand: string;
      listener: string;
      passport: string;
      saved: string;
      settings: string;
    };
    home: {
      heroTitle: string;
      heroSubtitle: string;
      understandCardTitle: string;
      understandCardDesc: string;
      understandCardAction: string;
      beUnderstoodTitle: string;
      beUnderstoodDesc: string;
      beUnderstoodAction: string;
      quickContextsTitle: string;
      listenerCardBannerTitle: string;
      listenerCardBannerDesc: string;
      listenerCardBannerAction: string;
      emergencyBannerTitle: string;
      emergencyBannerAction: string;
    };
    board: {
      title: string;
      subtitle: string;
      composedLabel: string;
      composePlaceholder: string;
      speakComposed: string;
      translateComposed: string;
      fullscreenCard: string;
      clearComposed: string;
      allCategories: string;
      searchPlaceholder: string;
      customPhraseBtn: string;
      addPhraseModalTitle: string;
      painScaleTitle: string;
      painScaleDesc: string;
    };
    understand: {
      title: string;
      subtitle: string;
      tabUpload: string;
      tabPaste: string;
      tabSamples: string;
      ocrPrompt: string;
      cameraBtn: string;
      uploadBtn: string;
      pastePlaceholder: string;
      simplifyBtn: string;
      analyzing: string;
      originalNotice: string;
      easyReadTitle: string;
      actionSteps: string;
      deadlines: string;
      fees: string;
      documents: string;
      eligibility: string;
      warnings: string;
      contacts: string;
      difficultWords: string;
      compareBtn: string;
      saveNoticeBtn: string;
    };
    listener: {
      title: string;
      subtitle: string;
      counterTip: string;
      showFullscreen: string;
      speakCard: string;
      copyCard: string;
      editTips: string;
    };
    passport: {
      title: string;
      subtitle: string;
      nameField: string;
      preferredLang: string;
      scriptField: string;
      readingLevel: string;
      speechRate: string;
      textSize: string;
      highContrast: string;
      reducedMotion: string;
      instructionsTitle: string;
      exportBtn: string;
      importBtn: string;
      savedSuccess: string;
    };
    common: {
      speak: string;
      speaking: string;
      stop: string;
      translate: string;
      translating: string;
      copy: string;
      copied: string;
      close: string;
      back: string;
      loading: string;
      error: string;
      offlineNotice: string;
      voiceMissingNotice: string;
    };
  }
> = {
  en: {
    appName: 'Sahaj Setu',
    tagline: 'Your voice. Your language. Your way.',
    nav: {
      home: 'Home',
      board: 'Be Understood',
      understand: 'Understand the World',
      listener: 'Listener Card',
      passport: 'Passport',
      saved: 'Saved Items',
      settings: 'Settings',
    },
    home: {
      heroTitle: 'An Inclusive Communication Bridge for Goa',
      heroSubtitle:
        'Empowering people with speech, cognitive, hearing, or language difficulties to communicate with dignity and ease.',
      understandCardTitle: 'Understand the World',
      understandCardDesc:
        'Simplify difficult notices, hospital forms, bus timetables, and documents with Easy-Read summaries and OCR.',
      understandCardAction: 'Simplify a Notice',
      beUnderstoodTitle: 'Be Understood',
      beUnderstoodDesc:
        'Express your needs, medical pain, and travel requests using accessible multilingual communication cards and speech.',
      beUnderstoodAction: 'Open Communication Board',
      quickContextsTitle: 'Quick Situations in Goa',
      listenerCardBannerTitle: 'Need to show this to someone quickly?',
      listenerCardBannerDesc:
        'Open your Listener Card to explain to bus conductors, doctors, shopkeepers, or officials how to communicate with you.',
      listenerCardBannerAction: 'Open Listener Card',
      emergencyBannerTitle: 'Urgent Medical or Police Assistance',
      emergencyBannerAction: 'Emergency Mode',
    },
    board: {
      title: 'Be Understood — Communication Board',
      subtitle: 'Tap phrases or compose a sentence to speak aloud, translate, or show in large high-contrast display.',
      composedLabel: 'Composed Message:',
      composePlaceholder: 'Tap cards below or type to compose your message...',
      speakComposed: 'Speak Aloud',
      translateComposed: 'Translate Message',
      fullscreenCard: 'Show Fullscreen Card',
      clearComposed: 'Clear',
      allCategories: 'All Categories',
      searchPlaceholder: 'Search phrases or words...',
      customPhraseBtn: 'Add Custom Phrase',
      addPhraseModalTitle: 'Create New Communication Card',
      painScaleTitle: 'Pain & Discomfort Meter',
      painScaleDesc: 'Tap a level from 1 (mild) to 10 (emergency pain) and select where it hurts.',
    },
    understand: {
      title: 'Understand the World — Notice Simplifier',
      subtitle:
        'Transform complex notices, clinic signs, and government forms into short sentences, clear steps, and highlighted deadlines.',
      tabUpload: 'Scan / Upload Image',
      tabPaste: 'Paste or Type Text',
      tabSamples: 'Goa Public Notices',
      ocrPrompt: 'Take a photo of a signboard, clinic notice, or transport schedule to extract text.',
      cameraBtn: 'Take Photo',
      uploadBtn: 'Upload Image',
      pastePlaceholder: 'Paste complex public notice or letter here...',
      simplifyBtn: 'Simplify into Easy-Read',
      analyzing: 'Analyzing & simplifying notice...',
      originalNotice: 'Original Notice Text',
      easyReadTitle: 'Easy-Read Simplification',
      actionSteps: 'What You Need to Do (Step-by-Step):',
      deadlines: 'Important Dates & Deadlines:',
      fees: 'Fees & Costs:',
      documents: 'Required Documents to Bring:',
      eligibility: 'Who is Eligible:',
      warnings: 'Important Warnings & Rules:',
      contacts: 'Helpline & Office Locations:',
      difficultWords: 'Difficult Words Explained Simply:',
      compareBtn: 'Compare with Original',
      saveNoticeBtn: 'Save Notice Locally',
    },
    listener: {
      title: 'Listener Card',
      subtitle: 'Show this card across a counter, bus window, or doctor desk to guide listeners respectfully.',
      counterTip: 'Hold your device up so the person in front of you can read clearly.',
      showFullscreen: 'Show Fullscreen to Listener',
      speakCard: 'Read Card Aloud',
      copyCard: 'Copy Card Text',
      editTips: 'Customize Instructions in Passport',
    },
    passport: {
      title: 'Communication Passport',
      subtitle: 'Personalize how you want the world to interact with you and adapt the app interface to your senses.',
      nameField: 'Preferred Name or Nickname (Optional)',
      preferredLang: 'Preferred Communication Language',
      scriptField: 'Preferred Konkani Script',
      readingLevel: 'Information Complexity',
      speechRate: 'Speech Playback Speed',
      textSize: 'Interface Text Size',
      highContrast: 'High-Contrast Color Theme',
      reducedMotion: 'Reduced Animation & Motion',
      instructionsTitle: 'Your Instructions for Other People',
      exportBtn: 'Export My Settings (JSON)',
      importBtn: 'Import Settings',
      savedSuccess: 'Passport preferences saved locally!',
    },
    common: {
      speak: 'Speak Aloud',
      speaking: 'Speaking...',
      stop: 'Stop',
      translate: 'Translate',
      translating: 'Translating...',
      copy: 'Copy',
      copied: 'Copied!',
      close: 'Close',
      back: 'Back',
      loading: 'Loading...',
      error: 'An error occurred',
      offlineNotice: 'Offline Mode: Using cached data & offline phrases.',
      voiceMissingNotice: 'Native Konkani voice not installed on this device. Using large visual card display.',
    },
  },

  kok: {
    appName: 'सहज सेतू',
    tagline: 'तुमचो आवाज. तुमची भास. तुमची वाट.',
    nav: {
      home: 'घर',
      board: 'संवाद फळो',
      understand: 'संवसार समजात',
      listener: 'आयकप्याचें कार्ड',
      passport: 'संवाद पासपोर्ट',
      saved: 'सांबाळिल्लें',
      settings: 'मांडणी',
    },
    home: {
      heroTitle: 'गोंयच्या लोकां खातीर सुलभ संवाद सेतू',
      heroSubtitle:
        'उलोवपाक, वाचपाक वा आयकूंक त्रास जावपी भावां-भयणींक स्वाभिमानान आनी स्वतंत्रपणान संवाद सादपाक आदार.',
      understandCardTitle: 'संवसार समजात',
      understandCardDesc:
        'कठीण सरकारी नोटीशी, दोतोराचे कागद, बस वेळापत्रक सोंप्या उतरांनी आनी पायऱ्यांनी समजात.',
      understandCardAction: 'नोटीस सोपी करात',
      beUnderstoodTitle: 'संवाद सादात (उलययात)',
      beUnderstoodDesc:
        'तुमच्यो गरजो, दुख, जेवण-उदक वा प्रवासाच्यो सुचना कार्डांच्या आनी आवाजाच्या आदारान सांगात.',
      beUnderstoodAction: 'संवाद बोर्ड उकतात',
      quickContextsTitle: 'गोंयच्या सुवातीं प्रमाण सोंपें संवाद',
      listenerCardBannerTitle: 'कोणाकूय रोखडेंच समजावंक जाय?',
      listenerCardBannerDesc:
        'बस कंडक्टर, दोतोर वा दुकानदाराक तुमची संवाद पद्दत दाखोवपाक आयकप्याचें कार्ड वापरा.',
      listenerCardBannerAction: 'आयकप्याचें कार्ड उकतात',
      emergencyBannerTitle: 'तातडीची वैजकी वा पुलिसांची मदत',
      emergencyBannerAction: 'आपत्कालीन बोर्ड',
    },
    board: {
      title: 'संवाद फळो — Be Understood',
      subtitle: 'कार्डार टॅप करात वा संदेश तयार करून व्हडल्यान उलोवपाक लाययात वा व्हड अक्षरांनी दाखयात.',
      composedLabel: 'तयार केल्लो संदेश:',
      composePlaceholder: 'सकयल आशिल्ल्या कार्डांचेर टॅप करात वा संदेश टाईप करात...',
      speakComposed: 'व्हडल्यान उलययात',
      translateComposed: 'भाशांतर करात',
      fullscreenCard: 'व्हड स्क्रीनार दाखयात',
      clearComposed: 'पुसून काडात',
      allCategories: 'सगळ्यो गरजो',
      searchPlaceholder: 'उतर वा कार्ड सोदात...',
      customPhraseBtn: 'नवों संदेश जोडा',
      addPhraseModalTitle: 'नवों संवाद कार्ड तयार करात',
      painScaleTitle: 'दुख आनी त्रासांचो मीटर',
      painScaleDesc: '1 (ल्हान) ते 10 (अति तीव्र दुख) आनी दुखपाची सुवात वेंचून काडात.',
    },
    understand: {
      title: 'संवसार समजात — नोटीस सोपी करात',
      subtitle: 'कठीण नोटीशी, कायदे आनी सरकारी कागदां ल्हान वाक्यांनी आनी सोप्या पायऱ्यांनी रुपांतरीत करात.',
      tabUpload: 'फोटो काडात / अपलोड करात',
      tabPaste: 'मजकूर टाईप करात',
      tabSamples: 'गोंयच्यो नमुनो नोटीशी',
      ocrPrompt: 'पाटीचो, सरकारी फॉर्माचो वा वेळापत्रकाचो फोटो काडून मजकूर काडात.',
      cameraBtn: 'कॅमेरा उकतात',
      uploadBtn: 'फोटो वेंचून काडात',
      pastePlaceholder: 'कठीण नोटीस हांगा पेस्ट करात...',
      simplifyBtn: 'सोप्या कोंकणींत रुपांतरीत करात',
      analyzing: 'नोटीस सोपी करता...',
      originalNotice: 'मूळ नोटीस',
      easyReadTitle: 'सोपें Easy-Read रूप',
      actionSteps: 'तुमी कितें करपाक जाय (पायरी प्रमाण):',
      deadlines: 'महत्वाच्यो तारखो आनी शेवटाची तारीख:',
      fees: 'शुल्क आनी खर्च:',
      documents: 'वांगडा हाडपाचीं कागदपत्रां:',
      eligibility: 'पात्रताय (कोणा खातीर):',
      warnings: 'महत्वाच्यो शिटकावण्यो आनी नेम:',
      contacts: 'हेल्पलाईन आनी कचेरी:',
      difficultWords: 'कठीण उतरांचे सोपे अर्थ:',
      compareBtn: 'मूळ मजकुरा कडेन ताळो करात',
      saveNoticeBtn: 'नोटीस सांबाळात',
    },
    listener: {
      title: 'आयकप्याचें कार्ड',
      subtitle: 'सामकार आशिल्ल्या मनशाक (कंडक्टर, दोतोर, दुकानदार) तुमच्या संवाद पद्दतीची म्हायती दिवंक हें कार्ड दाखयात.',
      counterTip: 'तुमचो फोन सामकार आशिल्ल्या मनशाक वाचपाक सोपें जाय अशें मुखार धरात.',
      showFullscreen: 'पूर्ण स्क्रीनार दाखयात',
      speakCard: 'व्हडल्यान उलययात',
      copyCard: 'मजकूर कॉपी करात',
      editTips: 'पासपोर्टांत सुचना बदलोवंक शकतात',
    },
    passport: {
      title: 'संवाद पासपोर्ट',
      subtitle: 'तुमच्यो आवडी, संवाद पद्दत आनी अक्षरांचो आकार थारायात.',
      nameField: 'तुमचें नांव (ऐच्छिक)',
      preferredLang: 'पसंतीची संवाद भास',
      scriptField: 'कोंकणी लिपी (देवनागरी / रोमी)',
      readingLevel: 'म्हायतीची कठीणाय',
      speechRate: 'उलोवपाची गती',
      textSize: 'अक्षरांचो आकार',
      highContrast: 'हाय कॉन्ट्रास्ट रंग',
      reducedMotion: 'अ‍ॅनिमेशन बंद करात',
      instructionsTitle: 'लोकां खातीर तुमच्यो सुचना',
      exportBtn: 'सेटिंग्स सेव्ह करात (JSON)',
      importBtn: 'सेटिंग्स लोड करात',
      savedSuccess: 'पासपोर्ट सेव्ह जालो!',
    },
    common: {
      speak: 'व्हडल्यान उलययात',
      speaking: 'उलयता...',
      stop: 'थांबयात',
      translate: 'भाशांतर',
      translating: 'भाशांतर जाता...',
      copy: 'प्रत करात',
      copied: 'प्रत जाली!',
      close: 'धांपात',
      back: 'फाटीं',
      loading: 'लोड जाता...',
      error: 'चूक घडली',
      offlineNotice: 'ऑफलाईन मोड: सेव्ह केल्ली म्हायती वापरता.',
      voiceMissingNotice: 'ह्या उपकरणाचेर कोंकणी आवाज उपलब्ध ना. व्हड अक्षरांचे कार्ड वापरा.',
    },
  },

  hi: {
    appName: 'सहज सेतु',
    tagline: 'आपकी आवाज़। आपकी भाषा। आपका तरीका।',
    nav: {
      home: 'मुखपृष्ठ',
      board: 'बातचीत बोर्ड',
      understand: 'दुनिया को समझें',
      listener: 'श्रोता कार्ड',
      passport: 'संवाद पासपोर्ट',
      saved: 'सहेजे गए',
      settings: 'सेटिंग्स',
    },
    home: {
      heroTitle: 'गोवा के लिए समावेशी व सुलभ संचार सेतु',
      heroSubtitle:
        'बोलने, सुनने या समझने में कठिनाई का सामना करने वाले व्यक्तियों के लिए सम्मानजनक एवं स्वतंत्र संचार साधन।',
      understandCardTitle: 'दुनिया को समझें',
      understandCardDesc:
        'कठिन सरकारी नोटिस, अस्पताल के पर्चे और बस की समय-सारणी को आसान भाषा और स्पष्ट चरणों में समझें।',
      understandCardAction: 'नोटिस सरल बनाएं',
      beUnderstoodTitle: 'अपनी बात कहें',
      beUnderstoodDesc:
        'अपनी ज़रूरतें, शारीरिक दर्द और आवश्यक निर्देश बहुभाषी कार्ड्स व आवाज़ द्वारा व्यक्त करें।',
      beUnderstoodAction: 'बातचीत बोर्ड खोलें',
      quickContextsTitle: 'गोवा के संदर्भ अनुसार त्वरित बातचीत',
      listenerCardBannerTitle: 'सामने वाले को तुरंत समझाना है?',
      listenerCardBannerDesc:
        'बस कंडक्टर, डॉक्टर या दुकानदार को यह कार्ड दिखाकर बताएं कि वे आपसे कैसे बात करें।',
      listenerCardBannerAction: 'श्रोता कार्ड खोलें',
      emergencyBannerTitle: 'आपातकालीन चिकित्सा या पुलिस सहायता',
      emergencyBannerAction: 'आपातकालीन मोड',
    },
    board: {
      title: 'बातचीत बोर्ड — Be Understood',
      subtitle: 'कार्ड्स पर टैप करके वाक्य बनाएं, बोलकर सुनाएं या बड़ी स्क्रीन पर दिखाएं।',
      composedLabel: 'बनाया गया संदेश:',
      composePlaceholder: 'नीचे दिए गए कार्ड्स पर टैप करें या संदेश टाइप करें...',
      speakComposed: 'बोलकर सुनाएं',
      translateComposed: 'अनुवाद करें',
      fullscreenCard: 'बड़ी स्क्रीन पर दिखाएं',
      clearComposed: 'साफ़ करें',
      allCategories: 'सभी श्रेणियां',
      searchPlaceholder: 'वाक्य या शब्द खोजें...',
      customPhraseBtn: 'नया कार्ड जोड़ें',
      addPhraseModalTitle: 'नया संचार कार्ड बनाएं',
      painScaleTitle: 'दर्द और तकलीफ़ पैमाना',
      painScaleDesc: '1 (हल्का) से 10 (गंभीर दर्द) और प्रभावित अंग चुनें।',
    },
    understand: {
      title: 'दुनिया को समझें — नोटिस सरलीकरण',
      subtitle: 'जटिल नोटिस, नियम और फॉर्म्स को छोटे वाक्यों, ज़रूरी तारीखों और स्पष्ट निर्देशों में बदलें।',
      tabUpload: 'फ़ोटो लें / अपलोड करें',
      tabPaste: 'टेक्स्ट पेस्ट करें',
      tabSamples: 'गोवा सार्वजनिक नोटिस नमूने',
      ocrPrompt: 'बोर्ड, अस्पताल नोटिस या बस समय-सारणी का फ़ोटो लेकर टेक्स्ट निकालें।',
      cameraBtn: 'कैमरा खोलें',
      uploadBtn: 'फ़ोटो चुनें',
      pastePlaceholder: 'यहाँ नोटिस या पत्र पेस्ट करें...',
      simplifyBtn: 'सरल भाषा में बदलें',
      analyzing: 'नोटिस को सरल बनाया जा रहा है...',
      originalNotice: 'मूल नोटिस',
      easyReadTitle: 'सरल रूप (Easy-Read)',
      actionSteps: 'आपको क्या करना है (क्रमवार):',
      deadlines: 'अंतिम तिथि और समय-सीमा:',
      fees: 'शुल्क और लागत:',
      documents: 'साथ लाने योग्य दस्तावेज़:',
      eligibility: 'पात्रता (किसे लाभ मिलेगा):',
      warnings: 'महत्वपूर्ण चेतावनी व नियम:',
      contacts: 'हेल्पलाइन और कार्यालय पता:',
      difficultWords: 'कठिन शब्दों के सरल अर्थ:',
      compareBtn: 'मूल टेक्स्ट से तुलना करें',
      saveNoticeBtn: 'नोटिस सहेजें',
    },
    listener: {
      title: 'श्रोता कार्ड',
      subtitle: 'सामने खड़े व्यक्ति (कंडक्टर, डॉक्टर, दुकानदार) को अपनी संवाद प्राथमिकताओं से अवगत कराएं।',
      counterTip: 'स्क्रीन को सामने वाले व्यक्ति की ओर घुमाएं ताकि वे आसानी से पढ़ सकें।',
      showFullscreen: 'पूर्ण स्क्रीन पर दिखाएं',
      speakCard: 'बोलकर सुनाएं',
      copyCard: 'टेक्स्ट कॉपी करें',
      editTips: 'पासपोर्ट में निर्देश बदलें',
    },
    passport: {
      title: 'संवाद पासपोर्ट',
      subtitle: 'अपनी प्राथमिकताएं, भाषा, फॉन्ट साइज और पढ़ने का स्तर तय करें।',
      nameField: 'आपका नाम (वैकल्पिक)',
      preferredLang: 'पसंदीदा संचार भाषा',
      scriptField: 'कोंकणी लिपि',
      readingLevel: 'जानकारी का स्तर',
      speechRate: 'बोलने की गति',
      textSize: 'अक्षर का आकार',
      highContrast: 'हाई कॉन्ट्रास्ट मोड',
      reducedMotion: 'एनिमेशन कम करें',
      instructionsTitle: 'दूसरों के लिए आपके निर्देश',
      exportBtn: 'सेटिंग्स निर्यात करें (JSON)',
      importBtn: 'सेटिंग्स आयात करें',
      savedSuccess: 'पासपोर्ट सफलतापूर्वक सहेजा गया!',
    },
    common: {
      speak: 'बोलकर सुनाएं',
      speaking: 'बोल रहा है...',
      stop: 'रोकें',
      translate: 'अनुवाद करें',
      translating: 'अनुवाद हो रहा है...',
      copy: 'कॉपी करें',
      copied: 'कॉपी हो गया!',
      close: 'बंद करें',
      back: 'वापस',
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि उत्पन्न हुई',
      offlineNotice: 'ऑफ़लाइन मोड: सहेजे गए डेटा का उपयोग हो रहा है।',
      voiceMissingNotice: 'इस डिवाइस पर कोंकणी आवाज़ उपलब्ध नहीं है। बड़े टेक्स्ट कार्ड का उपयोग करें।',
    },
  },

  mr: {
    appName: 'सहज सेतू',
    tagline: 'तुमचा आवाज. तुमची भाषा. तुमचा मार्ग.',
    nav: {
      home: 'मुख्यपृष्ठ',
      board: 'संवाद फलक',
      understand: 'जग समजून घ्या',
      listener: 'श्रोता कार्ड',
      passport: 'संवाद पासपोर्ट',
      saved: 'जतन केलेले',
      settings: 'सेटिंग्ज',
    },
    home: {
      heroTitle: 'गोव्यासाठी सर्वसमावेशक संवाद सेतू',
      heroSubtitle:
        'बोलण्यात, वाचण्यात किंवा समजण्यात अडचण येणाऱ्या व्यक्तींसाठी स्वाभिमानी आणि स्वतंत्र संवादाचे माध्यम.',
      understandCardTitle: 'जग समजून घ्या',
      understandCardDesc:
        'कठीण शासकीय सूचना, रुग्णालयाचे फॉर्म आणि बसचे वेळापत्रक सोप्या भाषेत व टप्प्यांत समजून घ्या.',
      understandCardAction: 'सूचना सोपी करा',
      beUnderstoodTitle: 'संवाद साधा',
      beUnderstoodDesc:
        'तुमच्या गरजा, शारीरिक वेदना आणि प्रवासाच्या सूचना बहुभाषिक कार्ड्स व आवाजाद्वारे मांडा.',
      beUnderstoodAction: 'संवाद फलक उघडा',
      quickContextsTitle: 'गोव्यातील संदर्भानुसार जलद संवाद',
      listenerCardBannerTitle: 'समोरच्याला त्वरित समजावून सांगायचे आहे?',
      listenerCardBannerDesc:
        'बस कंडक्टर, डॉक्टर किंवा दुकानदाराला हे कार्ड दाखवून सांगा की त्यांनी तुमच्याशी कसा संवाद साधावा.',
      listenerCardBannerAction: 'श्रोता कार्ड उघडा',
      emergencyBannerTitle: 'तातडीची वैद्यकीय किंवा पोलीस मदत',
      emergencyBannerAction: 'आपत्कालीन मोड',
    },
    board: {
      title: 'संवाद फलक — Be Understood',
      subtitle: 'कार्ड्सवर टॅप करून वाक्य बनवा, मोठ्याने ऐकवा किंवा मोठ्या स्क्रीनवर दाखवा.',
      composedLabel: 'तयार केलेला संदेश:',
      composePlaceholder: 'खालील कार्डांवर टॅप करा किंवा संदेश टाइप करा...',
      speakComposed: 'मोठ्याने वाचा',
      translateComposed: 'भाषांतर करा',
      fullscreenCard: 'पूर्ण स्क्रीनवर दाखवा',
      clearComposed: 'पुसून टाका',
      allCategories: 'सर्व श्रेणी',
      searchPlaceholder: 'वाक्य किंवा शब्द शोधा...',
      customPhraseBtn: 'नवीन कार्ड जोडा',
      addPhraseModalTitle: 'नवीन संवाद कार्ड बनवा',
      painScaleTitle: 'वेदना आणि त्रास मापक',
      painScaleDesc: '1 (कमी) ते 10 (तीव्र वेदना) आणि दुखणारा भाग निवडा.',
    },
    understand: {
      title: 'जग समजून घ्या — सूचना सरलीकरण',
      subtitle: 'गुंतागुंतीच्या सूचना, नियम आणि अर्ज छोट्या वाक्यांत आणि स्पष्ट पायऱ्यांत रूपांतरित करा.',
      tabUpload: 'फोटो घ्या / अपलोड करा',
      tabPaste: 'मजकूर पेस्ट करा',
      tabSamples: 'गोवा सार्वजनिक सूचना नमुने',
      ocrPrompt: 'पाटी, रुग्णालय सूचना किंवा बस वेळापत्रकाचा फोटो काढून मजकूर मिळवा.',
      cameraBtn: 'कॅमेरा उघडा',
      uploadBtn: 'फोटो निवडा',
      pastePlaceholder: 'येथे सूचना किंवा पत्र पेस्ट करा...',
      simplifyBtn: 'सोप्या भाषेत बदला',
      analyzing: 'सूचना सोपी केली जात आहे...',
      originalNotice: 'मूळ सूचना',
      easyReadTitle: 'सोपे रूप (Easy-Read)',
      actionSteps: 'तुम्हाला काय करायचे आहे (पायरीनुसार):',
      deadlines: 'महत्त्वाच्या तारखा आणि अंतिम मुदत:',
      fees: 'शुल्क आणि खर्च:',
      documents: 'सोबत आणायची कागदपत्रे:',
      eligibility: 'पात्रता (कोणासाठी):',
      warnings: 'महत्त्वाच्या सूचना व नियम:',
      contacts: 'हेल्पलाइन आणि कार्यालय पत्ता:',
      difficultWords: 'कठीण शब्दांचे सोपे अर्थ:',
      compareBtn: 'मूळ मजकुराशी तुलना करा',
      saveNoticeBtn: 'सूचना जतन करा',
    },
    listener: {
      title: 'श्रोता कार्ड',
      subtitle: 'समोरच्या व्यक्तीला (कंडक्टर, डॉक्टर, दुकानदार) तुमच्या संवाद पद्धतीची माहिती द्या.',
      counterTip: 'स्क्रीन समोरच्या व्यक्तीकडे करा जेणेकरून ते सहज वाचू शकतील.',
      showFullscreen: 'पूर्ण स्क्रीनवर दाखवा',
      speakCard: 'मोठ्याने वाचा',
      copyCard: 'मजकूर कॉपी करा',
      editTips: 'पासपोर्टमध्ये सूचना बदला',
    },
    passport: {
      title: 'संवाद पासपोर्ट',
      subtitle: 'तुमच्या आवडी, भाषा, फॉन्टचा आकार आणि वाचण्याची पातळी ठरवा.',
      nameField: 'तुमचे नाव (पर्यायी)',
      preferredLang: 'पसंतीची संवाद भाषा',
      scriptField: 'कोंकणी लिपी',
      readingLevel: 'माहितीची पातळी',
      speechRate: 'बोलण्याचा वेग',
      textSize: 'अक्षरांचा आकार',
      highContrast: 'हाय कॉन्ट्रास्ट रंग',
      reducedMotion: 'अ‍ॅनिमेशन कमी करा',
      instructionsTitle: 'इतरांसाठी तुमच्या सूचना',
      exportBtn: 'सेटिंग्ज एक्सपोर्ट करा (JSON)',
      importBtn: 'सेटिंग्ज इम्पोर्ट करा',
      savedSuccess: 'पासपोर्ट यशस्वीरीत्या जतन केला!',
    },
    common: {
      speak: 'मोठ्याने वाचा',
      speaking: 'वाचत आहे...',
      stop: 'थांबा',
      translate: 'भाषांतर',
      translating: 'भाषांतर होत आहे...',
      copy: 'कॉपी करा',
      copied: 'कॉपी केले!',
      close: 'बंद करा',
      back: 'मागे',
      loading: 'लोड होत आहे...',
      error: 'त्रुटी आढळली',
      offlineNotice: 'ऑफलाइन मोड: जतन केलेला डेटा वापरला जात आहे.',
      voiceMissingNotice: 'या डिव्हाइसवर कोंकणी आवाज उपलब्ध नाही. मोठ्या अक्षरांचे कार्ड वापरा.',
    },
  },
};
