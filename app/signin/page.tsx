import Link from 'next/link';
import { Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export const metadata = {
  title: 'Sign In | Infocus-IT',
  description: 'Sign in to manage your subscription and access the control room.',
};

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main id="main">
        <section className="relative overflow-hidden px-6 py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[48rem] -translate-x-1/2 bg-gradient-signature opacity-[0.07] blur-3xl"
          />
          <div className="relative mx-auto max-w-md">
            <div className="flex justify-center">
              <span className="inline-flex h-1.5 w-8 rounded-full bg-gradient-signature" aria-hidden="true" />
            </div>
            <p className="mt-6 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-ink">
              Restricted Entry
            </p>
            <h1 className="mt-4 text-center font-playfair text-4xl font-semibold tracking-tight text-on-bg md:text-[3rem]">
              Sign in.
            </h1>
            <p className="mt-4 text-center text-sm leading-relaxed text-on-surface-variant">
              Auth isn&rsquo;t wired up yet. For now, the control room at{' '}
              <Link href="/admin" className="text-primary-ink underline underline-offset-4 hover:text-primary-accent">
                /admin
              </Link>{' '}
              is open — lock it down with Supabase Auth before going public.
            </p>

            <form className="mt-10 space-y-4 rounded-2xl bg-surface-lowest p-6 shadow-ambient-sm">
              <div>
                <label htmlFor="signin-email" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.24em] text-on-surface-variant">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-muted"
                  />
                  <input
                    id="signin-email"
                    type="email"
                    placeholder="you@domain.com"
                    className="w-full rounded-lg bg-surface-low pl-10 pr-3 py-2.5 text-sm text-on-bg placeholder:text-on-surface-muted ghost-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
                  />
                </div>
              </div>
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-gradient-signature px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white opacity-60"
              >
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Send magic link (coming soon)
              </button>
            </form>

            <Link
              href="/"
              className="group mt-8 inline-flex w-full items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-on-surface-variant hover:text-primary-ink"
            >
              Back to dispatch
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
