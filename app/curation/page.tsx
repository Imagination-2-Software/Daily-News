import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHeader } from '@/components/page-header';
import { getAllPosts } from '@/lib/blog-data';

export const metadata = {
  title: 'Curation | Infocus-IT',
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
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main id="main">

      <PageHeader
        kicker="Curated Collections"
        title="Hand-picked editorials for the"
        accent="discerning analyst."
        subtitle="Thematic selections drawn from our archive — organized by the questions our readers return to most."
      />

      {/* Editor's Pick */}
      <section className="px-6 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <header className="mb-10 flex items-end justify-between">
            <h2 className="accent-bar font-playfair text-2xl font-semibold text-on-bg">
              Editor&rsquo;s Pick
            </h2>
          </header>

          <Link href={`/blog/${featured.slug}`} className="group grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface-high md:aspect-[4/5]">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                sizes="(min-width:768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="label-overline">
                {featured.category} · {featured.readTime} min read
              </p>
              <h3 className="mt-4 font-playfair text-3xl font-semibold leading-[1.1] tracking-tight text-on-bg transition-colors group-hover:text-primary-ink md:text-[2.5rem]">
                {featured.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-on-surface-variant">{featured.excerpt}</p>
              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.24em] text-on-surface-muted">
                By {featured.author} · {featured.date}
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Category sections */}
      {byCategory.map((group, gi) =>
        group.posts.length === 0 ? null : (
          <section key={group.category} className="px-6 py-10">
            <div className="mx-auto max-w-7xl">
              <header className="mb-8 flex items-end justify-between">
                <h2 className="accent-bar font-playfair text-xl font-semibold text-on-bg">
                  <span className="text-gradient-signature">{String(gi + 1).padStart(2, '0')}</span>{' '}
                  <span className="mx-2 text-on-surface-muted">·</span> {group.category}
                </h2>
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-on-surface-muted">
                  {group.posts.length} piece{group.posts.length === 1 ? '' : 's'}
                </span>
              </header>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {group.posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-surface-high">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(min-width:768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <p className="mt-5 label-overline">
                      {post.readTime} min read · {post.date}
                    </p>
                    <h4 className="mt-2 font-playfair text-lg font-semibold leading-snug text-on-bg transition-colors group-hover:text-primary-ink">
                      {post.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ),
      )}

      <div className="h-16" />
      </main>
      <Footer />
    </div>
  );
}
