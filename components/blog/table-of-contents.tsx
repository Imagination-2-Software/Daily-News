'use client';

import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugifyHeading(text: string, i: number): string {
  const base = text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return base || `section-${i}`;
}

/**
 * Sticky TOC for long-form articles. Reads the rendered article DOM,
 * assigns stable IDs to every h2/h3, and highlights the current section
 * as the reader scrolls. Hidden if the article has fewer than 3 headings.
 *
 * Usage: render this next to the article with a content selector.
 */
export function TableOfContents({ contentSelector }: { contentSelector: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const root = document.querySelector(contentSelector);
    if (!root) return;

    const nodes = Array.from(root.querySelectorAll('h2, h3')) as HTMLElement[];
    const extracted: Heading[] = nodes.map((el, i) => {
      const text = (el.textContent || '').trim();
      if (!el.id) el.id = slugifyHeading(text, i);
      // Give anchored scroll a bit of headroom so the section isn't hidden
      // under the sticky navbar.
      el.style.scrollMarginTop = '96px';
      return { id: el.id, text, level: Number(el.tagName[1]) as 2 | 3 };
    });
    setHeadings(extracted);

    if (extracted.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the first heading currently in the top half of the viewport.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop,
          );
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger when a heading enters the top 35% of the viewport.
        rootMargin: '-10% 0% -55% 0%',
        threshold: [0, 1],
      },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [contentSelector]);

  if (headings.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      <p className="label-overline mb-3">On this page</p>
      <ul className="space-y-2 border-l border-outline-variant">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`block border-l-2 px-3 py-1 text-[13px] leading-snug -ml-px transition-colors ${
                  isActive
                    ? 'border-tertiary font-semibold text-tertiary'
                    : 'border-transparent text-on-surface-variant hover:border-outline hover:text-on-bg'
                } ${h.level === 3 ? 'pl-5 text-[12px]' : ''}`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
