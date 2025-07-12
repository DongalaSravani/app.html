import React, { useState } from 'react';

type EmotionResponse = {
  emotion: string;
  confidence: number;
};

export default function EmotionForm() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<EmotionResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const response = await fetch('http://localhost:8000/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="p-2 border rounded-md w-full"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How are you feeling?"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {loading && <p className="mt-4 text-center">Analyzing...</p>}

      {result && (
        <div className="mt-6 p-4 border rounded shadow bg-gray-100 text-center">
          <h2 className="text-lg font-semibold">Emotion Detected</h2>
          <p className="text-xl mt-2">{result.emotion}</p>
          <p className="text-sm text-gray-600">Confidence: {(result.confidence * 100).toFixed(1)}%</p>
        </div>
      )}
    </div>
  );
}
