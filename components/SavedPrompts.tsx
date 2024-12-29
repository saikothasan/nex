import { Trash2 } from 'lucide-react';

interface SavedPromptsProps {
  savedPrompts: string[];
  onDelete: (index: number) => void;
}

export default function SavedPrompts({ savedPrompts, onDelete }: SavedPromptsProps) {
  if (savedPrompts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Saved Prompts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedPrompts.map((prompt, index) => (
          <div
            key={index}
            className="p-4 rounded-lg shadow-md backdrop-blur-md bg-white/30 dark:bg-gray-800/30 relative transition-all duration-300 ease-in-out opacity-0 animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <p className="text-gray-700 dark:text-gray-300 text-sm">{prompt}</p>
            <button
              onClick={() => onDelete(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none transition-transform duration-200 ease-in-out hover:scale-110"
              aria-label="Delete saved prompt"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
        }