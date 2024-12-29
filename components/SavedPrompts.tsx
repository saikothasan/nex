import { Trash2 } from 'lucide-react';

interface SavedPromptsProps {
  savedPrompts: string[];
  onDelete: (index: number) => void;
}

export default function SavedPrompts({ savedPrompts, onDelete }: SavedPromptsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {savedPrompts.map((prompt, index) => (
        <div
          key={index}
          className="glass p-4 rounded-lg relative transition-all duration-300 ease-in-out opacity-0 animate-fadeIn"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <p className="text-foreground text-sm bg-black/20 p-3 rounded-md">{prompt}</p>
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
  );
}

