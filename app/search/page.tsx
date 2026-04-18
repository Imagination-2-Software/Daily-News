import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHeader } from '@/components/page-header';
import { getAllPosts } from '@/lib/blog-data';

export const revalidate = 60;

export const metadata = {
  title: 'Search | InFocusIT',
  description: 'Search editorials, authors, and topics across the InFocusIT journal.',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;
  const query = q.trim();
  const posts = await getAllPosts();

  const results = query
    ? posts.filter((p) => {
        const haystack = `${p.title} ${p.excerpt} ${p.category} ${p.author}`.toLowerCase();
        return haystack.includes(query.toLowerCase());
      })
    : [];

  return (
    <div className="min-h-screen bg-[#faf8f4]">
      <Navbar />

      <PageHeader
        kicker={query ? `Results for "${query}"` : 'Search'}
        title={query ? `${results.length} editorial${results.length === 1 ? '' : 's'}` : 'Find editorials by'}
        accent={query ? 'in the archive.' : 'title, author, or topic.'}
        subtitle={
          query
            ? undefined
            : 'Use the search icon in the navbar. Queries match titles, excerpts, authors, and categories.'
        }
      />

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          {query && results.length === 0 ? (
            <div className="rounded-lg bg-[#f0ece4] p-10 text-center">
              <p className="font-playfair text-xl font-semibold text-gray-900">
                Nothing matched your query.
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Try a broader term, or browse{' '}
                <Link href="/archives" className="text-orange-600 underline">
                  the full archive
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {results.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-900">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-600">
                    {post.category} · {post.readTime} min read
                  </p>
                  <h3 className="mt-2 font-playfair text-lg font-semibold leading-snug text-gray-900 transition-colors group-hover:text-orange-600">
                    {post.title}.
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
