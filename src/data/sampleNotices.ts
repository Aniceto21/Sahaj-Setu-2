import { SupportedLanguage, KonkaniScript, SimplifiedNotice } from '../types';

export interface EasyReadContent {
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
}

export interface SampleNotice {
  id: string;
  category: string;
  title: string;
  source: string;
  text: string;
  easyRead: {
    en: EasyReadContent;
    kok_deva: EasyReadContent;
    kok_romi: EasyReadContent;
    hi: EasyReadContent;
    mr: EasyReadContent;
  };
}

export const SAMPLE_NOTICES: SampleNotice[] = [
  {
    id: 'sample-gmc',
    category: 'Healthcare',
    title: 'Goa Medical College (GMC) Bambolim - Special Disability Verification Camp',
    source: 'GMC Outpatient Department Notice Board',
    text: `GOVERNMENT OF GOA
DIRECTORATE OF HEALTH SERVICES & GOA MEDICAL COLLEGE, BAMBOLIM
NOTICE NO. GMC/OPD/2026/418

SUBJECT: SPECIAL CLINICAL EVALUATION & UNIQUE DISABILITY ID (UDID) ASSESSMENT CAMP

It is hereby notified for the general public that a Special Medical Assessment Camp for Orthopedic, Speech, Hearing, and Neurodevelopmental Disabilities will be convened at OPD Block C, Ground Floor, Goa Medical College, Bambolim, on Thursday, 12th November 2026, commencing at 09:30 AM to 03:00 PM.

ELIGIBILITY & PREREQUISITES:
1. Permanent residents of the State of Goa (Proof of 15 years domicile or Goan Electoral Card mandatory).
2. Existing expired disability passholders seeking renewal or new applicants with preliminary medical diagnosis papers from Taluka Primary Health Centres (PHC).

MANDATORY DOCUMENTS TO BE BROUGHT IN ORIGINAL WITH TWO ATTESTED COPIES:
(a) Aadhaar Card linked with mobile number.
(b) 4 recent passport size photographs (white background).
(c) Previous clinical case file / audiogram / psychological assessment report where applicable.
(d) Income certificate issued by competent Village Panchayat or Mamlatdar (for assistive aid subsidy).

PROCESSING FEE & CHARGES:
The assessment, audiometry screening, and UDID form processing are entirely GRATIS (FREE OF COST) under the Goa State Welfare Mission. No agent or intermediary is authorized to collect fees.

IMPORTANT WARNING:
Token distribution will strictly close at 11:30 AM to ensure clinical standards. Incomplete documentation will necessitate reassessment in the subsequent quarterly cycle. 

HELPLINE & ACCESSIBILITY DESK:
Medical Social Work Cell, GMC OPD: 0832-2458700 / Extension 214.
Disability Facilitation WhatsApp Helpline: +91 94220 54108 (Text only). Wheelchairs and patient escorts are stationed at Main Porch Gate 2.`,
    easyRead: {
      en: {
        title: 'GMC Bambolim: Special Disability Assessment & UDID Camp',
        summary: 'A free clinical medical assessment camp will be held at Goa Medical College, Bambolim, on Thursday, 12 November 2026, for new disability ID cards and renewals.',
        actionSteps: [
          'Arrive between 9:30 AM and 11:30 AM at OPD Block C, Ground Floor, GMC Bambolim.',
          'Bring your Aadhaar card, 4 photos, and previous clinic reports with 2 photocopies.',
          'Collect an assessment token before the 11:30 AM cut-off.',
          'Free wheelchairs and escorts are available at Main Porch Gate 2.'
        ],
        deadlines: [
          'Camp Date: Thursday, 12th November 2026 (9:30 AM to 3:00 PM)',
          'Strict Token Cut-off: 11:30 AM sharp'
        ],
        feesAndCosts: [
          'Completely FREE OF COST (Gratis) under Goa Welfare Mission'
        ],
        requiredDocuments: [
          'Aadhaar card linked with active mobile number',
          '4 recent passport size photographs (white background)',
          'Previous clinical case file, audiogram, or PHC papers',
          'Income certificate from Village Panchayat or Mamlatdar'
        ],
        eligibility: [
          'Permanent Goan residents (15 years domicile or Voter ID)',
          'Expired disability cardholders seeking renewal or new diagnosed applicants'
        ],
        importantWarnings: [
          'Tokens strictly close at 11:30 AM. Incomplete papers require waiting for the next quarterly camp.',
          'Do NOT pay any money to middle agents or outsiders.'
        ],
        contactInfo: [
          'GMC OPD Social Work Cell: 0832-2458700 / Ext 214',
          'WhatsApp Text Helpline: +91 94220 54108'
        ],
        difficultWordsExplained: [
          { word: 'Gratis', simpleMeaning: '100% free of charge, no payment needed' },
          { word: 'Prerequisites', simpleMeaning: 'Things and documents required before you arrive' },
          { word: 'UDID', simpleMeaning: 'Unique Disability Identity Card issued by the government' }
        ],
        disclaimer: 'Assistive Easy-Read guide. Please consult official GMC hospital authorities for clinical evaluation.'
      },
      kok_romi: {
        title: 'GMC Bambolim: Khaas Apangtv Tpasnni ani UDID Card Camp',
        summary: 'Goa Medical College (GMC) Bambolim hanga 12th November 2026 disa apang lokank khatir fukott tpasnni camp aslolem asa.',
        actionSteps: [
          'Sokalim 9:30 tem 11:30 vellar OPD Block C, Ground Floor GMC Bambolim hanga pavo.',
          'Aadhaar card, 4 photovam, ani adle dakhle 2 xerox copy-am soit haddat.',
          '11:30 voram adim token gheyat ani doctorak tpasunk diat.',
          'Gate No. 2 cher wheelchairs ani patient-ank pavovpeanchi fukott sovlot asa.'
        ],
        deadlines: [
          'Camp tarikh: Brihaspatvar, 12th November 2026 (Sokalim 9:30 tem 3:00)',
          'Token bond zatolem: Sokalim 11:30 vellar'
        ],
        feesAndCosts: [
          'Fukott / Kaim poixe faravpachi goroz na (100% Free under Goa Mission)'
        ],
        requiredDocuments: [
          'Mobile number joddlolo Aadhaar Card',
          '4 passport size photovam (dhovem background)',
          'Adlo hospital file, audiogram vo PHC kagdam',
          'Panchayat vo Mamlatdar-achem utpon dakhlo'
        ],
        eligibility: [
          'Goyant 15 vorsam ravpacho puravo aslole Goenkar nagrik',
          'Mudot somplole card-dharok vo nove arjdar'
        ],
        importantWarnings: [
          '11:30 uprant token mellchem na. Kagdam opurnn aslear portun yevchem poddtolem.',
          'Kaim dalalak vo maddesteank poixe diunk naka.'
        ],
        contactInfo: [
          'GMC OPD Phone: 0832-2458700 / Ext 214',
          'WhatsApp Helpline: +91 94220 54108'
        ],
        difficultWordsExplained: [
          { word: 'Gratis', simpleMeaning: 'Samkem fukott, kaim faravchem na' },
          { word: 'UDID', simpleMeaning: 'Sorkari apang vollokh card' }
        ],
        disclaimer: 'Sopean vachpachi madat. Khorea niyamank khatir GMC kacherint vicharat.'
      },
      kok_deva: {
        title: 'जीएमसी बांबोळी: खाशेलो दिव्यांग मुल्यांकन आनी UDID कार्ड शिबीर',
        summary: 'गोंय वैजकी महाविद्यालय (GMC) बांबोळी हांगा बिरेस्तारा, १२ नोव्हेंबर २०२६ दिसा दिव्यांग भावां-भयणीं खातीर खाशेलें फुकट तपासणी शिबीर आयोजीत केलां.',
        actionSteps: [
          'सकाळीं ९:३० ते ११:३० मजगतीं ओपीडी ब्लॉक सी (OPD Block C), तळमजलो हांगा पावात.',
          'आधार कार्ड, ४ फोटो आनी प्राथमिक केंद्राचे आदले कागद २ झेरॉक्स प्रतीं वांगडा हाडात.',
          'सकाळीं ११:३० चे पयलीं टोकन घेवचें आनी दोतोरा कडेन तपासणी करून घेवची.',
          'गेट नं. २ चेर व्हीलचेअर आनी मदतनिसांचो आदार फुकट उपलब्ध आसा.'
        ],
        deadlines: [
          'शिबीर तारीख: बिरेस्तार, १२ नोव्हेंबर २०२६ (सकाळीं ९:३० ते दुपारां ३:००)',
          'टोकन वाटप वेळ: सकाळीं ११:३० वरांचेर बंद जातलें'
        ],
        feesAndCosts: [
          'पुरायपणान फुकट (Gratis) - सरकारी योजने खाला एकूय रुपया पडचो ना'
        ],
        requiredDocuments: [
          'आधार कार्ड (मोबाईल जोडिल्लें)',
          '४ पासपोर्ट फोटो (धवो फाटभूंय)',
          'आदलो वैजकी अहवाल वा ऑडियोमीटर तपासणी कागद',
          'पंचायतीचो वा मामलेदाराचो उत्पन्नाचो दाखलो'
        ],
        eligibility: [
          'गोंय राज्याचे १५ वर्सांचे कायम रहिवासी दाखलो आसलेले लोक',
          'मुदत सोंपिल्ले कार्डधारक वा नवे अर्जदार'
        ],
        importantWarnings: [
          '११:३० उपरांत टोकन मेळचें ना. अपूर्ण कागदपत्रां आसल्यार परत वचचें पडटलें.',
          'कोणाकूय दलालाक पैशे दिव नाकात.'
        ],
        contactInfo: [
          'जीएमसी ओपीडी हेल्पलाईन: 0832-2458700 / Ext 214',
          'व्हॉट्सअ‍ॅप हेल्पलाईन: +91 94220 54108'
        ],
        difficultWordsExplained: [
          { word: 'Gratis', simpleMeaning: 'पुरायपणान फुकट' },
          { word: 'UDID', simpleMeaning: 'सरकारी दिव्यांग वळख कार्ड' }
        ],
        disclaimer: 'सोपे भाशेंत म्हायती. अधिकृत निर्णया खातीर जीएमसी कचेरेंत संपर्क करात.'
      },
      hi: {
        title: 'जीएमसी बांबोलिम: विशेष दिव्यांगता मूल्यांकन व यूडीआईडी कैंप',
        summary: 'गोवा मेडिकल कॉलेज, बांबोलिम में गुरुवार, 12 नवंबर 2026 को दिव्यांगजनों के लिए निःशुल्क जांच व यूडीआईडी कार्ड कैंप आयोजित किया जाएगा।',
        actionSteps: [
          'सुबह 9:30 से 11:30 के बीच ओपीडी ब्लॉक सी, भूतल, जीएमसी बांबोलिम पहुँचें।',
          'आधार कार्ड, 4 पासपोर्ट फोटो और पुराने पर्चे 2 प्रतियों के साथ लाएं।',
          '11:30 बजे से पहले टोकन प्राप्त करें और डॉक्टर से जांच करवाएं।',
          'गेट नंबर 2 पर व्हीलचेयर और सहायक की निःशुल्क सुविधा उपलब्ध है।'
        ],
        deadlines: [
          'कैंप तिथि: गुरुवार, 12 नवंबर 2026 (सुबह 9:30 से दोपहर 3:00)',
          'टोकन वितरण समय: सुबह 11:30 बजे तक'
        ],
        feesAndCosts: [
          'पूरी तरह निःशुल्क (Gratis) - कोई शुल्क नहीं'
        ],
        requiredDocuments: [
          'मोबाइल नंबर से जुड़ा आधार कार्ड',
          '4 पासपोर्ट आकार के फोटो (सफेद पृष्ठभूमि)',
          'पुरानी मेडिकल फाइल, ऑडियोमेट्री रिपोर्ट या पीएचसी पर्चा',
          'पंचायत या मामलेदार का आय प्रमाण पत्र'
        ],
        eligibility: [
          'गोवा राज्य के 15 वर्ष के मूल निवासी प्रमाण पत्र धारक',
          'पुराने पास नवीनीकरण या नए दिव्यांग आवेदक'
        ],
        importantWarnings: [
          '11:30 बजे के बाद टोकन नहीं मिलेगा। अधूरे दस्तावेजों पर अगली तिमाही में आना होगा।',
          'किसी भी दलाल या मध्यस्थ को कोई शुल्क न दें।'
        ],
        contactInfo: [
          'जीएमसी ओपीडी हेल्पलाइन: 0832-2458700 / Ext 214',
          'व्हाट्सएप हेल्पलाइन: +91 94220 54108'
        ],
        difficultWordsExplained: [
          { word: 'Gratis', simpleMeaning: 'पूरी तरह से मुफ्त' },
          { word: 'UDID', simpleMeaning: 'सरकारी विशिष्ट दिव्यांगता पहचान पत्र' }
        ],
        disclaimer: 'सुलभ सहायता प्रति। आधिकारिक जानकारी के लिए जीएमसी प्रशासन से संपर्क करें।'
      },
      mr: {
        title: 'जीएमसी बांबोळी: विशेष दिव्यांग मूल्यांकन व यूडीआयडी शिबीर',
        summary: 'गोवा वैद्यकीय महाविद्यालय (GMC) बांबोळी येथे गुरुवार, 12 नोव्हेंबर 2026 रोजी दिव्यांगांसाठी मोफत तपासणी व ओळखपत्र शिबीर होणार आहे.',
        actionSteps: [
          'सकाळी 9:30 ते 11:30 दरम्यान ओपीडी ब्लॉक सी, तळमजला, जीएमसी येथे पोहोचा.',
          'आधार कार्ड, 4 फोटो आणि जुनी कागदपत्रे 2 प्रतींसह सोबत आणा.',
          '11:30 पूर्वी टोकन घ्या आणि डॉक्टरांकडून तपासणी करून घ्या.',
          'गेट क्र. 2 वर व्हीलचेअर व सहाय्यकांची मोफत व्यवस्था आहे.'
        ],
        deadlines: [
          'शिबीर तारीख: गुरुवार, 12 नोव्हेंबर 2026 (सकाळी 9:30 ते दु. 3:00)',
          'टोकन वाटप वेळ: सकाळी 11:30 वाजता बंद होईल'
        ],
        feesAndCosts: [
          'पूर्णपणे मोफत (Gratis) - एकही रुपया आकारला जाणार नाही'
        ],
        requiredDocuments: [
          'मोबाईल नंबरशी जोडलेले आधार कार्ड',
          '4 पासपोर्ट फोटो (पांढरी पार्श्वभूमी)',
          'जुनी वैद्यकीय फाईल किंवा प्राथमिक आरोग्य केंद्राचे कागदपत्र',
          'पंचायत किंवा मामलेदारांचा उत्पन्नाचा दाखला'
        ],
        eligibility: [
          'गोव्यातील 15 वर्षांचे वास्तव्य दाखला असलेले नागरिक',
          'मुदत संपलेले पास नूतनीकरण किंवा नवीन दिव्यांग अर्जदार'
        ],
        importantWarnings: [
          '11:30 नंतर टोकन मिळणार नाही. अपूर्ण कागदपत्रांवर पुढील तिमाहीत बोलावले जाईल.',
          'कोणत्याही मध्यस्थाला पैसे देऊ नका.'
        ],
        contactInfo: [
          'जीएमसी ओपीडी हेल्पलाइन: 0832-2458700 / Ext 214',
          'व्हॉट्सअ‍ॅप हेल्पलाइन: +91 94220 54108'
        ],
        difficultWordsExplained: [
          { word: 'Gratis', simpleMeaning: 'पूर्णपणे मोफत' },
          { word: 'UDID', simpleMeaning: 'शासकीय दिव्यांग ओळखपत्र' }
        ],
        disclaimer: 'सुलभ संवादासाठी मदत. अधिकृत निर्णयासाठी जीएमसी रुग्णालयाशी संपर्क साधावा.'
      }
    }
  },
  {
    id: 'sample-ktcl',
    category: 'Public Transport',
    title: 'Kadamba Transport Corporation (KTCL) - Free Transit Pass Renewal',
    source: 'Panaji Bus Stand Terminal Notice',
    text: `KADAMBA TRANSPORT CORPORATION LIMITED (KTCL)
PUBLIC NOTICE: ANNUAL SMART BUS PASS RENEWAL FOR SPECIALLY-ABLED CITIZENS & SENIORS`,
    easyRead: {
      en: {
        title: 'Kadamba Transport (KTCL): Annual Smart Bus Pass Renewal',
        summary: 'Kadamba bus pass renewal for specially-abled citizens and seniors is now active at Panaji, Margao, and Mapusa bus stands from the 1st to 20th of this month.',
        actionSteps: [
          'Visit Counter 4 at Panaji, Margao Pass Section, or Mapusa Depot.',
          'Surrender your old pass and bring your UDID card (minimum 40% disability).',
          'Pay the Rs. 50 smart-card processing fee.',
          'Receive your activated pass for 100% free non-AC bus travel across Goa.'
        ],
        deadlines: [
          'Renewal Window: 1st to 20th of this month (10:00 AM to 4:30 PM)',
          'Deactivation: Passes not renewed by the 20th stop working'
        ],
        feesAndCosts: [
          'Smart Card processing fee: Rs. 50/- only',
          'Bus travel: 100% Free on all non-AC Kadamba routes'
        ],
        requiredDocuments: [
          'Current physical bus pass to surrender',
          'Goa Disability Card or UDID card (min 40% permanent benchmark)',
          'Proof of address (Ration Card or Voter ID)',
          'One stamp-size photo'
        ],
        eligibility: [
          'Persons with permanent benchmark disability of 40% or above',
          'Senior citizens registered with Goa Social Welfare'
        ],
        importantWarnings: [
          'Non-renewed passes will be rejected by conductor ticket machines after the 20th.',
          'If a conductor refuses wheelchair ramp deployment, report immediately to KTCL.'
        ],
        contactInfo: [
          'KTCL Control Room: 0832-2438034',
          'Complaint WhatsApp: 98231 12345'
        ],
        difficultWordsExplained: [
          { word: 'ETIM', simpleMeaning: 'Electronic Ticketing Machine held by bus conductors' },
          { word: 'Feeder Services', simpleMeaning: 'Small buses connecting villages to main bus stands' }
        ],
        disclaimer: 'Official Kadamba bus pass guidance. Please verify at nearest KTC terminal.'
      },
      kok_romi: {
        title: 'Kadamba Bus (KTCL): Apang Lokank ani Zanthiank Free Pass Renewal',
        summary: 'Kadamba bus pass novin korpachem kam Ponnji, Moddganv ani Mhapxem bus stand-acher hea mhoineache 1 tem 20 tarikh meren suru asa.',
        actionSteps: [
          'Ponnji Counter 4, Moddganv Pass Section vo Mhapxem Depot-ak bhett diat.',
          'Porno pass ani UDID card (unnear unnem 40% apangtv) haddat.',
          '50 rupiya smart card fee faravat.',
          'Sogllea non-AC Kadamba busamni 100% fukott bhowndi korat.'
        ],
        deadlines: [
          'Muddol tarikh: Hea mhoineache 1 tem 20 tarikh meren (10:00 AM tem 4:30 PM)',
          'Bond zaunchi tarikh: 20 tarikh uprant porno pass bond zatolo'
        ],
        feesAndCosts: [
          'Smart Card banovpachi fee: Fattim 50 rupiya',
          'Bus travel: 100% Fukott sogllea sorkari non-AC busamni'
        ],
        requiredDocuments: [
          'Porno bus pass',
          'Goa Social Welfare card vo UDID Card (40%+ apangtv)',
          'Ration card vo Voter ID',
          'Ek stamp size photo'
        ],
        eligibility: [
          '40% vo chodd apangtv aslole nagrik',
          'Sorkari nodvonn zantho lok'
        ],
        importantWarnings: [
          '20 tarikh uprant bus machine-ant porno card cholchem na.',
          'Conductoran wheelchair choddounk nakarlear complaint korat.'
        ],
        contactInfo: [
          'KTCL Phone: 0832-2438034',
          'WhatsApp Complaint: 98231 12345'
        ],
        difficultWordsExplained: [
          { word: 'Renewal', simpleMeaning: 'Muddho dakhlo navin korop' }
        ],
        disclaimer: 'Kadamba bus pass mahiti. KTC bus stand-acher vicharat.'
      },
      kok_deva: {
        title: 'कदंब बस (KTCL): दिव्यांग आनी जाण्ट्या लोकां खातीर मोफत पास नूतनीकरण',
        summary: 'कदंब बस पास नूतनीकरण पणजी, मडगांव आनी म्हापश्यां बस स्टॅण्डार १ ते २० तारखे मेरेन सुरू आसा.',
        actionSteps: [
          'पणजी कावंटर ४, मडगांव पास विभाग वा म्हापश्यां डेपोक भेट दियात.',
          'पोरनो पास आनी यूडीआयडी (किमान ४०% दिव्यांगत्व) कार्ड हाडात.',
          '५० रुपया स्मार्ट कार्ड शुल्क फारीक करात.',
          'सगळ्या नॉन-एसी कदंब बसेसनी १००% मोफत प्रवासाचो लाभ घेयात.'
        ],
        deadlines: [
          'नूतनीकरण मुदत: १ ते २० तारीख (सकाळीं १०:०० ते सांजवेळा ४:३०)',
          'शेवट: २० तारखे उपरांत पोरने पास बंद जातले'
        ],
        feesAndCosts: [
          'स्मार्ट कार्ड शुल्क: फकत ५०/- रुपये',
          'प्रवास: सगळ्या नॉन-एसी कदंब बसेसनी १००% मोफत'
        ],
        requiredDocuments: [
          'पोरनो मूळ पास',
          'दिव्यांग दाखलो वा यूडीआयडी कार्ड (किमान ४०%)',
          'रेशन कार्ड वा मतदान वळखपत्र',
          'एक स्टॅम्प सायझ फोटो'
        ],
        eligibility: [
          '४०% वा चड दिव्यांगत्व आसलेले गोंयकार',
          'नोंदणीकृत ज्येष्ठ नागरिक'
        ],
        importantWarnings: [
          '२० तारखे उपरांत मशिनार पोरने पास चालत नात.',
          'कंडक्टरान व्हीलचेअर रॅम्प लायलो ना जाल्यार रोखडीच तक्रार नोंदयात.'
        ],
        contactInfo: [
          'कदंब कंट्रोल रूम: 0832-2438034',
          'व्हॉट्सअ‍ॅप तक्रार: 98231 12345'
        ],
        difficultWordsExplained: [
          { word: 'नूतनीकरण', simpleMeaning: 'पास परत नवो करून घेवप' }
        ],
        disclaimer: 'कदंब बस मार्गदर्शन. लागींच्या केटीसी स्टँडार संपर्क करात.'
      },
      hi: {
        title: 'कदंब ट्रांसपोर्ट (KTCL): दिव्यांग व वरिष्ठ नागरिक निशुल्क बस पास नवीनीकरण',
        summary: 'कदंब बस पास नवीनीकरण पणजी, मडगांव और म्हापसा बस स्टैंड पर 1 से 20 तारीख तक चालू है।',
        actionSteps: [
          'पणजी काउंटर 4, मडगांव पास विभाग या म्हापसा बस डिपो जाएं।',
          'पुराना पास और यूडीआईडी कार्ड (न्यूनतम 40% दिव्यांगता) साथ लाएं।',
          '50 रुपये स्मार्ट कार्ड शुल्क जमा करें।',
          'सभी गैर-एसी कदंब बसों में 100% मुफ्त यात्रा का पास प्राप्त करें।'
        ],
        deadlines: [
          'नवीनीकरण अवधि: 1 से 20 तारीख तक (सुबह 10:00 से शाम 4:30)',
          'अंतिम तारीख: 20 के बाद पुराने पास बंद हो जाएंगे'
        ],
        feesAndCosts: [
          'स्मार्ट कार्ड शुल्क: केवल 50 रुपये',
          'बस यात्रा: सभी नॉन-एसी कदंब बसों में 100% मुफ्त'
        ],
        requiredDocuments: [
          'पुराना बस पास जमा करने के लिए',
          'गोवा दिव्यांग कार्ड या यूडीआईडी कार्ड (40%+)',
          'पते का प्रमाण (राशन कार्ड या वोटर आईडी)',
          'एक स्टाम्प आकार का फोटो'
        ],
        eligibility: [
          '40% या अधिक स्थायी दिव्यांगता वाले व्यक्ति',
          'गोवा सरकार में पंजीकृत वरिष्ठ नागरिक'
        ],
        importantWarnings: [
          '20 तारीख के बाद मशीन द्वारा पुराना पास अस्वीकार कर दिया जाएगा।',
          'यदि कंडक्टर व्हीलचेयर रैंप खोलने से मना करे, तो तुरंत शिकायत करें।'
        ],
        contactInfo: [
          'केटीसीएल नियंत्रण कक्ष: 0832-2438034',
          'शिकायत व्हाट्सएप: 98231 12345'
        ],
        difficultWordsExplained: [
          { word: 'नवीनीकरण', simpleMeaning: 'पुराने पास की समय-सीमा आगे बढ़ाना' }
        ],
        disclaimer: 'केटीसीएल बस पास गाइड। नजदीकी डिपो से पुष्टि करें।'
      },
      mr: {
        title: 'कदंब ट्रान्सपोर्ट (KTCL): दिव्यांग व ज्येष्ठ नागरिक मोफत बस पास नूतनीकरण',
        summary: 'कदंब बस पास नूतनीकरण पणजी, मडगाव व म्हापसा बस स्थानकावर 1 ते 20 तारखेपर्यंत सुरू आहे.',
        actionSteps: [
          'पणजी काउंटर 4, मडगाव पास विभाग किंवा म्हापसा डेपोला भेट द्या.',
          'जुना पास आणि यूडीआयडी कार्ड (किमान 40% अपंगत्व) सादर करा.',
          '50 रुपये स्मार्ट कार्ड शुल्क भरा.',
          'सर्व नॉन-एसी कदंब बसेसमध्ये 100% मोफत प्रवासाचा लाभ घ्या.'
        ],
        deadlines: [
          'नूतनीकरण मुदत: 1 ते 20 तारीख (सकाळी 10:00 ते सायं 4:30)',
          'शेवट: 20 तारखेनंतर जुने पास बंद होतील'
        ],
        feesAndCosts: [
          'स्मार्ट कार्ड शुल्क: फक्त 50 रुपये',
          'बस प्रवास: सर्व नॉन-एसी मार्गांवर 100% मोफत'
        ],
        requiredDocuments: [
          'जमा करण्यासाठी जुना बस पास',
          'यूडीआयडी कार्ड किंवा दिव्यांग दाखला (किमान 40%)',
          'पत्त्याचा पुरावा (रेशन कार्ड किंवा मतदार ओळखपत्र)',
          'एक स्टॅम्प आकाराचा फोटो'
        ],
        eligibility: [
          '40% किंवा अधिक कायमस्वरूपी दिव्यांगत्व असलेले नागरिक',
          'नोंदणीकृत ज्येष्ठ नागरिक'
        ],
        importantWarnings: [
          '20 तारखेनंतर कंडक्टर मशीनवर जुने पास चालणार नाहीत.',
          'कंडक्टरने व्हीलचेअर रॅम्प नाकारल्यास तात्काळ तक्रार नोंदवा.'
        ],
        contactInfo: [
          'केटीसीएल नियंत्रण कक्ष: 0832-2438034',
          'तक्रार व्हॉट्सअ‍ॅप: 98231 12345'
        ],
        difficultWordsExplained: [
          { word: 'नूतनीकरण', simpleMeaning: 'पास पुन्हा नवा करून घेणे' }
        ],
        disclaimer: 'केटीसी बस पास मार्गदर्शन. जवळच्या बस स्थानकावर खात्री करा.'
      }
    }
  },
  {
    id: 'sample-panchayat',
    category: 'Local Government',
    title: 'Village Panchayat of Calangute - House Tax Rebate & Gram Sabha Schedule',
    source: 'Panchayat Ghar Notice Board',
    text: `OFFICE OF THE VILLAGE PANCHAYAT CALANGUTE
BARDEZ - GOA
NOTICE OF ORDINARY GRAM SABHA & ANNUAL HOUSE TAX CLEARANCE 2026`,
    easyRead: {
      en: {
        title: 'Calangute Panchayat: Gram Sabha Meeting & 10% House Tax Rebate',
        summary: 'Gram Sabha meeting on Sunday, 15 Nov 2026 at 10 AM. Senior citizens and disabled residents receive a 10% tax rebate before 30 November.',
        actionSteps: [
          'Attend the Gram Sabha on Sunday 15 Nov at 10 AM at Calangute Panchayat Hall.',
          'Pay village house tax before 30 November to claim 10% early rebate.',
          'Pay online on Goa Online portal or at Panchayat Counter 1.'
        ],
        deadlines: [
          'Gram Sabha: Sunday, 15th November 2026 at 10:00 AM',
          '10% Tax Rebate Deadline: 30th November 2026',
          'Final Due Date before 12% Penalty: 31st December 2026'
        ],
        feesAndCosts: [
          '10% concession for seniors (65+) and persons with disabilities',
          '12% annual interest penalty after 31 December'
        ],
        requiredDocuments: [
          'House tax bill or assessment number',
          'Disability certificate or Senior Citizen card (for rebate)'
        ],
        eligibility: [
          'All residents and house owners in Calangute Village'
        ],
        importantWarnings: [
          'Failure to clear dues by 31 December triggers a 12% penalty and holds water NOCs.'
        ],
        contactInfo: [
          'VP Calangute Office: 0832-2277211',
          'Email: vpcalangute-bardez@gov.in'
        ],
        difficultWordsExplained: [
          { word: 'Gram Sabha', simpleMeaning: 'General village community meeting to decide local plans' },
          { word: 'Rebate', simpleMeaning: 'Discount or money saved on tax' }
        ],
        disclaimer: 'Village panchayat public service notice. Verify with Panchayat Secretary.'
      },
      kok_romi: {
        title: 'Calangute Panchayat: Gram Sabha ani Ghorachi Patti 10% Sutt',
        summary: 'Aitar 15th November 2026 disa sokalim 10:00 vellar Panchayat Hall Calangute hanga Gram Sabha zatoli. Zanthiank ani apang lokank 10% tax sutt melltolem.',
        actionSteps: [
          '15th November disa sokalim 10:00 vorar Panchayat Hall-ant hajir ravot.',
          'Ghorachi patti 30 November adim faravpachi ani 10% sutt ghevchi.',
          'Goa Online portal-ar vo Counter 1 cher poixe bhorat.'
        ],
        deadlines: [
          'Gram Sabha: Aitar, 15th November 2026 (Sokalim 10:00)',
          '10% Sutt Mellchi Tarikh: 30 November 2026',
          'Dondd lagchi tarikh: 31 December uprant 12% dondd'
        ],
        feesAndCosts: [
          'Zantho lok (65+) ani apang lokank 10% sutt'
        ],
        requiredDocuments: [
          'Porno patti bill vo ghoracho number',
          'Apang card vo Senior citizen card'
        ],
        eligibility: [
          'Calangute ganvche soglle nagrik'
        ],
        importantWarnings: [
          '31 December meren patti bhorli na zalear 12% dondd poddtolo ani udkachi NOC bond zatoli.'
        ],
        contactInfo: [
          'Calangute Panchayat: 0832-2277211'
        ],
        difficultWordsExplained: [
          { word: 'Gram Sabha', simpleMeaning: 'Ganvkaranchi bhesak / boska' }
        ],
        disclaimer: 'Panchayat sorkari mahiti.'
      },
      kok_deva: {
        title: 'कळंगूट पंचायत: ग्रामसभा आनी घराची पट्टी १०% सूट',
        summary: 'आयतार, १५ नोव्हेंबर २०२६ दिसा सकाळीं १०:०० वरांचेर कळंगूट पंचायत हॉलार ग्रामसभा जातली. जाण्ट्यांक आनी दिव्यांगांक घराच्या करांत १०% सूट मेळटली.',
        actionSteps: [
          '१५ नोव्हेंबर दिसा सकाळीं १०:०० वरांचेर पंचायत हॉलार हजर रावचें.',
          '३० नोव्हेंबर पयलीं घराचो कर भरून १०% सूट मेळवची.',
          'गोवा ऑनलाईन पोर्टलार वा पंचायत कावंटर १ चेर कर फारीक करात.'
        ],
        deadlines: [
          'ग्रामसभा: आयतार, १५ नोव्हेंबर २०२६ (सकाळीं १०:००)',
          '१०% सूट मुदत: ३० नोव्हेंबर २०२६',
          'दंड लागू: ३१ डिसेंबर उपरांत १२% चक्रवाढ व्याज'
        ],
        feesAndCosts: [
          'ज्येष्ठ नागरिक (६५+) आनी दिव्यांगां खातीर १०% सवलत'
        ],
        requiredDocuments: [
          'घराचे पट्टेचें बिल वा घर क्रमांक',
          'दिव्यांग दाखलो वा ज्येष्ठ नागरिक कार्ड'
        ],
        eligibility: [
          'कळंगूट गांवचे सगळे घरमालक आनी रहिवासी'
        ],
        importantWarnings: [
          '३१ डिसेंबर मेरेन कर भरलो ना जाल्यार १२% दंड आनी उदकाची एनओसी बंद जातली.'
        ],
        contactInfo: [
          'कळंगूट पंचायत फोन: 0832-2277211'
        ],
        difficultWordsExplained: [
          { word: 'ग्रामसभा', simpleMeaning: 'गांवच्या लोकांची बसका' }
        ],
        disclaimer: 'ग्रामपंचायत अधिकृत मार्गदर्शक.'
      },
      hi: {
        title: 'कलंगूट पंचायत: ग्राम सभा बैठक व गृह कर में 10% छूट',
        summary: 'रविवार, 15 नवंबर 2026 को सुबह 10 बजे ग्राम सभा होगी। दिव्यांगों व वरिष्ठ नागरिकों को 30 नवंबर से पहले 10% कर छूट मिलेगी।',
        actionSteps: [
          '15 नवंबर को सुबह 10 बजे कलंगूट पंचायत हॉल में उपस्थित हों।',
          '30 नवंबर से पहले गृह कर जमा कर 10% छूट प्राप्त करें।',
          'गोवा ऑनलाइन पोर्टल या पंचायत काउंटर 1 पर भुगतान करें।'
        ],
        deadlines: [
          'ग्राम सभा: रविवार, 15 नवंबर 2026 सुबह 10:00 बजे',
          '10% छूट की अंतिम तिथि: 30 नवंबर 2026',
          'जुर्माना तिथि: 31 दिसंबर के बाद 12% ब्याज'
        ],
        feesAndCosts: [
          'वरिष्ठ नागरिकों व दिव्यांगों को 10% छूट'
        ],
        requiredDocuments: [
          'गृह कर बिल या हाउस नंबर',
          'दिव्यांग प्रमाण पत्र या सीनियर सिटीजन कार्ड'
        ],
        eligibility: [
          'कलंगूट ग्राम पंचायत के सभी निवासी'
        ],
        importantWarnings: [
          '31 दिसंबर तक भुगतान न करने पर 12% जुर्माना और पानी की एनओसी पर रोक लगेगी।'
        ],
        contactInfo: [
          'कलंगूट पंचायत कार्यालय: 0832-2277211'
        ],
        difficultWordsExplained: [
          { word: 'ग्राम सभा', simpleMeaning: 'गांव के सभी निवासियों की आधिकारिक सभा' }
        ],
        disclaimer: 'पंचायत जन सूचना।'
      },
      mr: {
        title: 'कळंगूट पंचायत: ग्रामसभा व घरपट्टीमध्ये 10% सवलत',
        summary: 'रविवार, 15 नोव्हेंबर 2026 रोजी सकाळी 10 वाजता ग्रामसभा होईल. ज्येष्ठ नागरिक व दिव्यांगांना 30 नोव्हेंबरपूर्वी 10% घरपट्टी सवलत मिळेल.',
        actionSteps: [
          '15 नोव्हेंबर रोजी सकाळी 10 वाजता पंचायत हॉलमध्ये उपस्थित राहा.',
          '30 नोव्हेंबरपूर्वी घरपट्टी भरून 10% सवलत मिळवा.',
          'गोवा ऑनलाईन पोर्टल किंवा पंचायत काउंटर 1 वर कर भरा.'
        ],
        deadlines: [
          'ग्रामसभा: रविवार, 15 नोव्हेंबर 2026 सकाळी 10:00 वाजता',
          '10% सवलत मुदत: 30 नोव्हेंबर 2026',
          'दंड लागू: 31 डिसेंबरनंतर 12% दंड व्याज'
        ],
        feesAndCosts: [
          'ज्येष्ठ नागरिक व दिव्यांगांसाठी 10% सवलत'
        ],
        requiredDocuments: [
          'घरपट्टी बिल किंवा घर नंबर',
          'दिव्यांग प्रमाणपत्र किंवा ज्येष्ठ नागरिक कार्ड'
        ],
        eligibility: [
          'कळंगूट गावातील सर्व रहिवासी व घरमालक'
        ],
        importantWarnings: [
          '31 डिसेंबरपर्यंत कर न भरल्यास 12% दंड व पाण्याचे ना-हरकत प्रमाणपत्र थांबवले जाईल.'
        ],
        contactInfo: [
          'कळंगूट पंचायत कार्यालय: 0832-2277211'
        ],
        difficultWordsExplained: [
          { word: 'ग्रामसभा', simpleMeaning: 'गावातील सर्व ग्रामस्थांची बैठक' }
        ],
        disclaimer: 'ग्रामपंचायत अधिकृत नोटीस.'
      }
    }
  },
  {
    id: 'sample-electricity',
    category: 'Public Utilities',
    title: 'Goa Electricity Department - Power Shutdown & Voltage Safety Notice',
    source: 'Sub-Divisional Office, Mapusa',
    text: `GOVERNMENT OF GOA - ELECTRICITY DEPARTMENT
SUB DIVISION III, MAPUSA / PORVORIM
NOTICE OF SCHEDULED POWER OUTAGE FOR SUB-STATION UPGRADATION`,
    easyRead: {
      en: {
        title: 'Goa Electricity Dept: Power Outage on 7 Nov (Mapusa & Bardez)',
        summary: 'Scheduled electricity shutdown on Saturday, 7 November 2026 from 8:30 AM to 2:00 PM across Mapusa Market, Feira Alta, Morod, and Khorlim for underground cable upgrades.',
        actionSteps: [
          'Charge all mobile phones, wheelchairs, and emergency battery inverters beforehand.',
          'Medical patients with oxygen concentrators or nebulizers should call 1912.',
          'Unplug sensitive electronics to protect against sudden voltage surges.'
        ],
        deadlines: [
          'Power Shutdown: Saturday, 7th November 2026 (8:30 AM to 2:00 PM)'
        ],
        feesAndCosts: [
          'No fees involved'
        ],
        requiredDocuments: [
          'None'
        ],
        eligibility: [
          'Residents of Mapusa, Morod, Khorlim, and surrounding Bardez wards'
        ],
        importantWarnings: [
          'Treat all wires and lines as strictly LIVE at all times, as power may resume early.',
          'Medical patients requiring continuous power must arrange backup or transport.'
        ],
        contactInfo: [
          'Electricity Control Room Mapusa: 0832-2250280',
          'Goa Power Toll-Free Helpline: 1912'
        ],
        difficultWordsExplained: [
          { word: 'Surge', simpleMeaning: 'Sudden spike of electricity that can damage appliances' }
        ],
        disclaimer: 'Public safety notice. Verify with Electricity Department.'
      },
      kok_romi: {
        title: 'Goa Vij Khatu: 7th November Disa Mapusa Vibhagant Light Bond',
        summary: 'Sunevar, 7th November 2026 disa sokalim 8:30 tem doparam 2:00 vellar Mapusa Bazar, Morod ani Khorlim bhagant underground cable bodolpachea kamak khatir light bond astoli.',
        actionSteps: [
          'Phone, wheelchair batli ani inverters adinch charge korun dovorat.',
          'Oxygen machine vo nebulizer aslole duvent lokamni rokhddench 1912 cher phone korcho.',
          'Voltaj sudden vaddli zalear TV ani fridge bond dovorat.'
        ],
        deadlines: [
          'Light bond vell: Sunevar, 7th November (8:30 AM tem 2:00 PM)'
        ],
        feesAndCosts: [
          'Kaim poixe na'
        ],
        requiredDocuments: [
          'Kaim na'
        ],
        eligibility: [
          'Mapusa ani Bardez talukeache lok'
        ],
        importantWarnings: [
          'Soglleo taro chalu asat oxench somzat, kiteak light vella adim suru zaunk xokta.',
          'Oxygen zai asloleank khatir battery backup dovorat.'
        ],
        contactInfo: [
          'Mapusa Control Room: 0832-2250280',
          'Toll-Free Helpline: 1912'
        ],
        difficultWordsExplained: [
          { word: 'Outage', simpleMeaning: 'Vij / Light bond asop' }
        ],
        disclaimer: 'Vij khatyachi shittkavnni.'
      },
      kok_deva: {
        title: 'गोंय वीज खातें: ७ नोव्हेंबर दिसा म्हापश्यां भागांत वीज पुरवठो बंद',
        summary: 'शेनवार, ७ नोव्हेंबर २०२६ दिसा सकाळीं ८:३० ते दुपारां २:०० वरांचेर म्हापसा बाजार, खोर्लीं, मोरोड वाठारांत केबल दुरुस्ती खातीर वीज बंद उरतली.',
        actionSteps: [
          'फोन, व्हीलचेअर बॅटरी आनी इन्व्हर्टर पयलींच चार्ज करून दवरात.',
          'ऑक्सिजन मशिन वा नेब्युलायझर आशिल्ल्या दुयेंती मनशांनी १९१२ चेर फोन करचो.',
          'व्होल्टेज अचानक वाडल्यार उपकरणां सुरक्षित दवरपाक फ्रीज, टीव्हीचे प्लग काडात.'
        ],
        deadlines: [
          'वीज बंद वेळ: शेनवार, ७ नोव्हेंबर २०२६ (सकाळीं ८:३० ते दुपारां २:००)'
        ],
        feesAndCosts: [
          'कसलेच शुल्क ना'
        ],
        requiredDocuments: [
          'कागदां गरज ना'
        ],
        eligibility: [
          'म्हापसा आनी बार्देश तालुक्याचे रहिवासी'
        ],
        importantWarnings: [
          'सगळ्यो वायर्स चालूच आसात अशें समजाचें, कारण काम सोंपल्यार वीज वेळ पयलीं चालू जावंक शकता.',
          'वैजकी उपकरणां आशिल्ल्या कुटुंबियांनी बॅकअप सज्ज दवरचें.'
        ],
        contactInfo: [
          'म्हापसा वीज कंट्रोल रूम: 0832-2250280',
          'टोल-फ्री हेल्पलाईन: 1912'
        ],
        difficultWordsExplained: [
          { word: 'वीज खंडित', simpleMeaning: 'थोडो वेळ लाईट बंद उरप' }
        ],
        disclaimer: 'सुरक्षा सूचना. वीज खात्या कडेन संपर्क करात.'
      },
      hi: {
        title: 'गोवा विद्युत विभाग: 7 नवंबर को म्हापसा क्षेत्र में बिजली बंद',
        summary: 'शनिवार, 7 नवंबर 2026 को सुबह 8:30 से दोपहर 2:00 बजे तक म्हापसा बाजार, खोर्लिम व मोरोड में केबल सुधार कार्य हेतु बिजली आपूर्ति बंद रहेगी।',
        actionSteps: [
          'फोन, इनवर्टर व बैटरी उपकरण पहले से चार्ज रखें।',
          'ऑक्सीजन मशीन या नेबुलाइजर वाले मरीज सहायता के लिए 1912 पर कॉल करें।',
          'वोल्टेज के झटके से बचाने के लिए संवेदनशील उपकरण प्लग से निकाल दें।'
        ],
        deadlines: [
          'बिजली कटौती समय: शनिवार, 7 नवंबर 2026 (सुबह 8:30 से दोपहर 2:00)'
        ],
        feesAndCosts: [
          'कोई शुल्क नहीं'
        ],
        requiredDocuments: [
          'कोई दस्तावेज नहीं'
        ],
        eligibility: [
          'म्हापसा व बार्देश के सभी निवासी'
        ],
        importantWarnings: [
          'तारों को हर समय चालू मानकर सावधानी बरतें क्योंकि काम पूरा होने पर बिजली पहले भी आ सकती है।',
          'चिकित्सा मरीजों के लिए बैकअप तैयार रखें।'
        ],
        contactInfo: [
          'विद्युत नियंत्रण कक्ष म्हापसा: 0832-2250280',
          'टोल-फ्री हेल्पलाइन: 1912'
        ],
        difficultWordsExplained: [
          { word: 'वोल्टेज सर्ज', simpleMeaning: 'बिजली का अचानक तेज झटका जो उपकरण खराब कर सकता है' }
        ],
        disclaimer: 'विद्युत विभाग आधिकारिक सूचना।'
      },
      mr: {
        title: 'गोवा वीज खाते: 7 नोव्हेंबर रोजी म्हापसा भागात वीज पुरवठा खंडित',
        summary: 'शनिवार, 7 नोव्हेंबर 2026 रोजी सकाळी 8:30 ते दुपारी 2:00 वाजेपर्यंत म्हापसा बाजार, खोर्लिम आणि मोरोड भागात केबल दुरुस्तीसाठी वीज बंद राहील.',
        actionSteps: [
          'फोन, इन्व्हर्टर आणि बॅटरी उपकरणे आधीच चार्ज करून ठेवा.',
          'ऑक्सिजन किंवा नेब्युलायझर वापरणाऱ्या रुग्णांनी 1912 वर संपर्क साधावा.',
          'व्होल्टेज अचानक वाढून नुकसान होऊ नये म्हणून फ्रीज व टीव्हीचे प्लग काढून ठेवा.'
        ],
        deadlines: [
          'वीज खंडित वेळ: शनिवार, 7 नोव्हेंबर 2026 (सकाळी 8:30 ते दु. 2:00)'
        ],
        feesAndCosts: [
          'शुल्क नाही'
        ],
        requiredDocuments: [
          'काही नाही'
        ],
        eligibility: [
          'म्हापसा व बार्देश तालुक्यातील सर्व रहिवासी'
        ],
        importantWarnings: [
          'काम वेळेपूर्वी संपल्यास वीज लवकर सुरू होऊ शकते, त्यामुळे तारांना चालूच मानावे.',
          'वैद्यकीय रुग्णांसाठी बॅटरी बॅकअप सज्ज ठेवावा.'
        ],
        contactInfo: [
          'म्हापसा वीज नियंत्रण कक्ष: 0832-2250280',
          'टोल-फ्री हेल्पलाइन: 1912'
        ],
        difficultWordsExplained: [
          { word: 'वीज खंडित', simpleMeaning: 'काही काळ वीज पुरवठा बंद राहणे' }
        ],
        disclaimer: 'वीज विभाग अधिकृत सूचना.'
      }
    }
  }
];

