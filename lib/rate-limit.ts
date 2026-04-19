/**
 * Tiny in-memory sliding-window rate limiter.
 *
 * Stores recent hit timestamps per key. Prunes on every read.
 *
 * SCOPE LIMITATION:
 *   This limiter is per-process, per-Node-instance. On serverless platforms
 *   (Vercel Functions, Netlify Lambda) each invocation may land on a fresh
 *   instance, so limits reset opportunistically. Good enough to slow down
 *   casual brute force on a single-server deploy. For hardened production
 *   rate limiting on a serverless platform, swap this out for Upstash
 *   Ratelimit or a Supabase-backed counter.
 */

type Bucket = number[];
const store = new Map<string, Bucket>();

// Global periodic cleanup to prevent unbounded growth if keys stop being hit.
const CLEANUP_INTERVAL_MS = 60_000;
let cleanupTimer: NodeJS.Timeout | null = null;
function ensureCleanupScheduled(windowMs: number) {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const cutoff = Date.now() - windowMs;
    for (const [k, hits] of store.entries()) {
      const pruned = hits.filter((t) => t > cutoff);
      if (pruned.length === 0) store.delete(k);
      else store.set(k, pruned);
    }
  }, CLEANUP_INTERVAL_MS);
  // Don't keep the process alive just for this timer.
  if (typeof cleanupTimer.unref === 'function') cleanupTimer.unref();
}

export interface RateLimitResult {
  success: boolean;
  /** Hits used in the current window after this attempt. */
  count: number;
  /** Max hits allowed in the window. */
  limit: number;
  /** Epoch ms at which the earliest hit in the window expires. */
  reset: number;
  /** Seconds until the earliest hit expires (client-friendly Retry-After). */
  retryAfterSec: number;
}

/**
 * Sliding-window rate limit check. Returns success=false when the caller
 * has already exceeded `limit` hits within `windowMs`.
 *
 * The current attempt IS counted, regardless of success.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  ensureCleanupScheduled(windowMs);
  const now = Date.now();
  const cutoff = now - windowMs;
  const hits = (store.get(key) || []).filter((t) => t > cutoff);
  hits.push(now);
  store.set(key, hits);
  const earliest = hits[0] ?? now;
  const reset = earliest + windowMs;
  const retryAfterSec = Math.max(0, Math.ceil((reset - now) / 1000));
  return {
    success: hits.length <= limit,
    count: hits.length,
    limit,
    reset,
    retryAfterSec,
  };
}

/**
 * Extracts a best-effort client identifier from request headers.
 * Falls back to 'unknown' if no usable header exists.
 */
export function clientKey(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  const real = request.headers.get('x-real-ip');
  if (real) return real.trim();
  return 'unknown';
}
