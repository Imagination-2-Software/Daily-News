'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

/**
 * Dark-mode toggle. Pairs with the no-flash inline script in app/layout.tsx
 * that sets the initial `dark` class before React hydrates.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Hydrate from the class the inline script already set.
  useEffect(() => {
    const initial: Theme = document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';
    setTheme(initial);
  }, []);

  function apply(next: Theme) {
    setTheme(next);
    const root = document.documentElement;
    root.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Private mode / storage disabled — tolerate silently.
    }
  }

  // Render a non-interactive placeholder until we know the active theme,
  // so the toggle doesn't momentarily show the wrong icon.
  if (theme === null) {
    return (
      <span
        aria-hidden="true"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant"
      >
        <Sun className="h-4 w-4" />
      </span>
    );
  }

  const next: Theme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => apply(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
