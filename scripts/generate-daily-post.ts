/**
 * Daily blog post generator.
 *
 * Pipeline:
 *   1. Fetch trending cybersec headlines via RSS
 *   2. Pick one that isn't already in our posts table (by source_url or near-duplicate title)
 *   3. Gemini Flash → write the editorial (JSON)
 *   4. Pollinations → generate cover image → upload to Supabase Storage
 *   5. Insert into posts + log automation_run
 *   6. Ping /api/revalidate so the live site picks it up
 *
 * Run locally: npm run generate
 * Run in CI:   GitHub Actions cron (see .github/workflows/daily-blog.yml)
 */

import 'dotenv/config';
import { getSupabaseAdmin } from '../lib/supabase/admin';
import { fetchTrendingHeadlines, type Headline } from './lib/rss';
import { generateEditorial } from './lib/gemini';
import { generateAndUploadCover } from './lib/cover';

type Trigger = 'cron' | 'manual';

function formatDate(d = new Date()): string {
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

async function pickFreshHeadline(
  headlines: Headline[],
): Promise<Headline | null> {
  const supabase = getSupabaseAdmin();
  const { data: existing } = await supabase
    .from('posts')
    .select('source_url, title')
    .order('created_at', { ascending: false })
    .limit(100);

  const seenUrls = new Set((existing ?? []).map((r) => r.source_url).filter(Boolean));
  const seenTitles = new Set((existing ?? []).map((r) => r.title.toLowerCase()));

  for (const h of headlines) {
    if (seenUrls.has(h.link)) continue;
    if (seenTitles.has(h.title.toLowerCase())) continue;
    return h;
  }
  return null;
}

async function run(trigger: Trigger = 'cron') {
  const supabase = getSupabaseAdmin();

  const { data: runInsert, error: runErr } = await supabase
    .from('automation_runs')
    .insert({ status: 'running', trigger })
    .select('id')
    .single();
  if (runErr || !runInsert) {
    throw new Error(`Failed to start automation_run: ${runErr?.message}`);
  }
  const runId = runInsert.id as string;

  const logs: Record<string, unknown> = {};

  try {
    console.log('[pipeline] fetching trending headlines...');
    const headlines = await fetchTrendingHeadlines(25);
    logs.headlinesFetched = headlines.length;
    if (headlines.length === 0) throw new Error('No headlines returned from RSS feeds.');

    const picked = await pickFreshHeadline(headlines);
    if (!picked) throw new Error('No fresh headline found (all already covered).');
    logs.pickedHeadline = picked.title;
    logs.pickedSource = picked.source;
    console.log(`[pipeline] picked: "${picked.title}" (${picked.source})`);

    console.log('[pipeline] generating editorial...');
    const editorial = await generateEditorial(picked);
    logs.editorialTitle = editorial.title;
    logs.editorialCategory = editorial.category;

    console.log('[pipeline] generating cover image...');
    const coverUrl = await generateAndUploadCover(editorial.imagePrompt, editorial.slug);
    logs.coverUrl = coverUrl;

    console.log('[pipeline] inserting post...');
    const { data: inserted, error: insertErr } = await supabase
      .from('posts')
      .insert({
        slug: editorial.slug,
        title: editorial.title,
        excerpt: editorial.excerpt,
        category: editorial.category,
        author: editorial.author,
        date: formatDate(),
        read_time: editorial.readTime,
        cover_image: coverUrl,
        content: editorial.content,
        status: 'published',
        source_url: picked.link,
      })
      .select('id, slug')
      .single();
    if (insertErr || !inserted) throw new Error(`Post insert failed: ${insertErr?.message}`);

    await supabase
      .from('automation_runs')
      .update({
        status: 'success',
        finished_at: new Date().toISOString(),
        post_id: inserted.id,
        source_url: picked.link,
        topic: editorial.title,
        logs,
      })
      .eq('id', runId);

    console.log(`[pipeline] ✓ published /blog/${inserted.slug}`);

    const siteUrl = process.env.SITE_URL;
    const secret = process.env.REVALIDATE_SECRET;
    if (siteUrl && secret) {
      try {
        const r = await fetch(`${siteUrl}/api/revalidate?secret=${encodeURIComponent(secret)}`, {
          method: 'POST',
        });
        console.log(`[pipeline] revalidate → ${r.status}`);
      } catch (err) {
        console.warn('[pipeline] revalidate ping failed:', (err as Error).message);
      }
    }
  } catch (err) {
    const message = (err as Error).message;
    console.error('[pipeline] FAILED:', message);
    await supabase
      .from('automation_runs')
      .update({
        status: 'failed',
        finished_at: new Date().toISOString(),
        error: message,
        logs,
      })
      .eq('id', runId);
    process.exitCode = 1;
  }
}

const trigger: Trigger = process.argv.includes('--manual') ? 'manual' : 'cron';
run(trigger);
