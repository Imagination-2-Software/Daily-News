import {
  Calendar,
  Cpu,
  Image as ImageIcon,
  Rss,
  Database,
  ShieldCheck,
  Radio,
  FileSearch,
  PenTool,
  Send,
} from 'lucide-react';
import { isSupabaseConfigured, type AutomationRunRow } from '@/lib/supabase/types';
import { RunNowButton } from '@/components/admin/run-now-button';
import { getAdminStatus, formatRelative } from '@/lib/admin-status';

export const dynamic = 'force-dynamic';

function StatusBadge({ status }: { status: AutomationRunRow['status'] }) {
  const cls =
    status === 'success'
      ? 'bg-success/15 text-success'
      : status === 'failed'
        ? 'bg-error/15 text-error'
        : 'bg-primary-container/20 text-primary';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${cls}`}>
      <span
        aria-hidden="true"
        className={`inline-block h-1.5 w-1.5 rounded-full ${
          status === 'success' ? 'bg-success' : status === 'failed' ? 'bg-error' : 'bg-primary-container soft-pulse'
        }`}
      />
      {status}
    </span>
  );
}

// Provenance tags pulled from automation_runs.logs JSONB.
function ProvenanceChips({ logs }: { logs: Record<string, unknown> | null }) {
  if (!logs) return null;
  const chips: string[] = [];
  const provider = typeof logs.llmProvider === 'string' ? logs.llmProvider : null;
  const editor = typeof logs.llmEditor === 'string' ? logs.llmEditor : null;
  const passes = typeof logs.editorialPasses === 'number' ? logs.editorialPasses : null;
  const fallback = logs.llmFallback === true;
  const article = typeof logs.articleBody === 'string' ? logs.articleBody : null;

  if (provider) {
    chips.push(
      passes === 2 && editor
        ? `${provider} → ${editor}`
        : provider + (fallback ? ' (fallback)' : ''),
    );
  }
  if (article && article !== 'unavailable') chips.push('article body');

  if (chips.length === 0) return null;

  return (
    <div className="mt-1.5 flex flex-wrap gap-1.5">
      {chips.map((label) => (
        <span
          key={label}
          className="inline-flex rounded-sm bg-surface-container px-1.5 py-0.5 text-[10px] font-medium text-on-surface-variant"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

// Snapshot of the *live* pipeline config based on env vars the server
// actually has right now. Earlier this was hardcoded and drifted the
// moment we swapped providers — now it always matches reality.
function buildConfigItems() {
  const hasGroq = Boolean(process.env.GROQ_API_KEY);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);
  const forced = (process.env.LLM_PROVIDER || '').toLowerCase();
  const groqModel = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  const geminiModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  let textModel = 'not configured';
  if (forced === 'gemini' && hasGemini) {
    textModel = `${geminiModel} (Gemini, forced)`;
  } else if (forced === 'groq' && hasGroq) {
    textModel = `${groqModel} (Groq, forced)`;
  } else if (hasGroq && hasGemini) {
    textModel = `${groqModel} (Groq) → ${geminiModel} fallback`;
  } else if (hasGroq) {
    textModel = `${groqModel} (Groq)`;
  } else if (hasGemini) {
    textModel = `${geminiModel} (Gemini)`;
  }

  const passes = Number(process.env.EDITORIAL_PASSES) === 2 ? 2 : 1;
  const editorProvider = (process.env.EDITOR_PROVIDER || 'same-as-draft').toLowerCase();

  const imageForced = (process.env.IMAGE_PROVIDER || '').toLowerCase();
  const geminiImageModel = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';
  const imageModel =
    imageForced === 'pollinations'
      ? 'Pollinations (forced)'
      : hasGemini
        ? `${geminiImageModel} → Pollinations fallback`
        : 'Pollinations';

  const jinaConfigured = Boolean(process.env.JINA_API_KEY);

  return [
    { icon: Calendar,    label: 'Schedule',        value: 'Daily · 06:00 UTC (GitHub Actions)' },
    { icon: FileSearch,  label: 'Article Extract', value: jinaConfigured ? 'Jina Reader (authed)' : 'Jina Reader (anonymous)' },
    { icon: Cpu,         label: 'Text Model',      value: textModel },
    {
      icon: PenTool,
      label: 'Editorial Passes',
      value: passes === 2
        ? `2 (draft → editor${editorProvider !== 'same-as-draft' ? `, ${editorProvider}` : ''})`
        : '1 (draft only)',
    },
    { icon: ImageIcon,   label: 'Image Model',     value: imageModel },
    { icon: Rss,         label: 'News Sources',    value: 'BleepingComputer · The Hacker News · Krebs · Dark Reading' },
    { icon: Database,    label: 'Storage',         value: 'Supabase Storage · bucket: covers' },
    { icon: Send,        label: 'Newsletter',      value: process.env.SMTP_USER ? `SMTP · ${process.env.SMTP_USER}` : 'Not configured' },
    { icon: ShieldCheck, label: 'Revalidation',    value: process.env.REVALIDATE_SECRET ? 'Configured' : 'Not configured' },
  ];
}

export default async function AdminAutomationPage() {
  const status = await getAdminStatus();
  const { runs, successCount, failCount, lastSuccess } = status;
  const activeRunning = status.state === 'running';
  const configItems = buildConfigItems();

  return (
    <div className="space-y-8">
      {/* Page header — aligned with overview typography */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          Pipeline
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] text-on-bg">
          Automation
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
          RSS → Jina Reader → Groq (Llama 3.3 70B) → editor pass → Gemini cover →
          Supabase → Hostinger SMTP. Runs daily at 06:00 UTC via GitHub Actions, or on
          demand.
        </p>
      </div>

      {/* STATUS BANNER */}
      <div className="relative overflow-hidden rounded-xl border border-outline-variant bg-surface-lowest p-6">
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${
                activeRunning ? 'bg-primary-container/15' : 'bg-success/15'
              }`}
            >
              <span
                className={`inline-block h-2.5 w-2.5 rounded-full ${
                  activeRunning ? 'bg-primary-container soft-pulse' : 'bg-success'
                }`}
              />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-muted">
                Current status
              </p>
              <p className="mt-0.5 text-lg font-bold text-on-bg">
                {activeRunning
                  ? 'A run is in progress.'
                  : lastSuccess
                    ? `Last success: ${formatRelative(lastSuccess.started_at)}.`
                    : 'No successful runs yet.'}
              </p>
              <p className="mt-1 text-xs text-on-surface-variant">
                {successCount} success · {failCount} failed · {runs.length} total shown
              </p>
            </div>
          </div>
          <RunNowButton />
        </div>
      </div>

      {/* CONFIG GRID */}
      <section>
        <header className="mb-5">
          <h2 className="accent-bar text-xl font-bold text-on-bg">Pipeline Configuration</h2>
          <p className="mt-2 text-sm text-on-surface-variant">
            Live snapshot of what the server is actually configured to do — derived from env
            vars, not hardcoded. If a value looks wrong, check your env.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {configItems.map((row) => {
            const Icon = row.icon;
            return (
              <div
                key={row.label}
                className="rounded-xl border border-outline-variant bg-surface-lowest p-5 transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {row.label}
                </div>
                <p className="mt-3 text-[15px] font-semibold leading-snug text-on-bg">
                  {row.value}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* RECENT RUNS */}
      <section>
        <header className="mb-5 flex items-end justify-between">
          <h2 className="accent-bar text-xl font-bold text-on-bg">Recent Runs</h2>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-muted">
            Showing latest {runs.length || 0}
          </p>
        </header>

        {runs.length === 0 ? (
          <div className="rounded-2xl bg-surface-container p-10 text-center">
            <Radio className="mx-auto h-6 w-6 text-on-surface-muted" aria-hidden="true" />
            <p className="mt-3 text-base font-bold text-on-bg">No runs yet.</p>
            <p className="mt-1 text-sm text-on-surface-variant">
              {isSupabaseConfigured()
                ? 'Trigger one with "Run now" above, or wait for the daily cron.'
                : 'Supabase is not configured. Add env vars to .env.local to enable the pipeline.'}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-lowest">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-surface-container text-[10px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                    <th scope="col" className="px-6 py-3.5">Started</th>
                    <th scope="col" className="px-6 py-3.5">Trigger</th>
                    <th scope="col" className="px-6 py-3.5">Status</th>
                    <th scope="col" className="px-6 py-3.5">Topic &amp; provenance</th>
                    <th scope="col" className="px-6 py-3.5 text-right">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {runs.map((r, idx) => {
                    const duration = r.finished_at
                      ? `${Math.max(
                          1,
                          Math.round(
                            (new Date(r.finished_at).getTime() - new Date(r.started_at).getTime()) /
                              1000,
                          ),
                        )}s`
                      : '—';
                    return (
                      <tr
                        key={r.id}
                        className={`transition-colors hover:bg-surface-low ${
                          idx % 2 === 1 ? 'bg-surface-low/40' : ''
                        }`}
                      >
                        <td className="px-6 py-4 text-xs text-on-surface-muted">
                          {formatRelative(r.started_at)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex rounded-full bg-surface-container px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                            {r.trigger}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={r.status} />
                        </td>
                        <td className="px-6 py-4">
                          <p className="line-clamp-1 text-sm font-bold text-on-bg">
                            {r.topic ?? '—'}
                          </p>
                          {r.error && (
                            <p className="mt-1 line-clamp-1 text-xs text-error">{r.error}</p>
                          )}
                          <ProvenanceChips logs={r.logs} />
                        </td>
                        <td className="px-6 py-4 text-right text-xs text-on-surface-muted">
                          {duration}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
