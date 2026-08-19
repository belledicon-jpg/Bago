import { useState } from "react";
import ProgressBar from "../components/ui/ProgressBar";
import DataTable from "../components/DataTable";
import { Plus, Wrench, CalendarCheck, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

interface ServiceRequest {
  id: number;
  reference: string;
  clientName: string;
  address: string;
  type: string;
  status: string;
  date: string;
  scheduledDate: string;
  assignedTo: string;
  barangay: string;
}

interface EnvironmentalRecord {
  id: number;
  location: string;
  date: string;
  phLevel: string;
  turbidity: string;
  bacteria: string;
  status: string;
  inspector: string;
}

const initialRequests: ServiceRequest[] = [
  { id: 1, reference: "WS-2026-0071", clientName: "Juan Dela Cruz", address: "123 Poblacion St", type: "Septic Tank Desludging", status: "Completed", date: "2026-07-20", scheduledDate: "2026-07-25", assignedTo: "Team Alpha", barangay: "Poblacion" },
  { id: 2, reference: "WS-2026-0072", clientName: "Maria Santos", address: "456 Bagong Silang Ave", type: "Septic Tank Desludging", status: "In Progress", date: "2026-07-28", scheduledDate: "2026-08-02", assignedTo: "Team Beta", barangay: "Bagong Silang" },
  { id: 3, reference: "WS-2026-0073", clientName: "Pedro Reyes", address: "789 San Jose Rd", type: "Grease Trap Cleaning", status: "Scheduled", date: "2026-08-01", scheduledDate: "2026-08-06", assignedTo: "Team Alpha", barangay: "San Jose" },
  { id: 4, reference: "WS-2026-0074", clientName: "Ana Lopez", address: "321 Maysilo St", type: "Septic Tank Desludging", status: "Submitted", date: "2026-08-03", scheduledDate: "—", assignedTo: "Unassigned", barangay: "Maysilo" },
  { id: 5, reference: "WS-2026-0075", clientName: "Jose Mendoza", address: "654 Poblacion St", type: "Wastewater Inspection", status: "Pending", date: "2026-08-04", scheduledDate: "—", assignedTo: "Unassigned", barangay: "Poblacion" },
  { id: 6, reference: "WS-2026-0076", clientName: "Teresa Gomez", address: "987 Bagong Silang Ave", type: "Septic Tank Desludging", status: "Completed", date: "2026-07-15", scheduledDate: "2026-07-20", assignedTo: "Team Beta", barangay: "Bagong Silang" },
];

const initialEnvironmental: EnvironmentalRecord[] = [
  { id: 1, location: "Poblacion River", date: "2026-08-01", phLevel: "7.2", turbidity: "5 NTU", bacteria: "Low", status: "Normal", inspector: "Eng. Garcia" },
  { id: 2, location: "San Jose Creek", date: "2026-08-02", phLevel: "6.8", turbidity: "8 NTU", bacteria: "Low", status: "Normal", inspector: "Eng. Santos" },
  { id: 3, location: "Maysilo Drainage", date: "2026-08-03", phLevel: "5.5", turbidity: "15 NTU", bacteria: "High", status: "Alert", inspector: "Eng. Reyes" },
  { id: 4, location: "Bagong Silang Outlet", date: "2026-08-04", phLevel: "7.0", turbidity: "6 NTU", bacteria: "Low", status: "Normal", inspector: "Eng. Cruz" },
];

type Tab = "requests" | "environmental";

export default function Wastewater(): JSX.Element {
  const [activeTab, setActiveTab] = useState<Tab>("requests");
  const [requests, setRequests] = useState<ServiceRequest[]>(initialRequests);
  const [environmental, setEnvironmental] = useState<EnvironmentalRecord[]>(initialEnvironmental);

  const [newRequest, setNewRequest] = useState({
    clientName: "", address: "", type: "Septic Tank Desludging", barangay: "",
  });

  const [newEnvironmental, setNewEnvironmental] = useState({
    location: "", phLevel: "", turbidity: "", bacteria: "Low", inspector: "",
  });

  const handleAddRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const request: ServiceRequest = {
      id: Date.now(),
      reference: `WS-2026-${String(requests.length + 71).padStart(4, "0")}`,
      clientName: newRequest.clientName,
      address: newRequest.address,
      type: newRequest.type,
      status: "Submitted",
      date: new Date().toISOString().split("T")[0],
      scheduledDate: "—",
      assignedTo: "Unassigned",
      barangay: newRequest.barangay,
    };
    setRequests((prev) => [request, ...prev]);
    setNewRequest({ clientName: "", address: "", type: "Septic Tank Desludging", barangay: "" });
  };

  const handleAddEnvironmental = (e: React.FormEvent) => {
    e.preventDefault();
    const record: EnvironmentalRecord = {
      id: Date.now(),
      location: newEnvironmental.location,
      date: new Date().toISOString().split("T")[0],
      phLevel: newEnvironmental.phLevel,
      turbidity: newEnvironmental.turbidity,
      bacteria: newEnvironmental.bacteria,
      status: newEnvironmental.bacteria === "High" ? "Alert" : "Normal",
      inspector: newEnvironmental.inspector,
    };
    setEnvironmental((prev) => [record, ...prev]);
    setNewEnvironmental({ location: "", phLevel: "", turbidity: "", bacteria: "Low", inspector: "" });
  };

  const updateRequestStatus = (id: number, status: string) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const requestColumns = [
    { key: "reference" as const, label: "Reference" },
    { key: "clientName" as const, label: "Client" },
    { key: "type" as const, label: "Type" },
    { key: "status" as const, label: "Status" },
    { key: "date" as const, label: "Date" },
    { key: "scheduledDate" as const, label: "Scheduled" },
    { key: "assignedTo" as const, label: "Assigned To" },
  ];

  const environmentalColumns = [
    { key: "location" as const, label: "Location" },
    { key: "date" as const, label: "Date" },
    { key: "phLevel" as const, label: "pH Level" },
    { key: "turbidity" as const, label: "Turbidity" },
    { key: "bacteria" as const, label: "Bacteria" },
    { key: "status" as const, label: "Status" },
    { key: "inspector" as const, label: "Inspector" },
  ];

  const statusCounts = {
    submitted: requests.filter((r) => r.status === "Submitted").length,
    pending: requests.filter((r) => r.status === "Pending").length,
    scheduled: requests.filter((r) => r.status === "Scheduled").length,
    inProgress: requests.filter((r) => r.status === "In Progress").length,
    completed: requests.filter((r) => r.status === "Completed").length,
  };

  const totalRequests = requests.length;
  const completionRate = totalRequests === 0 ? 0 : Math.round((statusCounts.completed / totalRequests) * 100);

  const getStatusColor = (status: string) => {
    if (status === "Completed") return "text-emerald-600 bg-emerald-50";
    if (status === "In Progress") return "text-blue-600 bg-blue-50";
    if (status === "Scheduled") return "text-purple-600 bg-purple-50";
    if (status === "Pending" || status === "Submitted") return "text-amber-600 bg-amber-50";
    return "text-gray-600 bg-gray-50";
  };

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-[#0A2942]">
          Wastewater & Septic Services
        </h1>

        <p className="mt-2 text-gray-500">
          Manage septic tank desludging requests and wastewater records.
        </p>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Requests</p>
              <p className="mt-1 text-3xl font-bold text-[#0A2942]">{totalRequests}</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-3"><Wrench className="text-blue-500" size={22} /></div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="mt-1 text-3xl font-bold text-blue-600">{statusCounts.inProgress}</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-3"><Clock className="text-blue-500" size={22} /></div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Scheduled</p>
              <p className="mt-1 text-3xl font-bold text-purple-600">{statusCounts.scheduled}</p>
            </div>
            <div className="rounded-xl bg-purple-50 p-3"><CalendarCheck className="text-purple-500" size={22} /></div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="mt-1 text-3xl font-bold text-emerald-600">{statusCounts.completed}</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3"><CheckCircle2 className="text-emerald-500" size={22} /></div>
          </div>
          <div className="mt-3"><ProgressBar value={completionRate} color="#16A34A" size="sm" /></div>
        </div>

      </div>

      {/* REQUEST PROGRESS */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-[#0A2942]">Request Lifecycle Progress</h3>
        <div className="mt-6 space-y-5">
          {[
            { label: "Submitted", value: statusCounts.submitted, total: totalRequests },
            { label: "Pending", value: statusCounts.pending, total: totalRequests },
            { label: "Scheduled", value: statusCounts.scheduled, total: totalRequests },
            { label: "In Progress", value: statusCounts.inProgress, total: totalRequests },
            { label: "Completed", value: statusCounts.completed, total: totalRequests },
          ].map((item) => {
            const pct = item.total === 0 ? 0 : Math.round((item.value / item.total) * 100);
            return (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="text-sm font-semibold text-[#0A2942]">{item.value} ({pct}%)</span>
                </div>
                <ProgressBar value={pct} color="#0A2942" size="lg" />
              </div>
            );
          })}
        </div>
      </div>

      {/* TABS */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="flex items-center gap-1 border-b p-2 overflow-x-auto">
          {[
            { id: "requests" as Tab, label: "Service Requests" },
            { id: "environmental" as Tab, label: "Environmental Monitoring" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.id ? "bg-[#0A2942] text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={() => alert(`Add new ${activeTab === "requests" ? "service request" : "environmental record"} form toggled. Use the form below.`)}
            className="ml-auto flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition"
          >
            <Plus size={16} />
            New Entry
          </button>
        </div>

        <div className="p-6">

          {/* ADD REQUEST FORM */}

          {activeTab === "requests" && (
            <form onSubmit={handleAddRequest} className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-4 font-semibold text-[#0A2942]">New Service Request</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Client Name</label>
                  <input type="text" required value={newRequest.clientName} onChange={(e) => setNewRequest({ ...newRequest, clientName: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input type="text" required value={newRequest.address} onChange={(e) => setNewRequest({ ...newRequest, address: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select value={newRequest.type} onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10">
                    <option>Septic Tank Desludging</option>
                    <option>Grease Trap Cleaning</option>
                    <option>Wastewater Inspection</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">Barangay</label>
                  <input type="text" required value={newRequest.barangay} onChange={(e) => setNewRequest({ ...newRequest, barangay: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
              </div>
              <div className="mt-4">
                <button type="submit" className="rounded-lg bg-[#0A2942] px-4 py-2 text-sm font-semibold text-white hover:bg-[#123B5D] transition">Submit Request</button>
              </div>
            </form>
          )}

          {/* ADD ENVIRONMENTAL FORM */}

          {activeTab === "environmental" && (
            <form onSubmit={handleAddEnvironmental} className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-4 font-semibold text-[#0A2942]">Add Environmental Record</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input type="text" required value={newEnvironmental.location} onChange={(e) => setNewEnvironmental({ ...newEnvironmental, location: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">pH Level</label>
                  <input type="text" required value={newEnvironmental.phLevel} onChange={(e) => setNewEnvironmental({ ...newEnvironmental, phLevel: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Turbidity (NTU)</label>
                  <input type="text" required value={newEnvironmental.turbidity} onChange={(e) => setNewEnvironmental({ ...newEnvironmental, turbidity: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bacteria Level</label>
                  <select value={newEnvironmental.bacteria} onChange={(e) => setNewEnvironmental({ ...newEnvironmental, bacteria: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Inspector</label>
                  <input type="text" required value={newEnvironmental.inspector} onChange={(e) => setNewEnvironmental({ ...newEnvironmental, inspector: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
              </div>
              <div className="mt-4">
                <button type="submit" className="rounded-lg bg-[#0A2942] px-4 py-2 text-sm font-semibold text-white hover:bg-[#123B5D] transition">Add Record</button>
              </div>
            </form>
          )}

          {/* DATA TABLES */}

          {activeTab === "requests" && (
            <DataTable data={requests} columns={requestColumns} searchKey="clientName" pageSize={5} />
          )}

          {activeTab === "environmental" && (
            <DataTable data={environmental} columns={environmentalColumns} searchKey="location" pageSize={5} />
          )}

        </div>
      </div>

      {/* REQUEST TRACKER */}

      {requests.length > 0 && (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-[#0A2942]">Request Progress Tracker</h3>
          <p className="text-sm text-gray-500">Update service request status</p>
          <div className="mt-4 space-y-3">
            {requests.slice(0, 3).map((request) => (
              <div key={request.id} className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
                <div>
                  <p className="text-sm font-medium text-[#0A2942]">{request.reference} — {request.clientName}</p>
                  <p className="text-xs text-gray-500">{request.type} | Scheduled: {request.scheduledDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(request.status)}`}>{request.status}</span>
                  <select
                    value={request.status}
                    onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                    className="rounded-lg border border-gray-300 px-2 py-1 text-xs focus:border-[#0A2942] focus:outline-none"
                  >
                    <option>Submitted</option>
                    <option>Pending</option>
                    <option>Scheduled</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
