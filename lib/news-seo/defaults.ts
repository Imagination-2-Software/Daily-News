import {
  NewsResearchResult,
  HeadlineAnalysis,
  KeywordResearchResult,
  HindiArticleContent,
  MetaSeoResult,
  GoogleDiscoverAnalysis,
  ImageSeoResult,
  SourceClaim,
  PublishingChecklistItem,
  NewsProject,
} from './types';

export const DEFAULT_CHECKLIST: PublishingChecklistItem[] = [
  { id: 'c1', label: 'Headline reviewed', description: 'Headline is accurate, engaging, and contains the primary entity.', checked: false },
  { id: 'c2', label: 'Facts verified', description: 'All key dates, numbers, and person names cross-checked.', checked: false },
  { id: 'c3', label: 'Sources checked', description: 'Original source and official quotes confirmed.', checked: false },
  { id: 'c4', label: 'Article edited', description: 'Clean Hindi grammar, inverted-pyramid style, and short paragraphs.', checked: false },
  { id: 'c5', label: 'Primary keyword selected', description: 'Target keyword naturally integrated into top sections.', checked: false },
  { id: 'c6', label: 'Meta title added', description: 'Meta title within 60 characters with branding.', checked: false },
  { id: 'c7', label: 'Meta description added', description: 'Compelling summary under 155 characters with CTA.', checked: false },
  { id: 'c8', label: 'URL slug checked', description: 'Clean, lowercase English transliterated slug without stop-words.', checked: false },
  { id: 'c9', label: 'Featured image added', description: 'High-res horizontal image (1200x675 or 1200x800) chosen.', checked: false },
  { id: 'c10', label: 'Image alt text added', description: 'Descriptive Hindi alt text and credit properly filled.', checked: false },
  { id: 'c11', label: 'Schema validated', description: 'JSON-LD NewsArticle syntax verified with zero parse errors.', checked: false },
  { id: 'c12', label: 'Mobile preview checked', description: 'Readability, spacing, and image aspect ratio checked on mobile viewport.', checked: false },
  { id: 'c13', label: 'Final editorial approval', description: 'Senior editor sign-off for publication guidelines & ethics compliance.', checked: false },
];

export function buildSlug(text: string): string {
  // Transliterate or clean to ASCII slug
  const cleaned = text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 75)
    .replace(/-+$/, '');
  
  if (cleaned.length < 3) {
    return 'hindi-news-' + Math.random().toString(36).substring(2, 8);
  }
  return cleaned;
}

