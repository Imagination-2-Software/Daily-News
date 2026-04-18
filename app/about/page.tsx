import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHeader } from '@/components/page-header';

export const metadata = {
  title: 'About | InFocusIT',
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

const masthead = [
  { role: 'Editor-in-Chief', name: 'Elena Rodriguez' },
  { role: 'Threat Intelligence Lead', name: 'Marcus Chen' },
  { role: 'Senior Security Researcher', name: 'Dr. Sarah Williams' },
  { role: 'Cryptography Editor', name: 'Prof. Alexander Norton' },
  { role: 'Incident Response Editor', name: 'David Kumar' },
  { role: 'Awareness & Training', name: 'James Peterson' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf8f4]">
      <Navbar />

      <PageHeader
        kicker="About the Journal"
        title="A digital destination for the"
        accent="security analyst."
        subtitle="InFocusIT is an independent editorial practice covering cybersecurity with the rigor of a research lab and the voice of a magazine."
      />

      {/* Mission */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
              Our Mission
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="font-playfair text-2xl leading-snug text-gray-900 md:text-3xl">
              We document how adversaries actually operate, how defenders actually respond, and the
              quiet engineering decisions that shape both.
            </p>
            <p className="mt-6 text-base leading-relaxed text-gray-600">
              Founded to serve practitioners who were tired of vendor marketing dressed up as
              research, InFocusIT publishes editorial content designed to survive the next hype
              cycle. Our work is read by CISOs, threat hunters, detection engineers, and the policy
              teams that write the rules they operate under.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between border-b border-gray-300 pb-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
              Editorial Principles
            </h2>
            <span className="h-[2px] w-16 bg-orange-600" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {principles.map((p, i) => (
              <div key={p.title} className="rounded-lg bg-[#f0ece4] p-8">
                <p className="font-playfair text-4xl font-bold text-orange-600">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 font-playfair text-xl font-semibold text-gray-900">
                  {p.title}.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <blockquote className="border-l-2 border-orange-600 pl-8">
            <p className="font-playfair text-3xl italic leading-snug text-gray-900 md:text-4xl">
              Security is not a product we review. It is a discipline we practice — in the open,
              with receipts.
            </p>
            <footer className="mt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
              — The InFocusIT Manifesto
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Masthead */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between border-b border-gray-300 pb-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
              Masthead
            </h2>
            <span className="h-[2px] w-16 bg-orange-600" />
          </div>

          <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            {masthead.map((m) => (
              <div key={m.name} className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-xs font-bold text-white">
                  {m.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-600">
                    {m.role}
                  </p>
                  <p className="font-playfair text-lg font-semibold text-gray-900">{m.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl rounded-lg border-2 border-orange-600 p-6 md:p-10">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
                Tips & Correspondence
              </p>
              <h3 className="mb-4 font-playfair text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Have a story for us?
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-gray-600">
                We accept anonymous tips, vulnerability disclosures, and editorial pitches.
                Reach the desk directly — we read every message.
              </p>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
                  Newsroom
                </span>
                desk@infocusit.example
              </p>
              <p>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
                  Secure Tips
                </span>
                tips@infocusit.example · Signal available on request
              </p>
              <p>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
                  Editorial Pitches
                </span>
                pitch@infocusit.example
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
