'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PromptHistory from './PromptHistory';

export default function PromptGenerator() {
  const [topic, setTopic] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const generatePrompt = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      setPrompt(data.prompt);
      setHistory((prev) => [data.prompt, ...prev].slice(0, 5));
    } catch (error) {
      console.error('Error generating prompt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={generatePrompt}
        disabled={isLoading || !topic}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
      >
        {isLoading ? 'Generating...' : 'Generate Prompt'}
      </motion.button>
      {prompt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Generated Prompt:</h2>
          <p className="text-gray-700 dark:text-gray-300">{prompt}</p>
          <button
            onClick={() => navigator.clipboard.writeText(prompt)}
            className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none"
          >
            Copy to Clipboard
          </button>
        </motion.div>
      )}
      <PromptHistory history={history} />
    </div>
  );
}