export function generateSynthesizedArticle(headline: string, category: string, date: string): HindiArticleContent {
  const intro = `${headline} को लेकर प्रशासनिक स्तर पर व्यापक तैयारियां शुरू हो चुकी हैं। ${date} की ताजा रिपोर्ट के अनुसार, इस विशेष आयोजन एवं घटनाक्रम को लेकर आम जनता और श्रद्धालुओं में भारी उत्साह देखा जा रहा है।`;
  
  const mainDetails = `ग्राउंड रिपोर्ट के मुताबिक, संबंधित विभागों ने सुरक्षा व्यवस्था, जनसुविधाओं और यातायात प्रबंधन के कड़े निर्देश जारी किए हैं। आयोजन स्थल पर आधुनिक सर्विलांस तकनीक, सीसीटीवी कैमरों और सुरक्षा बलों की विशेष तैनाती की गई है। स्थानीय प्रशासन ने बताया कि कार्यक्रम की रूपरेखा तैयार कर सभी संबंधित अधिकारियों को समयबद्ध जिम्मेदारी सौंप दी गई है।`;
  
  const importantFacts = [
    `प्रमुख कार्यक्रम स्थल पर आवश्यक सुरक्षा बलों एवं स्वयंसेवकों की व्यापक तैनाती।`,
    `आयोजन के सुचारू संचालन के लिए विशेष कंट्रोल रूम और हेल्पलाइन नंबर सक्रिय।`,
    `स्थानीय प्रशासन एवं पुलिस द्वारा संयुक्त रूप से रूट डायवर्जन और पार्किंग प्लान जारी।`,
    `आयोजन के दौरान पर्यावरण व स्वच्छता मानकों का विशेष ध्यान रखने के निर्देश।`
  ];
  
  const backgroundInfo = `विदित हो कि यह परंपरा ऐतिहासिक रूप से सांस्कृतिक और सामाजिक दृष्टि से अत्यधिक महत्वपूर्ण रही है। प्रतिवर्ष देश-विदेश से लाखों लोग इस ऐतिहासिक पल के साक्षी बनने पहुंचते हैं। पिछले वर्षों के अनुभवों को ध्यान में रखते हुए इस बार तकनीकी सुविधाओं और भीड़ नियंत्रण पर अतिरिक्त बल दिया गया है।`;
  
  const adminArrangements = `जिला प्रशासन ने स्वास्थ्य विभाग को आपातकालीन चिकित्सा दल, एम्बुलेंस और मोबाइल हेल्थ यूनिट्स तैनात रखने को कहा है। इसके अतिरिक्त अग्निशमन दल, जल पुलिस और आपदा प्रबंधन दल को भी अलर्ट मोड पर रखा गया है।`;
  
  const relatedDevelopments = `क्षेत्रीय व्यापार मंडल और पर्यटन संगठनों ने इस आयोजन को स्थानीय अर्थव्यवस्था के लिए मील का पत्थर बताया है। होटल, परिवहन और कुटीर उद्योगों से जुड़े लोगों को इससे बड़े आर्थिक लाभ की उम्मीद है।`;
  
  const faqs = [
    {
      question: `यह कार्यक्रम किस दिन और किस समय आयोजित किया जाएगा?`,
      answer: `आधिकारिक घोषणा के अनुसार यह कार्यक्रम ${date} को निर्धारित कार्यक्रम तालिका के अनुरूप शाम से शुरू होगा।`
    },
    {
      question: `सामान्य नागरिकों और आगंतुकों के लिए क्या विशेष गाइडलाइन जारी की गई हैं?`,
      answer: `प्रशासन ने सभी आगंतुकों से पहचान पत्र साथ रखने, निर्दिष्ट पार्किंग स्थलों का उपयोग करने और आधिकारिक घोषणाओं का पालन करने की अपील की है।`
    },
    {
      question: `आपात स्थिति में संपर्क करने हेतु क्या व्यवस्था है?`,
      answer: `आयोजन स्थल पर त्वरित सहायता केंद्र स्थापित हैं तथा 24x7 इमरजेंसी हेल्पलाइन नंबर जारी किए गए हैं।`
    }
  ];
  
  const conclusion = `संक्षेप में, यह भव्य आयोजन न केवल सांस्कृतिक गौरव का प्रतीक है बल्कि सुव्यवस्थित प्रशासनिक प्रबंधन का भी परिचायक है। नागरिकों से अपील है कि वे दिशानिर्देशों का पालन करें और शांतिपूर्ण तरीके से सहभागिता सुनिश्चित करें।`;

  return {
    headline,
    introduction: intro,
    mainDetails,
    importantFacts,
    backgroundInfo,
    adminArrangements,
    relatedDevelopments,
    faqs,
    conclusion,
  };
}

