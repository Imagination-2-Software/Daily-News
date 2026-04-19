'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

type Status =
  | { kind: 'idle' }
  | { kind: 'success'; msg: string }
  | { kind: 'error'; msg: string };

export function RunNowButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function trigger() {
    setStatus({ kind: 'idle' });
    setRunning(true);
    try {
      const res = await fetch('/api/automation/run', { method: 'POST' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.error) {
        setStatus({ kind: 'error', msg: data?.error ?? res.statusText });
        return;
      }
      const mode =
        data?.mode === 'workflow_dispatch'
          ? 'GitHub Actions triggered.'
          : data?.mode === 'local-spawn'
            ? 'Local pipeline started.'
            : 'Pipeline started.';
      setStatus({ kind: 'success', msg: `${mode} Refreshing…` });
      startTransition(() => router.refresh());
    } catch (err) {
      setStatus({
        kind: 'error',
        msg: err instanceof Error ? err.message : 'Unknown error',
      });
    } finally {
      setRunning(false);
    }
  }

  const busy = pending || running;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={trigger}
        disabled={busy}
        aria-busy={busy}
        className="cta-primary inline-flex items-center gap-2 rounded-lg px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {busy ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
        ) : (
          <Play className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        {busy ? 'Starting\u2026' : 'Run now'}
      </button>
      {status.kind !== 'idle' && (
        <span
          role="status"
          aria-live="polite"
          className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] ${
            status.kind === 'success' ? 'text-success' : 'text-error'
          }`}
        >
          {status.kind === 'success' ? (
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {status.msg}
        </span>
      )}
    </div>
  );
}
