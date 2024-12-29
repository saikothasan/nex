import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="glass sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            AI Prompt Generator
          </Link>
          <nav className="hidden md:flex space-x-6 items-center">
            <Link href="/about" className="text-foreground hover:text-primary transition-colors duration-300">
              About
            </Link>
            <Link href="/faq" className="text-foreground hover:text-primary transition-colors duration-300">
              FAQ
            </Link>
            <a
              href="https://github.com/yourusername/ai-prompt-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block glass text-foreground px-4 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              GitHub
            </a>
            <ThemeToggle />
          </nav>
          <button
            className="md:hidden text-foreground focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden glass">
          <nav className="flex flex-col space-y-4 p-4">
            <Link href="/about" className="text-foreground hover:text-primary transition-colors duration-300">
              About
            </Link>
            <Link href="/faq" className="text-foreground hover:text-primary transition-colors duration-300">
              FAQ
            </Link>
            <a
              href="https://github.com/yourusername/ai-prompt-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block glass text-foreground px-4 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              GitHub
            </a>
            <ThemeToggle />
          </nav>
        </div>
      )}
    </header>
  );
}

