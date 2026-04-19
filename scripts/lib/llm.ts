/**
 * Provider-agnostic editorial writer with optional editor pass.
 *
 * Flow:
 *   1. Draft pass → Groq (preferred) or Gemini (fallback)
 *   2. If EDITORIAL_PASSES=2 → editor pass re-reads the draft and rewrites
 *      weak sentences / AI-isms / vague claims.
 *   3. Attach author + slug to the final version.
 *
 * Env knobs:
 *   LLM_PROVIDER=groq|gemini          force a draft provider
 *   EDITORIAL_PASSES=1|2              1 = draft only, 2 = draft + editor
 *   EDITOR_PROVIDER=groq|gemini|cross optional editor override
 */

import type { Headline } from './rss';
import type { GeneratedPost } from './editorial-prompt';
import {
  pickAuthor,
  slugify,
  SYSTEM_PROMPT,
  buildUserPrompt,
  parseEditorialJson,
} from './editorial-prompt';
import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { editorPass } from './editor-pass';

export type { GeneratedPost } from './editorial-prompt';

type Provider = 'groq' | 'gemini';

type Draft = Omit<GeneratedPost, 'slug' | 'author'>;

function explicitProvider(): Provider | null {
  const raw = (process.env.LLM_PROVIDER || '').toLowerCase();
  if (raw === 'groq' || raw === 'gemini') return raw;
  return null;
}

// ---- Draft pass: Groq ------------------------------------------------------
async function draftWithGroq(
  headline: Headline,
  articleBody: string | null,
): Promise<Draft> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY is not set.');
  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  const client = new Groq({ apiKey });

  const completion = await client.chat.completions.create({
    model,
    temperature: 0.85,
    top_p: 0.92,
    response_format: { type: 'json_object' },
    max_tokens: 4096,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: buildUserPrompt(headline, articleBody) },
    ],
  });
  const raw = completion.choices[0]?.message?.content ?? '';
  if (!raw) throw new Error('Groq returned empty response.');
  return parseEditorialJson(raw);
}

// ---- Draft pass: Gemini ---------------------------------------------------
async function draftWithGemini(
  headline: Headline,
  articleBody: string | null,
): Promise<Draft> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set.');
  const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const genai = new GoogleGenerativeAI(apiKey);
  const model = genai.getGenerativeModel({
    model: modelName,
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      temperature: 0.85,
      topP: 0.92,
      responseMimeType: 'application/json',
    },
  });
  const result = await model.generateContent(buildUserPrompt(headline, articleBody));
  return parseEditorialJson(result.response.text());
}

async function draft(
  headline: Headline,
  articleBody: string | null,
): Promise<{ draft: Draft; provider: Provider; fallbackUsed: boolean }> {
  const forced = explicitProvider();

  if (forced === 'groq') {
    return {
      draft: await draftWithGroq(headline, articleBody),
      provider: 'groq',
      fallbackUsed: false,
    };
  }
  if (forced === 'gemini') {
    return {
      draft: await draftWithGemini(headline, articleBody),
      provider: 'gemini',
      fallbackUsed: false,
    };
  }

  // Auto mode: Groq first (better editorial prose), Gemini on error.
  if (process.env.GROQ_API_KEY) {
    try {
      return {
        draft: await draftWithGroq(headline, articleBody),
        provider: 'groq',
        fallbackUsed: false,
      };
    } catch (err) {
      console.warn(
        `[llm] Groq failed, falling back to Gemini: ${(err as Error).message}`,
      );
      return {
        draft: await draftWithGemini(headline, articleBody),
        provider: 'gemini',
        fallbackUsed: true,
      };
    }
  }

  return {
    draft: await draftWithGemini(headline, articleBody),
    provider: 'gemini',
    fallbackUsed: false,
  };
}

export interface EditorialResult extends GeneratedPost {
  provider: Provider;
  fallbackUsed: boolean;
  /** 1 = draft only, 2 = draft + editor. */
  passes: 1 | 2;
  /** Editor provider when passes===2 and editor succeeded; null if editor failed. */
  editor: Provider | null;
}

export async function generateEditorial(
  headline: Headline,
  articleBody: string | null,
): Promise<EditorialResult> {
  const { draft: firstDraft, provider, fallbackUsed } = await draft(
    headline,
    articleBody,
  );

  const passes = Number(process.env.EDITORIAL_PASSES) === 2 ? 2 : 1;
  if (passes === 1) {
    return {
      ...firstDraft,
      author: pickAuthor(),
      slug: slugify(firstDraft.title) || `post-${Date.now()}`,
      provider,
      fallbackUsed,
      passes: 1,
      editor: null,
    };
  }

  // Editor pass
  const { post, editor } = await editorPass(
    { headline, articleBody, draft: firstDraft },
    provider,
  );
  return {
    ...post,
    author: pickAuthor(),
    slug: slugify(post.title) || `post-${Date.now()}`,
    provider,
    fallbackUsed,
    passes: 2,
    editor,
  };
}
