import StatCard from "@/components/dashborad/StatCard";
import DashboardPanel from "@/components/dashborad/DashboardPanel";
import NotificationCard from "@/components/dashborad/NotificationCard";
import QuickActionCard from "@/components/dashborad/QuickActionCard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* title */}
      <div>
        <h1 className="text-3xl font-semibold">Franchise Dashboard</h1>
        <span className="text-sm text-gray-600">
          Welcome to the franchise management panel.
        </span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<i className="fa-solid fa-building"></i>}
          value={5}
          label="Active Offices"
          colorClass="bg-blue-500"
        />

        <StatCard
          icon={<i className="fa-solid fa-users"></i>}
          value={20}
          label="Total Consultants"
          colorClass="bg-green-500"
        />

        <StatCard
          icon={<i className="fa-solid fa-coins"></i>}
          value="₺500,000"
          label="Total Profit"
          colorClass="bg-orange-500"
        />

        <StatCard
          icon={<i className="fa-solid fa-triangle-exclamation"></i>}
          value={2}
          label="Pending Payments"
          colorClass="bg-red-500"
        />
      </div>

      {/* Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DashboardPanel title="Recent Activities">
          <NotificationCard
            icon={<i className="fa-solid fa-building"></i>}
            title="New office added"
            description="Ataşehir office was added to the system"
            time="2 days ago"
          />

          <NotificationCard
            icon={<i className="fa-solid fa-money-bill"></i>}
            title="Payment received"
            description="₺5,000 payment received from Kadıköy office"
            time="3 days ago"
          />
        </DashboardPanel>

        <DashboardPanel title="Quick Actions">
          <QuickActionCard
            icon={<i className="fa-solid fa-building"></i>}
            label="Office Management"
          />
        </DashboardPanel>
      </div>
    </div>
  );
}
