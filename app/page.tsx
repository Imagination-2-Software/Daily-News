import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { getAllPosts } from '@/lib/blog-data';

export const revalidate = 300;

export default async function Home() {
  const allPosts = await getAllPosts();
  const featuredPost = allPosts[0];
  const mustRead = allPosts.slice(1, 4);
  const secondaryPosts = allPosts.slice(4, 6);

  return (
    <div className="min-h-screen bg-[#faf8f4]">
      <Navbar />

      {/* Headline */}
      <section className="px-6 pt-12 md:pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="fade-in mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
            Latest Editorial Feed
          </p>
          <h1 className="fade-in stagger-1 font-playfair text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 md:text-6xl">
            Intelligence on the <span className="italic text-orange-600">Cyber Frontier</span>
            <br />
            through deep-form analysis.
          </h1>
        </div>
      </section>

      {/* Featured + Sidebar */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Featured post */}
          <div className="lg:col-span-2">
            <Link href={`/blog/${featuredPost.slug}`} className="group block fade-in">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-900 md:h-[420px]">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="mt-6 flex items-center gap-3 text-xs">
                <span className="rounded-sm bg-orange-100 px-2.5 py-1 font-semibold uppercase tracking-wider text-orange-700">
                  {featuredPost.category}
                </span>
                <span className="text-gray-500">
                  {featuredPost.readTime} MIN READ · {featuredPost.date.toUpperCase()}
                </span>
              </div>
              <h2 className="mt-4 font-playfair text-3xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-orange-600 md:text-4xl">
                {featuredPost.title}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-600">
                {featuredPost.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-xs font-bold text-white">
                  {featuredPost.author
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {featuredPost.author.toUpperCase()}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Lead Analyst, InFocusIT
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 fade-in stagger-2">
            <div>
              <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-2">
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
                  Must Read
                </h3>
                <span className="h-[2px] w-16 bg-orange-600" />
              </div>
              <ul className="space-y-5">
                {mustRead.map((post, i) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="group block">
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-orange-600">
                        {String(i + 1).padStart(2, '0')} · {post.category}
                      </p>
                      <p className="font-playfair text-lg font-semibold leading-snug text-gray-900 transition-colors group-hover:text-orange-600">
                        {post.title}.
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="relative overflow-hidden rounded-lg bg-orange-700 p-6 text-white">
              <div className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-orange-600/40 blur-2xl" />
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-200">
                The Weekly Brief
              </p>
              <p className="mb-4 font-playfair text-xl font-semibold leading-snug">
                Deep-dive editorials
                <br />
                delivered to your inbox.
              </p>
              <form className="relative space-y-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-sm bg-orange-800/60 px-3 py-2 text-sm text-white placeholder:text-orange-200/80 focus:outline-none focus:ring-2 focus:ring-white/40"
                />
                <button
                  type="submit"
                  className="w-full rounded-sm bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-orange-700 transition-colors hover:bg-orange-50"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </aside>
        </div>
      </section>

      {/* Secondary posts + pull quote */}
      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {secondaryPosts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group fade-in block"
              style={{ animationDelay: `${(i + 3) * 100}ms` }}
            >
              <div className="relative h-56 w-full overflow-hidden rounded-lg bg-gray-900">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-600">
                {post.category}
              </p>
              <h3 className="mt-2 font-playfair text-xl font-semibold leading-snug text-gray-900 transition-colors group-hover:text-orange-600">
                {post.title}.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
            </Link>
          ))}

          {/* Pull quote card */}
          <div className="fade-in stagger-4 flex items-center rounded-lg bg-[#f0ece4] p-8">
            <blockquote className="border-l-2 border-orange-600 pl-6">
              <p className="font-playfair text-xl italic leading-snug text-gray-800">
                &ldquo;Security is not just what it looks like and feels like. Security is how it
                functions in the silence.&rdquo;
              </p>
              <footer className="mt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
                — The InFocusIT Manifesto
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Archive Project banner */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl rounded-lg border-2 border-orange-600 p-6 md:p-10">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
                Special Series
              </p>
              <h3 className="mb-4 font-playfair text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                THE ARCHIVE PROJECT
              </h3>
              <p className="mb-6 max-w-md text-sm leading-relaxed text-gray-600">
                Access our legacy collection of cybersecurity research from 2004 to 2024, now
                digitally remastered for the security analyst.
              </p>
              <button className="rounded-sm bg-orange-700 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:bg-orange-800">
                Explore Archives
              </button>
            </div>
            <div className="relative h-56 w-full overflow-hidden rounded-lg bg-gray-900 md:h-64">
              <Image
                src={allPosts[allPosts.length - 1].coverImage}
                alt="The Archive Project"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
