import { useState } from "react";
import { Search, Filter, Plus, Shield, UserCog, UserCheck, Mail } from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const users = [
  { id: "1", name: "John Doe", email: "john@health.gov", role: "Administrator", department: "Management", status: "Active" },
  { id: "2", name: "Dr. Sarah Smith", email: "sarah@health.gov", role: "Health Officer", department: "Health Services", status: "Active" },
  { id: "3", name: "Mike Johnson", email: "mike@health.gov", role: "Inspector", department: "Sanitation", status: "Active" },
  { id: "4", name: "Emily Davis", email: "emily@health.gov", role: "Data Analyst", department: "Research", status: "Inactive" },
  { id: "5", name: "Robert Wilson", email: "robert@health.gov", role: "Field Worker", department: "Surveillance", status: "Active" },
];

const roleConfig: Record<string, { icon: typeof Shield; color: string; bg: string }> = {
  Administrator: { icon: UserCog, color: "text-purple-700", bg: "bg-purple-50" },
  "Health Officer": { icon: UserCheck, color: "text-blue-700", bg: "bg-blue-50" },
  Inspector: { icon: Shield, color: "text-emerald-700", bg: "bg-emerald-50" },
  "Data Analyst": { icon: Shield, color: "text-yellow-700", bg: "bg-yellow-50" },
  "Field Worker": { icon: Shield, color: "text-orange-700", bg: "bg-orange-50" },
};

export default function Users() {
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage system users, roles, and permissions</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <p className="text-sm font-medium text-gray-500">Total Users</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{users.length}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-gray-500">Active</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{users.filter((u) => u.status === "Active").length}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-gray-500">Inactive</p>
          <p className="text-2xl font-bold text-gray-500 mt-1">{users.filter((u) => u.status === "Inactive").length}</p>
        </Card>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
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
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">User</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Email</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Role</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Department</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-3 font-medium text-gray-500 uppercase tracking-wider text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => {
                const config = roleConfig[user.role];
                return (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-emerald-700">
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.department}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        user.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Edit</button>
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
