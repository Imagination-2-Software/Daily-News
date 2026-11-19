import NewsSeoApp from '@/components/news-seo/news-seo-app';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI News SEO Assistant & Hindi Editorial Studio',
  description: 'Complete professional Hindi News SEO, Discover optimization, fact checking, and editorial publishing workspace.',
};

export default function NewsSeoPage() {
  return <NewsSeoApp />;
}
