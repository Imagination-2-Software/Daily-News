import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost } from '@/lib/blog-data';

const categories = ['Security Research', 'Threats', 'How-To', 'Compliance'];

export const dynamic = 'force-dynamic';

export default async function AdminEditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
            Edit
          </p>
          <h1 className="mt-2 font-playfair text-4xl font-bold tracking-tight text-gray-900">
            {post.title}.
          </h1>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            {post.category} · {post.author} · {post.date}
          </p>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="rounded-sm border border-gray-300 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700 transition-colors hover:border-orange-600 hover:text-orange-600"
        >
          View Live
        </Link>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
              Title
            </label>
            <input
              type="text"
              defaultValue={post.title}
              className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
              Slug
            </label>
            <input
              type="text"
              defaultValue={post.slug}
              className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
              Category
            </label>
            <select
              defaultValue={post.category}
              className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
              Author
            </label>
            <input
              type="text"
              defaultValue={post.author}
              className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
              Read Time (min)
            </label>
            <input
              type="number"
              defaultValue={post.readTime}
              className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
            Excerpt
          </label>
          <textarea
            rows={2}
            defaultValue={post.excerpt}
            className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
            Cover Image URL
          </label>
          <input
            type="text"
            defaultValue={post.coverImage}
            className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
            Body (HTML)
          </label>
          <textarea
            rows={18}
            defaultValue={post.content}
            className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2 font-mono text-xs focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            className="rounded-sm border border-red-200 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-red-600 transition-colors hover:border-red-600 hover:bg-red-50"
          >
            Retire Post
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-sm border border-gray-300 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700 transition-colors hover:border-orange-600 hover:text-orange-600"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="rounded-sm bg-orange-700 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:bg-orange-800"
            >
              Update Live
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
