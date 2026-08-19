import { useState } from "react";
import { Search, Filter, Plus, CheckCircle, XCircle, AlertTriangle, MapPin } from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const inspections = [
  { id: "1", location: "Building A - Block 1", inspector: "Dr. Smith", date: "2026-08-01", score: 95, status: "Passed" },
  { id: "2", location: "Building B - Block 2", inspector: "Dr. Johnson", date: "2026-07-31", score: 82, status: "Passed" },
  { id: "3", location: "Market Area - Zone 3", inspector: "Dr. Williams", date: "2026-07-30", score: 45, status: "Failed" },
  { id: "4", location: "Residential Block C", inspector: "Dr. Brown", date: "2026-07-29", score: 78, status: "Passed" },
  { id: "5", location: "Industrial Zone 1", inspector: "Dr. Davis", date: "2026-07-28", score: 88, status: "Passed" },
];

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; bg: string }> = {
  Passed: { icon: CheckCircle, color: "text-emerald-700", bg: "bg-emerald-50" },
  Failed: { icon: XCircle, color: "text-red-700", bg: "bg-red-50" },
  Pending: { icon: AlertTriangle, color: "text-yellow-700", bg: "bg-yellow-50" },
};

export default function Sanitation() {
  const [search, setSearch] = useState("");

  const filtered = inspections.filter((i) =>
    i.location.toLowerCase().includes(search.toLowerCase())
  );

  const avgScore = Math.round(inspections.reduce((a, b) => a + b.score, 0) / inspections.length);
  const passed = inspections.filter((i) => i.status === "Passed").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sanitation Management</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor and manage sanitation inspections and cleanliness scores</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          New Inspection
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <p className="text-sm font-medium text-gray-500">Total Inspections</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{inspections.length}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-gray-500">Passed</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{passed}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-gray-500">Average Score</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{avgScore}%</p>
        </Card>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search inspections..."
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
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Inspector</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Date</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Score</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const config = statusConfig[item.status];
                return (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{item.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.inspector}</td>
                    <td className="px-6 py-4 text-gray-600">{item.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden w-24">
                          <div
                            className={`h-full rounded-full ${item.score >= 80 ? "bg-emerald-500" : item.score >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{item.score}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                        <config.icon className="w-3.5 h-3.5" />
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View</button>
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
