import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHeader } from '@/components/page-header';
import { getAllPosts, type BlogPost } from '@/lib/blog-data';

export const metadata = {
  title: 'Archives | InFocusIT',
  description: 'The complete InFocusIT archive — every editorial we have published, organized by date.',
};

export const revalidate = 300;

function parseDate(s: string) {
  const d = new Date(s);
  return isNaN(d.getTime()) ? new Date(0) : d;
}

function groupByYearMonth(posts: BlogPost[]) {
  const map = new Map<string, BlogPost[]>();
  const sorted = [...posts].sort(
    (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime(),
  );
  for (const p of sorted) {
    const d = parseDate(p.date);
    const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, '0')}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(p);
  }
  return Array.from(map.entries()).map(([key, items]) => {
    const [y, m] = key.split('-').map(Number);
    const label = new Date(y, m).toLocaleString('en-US', { month: 'long', year: 'numeric' });
    return { key, label, items };
  });
}

export default async function ArchivesPage() {
  const blogPosts = await getAllPosts();
  const grouped = groupByYearMonth(blogPosts);
  const totalEditorials = blogPosts.length;
  const totalCategories = new Set(blogPosts.map((p) => p.category)).size;
  const totalAuthors = new Set(blogPosts.map((p) => p.author)).size;

  return (
    <div className="min-h-screen bg-[#faf8f4]">
      <Navbar />

      <PageHeader
        kicker="The Archive Project"
        title="Every editorial, remastered"
        accent="for the cyber mind."
        subtitle="A complete index of our published work — browse the full catalog or jump to a specific month."
      />

      {/* Stats */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { label: 'Editorials Published', value: totalEditorials },
              { label: 'Subject Categories', value: totalCategories },
              { label: 'Contributing Authors', value: totalAuthors },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg bg-[#f0ece4] p-6">
                <p className="font-playfair text-5xl font-bold text-orange-600">
                  {String(stat.value).padStart(2, '0')}
                </p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grouped timeline */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl space-y-16">
          {grouped.map((group) => (
            <div key={group.key}>
              <div className="mb-6 flex items-center justify-between border-b border-gray-300 pb-3">
                <h2 className="font-playfair text-2xl font-bold text-gray-900">{group.label}</h2>
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
                  {group.items.length} editorial{group.items.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {group.items.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex gap-4 rounded-lg p-3 transition-colors hover:bg-[#f0ece4]"
                  >
                    <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-md bg-gray-900">
                      <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-600">
                        {post.category} · {post.readTime} min
                      </p>
                      <h3 className="mt-1 line-clamp-2 font-playfair text-base font-semibold leading-snug text-gray-900 transition-colors group-hover:text-orange-600">
                        {post.title}.
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        {post.author} · {post.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
