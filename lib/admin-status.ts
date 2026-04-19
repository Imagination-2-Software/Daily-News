/**
 * Lightweight admin-wide health snapshot, shared across admin pages.
 *
 * Fetches the most recent automation runs (capped to 10 — plenty for health)
 * and returns a compact summary the layout + overview both consume. Single
 * place so a failed-pipeline pill in the header stays in sync with the
 * overview's "pipeline status" card.
 */

import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { isSupabaseConfigured, type AutomationRunRow } from '@/lib/supabase/types';

export type HealthState = 'ok' | 'running' | 'failing' | 'idle' | 'unconfigured';

export interface AdminStatus {
  state: HealthState;
  /** Human-readable one-liner suitable for tooltips. */
  label: string;
  /** Last successful run if any. */
  lastSuccess: AutomationRunRow | null;
  /** Most recent run regardless of outcome. */
  lastRun: AutomationRunRow | null;
  runs: AutomationRunRow[];
  successCount: number;
  failCount: number;
}

export async function getAdminStatus(): Promise<AdminStatus> {
  if (!isSupabaseConfigured()) {
    return {
      state: 'unconfigured',
      label: 'Supabase not configured',
      lastSuccess: null,
      lastRun: null,
      runs: [],
      successCount: 0,
      failCount: 0,
    };
  }

  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from('automation_runs')
    .select('*')
    .order('started_at', { ascending: false })
    .limit(10);

  const runs = (data as AutomationRunRow[]) ?? [];
  const lastRun = runs[0] ?? null;
  const lastSuccess = runs.find((r) => r.status === 'success') ?? null;
  const successCount = runs.filter((r) => r.status === 'success').length;
  const failCount = runs.filter((r) => r.status === 'failed').length;

  // Derive a single health state the operator can scan in one glance.
  let state: HealthState = 'idle';
  let label = 'No runs yet';
  if (lastRun?.status === 'running') {
    state = 'running';
    label = 'A run is in progress.';
  } else if (lastRun?.status === 'failed') {
    state = 'failing';
    label = `Last run failed: ${lastRun.error ?? 'unknown error'}`;
  } else if (lastSuccess) {
    state = 'ok';
    label = `Last success ${formatRelative(lastSuccess.started_at)}`;
  }

  return {
    state,
    label,
    lastSuccess,
    lastRun,
    runs,
    successCount,
    failCount,
  };
}

export function formatRelative(iso: string): string {
  const delta = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(delta / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
