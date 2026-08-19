import { useState } from "react";
import ProgressBar from "../components/ui/ProgressBar";
import DataTable from "../components/DataTable";
import { Plus, ClipboardCheck, AlertTriangle, CheckCircle2, XCircle, Clock } from "lucide-react";

interface PermitApplication {
  id: number;
  reference: string;
  businessName: string;
  owner: string;
  type: string;
  status: string;
  submitted: string;
  inspectionDate: string;
  barangay: string;
}

interface Inspection {
  id: number;
  reference: string;
  businessName: string;
  inspector: string;
  date: string;
  result: string;
  violations: number;
}

interface Violation {
  id: number;
  reference: string;
  businessName: string;
  type: string;
  description: string;
  status: string;
  date: string;
}

const initialPermits: PermitApplication[] = [
  { id: 1, reference: "SP-2026-00101", businessName: "Maria's Eatery", owner: "Maria Santos", type: "Food Service", status: "Approved", submitted: "2026-07-10", inspectionDate: "2026-07-18", barangay: "Poblacion" },
  { id: 2, reference: "SP-2026-00102", businessName: "Pedro's Sari-Sari", owner: "Pedro Reyes", type: "Retail", status: "Under Review", submitted: "2026-07-20", inspectionDate: "2026-08-02", barangay: "San Jose" },
  { id: 3, reference: "SP-2026-00103", businessName: "Ana's Salon", owner: "Ana Lopez", type: "Personal Care", status: "Inspection", submitted: "2026-07-25", inspectionDate: "2026-08-05", barangay: "Maysilo" },
  { id: 4, reference: "SP-2026-00104", businessName: "Jose's Workshop", owner: "Jose Mendoza", type: "Manufacturing", status: "Submitted", submitted: "2026-08-01", inspectionDate: "—", barangay: "Poblacion" },
  { id: 5, reference: "SP-2026-00105", businessName: "Teresa's Bakery", owner: "Teresa Gomez", type: "Food Service", status: "Issued", submitted: "2026-06-15", inspectionDate: "2026-06-22", barangay: "Bagong Silang" },
  { id: 6, reference: "SP-2026-00106", businessName: "Roberto's Store", owner: "Roberto Flores", type: "Retail", status: "Approved", submitted: "2026-07-05", inspectionDate: "2026-07-12", barangay: "San Jose" },
];

const initialInspections: Inspection[] = [
  { id: 1, reference: "SP-2026-00101", businessName: "Maria's Eatery", inspector: "Eng. Garcia", date: "2026-07-18", result: "Passed", violations: 0 },
  { id: 2, reference: "SP-2026-00102", businessName: "Pedro's Sari-Sari", inspector: "Eng. Santos", date: "2026-08-02", result: "Pending", violations: 0 },
  { id: 3, reference: "SP-2026-00103", businessName: "Ana's Salon", inspector: "Eng. Reyes", date: "2026-08-05", result: "Scheduled", violations: 0 },
  { id: 4, reference: "SP-2026-00105", businessName: "Teresa's Bakery", inspector: "Eng. Cruz", date: "2026-06-22", result: "Passed", violations: 0 },
];

const initialViolations: Violation[] = [
  { id: 1, reference: "SP-2026-00088", businessName: "Old McDonald's Diner", type: "Sanitation", description: "Improper waste disposal", status: "Resolved", date: "2026-07-01" },
  { id: 2, reference: "SP-2026-00092", businessName: "Quick Repair Shop", type: "Environmental", description: "No proper drainage", status: "Pending", date: "2026-07-15" },
  { id: 3, reference: "SP-2026-00095", businessName: "Sunrise Cafe", type: "Health", description: "Expired permits", status: "Under Review", date: "2026-07-20" },
];

type Tab = "permits" | "inspections" | "violations" | "new-permit";

