import Link from 'next/link';
import { getAllPosts } from '@/lib/blog-data';

export const revalidate = 30;

export default async function AdminPostsPage() {
  const blogPosts = await getAllPosts();
  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
            Library
          </p>
          <h1 className="mt-2 font-playfair text-4xl font-bold tracking-tight text-gray-900">
            All Posts.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            {blogPosts.length} editorial{blogPosts.length === 1 ? '' : 's'} in the catalog.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="rounded-sm bg-orange-700 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:bg-orange-800"
        >
          + New Post
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg bg-white ring-1 ring-gray-100">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f0ece4] text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-700">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Author</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {blogPosts.map((post) => (
              <tr key={post.slug} className="transition-colors hover:bg-[#faf8f4]">
                <td className="px-5 py-4">
                  <p className="font-playfair text-base font-semibold text-gray-900">
                    {post.title}
                  </p>
                  <p className="mt-1 line-clamp-1 text-xs text-gray-500">{post.excerpt}</p>
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-sm bg-orange-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange-700">
                    {post.category}
                  </span>
                </td>
                <td className="px-5 py-4 text-xs text-gray-700">{post.author}</td>
                <td className="px-5 py-4 text-xs text-gray-500">{post.date}</td>
                <td className="px-5 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-orange-600"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/posts/${post.slug}`}
                      className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-600 transition-colors hover:text-orange-800"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
