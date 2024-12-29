interface PromptHistoryProps {
  history: string[];
}

export default function PromptHistory({ history }: PromptHistoryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {history.map((prompt, index) => (
        <div
          key={index}
          className="glass p-4 rounded-lg transition-all duration-300 ease-in-out opacity-0 animate-fadeIn"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <p className="text-foreground text-sm bg-black/20 p-3 rounded-md">{prompt}</p>
        </div>
      ))}
    </div>
  );
}

