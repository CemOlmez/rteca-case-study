type SearchInputProps = {
  placeholder?: string;
  className?: string;
};

export default function SearchBar({
  placeholder = "Search...",
  className = "",
}: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`border border-gray-300 rounded-xl px-3 py-2 text-sm 
                  focus:outline-none focus:ring-1 focus:ring-gray-200
                  ${className}`}
    />
  );
}
