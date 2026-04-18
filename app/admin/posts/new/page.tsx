const categories = ['Security Research', 'Threats', 'How-To', 'Compliance'];

export default function AdminNewPostPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
          Draft
        </p>
        <h1 className="mt-2 font-playfair text-4xl font-bold tracking-tight text-gray-900">
          New Editorial.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
          Start a new piece from scratch, or use the automation panel to generate a first draft
          from a prompt.
        </p>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="The title of the editorial"
              className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
              Slug
            </label>
            <input
              type="text"
              placeholder="auto-generated-from-title"
              className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
              Category
            </label>
            <select className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200">
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
              Author
            </label>
            <input
              type="text"
              placeholder="Byline"
              className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
              Read Time (min)
            </label>
            <input
              type="number"
              min={1}
              placeholder="10"
              className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
            Excerpt
          </label>
          <textarea
            rows={2}
            placeholder="A one-paragraph summary that surfaces on the insights page."
            className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
            Cover Image URL
          </label>
          <input
            type="text"
            placeholder="/images/my-cover.jpg"
            className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700">
            Body (HTML)
          </label>
          <textarea
            rows={14}
            placeholder="<h2>Section</h2><p>Editorial content...</p>"
            className="w-full rounded-sm border border-gray-200 bg-white px-3 py-2 font-mono text-xs focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            className="rounded-sm border border-gray-300 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-700 transition-colors hover:border-orange-600 hover:text-orange-600"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="rounded-sm bg-orange-700 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:bg-orange-800"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
