import { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
  value: string | number;
  label: string;
  colorClass: string; // 👈 NEW
};

export default function StatCard({
  icon,
  value,
  label,
  colorClass,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
      <div
        className={`w-12 h-12 flex items-center justify-center rounded ${colorClass} text-white`}
      >
        {icon}
      </div>

      <div>
        <div className="text-xl font-semibold text-black">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </div>
  );
}
