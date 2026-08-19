import { useState } from "react";
import { Search, Filter, Plus, AlertTriangle, CheckCircle, XCircle, Droplets } from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const samples = [
  { id: "1", location: "Treatment Plant - North", date: "2026-08-01", ph: 7.2, turbidity: 2.1, bacteria: "Safe", status: "Passed" },
  { id: "2", location: "Treatment Plant - South", date: "2026-08-01", ph: 6.8, turbidity: 4.5, bacteria: "Unsafe", status: "Failed" },
  { id: "3", location: "River Outlet - Sector 4", date: "2026-07-31", ph: 7.0, turbidity: 1.8, bacteria: "Safe", status: "Passed" },
  { id: "4", location: "Industrial Drain - Zone 2", date: "2026-07-31", ph: 5.4, turbidity: 12.3, bacteria: "Unsafe", status: "Failed" },
  { id: "5", location: "Residential Outlet", date: "2026-07-30", ph: 7.1, turbidity: 2.0, bacteria: "Safe", status: "Passed" },
];

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; bg: string }> = {
  Passed: { icon: CheckCircle, color: "text-emerald-700", bg: "bg-emerald-50" },
  Failed: { icon: XCircle, color: "text-red-700", bg: "bg-red-50" },
  Pending: { icon: AlertTriangle, color: "text-yellow-700", bg: "bg-yellow-50" },
};

export default function Wastewater() {
  const [search, setSearch] = useState("");

  const filtered = samples.filter((s) =>
    s.location.toLowerCase().includes(search.toLowerCase())
  );

  const avgPh = (samples.reduce((a, b) => a + b.ph, 0) / samples.length).toFixed(1);
  const unsafeCount = samples.filter((s) => s.status === "Failed").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wastewater Management</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor water quality, treatment plants, and discharge compliance</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          New Sample
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <Card>
          <p className="text-sm font-medium text-gray-500">Avg pH Level</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{avgPh}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-gray-500">Samples Tested</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{samples.length}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-gray-500">Safe</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{samples.length - unsafeCount}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-gray-500">Unsafe</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{unsafeCount}</p>
        </Card>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search samples..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <Button variant="secondary" size="md">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Location</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Date</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">pH Level</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Turbidity</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Bacteria</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sample) => {
                const config = statusConfig[sample.status];
                return (
                  <tr key={sample.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-gray-900">{sample.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{sample.date}</td>
                    <td className="px-6 py-4 text-gray-600">{sample.ph}</td>
                    <td className="px-6 py-4 text-gray-600">{sample.turbidity} NTU</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        sample.bacteria === "Safe" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                      }`}>
                        {sample.bacteria}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                        <config.icon className="w-3.5 h-3.5" />
                        {sample.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
