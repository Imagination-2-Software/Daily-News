import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog-data';

export const runtime = 'nodejs';
export const revalidate = 300; // Cache for 5 minutes — Cmd+K should feel instant.

/**
 * Lightweight index consumed by the Cmd+K search modal.
 *
 * Returns only the fields the client needs to match + render result rows,
 * not the full post body. A single fetch is cached on the Edge / by the
 * browser for 5 minutes, so opening the modal feels instant.
 */
export async function GET() {
  const posts = await getAllPosts();
  const index = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    author: p.author,
    readTime: p.readTime,
    date: p.date,
  }));
  return NextResponse.json(
    { posts: index },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
      },
    },
  );
}
