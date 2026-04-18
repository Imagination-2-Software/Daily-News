export default function AdminSettingsPage() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
          Settings
        </p>
        <h1 className="mt-2 font-playfair text-4xl font-bold tracking-tight text-gray-900">
          Journal Settings.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
          Surface-level configuration for the journal. API keys and secrets live in environment
          variables — never in this panel.
        </p>
      </div>

      <section className="space-y-6">
        <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
            Brand
          </h2>
          <span className="h-[2px] w-16 bg-orange-600" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
              Journal Name
            </label>
            <input
              defaultValue="InFocusIT"
              className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
              Tagline
            </label>
            <input
              defaultValue="Curated for the security analyst."
              className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
            Newsletter
          </h2>
          <span className="h-[2px] w-16 bg-orange-600" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
              Provider
            </label>
            <select className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200">
              <option>Resend</option>
              <option>Buttondown</option>
              <option>ConvertKit</option>
              <option>None</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
              From Address
            </label>
            <input
              defaultValue="brief@infocusit.example"
              className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-700">
            Danger Zone
          </h2>
          <span className="h-[2px] w-16 bg-orange-600" />
        </div>

        <div className="flex items-center justify-between rounded-lg border-2 border-red-200 p-5">
          <div>
            <p className="font-playfair text-base font-semibold text-gray-900">
              Purge Archive Cache
            </p>
            <p className="text-xs text-gray-500">
              Rebuilds the static archive index. Live posts are not affected.
            </p>
          </div>
          <button className="rounded-sm border border-red-300 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-red-600 transition-colors hover:bg-red-50">
            Purge
          </button>
        </div>
      </section>

      <div className="flex items-center justify-end">
        <button className="rounded-sm bg-orange-700 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:bg-orange-800">
          Save Settings
        </button>
      </div>
    </div>
  );
}
