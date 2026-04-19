import { getSupabaseAdmin } from '@/lib/supabase/admin';
import { generateCoverWithGemini } from './image-gemini';

const BUCKET = 'covers';

/**
 * House style for Infocus-IT cover images. Applied to every provider so
 * the archive reads like one magazine instead of a stock-photo pile.
 *
 * Rules encoded:
 *   1) Palette — desaturated charcoal + muted amber only. No neon.
 *   2) Subject — physical / architectural. No UI screenshots, hooded
 *      silhouettes, or "cyber" tropes.
 *   3) Composition — cinematic wide, shallow DOF, strong negative space
 *      top-right so a headline can overlay.
 *   4) Film look — 35mm grain, subtle vignette. No HDR.
 */
const HOUSE_STYLE = [
  'shot on 35mm cinema camera, anamorphic lens, shallow depth of field',
  'muted colour palette, desaturated charcoal and bone, occasional dim amber accent, cool shadow tones, no saturated blues, no neon',
  'editorial documentary photography, quiet intensity, overcast ambient light, no dramatic hero lighting',
  'wide cinematic framing, 16:10 aspect, strong negative space top-right for overlay text',
  'no text, no logos, no watermarks, no code on screens, no UI mockups, no hooded figures, no brain diagrams, no cliché "cyber" neon circuitry, no lock icons, no binary rain',
  'subtle 35mm grain, natural vignette, photorealistic, printed-magazine colour grading',
].join(', ');

function scrubPrompt(raw: string): string {
  const banned = [
    /\b(neon|cyberpunk|futuristic|sci-?fi|glowing|holographic|pixel(ated)?|glitch)\b/gi,
    /\b(bright|vivid|saturated|vibrant|colourful|colorful|high[- ]contrast)\b/gi,
    /\b(hoodie|hooded|hacker silhouette|anonymous mask)\b/gi,
    /\b(code on screen|terminal window|matrix rain|binary code)\b/gi,
    /\b(lock icon|padlock|shield icon)\b/gi,
  ];
  let out = raw;
  for (const rx of banned) out = out.replace(rx, '');
  return out.replace(/\s{2,}/g, ' ').trim();
}

/**
 * Curated Unsplash queries for Compliance topics. The LLM's imagePrompt
 * often leaks "data" or "security" words which, when searched on Unsplash,
 * return data-center and cable-closet photos — wrong for a GRC/privacy
 * piece. We override with terms that reliably match editorial governance
 * imagery (boardrooms, binders, contracts).
 */
const COMPLIANCE_UNSPLASH_QUERIES = [
  'empty boardroom conference table',
  'business documents on desk',
  'office binders filing cabinet',
  'signing contract pen paper',
  'corporate meeting room empty chairs',
  'financial district skyscraper dusk',
  'law firm library bookshelves',
  'paperwork folders stacked desk',
];

function unsplashQueryFor(subject: string, category?: string): string {
  if (category === 'Compliance') {
    return COMPLIANCE_UNSPLASH_QUERIES[
      Math.floor(Math.random() * COMPLIANCE_UNSPLASH_QUERIES.length)
    ];
  }
  return subject;
}

/**
 * Fallback 1: Unsplash editorial photography.
 *
 * Preferred over Pollinations for any topic where a real photo beats
 * generated art — especially governance/compliance/boardroom scenes where
 * Pollinations defaults to generic "tech" imagery. Returns null (not
 * throws) so the caller can chain to the next fallback.
 *
 * Requires UNSPLASH_ACCESS_KEY. Free demo tier (50 req/hour) is plenty
 * for a once-a-day pipeline.
 */
async function generateWithUnsplash(subject: string): Promise<Buffer | null> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return null;

  const searchUrl =
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(subject)}` +
    `&orientation=landscape&per_page=10&content_filter=high`;

  try {
    const res = await fetch(searchUrl, {
      headers: { Authorization: `Client-ID ${key}` },
    });
    if (!res.ok) {
      console.warn(`[cover] Unsplash search failed: ${res.status}`);
      return null;
    }
    const data = (await res.json()) as {
      results?: Array<{
        urls: { regular: string; full: string };
        links?: { download_location?: string };
      }>;
    };
    const results = data.results ?? [];
    if (results.length === 0) return null;

    // Pick randomly from the top 5 so the archive doesn't repeat the same
    // shot when similar topics come up.
    const pick = results[Math.floor(Math.random() * Math.min(results.length, 5))];

    // Unsplash API terms require a ping to download_location when we
    // actually use the image. Fire-and-forget; never block the pipeline.
    if (pick.links?.download_location) {
      fetch(`${pick.links.download_location}&client_id=${key}`).catch(() => {});
    }

    const imgRes = await fetch(pick.urls.regular);
    if (!imgRes.ok) return null;
    return Buffer.from(await imgRes.arrayBuffer());
  } catch (err) {
    console.warn(`[cover] Unsplash error: ${(err as Error).message}`);
    return null;
  }
}

/** Fallback 2: call Pollinations. Last resort when nothing else works. */
async function generateWithPollinations(fullPrompt: string): Promise<Buffer> {
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    fullPrompt,
  )}?width=1280&height=800&nologo=true&model=flux&seed=${Math.floor(Math.random() * 1_000_000)}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Pollinations failed: ${res.status} ${res.statusText}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

export async function generateAndUploadCover(
  prompt: string,
  slug: string,
  category?: string,
): Promise<string> {
  const subject = scrubPrompt(prompt) || 'quiet architectural scene';
  const fullPrompt = `${subject}. ${HOUSE_STYLE}`;

  // Provider chain:
  //   Gemini 2.5 Flash Image (generated, on-brand house style)
  //   → Unsplash (real editorial photography, searched by subject)
  //   → Pollinations (last-resort generated image)
  //
  // IMAGE_PROVIDER env var can force a specific starting point:
  //   'pollinations' — skip Gemini and Unsplash
  //   'unsplash'     — skip Gemini, start at Unsplash
  let buffer: Buffer | null = null;
  let source: 'gemini' | 'unsplash' | 'pollinations' = 'gemini';

  const forced = process.env.IMAGE_PROVIDER;

  if (forced !== 'pollinations' && forced !== 'unsplash') {
    buffer = await generateCoverWithGemini(fullPrompt);
  }
  if (!buffer && forced !== 'pollinations') {
    // Unsplash searches on a category-aware query. For Compliance topics
    // the LLM's subject often leaks "data/security" terms that return
    // data-center photos, so we override with a curated boardroom pool.
    const candidate = await generateWithUnsplash(unsplashQueryFor(subject, category));
    if (candidate) {
      buffer = candidate;
      source = 'unsplash';
    }
  }
  if (!buffer) {
    source = 'pollinations';
    buffer = await generateWithPollinations(fullPrompt);
  }

  const supabase = getSupabaseAdmin();
  const path = `${slug}-${Date.now()}.jpg`;

  const { error: uploadErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, {
      contentType: 'image/jpeg',
      cacheControl: '31536000',
      upsert: false,
    });
  if (uploadErr) throw new Error(`Supabase upload failed: ${uploadErr.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  console.log(`[cover] uploaded via ${source}: ${data.publicUrl}`);
  return data.publicUrl;
}
