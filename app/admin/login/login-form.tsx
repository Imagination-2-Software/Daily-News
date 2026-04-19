'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, Loader2, AlertTriangle } from 'lucide-react';

const inputCls =
  'w-full rounded-md bg-surface-low ghost-border px-3.5 py-2.5 text-sm text-on-bg placeholder:text-on-surface-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent';

export function LoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    setError(null);
    setPending(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? 'Invalid credentials');
        setPending(false);
        return;
      }
      router.replace(next && next.startsWith('/') ? next : '/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="username"
          className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={inputCls}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputCls}
        />
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-md bg-error/10 px-3 py-2 text-[13px] text-error"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="cta-primary inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-[12px] uppercase tracking-[0.14em] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <LogIn className="h-4 w-4" aria-hidden="true" />
        )}
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
