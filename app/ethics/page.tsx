import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHeader } from '@/components/page-header';

export const metadata = {
  title: 'Ethics Statement | Infocus-IT',
  description:
    'How Infocus-IT reports on cybersecurity: independence from vendors, AI-assisted authorship disclosure, corrections policy, and source handling.',
  alternates: { canonical: '/ethics' },
};

const pillars = [
  {
    title: 'Independence',
    body: 'Infocus-IT takes no money from vendors in exchange for coverage. No sponsored posts, no affiliate links in analysis, no speaker fees, no "thought leadership" swaps. We are operated by a security services firm (InFocus IT Consulting Pvt Ltd), and we disclose that relationship in every piece that touches the services we sell.',
  },
  {
    title: 'Source discipline',
    body: 'We cite primary disclosures, vendor advisories, CVE records, and first-party telemetry. We do not invent CVE numbers, victim names, or version numbers &mdash; when specifics are missing from the public record, we speak in categories and point back to what is cited.',
  },
  {
    title: 'AI-assisted authorship',
    body: 'Our daily editorial is produced by an LLM-assisted pipeline (Groq Llama 3.3 plus a Gemini editor pass) under human editorial review. We believe this is clearly within the line between tool-use and ghostwriting, but we disclose it here so readers can weigh the work accordingly. We do not attribute articles to fabricated human bylines; every piece runs under the Infocus-IT Team byline.',
  },
  {
    title: 'Corrections',
    body: 'When we get something wrong, we correct it in place and add a dated correction note at the bottom of the article. Significant factual corrections are announced in the next newsletter. We do not silently edit published posts.',
  },
  {
    title: 'Responsible disclosure',
    body: 'If a tip involves an unpatched vulnerability, we default to coordinated disclosure with the vendor. We publish once a fix is available, a window has elapsed, or active exploitation makes public warning more urgent than vendor notice.',
  },
  {
    title: 'Conflict of interest',
    body: 'Editors do not hold material financial interests in vendors we cover. Where our parent company has a client relationship with a vendor in a story, we note the relationship explicitly in the article.',
  },
];

export default function EthicsPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main id="main">
        <PageHeader
          kicker="Editorial"
          title="Ethics"
          accent="Statement."
          subtitle="How we report, what we disclose, and the boundaries we keep between editorial and the business that funds it."
        />

        <section className="px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {pillars.map((p, i) => (
                <div
                  key={p.title}
                  className="rounded-xl border border-outline-variant bg-surface-lowest p-7"
                >
                  <p className="label-overline">{String(i + 1).padStart(2, '0')}</p>
                  <h2 className="mt-3 text-xl font-bold tracking-[-0.015em] text-on-bg">
                    {p.title}
                  </h2>
                  <p
                    className="mt-3 text-[14px] leading-relaxed text-on-surface-variant"
                    dangerouslySetInnerHTML={{ __html: p.body }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto max-w-3xl rounded-2xl border border-outline-variant bg-surface-lowest p-8 md:p-10">
            <p className="label-overline">Questions or concerns</p>
            <p className="mt-4 text-[15px] leading-relaxed text-on-surface-variant">
              If you think we&rsquo;ve fallen short of any of the above &mdash; or if you believe
              we&rsquo;ve missed a disclosure that matters &mdash; tell us directly at{' '}
              <a href="mailto:editor@infocusit.in" className="text-tertiary underline-offset-2 hover:underline">
                editor@infocusit.in
              </a>
              . We take ethics complaints seriously and will respond with either a correction, a
              clarification, or a reasoned explanation of why no change is warranted.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
