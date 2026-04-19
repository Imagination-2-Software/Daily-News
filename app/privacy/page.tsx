import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHeader } from '@/components/page-header';

export const metadata = {
  title: 'Privacy Policy | Infocus-IT',
  description:
    'How Infocus-IT collects, stores, and uses reader data — newsletter subscriptions, analytics, cookies, and your rights under DPDP Act and GDPR.',
  alternates: { canonical: '/privacy' },
};

const LAST_UPDATED = 'April 19, 2026';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main id="main">
        <PageHeader
          kicker="Legal"
          title="Privacy"
          accent="Policy."
          subtitle="What data we collect, why we collect it, and the rights you have over it. Short version: we collect as little as possible, we don't sell anything, and you can leave any time."
        />

        <section className="px-6 py-12">
          <div className="mx-auto max-w-3xl space-y-10 text-[15px] leading-relaxed text-on-surface-variant">
            <p className="text-on-surface-muted">Last updated: {LAST_UPDATED}</p>

            <div>
              <h2 className="text-xl font-bold text-on-bg">Who we are</h2>
              <p className="mt-3">
                Infocus-IT (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is the editorial publication operated
                by <strong className="text-on-bg">InFocus IT Consulting Pvt Ltd</strong>, a
                CERT-In empanelled cybersecurity firm registered in Delhi, India. Contact for
                privacy questions: <a href="mailto:support@infocus-it.com" className="text-tertiary hover:underline">support@infocus-it.com</a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-on-bg">What we collect</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-on-bg">Newsletter subscribers:</strong> email address,
                  subscription timestamp, and unsubscribe token. Collected only when you
                  voluntarily submit the subscription form.
                </li>
                <li>
                  <strong className="text-on-bg">Analytics:</strong> aggregate pageviews and
                  referrers via Vercel Analytics. IP addresses are truncated at collection. We do
                  not use third-party advertising or behavioural-tracking cookies.
                </li>
                <li>
                  <strong className="text-on-bg">Tips and correspondence:</strong> anything you
                  send to our editorial addresses. We handle these per the{' '}
                  <a href="/submit-tip" className="text-tertiary hover:underline">
                    Submit a Tip
                  </a>{' '}
                  guidelines.
                </li>
                <li>
                  <strong className="text-on-bg">Server logs:</strong> standard request logs (URL,
                  status code, user-agent) retained for up to 30 days for abuse prevention.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-on-bg">What we don&rsquo;t collect</h2>
              <p className="mt-3">
                We do not run advertising, behavioural profiling, cross-site tracking pixels,
                session recording, or fingerprinting. We do not sell data to anyone, for any price.
                We do not share subscriber lists with partners.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-on-bg">How we use it</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  Your email is used solely to deliver the daily or weekly newsletter you subscribed
                  to, plus occasional important notices about changes to the publication.
                </li>
                <li>
                  Analytics inform editorial decisions (what topics resonate, what platforms our
                  readers use) in aggregate only.
                </li>
                <li>
                  Correspondence is read, investigated where appropriate, and retained in our
                  mail system.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-on-bg">Where your data lives</h2>
              <p className="mt-3">
                Subscriber records are stored in Supabase (EU region). Email delivery is handled by
                our transactional SMTP provider. Site hosting is on Vercel. Each of these vendors
                is contractually bound to process data only on our instructions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-on-bg">Your rights</h2>
              <p className="mt-3">
                Under India&rsquo;s <strong className="text-on-bg">Digital Personal Data
                Protection Act, 2023</strong> and the EU <strong className="text-on-bg">GDPR</strong>{' '}
                (where applicable), you may:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Request a copy of the personal data we hold on you.</li>
                <li>Ask us to correct or delete that data.</li>
                <li>Unsubscribe from the newsletter at any time &mdash; every email has a one-click unsubscribe link, and{' '}
                  <a href="/unsubscribe" className="text-tertiary hover:underline">/unsubscribe</a>{' '}
                  works without login.
                </li>
                <li>Withdraw consent for any processing that relies on it.</li>
                <li>Lodge a complaint with the Data Protection Board of India or your local EU DPA.</li>
              </ul>
              <p className="mt-3">
                Send requests to{' '}
                <a href="mailto:support@infocus-it.com" className="text-tertiary hover:underline">
                  support@infocus-it.com
                </a>
                . We respond within 30 days.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-on-bg">Cookies</h2>
              <p className="mt-3">
                We use a single essential cookie for admin authentication (set only when an editor
                logs in to <code className="rounded bg-surface-container px-1.5 py-0.5 text-[13px]">/admin</code>).
                No cookies are set for regular readers.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-on-bg">Children</h2>
              <p className="mt-3">
                Infocus-IT is written for working adult professionals. We do not knowingly collect
                data from anyone under 18.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-on-bg">Changes</h2>
              <p className="mt-3">
                Material changes to this policy are announced in the newsletter at least 14 days
                before taking effect. The &ldquo;last updated&rdquo; date above always reflects
                the current version.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
