import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { isSupabaseConfigured, type PostRow } from '@/lib/supabase/types';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  coverImage: string;
  content: string;
  tags?: string[];
}

function rowToPost(row: PostRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    author: row.author,
    date: row.date,
    readTime: row.read_time,
    coverImage: row.cover_image,
    content: row.content,
  };
}

export const staticBlogPosts: BlogPost[] = [
  {
    slug: 'kashi-dev-deepawali-grand-celebration-2026',
    title: 'देव दीपावली पर काशी में क्या होगा खास? 11 लाख दीपों से जगमगाएंगे गंगा घाट',
    excerpt:
      'काशी देव दीपावली 2026: 24 नवंबर को वाराणसी के 84 घाटों पर 11 लाख दीपों का महाकुंभ। 500 कर्मचारियों की तैनाती, 34 सेक्टरों में दीप वितरण, लेजर शो, और भव्य गंगा आरती की पूरी जानकारी।',
    category: 'धर्म एवं संस्कृति',
    author: 'विशेष संवाददाता, वाराणसी ब्यूरो',
    date: 'November 21, 2026',
    readTime: 9,
    coverImage: '/images/kashi-dev-deepawali-diyas.jpg',
    tags: [
      'काशी देव दीपावली 2026',
      'वाराणसी देव दीपावली',
      '11 लाख दीप',
      'देव दीपावली की तैयारी',
      'गंगा घाट देव दीपावली',
      'काशी देव दीपावली कब है',
    ],
    content: `
    <div class="news-stat-box">
      <p style="margin: 0; font-weight: 700; font-size: 1.15rem; color: var(--primary);">देव दीपावली पर काशी में इस बार क्या होगा खास? (मुख्य बिंदु):</p>
      <ul style="margin: 0.75rem 0 0 0; padding-left: 1.25rem; line-height: 1.8;">
        <li><strong>11 लाख से अधिक दीयों का प्रज्वलन:</strong> 84 ऐतिहासिक पक्के घाटों, गंगा पार रेती और 100 से अधिक नगर कुंडों पर दीपदान।</li>
        <li><strong>500 विशेष कर्मचारी:</strong> पंचायती राज विभाग और नगर निगम के 500 कर्मियों को दीप वितरण, तेल आपूर्ति और घाट प्रबंधन की कमान।</li>
        <li><strong>34-सेक्टर वितरण प्रणाली:</strong> मुख्य सड़कों पर जाम से बचने के लिए गंगा में बजड़ों और नौकाओं द्वारा सेक्टरवार तेल-दीयों की आपूर्ति।</li>
        <li><strong>गंगा महोत्सव व सांस्कृतिक संगम:</strong> नमो घाट व चेत सिंह घाट पर 3D लेजर प्रोजेक्शन, भव्य ड्रोन शो और दशाश्वमेध पर 21 अर्चकों द्वारा महाआरती।</li>
        <li><strong>त्रिस्तरीय जल व थल सुरक्षा:</strong> नमो घाट से अस्सी तक टू-वे बोट लेन, एनडीआरएफ की 12 रेस्क्यू टीमें और एंटी-ड्रोन सर्विलांस।</li>
      </ul>
    </div>

    <h2>1. प्रस्तावना: काशी में देव दीपावली की पावन पृष्ठभूमि</h2>
    <p>धार्मिक और आध्यात्मिक राजधानी काशी (वाराणसी) में विश्वप्रसिद्ध <strong>काशी देव दीपावली 2026</strong> को लेकर व्यापक तैयारियां प्रशासनिक और सामाजिक स्तर पर पूरी गति से संचालित हैं। सनातन पौराणिक मान्यताओं के अनुसार, कार्तिक पूर्णिमा की पावन तिथि पर भगवान शिव ने त्रिपुरासुर नामक महादैत्य का वध कर देवताओं को भयमुक्त किया था। इसी विजय की प्रसन्नता में 33 कोटि देवी-देवता स्वर्गलोक से उतरकर मोक्षदायिनी काशी के गंगा तट पर दीपदान और महाविजयोत्सव मनाते हैं।</p>
    <p>यही कारण है कि कार्तिक मास की पूर्णिमा को भगवान विश्वनाथ की नगरी में मनाया जाने वाला यह महापर्व 'देव दीपावली' कहलाता है। इस दिन काशी का अर्धचंद्राकार गंगा तट लाखों दीपों की स्वर्णिम आभा से जगमगा उठता है और ऐसा प्रतीत होता है मानो संपूर्ण तारामंडल ही आकाश से उतरकर मां गंगा के पावन आंचल में समा गया हो।</p>

    <figure>
      <img src="/images/kashi-diyas-arranged.jpg" alt="काशी देव दीपावली 2026 के अवसर पर गंगा घाटों की सीढ़ियों पर सजाए गए लाखों मिट्टी के पारंपरिक दीये" loading="lazy" />
      <figcaption>फोटो: काशी के गंगा घाटों पर देव दीपावली 2026 की पूर्व संध्या पर कतारबद्ध किए जा रहे मिट्टी के पारंपरिक दीये।</figcaption>
    </figure>

    <h2>2. काशी देव दीपावली 2026 की तिथि एवं शुभ मुहूर्त</h2>
    <p>पंचांग गणना और काशी विद्वत परिषद के अनुसार, इस वर्ष कार्तिक पूर्णिमा की पावन तिथि <strong>24 नवंबर 2026</strong> को हर्षोल्लास और वैदिक विधि-विधान के साथ मनाई जा रही है।</p>
    <p>प्रशासनिक योजना के अनुसार, 24 नवंबर की संध्या को सूर्यास्त होते ही (लगभग शाम 5:15 बजे) एक साथ सभी घाटों पर शंखनाद और डमरू वादन के साथ दीप प्रज्वलन की शुरुआत होगी। इसके बाद शाम 6:00 बजे से दशाश्वमेध घाट, अस्सी घाट और नमो घाट पर विशेष महाआरती एवं सांस्कृतिक कार्यक्रम प्रारंभ होंगे।</p>

    <h2>3. 11 लाख दीपों का महाकुंभ: गंगा घाटों पर भव्य आयोजन</h2>
    <p>इस वर्ष पर्यटन विभाग और जिला प्रशासन ने जनसहयोग के साथ <strong>11 लाख से अधिक मिट्टी के पारंपरिक दीये</strong> जलाने का पुख्ता लक्ष्य तय किया है:</p>
    <ul>
      <li><strong>84 पक्के ऐतिहासिक घाट:</strong> राजघाट से लेकर रविदास घाट तक सभी 84 पक्के घाटों पर लगभग 8 लाख दीये प्रज्वलित किए जाएंगे।</li>
      <li><strong>गंगा पार रेतीला तट:</strong> गंगा नदी के उस पार रेती क्षेत्र में लगभग 2 लाख दीयों की विशेष श्रृंखला बनाई जाएगी, जो नौका विहार करने वाले श्रद्धालुओं को अद्भुत विहंगम दृश्य प्रस्तुत करेगी।</li>
      <li><strong>प्राचीन कुंड एवं सरोवर:</strong> नगर के 100 से अधिक ऐतिहासिक कुंडों (जैसे पुष्कर तालाब, शंकुलधारा, दुर्गाकुंड, मंदाकिनी, पिशाचमोचन) पर 1 लाख से अधिक दीप जलाए जाएंगे।</li>
    </ul>
    <p>पर्यावरण और स्थानीय आत्मनिर्भरता को बढ़ावा देने के लिए सभी दीये काशी और आसपास के ग्रामीण कुम्हारों से खरीदे गए हैं तथा शुद्ध सरसों और तिल के तेल का उपयोग सुनिश्चित किया गया है।</p>

    <figure>
      <img src="/images/kashi-diyas-night-lamps.jpg" alt="वाराणसी देव दीपावली की रात गंगा तट पर जलती दीपमालाएं" loading="lazy" />
      <figcaption>फोटो: वाराणसी देव दीपावली के अवसर पर जगमगाती स्वर्णिम दीपमालाएं।</figcaption>
    </figure>

    <h2>4. 500 कर्मचारियों की कमान और नोडल जिम्मेदारियां</h2>
    <p>इतने विशाल स्तर पर दीपोत्सव के निष्पादन हेतु जिला प्रशासन ने पंचायती राज विभाग, नगर निगम और नागरिक सुरक्षा संगठन के <strong>500 विशेष कर्मचारियों और अधिकारियों</strong> की तैनाती की है।</p>
    <p>प्रत्येक सेक्टर में नोडल अधिकारी नियुक्त किए गए हैं जिनकी जिम्मेदारी दीयों की गिनती, तेल-बाती का समयबद्ध वितरण, घाटों की पूर्व-सफाई और दीप प्रज्वलन के दौरान स्वयंसेवकों का मार्गदर्शन करना है। इसके साथ ही 1500 से अधिक एनसीसी कैडेट्स, स्काउट गाइड्स और स्वयंसेवी संस्थाओं के कार्यकर्ता कर्मचारियों के सहयोग में तैनात रहेंगे।</p>

    <h2>5. 34-सेक्टर वितरण प्रणाली: नौकाओं से दीप व तेल आपूर्ति</h2>
    <p>शहर के मुख्य मार्गों पर पर्यटकों की भारी भीड़ के मद्देनजर सड़क यातायात को बाधित होने से बचाने के लिए प्रशासन ने नवाचारी 'वॉटरवे लॉजिस्टिक्स प्लान' तैयार किया है। इसके तहत संपूर्ण घाट विस्तार को <strong>34 सेक्टरों</strong> में बांटा गया है:</p>
    <p>राजघाट और रामनगर डिपो से बड़े बजड़ों (कार्गो बोट्स) पर तेल के पीपे, दीये और बत्तियों के पैकेट लोड किए जाएंगे। ये बजड़े जलमार्ग से सीधे 34 सेक्टरों के घाटों पर पहुंचेंगे, जहां सेक्टर प्रभारी सामग्री प्राप्त कर तुरंत सीढ़ियों पर कतारबद्ध कराएंगे। इससे शहर के आंतरिक मार्गों पर रत्ती भर भी माल ढुलाई का दबाव नहीं बनेगा।</p>

    <figure>
      <img src="/images/kashi-varanasi-aarti-ghats.jpg" alt="दशाश्वमेध घाट पर देव दीपावली के अवसर पर भव्य महाआरती और जनसैलाब" loading="lazy" />
      <figcaption>फोटो: दशाश्वमेध घाट पर आयोजित भव्य महाआरती और गंगा तट पर उमड़ा श्रद्धालुओं का जनसमूह।</figcaption>
    </figure>

    <h2>6. जल व थल यातायात प्रबंधन (Transportation Arrangements)</h2>
    <p>लाखों देशी-विदेशी पर्यटकों की सुगम आवाजाही हेतु वाराणसी पुलिस कमिश्नरेट और यातायात पुलिस ने त्रिस्तरीय व्यवस्था लागू की है:</p>
    <ul>
      <li><strong>टू-वे बोट ट्रैफिक सिस्टम:</strong> नमो घाट से अस्सी घाट तक नौकाओं के टकराव को रोकने हेतु गंगा जल में फ्लोटिंग बायो-बॉयज लगाकर अलग-अलग अप-स्ट्रीम और डाउन-स्ट्रीम लेन बनाई गई हैं।</li>
      <li><strong>नाविक सुरक्षा नियम:</strong> प्रत्येक नाव पर लाइफ-जैकेट अनिवार्य है, ओवरलोडिंग पर पूर्ण प्रतिबंध है और नाविकों के लिए अल्कोहल परीक्षण अनिवार्य किया गया है।</li>
      <li><strong>नो-व्हीकल जोन:</strong> गोदौलिया, मैदागिन, सोनारपुरा और भदैनी से घाटों की ओर जाने वाले सभी संपर्क मार्गों को 24 नवंबर दोपहर 12 बजे से पैदल पथ (नो-व्हीकल जोन) घोषित किया गया है।</li>
      <li><strong>पार्किंग व शटल बसें:</strong> शहर के बाहरी प्रवेश द्वारों पर 15 अस्थायी उपग्रह पार्किंग स्थल बनाए गए हैं, जहां से इलेक्ट्रिक शटल बसें श्रद्धालुओं को निकटतम ड्रॉपिंग पॉइंट तक पहुंचाएंगी।</li>
    </ul>

    <h2>7. चार दिवसीय गंगा महोत्सव (Ganga Mahotsav 2026)</h2>
    <p>देव दीपावली के उपलक्ष्य में उत्तर प्रदेश पर्यटन एवं संस्कृति विभाग द्वारा 20 से 23 नवंबर तक नमो घाट और राजघाट पर प्रतिष्ठित <strong>गंगा महोत्सव</strong> का आयोजन किया जा रहा है। इसमें देश के शीर्षस्थ शास्त्रीय संगीत साधक, लोक गायक और नृत्यांगनाएं गंगा की गोद में अपनी कला का अर्पण कर रहे हैं। महोत्सव में बनारस घराने के पारंपरिक वाद्यवृंद और शास्त्रीय गायन की प्रस्तुतियां मुख्य आकर्षण का केंद्र बनी हुई हैं।</p>

    <h2>8. अन्य आधिकारिक तैयारियां: 3D लेजर शो, ड्रोन शो और सुरक्षा घेरा</h2>
    <p>इस वर्ष देव दीपावली में आधुनिक तकनीक और सनातन संस्कृति का अभूतपूर्व संगम देखने को मिलेगा:</p>
    <ul>
      <li><strong>चेत सिंह घाट पर 3D लेजर प्रोजेक्शन मैपिंग:</strong> 18वीं सदी के ऐतिहासिक चेत सिंह किले पर 25 मिनट का 3D लेजर शो प्रदर्शित होगा, जिसमें भगवान शिव के काशी आगमन और गंगा अवतरण की अमर कथा दिखाई जाएगी।</li>
      <li><strong>दशाश्वमेध पर शौर्य सम्मान महाआरती:</strong> गंगोत्री सेवा समिति द्वारा 21 अर्चकों और 42 देव कन्याओं के माध्यम से राष्ट्र की रक्षा में बलिदान देने वाले अमर जवानों को समर्पित विशेष महाआरती होगी।</li>
      <li><strong>आकाश में ड्रोन शो:</strong> दशाश्वमेध और अस्सी घाट के मध्य 500 से अधिक सुसज्जित ड्रोन्स द्वारा आकाश में त्रिशूल, डमरू, नटराज और ॐ की मनोहारी त्रिविमीय आकृतियां बनाई जाएंगी।</li>
      <li><strong>सुरक्षा एवं निगरानी:</strong> एनडीआरएफ की 12 फ्लोटिंग एम्बुलेंस टीमें, जल पुलिस के प्रशिक्षित गोताखोर, घाटों पर 30 वॉच टावर और एआई-संचालित फेस रिकग्निशन सीसीटीवी कैमरे 24 घंटे सतर्क रहेंगे।</li>
    </ul>

    <figure>
      <img src="/images/kashi-dev-deepawali-night-diyas.jpg" alt="देव दीपावली 2026 की रात दीपों की रोशनी से नहाए काशी के ऐतिहासिक घाट" loading="lazy" />
      <figcaption>फोटो: देव दीपावली की रात गंगा के जल में लाखों दीपों का स्वर्णिम प्रतिबिंब।</figcaption>
    </figure>

    <h2>9. अक्सर पूछे जाने वाले सवाल (Frequently Asked Questions)</h2>
    <div class="faq-section" style="margin-top: 1rem;">
      <h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 1.25rem;">प्र. 1: काशी देव दीपावली 2026 की सही तारीख क्या है?</h3>
      <p>उ: काशी देव दीपावली का महापर्व इस वर्ष कार्तिक पूर्णिमा के दिन <strong>24 नवंबर 2026</strong> को मनाया जा रहा है।</p>

      <h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 1.25rem;">प्र. 2: गंगा घाटों पर कितने दीये जलाए जाएंगे?</h3>
      <p>उ: इस वर्ष कुल <strong>11 लाख से अधिक मिट्टी के पारंपरिक दीये</strong> 84 पक्के घाटों, सामने रेती और नगर के 100 से अधिक कुंडों पर प्रज्वलित किए जाएंगे।</p>

      <h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 1.25rem;">प्र. 3: 3D लेजर प्रोजेक्शन शो किस घाट पर होगा?</h3>
      <p>उ: ऐतिहासिक <strong>चेत सिंह घाट</strong> पर 3D लेजर प्रोजेक्शन मैपिंग शो शाम को 6:30 बजे से निरंतर अंतराल पर आयोजित किया जाएगा।</p>

      <h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 1.25rem;">प्र. 4: देव दीपावली देखने का सबसे उत्तम साधन क्या है?</h3>
      <p>उ: गंगा नदी में पूर्व-पंजीकृत नौका या बजड़े से 84 घाटों की एकसमान दीपमाला को देखना सबसे अलौकिक अनुभव माना जाता है। इसके अलावा अस्सी या दशाश्वमेध घाट पर भी पैदल दर्शन सुलभ हैं।</p>
    </div>

    <h2>10. निष्कर्ष: प्रकाश के महासागर में विलीन होती काशी</h2>
    <p>काशी देव दीपावली 2026 केवल दीपों का एक दृश्य पर्व नहीं, बल्कि भारत की आध्यात्मिक चेतना, लोक-आस्था और सामूहिक श्रम का महापर्व है। प्रशासनिक स्तर पर 500 कर्मचारियों की तैनाती, 34 सेक्टरों में सुविचारित वितरण और नागरिकों का उत्साह मिलकर इस आयोजन को अविस्मरणीय बना रहे हैं। यदि आप 24 नवंबर को काशी में उपस्थित हैं, तो मां गंगा के पावन तट पर प्रज्वलित होने वाला प्रत्येक दीप आपके जीवन में शांति, पवित्रता और आध्यात्मिक ऊर्जा का संचार करेगा।</p>
    `,
  },
  {
    slug: 'ransomware-evolution-2026',
    title: 'Ransomware Evolution: The Shift to Encrypted Payloads',
    excerpt:
      'Examining how threat actors are deploying advanced encryption techniques to evade detection and maximize damage.',
    category: 'Threats',
    author: 'Infocus-IT Team',
    date: 'April 15, 2026',
    readTime: 12,
    coverImage: '/images/ransomware-cover.jpg',
    content: `
    <h2>The New Era of Ransomware</h2>
    <p>Ransomware has evolved significantly over the past year. What started as simple file-locking malware has transformed into a sophisticated ecosystem of threat actors employing advanced techniques.</p>
    <h3>Encryption Advancements</h3>
    <p>Modern ransomware variants now utilize military-grade encryption algorithms that are computationally intensive for defenders to crack.</p>
    <h3>Double Extortion Tactics</h3>
    <p>Attackers no longer rely solely on file encryption. They now exfiltrate sensitive data before encryption, threatening to expose it publicly if ransom isn't paid.</p>
    `,
  },
  {
    slug: 'zero-day-exploits-explained',
    title: 'Zero-Day Exploits: Understanding the Critical Threat',
    excerpt:
      'A comprehensive analysis of zero-day vulnerabilities and why they remain the most dangerous type of security flaw.',
    category: 'Security Research',
    author: 'Infocus-IT Team',
    date: 'April 10, 2026',
    readTime: 15,
    coverImage: '/images/zero-day-cover.jpg',
    content: `
    <h2>What Are Zero-Day Exploits?</h2>
    <p>A zero-day vulnerability is a software flaw that is unknown to the vendor and the public.</p>
    <h3>Why Zero-Days Are Dangerous</h3>
    <p>Zero-day exploits are particularly dangerous because no patch exists, leaving organizations completely vulnerable.</p>
    `,
  },
  {
    slug: 'phishing-human-factor',
    title: 'Phishing Attacks: Why Technology Alone Cannot Stop Social Engineering',
    excerpt:
      'Exploring why phishing remains the leading attack vector despite advanced security tools.',
    category: 'How-To',
    author: 'Infocus-IT Team',
    date: 'April 5, 2026',
    readTime: 10,
    coverImage: '/images/phishing-cover.jpg',
    content: `
    <h2>The Persistence of Phishing</h2>
    <p>Despite decades of awareness campaigns and technical defenses, phishing remains the primary entry point for security breaches.</p>
    `,
  },
  {
    slug: 'api-security-vulnerabilities',
    title: 'API Security: Protecting Your Microservices Architecture',
    excerpt:
      'Best practices for securing APIs in modern microservices environments.',
    category: 'How-To',
    author: 'Infocus-IT Team',
    date: 'March 30, 2026',
    readTime: 14,
    coverImage: '/images/api-security-cover.jpg',
    content: `
    <h2>The API Security Crisis</h2>
    <p>As organizations transition to microservices and API-first architectures, API security has become a critical concern.</p>
    `,
  },
  {
    slug: 'supply-chain-attacks',
    title: 'Supply Chain Security: Protecting Against Third-Party Risks',
    excerpt:
      'Understanding supply chain attack vectors and implementing defense strategies across your entire software ecosystem.',
    category: 'Threats',
    author: 'Infocus-IT Team',
    date: 'March 25, 2026',
    readTime: 13,
    coverImage: '/images/supply-chain-cover.jpg',
    content: `
    <h2>The Supply Chain Attack Landscape</h2>
    <p>Supply chain attacks represent one of the most sophisticated and damaging threat vectors in modern cybersecurity.</p>
    `,
  },
  {
    slug: 'quantum-computing-cryptography',
    title: 'Post-Quantum Cryptography: Preparing for the Quantum Threat',
    excerpt:
      'How quantum computing will break current encryption and what organizations need to do to prepare.',
    category: 'Security Research',
    author: 'Infocus-IT Team',
    date: 'March 18, 2026',
    readTime: 16,
    coverImage: '/images/quantum-cover.jpg',
    content: `
    <h2>The Quantum Threat Timeline</h2>
    <p>While cryptographically relevant quantum computers are likely still years away, the threat is real and organizations must begin preparing now.</p>
    `,
  },
];

async function getSupabase() {
  if (!isSupabaseConfigured()) return null;
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const supabase = await getSupabase();
  if (!supabase) return staticBlogPosts;
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });
  if (error || !data) {
    console.error('[blog-data] Supabase read failed, using static fallback:', error?.message);
    return staticBlogPosts;
  }
  if (data.length === 0) return staticBlogPosts;
  return (data as PostRow[]).map(rowToPost);
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const supabase = await getSupabase();
  if (!supabase) return staticBlogPosts.find((p) => p.slug === slug);
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();
  if (error || !data) return staticBlogPosts.find((p) => p.slug === slug);
  return rowToPost(data as PostRow);
}

export async function getFeaturedPost(): Promise<BlogPost> {
  const all = await getAllPosts();
  return all[0];
}
