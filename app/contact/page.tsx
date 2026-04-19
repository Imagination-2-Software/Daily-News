import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHeader } from '@/components/page-header';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Contact | Infocus-IT',
  description:
    'Reach the Infocus-IT editorial desk for tips, pitches, corrections, or partnership enquiries. Direct email and phone for InFocus IT Consulting Pvt Ltd.',
  alternates: { canonical: '/contact' },
};

const editorialChannels = [
  {
    label: 'Editorial desk',
    value: 'editor@infocusit.in',
    body: 'Corrections, republication requests, and general press enquiries.',
  },
  {
    label: 'Story tips',
    value: 'tips@infocusit.in',
    body: 'Breach tips, vulnerability disclosures, source material. Anonymous submissions welcome.',
    href: '/submit-tip',
    hrefLabel: 'Submission guide',
  },
  {
    label: 'Editorial pitches',
    value: 'pitch@infocusit.in',
    body: 'Guest analysis, research collaborations, and long-form pitches.',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main id="main">
        <PageHeader
          kicker="Contact"
          title="Reach the"
          accent="editorial desk."
          subtitle="We read every message. Use the right channel below so your note lands with the person who can help."
        />

        {/* Editorial contact channels */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <header className="mb-8">
              <h2 className="accent-bar text-2xl font-bold text-on-bg">Editorial channels</h2>
            </header>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {editorialChannels.map((ch) => (
                <div
                  key={ch.label}
                  className="rounded-xl border border-outline-variant bg-surface-lowest p-6"
                >
                  <p className="label-overline">{ch.label}</p>
                  <p className="mt-3 break-all text-lg font-semibold text-on-bg">{ch.value}</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-on-surface-variant">
                    {ch.body}
                  </p>
                  {ch.href && (
                    <Link
                      href={ch.href}
                      className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-primary hover:text-primary-hover"
                    >
                      {ch.hrefLabel}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Business / corporate — real parent company */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-7xl">
            <header className="mb-8">
              <h2 className="accent-bar text-2xl font-bold text-on-bg">
                Security services &amp; corporate
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-on-surface-variant">
                Infocus-IT is the editorial arm of{' '}
                <strong className="text-on-bg">InFocus IT Consulting Pvt Ltd</strong>, a CERT-In
                empanelled cybersecurity auditor. For VAPT, compliance audits (ISO 27001, SOC 2,
                DPDP Act, SEBI/RBI), or vCISO engagements, contact the services team directly.
              </p>
            </header>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="flex items-start gap-4 rounded-xl border border-outline-variant bg-surface-lowest p-6">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="label-overline">Email</p>
                  <a
                    href="mailto:support@infocus-it.com"
                    className="mt-2 block break-all text-[15px] font-semibold text-on-bg hover:text-primary"
                  >
                    support@infocus-it.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-outline-variant bg-surface-lowest p-6">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="label-overline">Phone</p>
                  <a
                    href="tel:+918178210903"
                    className="mt-2 block text-[15px] font-semibold text-on-bg hover:text-primary"
                  >
                    +91&nbsp;81782&nbsp;10903
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-outline-variant bg-surface-lowest p-6">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="label-overline">Registered office</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-on-surface-variant">
                    A-19, Yadav Park, Rohtak Road
                    <br />
                    Behind Bank of Baroda
                    <br />
                    West Delhi&nbsp;110041, India
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="https://infocus-it.com/contact/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm"
              >
                Consult with the services team
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
