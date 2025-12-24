type DashboardPanelProps = {
  title: string;
  children?: React.ReactNode;
};

export default function DashboardPanel({
  title,
  children,
}: DashboardPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 h-full">
      <h3 className="text-lg font-semibold ">{title}</h3>

      <div className="my-6 border-b border-gray-200" />

      <div className="space-y-4">{children}</div>
    </div>
  );
}
