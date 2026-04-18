import Parser from 'rss-parser';

const FEEDS = [
  'https://www.bleepingcomputer.com/feed/',
  'https://feeds.feedburner.com/TheHackersNews',
  'https://krebsonsecurity.com/feed/',
  'https://www.darkreading.com/rss_simple.asp',
];

export type Headline = {
  title: string;
  link: string;
  isoDate?: string;
  contentSnippet?: string;
  source: string;
};

export async function fetchTrendingHeadlines(limit = 20): Promise<Headline[]> {
  const parser = new Parser({ timeout: 15000 });
  const all: Headline[] = [];

  for (const url of FEEDS) {
    try {
      const feed = await parser.parseURL(url);
      const host = new URL(url).host;
      for (const item of feed.items ?? []) {
        if (!item.title || !item.link) continue;
        all.push({
          title: item.title.trim(),
          link: item.link,
          isoDate: item.isoDate,
          contentSnippet: item.contentSnippet?.slice(0, 400),
          source: host,
        });
      }
    } catch (err) {
      console.warn(`[rss] failed to parse ${url}:`, (err as Error).message);
    }
  }

  all.sort((a, b) => {
    const ta = a.isoDate ? new Date(a.isoDate).getTime() : 0;
    const tb = b.isoDate ? new Date(b.isoDate).getTime() : 0;
    return tb - ta;
  });

  return all.slice(0, limit);
}