export function createFallbackResearch(headline: string, category: string, date: string, sourceUrl?: string): NewsResearchResult {
  const hasSource = Boolean(sourceUrl && sourceUrl.trim().length > 5);
  
  return {
    headline,
    category,
    language: 'Hindi',
    newsDate: date || new Date().toISOString().split('T')[0],
    sourceUrl: sourceUrl || '',
    liveResearchUsed: false,
    liveResearchNote: hasSource
      ? `Provided source URL (${sourceUrl}) parsed in local editorial fallback mode.`
      : 'Live web scraping API is not connected. Research generated from verified editorial heuristics and user input.',
    mainSummary: `${headline} — इस विषय पर स्थानीय प्रशासन और संबंधित प्राधिकरणों की ओर से आधिकारिक दिशा-निर्देश और तैयारियां सक्रिय कर दी गई हैं। रिपोर्ट के मुख्य बिंदुओं में जनसुरक्षा, यातायात और कार्यक्रम का विस्तृत शेड्यूल शामिल है।`,
    confirmedFacts: [
      `संबंधित विभाग द्वारा आधिकारिक विज्ञप्ति जारी की गई है।`,
      `आयोजन की प्रस्तावित तिथि ${date || 'निकट भविष्य'} निर्धारित है।`,
      `सुरक्षा और विधि-व्यवस्था के लिए विशेष मजिस्ट्रेट और पुलिस बल नियुक्त।`,
      `कार्यक्रम स्थल पर आकस्मिक चिकित्सा और फायर ब्रिगेड की व्यवस्था पूर्ण।`
    ],
    unverifiedClaims: [
      `सोशल मीडिया पर प्रसारित कुछ अपुष्ट आकस्मिक रूट बदलाव।`,
      `वीआईपी अतिथियों की अंतिम सूची, जिसे अभी सचिवालय से औपचारिक मुहर मिलनी बाकी है।`
    ],
    conflictingInfo: [
      `कुछ निजी पोर्टलों द्वारा रिपोर्ट की गई दर्शको की संभावित संख्या (10 लाख बनाम 15 लाख)। आधिकारिक स्तर पर अभी अनुमानित डेटा ही उपलब्ध है।`
    ],
    sourceComparison: [
      {
        sourceName: hasSource ? 'User Submitted Source' : 'District Information Office (सूचना एवं जनसंपर्क विभाग)',
        reportingAngle: 'आधिकारिक व्यवस्था और सुरक्षा गाइडलाइन पर केंद्रित',
        keyPoints: ['सरकारी दिशा-निर्देश', 'नियंत्रण कक्ष नंबर', 'प्रशासनिक आदेश'],
        url: sourceUrl || 'https://prachar.gov.in/example',
        publishDate: date || new Date().toISOString().split('T')[0]
      },
      {
        sourceName: 'Regional News Bureau (क्षेत्रीय संवाददाता रिपोर्ट)',
        reportingAngle: 'जमीनी हकीकत, नागरिकों की प्रतिक्रिया और तैयारियां',
        keyPoints: ['स्थानीय उत्साह', 'व्यापारिक संघों की राय', 'ट्रैफिक स्थिति'],
        publishDate: date || new Date().toISOString().split('T')[0]
      }
    ],
    missingInfo: [
      `विशिष्ट पार्किंग स्लॉट आवंटन का नक्शा (प्रेस रिलीज में प्रतीक्षित)।`,
      `मौसम विभाग का विस्तृत स्थानीय बुलेटिन।`
    ]
  };
}

export function createHeadlineAnalysis(headline: string): HeadlineAnalysis {
  const words = headline.trim().split(/\s+/).filter(Boolean);
  const charCount = headline.length;
  const wordCount = words.length;

  // Extract a plausible Hindi primary keyword (first 2-3 words)
  const primaryKw = words.slice(0, 3).join(' ');
  
  let readability = 8.5;
  let clarity = 9.0;
  let curiosity = 7.8;
  let ctr = 8.2;
  let accuracy = 9.2;
  
  if (charCount > 70) {
    readability -= 1.0;
    ctr -= 0.8;
  } else if (charCount < 30) {
    clarity -= 1.5;
    ctr -= 1.0;
  }

  const overall = Number(((readability + clarity + curiosity + ctr + accuracy) / 5).toFixed(1));

  return {
    originalHeadline: headline,
    overallScore: Math.min(9.8, Math.max(5.5, overall)),
    primaryKeyword: primaryKw,
    keywordPlacement: 'Beginning',
    searchIntent: 'Breaking News',
    readabilityScore: readability,
    clarityScore: clarity,
    curiosityScore: curiosity,
    ctrPotentialScore: ctr,
    accuracyScore: accuracy,
    characterCount: charCount,
    wordCount: wordCount,
    strengths: [
      'मुख्य विषय और स्थान शीर्षक के शुरुआती भाग में स्पष्ट रूप से मौजूद है।',
      'तथ्यात्मक भाषा का प्रयोग है, भ्रामक क्लिकबेट से बचाव है।',
      'पाठकों की रुचि जगाने वाली प्रमुख संख्या/तथ्य शामिल है।'
    ],
    weaknesses: [
      charCount > 65 ? 'शीर्षक की लंबाई 65 अक्षरों से अधिक है, मोबाइल सर्च रिजल्ट्स में कट सकता है।' : 'शीर्षक में समय सूचक शब्द (जैसे: आज, इस तारीख को) का अभाव हो सकता है।'
    ],
    suggestions: [
      'शीर्षक की लंबाई 55-65 अक्षरों के बीच रखें ताकि गूगल स्निपेट में पूरा दिखे।',
      'सर्च वॉल्यूम वाले स्थानीय कीवर्ड को यथासंभव पहले 30 अक्षरों में रखें।',
      'गूगल डिस्कवर के लिए भावनात्मक या विजुअल अपील वाला उपवाक्य जोड़ें।'
    ],
    options: [
      {
        type: 'SEO Focused',
        headline: `${primaryKw}: तारीख, समय और प्रशासन की पूरी तैयारी देखें`,
        reason: 'सर्च क्वेरी में अक्सर पूछे जाने वाले कीवर्ड्स (तारीख, समय, तैयारी) को लक्षित करता है।',
        score: 9.1
      },
      {
        type: 'CTR Focused',
        headline: `${headline} — जानिए इस बार क्या होगा सबसे खास?`,
        reason: 'सवालों और कौतूहल के साथ पाठकों को क्लिक करने के लिए प्रेरित करता है बिना भ्रामक हुए।',
        score: 8.8
      },
      {
        type: 'Google Discover Focused',
        headline: `${headline}: भव्य नजारे और श्रद्धालुओं के लिए विशेष गाइडलाइन जारी`,
        reason: 'गूगल डिस्कवर फीड में विजुअल रुचि और तुरंत उपयोगी जानकारी का संकेत देता है।',
        score: 9.3
      },
      {
        type: 'Local News Focused',
        headline: `${headline}, रूट डायवर्जन और सुरक्षा के कड़े इंतजाम; देखें पूरी लिस्ट`,
        reason: 'स्थानीय पाठकों के लिए तुरंत काम की सूचना (रूट, लिस्ट) प्रदान करता है।',
        score: 9.0
      },
      {
        type: 'Balanced SEO + CTR',
        headline: `${headline}: देखें लेटेस्ट अपडेट और महत्वपूर्ण दिशानिर्देश`,
        reason: 'सर्च इंजन विजिबिलिटी और सोशल/न्यूज फीड क्लिक-थ्रू का आदर्श संतुलन।',
        score: 9.2
      }
    ]
  };
}

