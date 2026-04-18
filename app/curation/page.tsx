import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHeader } from '@/components/page-header';
import { getAllPosts } from '@/lib/blog-data';

export const metadata = {
  title: 'Curation | InFocusIT',
  description: 'Hand-picked cybersecurity editorials, curated for the security analyst.',
};

export const revalidate = 300;

const categories = ['Security Research', 'Threats', 'How-To', 'Compliance'] as const;

export default async function CurationPage() {
  const blogPosts = await getAllPosts();
  const featured = blogPosts[1] ?? blogPosts[0];
  const byCategory = categories.map((c) => ({
    category: c,
    posts: blogPosts.filter((p) => p.category === c),
  }));

  return (
    <div className="min-h-screen bg-[#faf8f4]">
      <Navbar />

      <PageHeader
        kicker="Curated Collections"
        title="Hand-picked editorials for the"
        accent="discerning analyst."
        subtitle="Thematic selections drawn from our archive — organized by the questions our readers return to most."
      />

      {/* Editor's Pick */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between border-b border-gray-300 pb-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
              Editor&rsquo;s Pick
            </h2>
            <span className="h-[2px] w-16 bg-orange-600" />
          </div>

          <Link href={`/blog/${featured.slug}`} className="group grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative h-72 w-full overflow-hidden rounded-lg bg-gray-900 md:h-96">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-600">
                {featured.category} · {featured.readTime} min read
              </p>
              <h3 className="font-playfair text-3xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-orange-600 md:text-4xl">
                {featured.title}.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-gray-600">{featured.excerpt}</p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {featured.author} · {featured.date}
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Category sections */}
      {byCategory.map((group, gi) =>
        group.posts.length === 0 ? null : (
          <section key={group.category} className="px-6 py-8">
            <div className="mx-auto max-w-6xl">
              <div className="mb-6 flex items-center justify-between border-b border-gray-300 pb-3">
                <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
                  {String(gi + 1).padStart(2, '0')} · {group.category}
                </h2>
                <span className="h-[2px] w-16 bg-orange-600" />
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {group.posts.map((post) => (
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
                      {post.readTime} min read · {post.date}
                    </p>
                    <h4 className="mt-2 font-playfair text-lg font-semibold leading-snug text-gray-900 transition-colors group-hover:text-orange-600">
                      {post.title}.
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ),
      )}

      <div className="h-16" />
      <Footer />
    </div>
  );
}
