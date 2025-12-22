type QuickActionCardProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

export default function QuickActionCard({
  icon,
  label,
  onClick,
}: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg
                 flex flex-col items-center justify-center gap-2
                 text-gray-600 hover:border-blue-500 hover:text-blue-600
                 hover:bg-blue-50 transition"
    >
      <div className="text-xl">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
