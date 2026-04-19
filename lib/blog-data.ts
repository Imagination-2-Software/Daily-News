import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { isSupabaseConfigured, type PostRow } from '@/lib/supabase/types';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Security Research' | 'Threats' | 'How-To' | 'Compliance';
  author: string;
  date: string;
  readTime: number;
  coverImage: string;
  content: string;
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
