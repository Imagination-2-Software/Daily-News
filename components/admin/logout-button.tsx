'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LogOut, Loader2 } from 'lucide-react';

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onClick() {
    if (pending) return;
    setPending(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.replace('/admin/login');
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      aria-busy={pending}
      className="inline-flex items-center gap-1.5 rounded-md bg-surface-container px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant transition-colors hover:bg-surface-high hover:text-primary disabled:opacity-60"
    >
      {pending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
      ) : (
        <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      {pending ? 'Logging out…' : 'Log out'}
    </button>
  );
}
