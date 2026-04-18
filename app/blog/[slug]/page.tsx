import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { getPost, getAllPosts } from '@/lib/blog-data';

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The editorial you are looking for does not exist.',
    };
  }

  return {
    title: `${post.title} | InFocusIT`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const allPosts = await getAllPosts();
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#faf8f4]">
      <Navbar />

      {/* Article header */}
      <article className="px-6 pt-12 md:pt-16">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="fade-in mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 transition-colors hover:text-orange-600"
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Insights
          </Link>

          <p className="fade-in mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
            {post.category}
          </p>
          <h1 className="fade-in stagger-1 font-playfair text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 md:text-6xl">
            {post.title}.
          </h1>
          <p className="fade-in stagger-2 mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            {post.excerpt}
          </p>

          <div className="fade-in stagger-3 mt-10 flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-xs font-bold text-white">
              {post.author
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')}
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                {post.author}
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
                {post.readTime} min read · {post.date}
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Cover image */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="fade-in relative h-72 w-full overflow-hidden rounded-lg bg-gray-900 md:h-[480px]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          <style>{`
            .editorial-body h2 {
              font-family: var(--font-playfair), serif;
              font-weight: 700;
              font-size: 2rem;
              line-height: 1.2;
              margin-top: 3rem;
              margin-bottom: 1rem;
              color: #1c1b1b;
              letter-spacing: -0.01em;
            }
            .editorial-body h3 {
              font-family: var(--font-playfair), serif;
              font-weight: 600;
              font-size: 1.5rem;
              line-height: 1.3;
              margin-top: 2rem;
              margin-bottom: 0.75rem;
              color: #1c1b1b;
            }
            .editorial-body p {
              font-size: 1.0625rem;
              line-height: 1.75;
              color: #3f3f46;
              margin-bottom: 1.25rem;
            }
            .editorial-body ul {
              margin-bottom: 1.25rem;
              padding-left: 1.5rem;
              list-style: disc;
            }
            .editorial-body li {
              font-size: 1.0625rem;
              line-height: 1.75;
              color: #3f3f46;
              margin-bottom: 0.5rem;
            }
            .editorial-body a { color: #c2410c; text-decoration: underline; }
          `}</style>
          <div
            className="editorial-body fade-in"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author card */}
          <div className="mt-16 rounded-lg bg-[#f0ece4] p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-600">
              About the Author
            </p>
            <p className="mt-3 font-playfair text-2xl font-semibold text-gray-900">
              {post.author}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {post.author} contributes in-depth cybersecurity analysis on emerging threats,
              security research, and defense architecture for the InFocusIT editorial team.
            </p>
          </div>
        </div>
      </section>

      {/* Related reading */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between border-b border-gray-300 pb-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
              Continue Reading
            </h3>
            <span className="h-[2px] w-16 bg-orange-600" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-900">
                  <Image
                    src={r.coverImage}
                    alt={r.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-600">
                  {r.category}
                </p>
                <h4 className="mt-2 font-playfair text-lg font-semibold leading-snug text-gray-900 transition-colors group-hover:text-orange-600">
                  {r.title}.
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
