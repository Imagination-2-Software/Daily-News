'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User } from 'lucide-react';

const navItems = [
  { label: 'Insights', href: '/' },
  { label: 'Curation', href: '/curation' },
  { label: 'Perspectives', href: '/perspectives' },
  { label: 'Archives', href: '/archives' },
  { label: 'About', href: '/about' },
];

export function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname.startsWith('/blog');
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-[#faf8f4]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center">
          <span className="font-playfair text-xl font-bold italic tracking-tight text-orange-600">
            InFocusIT
          </span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                isActive(item.href)
                  ? 'text-orange-600 underline underline-offset-8 decoration-orange-600'
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="text-gray-700 transition-colors hover:text-orange-600"
          >
            <Search className="h-4 w-4" />
          </button>
          <Link
            href="/admin"
            aria-label="Account"
            className="text-gray-700 transition-colors hover:text-orange-600"
          >
            <User className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
