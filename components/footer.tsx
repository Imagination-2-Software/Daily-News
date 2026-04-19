'use client';

import Link from 'next/link';
import { ArrowUpRight, Linkedin, Youtube, Rss, Mail } from 'lucide-react';
import { FooterNewsletter } from '@/components/footer-newsletter';

const columns = [
  {
    title: 'Journal',
    links: [
      { label: 'Latest', href: '/' },
      { label: 'Topics', href: '/curation' },
      { label: 'Analysis', href: '/perspectives' },
      { label: 'Archive', href: '/archives' },
    ],
  },
  {
    title: 'Newsroom',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Daily Brief', href: '/#newsletter' },
      { label: 'Submit a Tip', href: '/submit-tip' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Ethics Statement', href: '/ethics' },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-surface-container">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 bg-gradient-signature opacity-[0.06] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* BRAND BLOCK */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block" aria-label="Infocus-IT home">
              <span className="wordmark text-[26px] uppercase leading-none">
                Infocus-<span className="text-on-bg">IT</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-on-surface-variant">
              A digital destination for those who seek depth in the age of speed. Curated daily for
              the security analyst — no hype, no marketing, just research.
            </p>

            {/* Inline newsletter capture — client component, hits the real API */}
            <FooterNewsletter />

            <div className="mt-8 flex items-center gap-3">
              <SocialIcon
                href="https://www.linkedin.com/company/infocuit/"
                label="InFocus IT on LinkedIn"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </SocialIcon>
              <SocialIcon
                href="https://www.youtube.com/@infocusit"
                label="InFocus IT on YouTube"
              >
                <Youtube className="h-4 w-4" aria-hidden="true" />
              </SocialIcon>
              <SocialIcon href="/feed.xml" label="RSS feed">
                <Rss className="h-4 w-4" aria-hidden="true" />
              </SocialIcon>
              <SocialIcon href="mailto:editor@infocusit.in" label="Email the editor">
                <Mail className="h-4 w-4" aria-hidden="true" />
              </SocialIcon>
            </div>
          </div>

          {/* LINK COLUMNS */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-ink">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-[12px] font-medium text-on-surface-variant transition-colors hover:text-primary-ink"
                      >
                        {link.label}
                        <ArrowUpRight
                          className="h-3 w-3 -translate-x-0.5 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-outline-variant/40 pt-6 md:flex-row md:items-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-on-surface-muted">
            © {currentYear} Infocus-IT Editorial · Curated for the cyber mind.
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-on-surface-muted">
            Published daily · Independent · No vendor sponsorship
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-lowest text-on-surface-variant shadow-ambient-sm transition-colors hover:text-primary-ink"
    >
      {children}
    </Link>
  );
}
