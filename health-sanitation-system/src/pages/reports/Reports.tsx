import { useState } from "react";
import { Download, Calendar, Filter, FileText, BarChart3, PieChart } from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const reports = [
  { id: "1", name: "Monthly Health Report", type: "Health", date: "2026-08-01", size: "2.4 MB", format: "PDF" },
  { id: "2", name: "Sanitation Inspection Summary", type: "Sanitation", date: "2026-07-31", size: "1.8 MB", format: "PDF" },
  { id: "3", name: "Vaccination Coverage Analysis", type: "Immunization", date: "2026-07-30", size: "3.1 MB", format: "XLSX" },
  { id: "4", name: "Wastewater Quality Report", type: "Wastewater", date: "2026-07-29", size: "1.2 MB", format: "PDF" },
  { id: "5", name: "Disease Surveillance Bulletin", type: "Surveillance", date: "2026-07-28", size: "2.7 MB", format: "PDF" },
  { id: "6", name: "Quarterly Health Statistics", type: "Health", date: "2026-07-01", size: "5.3 MB", format: "PDF" },
];

export default function Reports() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? reports : reports.filter((r) => r.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Generate, view, and download system reports</p>
        </div>
        <Button>
          <Download className="w-4 h-4" />
          Export All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Reports</p>
              <p className="text-xl font-bold text-gray-900">{reports.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">This Month</p>
              <p className="text-xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <PieChart className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Scheduled</p>
              <p className="text-xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                className="pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Types</option>
              <option value="Health">Health</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Immunization">Immunization</option>
              <option value="Wastewater">Wastewater</option>
              <option value="Surveillance">Surveillance</option>
            </select>
          </div>
          <Button variant="secondary" size="md">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Report Name</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Type</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Date</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Format</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Size</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((report) => (
                <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{report.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{report.type}</td>
                  <td className="px-6 py-4 text-gray-600">{report.date}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-700">
                      {report.format}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{report.size}</td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
