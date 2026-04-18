'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, UserCircle2, LogIn, Mail, LayoutDashboard } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const navItems = [
  { label: 'Insights', href: '/' },
  { label: 'Curation', href: '/curation' },
  { label: 'Perspectives', href: '/perspectives' },
  { label: 'Archives', href: '/archives' },
  { label: 'About', href: '/about' },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname.startsWith('/blog');
    return pathname.startsWith(href);
  };

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setAccountOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <>
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

          <div className="flex items-center gap-2">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className={`rounded-full p-2 transition-colors ${
                searchOpen ? 'bg-orange-100 text-orange-600' : 'text-gray-700 hover:bg-gray-100 hover:text-orange-600'
              }`}
            >
              <Search className="h-4 w-4" />
            </button>

            <div ref={accountRef} className="relative">
              <button
                aria-label="Account"
                onClick={() => setAccountOpen((v) => !v)}
                className={`rounded-full p-2 transition-colors ${
                  accountOpen ? 'bg-orange-100 text-orange-600' : 'text-gray-700 hover:bg-gray-100 hover:text-orange-600'
                }`}
              >
                <UserCircle2 className="h-5 w-5" />
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg ring-1 ring-black/5">
                  <div className="border-b border-gray-100 bg-[#f0ece4] px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-600">
                      Guest
                    </p>
                    <p className="mt-0.5 font-playfair text-sm font-semibold text-gray-900">
                      Not signed in.
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/signin"
                      className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-gray-700 transition-colors hover:bg-[#faf8f4] hover:text-orange-600"
                    >
                      <LogIn className="h-3.5 w-3.5" />
                      Sign In
                    </Link>
                    <a
                      href="#newsletter"
                      className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-gray-700 transition-colors hover:bg-[#faf8f4] hover:text-orange-600"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Weekly Brief
                    </a>
                    <Link
                      href="/admin"
                      className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-gray-700 transition-colors hover:bg-[#faf8f4] hover:text-orange-600"
                    >
                      <LayoutDashboard className="h-3.5 w-3.5" />
                      Control Room
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-orange-600 md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-gray-200 bg-[#faf8f4]">
            <form
              onSubmit={submitSearch}
              className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4"
            >
              <Search className="h-4 w-4 text-gray-500" />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search editorials, authors, topics…"
                className="flex-1 bg-transparent text-base font-playfair text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-sm bg-orange-700 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:bg-orange-800"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {mobileOpen && (
          <div className="border-t border-gray-200 bg-[#faf8f4] md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition-colors ${
                    isActive(item.href)
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-orange-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
