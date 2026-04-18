'use client';

import Link from 'next/link';

const columns = [
  {
    title: 'Journal',
    links: ['Insights', 'Curation', 'Perspectives'],
  },
  {
    title: 'Agency',
    links: ['Masthead', 'Newsletter', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service'],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fade-in border-t border-gray-200 bg-[#f3f1ec] py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <span className="font-playfair text-xl font-bold tracking-tight text-gray-900">
              InFocusIT
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-600">
              A digital destination for those who seek depth in the age of speed. Curated daily for
              the security analyst.
            </p>
            <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
              © {currentYear} InFocusIT Editorial. Curated for the cyber mind.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-900">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-600 transition-colors hover:text-orange-600"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
