'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/blog-data';

// Differentiated per-category tone so readers can scan by category colour
// instead of reading every pill. Blue = research (neutral / analytical),
// red = threats (urgent), orange = how-to (practitioner guide),
// green = compliance (policy / safe).
const categoryTone: Record<BlogPost['category'], string> = {
  'Security Research': 'bg-tertiary-container text-tertiary',
  'Threats':           'bg-error/10 text-error',
  'How-To':            'bg-primary-container/15 text-primary',
  'Compliance':        'bg-success/12 text-success',
};

export function PostCard({ post }: { post: BlogPost }) {
  const tone = categoryTone[post.category];

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="fade-in overflow-hidden rounded-2xl bg-surface-lowest shadow-ambient-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-ambient">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-high">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(min-width:768px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent opacity-60"
          />
        </div>

        <div className="flex flex-col gap-3 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${tone}`}
            >
              {post.category}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-on-surface-muted">
              {post.readTime} min read
            </span>
          </div>

          <h3 className="line-clamp-2 font-playfair text-xl font-semibold leading-snug text-on-bg transition-colors group-hover:text-primary-ink">
            {post.title}
          </h3>

          <p className="line-clamp-2 text-sm leading-relaxed text-on-surface-variant">
            {post.excerpt}
          </p>

          <div className="mt-1 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-on-surface-muted">
            <span>{post.author}</span>
            <span>{post.date}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
