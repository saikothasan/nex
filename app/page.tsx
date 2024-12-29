import PromptGenerator from '@/components/PromptGenerator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900 transition-colors duration-500">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-8 drop-shadow-lg">AI Prompt Generator</h1>
        <PromptGenerator />
      </main>
      <Footer />
    </div>
  );
}

