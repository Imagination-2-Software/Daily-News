import { AlertTriangle, Save } from 'lucide-react';

const inputCls =
  'w-full rounded-lg bg-surface-low ghost-border px-3.5 py-2.5 text-sm text-on-bg placeholder:text-on-surface-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:border-transparent';
const labelCls =
  'mb-2 block text-[10px] font-semibold uppercase tracking-[0.24em] text-on-surface-variant';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-3">
          <span className="inline-flex h-1.5 w-8 rounded-full bg-gradient-signature" aria-hidden="true" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-ink">
            Settings
          </p>
        </div>
        <h1 className="mt-4 font-playfair text-4xl font-semibold tracking-tight text-on-bg md:text-[3rem]">
          Journal Settings.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
          Surface-level configuration for the journal. API keys and secrets live in environment
          variables — never in this panel.
        </p>
      </div>

      <section className="rounded-2xl bg-surface-lowest p-6 shadow-ambient-sm md:p-8">
        <header className="mb-6">
          <h2 className="accent-bar font-playfair text-xl font-semibold text-on-bg">Brand</h2>
        </header>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="brand-name" className={labelCls}>Journal name</label>
            <input id="brand-name" defaultValue="Infocus-IT" className={inputCls} />
          </div>
          <div>
            <label htmlFor="brand-tag" className={labelCls}>Tagline</label>
            <input id="brand-tag" defaultValue="Curated for the security analyst." className={inputCls} />
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-surface-lowest p-6 shadow-ambient-sm md:p-8">
        <header className="mb-6">
          <h2 className="accent-bar font-playfair text-xl font-semibold text-on-bg">Newsletter</h2>
        </header>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="nl-provider" className={labelCls}>Provider</label>
            <select id="nl-provider" className={inputCls}>
              <option>Resend</option>
              <option>Buttondown</option>
              <option>ConvertKit</option>
              <option>None</option>
            </select>
          </div>
          <div>
            <label htmlFor="nl-from" className={labelCls}>From address</label>
            <input id="nl-from" defaultValue="brief@infocusit.example" className={inputCls} />
          </div>
        </div>
      </section>

      <section>
        <header className="mb-6">
          <h2 className="accent-bar font-playfair text-xl font-semibold text-on-bg">Danger Zone</h2>
        </header>
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-error/5 p-6 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-error/15 text-error">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="font-playfair text-base font-semibold text-on-bg">
                Purge archive cache
              </p>
              <p className="mt-1 text-xs text-on-surface-muted">
                Rebuilds the static archive index. Live posts are not affected.
              </p>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-error/10 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-error transition-colors hover:bg-error/15">
            Purge
          </button>
        </div>
      </section>

      <div className="flex items-center justify-end">
        <button className="cta-primary inline-flex items-center gap-2 rounded-lg px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em]">
          <Save className="h-3.5 w-3.5" aria-hidden="true" />
          Save settings
        </button>
      </div>
    </div>
  );
}
