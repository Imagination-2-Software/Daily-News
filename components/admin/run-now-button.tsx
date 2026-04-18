'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export function RunNowButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<string | null>(null);

  async function trigger() {
    setStatus(null);
    const res = await fetch('/api/automation/run', { method: 'POST' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data?.error) {
      setStatus(`Error: ${data?.error ?? res.statusText}`);
      return;
    }
    setStatus('Pipeline started. Refreshing runs…');
    startTransition(() => router.refresh());
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={trigger}
        disabled={pending}
        className="rounded-sm bg-orange-700 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:bg-orange-800 disabled:opacity-60"
      >
        {pending ? 'Starting…' : 'Run Now'}
      </button>
      {status && <span className="text-xs text-gray-600">{status}</span>}
    </div>
  );
}
