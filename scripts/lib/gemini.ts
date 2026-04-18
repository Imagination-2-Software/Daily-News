import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Headline } from './rss';

const MODEL = 'gemini-1.5-flash';

export type GeneratedPost = {
  title: string;
  slug: string;
  excerpt: string;
  category: 'Security Research' | 'Threats' | 'How-To' | 'Compliance';
  author: string;
  readTime: number;
  content: string;
  imagePrompt: string;
};

const AUTHORS = [
  'Marcus Chen',
  'Dr. Sarah Williams',
  'Elena Rodriguez',
  'David Kumar',
  'James Peterson',
  'Prof. Alexander Norton',
];

function pickAuthor() {
  return AUTHORS[Math.floor(Math.random() * AUTHORS.length)];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

const SYSTEM_PROMPT = `You are a senior editorial writer for InFocusIT, an independent cybersecurity journal.

Voice: rigorous, practitioner-facing, defender-first. Think The Economist meets Krebs on Security. Avoid vendor marketing language. Prefer concrete mechanisms, attacker tradecraft, and practical mitigations over hype.

You will be given a news headline. Produce a humanized, long-form editorial (700-1100 words) that is inspired by the headline but not a copy of the source article. Write in your own voice, add analytical framing, and cite no specific quotes. Never fabricate specific CVEs, version numbers, or victim names that are not in the headline itself — speak in general terms instead.

Return STRICT JSON only (no markdown fences), matching this schema:
{
  "title": "headline-style title, no trailing period",
  "excerpt": "one-sentence hook, <200 chars",
  "category": "one of: Security Research | Threats | How-To | Compliance",
  "readTime": integer minutes (6-14),
  "content": "HTML body using only <h2>, <h3>, <p>, <ul>, <li> — no <html>/<body> wrapper, no scripts, no style attrs",
  "imagePrompt": "short visual prompt (under 30 words) for a moody editorial cover image, cinematic, no text, dark palette"
}`;

export async function generateEditorial(headline: Headline): Promise<GeneratedPost> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set.');

  const genai = new GoogleGenerativeAI(apiKey);
  const model = genai.getGenerativeModel({
    model: MODEL,
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      temperature: 0.7,
      responseMimeType: 'application/json',
    },
  });

  const userPrompt = `HEADLINE: ${headline.title}
SOURCE: ${headline.source}
SNIPPET: ${headline.contentSnippet ?? '(none)'}`;

  const result = await model.generateContent(userPrompt);
  const raw = result.response.text();
  const parsed = JSON.parse(raw) as Omit<GeneratedPost, 'slug' | 'author'>;

  const author = pickAuthor();
  const slug = slugify(parsed.title) || `post-${Date.now()}`;

  return {
    ...parsed,
    author,
    slug,
  };
}