export function getSampleNoticeEasyRead(
  sampleId: string,
  lang: SupportedLanguage,
  script: KonkaniScript = 'deva'
): SimplifiedNotice | null {
  const sample = SAMPLE_NOTICES.find((s) => s.id === sampleId);
  if (!sample) return null;

  let key: 'en' | 'kok_deva' | 'kok_romi' | 'hi' | 'mr' = 'en';
  if (lang === 'kok') {
    key = script === 'romi' ? 'kok_romi' : 'kok_deva';
  } else if (lang === 'hi') {
    key = 'hi';
  } else if (lang === 'mr') {
    key = 'mr';
  }

  const content = sample.easyRead[key] || sample.easyRead.en;

  return {
    id: `sample-${sampleId}-${lang}-${script}`,
    title: content.title,
    summary: content.summary,
    actionSteps: [...content.actionSteps],
    deadlines: [...content.deadlines],
    feesAndCosts: [...content.feesAndCosts],
    requiredDocuments: [...content.requiredDocuments],
    eligibility: [...content.eligibility],
    importantWarnings: [...content.importantWarnings],
    contactInfo: [...content.contactInfo],
    difficultWordsExplained: [...content.difficultWordsExplained],
    disclaimer: content.disclaimer,
    originalText: sample.text,
    savedAt: new Date().toISOString(),
    language: lang,
    script: lang === 'kok' ? script : undefined,
  };
}
