import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHeader } from '@/components/page-header';
import { getAllPosts, type BlogPost } from '@/lib/blog-data';

export const metadata = {
  title: 'Archives | Infocus-IT',
  description: 'The complete Infocus-IT archive — every editorial we have published, organized by date.',
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
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main id="main">

      <PageHeader
        kicker="The Archive Project"
        title="Every editorial, remastered"
        accent="for the cyber mind."
        subtitle="A complete index of our published work — browse the full catalog or jump to a specific month."
      />

      {/* Stats */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { label: 'Editorials Published', value: totalEditorials, emphasis: true },
              { label: 'Subject Categories', value: totalCategories },
              { label: 'Contributing Authors', value: totalAuthors },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`rounded-2xl p-6 shadow-ambient-sm ${
                  stat.emphasis ? 'bg-gradient-signature text-white' : 'bg-surface-lowest'
                }`}
              >
                <p
                  className={`font-playfair text-5xl font-bold ${
                    stat.emphasis ? 'text-white' : 'text-gradient-signature'
                  }`}
                >
                  {String(stat.value).padStart(2, '0')}
                </p>
                <p
                  className={`mt-3 text-[10px] font-semibold uppercase tracking-[0.24em] ${
                    stat.emphasis ? 'text-white/85' : 'text-on-surface-variant'
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grouped timeline */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl space-y-16">
          {grouped.map((group) => (
            <div key={group.key}>
              <header className="mb-6 flex items-end justify-between">
                <h2 className="accent-bar font-playfair text-2xl font-semibold text-on-bg">
                  {group.label}
                </h2>
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-on-surface-muted">
                  {group.items.length} editorial{group.items.length === 1 ? '' : 's'}
                </span>
              </header>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {group.items.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex gap-4 rounded-xl p-3 transition-colors hover:bg-surface-container"
                  >
                    <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-surface-high">
                      <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary-ink">
                        {post.category} · {post.readTime} min
                      </p>
                      <h3 className="mt-1 line-clamp-2 font-playfair text-base font-semibold leading-snug text-on-bg transition-colors group-hover:text-primary-ink">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-xs text-on-surface-muted">
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

      </main>
      <Footer />
    </div>
  );
}
