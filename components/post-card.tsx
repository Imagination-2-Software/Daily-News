'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/blog-data';

const categoryColors = {
  'Security Research': 'bg-blue-100 text-blue-700',
  'Threats': 'bg-red-100 text-red-700',
  'How-To': 'bg-orange-100 text-orange-700',
  'Compliance': 'bg-green-100 text-green-700',
};

export function PostCard({ post }: { post: BlogPost }) {
  const categoryColor = categoryColors[post.category];

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group fade-in overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-100">
        {/* Cover Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-200">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-50" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 p-6">
          {/* Category Badge */}
          <div className="flex items-center gap-3">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${categoryColor}`}>
              {post.category}
            </span>
            <span className="text-xs text-gray-500">{post.readTime} min read</span>
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 text-xl font-playfair font-semibold text-gray-900 transition-colors group-hover:text-orange-500">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="line-clamp-2 text-sm text-gray-600">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
            <span>{post.author}</span>
            <span>{post.date}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
