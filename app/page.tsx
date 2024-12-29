import PromptGenerator from '@/components/PromptGenerator';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-500">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ThemeToggle />
        <PromptGenerator />
      </main>
      <Footer />
    </div>
  );
}

