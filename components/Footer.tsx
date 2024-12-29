import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold text-foreground">AI Prompt Generator</h3>
            <p className="text-muted-foreground">Powered by OpenAI and Next.js</p>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <a
              href="https://github.com/yourusername/ai-prompt-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              <Github size={24} />
            </a>
            <a
              href="/privacy"
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