export default function Sanitation() {
  const [activeTab, setActiveTab] = useState<Tab>("permits");
  const [permits, setPermits] = useState<PermitApplication[]>(initialPermits);
  const [inspections, setInspections] = useState<Inspection[]>(initialInspections);
  const [violations, setViolations] = useState<Violation[]>(initialViolations);
  const [showForm, setShowForm] = useState(false);

  const [newPermit, setNewPermit] = useState({
    businessName: "", owner: "", type: "Food Service", barangay: "",
  });

  const [newViolation, setNewViolation] = useState({
    reference: "", businessName: "", type: "Sanitation", description: "", status: "Pending",
  });

  const handleAddPermit = (e: React.FormEvent) => {
    e.preventDefault();
    const permit: PermitApplication = {
      id: Date.now(),
      reference: `SP-2026-${String(permits.length + 101).padStart(5, "0")}`,
      businessName: newPermit.businessName,
      owner: newPermit.owner,
      type: newPermit.type,
      status: "Submitted",
      submitted: new Date().toISOString().split("T")[0],
      inspectionDate: "—",
      barangay: newPermit.barangay,
    };
    setPermits((prev) => [permit, ...prev]);
    setNewPermit({ businessName: "", owner: "", type: "Food Service", barangay: "" });
    setShowForm(false);
  };

  const handleAddViolation = (e: React.FormEvent) => {
    e.preventDefault();
    const violation: Violation = {
      id: Date.now(),
      reference: newViolation.reference,
      businessName: newViolation.businessName,
      type: newViolation.type,
      description: newViolation.description,
      status: newViolation.status,
      date: new Date().toISOString().split("T")[0],
    };
    setViolations((prev) => [violation, ...prev]);
    setNewViolation({ reference: "", businessName: "", type: "Sanitation", description: "", status: "Pending" });
  };

  const updatePermitStatus = (id: number, status: string) => {
    setPermits((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const updateViolationStatus = (id: number, status: string) => {
    setViolations((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)));
  };

  const statusCounts = {
    submitted: permits.filter((p) => p.status === "Submitted").length,
    underReview: permits.filter((p) => p.status === "Under Review").length,
    inspection: permits.filter((p) => p.status === "Inspection").length,
    approved: permits.filter((p) => p.status === "Approved").length,
    issued: permits.filter((p) => p.status === "Issued").length,
  };

  const permitColumns = [
    { key: "reference" as const, label: "Reference" },
    { key: "businessName" as const, label: "Business Name" },
    { key: "owner" as const, label: "Owner" },
    { key: "type" as const, label: "Type" },
    { key: "status" as const, label: "Status" },
    { key: "submitted" as const, label: "Submitted" },
    { key: "barangay" as const, label: "Barangay" },
  ];

  const inspectionColumns = [
    { key: "reference" as const, label: "Reference" },
    { key: "businessName" as const, label: "Business" },
    { key: "inspector" as const, label: "Inspector" },
    { key: "date" as const, label: "Date" },
    { key: "result" as const, label: "Result" },
    { key: "violations" as const, label: "Violations" },
  ];

  const violationColumns = [
    { key: "reference" as const, label: "Reference" },
    { key: "businessName" as const, label: "Business" },
    { key: "type" as const, label: "Type" },
    { key: "description" as const, label: "Description" },
    { key: "status" as const, label: "Status" },
    { key: "date" as const, label: "Date" },
  ];

  const getStatusColor = (status: string) => {
    if (status === "Approved" || status === "Passed" || status === "Resolved" || status === "Issued") return "text-emerald-600 bg-emerald-50";
    if (status === "Pending" || status === "Under Review" || status === "Scheduled") return "text-amber-600 bg-amber-50";
    if (status === "Inspection") return "text-blue-600 bg-blue-50";
    return "text-gray-600 bg-gray-50";
  };

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-[#0A2942]">
          Sanitation Permit & Inspection
        </h1>

        <p className="mt-2 text-gray-500">
          Manage sanitation permits, business inspections, and violations.
        </p>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Permits</p>
              <p className="mt-1 text-3xl font-bold text-[#0A2942]">{permits.length}</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-3"><ClipboardCheck className="text-blue-500" size={22} /></div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Review</p>
              <p className="mt-1 text-3xl font-bold text-amber-500">{statusCounts.underReview + statusCounts.inspection}</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-3"><Clock className="text-amber-500" size={22} /></div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Approved</p>
              <p className="mt-1 text-3xl font-bold text-emerald-600">{statusCounts.approved + statusCounts.issued}</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3"><CheckCircle2 className="text-emerald-500" size={22} /></div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Violations</p>
              <p className="mt-1 text-3xl font-bold text-red-600">{violations.length}</p>
            </div>
            <div className="rounded-xl bg-red-50 p-3"><AlertTriangle className="text-red-500" size={22} /></div>
          </div>
        </div>

      </div>

      {/* PERMIT STATUS PROGRESS */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-[#0A2942]">Application Status Distribution</h3>
        <div className="mt-6 space-y-5">
          {[
            { label: "Submitted", value: statusCounts.submitted, total: permits.length },
            { label: "Under Review", value: statusCounts.underReview, total: permits.length },
            { label: "Inspection", value: statusCounts.inspection, total: permits.length },
            { label: "Approved", value: statusCounts.approved, total: permits.length },
            { label: "Issued", value: statusCounts.issued, total: permits.length },
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
            { id: "permits" as Tab, label: "Permits" },
            { id: "inspections" as Tab, label: "Inspections" },
            { id: "violations" as Tab, label: "Violations" },
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
            onClick={() => setShowForm(!showForm)}
            className="ml-auto flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition"
          >
            <Plus size={16} />
            New Permit
          </button>
        </div>

        <div className="p-6">

          {/* NEW PERMIT FORM */}

          {showForm && (
            <form onSubmit={handleAddPermit} className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-4 font-semibold text-[#0A2942]">New Permit Application</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Business Name</label>
                  <input type="text" required value={newPermit.businessName} onChange={(e) => setNewPermit({ ...newPermit, businessName: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Owner</label>
                  <input type="text" required value={newPermit.owner} onChange={(e) => setNewPermit({ ...newPermit, owner: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select value={newPermit.type} onChange={(e) => setNewPermit({ ...newPermit, type: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10">
                    <option>Food Service</option>
                    <option>Retail</option>
                    <option>Personal Care</option>
                    <option>Manufacturing</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">Barangay</label>
                  <input type="text" required value={newPermit.barangay} onChange={(e) => setNewPermit({ ...newPermit, barangay: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <button type="submit" className="rounded-lg bg-[#0A2942] px-4 py-2 text-sm font-semibold text-white hover:bg-[#123B5D] transition">Submit Application</button>
                <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">Cancel</button>
              </div>
            </form>
          )}

          {/* NEW VIOLATION FORM */}

          {activeTab === "violations" && (
            <form onSubmit={handleAddViolation} className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-4 font-semibold text-[#0A2942]">Log Violation</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Reference</label>
                  <input type="text" required value={newViolation.reference} onChange={(e) => setNewViolation({ ...newViolation, reference: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Business Name</label>
                  <input type="text" required value={newViolation.businessName} onChange={(e) => setNewViolation({ ...newViolation, businessName: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select value={newViolation.type} onChange={(e) => setNewViolation({ ...newViolation, type: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10">
                    <option>Sanitation</option>
                    <option>Environmental</option>
                    <option>Health</option>
                    <option>Safety</option>
                  </select>
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea required value={newViolation.description} onChange={(e) => setNewViolation({ ...newViolation, description: e.target.value })} rows={2} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select value={newViolation.status} onChange={(e) => setNewViolation({ ...newViolation, status: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10">
                    <option>Pending</option>
                    <option>Under Review</option>
                    <option>Resolved</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <button type="submit" className="rounded-lg bg-[#0A2942] px-4 py-2 text-sm font-semibold text-white hover:bg-[#123B5D] transition">Log Violation</button>
              </div>
            </form>
          )}

          {/* DATA TABLES */}

          {activeTab === "permits" && (
            <DataTable data={permits} columns={permitColumns} searchKey="businessName" pageSize={5} />
          )}

          {activeTab === "inspections" && (
            <DataTable data={inspections} columns={inspectionColumns} searchKey="businessName" pageSize={5} />
          )}

          {activeTab === "violations" && (
            <DataTable data={violations} columns={violationColumns} searchKey="businessName" pageSize={5} />
          )}

        </div>
      </div>

      {/* APPLICATION TRACKER */}

      {permits.length > 0 && (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-[#0A2942]">Application Progress Tracker</h3>
          <p className="text-sm text-gray-500">Select a permit to track progress</p>
          <div className="mt-4 space-y-3">
            {permits.slice(0, 3).map((permit) => (
              <div key={permit.id} className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
                <div>
                  <p className="text-sm font-medium text-[#0A2942]">{permit.reference} — {permit.businessName}</p>
                  <p className="text-xs text-gray-500">Submitted: {permit.submitted}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(permit.status)}`}>{permit.status}</span>
                  <select
                    value={permit.status}
                    onChange={(e) => updatePermitStatus(permit.id, e.target.value)}
                    className="rounded-lg border border-gray-300 px-2 py-1 text-xs focus:border-[#0A2942] focus:outline-none"
                  >
                    <option>Submitted</option>
                    <option>Under Review</option>
                    <option>Inspection</option>
                    <option>Approved</option>
                    <option>Issued</option>
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
