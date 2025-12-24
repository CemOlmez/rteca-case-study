import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: { label: string; value: string | number }[];
  placeholder?: string;
};

export default function Select({
  label,
  options,
  placeholder = "Choose",
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-600">{label}</label>
      )}

      <select
        {...props}
        className={`border border-gray-300 rounded-xl px-3 py-2 text-sm 
                    text-gray-700 bg-white
                    focus:outline-none focus:ring-2 focus:ring-blue-200
                    ${className}`}
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
