import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHeader } from '@/components/page-header';

export const metadata = {
  title: 'About | Infocus-IT',
  description: 'A digital destination for those who seek depth in the age of speed.',
};

const principles = [
  {
    title: 'Depth Over Velocity',
    body: 'The news cycle moves in hours; the threat landscape moves in years. We publish when the signal is clear — not when the noise is loudest.',
  },
  {
    title: 'Original Research',
    body: 'Every editorial begins with primary sources — telemetry, disclosure filings, disassembly. We cite what we read, and we name what we measure.',
  },
  {
    title: 'Defender-First',
    body: 'We write for the analyst reviewing alerts at 2 a.m., not the conference keynote. Practical mitigations sit beside every threat model we publish.',
  },
  {
    title: 'Durable Archiving',
    body: 'Nothing we publish disappears. Our archive is a load-bearing part of the product — because institutional memory is a security control.',
  },
];


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main id="main">

      <PageHeader
        kicker="About the Journal"
        title="A digital destination for the"
        accent="security analyst."
        subtitle="Infocus-IT is an independent editorial practice covering cybersecurity with the rigor of a research lab and the voice of a magazine."
      />

      {/* Mission */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label-overline">Our Mission</p>
          </div>
          <div className="md:col-span-8">
            <p className="font-playfair text-2xl leading-snug text-on-bg md:text-[2rem]">
              We document how adversaries actually operate, how defenders actually respond, and the
              quiet engineering decisions that shape both.
            </p>
            <p className="mt-6 text-[15px] leading-relaxed text-on-surface-variant">
              Founded to serve practitioners who were tired of vendor marketing dressed up as
              research, Infocus-IT publishes editorial content designed to survive the next hype
              cycle. Our work is read by CISOs, threat hunters, detection engineers, and the policy
              teams that write the rules they operate under.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <header className="mb-10">
            <h2 className="accent-bar font-playfair text-2xl font-semibold text-on-bg">
              Editorial Principles
            </h2>
          </header>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className="group relative overflow-hidden rounded-2xl bg-surface-lowest p-8 shadow-ambient-sm transition-transform hover:-translate-y-0.5"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 bg-gradient-signature opacity-0 transition-opacity group-hover:opacity-100"
                />
                <p className="font-playfair text-5xl font-bold text-gradient-signature">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 font-playfair text-xl font-semibold text-on-bg">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <figure className="flex items-center">
            <div aria-hidden="true" className="mr-8 w-1 self-stretch rounded-full bg-gradient-signature" />
            <div>
              <blockquote className="font-playfair text-3xl font-medium italic leading-[1.2] text-on-bg md:text-[2.5rem]">
                <span className="text-primary-ink">&ldquo;</span>Security is not a product we
                review. It is a discipline we practice — in the open, with receipts.
                <span className="text-primary-ink">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-on-surface-muted">
                — The Infocus-IT Manifesto
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

      {/* How we publish — replaces the old masthead. Honest about method. */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <header className="mb-10">
            <h2 className="accent-bar text-2xl font-bold text-on-bg">How we publish</h2>
          </header>

          <div className="rounded-2xl bg-surface-lowest p-8 shadow-ambient-sm md:p-10">
            <div className="flex items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                IT
              </div>
              <div>
                <p className="label-overline">Infocus-IT Team</p>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-on-surface-variant">
                  Every editorial is published under the <strong className="text-on-bg">Infocus-IT Team</strong> byline.
                  Our daily pipeline reads primary-source reporting from BleepingComputer,
                  The Hacker News, Krebs on Security, and Dark Reading, then drafts and revises
                  analysis under an editorial voice tuned for working defenders.
                </p>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-on-surface-variant">
                  We don&rsquo;t fabricate CVEs, victim names, or version numbers. When specifics
                  appear in an editorial, they came from the cited source. When they&rsquo;re
                  missing, we speak in categories and point you back to the vendor advisory.
                </p>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-on-surface-variant">
                  No vendor sponsorship. No ghostwritten expert bylines. One team byline, one
                  editorial voice, one newsletter a week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-2xl bg-surface-container p-8 shadow-ambient-sm md:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-signature opacity-20 blur-3xl"
            />
            <div className="relative grid grid-cols-1 items-start gap-8 md:grid-cols-2">
              <div>
                <p className="label-overline">Tips & Correspondence</p>
                <h3 className="mt-3 font-playfair text-3xl font-semibold tracking-tight text-on-bg md:text-[2.25rem]">
                  Have a story for us?
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-on-surface-variant">
                  We accept anonymous tips, vulnerability disclosures, and editorial pitches.
                  Reach the desk directly — we read every message.
                </p>
              </div>
              <div className="space-y-4 text-sm text-on-surface-variant">
                {[
                  { label: 'Newsroom', value: 'editor@infocusit.in' },
                  { label: 'Secure Tips', value: 'tips@infocusit.in · Signal available on request' },
                  { label: 'Editorial Pitches', value: 'pitch@infocusit.in' },
                ].map((row) => (
                  <div key={row.label} className="rounded-xl bg-surface-lowest p-4 shadow-ambient-sm">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-primary-ink">
                      {row.label}
                    </span>
                    <span className="mt-1 block text-on-bg">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