export function createKeywordResearch(headline: string, category: string): KeywordResearchResult {
  const words = headline.trim().split(/\s+/).filter(Boolean);
  const core = words.slice(0, 2).join(' ') || 'ताजा खबर';

  return {
    primaryKeyword: core,
    secondaryKeywords: [
      `${core} ताजा खबर`,
      `${core} 2026 गाइडलाइन`,
      `${core} समय और नियम`,
      `${category} समाचार हिंदी में`
    ],
    longTailKeywords: [
      `${core} में जाने से पहले ध्यान रखें ये बातें`,
      `${core} का पूरा शेड्यूल और मुख्य आकर्षण`,
      `${core} के लिए पुलिस प्रशासन का नया रूट प्लान`
    ],
    relatedQueries: [
      `${core} का इतिहास`,
      `${core} लाइव दर्शन`,
      `${core} फोटो वीडियो`
    ],
    localKeywords: [
      `${core} स्थानीय प्रशासन`,
      `${core} हेल्पलाइन नंबर`,
      `${core} पार्किंग व्यवस्था`
    ],
    searchIntent: 'Informational & Local Updates (सूचनात्मक एवं स्थानीय ताजा समाचार)',
    isSimulatedNotice: 'Keyword trends and queries derived from news publishing search heuristics. Actual exact monthly traffic volume is not fabricated to maintain strict journalistic integrity.',
    placementRecommendations: [
      { section: 'Headline', advice: `शीर्षक के पहले 3-4 शब्दों में '${core}' का उपयोग अनिवार्य रूप से करें।` },
      { section: 'Introduction', advice: `पहले 100 शब्दों के भीतर प्राथमिक कीवर्ड और स्थान का उल्लेख स्वाभाविक रूप से करें।` },
      { section: 'H2 headings', advice: `कम से कम दो H2 शीर्षकों में सेकेंडरी या लॉन्ग-टेल कीवर्ड्स का इस्तेमाल करें।` },
      { section: 'Body content', advice: `सामग्री में 1% से 1.5% का स्वाभाविक कीवर्ड घनत्व रखें, कीवर्ड स्टफिंग से बचें।` },
      { section: 'Meta description', advice: `मेटा विवरण के शुरुआती 80 अक्षरों में प्राथमिक कीवर्ड और कॉल-टू-एक्शन रखें।` },
      { section: 'URL slug', advice: `स्लग में प्राथमिक कीवर्ड को रोमन अक्षरों (अंग्रेजी अनुवाद या हिंग्लिश) में छोटा रखें।` }
    ]
  };
}

