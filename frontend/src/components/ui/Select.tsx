type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = {
  label?: string;
  value: string | number | "";
  options: { label: string; value: string | number }[];
  placeholder?: string;
  onChange: (value: string) => void;
};

export default function Select({
  label,
  value,
  options,
  placeholder = "Choose",
  onChange,
}: SelectProps) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-3 py-2 w-full text-sm"
      >
        <option value="">{placeholder}</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}