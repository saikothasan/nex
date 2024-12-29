'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PromptHistory from './PromptHistory';
import { Sliders, RefreshCw, Copy, Check, Save, Trash2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PromptGenerator() {
  const [topic, setTopic] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [tone, setTone] = useState('neutral');
  const [length, setLength] = useState('medium');
  const [genre, setGenre] = useState('general');
  const [copied, setCopied] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<string[]>([]);

  useEffect(() => {
    const savedPromptsFromStorage = localStorage.getItem('savedPrompts');
    if (savedPromptsFromStorage) {
      setSavedPrompts(JSON.parse(savedPromptsFromStorage));
    }
  }, []);

  const generatePrompt = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, tone, length, genre }),
      });
      const data = await response.json();
      setPrompt(data.prompt);
      setHistory((prev) => [data.prompt, ...prev].slice(0, 5));
      toast.success('Prompt generated successfully!');
    } catch (error) {
      console.error('Error generating prompt:', error);
      toast.error('Failed to generate prompt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    toast.success('Prompt copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const savePrompt = () => {
    const updatedSavedPrompts = [...savedPrompts, prompt];
    setSavedPrompts(updatedSavedPrompts);
    localStorage.setItem('savedPrompts', JSON.stringify(updatedSavedPrompts));
    toast.success('Prompt saved successfully!');
  };

  const deleteSavedPrompt = (index: number) => {
    const updatedSavedPrompts = savedPrompts.filter((_, i) => i !== index);
    setSavedPrompts(updatedSavedPrompts);
    localStorage.setItem('savedPrompts', JSON.stringify(updatedSavedPrompts));
    toast.info('Prompt deleted from saved list.');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 relative">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-lg"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowSettings(!showSettings)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 focus:outline-none"
        >
          <Sliders size={24} />
        </motion.button>
      </div>
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="neutral">Neutral</option>
                  <option value="formal">Formal</option>
                  <option value="casual">Casual</option>
                  <option value="humorous">Humorous</option>
                  <option value="inspirational">Inspirational</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Length</label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Genre</label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="general">General</option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="poetry">Poetry</option>
                  <option value="academic">Academic</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={generatePrompt}
        disabled={isLoading || !topic}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 text-lg"
      >
        {isLoading ? (
          <RefreshCw className="animate-spin mx-auto" size={24} />
        ) : (
          'Generate Prompt'
        )}
      </motion.button>
      {prompt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300">Generated Prompt:</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{prompt}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyToClipboard}
              className="flex items-center justify-center px-4 py-2 bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {copied ? <Check size={18} className="mr-2" /> : <Copy size={18} className="mr-2" />}
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={savePrompt}
              className="flex items-center justify-center px-4 py-2 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 rounded-md hover:bg-green-200 dark:hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <Save size={18} className="mr-2" />
              Save Prompt
            </motion.button>
          </div>
        </motion.div>
      )}
      <PromptHistory history={history} />
      {savedPrompts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-indigo-700 dark:text-indigo-300">Saved Prompts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedPrompts.map((savedPrompt, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md relative"
              >
                <p className="text-gray-700 dark:text-gray-300 text-sm">{savedPrompt}</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteSavedPrompt(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
                >
                  <Trash2 size={18} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

