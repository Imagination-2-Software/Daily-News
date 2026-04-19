import { LoginForm } from './login-form';

export const metadata = {
  title: 'Admin Login | Infocus-IT',
  robots: { index: false, follow: false },
};

// Admin login must bypass the parent admin layout (which has the sidebar).
// Next.js picks up app/admin/login/layout.tsx first, so we give it its own.

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <span className="wordmark text-[28px] uppercase leading-none">
            Infocus-<span className="text-on-bg">IT</span>
          </span>
          <p className="mt-6 label-overline">Control Room</p>
          <h1 className="mt-2 text-[1.75rem] font-extrabold leading-tight tracking-[-0.025em] text-on-bg">
            Sign in to continue
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            Enter your admin credentials to access the editorial dashboard.
          </p>
        </div>

        <div className="mt-8 rounded-lg bg-surface-lowest p-6 shadow-ambient-sm ghost-border">
          <LoginForm next={next} />
        </div>

        <p className="mt-6 text-center text-[11px] text-on-surface-muted">
          Credentials are configured via environment variables.
        </p>
      </div>
    </div>
  );
}
