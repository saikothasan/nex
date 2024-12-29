import PromptGenerator from '@/components/PromptGenerator';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-500">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 dark:text-indigo-300 mb-2">AI Prompt Generator</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Spark your creativity with AI-generated prompts</p>
        </header>
        <ThemeToggle />
        <PromptGenerator />
      </div>
    </div>
  );
}

