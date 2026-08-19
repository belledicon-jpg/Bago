import { useState } from "react";
import { Search, Filter, Plus, Activity, MapPin, Users } from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const outbreaks = [
  { id: "1", disease: "Cholera", location: "District 4 - Ward 12", cases: 45, status: "Active", reported: "2026-08-01", severity: "High" },
  { id: "2", disease: "Dengue Fever", location: "District 2 - Ward 5", cases: 23, status: "Monitoring", reported: "2026-07-30", severity: "Medium" },
  { id: "3", disease: "Typhoid", location: "District 7 - Ward 3", cases: 12, status: "Contained", reported: "2026-07-28", severity: "Low" },
  { id: "4", disease: "Hepatitis A", location: "District 1 - Ward 8", cases: 8, status: "Contained", reported: "2026-07-25", severity: "Low" },
];

const severityConfig: Record<string, { color: string; bg: string }> = {
  High: { color: "text-red-700", bg: "bg-red-50" },
  Medium: { color: "text-yellow-700", bg: "bg-yellow-50" },
  Low: { color: "text-green-700", bg: "bg-green-50" },
};

const statusConfig: Record<string, { color: string; bg: string }> = {
  Active: { color: "text-red-700", bg: "bg-red-50" },
  Monitoring: { color: "text-yellow-700", bg: "bg-yellow-50" },
  Contained: { color: "text-green-700", bg: "bg-green-50" },
};

export default function Surveillance() {
  const [search, setSearch] = useState("");

  const filtered = outbreaks.filter((o) =>
    o.disease.toLowerCase().includes(search.toLowerCase())
  );

  const totalCases = outbreaks.reduce((a, b) => a + b.cases, 0);
  const activeOutbreaks = outbreaks.filter((o) => o.status === "Active").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Disease Surveillance</h1>
          <p className="text-sm text-gray-500 mt-1">Track and monitor disease outbreaks across regions</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          Report Outbreak
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <p className="text-sm font-medium text-gray-500">Total Cases</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalCases}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-gray-500">Active Outbreaks</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{activeOutbreaks}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-gray-500">Regions Monitored</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
        </Card>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search outbreaks..."
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
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Disease</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Location</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Cases</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Severity</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Reported</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((outbreak) => {
                const sevConfig = severityConfig[outbreak.severity];
                const statConfig = statusConfig[outbreak.status];
                return (
                  <tr key={outbreak.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-red-500" />
                        <span className="font-medium text-gray-900">{outbreak.disease}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        {outbreak.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        {outbreak.cases}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${sevConfig.bg} ${sevConfig.color}`}>
                        {outbreak.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${statConfig.bg} ${statConfig.color}`}>
                        {outbreak.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{outbreak.reported}</td>
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
