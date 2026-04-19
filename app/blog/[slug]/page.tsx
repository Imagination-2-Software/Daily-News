import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ReadingProgress } from '@/components/blog/reading-progress';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { NewsletterBlock } from '@/components/blog/newsletter-block';
import { getPost, getAllPosts } from '@/lib/blog-data';
import {
  SITE,
  absoluteUrl,
  articleJsonLd,
  breadcrumbJsonLd,
  canonical,
  graphJsonLd,
} from '@/lib/seo';

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post not found',
      description: 'The editorial you are looking for does not exist.',
      robots: { index: false, follow: false },
    };
  }

  const url = canonical(`/blog/${post.slug}`);
  const ogImage = absoluteUrl(`/og/${post.slug}`);
  const publishedIso = (() => {
    const d = new Date(post.date);
    return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
  })();

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    authors: [{ name: post.author }],
    keywords: [post.category, 'cybersecurity', 'editorial', post.author],
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.excerpt,
      siteName: SITE.name,
      publishedTime: publishedIso,
      modifiedTime: publishedIso,
      authors: [post.author],
      section: post.category,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

function authorInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');
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

  // Decide whether to reserve a TOC column on the server — avoids an empty
  // 14rem gap on short posts. The TOC component applies the same >= 3
  // threshold client-side.
  const headingCount = (post.content.match(/<h[23]\b/gi) || []).length;
  const hasToc = headingCount >= 3;

  // Structured data for search engines + LLMs. Wrapped in a single
  // @graph-rooted object so every JSON-LD block has exactly one top-level
  // entity with @context — browser validators and SEO extensions expect
  // this and throw when they see an array.
  const jsonLd = graphJsonLd([
    articleJsonLd({ post }),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: post.category, path: `/curation#${post.category.toLowerCase().replace(/\s+/g, '-')}` },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ]);

  return (
    <div className="min-h-screen bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <Navbar />

      <main id="main">
        {/* ===========================================================
            ARTICLE HEADER — asymmetrical, inset from right
            =========================================================== */}
        <article className="px-6 pt-12 md:pt-20">
          <div className="mx-auto max-w-5xl md:pr-16">
            <Link
              href="/"
              className="fade-in group mb-8 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-muted transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
              Back to dispatch
            </Link>

            <p className="fade-in label-overline">
              {post.category}
            </p>

            <h1 className="fade-in stagger-1 mt-4 text-[2rem] font-extrabold leading-[1.06] tracking-[-0.035em] text-on-bg md:text-[3.5rem]">
              {post.title}
            </h1>

            <p className="fade-in stagger-2 mt-5 max-w-3xl text-lg leading-relaxed text-on-surface-variant">
              {post.excerpt}
            </p>

            <div className="fade-in stagger-3 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-white">
                  {authorInitials(post.author)}
                </div>
                <div className="text-sm">
                  <p className="font-semibold uppercase tracking-[0.06em] text-on-bg">{post.author}</p>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-on-surface-muted">
                    Editorial desk
                  </p>
                </div>
              </div>
              <span aria-hidden="true" className="hidden h-5 w-px bg-outline-variant md:block" />
              <div className="flex items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {post.readTime} min read
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* ===========================================================
            COVER
            =========================================================== */}
        <section className="px-6 py-12 md:py-16">
          <div className="mx-auto max-w-6xl">
            <figure className="fade-in relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-surface-high shadow-ambient-sm">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(min-width:1024px) 1024px, 100vw"
                className="object-cover"
                priority
              />
            </figure>
          </div>
        </section>

        {/* ===========================================================
            BODY — editorial typography + sticky TOC sidebar at lg+
            =========================================================== */}
        <section className="px-6 pb-16">
          <div
            className={`mx-auto gap-10 lg:gap-16 ${
              hasToc
                ? 'grid max-w-6xl lg:grid-cols-[minmax(0,1fr)_14rem]'
                : 'max-w-3xl'
            }`}
          >
            <div className={`w-full ${hasToc ? 'mx-auto max-w-3xl lg:mx-0' : ''}`}>
            <style>{`
              .editorial-body { font-family: var(--font-sans); }
              .editorial-body > *:first-child { margin-top: 0; }
              .editorial-body h2 {
                font-family: var(--font-sans);
                font-weight: 700;
                font-size: 1.75rem;
                line-height: 1.2;
                letter-spacing: -0.025em;
                margin-top: 2.75rem;
                margin-bottom: 1rem;
                color: var(--on-background);
              }
              .editorial-body h3 {
                font-family: var(--font-sans);
                font-weight: 700;
                font-size: 1.375rem;
                line-height: 1.3;
                letter-spacing: -0.02em;
                margin-top: 2.25rem;
                margin-bottom: 0.625rem;
                color: var(--on-background);
              }
              .editorial-body p {
                font-size: 1.0625rem;
                line-height: 1.75;
                color: var(--on-surface);
                margin-bottom: 1.25rem;
              }
              .editorial-body ul, .editorial-body ol {
                margin: 0 0 1.25rem 0;
                padding-left: 1.5rem;
              }
              .editorial-body ul { list-style: none; }
              .editorial-body ul li {
                position: relative;
                padding-left: 1.25rem;
                font-size: 1.0625rem;
                line-height: 1.75;
                color: var(--on-surface);
                margin-bottom: 0.5rem;
              }
              .editorial-body ul li::before {
                content: '';
                position: absolute;
                left: 0; top: 0.8rem;
                width: 5px; height: 5px;
                border-radius: 2px;
                background: var(--primary);
              }
              .editorial-body ol { list-style: decimal; }
              .editorial-body ol li {
                font-size: 1.0625rem;
                line-height: 1.75;
                color: var(--on-surface);
                margin-bottom: 0.5rem;
              }
              .editorial-body a {
                color: var(--tertiary);
                text-decoration: underline;
                text-decoration-thickness: 1px;
                text-underline-offset: 3px;
                text-decoration-color: color-mix(in srgb, var(--tertiary) 40%, transparent);
                transition: color 150ms ease, text-decoration-color 150ms ease;
              }
              .editorial-body a:hover {
                color: var(--tertiary-hover);
                text-decoration-color: var(--tertiary);
              }
              .editorial-body blockquote {
                margin: 1.75rem 0;
                padding-left: 1.25rem;
                border-left: 3px solid var(--primary);
                font-family: var(--font-serif);
                font-style: italic;
                font-size: 1.25rem;
                font-weight: 500;
                line-height: 1.45;
                color: var(--on-background);
              }
              .editorial-body code {
                font-family: var(--font-mono), monospace;
                font-size: 0.875em;
                background: var(--surface-container);
                padding: 0.15em 0.4em;
                border-radius: 4px;
                color: var(--primary);
                word-break: break-word;
                overflow-wrap: anywhere;
              }
              .editorial-body pre {
                background: var(--surface-container);
                padding: 1rem 1.25rem;
                border-radius: 8px;
                overflow-x: auto;
                margin-bottom: 1.25rem;
                font-size: 0.875rem;
              }
              .editorial-body pre code {
                background: transparent;
                padding: 0;
                color: var(--on-surface);
              }
            `}</style>
            <div
              id="article-body"
              className="editorial-body fade-in"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* EDITORIAL NOTE — replaces the old per-author bio.
                Honest disclosure for AI-assisted editorials. */}
            <aside className="mt-16 rounded-lg bg-surface-container p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                  {authorInitials(post.author)}
                </div>
                <div>
                  <p className="label-overline">About this editorial</p>
                  <p className="mt-1.5 text-xl font-bold uppercase tracking-[-0.015em] text-on-bg">
                    {post.author}
                  </p>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-on-surface-variant">
                    Drafted by Infocus-IT&rsquo;s editorial pipeline from primary sources and
                    reviewed for voice and accuracy. We publish daily, defender-first, with no
                    vendor sponsorship.
                  </p>
                </div>
              </div>
            </aside>

            {/* NEWSLETTER — end-of-article (highest-converting placement) */}
            <div className="mt-12">
              <NewsletterBlock />
            </div>
            </div>

            {/* TOC SIDEBAR — lg+ only, and only when the post has ≥3 headings */}
            {hasToc && (
              <aside className="hidden lg:block">
                <TableOfContents contentSelector="#article-body" />
              </aside>
            )}
          </div>
        </section>

        {/* ===========================================================
            RELATED
            =========================================================== */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-7xl">
            <header className="mb-10 flex items-end justify-between border-b border-outline-variant pb-3">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-bg">
                Continue Reading
              </h2>
              <span className="h-[2px] w-12 bg-primary" aria-hidden="true" />
            </header>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-surface-high">
                    <Image
                      src={r.coverImage}
                      alt={r.title}
                      fill
                      sizes="(min-width:768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-4 label-overline">
                    {r.category} · {r.readTime} min
                  </p>
                  <h4 className="mt-2 text-lg font-bold leading-snug tracking-[-0.02em] text-on-bg transition-colors group-hover:text-primary">
                    {r.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
