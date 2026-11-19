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
    title: 'काशी में देव दीपावली की भव्य तैयारी, गंगा घाटों पर जलेंगे 11 लाख दीये; 500 कर्मचारी संभालेंगे कमान',
    excerpt:
      'वाराणसी में 24 नवंबर को देव दीपावली की भव्य तैयारी। गंगा घाटों पर 11 लाख से अधिक दीप जलेंगे। जानिए 500 कर्मचारियों की जिम्मेदारी, सुरक्षा व्यवस्था और खास आयोजन।',
    category: 'धर्म एवं संस्कृति (Religion & Culture)',
    author: 'विशेष संवाददाता, वाराणसी ब्यूरो',
    date: 'November 19, 2026',
    readTime: 8,
    coverImage: '/images/kashi-dev-deepawali-diyas.jpg',
    tags: ['Dev Deepawali', 'Varanasi', 'Kashi', 'Religious Events', 'Uttar Pradesh'],
    content: `
    <div class="news-stat-box">
      <p style="margin: 0; font-weight: 700; font-size: 1.1rem; color: var(--primary);">मुख्य बिंदु (Key Highlights):</p>
      <ul style="margin: 0.5rem 0 0 0; padding-left: 1.25rem;">
        <li><strong>11 लाख से अधिक दीये:</strong> 84 पक्के घाटों, उस पार रेती और 100 से अधिक कुंडों पर प्रज्वलित किए जाएंगे।</li>
        <li><strong>500 विशेष कर्मचारी:</strong> जिला पंचायत राज विभाग के कर्मियों को नौकाओं द्वारा दीप वितरण व प्रबंधन की कमान सौंपी गई।</li>
        <li><strong>24 नवंबर का मुख्य पर्व:</strong> चेत सिंह घाट पर 3D लेजर प्रोजेक्शन, अस्सी व दशाश्वमेध पर भव्य गंगा आरती और ग्रीन आतिशबाजी।</li>
        <li><strong>कड़ा सुरक्षा घेरा:</strong> नमो घाट से अस्सी घाट तक नौकाओं का टू-वे संचालन, ड्रोन सर्विलांस और क्विक रिस्पॉन्स टीमें तैनात।</li>
      </ul>
    </div>

    <h2>1. काशी में देव दीपावली को लेकर तैयारियां तेज</h2>
    <p>धार्मिक और आध्यात्मिक राजधानी काशी (वाराणसी) में विश्वप्रसिद्ध <strong>देव दीपावली</strong> को लेकर प्रशासनिक और सामाजिक स्तर पर तैयारियां युद्धस्तर पर जारी हैं। पौराणिक मान्यताओं के अनुसार, कार्तिक पूर्णिमा की पावन तिथि पर स्वयं 33 कोटि देवी-देवता स्वर्ग से उतरकर भगवान शिव की नगरी काशी के गंगा तट पर दीपदान और विजयोत्सव मनाने आते हैं। यही कारण है कि इस दिन काशी का दृश्य अलौकिक और त्रिपुरारि की ज्योतिर्मय छटा से परिपूर्ण हो उठता है।</p>
    <p>इस वर्ष देव दीपावली का मुख्य महापर्व <strong>24 नवंबर</strong> को पूरे उल्लास के साथ मनाया जाएगा। गंगा के अर्धचंद्राकार घाटों की श्रृंखला को दीयों की स्वर्णिम लड़ियों से सजाने के लिए नगर निगम, पर्यटन विभाग और स्थानीय नागरिकों ने मिलकर एक अभूतपूर्व कार्ययोजना तैयार की है। देश-विदेश से आने वाले लाखों पर्यटकों और श्रद्धालुओं के स्वागत के लिए घाटों पर प्रकाश, स्वच्छता और सांस्कृतिक वैभव की बेजोड़ व्यवस्था की जा रही है।</p>

    <figure>
      <img src="/images/kashi-diyas-arranged.jpg" alt="काशी के गंगा घाटों पर देव दीपावली के अवसर पर जगमगाते हजारों पारंपरिक मिट्टी के दीये" loading="lazy" />
      <figcaption>काशी के गंगा घाटों पर देव दीपावली के अवसर पर जगमगाते हजारों पारंपरिक मिट्टी के दीये।</figcaption>
    </figure>

    <h2>2. गंगा के दोनों किनारों पर जलेंगे 11 लाख दीप</h2>
    <p>इस वर्ष गंगा के दोनों तटों पर <strong>11 लाख से अधिक मिट्टी के पारंपरिक दीये</strong> प्रज्वलित करने का भव्य लक्ष्य निर्धारित किया गया है। यह दीपोत्सव केवल दशाश्वमेध या अस्सी घाट तक सीमित नहीं रहेगा, बल्कि राजघाट से लेकर रविदास घाट तक फैले सभी 84 पक्के ऐतिहासिक घाटों, सामने रेती (गंगा पार का रेतीला विस्तार) और नगर के 100 से अधिक प्राचीन कुंडों एवं सरोवरों को भी जगमग करेगा।</p>
    <p>दीयों की आपूर्ति और बाती की व्यवस्था में स्थानीय महिला स्वयं सहायता समूहों (SHGs) और कुम्हार परिवारों को बड़े पैमाने पर भागीदार बनाया गया है। इससे न केवल स्थानीय कुटीर उद्योग को प्रोत्साहन मिला है बल्कि पर्यावरण संरक्षण को ध्यान में रखते हुए केवल विशुद्ध माटी के दीयों और सरसों/तिल के तेल का उपयोग सुनिश्चित किया जा रहा है। घाट समितियों, स्थानीय तीर्थ पुरोहितों और एनसीसी कैडेट्स को दीप प्रज्वलन के समन्वित कार्य में शामिल किया गया है।</p>

    <figure>
      <img src="/images/kashi-diyas-night-lamps.jpg" alt="गंगा घाटों पर जलते हजारों मिट्टी के दीयों का अलौकिक दृश्य" loading="lazy" />
      <figcaption>फोटो: काशी के गंगा घाटों की सीढ़ियों पर कतारबद्ध जलते मिट्टी के पारंपरिक दीये।</figcaption>
    </figure>

    <h2>3. 500 कर्मचारियों को सौंपी गई जिम्मेदारी (नौकाओं से होगी आपूर्ति)</h2>
    <p>दीपोत्सव की इतनी विशाल व्यवस्था को समयबद्ध रूप से पूरा करने के लिए जिला प्रशासन ने <strong>जिला पंचायत राज विभाग के लगभग 500 कर्मचारियों एवं अधिकारियों</strong> को ग्राउंड पर विशेष जिम्मेदारी सौंपी है। मुख्य विकास अधिकारी एवं पंचायती राज अधिकारी की देखरेख में पूरे घाट क्षेत्र को <strong>34 सेक्टरों</strong> में विभाजित किया गया है।</p>
    <p>सड़क मार्गों पर अत्यधिक भीड़ और यातायात जाम से बचने के लिए प्रशासन ने एक अनूठी रणनीति अपनाई है—सभी दीयों, तेल के पीपों और बत्तियों का परिवहन मुख्य सड़कों के बजाय <em>गंगा में बजड़ों और बड़ी नावों के जरिए</em> किया जा रहा है। 24 नवंबर की सुबह तक सभी 34 सेक्टरों में दीपों की अंतिम खेप पहुंचाने और उन्हें घाटों की सीढ़ियों पर कतारबद्ध करने का निर्देश सेक्टर प्रभारियों को जारी कर दिया गया है।</p>

    <figure>
      <img src="/images/kashi-varanasi-aarti-ghats.jpg" alt="दशाश्वमेध घाट पर देव दीपावली के अवसर पर भव्य गंगा आरती" loading="lazy" />
      <figcaption>फोटो: दशाश्वमेध घाट पर देव दीपावली के अवसर पर आयोजित भव्य महाआरती और गंगा तट का विहंगम दृश्य।</figcaption>
    </figure>

    <h2>4. 24 नवंबर को होंगे विशेष धार्मिक और सांस्कृतिक आयोजन</h2>
    <p>देव दीपावली के पावन अवसर पर काशी का आकाश और जल दोनों ही अद्भुत रंगारंग रोशनी से सराबोर रहेंगे। प्रमुख आयोजनों की सूची इस प्रकार है:</p>
    <ul>
      <li><strong>दशाश्वमेध घाट पर महाआरती:</strong> अमर जवान ज्योति की स्मृति में 21 अर्चकों और 42 देव कन्याओं द्वारा राष्ट्र के अमर बलिदानियों को समर्पित भव्य 'भगीरथ शौर्य सम्मान' व महाआरती।</li>
      <li><strong>चेत सिंह घाट पर 3D लेजर व प्रोजेक्शन मैपिंग शो:</strong> ऐतिहासिक चेत सिंह किले की प्राचीर पर भगवान शिव के प्राकट्य और काशी के सांस्कृतिक इतिहास को दर्शाने वाला 3D लाइट एंड साउंड शो।</li>
      <li><strong>भव्य ड्रोन शो:</strong> दशाश्वमेध और अस्सी घाट के मध्य सैकड़ों ड्रोन द्वारा आकाश में शिव तांडव, त्रिशूल और ॐ की मनोहारी आकृतियों का प्रदर्शन।</li>
      <li><strong>श्री काशी विश्वनाथ धाम पर इको-फ्रेंडली आतिशबाजी:</strong> गंगा द्वार के समीप प्रदूषण-मुक्त ग्रीन आतिशबाजी का अद्भुत नजारा।</li>
      <li><strong>गंगा महोत्सव (20 से 23 नवंबर):</strong> नमो घाट पर चार दिवसीय गंगा महोत्सव का आयोजन, जिसमें देश के शीर्ष शास्त्रीय संगीतकार, नृत्यांगनाएं और लोक कलाकार अपनी प्रस्तुतियां देंगे।</li>
    </ul>

    <h2>5. श्रद्धालुओं की सुरक्षा के लिए विशेष त्रिस्तरीय इंतजाम</h2>
    <p>लाखों की संख्या में पहुंचने वाले देशी-विदेशी पर्यटकों की सुरक्षा और सुविधा को सर्वोच्च प्राथमिकता दी गई है। वाराणसी पुलिस कमिश्नरेट और जिला प्रशासन ने संयुक्त रूप से व्यापक सुरक्षा घेरा तैयार किया है:</p>
    <ul>
      <li><strong>वॉच टावर्स एवं ड्रोन निगरानी:</strong> सभी प्रमुख घाटों पर अस्थायी वॉच टावर स्थापित किए गए हैं और एंटी-ड्रोन गन व हाई-रेजोल्यूशन कैमरों से निगरानी रखी जा रही है।</li>
      <li><strong>टू-वे बोट ट्रैफिक सिस्टम:</strong> गंगा में नावों की भिड़ंत रोकने के लिए नमो घाट से अस्सी घाट तक नावों के आने और जाने के लिए जल-मार्ग पर अलग-अलग लेन (टू-वे ट्रैफिक) बनाई गई है। नावों पर ओवरलोडिंग पूर्णतः प्रतिबंधित है और लाइफ जैकेट अनिवार्य की गई है।</li>
      <li><strong>त्वरित सहायता व खोया-पाया केंद्र:</strong> दशाश्वमेध, अस्सी, नमो घाट और राजघाट पर बहुभाषी सहायता केंद्र और मेडिकल इमरजेंसी बूथ सक्रिय किए गए हैं।</li>
      <li><strong>एनडीआरएफ व जल पुलिस:</strong> गोताखोरों और फ्लोटिंग रेस्क्यू बोट्स के साथ एनडीआरएफ व एसडीआरएफ की 12 टीमें गंगा में लगातार पेट्रोलिंग करेंगी।</li>
    </ul>

    <figure>
      <img src="/images/kashi-dev-deepawali-night-diyas.jpg" alt="देव दीपावली की रात गंगा के जल में दीपों का प्रतिबिंब और रोशनी से नहाए काशी के ऐतिहासिक घाट" loading="lazy" />
      <figcaption>फोटो: देव दीपावली की रात गंगा के जल में लाखों दीपों का स्वर्णिम प्रतिबिंब और रोशनी से नहाए काशी के ऐतिहासिक घाट।</figcaption>
    </figure>

    <h2>6. काशी की संस्कृति और वैश्विक पर्यटन को मिलेगा बढ़ावा</h2>
    <p>देव दीपावली अब केवल एक स्थानीय पारंपरिक उत्सव नहीं रहा, बल्कि यह वैश्विक पर्यटन पटल पर भारत की आध्यात्मिक विरासत का सबसे बड़ा सांस्कृतिक राजदूत बन चुका है। काशी विश्वनाथ धाम के लोकार्पण के बाद से पर्यटकों की आमद में कई गुना वृद्धि दर्ज की गई है। होटल, नाव, परिवहन और स्थानीय हस्तशिल्प (बनारसी साड़ी, काष्ठ खिलौने, गुलाबी मीनाकारी) के व्यापारियों के अनुसार, इस पर्व से स्थानीय अर्थव्यवस्था को सैकड़ों करोड़ रुपये का सीधा संबल मिलता है।</p>
    <p>विभिन्न देशों के राजदूत, विशिष्ट अतिथि और आध्यात्मिक साधक काशी के इस असीम प्रकाश पर्व के साक्षी बनने पहुंच रहे हैं। गंगा के घाटों से निकलने वाली वैदिक ऋचाओं की गूंज और घंट-घड़ियाल की ध्वनि भारतीय संस्कृति की सार्वभौमिक शांति और बंधुत्व का संदेश पूरे विश्व में प्रसारित करती है।</p>

    <h2>7. निष्कर्ष: महाप्रकाश में विलीन होती महादेव की नगरी</h2>
    <p>संक्षेप में, 24 नवंबर को काशी एक बार फिर देवलोक की अलौकिक छवि को धरती पर जीवंत करेगी। 11 लाख दीपों का यह महाकुंभ केवल मोमबत्तियों या तेल का उजाला नहीं, बल्कि अंधकार पर प्रकाश और असत्य पर सत्य की सनातन विजय का आध्यात्मिक प्रतीक है। प्रशासन के 500 मुस्तैद कर्मचारी और काशीवासियों का आतिथ्य सत्कार इस आयोजन को ऐतिहासिक बनाने के लिए पूरी तरह तत्पर हैं। यदि आप इस पावन बेला में काशी में हैं, तो मां गंगा के पावन तट पर जलने वाला प्रत्येक दीप आपको आत्मिक शांति और अनंत ऊर्जा से भर देगा।</p>
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
