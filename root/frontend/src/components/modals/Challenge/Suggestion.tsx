const HashIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 fill-slate-400 bg-slate-600 rounded p-1"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
        clipRule="evenodd"
      />
    </svg>
  );
};

interface SuggestionProps extends React.HTMLAttributes<HTMLButtonElement> {
  suggestions: string[];
  handleSetValue: (word: string) => void;
}

const Suggestion = ({ suggestions, handleSetValue }: SuggestionProps) => {
  if (!suggestions.length) return null;

  return (
    <div className="mt-2 mb-5 w-full space-y-3 px-5">
      <span className="font-bold text-lg">Suggestions</span>
      {suggestions.map((suggestion, index) => (
        <div
          key={`${index}${suggestion}`}
          className="flex gap-3 items-center bg-[#253144] h-12 py-2 px-3 rounded-lg cursor-pointer border border-slate-800 hover:border-slate-600 select-none"
          onClick={() => handleSetValue(suggestion)}
        >
          <HashIcon />
          {suggestion}
        </div>
      ))}
    </div>
  );
};

export { Suggestion };
