'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, User, Clock, ChevronRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-data';

interface TodaysHeadlinesSectionProps {
  initialMain: BlogPost;
  posts: BlogPost[];
}

const OVERLAY_PILL =
  'inline-flex rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-on-bg shadow-ambient-sm';

function formatMeta(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date.toUpperCase();
  return parsed
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .toUpperCase();
}

export function TodaysHeadlinesSection({
  initialMain,
  posts,
}: TodaysHeadlinesSectionProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost>(initialMain);

  const fallbackImage =
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=800&fit=crop';

  const handleSelect = (post: BlogPost, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedPost(post);
    // Smooth scroll slightly if on mobile
    if (window.innerWidth < 768) {
      document.getElementById('todays-headlines')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Divide remaining posts: side list (first 3) + full news grid (all remaining posts)
  const remainingPosts = posts.filter((p) => p.slug !== selectedPost.slug);

  return (
    <section className="px-6 pt-20" id="todays-headlines">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-outline-variant/60 pb-5">
          <h2 className="text-[2rem] font-extrabold tracking-[-0.025em] text-on-bg md:text-[2.5rem]">
            Today&rsquo;s Headlines
          </h2>
          <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-muted">
            All Current Stories &amp; Editorial Dispatches ({posts.length})
          </p>
        </div>

        {/* ===========================================================
            FEATURED NEWS SPOTLIGHT + QUICK HEADLINES LIST
            =========================================================== */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* BIG PROMINENT SELECTED NEWS (7 Cols on desktop) */}
          <article className="lg:col-span-7 flex flex-col">
            {/* Featured news image at top: balanced aspect ratio, clean border radius */}
            <div className="group relative block aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface-container shadow-sm border border-outline-variant/40">
              <Image
                src={selectedPost.coverImage || fallbackImage}
                alt={selectedPost.title}
                fill
                sizes="(min-width:1024px) 55vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                priority
              />
              <span className={`absolute left-5 top-5 ${OVERLAY_PILL}`}>
                {selectedPost.category}
              </span>
            </div>

            {/* Metadata below image */}
            <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-muted">
              <span>{formatMeta(selectedPost.date)}</span>
              <span>/</span>
              <span>
                POST BY <strong className="text-on-bg font-bold">{(selectedPost.author || 'Infocus-IT Team').toUpperCase()}</strong>
              </span>
              {selectedPost.readTime && (
                <>
                  <span>·</span>
                  <span>{selectedPost.readTime} MIN READ</span>
                </>
              )}
            </div>

            {/* Headline directly below metadata */}
            <h3 className="mt-3 text-[1.75rem] font-extrabold leading-[1.18] tracking-[-0.025em] text-on-bg">
              <Link
                href={`/blog/${selectedPost.slug}`}
                className="transition-colors hover:text-primary"
              >
                {selectedPost.title}
              </Link>
            </h3>

            {/* Short description / summary */}
            {selectedPost.excerpt && (
              <p className="mt-3 text-[15px] leading-relaxed text-on-surface-variant line-clamp-3">
                {selectedPost.excerpt}
              </p>
            )}

            {/* Direct read button */}
            <div className="mt-5 flex items-center gap-4">
              <Link
                href={`/blog/${selectedPost.slug}`}
                className="cta-primary inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-wider"
              >
                Read Full Article
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </article>

          {/* SIDE LIST: HEADLINES SELECTOR (5 Cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-muted">
                Select Headline to Preview
              </span>
              <span className="text-[10px] text-primary font-semibold">Live updating</span>
            </div>

            {posts.slice(0, 4).map((post) => {
              const isSelected = post.slug === selectedPost.slug;
              return (
                <div
                  key={post.slug}
                  onClick={(e) => handleSelect(post, e)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedPost(post);
                    }
                  }}
                  className={`group flex items-stretch gap-4 rounded-xl border p-3.5 transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-ambient-sm ring-1 ring-primary/20'
                      : 'border-outline-variant bg-surface-lowest hover:border-primary/40 hover:shadow-ambient-sm'
                  }`}
                  title="Click to display in featured highlight"
                >
                  <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-lg bg-surface-container">
                    <Image
                      src={post.coverImage || fallbackImage}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                    <span className={`absolute left-1.5 top-1.5 ${OVERLAY_PILL} px-1.5 py-0.5 text-[8px]`}>
                      {post.category}
                    </span>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-muted">
                      {formatMeta(post.date)} {post.readTime ? `· ${post.readTime}m` : ''}
                    </p>
                    <h4 className="mt-1 line-clamp-2 text-[15px] font-bold leading-snug tracking-[-0.015em] text-on-bg transition-colors group-hover:text-primary">
                      {post.title}
                    </h4>
                    <p className="mt-1 line-clamp-1 text-[12px] text-on-surface-variant">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===========================================================
            COMPLETE ALL-NEWS ARTICLES GRID
            =========================================================== */}
        <div className="mt-16 pt-12 border-t border-outline-variant/60">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold tracking-tight text-on-bg md:text-2xl">
              All News Reports &amp; Intelligence Dispatches
            </h3>
            <span className="text-xs text-on-surface-muted font-medium">
              Click any report to view or open
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const isSelected = post.slug === selectedPost.slug;
              return (
                <article
                  key={post.slug}
                  className={`group flex flex-col rounded-2xl border p-4 transition-all duration-300 ${
                    isSelected
                      ? 'border-primary bg-primary/[0.03] shadow-md ring-1 ring-primary/30'
                      : 'border-outline-variant bg-surface-lowest hover:border-primary/40 hover:shadow-ambient-sm'
                  }`}
                >
                  {/* News image */}
                  <div
                    onClick={(e) => handleSelect(post, e)}
                    className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-surface-container cursor-pointer"
                  >
                    <Image
                      src={post.coverImage || fallbackImage}
                      alt={post.title}
                      fill
                      sizes="(min-width:1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className={`absolute left-3 top-3 ${OVERLAY_PILL}`}>
                      {post.category}
                    </span>
                    {isSelected && (
                      <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow">
                        Highlighted
                      </span>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="mt-4 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.16em] text-on-surface-muted">
                    <span>{formatMeta(post.date)}</span>
                    <span>{post.readTime ? `${post.readTime} MIN READ` : post.category}</span>
                  </div>

                  {/* Headline */}
                  <h4 className="mt-2 text-lg font-bold leading-snug tracking-[-0.02em] text-on-bg transition-colors group-hover:text-primary">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h4>

                  {/* Short Summary */}
                  <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-on-surface-variant flex-1">
                    {post.excerpt}
                  </p>

                  {/* Actions */}
                  <div className="mt-5 pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs font-semibold">
                    <button
                      type="button"
                      onClick={(e) => handleSelect(post, e)}
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      {isSelected ? 'Currently in Highlight' : 'Set as Highlight'}
                    </button>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-on-surface-muted hover:text-on-bg flex items-center gap-1"
                    >
                      Full Story
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
