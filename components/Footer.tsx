import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-indigo-800 dark:bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold">AI Prompt Generator</h3>
            <p className="text-indigo-200 dark:text-gray-400">Powered by OpenAI and Next.js</p>
          </div>
          <div className="flex items-center">
            <a
              href="https://github.com/yourusername/ai-prompt-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-indigo-200 dark:hover:text-gray-300 transition-colors duration-300"
            >
              <Github size={24} />
            </a>
            <span className="mx-4">|</span>
            <a
              href="/privacy"
              className="text-white hover:text-indigo-200 dark:hover:text-gray-300 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <span className="mx-4">|</span>
            <a
              href="/terms"
              className="text-white hover:text-indigo-200 dark:hover:text-gray-300 transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

