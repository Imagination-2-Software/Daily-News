import Link from 'next/link';
import { getAllPosts } from '@/lib/blog-data';

export const revalidate = 30;

export default async function AdminOverviewPage() {
  const blogPosts = await getAllPosts();
  const total = blogPosts.length;
  const categories = new Set(blogPosts.map((p) => p.category)).size;
  const authors = new Set(blogPosts.map((p) => p.author)).size;
  const latest = blogPosts[0];

  const stats = [
    { label: 'Published Editorials', value: total },
    { label: 'Active Categories', value: categories },
    { label: 'Contributing Authors', value: authors },
    { label: 'Scheduled Posts', value: 0 },
  ];

  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
          Overview
        </p>
        <h1 className="mt-2 font-playfair text-4xl font-bold tracking-tight text-gray-900">
          Editorial Control Room.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
          Manage editorial output, configure publication automation, and review what the journal
          has shipped this week.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg bg-[#f0ece4] p-6">
            <p className="font-playfair text-4xl font-bold text-orange-600">
              {String(s.value).padStart(2, '0')}
            </p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Link
          href="/admin/posts/new"
          className="group rounded-lg border-2 border-orange-600 p-6 transition-colors hover:bg-orange-50"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-600">
            Quick Action
          </p>
          <h3 className="mt-2 font-playfair text-xl font-semibold text-gray-900 group-hover:text-orange-700">
            Draft a new editorial.
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Start from a blank canvas or hand off to automation to generate the first draft.
          </p>
        </Link>

        <Link
          href="/admin/automation"
          className="group rounded-lg bg-[#f0ece4] p-6 transition-colors hover:bg-[#e8e3d7]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-600">
            Automation
          </p>
          <h3 className="mt-2 font-playfair text-xl font-semibold text-gray-900">
            Configure the daily pipeline.
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Set schedules, sources, and prompts that power auto-generated editorials.
          </p>
        </Link>

        <Link
          href="/admin/posts"
          className="group rounded-lg bg-[#f0ece4] p-6 transition-colors hover:bg-[#e8e3d7]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-600">
            Library
          </p>
          <h3 className="mt-2 font-playfair text-xl font-semibold text-gray-900">
            Browse all posts.
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Review, edit, or retire any editorial in the catalog.
          </p>
        </Link>
      </div>

      <div>
        <div className="mb-6 flex items-center justify-between border-b border-gray-300 pb-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
            Latest Editorial
          </h2>
          <span className="h-[2px] w-16 bg-orange-600" />
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-600">
            {latest.category} · {latest.date}
          </p>
          <h3 className="mt-2 font-playfair text-2xl font-semibold text-gray-900">
            {latest.title}.
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">{latest.excerpt}</p>
          <div className="mt-5 flex items-center gap-3">
            <Link
              href={`/blog/${latest.slug}`}
              className="rounded-sm bg-orange-700 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:bg-orange-800"
            >
              View Live
            </Link>
            <Link
              href={`/admin/posts/${latest.slug}`}
              className="rounded-sm border border-gray-300 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700 transition-colors hover:border-orange-600 hover:text-orange-600"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
