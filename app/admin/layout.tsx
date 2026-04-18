import Link from 'next/link';

export const metadata = {
  title: 'Admin | InFocusIT',
  description: 'Editorial control room for the InFocusIT journal.',
};

const sidebar = [
  { label: 'Overview', href: '/admin' },
  { label: 'Posts', href: '/admin/posts' },
  { label: 'New Post', href: '/admin/posts/new' },
  { label: 'Automation', href: '/admin/automation' },
  { label: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#faf8f4]">
      <header className="border-b border-gray-200 bg-[#faf8f4]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-playfair text-xl font-bold italic text-orange-600">
              InFocusIT
            </Link>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500">
              Editorial Control Room
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-orange-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange-700">
              Signed in
            </span>
            <Link
              href="/"
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-600 transition-colors hover:text-orange-600"
            >
              View Site
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-10">
        <aside className="hidden w-56 shrink-0 md:block">
          <nav className="sticky top-8 space-y-1">
            {sidebar.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-700 transition-colors hover:bg-[#f0ece4] hover:text-orange-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
