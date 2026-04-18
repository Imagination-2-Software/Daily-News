import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHeader } from '@/components/page-header';
import { getAllPosts } from '@/lib/blog-data';

export const metadata = {
  title: 'Perspectives | InFocusIT',
  description: 'Op-eds, essays, and long-form commentary on the state of cybersecurity.',
};

export const revalidate = 300;

const voices = [
  {
    name: 'Marcus Chen',
    role: 'Threat Intelligence Lead',
    bio: 'Tracks the industrialization of ransomware and the marketplaces behind modern extortion.',
  },
  {
    name: 'Dr. Sarah Williams',
    role: 'Security Researcher',
    bio: 'Focuses on zero-day economics and the lifecycle of undisclosed vulnerabilities.',
  },
  {
    name: 'Prof. Alexander Norton',
    role: 'Cryptography Editor',
    bio: 'Writes on the practical timeline for post-quantum migration across regulated industries.',
  },
];

export default async function PerspectivesPage() {
  const blogPosts = await getAllPosts();
  const lead = blogPosts[2] ?? blogPosts[0];
  const essays = blogPosts.slice(3);

  return (
    <div className="min-h-screen bg-[#faf8f4]">
      <Navbar />

      <PageHeader
        kicker="Editorial Perspectives"
        title="Long-form commentary on"
        accent="what the signal means."
        subtitle="Our contributors step back from the news cycle to frame the shifts shaping the next decade of security."
      />

      {/* Lead essay */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
            <div className="md:col-span-3">
              <Link href={`/blog/${lead.slug}`} className="group block">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-900 md:h-[420px]">
                  <Image
                    src={lead.coverImage}
                    alt={lead.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-600">
                  Lead Essay · {lead.category}
                </p>
                <h2 className="mt-3 font-playfair text-3xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-orange-600 md:text-4xl">
                  {lead.title}.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-gray-600">{lead.excerpt}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  By {lead.author} · {lead.date}
                </p>
              </Link>
            </div>

            <aside className="md:col-span-2">
              <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
                  The Voices
                </h3>
                <span className="h-[2px] w-16 bg-orange-600" />
              </div>
              <ul className="space-y-6">
                {voices.map((v) => (
                  <li key={v.name} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-xs font-bold text-white">
                      {v.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </div>
                    <div>
                      <p className="font-playfair text-lg font-semibold text-gray-900">{v.name}</p>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-600">
                        {v.role}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">{v.bio}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* Essay list */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between border-b border-gray-300 pb-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
              Further Essays
            </h3>
            <span className="h-[2px] w-16 bg-orange-600" />
          </div>

          <div className="divide-y divide-gray-200">
            {essays.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid grid-cols-1 gap-6 py-8 md:grid-cols-12"
              >
                <p className="font-playfair text-2xl font-bold text-gray-300 md:col-span-1">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <div className="md:col-span-7">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-600">
                    {post.category} · {post.readTime} min read
                  </p>
                  <h4 className="font-playfair text-2xl font-semibold leading-snug text-gray-900 transition-colors group-hover:text-orange-600">
                    {post.title}.
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
                </div>
                <div className="md:col-span-4">
                  <div className="relative h-40 w-full overflow-hidden rounded-lg bg-gray-900">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
