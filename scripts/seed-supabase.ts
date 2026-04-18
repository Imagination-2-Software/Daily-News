/**
 * One-shot: push the static seed posts into Supabase.
 * Safe to re-run — upserts on `slug`.
 *
 *   npm run seed
 */

import 'dotenv/config';
import { getSupabaseAdmin } from '../lib/supabase/admin';
import { staticBlogPosts } from '../lib/blog-data';

async function main() {
  const supabase = getSupabaseAdmin();

  const rows = staticBlogPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    author: p.author,
    date: p.date,
    read_time: p.readTime,
    cover_image: p.coverImage,
    content: p.content,
    status: 'published',
  }));

  const { data, error } = await supabase
    .from('posts')
    .upsert(rows, { onConflict: 'slug' })
    .select('slug');

  if (error) {
    console.error('[seed] failed:', error.message);
    process.exit(1);
  }

  console.log(`[seed] ✓ upserted ${data?.length ?? 0} posts.`);
  for (const r of data ?? []) console.log('  -', r.slug);
}

main();
