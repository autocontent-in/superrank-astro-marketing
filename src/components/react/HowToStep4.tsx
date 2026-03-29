export default function HowToStep4() {
  return (
    <div>
      <h3 className="text-base font-bold text-gray-900">Publish the content</h3>
      <p className="mt-2 text-sm text-gray-500">Your article is ready. Review, schedule, or publish instantly.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
          Review Article
        </button>
        <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
          Schedule Post
        </button>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Publish
        </button>
      </div>
    </div>
  );
}
