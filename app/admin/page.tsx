import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { getAllPosts } from '@/lib/blog-data';
import { isSupabaseConfigured, type AutomationRunRow } from '@/lib/supabase/types';
import { RunNowButton } from '@/components/admin/run-now-button';

export const dynamic = 'force-dynamic';

async function fetchRuns(): Promise<AutomationRunRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from('automation_runs')
    .select('*')
    .order('started_at', { ascending: false })
    .limit(6);
  return (data as AutomationRunRow[]) ?? [];
}

function formatRelative(iso: string): string {
  const delta = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(delta / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default async function AdminOverviewPage() {
  const [blogPosts, runs] = await Promise.all([getAllPosts(), fetchRuns()]);

  const total = blogPosts.length;
  const categoryCount = new Set(blogPosts.map((p) => p.category)).size;
  const authors = new Set(blogPosts.map((p) => p.author)).size;
  const latest = blogPosts[0];
  const activeRun = runs.find((r) => r.status === 'running');
  const lastSuccess = runs.find((r) => r.status === 'success');
  const successCount = runs.filter((r) => r.status === 'success').length;
  const failCount = runs.filter((r) => r.status === 'failed').length;

  const categoryBreakdown = ['Security Research', 'Threats', 'How-To', 'Compliance'].map((c) => ({
    name: c,
    count: blogPosts.filter((p) => p.category === c).length,
  }));
  const maxCount = Math.max(1, ...categoryBreakdown.map((c) => c.count));

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
            Editor Desk
          </p>
          <h1 className="mt-2 font-playfair text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Welcome back.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
            {activeRun
              ? 'A pipeline run is live. Hang tight — a new editorial is on its way.'
              : lastSuccess
                ? `Last published ${formatRelative(lastSuccess.started_at)} · ${successCount} successful run${successCount === 1 ? '' : 's'} recorded.`
                : 'No automation runs yet. Fire the pipeline to publish your first editorial.'}
          </p>
        </div>
        <RunNowButton />
      </div>

      {/* Status strip */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: 'Published', value: total, accent: true },
          { label: 'Categories', value: categoryCount },
          { label: 'Bylines', value: authors },
          { label: 'Success Rate', value: runs.length > 0 ? `${Math.round((successCount / runs.length) * 100)}%` : '—' },
        ].map((s) => (
          <div key={s.label} className="rounded-lg bg-[#f0ece4] p-5">
            <p className={`font-playfair text-3xl font-bold ${s.accent ? 'text-orange-600' : 'text-gray-900'}`}>
              {typeof s.value === 'number' ? String(s.value).padStart(2, '0') : s.value}
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Two-column body */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left: Latest + category chart */}
        <div className="space-y-8 lg:col-span-2">
          {/* Latest card */}
          {latest && (
            <div>
              <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-3">
                <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
                  Latest Editorial
                </h2>
                <span className="h-[2px] w-16 bg-orange-600" />
              </div>
              <div className="grid grid-cols-1 gap-5 rounded-lg bg-white p-5 ring-1 ring-gray-100 md:grid-cols-5">
                <div className="relative h-40 w-full overflow-hidden rounded-md bg-gray-900 md:col-span-2 md:h-full">
                  <Image src={latest.coverImage} alt={latest.title} fill className="object-cover" />
                </div>
                <div className="md:col-span-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-600">
                    {latest.category} · {latest.date}
                  </p>
                  <h3 className="mt-2 font-playfair text-xl font-semibold leading-snug text-gray-900">
                    {latest.title}.
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">
                    {latest.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Link
                      href={`/blog/${latest.slug}`}
                      className="rounded-sm bg-orange-700 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:bg-orange-800"
                    >
                      View Live
                    </Link>
                    <Link
                      href={`/admin/posts/${latest.slug}`}
                      className="rounded-sm border border-gray-300 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700 transition-colors hover:border-orange-600 hover:text-orange-600"
                    >
                      Edit
                    </Link>
                    <span className="ml-auto text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                      {latest.readTime} min read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Category breakdown */}
          <div>
            <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
                Category Mix
              </h2>
              <span className="h-[2px] w-16 bg-orange-600" />
            </div>
            <div className="space-y-3 rounded-lg bg-white p-5 ring-1 ring-gray-100">
              {categoryBreakdown.map((c) => (
                <div key={c.name} className="flex items-center gap-4">
                  <p className="w-36 shrink-0 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
                    {c.name}
                  </p>
                  <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-[#f0ece4]">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-orange-600"
                      style={{ width: `${(c.count / maxCount) * 100}%` }}
                    />
                  </div>
                  <p className="w-8 shrink-0 text-right font-playfair text-sm font-semibold text-gray-900">
                    {String(c.count).padStart(2, '0')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Pipeline + quick links */}
        <div className="space-y-8">
          {/* Pipeline */}
          <div>
            <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
                Pipeline
              </h2>
              <Link
                href="/admin/automation"
                className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-600 hover:text-orange-800"
              >
                Configure →
              </Link>
            </div>
            <div className="rounded-lg bg-white p-5 ring-1 ring-gray-100">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-block h-2.5 w-2.5 rounded-full ${
                    activeRun ? 'animate-pulse bg-orange-500' : failCount > successCount ? 'bg-red-500' : 'bg-green-500'
                  }`}
                />
                <p className="font-playfair text-sm font-semibold text-gray-900">
                  {activeRun ? 'Run in progress' : lastSuccess ? 'Healthy' : 'Idle'}
                </p>
              </div>
              <ul className="mt-4 space-y-2 text-xs text-gray-600">
                <li className="flex items-center justify-between">
                  <span>Last success</span>
                  <span className="font-semibold text-gray-900">
                    {lastSuccess ? formatRelative(lastSuccess.started_at) : '—'}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Recent runs</span>
                  <span className="font-semibold text-gray-900">
                    {successCount}/{runs.length} succeeded
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Next cron</span>
                  <span className="font-semibold text-gray-900">06:00 UTC</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick actions */}
          <div>
            <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
                Quick Actions
              </h2>
              <span className="h-[2px] w-16 bg-orange-600" />
            </div>
            <div className="space-y-2">
              {[
                { href: '/admin/posts/new', label: 'Draft New Editorial', primary: true },
                { href: '/admin/posts', label: 'Browse Library' },
                { href: '/admin/automation', label: 'Automation' },
                { href: '/admin/settings', label: 'Journal Settings' },
              ].map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className={`block rounded-md px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] transition-colors ${
                    a.primary
                      ? 'bg-orange-700 text-white hover:bg-orange-800'
                      : 'bg-white text-gray-700 ring-1 ring-gray-100 hover:bg-[#f0ece4] hover:text-orange-600'
                  }`}
                >
                  {a.label} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent runs */}
      <div>
        <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
            Recent Runs
          </h2>
          <Link
            href="/admin/automation"
            className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-600 hover:text-orange-800"
          >
            View all →
          </Link>
        </div>
        {runs.length === 0 ? (
          <div className="rounded-lg bg-[#f0ece4] p-8 text-center text-sm text-gray-600">
            No runs yet. Use &ldquo;Run Now&rdquo; to fire the pipeline.
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg bg-white ring-1 ring-gray-100">
            <ul className="divide-y divide-gray-100">
              {runs.map((r) => (
                <li key={r.id} className="flex items-center gap-4 px-5 py-3 text-xs">
                  <span
                    className={`inline-block h-2 w-2 shrink-0 rounded-full ${
                      r.status === 'success'
                        ? 'bg-green-500'
                        : r.status === 'failed'
                          ? 'bg-red-500'
                          : 'animate-pulse bg-orange-500'
                    }`}
                  />
                  <span className="w-20 shrink-0 text-gray-500">{formatRelative(r.started_at)}</span>
                  <span className="w-16 shrink-0 rounded-sm bg-gray-100 px-2 py-1 text-center text-[10px] font-semibold uppercase tracking-wider text-gray-700">
                    {r.trigger}
                  </span>
                  <p className="min-w-0 flex-1 truncate font-playfair text-sm font-semibold text-gray-900">
                    {r.topic ?? r.error ?? 'n/a'}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
