'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Save,
  Send,
  Trash2,
} from 'lucide-react';

const CATEGORIES = ['Security Research', 'Threats', 'How-To', 'Compliance'] as const;
type Category = (typeof CATEGORIES)[number];

export interface PostFormValues {
  title: string;
  slug: string;
  excerpt: string;
  category: Category;
  author: string;
  readTime: number;
  coverImage: string;
  content: string;
  status: 'draft' | 'published' | 'retired';
}

interface Props {
  mode: 'create' | 'edit';
  /** For edit mode: the current (pre-edit) slug, used as the URL for PUT. */
  currentSlug?: string;
  initial?: Partial<PostFormValues>;
}

// Limits that match what the DB + downstream consumers expect. Used for
// both the maxLength attribute and live character counters.
const LIMITS = {
  title: 120,
  slug: 80,
  excerpt: 300,
} as const;

const inputCls =
  'w-full rounded-md bg-surface-low ghost-border px-3 py-2 text-sm text-on-bg placeholder:text-on-surface-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent';
const labelCls =
  'mb-1.5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.1em] text-on-surface-variant';

/** Mirror the server-side slugify rules so preview + server agree. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, LIMITS.slug);
}

function Counter({ used, max }: { used: number; max: number }) {
  const warn = used >= max * 0.9;
  const over = used > max;
  return (
    <span
      className={`text-[10px] font-medium tabular-nums ${
        over ? 'text-error' : warn ? 'text-warning' : 'text-on-surface-muted'
      }`}
    >
      {used}/{max}
    </span>
  );
}

export function PostForm({ mode, currentSlug, initial }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<PostFormValues>({
    title: initial?.title ?? '',
    slug: initial?.slug ?? '',
    excerpt: initial?.excerpt ?? '',
    category: (initial?.category as Category) ?? 'Security Research',
    author: initial?.author ?? 'Infocus-IT Team',
    readTime: initial?.readTime ?? 10,
    coverImage: initial?.coverImage ?? '',
    content: initial?.content ?? '',
    status: initial?.status ?? 'draft',
  });
  // When true, the slug follows the title automatically. Flips to false the
  // moment the user edits the slug manually — then they own it.
  const [slugLocked, setSlugLocked] = useState(
    mode === 'create' || !initial?.slug,
  );
  const [pending, setPending] = useState<null | 'save' | 'publish' | 'delete'>(null);
  const [message, setMessage] = useState<
    | { kind: 'success'; text: string }
    | { kind: 'error'; text: string }
    | null
  >(null);
  const titleRef = useRef<HTMLInputElement>(null);

  // Focus title on mount for new posts (not on edits — operator already
  // knows which post they opened).
  useEffect(() => {
    if (mode === 'create') titleRef.current?.focus();
  }, [mode]);

  function set<K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function updateTitle(next: string) {
    const trimmed = next.slice(0, LIMITS.title);
    setValues((v) => ({
      ...v,
      title: trimmed,
      slug: slugLocked ? slugify(trimmed) : v.slug,
    }));
  }

  async function submit(intent: 'save' | 'publish') {
    if (pending) return;
    setPending(intent);
    setMessage(null);
    const payload: PostFormValues = {
      ...values,
      slug: values.slug.trim() || slugify(values.title),
      status: intent === 'publish' ? 'published' : 'draft',
    };
    const url =
      mode === 'create'
        ? '/api/admin/posts'
        : `/api/admin/posts/${encodeURIComponent(currentSlug!)}`;
    const method = mode === 'create' ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        slug?: string;
        error?: string;
      };
      if (!res.ok) {
        setMessage({ kind: 'error', text: data.error ?? `Request failed (${res.status})` });
        setPending(null);
        return;
      }
      setMessage({
        kind: 'success',
        text:
          intent === 'publish'
            ? mode === 'create'
              ? 'Published.'
              : 'Updated.'
            : 'Saved as draft.',
      });

      if (mode === 'create' && data.slug) {
        router.replace(`/admin/posts/${data.slug}`);
      } else if (mode === 'edit' && data.slug && data.slug !== currentSlug) {
        router.replace(`/admin/posts/${data.slug}`);
      } else {
        router.refresh();
      }
    } catch (err) {
      setMessage({
        kind: 'error',
        text: err instanceof Error ? err.message : 'Network error',
      });
    } finally {
      setPending(null);
    }
  }

  async function del() {
    if (!currentSlug || pending) return;
    const ok = window.confirm(
      `Retire "${values.title || currentSlug}"? It will be hidden from the public site. You can hard-delete later from Supabase.`,
    );
    if (!ok) return;
    setPending('delete');
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/posts/${encodeURIComponent(currentSlug)}`, {
        method: 'DELETE',
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setMessage({ kind: 'error', text: data.error ?? `Delete failed (${res.status})` });
        setPending(null);
        return;
      }
      router.replace('/admin/posts');
      router.refresh();
    } catch (err) {
      setMessage({
        kind: 'error',
        text: err instanceof Error ? err.message : 'Network error',
      });
      setPending(null);
    }
  }

  const hasErrors = useMemo(() => {
    if (!values.title.trim()) return 'Title is required';
    if (!values.excerpt.trim()) return 'Excerpt is required';
    if (!values.author.trim()) return 'Author is required';
    if (!values.coverImage.trim()) return 'Cover image URL is required';
    if (!values.content.trim()) return 'Body is required';
    if (values.readTime < 1 || values.readTime > 60) return 'Read time must be 1–60 minutes';
    return null;
  }, [values]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit('publish');
      }}
      className="space-y-8 pb-28"
    >
      {/* Identity group */}
      <fieldset className="space-y-5 rounded-xl border border-outline-variant bg-surface-lowest p-5 md:p-6">
        <legend className="sr-only">Post identity</legend>

        <div>
          <label htmlFor="title" className={labelCls}>
            <span>Title</span>
            <Counter used={values.title.length} max={LIMITS.title} />
          </label>
          <input
            ref={titleRef}
            id="title"
            type="text"
            value={values.title}
            onChange={(e) => updateTitle(e.target.value)}
            placeholder="The title of the editorial"
            className={`${inputCls} text-[15px]`}
            maxLength={LIMITS.title}
            required
          />
        </div>

        <div>
          <label htmlFor="slug" className={labelCls}>
            <span>Slug</span>
            <span className="flex items-center gap-2">
              {slugLocked && (
                <span className="text-[10px] font-medium text-on-surface-muted">
                  auto from title
                </span>
              )}
              <Counter used={values.slug.length} max={LIMITS.slug} />
            </span>
          </label>
          <input
            id="slug"
            type="text"
            value={values.slug}
            onChange={(e) => {
              setSlugLocked(false);
              set('slug', slugify(e.target.value));
            }}
            placeholder="auto-generated-from-title"
            className={`${inputCls} font-mono text-[12px]`}
            maxLength={LIMITS.slug}
          />
          <p className="mt-1 text-[11px] text-on-surface-muted">
            URL will be: /blog/{values.slug || slugify(values.title) || 'your-post-slug'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div>
            <label htmlFor="category" className={labelCls}>
              <span>Category</span>
            </label>
            <select
              id="category"
              value={values.category}
              onChange={(e) => set('category', e.target.value as Category)}
              className={inputCls}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="author" className={labelCls}>
              <span>Author</span>
            </label>
            <input
              id="author"
              type="text"
              value={values.author}
              onChange={(e) => set('author', e.target.value)}
              placeholder="Infocus-IT Team"
              className={inputCls}
              required
            />
          </div>
          <div>
            <label htmlFor="readtime" className={labelCls}>
              <span>Read time (min)</span>
            </label>
            <input
              id="readtime"
              type="number"
              min={1}
              max={60}
              value={values.readTime}
              onChange={(e) => set('readTime', Number(e.target.value))}
              className={inputCls}
              required
            />
          </div>
        </div>
      </fieldset>

      {/* Content group */}
      <fieldset className="space-y-5 rounded-xl border border-outline-variant bg-surface-lowest p-5 md:p-6">
        <legend className="sr-only">Post content</legend>

        <div>
          <label htmlFor="excerpt" className={labelCls}>
            <span>Excerpt</span>
            <Counter used={values.excerpt.length} max={LIMITS.excerpt} />
          </label>
          <textarea
            id="excerpt"
            rows={2}
            value={values.excerpt}
            onChange={(e) => set('excerpt', e.target.value.slice(0, LIMITS.excerpt))}
            placeholder="One-paragraph summary shown on the home page and in search results."
            className={inputCls}
            maxLength={LIMITS.excerpt}
            required
          />
        </div>

        <div>
          <label htmlFor="cover" className={labelCls}>
            <span>Cover image URL</span>
          </label>
          <input
            id="cover"
            type="url"
            value={values.coverImage}
            onChange={(e) => set('coverImage', e.target.value)}
            placeholder="https://…/image.jpg"
            className={`${inputCls} font-mono text-[12px]`}
            required
          />
          {values.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={values.coverImage}
              alt="Cover preview"
              className="mt-3 h-32 w-full rounded-md object-cover ghost-border"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
        </div>

        <div>
          <label htmlFor="body" className={labelCls}>
            <span>Body (HTML — use &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;)</span>
          </label>
          <textarea
            id="body"
            rows={18}
            value={values.content}
            onChange={(e) => set('content', e.target.value)}
            placeholder="<h2>Section</h2><p>Editorial content…</p>"
            className={`${inputCls} font-mono text-[12px] leading-relaxed`}
            required
          />
        </div>
      </fieldset>

      {/* Inline success / error, above the sticky action bar */}
      {message && (
        <div
          role="status"
          className={`flex items-start gap-2 rounded-md px-3 py-2 text-[13px] ${
            message.kind === 'success'
              ? 'bg-success/10 text-success'
              : 'bg-error/10 text-error'
          }`}
        >
          {message.kind === 'success' ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          ) : (
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          )}
          {message.text}
        </div>
      )}

      {/* STICKY ACTION BAR — always reachable without scrolling back */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-outline-variant bg-surface-lowest/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:pl-[calc(14rem+2.5rem)]">
          <div className="flex items-center gap-3 text-[12px]">
            {hasErrors ? (
              <span className="inline-flex items-center gap-1.5 text-warning">
                <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                {hasErrors}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-on-surface-muted">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                Ready to save
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {mode === 'edit' && (
              <button
                type="button"
                onClick={del}
                disabled={pending !== null}
                className="inline-flex items-center gap-1.5 rounded-md bg-error/10 px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-error transition-colors hover:bg-error/15 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending === 'delete' ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                Retire
              </button>
            )}
            <button
              type="button"
              onClick={() => submit('save')}
              disabled={pending !== null || !!hasErrors}
              className="cta-secondary inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-[12px] uppercase tracking-[0.08em] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending === 'save' ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <Save className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              Save draft
            </button>
            <button
              type="submit"
              disabled={pending !== null || !!hasErrors}
              className="cta-primary inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-[12px] uppercase tracking-[0.08em] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {pending === 'publish' ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {mode === 'create' ? 'Publish' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
