import { motion } from 'framer-motion';

interface PromptHistoryProps {
  history: string[];
}

export default function PromptHistory({ history }: PromptHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300">Prompt History</h2>
      <ul className="space-y-4">
        {history.map((prompt, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
          >
            <p className="text-gray-700 dark:text-gray-300">{prompt}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

