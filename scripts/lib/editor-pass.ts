/**
 * Editor pass.
 *
 * Takes a first-draft post and asks the same LLM (or optionally a different
 * one) to act as an editor: identify weak sentences, AI-isms, vague claims,
 * and missed opportunities — then rewrite. Returns the revised post in the
 * same JSON schema the draft used.
 *
 * Two useful gains from this over single-pass:
 *   1. AI-ism pass — LLMs obey a banned-phrase list only 80-90% of the
 *      first time. Reading their own draft with the banlist in hand, they
 *      catch the slips.
 *   2. Specificity injection — the editor is told to find any paragraph
 *      that could be true of any story, and replace it with something
 *      that's specifically true of THIS story.
 *
 * Opt in with EDITORIAL_PASSES=2 (default is 1).
 */

import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Headline } from './rss';
import {
  type GeneratedPost,
  parseEditorialJson,
  pickAuthor,
  slugify,
} from './editorial-prompt';

const EDITOR_SYSTEM = `You are the senior editor at Infocus-IT, a cybersecurity editorial.

You will be given: the source story, and a first-draft editorial that a writer just filed. Your job is to RETURN A TIGHTER, MORE SPECIFIC, LESS AI-SOUNDING VERSION OF THAT DRAFT.

What to do in order:

1. Find and REWRITE every sentence that:
   - Could appear in any generic cybersecurity piece (not specifically about THIS story)
   - Uses filler adjectives: crucial, vital, essential, robust, seamless, holistic, cutting-edge, game-changing, unprecedented, landmark, pivotal
   - Uses "In today's / As the landscape / In recent years / It is important to note / In conclusion / To summarize / This article explores / Let's delve into / Deep dive"
   - Asks a rhetorical question ("But what does this mean for defenders?")
   - Starts with "In", "As", or "With" (except mid-sentence)
   - Is abstract when the source article contains a concrete fact that could be cited instead

2. Tighten prose:
   - Prefer short sentences for emphasis (but vary — three 20-word sentences in a row is monotone)
   - Convert nominalisations to verbs ("detection of" → "detect")
   - Cut every word that doesn't carry weight
   - Active voice unless passive is actually clearer

3. Inject specificity:
   - If the source article names a company, CVE, version, person, group, tool, or date and the draft is vague about it, use the specific name
   - If the draft says "attackers" where the source says "Scattered Spider", swap it

4. Preserve:
   - The writer's thesis and core argument
   - The overall structure (H2 headings)
   - The JSON schema
   - The defender-takeaway ending (no "Conclusion" heading)

5. Word count stays 800-1100. Don't pad to hit a number.

Return STRICT JSON matching the input schema EXACTLY:
{
  "title": "...",
  "excerpt": "...",
  "category": "...",
  "readTime": integer,
  "content": "...",
  "imagePrompt": "..."
}

Do not return commentary. Do not wrap in markdown fences. Just the revised JSON.`;

interface EditorInputs {
  headline: Headline;
  articleBody: string | null;
  draft: Omit<GeneratedPost, 'slug' | 'author'>;
}

function buildEditorUserPrompt(inputs: EditorInputs): string {
  const { headline, articleBody, draft } = inputs;
  const src = articleBody
    ? `ARTICLE BODY (the writer's source of truth):
---
${articleBody}
---`
    : 'ARTICLE BODY: unavailable — use headline + snippet only.';

  return `HEADLINE: ${headline.title}
SOURCE: ${headline.source}
SNIPPET: ${headline.contentSnippet ?? '(none)'}

${src}

FIRST DRAFT (revise this, same JSON schema):
${JSON.stringify(draft, null, 2)}

Return ONLY the revised JSON.`;
}

async function reviseWithGroq(
  inputs: EditorInputs,
): Promise<Omit<GeneratedPost, 'slug' | 'author'>> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY is not set.');
  const client = new Groq({ apiKey });
  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

  const completion = await client.chat.completions.create({
    model,
    // Slightly lower temperature than the draft pass — we want the editor
    // to be disciplined, not inventive.
    temperature: 0.55,
    top_p: 0.9,
    response_format: { type: 'json_object' },
    max_tokens: 4096,
    messages: [
      { role: 'system', content: EDITOR_SYSTEM },
      { role: 'user', content: buildEditorUserPrompt(inputs) },
    ],
  });

  const raw = completion.choices[0]?.message?.content ?? '';
  if (!raw) throw new Error('Groq editor returned empty response.');
  return parseEditorialJson(raw);
}

async function reviseWithGemini(
  inputs: EditorInputs,
): Promise<Omit<GeneratedPost, 'slug' | 'author'>> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set.');
  const genai = new GoogleGenerativeAI(apiKey);
  const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const model = genai.getGenerativeModel({
    model: modelName,
    systemInstruction: EDITOR_SYSTEM,
    generationConfig: {
      temperature: 0.55,
      topP: 0.9,
      responseMimeType: 'application/json',
    },
  });
  const result = await model.generateContent(buildEditorUserPrompt(inputs));
  return parseEditorialJson(result.response.text());
}

/**
 * Run an editor pass on a draft. On any failure, the ORIGINAL draft is
 * returned — a bad revision is worse than no revision.
 *
 *   EDITOR_PROVIDER=groq    (default if GROQ_API_KEY set)
 *   EDITOR_PROVIDER=gemini
 *   EDITOR_PROVIDER=cross   (use Gemini to edit a Groq draft, or vice versa)
 *                           — requested via pipeline, not env alone.
 *
 * @param draftProvider the provider that wrote the draft, for 'cross' mode
 */
export async function editorPass(
  inputs: EditorInputs,
  draftProvider: 'groq' | 'gemini',
): Promise<{
  post: Omit<GeneratedPost, 'slug' | 'author'>;
  revised: boolean;
  editor: 'groq' | 'gemini' | null;
}> {
  const mode = (process.env.EDITOR_PROVIDER || '').toLowerCase();
  // Pick editor: explicit env, else cross (opposite of drafter), else
  // same-as-drafter.
  let editor: 'groq' | 'gemini' | null;
  if (mode === 'groq') editor = 'groq';
  else if (mode === 'gemini') editor = 'gemini';
  else if (mode === 'cross') editor = draftProvider === 'groq' ? 'gemini' : 'groq';
  else editor = draftProvider; // same-LLM (default)

  try {
    const revised =
      editor === 'groq' ? await reviseWithGroq(inputs) : await reviseWithGemini(inputs);
    return { post: revised, revised: true, editor };
  } catch (err) {
    console.warn(
      `[editor] ${editor} editor pass failed: ${(err as Error).message}. Keeping original draft.`,
    );
    return { post: inputs.draft, revised: false, editor: null };
  }
}

export function attachIdentity(
  base: Omit<GeneratedPost, 'slug' | 'author'>,
): GeneratedPost {
  return {
    ...base,
    author: pickAuthor(),
    slug: slugify(base.title) || `post-${Date.now()}`,
  };
}
