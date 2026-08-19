import {
  Stethoscope,
  SprayCan,
  Syringe,
  Waves,
  Activity,
  FileText,
  TrendingUp,
} from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";
import DashboardChart from "../../components/dashboard/DashboardChart";
import ActivityTable from "../../components/dashboard/ActivityTable";
import Button from "../../components/ui/Button";

const stats = [
  { title: "Total Patients", value: "12,847", change: "+12% this month", changeType: "positive" as const, icon: Stethoscope, iconColor: "bg-blue-100 text-blue-600" },
  { title: "Sanitation Score", value: "94.2%", change: "+2.4% this month", changeType: "positive" as const, icon: SprayCan, iconColor: "bg-emerald-100 text-emerald-600" },
  { title: "Vaccinations", value: "8,432", change: "+5.1% this month", changeType: "positive" as const, icon: Syringe, iconColor: "bg-purple-100 text-purple-600" },
  { title: "Water Quality", value: "98.7%", change: "-0.3% this month", changeType: "negative" as const, icon: Waves, iconColor: "bg-cyan-100 text-cyan-600" },
];

const chartData = [
  { label: "Jan", value: 65 },
  { label: "Feb", value: 78 },
  { label: "Mar", value: 52 },
  { label: "Apr", value: 91 },
  { label: "May", value: 83 },
  { label: "Jun", value: 106 },
  { label: "Jul", value: 94 },
];

const activities = [
  { id: "1", title: "Health Inspection Completed", description: "Building A passed all health and safety checks", time: "2 min ago", status: "completed" as const },
  { id: "2", title: "Water Sample Collected", description: "Sample from District 4 sent for laboratory analysis", time: "15 min ago", status: "pending" as const },
  { id: "3", title: "Vaccination Drive Scheduled", description: "Polio vaccination drive on Aug 15 at Community Hall", time: "1 hour ago", status: "warning" as const },
  { id: "4", title: "Wastewater Alert", description: "High contamination detected in Sector 7 treatment plant", time: "2 hours ago", status: "error" as const },
  { id: "5", title: "Monthly Report Generated", description: "July sanitation report is ready for review", time: "3 hours ago", status: "completed" as const },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of health and sanitation metrics</p>
        </div>
        <Button>
          <FileText className="w-4 h-4" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Monthly Overview</h3>
              <p className="text-sm text-gray-500 mt-0.5">Patient visits over the last 7 months</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              +18.2%
            </div>
          </div>
          <DashboardChart data={chartData} height={200} />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <ActivityTable activities={activities} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Upcoming Vaccinations</h3>
          <div className="space-y-3">
            {[
              { name: "Polio Drive", date: "Aug 15, 2026", location: "Community Hall", doses: 500 },
              { name: "Hepatitis B", date: "Aug 22, 2026", location: "District Health Center", doses: 300 },
              { name: "COVID-19 Booster", date: "Sep 01, 2026", location: "City Hospital", doses: 200 },
            ].map((drive, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">{drive.name}</p>
                  <p className="text-xs text-gray-500">{drive.date} • {drive.location}</p>
                </div>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
                  {drive.doses} doses
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "New Inspection", icon: Activity },
              { label: "Add Patient", icon: Stethoscope },
              { label: "Schedule Drive", icon: Syringe },
              { label: "View Reports", icon: FileText },
            ].map((action, i) => (
              <button
                key={i}
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors text-left"
              >
                <action.icon className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
