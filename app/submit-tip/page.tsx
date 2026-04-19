import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHeader } from '@/components/page-header';
import { ShieldCheck, Mail, Lock, FileWarning } from 'lucide-react';

export const metadata = {
  title: 'Submit a Tip | Infocus-IT',
  description:
    'How to send the Infocus-IT newsroom a confidential tip, vulnerability disclosure, or breach report — including encrypted and anonymous options.',
  alternates: { canonical: '/submit-tip' },
};

const guidelines = [
  {
    icon: FileWarning,
    title: 'What we want',
    body: 'Breach reports, vulnerability disclosures, leaked data samples (with redactions), insider accounts of security failures, CVE pre-disclosures you think should be public, and primary-source documents.',
  },
  {
    icon: ShieldCheck,
    title: 'What we verify',
    body: 'We corroborate every tip against vendor advisories, telemetry, or a second source before publishing. Unverifiable tips still inform our coverage — we just won\u2019t attribute claims to an anonymous single source.',
  },
  {
    icon: Lock,
    title: 'How we protect sources',
    body: 'We do not log IP addresses for tip submissions, do not store email contents beyond the active investigation, and will refuse to confirm or deny any source relationship. Requests for legal protection are taken seriously.',
  },
];

export default function SubmitTipPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main id="main">
        <PageHeader
          kicker="Submit a Tip"
          title="Send the newsroom a"
          accent="confidential tip."
          subtitle="Tips drive our best work. Here is how to send one in a way that protects you and helps us move quickly."
        />

        {/* Channels */}
        <section className="px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-outline-variant bg-surface-lowest p-8">
                <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
                <h2 className="mt-4 text-xl font-bold tracking-[-0.015em] text-on-bg">
                  Email (preferred)
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-on-surface-variant">
                  For most tips, plain email is fine. Include as much detail as you\u2019re comfortable with:
                  what you saw, when, how you came across it, and any supporting artefacts.
                </p>
                <a
                  href="mailto:tips@infocusit.in"
                  className="mt-5 inline-block break-all text-lg font-semibold text-on-bg hover:text-primary"
                >
                  tips@infocusit.in
                </a>
              </div>

              <div className="rounded-xl border border-outline-variant bg-surface-lowest p-8">
                <Lock className="h-6 w-6 text-tertiary" aria-hidden="true" />
                <h2 className="mt-4 text-xl font-bold tracking-[-0.015em] text-on-bg">
                  Encrypted &amp; anonymous
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-on-surface-variant">
                  If the subject is sensitive, send from a throwaway ProtonMail or Tuta address, or
                  ask us for our Signal number in an initial message from any address. Do NOT send
                  source material from a corporate device or network.
                </p>
                <p className="mt-5 text-[13px] text-on-surface-muted">
                  Signal / PGP details shared on request from{' '}
                  <a
                    href="mailto:tips@infocusit.in"
                    className="text-tertiary underline-offset-2 hover:underline"
                  >
                    tips@infocusit.in
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Guidelines */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-7xl">
            <header className="mb-8">
              <h2 className="accent-bar text-2xl font-bold text-on-bg">Before you send</h2>
            </header>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {guidelines.map((g) => {
                const Icon = g.icon;
                return (
                  <div
                    key={g.title}
                    className="rounded-xl border border-outline-variant bg-surface-lowest p-6"
                  >
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h3 className="mt-3 text-base font-bold tracking-[-0.015em] text-on-bg">
                      {g.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-on-surface-variant">
                      {g.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Important — legal + operational notes */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-tertiary/30 bg-tertiary-container/50 p-8 md:p-10">
              <p className="label-overline">Important</p>
              <ul className="mt-4 space-y-3 text-[14px] leading-relaxed text-on-surface-variant">
                <li>
                  Do not break the law to obtain documents. We cannot publish material you had no
                  lawful right to access, and we will not put sources in legal jeopardy.
                </li>
                <li>
                  Do not send unsolicited personal data of third parties. Redact names, phone
                  numbers, and identifiers before sending anything we might republish.
                </li>
                <li>
                  If you&rsquo;re reporting an active vulnerability in a specific product, please
                  tell us whether you&rsquo;ve already contacted the vendor. We default to
                  coordinated disclosure unless a public-interest case overrides that.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
