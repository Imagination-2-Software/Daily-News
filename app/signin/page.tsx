import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export const metadata = {
  title: 'Sign In | InFocusIT',
  description: 'Sign in to manage your subscription and access the control room.',
};

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#faf8f4]">
      <Navbar />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-md">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
            Restricted Entry
          </p>
          <h1 className="mt-3 text-center font-playfair text-4xl font-bold tracking-tight text-gray-900">
            Sign in.
          </h1>
          <p className="mt-3 text-center text-sm leading-relaxed text-gray-600">
            Auth isn&rsquo;t wired up yet. For now, the control room at{' '}
            <Link href="/admin" className="text-orange-600 underline">
              /admin
            </Link>{' '}
            is open — lock it down with Supabase Auth before going public.
          </p>

          <form className="mt-10 space-y-4 rounded-lg bg-white p-6 ring-1 ring-gray-100">
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@domain.com"
                className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>
            <button
              type="button"
              disabled
              className="w-full rounded-sm bg-orange-700/50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white"
            >
              Send Magic Link (coming soon)
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
