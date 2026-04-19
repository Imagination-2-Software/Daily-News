import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import { formatToday, requireAdmin, validatePostInput } from '@/lib/admin-api';
import { isSupabaseConfigured } from '@/lib/supabase/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  if (!isSupabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: 'Supabase is not configured on this server.' },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const v = validatePostInput(body);
  if (!v.ok) return NextResponse.json({ error: v.error }, { status: 400 });

  const supabase = getSupabaseAdmin();

  // Reject duplicate slug up-front for a clearer error than the DB unique-violation.
  const { data: existing } = await supabase
    .from('posts')
    .select('id')
    .eq('slug', v.data.slug)
    .maybeSingle();
  if (existing) {
    return NextResponse.json(
      { error: `A post with slug "${v.data.slug}" already exists` },
      { status: 409 },
    );
  }

  const { data: inserted, error } = await supabase
    .from('posts')
    .insert({
      slug: v.data.slug,
      title: v.data.title,
      excerpt: v.data.excerpt,
      category: v.data.category,
      author: v.data.author,
      date: formatToday(),
      read_time: v.data.readTime,
      cover_image: v.data.coverImage,
      content: v.data.content,
      status: v.data.status,
    })
    .select('id, slug')
    .single();

  if (error || !inserted) {
    return NextResponse.json(
      { error: error?.message ?? 'Insert failed' },
      { status: 500 },
    );
  }

  // Best-effort cache revalidation
  await tryRevalidate();

  return NextResponse.json({ ok: true, id: inserted.id, slug: inserted.slug });
}

async function tryRevalidate(): Promise<void> {
  const siteUrl = process.env.SITE_URL;
  const secret = process.env.REVALIDATE_SECRET;
  if (!siteUrl || !secret) return;
  try {
    await fetch(`${siteUrl}/api/revalidate?secret=${encodeURIComponent(secret)}`, {
      method: 'POST',
    });
  } catch {
    // Revalidation is best-effort; ignore failures.
  }
}
