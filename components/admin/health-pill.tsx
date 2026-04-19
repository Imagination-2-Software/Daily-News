import Link from 'next/link';
import type { HealthState } from '@/lib/admin-status';

/**
 * Compact pipeline-health indicator shown in the admin header.
 *
 * Clicking it navigates to /admin/automation where the operator can see
 * full run history. Colour alone is not used to convey status — a text
 * label travels with the dot for a11y / low-vision readers.
 */
interface Props {
  state: HealthState;
  label: string;
}

const STATE_STYLE: Record<HealthState, { dot: string; chip: string; text: string; emoji: string }> = {
  ok:           { dot: 'bg-success',                 chip: 'bg-success/10',        text: 'text-success',        emoji: 'Healthy' },
  running:      { dot: 'bg-primary soft-pulse',      chip: 'bg-primary-container/30', text: 'text-primary',     emoji: 'Running' },
  failing:      { dot: 'bg-error',                   chip: 'bg-error/10',          text: 'text-error',          emoji: 'Failing' },
  idle:         { dot: 'bg-on-surface-muted',        chip: 'bg-surface-container', text: 'text-on-surface-variant', emoji: 'Idle' },
  unconfigured: { dot: 'bg-warning',                 chip: 'bg-warning/10',        text: 'text-warning',        emoji: 'Setup' },
};

export function HealthPill({ state, label }: Props) {
  const style = STATE_STYLE[state];
  return (
    <Link
      href="/admin/automation"
      title={label}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-opacity hover:opacity-80 ${style.chip} ${style.text}`}
    >
      <span aria-hidden="true" className={`inline-block h-1.5 w-1.5 rounded-full ${style.dot}`} />
      <span>{style.emoji}</span>
      <span className="hidden text-on-surface-muted md:inline">· {label}</span>
    </Link>
  );
}
