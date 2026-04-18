import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { isSupabaseConfigured, type AutomationRunRow } from '@/lib/supabase/types';
import { RunNowButton } from '@/components/admin/run-now-button';

export const dynamic = 'force-dynamic';

async function fetchRecentRuns(): Promise<AutomationRunRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from('automation_runs')
    .select('*')
    .order('started_at', { ascending: false })
    .limit(10);
  return (data as AutomationRunRow[]) ?? [];
}

function formatRelative(iso: string): string {
  const delta = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(delta / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function statusColor(s: AutomationRunRow['status']) {
  if (s === 'success') return 'bg-green-100 text-green-700';
  if (s === 'failed') return 'bg-red-100 text-red-700';
  return 'bg-orange-100 text-orange-700';
}

export default async function AdminAutomationPage() {
  const runs = await fetchRecentRuns();
  const lastSuccess = runs.find((r) => r.status === 'success');
  const activeRunning = runs.some((r) => r.status === 'running');

  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
          Pipeline
        </p>
        <h1 className="mt-2 font-playfair text-4xl font-bold tracking-tight text-gray-900">
          Automation.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
          Cron-driven pipeline: RSS → Gemini Flash → Pollinations cover → Supabase → live site.
          Runs daily at 06:00 UTC via GitHub Actions, or on demand from here.
        </p>
      </div>

      {/* Status banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-[#f0ece4] p-5">
        <div className="flex items-center gap-3">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${
              activeRunning ? 'animate-pulse bg-orange-500' : 'bg-green-500'
            }`}
          />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
              Status
            </p>
            <p className="font-playfair text-lg font-semibold text-gray-900">
              {activeRunning
                ? 'A run is in progress.'
                : lastSuccess
                  ? `Last success: ${formatRelative(lastSuccess.started_at)}.`
                  : 'No successful runs yet.'}
            </p>
          </div>
        </div>
        <RunNowButton />
      </div>

      {/* Config summary */}
      <section>
        <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
            Pipeline Configuration
          </h2>
          <span className="h-[2px] w-16 bg-orange-600" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            { label: 'Schedule', value: 'Daily · 06:00 UTC (GitHub Actions)' },
            { label: 'Text Model', value: 'gemini-1.5-flash' },
            { label: 'Image Model', value: 'Pollinations (free, unlimited)' },
            {
              label: 'News Sources',
              value: 'BleepingComputer · The Hacker News · Krebs · Dark Reading',
            },
            { label: 'Storage', value: 'Supabase Storage bucket: covers' },
            {
              label: 'Revalidation',
              value: process.env.REVALIDATE_SECRET ? 'Configured' : 'Not configured',
            },
          ].map((row) => (
            <div key={row.label} className="rounded-lg bg-white p-5 ring-1 ring-gray-100">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-600">
                {row.label}
              </p>
              <p className="mt-2 font-playfair text-base font-semibold text-gray-900">
                {row.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent runs */}
      <section>
        <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
            Recent Runs
          </h2>
          <span className="h-[2px] w-16 bg-orange-600" />
        </div>

        {runs.length === 0 ? (
          <div className="rounded-lg bg-[#f0ece4] p-8 text-center text-sm text-gray-600">
            No runs yet. {isSupabaseConfigured()
              ? 'Trigger one with "Run Now" above, or wait for the daily cron.'
              : 'Supabase is not configured. Add env vars to .env.local to enable the pipeline.'}
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg bg-white ring-1 ring-gray-100">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f0ece4] text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-700">
                <tr>
                  <th className="px-5 py-3">Started</th>
                  <th className="px-5 py-3">Trigger</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Topic</th>
                  <th className="px-5 py-3">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {runs.map((r) => {
                  const duration = r.finished_at
                    ? `${Math.max(
                        1,
                        Math.round(
                          (new Date(r.finished_at).getTime() -
                            new Date(r.started_at).getTime()) /
                            1000,
                        ),
                      )}s`
                    : '—';
                  return (
                    <tr key={r.id} className="transition-colors hover:bg-[#faf8f4]">
                      <td className="px-5 py-4 text-xs text-gray-600">
                        {formatRelative(r.started_at)}
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-sm bg-gray-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-700">
                          {r.trigger}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-sm px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${statusColor(r.status)}`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="line-clamp-1 font-playfair text-sm font-semibold text-gray-900">
                          {r.topic ?? '—'}
                        </p>
                        {r.error && (
                          <p className="mt-1 line-clamp-1 text-xs text-red-600">{r.error}</p>
                        )}
                      </td>
                      <td className="px-5 py-4 text-xs text-gray-500">{duration}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
