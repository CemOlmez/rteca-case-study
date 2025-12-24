type NotificationCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
};

export default function NotificationCard({
  icon,
  title,
  description,
  time,
}: NotificationCardProps) {
  return (
    <div className="flex gap-3 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
        {icon}
      </div>

      <div className="flex-1">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-sm text-gray-600">{description}</div>
        <div className="text-xs text-gray-400 mt-1">{time}</div>
      </div>
    </div>
  );
}
