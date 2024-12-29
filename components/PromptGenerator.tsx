'use client';

import { useState, useEffect } from 'react';
import { Sliders, RefreshCw, Copy, Check, Save, Share2, Download } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PromptHistory from './PromptHistory';
import SavedPrompts from './SavedPrompts';

export default function PromptGenerator() {
  const [topic, setTopic] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [tone, setTone] = useState('neutral');
  const [length, setLength] = useState('medium');
  const [genre, setGenre] = useState('general');
  const [audience, setAudience] = useState('general');
  const [purpose, setPurpose] = useState('writing');
  const [copied, setCopied] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<string[]>([]);

  useEffect(() => {
    const savedPromptsFromStorage = localStorage.getItem('savedPrompts');
    if (savedPromptsFromStorage) {
      setSavedPrompts(JSON.parse(savedPromptsFromStorage));
    }
    const historyFromStorage = localStorage.getItem('promptHistory');
    if (historyFromStorage) {
      setHistory(JSON.parse(historyFromStorage));
    }
  }, []);

  const generatePrompt = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, tone, length, genre, audience, purpose }),
      });
      if (!response.ok) {
        throw new Error('Failed to generate prompt');
      }
      const data = await response.json();
      setPrompt(data.prompt);
      const updatedHistory = [data.prompt, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem('promptHistory', JSON.stringify(updatedHistory));
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

  const sharePrompt = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AI Generated Prompt',
        text: prompt,
        url: window.location.href,
      }).then(() => {
        toast.success('Prompt shared successfully!');
      }).catch((error) => {
        console.error('Error sharing prompt:', error);
        toast.error('Failed to share prompt. Please try again.');
      });
    } else {
      toast.info('Sharing is not supported on this device.');
    }
  };

  const downloadPrompt = () => {
    const element = document.createElement('a');
    const file = new Blob([prompt], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'ai_generated_prompt.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Prompt downloaded successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 relative glass rounded-lg p-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic..."
          className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-gray-400 text-lg"
        />
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 text-foreground hover:text-primary focus:outline-none transition-transform duration-200 ease-in-out hover:scale-110"
          aria-label="Toggle settings"
        >
          <Sliders size={24} />
        </button>
      </div>
      <div className={`mb-6 glass rounded-lg p-4 transition-all duration-300 ease-in-out ${showSettings ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-foreground mb-1">Tone</label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-transparent border border-white/20 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="neutral">Neutral</option>
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
              <option value="humorous">Humorous</option>
              <option value="inspirational">Inspirational</option>
              <option value="serious">Serious</option>
            </select>
          </div>
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-foreground mb-1">Length</label>
            <select
              id="length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-transparent border border-white/20 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </div>
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-foreground mb-1">Genre</label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-transparent border border-white/20 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="general">General</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="poetry">Poetry</option>
              <option value="academic">Academic</option>
              <option value="business">Business</option>
            </select>
          </div>
          <div>
            <label htmlFor="audience" className="block text-sm font-medium text-foreground mb-1">Audience</label>
            <select
              id="audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-transparent border border-white/20 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="general">General</option>
              <option value="children">Children</option>
              <option value="teenagers">Teenagers</option>
              <option value="adults">Adults</option>
              <option value="professionals">Professionals</option>
            </select>
          </div>
          <div>
            <label htmlFor="purpose" className="block text-sm font-medium text-foreground mb-1">Purpose</label>
            <select
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-transparent border border-white/20 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="writing">Writing</option>
              <option value="brainstorming">Brainstorming</option>
              <option value="discussion">Discussion</option>
              <option value="teaching">Teaching</option>
              <option value="presentation">Presentation</option>
            </select>
          </div>
        </div>
      </div>
      <button
        onClick={generatePrompt}
        disabled={isLoading || !topic}
        className="w-full glass text-foreground py-3 px-4 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-lg"
      >
        {isLoading ? (
          <RefreshCw className="animate-spin mx-auto" size={24} />
        ) : (
          'Generate Prompt'
        )}
      </button>
      {prompt && (
        <div className="mt-8 glass rounded-lg p-6 transition-opacity duration-300 ease-in-out opacity-100">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Generated Prompt:</h2>
          <p className="text-foreground text-lg leading-relaxed">{prompt}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center px-4 py-2 glass text-foreground rounded-md hover:bg-primary hover:text-primary-foreground transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {copied ? <Check size={18} className="mr-2" /> : <Copy size={18} className="mr-2" />}
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
            <button
              onClick={savePrompt}
              className="flex items-center justify-center px-4 py-2 glass text-foreground rounded-md hover:bg-primary hover:text-primary-foreground transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Save size={18} className="mr-2" />
              Save Prompt
            </button>
            <button
              onClick={sharePrompt}
              className="flex items-center justify-center px-4 py-2 glass text-foreground rounded-md hover:bg-primary hover:text-primary-foreground transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Share2 size={18} className="mr-2" />
              Share Prompt
            </button>
            <button
              onClick={downloadPrompt}
              className="flex items-center justify-center px-4 py-2 glass text-foreground rounded-md hover:bg-primary hover:text-primary-foreground transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Download size={18} className="mr-2" />
              Download Prompt
            </button>
          </div>
        </div>
      )}
      {history.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-foreground">Prompt History</h2>
          <PromptHistory history={history} />
        </div>
      )}
      {savedPrompts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-foreground">Saved Prompts</h2>
          <SavedPrompts savedPrompts={savedPrompts} onDelete={deleteSavedPrompt} />
        </div>
      )}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}
