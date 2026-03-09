import { useState } from 'react';

export default function HowToStep3() {
  const [progress] = useState(65);

  return (
    <div>
      <h3 className="text-base font-bold text-gray-900">AI generates the content</h3>
      <p className="mt-2 text-sm text-gray-500">Our AI writes your article in seconds.</p>
      <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50/50 p-4">
        <p className="text-sm font-medium text-gray-700">Generating content...</p>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: '#a3e635' }}
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">{progress}% complete</p>
      </div>
    </div>
  );
}
