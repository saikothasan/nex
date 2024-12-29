import { motion } from 'framer-motion';

interface PromptHistoryProps {
  history: string[];
}

export default function PromptHistory({ history }: PromptHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-semibold mb-6 text-indigo-700 dark:text-indigo-300">Prompt History</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {history.map((prompt, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <p className="text-gray-700 dark:text-gray-300 text-sm">{prompt}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

