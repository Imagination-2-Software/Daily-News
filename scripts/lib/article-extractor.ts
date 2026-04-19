/**
 * Fetches the readable body of an article via Jina Reader.
 *
 *   https://jina.ai/reader
 *
 * Takes any article URL and returns a clean, LLM-friendly representation
 * of its content. Without this, the pipeline only has the RSS headline +
 * 200-char snippet and the model has to fabricate specifics from training
 * data. With it, the model writes grounded analysis based on the real
 * story text.
 *
 * Failure modes are non-fatal: if Jina rate-limits us, returns 5xx, or
 * the target site blocks scraping, we return null and let the caller fall
 * back to headline-only prompting. The pipeline still publishes a post.
 */

const JINA_READER_BASE = 'https://r.jina.ai/';
const MAX_CHARS = 6000; // Keep prompt tokens reasonable.
const FETCH_TIMEOUT_MS = 30_000;

export interface ExtractedArticle {
  body: string;
  truncated: boolean;
  /** Host of the source URL — useful in logs. */
  source: string;
}

/**
 * Fetch article body via Jina Reader.
 *
 * @returns markdown-formatted article body, or null on any failure.
 */
export async function fetchArticleBody(
  url: string,
): Promise<ExtractedArticle | null> {
  const apiKey = process.env.JINA_API_KEY;

  const headers: Record<string, string> = {
    Accept: 'text/plain',
    // Strip navigation, comments, sidebars — keep the main article.
    'X-Remove-Selector': 'nav, header, footer, aside, .sidebar, .comments, .ad',
    // Return plain text so we're not wasting tokens on markdown syntax.
    'X-Return-Format': 'markdown',
    // Jina caches responses; 24h is fine for a daily cron.
    'X-No-Cache': 'false',
  };
  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  let res: Response;
  try {
    res = await fetch(`${JINA_READER_BASE}${url}`, {
      method: 'GET',
      headers,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
  } catch (err) {
    console.warn(`[jina] network error for ${url}:`, (err as Error).message);
    return null;
  }

  if (!res.ok) {
    console.warn(`[jina] HTTP ${res.status} for ${url}`);
    return null;
  }

  const raw = await res.text();
  const trimmed = raw.trim();
  if (trimmed.length < 100) {
    // Jina returns a stub for paywall/login pages. Better to skip.
    console.warn(`[jina] suspiciously short body (${trimmed.length} chars) for ${url}`);
    return null;
  }

  const truncated = trimmed.length > MAX_CHARS;
  const body = truncated ? trimmed.slice(0, MAX_CHARS) : trimmed;

  let source = '';
  try {
    source = new URL(url).host;
  } catch {
    source = '';
  }

  return { body, truncated, source };
}