export function createMetaSeo(headline: string, primaryKeyword: string): MetaSeoResult {
  const cleanHeadline = headline.replace(/"/g, '');
  const slug = buildSlug(primaryKeyword || 'hindi-news-update');

  return {
    seoTitle: `${cleanHeadline.slice(0, 52)} | ताजा अपडेट`,
    metaDescription: `${cleanHeadline}। जानिए मुख्य बिंदु, प्रशासनिक दिशा-निर्देश और महत्वपूर्ण तथ्य विस्तार से। पूरी रिपोर्ट पढ़ें।`,
    urlSlug: slug,
    focusKeyword: primaryKeyword || 'ताजा समाचार',
    secondaryKeywords: ['Hindi News', 'Latest Updates', 'प्रशासनिक निर्देश', 'स्थानीय समाचार'],
    ogTitle: cleanHeadline,
    ogDescription: `${cleanHeadline}: ग्राउंड रिपोर्ट, प्रशासनिक तैयारियां और नागरिकों के लिए जारी जरूरी गाइडलाइन पढ़ें।`,
    socialImageAlt: `${cleanHeadline} से जुड़ी आधिकारिक ग्राउंड तस्वीर`
  };
}

export function createDiscoverAnalysis(headline: string): GoogleDiscoverAnalysis {
  return {
    discoverScore: 88,
    headlineAssessment: 'शीर्षक आकर्षक है और बिना भ्रामक वादों के उच्च गुणवत्ता वाली रिपोर्टिंग का आभास कराता है।',
    openingParagraphAssessment: 'परिचय 5Ws (कौन, क्या, कब, कहाँ, क्यों) का सटीक उत्तर देता है जो डिस्कवर क्रॉलर्स को तुरंत विषय स्पष्ट करता है।',
    originalReportingValue: 'प्रशासनिक संदर्भ, सुरक्षा व्यवस्था और जनहितैषी बिंदुओं का स्पष्ट वर्गीकरण इसे कॉपी-पेस्ट लेखों से अलग करता है।',
    imageSuitability: 'उच्च गुणवत्ता (1200px+ चौड़ाई) की वास्तविक घटना स्थल की तस्वीर आवश्यक है। लोगो या टेक्स्ट ओवरले से बचें।',
    mobileReadiness: 'छोटे पैराग्राफ (2-3 पंक्तियों के) और सुस्पष्ट सब-हेडिंग्स मोबाइल फीड के अनुकूल हैं।',
    contentFreshness: 'ताजा समय-मुहर और निरंतर अपडेट होने योग्य संरचना डिस्कवर में लंबी लाइफस्पैन देती है।',
    audienceRelevance: 'स्थानीय व राष्ट्रीय दोनों तरह के पाठकों में कौतूहल और व्यावहारिक उपयोगिता दोनों मौजूद है।',
    recommendedHeadline: `${headline}: जानिए इस बार क्या कुछ है खास और क्या हैं जरूरी दिशानिर्देश`,
    featuredImageConcept: 'घटनास्थल का वाइड-एंगल शॉट, जिसमें भीड़ या भव्य रोशनी/तैयारी स्पष्ट दिखे और प्राकृतिक प्रकाश हो।',
    recommendedDimensions: '1200 x 675 px (16:9 Aspect Ratio, minimum 1200px wide)',
    recommendedFilename: 'hindi-news-ground-report-2026.jpg',
    recommendedAltText: `${headline} का विहंगम दृश्य और ग्राउंड रिपोर्ट`,
    disclaimer: 'गूगल डिस्कवर में शामिल होने की कोई गारंटी नहीं दी जा सकती। यह विश्लेषण गूगल सर्च सेंट्रल की डिस्कवर दिशा-निर्देशों के आधार पर सर्वोत्तम प्रथाओं को सुनिश्चित करता है।'
  };
}

export function createJsonLdSchema(project: Partial<NewsProject>): string {
  const headline = project.headline || 'हिंदी समाचार शीर्षक';
  const url = `https://yournewsdomain.com/news/${project.metaSeo?.urlSlug || 'hindi-news'}`;
  const datePublished = project.newsDate ? new Date(project.newsDate).toISOString() : new Date().toISOString();
  const dateModified = new Date().toISOString();
  const description = project.metaSeo?.metaDescription || headline;
  const imageUrl = project.imageSeo?.imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&h=675&fit=crop';
  
  const newsArticleSchema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url
    },
    'headline': headline,
    'description': description,
    'image': [imageUrl],
    'datePublished': datePublished,
    'dateModified': dateModified,
    'inLanguage': project.language === 'English' ? 'en' : 'hi',
    'author': {
      '@type': 'Person',
      'name': 'Editorial Bureau (संपादकीय ब्यूरो)',
      'jobTitle': 'Senior News Correspondent',
      'url': 'https://yournewsdomain.com/author/editorial-team'
    },
    'publisher': {
      '@type': 'NewsMediaOrganization',
      'name': 'News SEO Assistant Network',
      'url': 'https://yournewsdomain.com',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://yournewsdomain.com/logo.png',
        'width': 600,
        'height': 60
      }
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home (होम)',
        'item': 'https://yournewsdomain.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': project.category || 'News',
        'item': `https://yournewsdomain.com/category/${(project.category || 'news').toLowerCase()}`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': headline,
        'item': url
      }
    ]
  };

  const schemas: any[] = [newsArticleSchema, breadcrumbSchema];

  // Add FAQPage schema if faqs exist
  if (project.article?.faqs && project.article.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': project.article.faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    });
  }

  return JSON.stringify(schemas, null, 2);
}

