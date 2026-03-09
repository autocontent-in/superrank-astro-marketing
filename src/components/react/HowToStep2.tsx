import { useState } from 'react';

export default function HowToStep2() {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('');

  return (
    <div>
      <h3 className="text-base font-bold text-gray-900">Create Article Field</h3>
      <p className="mt-2 text-sm text-gray-500">Fill in the details and our AI will generate your content.</p>
      <form
        className="mt-4 space-y-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
        <input
          type="text"
          placeholder="Keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
        >
          <option value="">Tone</option>
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="formal">Formal</option>
        </select>
        <button
          type="submit"
          className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Generate Article
        </button>
      </form>
    </div>
  );
}
