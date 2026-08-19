import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MapPin,
  Phone,
  Mail,
  Calendar,
  User,
  Activity,
  MoreVertical,
} from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const centers = [
  { id: "1", name: "City General Hospital", type: "Hospital", address: "123 Main St", phone: "+1 555-0100", email: "city@hospital.gov", patients: 3420, status: "Active" },
  { id: "2", name: "District Health Center", type: "Health Center", address: "456 Oak Ave", phone: "+1 555-0101", email: "district@health.gov", patients: 1890, status: "Active" },
  { id: "3", name: "Rural Clinic North", type: "Clinic", address: "789 Pine Rd", phone: "+1 555-0102", email: "north@clinic.gov", patients: 650, status: "Active" },
  { id: "4", name: "Community Health Post", type: "Health Post", address: "321 Elm St", phone: "+1 555-0103", email: "community@health.gov", patients: 420, status: "Under Review" },
];

export default function HealthCenter() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(centers[0]);

  const filtered = centers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Health Center Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor health centers across districts</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          Add Center
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search health centers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <Button variant="secondary" size="md">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((center) => (
              <Card
                key={center.id}
                className={`cursor-pointer transition-all ${selected.id === center.id ? "ring-2 ring-emerald-500" : ""}`}
                onClick={() => setSelected(center)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Activity className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{center.name}</h3>
                      <p className="text-xs text-gray-500">{center.type}</p>
                    </div>
                  </div>
                  <button className="p-1 rounded hover:bg-gray-100">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5" />
                    {center.address}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Phone className="w-3.5 h-3.5" />
                    {center.phone}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Mail className="w-3.5 h-3.5" />
                    {center.email}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{center.patients.toLocaleString()} patients</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    center.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-yellow-50 text-yellow-700"
                  }`}>
                    {center.status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Card title="Center Details">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Activity className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{selected.name}</h3>
                  <p className="text-xs text-gray-500">{selected.type}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {selected.address}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {selected.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {selected.email}
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Statistics</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-gray-900">{selected.patients.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Total Patients</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-gray-900">24</p>
                    <p className="text-xs text-gray-500">Staff Members</p>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Appointments</h4>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">Patient #{1000 + i}</p>
                        <p className="text-xs text-gray-500">General Checkup</p>
                      </div>
                      <Calendar className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
