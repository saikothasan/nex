import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-500">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-indigo-800 dark:text-indigo-300 mb-6">About AI Prompt Generator</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            AI Prompt Generator is a powerful tool designed to spark creativity and inspire writers, students, and professionals alike. By leveraging the latest in artificial intelligence technology, our platform generates unique, thought-provoking prompts tailored to your specific needs.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Whether you're looking for inspiration for your next short story, seeking a challenging topic for an academic paper, or simply want to explore new ideas, AI Prompt Generator is here to help. With customizable options for tone, length, and genre, you can fine-tune your prompts to match your exact requirements.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our mission is to empower creativity and facilitate learning through the power of AI-generated prompts. We believe that everyone has a story to tell or an idea to explore, and sometimes all it takes is the right prompt to get started.
          </p>
          <Link href="/" className="inline-block mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300">
            Try It Now
          </Link>
        </div>
      </div>
    </div>
  );
}

