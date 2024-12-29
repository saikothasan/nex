interface PromptHistoryProps {
  history: string[];
}

export default function PromptHistory({ history }: PromptHistoryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {history.map((prompt, index) => (
        <div
          key={index}
          className="p-4 rounded-lg shadow-md backdrop-blur-md bg-white/30 dark:bg-gray-800/30 transition-all duration-300 ease-in-out opacity-0 animate-fadeIn"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <p className="text-gray-700 dark:text-gray-300 text-sm">{prompt}</p>
        </div>
      ))}
    </div>
  );
}

