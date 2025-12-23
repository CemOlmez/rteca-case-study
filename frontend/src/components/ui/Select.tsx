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
      {label && <label className="text-sm font-medium">{label}</label>}

      <select
        {...props}
        className={`border rounded px-3 py-2 w-full text-sm ${className}`}
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
