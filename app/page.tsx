import PromptGenerator from '@/components/PromptGenerator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-primary mb-8">AI Prompt Generator</h1>
        <PromptGenerator />
      </main>
      <Footer />
    </div>
  );
}

