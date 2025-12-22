type SearchInputProps = {
  placeholder?: string;
};

export default function SearchBar({
  placeholder = "Ara...",
}: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="border rounded-xl px-3 py-2 text-sm w-64 focus:outline-none focus:ring focus:ring-blue-200"
    />
  );
}
