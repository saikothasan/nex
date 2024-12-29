import PromptGenerator from '@/components/PromptGenerator'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

export default function Home() {
  return (
    <>
      <SEO
        title="AI Prompt Generator - Create Inspiring Prompts"
        description="Use our AI-powered tool to generate creative prompts for writing, brainstorming, and more. Customizable options for tone, length, and genre."
        canonical="https://ai-prompt-generator.vercel.app/"
      />
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-primary mb-8">AI Prompt Generator</h1>
          <PromptGenerator />
        </main>
        <Footer />
      </div>
    </>
  )
}

