import { useState } from "react";
import { Search, Filter, Plus, Calendar, MapPin, CheckCircle, Syringe } from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const drives = [
  { id: "1", name: "Polio Eradication Drive", date: "2026-08-15", location: "Community Hall", target: 5000, vaccinated: 3420, status: "Active" },
  { id: "2", name: "Hepatitis B Campaign", date: "2026-08-22", location: "District Health Center", target: 3000, vaccinated: 1200, status: "Active" },
  { id: "3", name: "COVID-19 Booster", date: "2026-09-01", location: "City Hospital", target: 2000, vaccinated: 0, status: "Upcoming" },
  { id: "4", name: "Measles-Rubella", date: "2026-07-10", location: "Rural Clinic North", target: 1500, vaccinated: 1500, status: "Completed" },
];

const coverageData = [
  { label: "0-1 yr", vaccinated: 98 },
  { label: "1-5 yr", vaccinated: 92 },
  { label: "5-12 yr", vaccinated: 88 },
  { label: "12-18 yr", vaccinated: 75 },
  { label: "18+", vaccinated: 65 },
];

export default function Immunization() {
  const [search, setSearch] = useState("");

  const filtered = drives.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalVaccinated = drives.reduce((a, b) => a + b.vaccinated, 0);
  const totalTarget = drives.reduce((a, b) => a + b.target, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Immunization Program</h1>
          <p className="text-sm text-gray-500 mt-1">Track vaccination drives and coverage across districts</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          Schedule Drive
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <Card>
          <p className="text-sm font-medium text-gray-500">Total Drives</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{drives.length}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-gray-500">Vaccinated</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{totalVaccinated.toLocaleString()}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-gray-500">Target</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalTarget.toLocaleString()}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-gray-500">Coverage</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{Math.round((totalVaccinated / totalTarget) * 100)}%</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search drives..."
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
                  <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Drive Name</th>
                  <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Date</th>
                  <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Location</th>
                  <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Progress</th>
                  <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((drive) => {
                  const progress = Math.round((drive.vaccinated / drive.target) * 100);
                  return (
                    <tr key={drive.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Syringe className="w-4 h-4 text-emerald-500" />
                          <span className="font-medium text-gray-900">{drive.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {drive.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          {drive.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden w-24">
                            <div
                              className="h-full bg-emerald-500 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          drive.status === "Completed" ? "bg-emerald-50 text-emerald-700" :
                          drive.status === "Active" ? "bg-blue-50 text-blue-700" :
                          "bg-yellow-50 text-yellow-700"
                        }`}>
                          {drive.status === "Completed" && <CheckCircle className="w-3.5 h-3.5" />}
                          {drive.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <Card title="Coverage by Age Group">
          <div className="space-y-4">
            {coverageData.map((group) => (
              <div key={group.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{group.label}</span>
                  <span className="text-sm font-medium text-gray-900">{group.vaccinated}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${group.vaccinated}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
