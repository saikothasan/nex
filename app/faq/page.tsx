import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What is AI Prompt Generator?",
    answer: "AI Prompt Generator is a tool that uses artificial intelligence to create unique and inspiring prompts for various purposes, such as writing, brainstorming, or discussion topics."
  },
  {
    question: "How does it work?",
    answer: "Our tool uses advanced language models to generate prompts based on your input topic and preferences. You can customize the tone, length, and genre of the prompts to suit your needs."
  },
  {
    question: "Is my data safe?",
    answer: "We take data privacy seriously. We do not store your generated prompts or use them for any purpose other than providing the service to you. For more information, please refer to our Privacy Policy."
  },
  {
    question: "Can I use the generated prompts for commercial purposes?",
    answer: "Yes, you can use the generated prompts for any purpose, including commercial use. However, we recommend checking the output for any potential copyright issues before publishing."
  },
  {
    question: "How often is the AI model updated?",
    answer: "We regularly update our AI model to ensure the highest quality and most up-to-date prompts. However, the exact frequency may vary depending on advancements in AI technology."
  }
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-500">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-indigo-800 dark:text-indigo-300 mb-6">Frequently Asked Questions</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {faqs.map((faq, index) => (
            <Disclosure key={index} as="div" className="mt-4">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-lg font-medium text-left text-indigo-900 dark:text-indigo-100 bg-indigo-100 dark:bg-indigo-900 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`${
                        open ? 'transform rotate-180' : ''
                      } w-5 h-5 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-700 dark:text-gray-300">
                      {faq.answer}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
}

