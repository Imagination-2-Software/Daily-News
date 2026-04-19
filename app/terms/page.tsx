import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHeader } from '@/components/page-header';

export const metadata = {
  title: 'Terms of Service | Infocus-IT',
  description:
    'Terms governing the use of Infocus-IT editorial content, the newsletter, and reader submissions. Read before you reuse or republish.',
  alternates: { canonical: '/terms' },
};

const LAST_UPDATED = 'April 19, 2026';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main id="main">
        <PageHeader
          kicker="Legal"
          title="Terms of"
          accent="Service."
          subtitle="The rules of the road for reading, subscribing to, and contributing to Infocus-IT."
        />

        <section className="px-6 py-12">
          <div className="mx-auto max-w-3xl space-y-10 text-[15px] leading-relaxed text-on-surface-variant">
            <p className="text-on-surface-muted">Last updated: {LAST_UPDATED}</p>

            <div>
              <h2 className="text-xl font-bold text-on-bg">1. Who these terms apply to</h2>
              <p className="mt-3">
                By accessing Infocus-IT (&ldquo;the Publication&rdquo;) you agree to these terms.
                The Publication is operated by{' '}
                <strong className="text-on-bg">InFocus IT Consulting Pvt Ltd</strong>
                {' '}(&ldquo;we&rdquo;, &ldquo;us&rdquo;), registered in Delhi, India. If you do
                not agree, please stop using the site.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-on-bg">2. Editorial content, not security advice</h2>
              <p className="mt-3">
                Every article on Infocus-IT is editorial analysis intended for informed professionals.
                It is <strong className="text-on-bg">not</strong> a substitute for tailored security
                consulting, formal risk assessment, or legal counsel. Apply anything you read with
                the help of your own security and legal teams before acting on it in production.
              </p>
              <p className="mt-3">
                We make no warranty that editorial content is accurate, current, or complete. We
                correct errors when we learn of them (see our{' '}
                <a href="/ethics" className="text-tertiary hover:underline">Ethics Statement</a>)
                but we disclaim liability for decisions made in reliance on the Publication.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-on-bg">3. Copyright and reuse</h2>
              <p className="mt-3">
                All original Infocus-IT editorial is &copy;{' '}
                {new Date().getFullYear()} InFocus IT Consulting Pvt Ltd, all rights reserved.
                You may:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Share links freely.</li>
                <li>
                  Quote short excerpts (up to ~200 words) with attribution and a link back to the
                  original post.
                </li>
                <li>
                  Use articles in academic citation per normal fair-use conventions.
                </li>
              </ul>
              <p className="mt-3">
                Full-text republication, translation, or inclusion in a training dataset requires
                written permission &mdash; request at{' '}
                <a href="mailto:editor@infocusit.in" className="text-tertiary hover:underline">
                  editor@infocusit.in
                </a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-on-bg">4. Reader submissions</h2>
              <p className="mt-3">
                When you send us a tip, pitch, or correction, you grant us a non-exclusive,
                royalty-free licence to use the facts contained in that submission for editorial
                purposes. You retain copyright in any original text, images, or documents you
                attach. We will not attribute you by name unless you explicitly ask us to.
              </p>
              <p className="mt-3">
                Do not send material you had no lawful right to access. Do not send unredacted
                personal data of third parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-on-bg">5. Newsletter</h2>
              <p className="mt-3">
                Subscribing is free. You can unsubscribe from every email with a single click, or
                visit{' '}
                <a href="/unsubscribe" className="text-tertiary hover:underline">/unsubscribe</a>.
                We may pause or discontinue the newsletter with reasonable notice.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-on-bg">6. Acceptable use</h2>
              <p className="mt-3">You agree not to:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Scrape the site at a rate that degrades availability for other readers.</li>
                <li>
                  Train commercial language models on our content without a licence &mdash; see
                  section 3.
                </li>
                <li>Use the site to distribute malware, run automated attacks, or probe for vulnerabilities outside a disclosure programme.</li>
                <li>Impersonate Infocus-IT, our staff, or our authors.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-on-bg">7. Third-party links</h2>
              <p className="mt-3">
                We link out to vendor advisories, public disclosures, and primary sources. We have
                no control over those sites and are not responsible for their content, privacy
                practices, or availability.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-on-bg">8. Governing law</h2>
              <p className="mt-3">
                These terms are governed by the laws of India. Any dispute arising from or in
                connection with the Publication is subject to the exclusive jurisdiction of the
                courts of Delhi.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-on-bg">9. Changes</h2>
              <p className="mt-3">
                We may update these terms from time to time. Material changes will be noted with a
                new &ldquo;last updated&rdquo; date above and, where significant, announced in the
                newsletter.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-on-bg">10. Contact</h2>
              <p className="mt-3">
                Questions about these terms:{' '}
                <a href="mailto:support@infocus-it.com" className="text-tertiary hover:underline">
                  support@infocus-it.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
