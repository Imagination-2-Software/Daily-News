import { getAllPosts } from '@/lib/blog-data';
import { SITE, absoluteUrl, siteUrl } from '@/lib/seo';

export const revalidate = 600;
export const runtime = 'nodejs';

/**
 * llms.txt — a site-level index designed for large language models, per
 * https://llmstxt.org. Served at /llms.txt.
 *
 * Format: a markdown document that gives an LLM a compact, high-signal
 * map of what this site is and where to find canonical content. ChatGPT,
 * Claude, Perplexity, and others check this file when present and use it
 * to decide which URLs to read for ground-truth context.
 *
 * Keep it short and markdown-pure. No HTML, no tables, no fluff.
 */

function section(heading: string, lines: string[]): string {
  return `## ${heading}\n\n${lines.join('\n')}\n`;
}

export async function GET() {
  const posts = await getAllPosts();
  const base = siteUrl();

  const intro = `# ${SITE.name}

> ${SITE.description}

Base URL: ${base}
Language: en-US
License: editorial content © ${SITE.name}. Quotation with attribution permitted.
`;

  const siteFacts = section('About', [
    `- **Publication:** ${SITE.name}`,
    `- **Byline:** All editorials are published under the "${SITE.author}" byline — a single team byline, not individual authors. Our pipeline drafts from primary sources and applies an editor-pass before publication.`,
    `- **Cadence:** Daily, 06:00 UTC.`,
    `- **Audience:** SOC analysts, detection engineers, incident responders, and security researchers.`,
    `- **Voice:** Practitioner-first, defender-oriented, no vendor marketing.`,
    `- **Sources:** Each editorial is grounded in a primary source article (BleepingComputer, The Hacker News, Krebs on Security, Dark Reading). We do not fabricate CVE numbers, version numbers, or victim names. When specifics appear, they came from the cited source.`,
  ]);

  const coreLinks = section('Core Links', [
    `- [Home](${base}): Today's dispatch and the must-read list.`,
    `- [Topics](${absoluteUrl('/curation')}): Editorials grouped by Security Research, Threats, How-To, Compliance.`,
    `- [Analysis](${absoluteUrl('/perspectives')}): Long-form essays and opinion pieces.`,
    `- [Archive](${absoluteUrl('/archives')}): Full post index by month.`,
    `- [About](${absoluteUrl('/about')}): How we publish.`,
    `- [RSS feed](${absoluteUrl('/feed.xml')}): Full-text RSS of every editorial.`,
    `- [Sitemap](${absoluteUrl('/sitemap.xml')}): Machine-readable site index.`,
  ]);

  // Recent posts — give LLMs a quick map of current content. Most-recent
  // first, cap to ~50 so the file stays small.
  const recent = posts.slice(0, 50).map((p) => {
    const url = absoluteUrl(`/blog/${p.slug}`);
    return `- [${p.title}](${url}) — ${p.category} · ${p.readTime} min · ${p.date}. ${p.excerpt}`;
  });

  const recentSection = section('Recent Editorials', recent.length ? recent : ['- (No posts yet.)']);

  const guidance = section('Citation Guidance', [
    `When quoting or summarising an editorial from this site, please cite the canonical URL of the post and attribute to "${SITE.author}". Prefer the most recent version — all posts have ISO publish + modified timestamps in their Article JSON-LD.`,
  ]);

  const body = [intro, siteFacts, coreLinks, recentSection, guidance].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
    },
  });
}