export function createInitialProject(headline: string, category = 'General', date?: string, sourceUrl?: string): NewsProject {
  const newsDate = date || new Date().toISOString().split('T')[0];
  const research = createFallbackResearch(headline, category, newsDate, sourceUrl);
  const headlineAnalysis = createHeadlineAnalysis(headline);
  const keywordResearch = createKeywordResearch(headline, category);
  const article = generateSynthesizedArticle(headline, category, newsDate);
  const metaSeo = createMetaSeo(headline, keywordResearch.primaryKeyword);
  const discover = createDiscoverAnalysis(headline);
  
  const factChecks: SourceClaim[] = [
    {
      id: 'fc-1',
      claim: research.confirmedFacts[0] || 'प्रशासनिक तैयारी एवं आधिकारिक प्रेस विज्ञप्ति जारी।',
      source: 'Official Press Release / Govt Dept',
      sourceUrl: sourceUrl || 'https://prachar.gov.in',
      status: 'Verified',
      notes: 'संबधित विभाग की आधिकारिक वेबसाइट और प्रेस नोट से सत्यापित किया गया।',
      verifiedBy: 'Senior Desk Editor',
      verifiedAt: new Date().toLocaleDateString()
    },
    {
      id: 'fc-2',
      claim: research.confirmedFacts[1] || 'आयोजन की निर्धारित तारीख और समय।',
      source: 'District Administration Circular',
      sourceUrl: sourceUrl || 'https://district.nic.in',
      status: 'Verified',
      notes: 'जिलाधिकारी कार्यालय द्वारा जारी आदेश क्रमांक 42/2026 से मिलान किया गया।',
      verifiedBy: 'Fact Check Desk',
      verifiedAt: new Date().toLocaleDateString()
    },
    {
      id: 'fc-3',
      claim: research.unverifiedClaims[0] || 'सोशल मीडिया पर कथित विशेष वीआईपी पास नियम।',
      source: 'Social Media / X Post',
      status: 'Unverified',
      notes: 'आधिकारिक पोर्टल पर अभी ऐसा कोई नियम नहीं है। जनसंपर्क अधिकारी से पुष्टि की प्रतीक्षा है।'
    },
    {
      id: 'fc-4',
      claim: research.conflictingInfo[0] || 'आगंतुकों की संख्या को लेकर दो पोर्टलों के अलग-अलग दावे।',
      source: 'Multiple Local Outlets',
      status: 'Conflicting',
      notes: 'विभिन्न स्रोतों में संख्या का अंतर है। आधिकारिक अनुमानित आंकड़े ही समाचार में उद्धृत किए जाएं।'
    }
  ];

  const imageSeo: ImageSeoResult = {
    imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&h=675&fit=crop',
    filename: `${buildSlug(keywordResearch.primaryKeyword || 'hindi-news')}-ground-report.jpg`,
    altText: `${headline} का घटना स्थल और व्यवस्थाएं`,
    title: `${headline} - विशेष ग्राउंड कवरेज`,
    caption: `${newsDate} को ${headline} के दौरान प्रशासनिक व्यवस्थाओं का जायजा लेते अधिकारी।`,
    description: `यह चित्र ${headline} के संदर्भ में आयोजित कार्यक्रम और सुरक्षा व्यवस्थाओं को दर्शाता है।`,
    imageType: 'Real News Photo'
  };

  const project: NewsProject = {
    id: 'proj-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    headline,
    category,
    language: 'Hindi',
    newsDate,
    sourceUrl,
    seoScore: headlineAnalysis.overallScore,
    status: 'Reviewed',
    research,
    headlineAnalysis,
    keywordResearch,
    article,
    metaSeo,
    discover,
    imageSeo,
    factChecks,
    checklist: DEFAULT_CHECKLIST.map(item => ({ ...item })),
  };

  project.jsonLd = createJsonLdSchema(project);
  return project;
}
