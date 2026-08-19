import { useState } from "react";
import ProgressBar from "../components/ui/ProgressBar";
import DataTable from "../components/DataTable";
import { Plus, Activity, MapPin, AlertTriangle, CheckCircle2, Clock, TrendingUp } from "lucide-react";

interface DiseaseCase {
  id: number;
  caseId: string;
  disease: string;
  patientName: string;
  age: number;
  barangay: string;
  status: string;
  dateReported: string;
  dateVerified: string;
  dateResolved: string;
  severity: string;
}

interface SurveillanceAlert {
  id: number;
  title: string;
  message: string;
  type: string;
  date: string;
  status: string;
}

interface LocationStat {
  barangay: string;
  cases: number;
  recovered: number;
  active: number;
  trend: string;
}

const initialCases: DiseaseCase[] = [
  { id: 1, caseId: "HS-2026-0191", disease: "Dengue", patientName: "Juan Dela Cruz", age: 30, barangay: "Poblacion", status: "Under Monitoring", dateReported: "2026-07-28", dateVerified: "2026-07-29", dateResolved: "—", severity: "Moderate" },
  { id: 2, caseId: "HS-2026-0192", disease: "Dengue", patientName: "Maria Santos", age: 25, barangay: "Bagong Silang", status: "Active", dateReported: "2026-07-30", dateVerified: "2026-07-31", dateResolved: "—", severity: "Severe" },
  { id: 3, caseId: "HS-2026-0193", disease: "Influenza", patientName: "Pedro Reyes", age: 60, barangay: "San Jose", status: "Resolved", dateReported: "2026-07-20", dateVerified: "2026-07-21", dateResolved: "2026-07-28", severity: "Mild" },
  { id: 4, caseId: "HS-2026-0194", disease: "Cholera", patientName: "Ana Lopez", age: 28, barangay: "Maysilo", status: "Active", dateReported: "2026-08-01", dateVerified: "2026-08-02", dateResolved: "—", severity: "Severe" },
  { id: 5, caseId: "HS-2026-0195", disease: "Dengue", patientName: "Jose Mendoza", age: 55, barangay: "Poblacion", status: "Under Monitoring", dateReported: "2026-08-02", dateVerified: "2026-08-03", dateResolved: "—", severity: "Moderate" },
  { id: 6, caseId: "HS-2026-0196", disease: "Influenza", patientName: "Teresa Gomez", age: 41, barangay: "Bagong Silang", status: "Resolved", dateReported: "2026-07-25", dateVerified: "2026-07-26", dateResolved: "2026-08-01", severity: "Mild" },
  { id: 7, caseId: "HS-2026-0197", disease: "TB", patientName: "Roberto Flores", age: 37, barangay: "San Jose", status: "Under Monitoring", dateReported: "2026-07-22", dateVerified: "2026-07-23", dateResolved: "—", severity: "Moderate" },
  { id: 8, caseId: "HS-2026-0198", disease: "Dengue", patientName: "Lina Morales", age: 29, barangay: "Maysilo", status: "Active", dateReported: "2026-08-03", dateVerified: "2026-08-04", dateResolved: "—", severity: "Severe" },
];

const initialAlerts: SurveillanceAlert[] = [
  { id: 1, title: "Dengue Outbreak Alert", message: "3 active dengue cases in Poblacion and Maysilo. Immediate vector control required.", type: "Outbreak", date: "2026-08-04", status: "Active" },
  { id: 2, title: "Cholera Warning", message: "1 severe cholera case reported in Maysilo. Water quality inspection needed.", type: "Warning", date: "2026-08-03", status: "Active" },
  { id: 3, title: "Influenza Trend", message: "2 influenza cases resolved. No new cases this week.", type: "Info", date: "2026-08-01", status: "Resolved" },
];

const locationStats: LocationStat[] = [
  { barangay: "Poblacion", cases: 2, recovered: 0, active: 2, trend: "Increasing" },
  { barangay: "Bagong Silang", cases: 2, recovered: 1, active: 1, trend: "Stable" },
  { barangay: "San Jose", cases: 2, recovered: 1, active: 1, trend: "Decreasing" },
  { barangay: "Maysilo", cases: 2, recovered: 0, active: 2, trend: "Increasing" },
];

type Tab = "cases" | "alerts" | "report";

export default function Surveillance(): JSX.Element {
  const [activeTab, setActiveTab] = useState<Tab>("cases");
  const [cases, setCases] = useState<DiseaseCase[]>(initialCases);
  const [alerts, setAlerts] = useState<SurveillanceAlert[]>(initialAlerts);

  const [newCase, setNewCase] = useState({
    disease: "Dengue", patientName: "", age: "", barangay: "", severity: "Moderate",
  });

  const [newAlert, setNewAlert] = useState({
    title: "", message: "", type: "Warning",
  });

  const handleAddCase = (e: React.FormEvent) => {
    e.preventDefault();
    const caseEntry: DiseaseCase = {
      id: Date.now(),
      caseId: `HS-2026-${String(cases.length + 191).padStart(4, "0")}`,
      disease: newCase.disease,
      patientName: newCase.patientName,
      age: parseInt(newCase.age) || 0,
      barangay: newCase.barangay,
      status: "Active",
      dateReported: new Date().toISOString().split("T")[0],
      dateVerified: "—",
      dateResolved: "—",
      severity: newCase.severity,
    };
    setCases((prev) => [caseEntry, ...prev]);
    setNewCase({ disease: "Dengue", patientName: "", age: "", barangay: "", severity: "Moderate" });
  };

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const alert: SurveillanceAlert = {
      id: Date.now(),
      title: newAlert.title,
      message: newAlert.message,
      type: newAlert.type,
      date: new Date().toISOString().split("T")[0],
      status: "Active",
    };
    setAlerts((prev) => [alert, ...prev]);
    setNewAlert({ title: "", message: "", type: "Warning" });
  };

  const updateCaseStatus = (id: number, status: string) => {
    setCases((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const updateAlertStatus = (id: number, status: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const caseColumns = [
    { key: "caseId" as const, label: "Case ID" },
    { key: "disease" as const, label: "Disease" },
    { key: "patientName" as const, label: "Patient" },
    { key: "age" as const, label: "Age" },
    { key: "barangay" as const, label: "Barangay" },
    { key: "status" as const, label: "Status" },
    { key: "dateReported" as const, label: "Reported" },
    { key: "severity" as const, label: "Severity" },
  ];

  const alertColumns = [
    { key: "title" as const, label: "Title" },
    { key: "message" as const, label: "Message" },
    { key: "type" as const, label: "Type" },
    { key: "date" as const, label: "Date" },
    { key: "status" as const, label: "Status" },
  ];

  const activeCases = cases.filter((c) => c.status === "Active").length;
  const underMonitoring = cases.filter((c) => c.status === "Under Monitoring").length;
  const recovered = cases.filter((c) => c.status === "Resolved").length;
  const totalCases = cases.length;

  const getStatusColor = (status: string) => {
    if (status === "Resolved" || status === "Completed") return "text-emerald-600 bg-emerald-50";
    if (status === "Active" || status === "Outbreak") return "text-red-600 bg-red-50";
    if (status === "Under Monitoring" || status === "Warning") return "text-amber-600 bg-amber-50";
    return "text-gray-600 bg-gray-50";
  };

  const getSeverityColor = (severity: string) => {
    if (severity === "Severe") return "text-red-600 bg-red-50";
    if (severity === "Moderate") return "text-amber-600 bg-amber-50";
    return "text-blue-600 bg-blue-50";
  };

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-[#0A2942]">
          Health Surveillance System
        </h1>

        <p className="mt-2 text-gray-500">
          Monitor disease cases and outbreaks within the municipality.
        </p>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Cases</p>
              <p className="mt-1 text-3xl font-bold text-red-600">{activeCases}</p>
            </div>
            <div className="rounded-xl bg-red-50 p-3"><Activity className="text-red-500" size={22} /></div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Under Monitoring</p>
              <p className="mt-1 text-3xl font-bold text-amber-500">{underMonitoring}</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-3"><Clock className="text-amber-500" size={22} /></div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Recovered</p>
              <p className="mt-1 text-3xl font-bold text-emerald-600">{recovered}</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3"><CheckCircle2 className="text-emerald-500" size={22} /></div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Critical Alerts</p>
              <p className="mt-1 text-3xl font-bold text-red-600">{alerts.filter((a) => a.status === "Active").length}</p>
            </div>
            <div className="rounded-xl bg-red-50 p-3"><AlertTriangle className="text-red-500" size={22} /></div>
          </div>
        </div>

      </div>

      {/* HEALTH ALERTS */}

      {alerts.filter((a) => a.status === "Active").length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-amber-100 p-2">
              <AlertTriangle className="text-amber-600" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-800">Health Alert</h3>
              <p className="mt-1 text-sm text-amber-700">
                {alerts.filter((a) => a.status === "Active").length} active alert(s) require immediate monitoring.
              </p>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-amber-700">Response Progress</span>
                  <span className="text-xs font-semibold text-amber-800">60%</span>
                </div>
                <ProgressBar value={60} color="#F59E0B" size="lg" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOCATION STATS */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-[#0A2942]">Location-Based Surveillance</h3>
        <p className="text-sm text-gray-500">Case distribution by barangay</p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {locationStats.map((loc) => (
            <div key={loc.barangay} className="rounded-xl border bg-gray-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={16} className="text-gray-400" />
                <p className="text-sm font-medium text-[#0A2942]">{loc.barangay}</p>
              </div>
              <div className="space-y-1 text-xs text-gray-600">
                <p>Total Cases: <span className="font-semibold">{loc.cases}</span></p>
                <p>Active: <span className="font-semibold text-red-600">{loc.active}</span></p>
                <p>Recovered: <span className="font-semibold text-emerald-600">{loc.recovered}</span></p>
                <p>Trend: <span className="font-semibold">{loc.trend}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TABS */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="flex items-center gap-1 border-b p-2 overflow-x-auto">
          {[
            { id: "cases" as Tab, label: "Case Reports" },
            { id: "alerts" as Tab, label: "Alerts" },
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
            onClick={() => alert(`Add new ${activeTab === "cases" ? "case report" : "alert"} form toggled. Use the form below.`)}
            className="ml-auto flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition"
          >
            <Plus size={16} />
            New Entry
          </button>
        </div>

        <div className="p-6">

          {/* ADD CASE FORM */}

          {activeTab === "cases" && (
            <form onSubmit={handleAddCase} className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-4 font-semibold text-[#0A2942]">Report New Case</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Disease</label>
                  <select value={newCase.disease} onChange={(e) => setNewCase({ ...newCase, disease: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10">
                    <option>Dengue</option>
                    <option>Influenza</option>
                    <option>Cholera</option>
                    <option>TB</option>
                    <option>COVID-19</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                  <input type="text" required value={newCase.patientName} onChange={(e) => setNewCase({ ...newCase, patientName: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input type="number" required value={newCase.age} onChange={(e) => setNewCase({ ...newCase, age: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Barangay</label>
                  <input type="text" required value={newCase.barangay} onChange={(e) => setNewCase({ ...newCase, barangay: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Severity</label>
                  <select value={newCase.severity} onChange={(e) => setNewCase({ ...newCase, severity: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10">
                    <option>Mild</option>
                    <option>Moderate</option>
                    <option>Severe</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <button type="submit" className="rounded-lg bg-[#0A2942] px-4 py-2 text-sm font-semibold text-white hover:bg-[#123B5D] transition">Report Case</button>
              </div>
            </form>
          )}

          {/* ADD ALERT FORM */}

          {activeTab === "alerts" && (
            <form onSubmit={handleAddAlert} className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-4 font-semibold text-[#0A2942]">Create Alert</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input type="text" required value={newAlert.title} onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select value={newAlert.type} onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10">
                    <option>Warning</option>
                    <option>Outbreak</option>
                    <option>Info</option>
                  </select>
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea required value={newAlert.message} onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })} rows={2} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
              </div>
              <div className="mt-4">
                <button type="submit" className="rounded-lg bg-[#0A2942] px-4 py-2 text-sm font-semibold text-white hover:bg-[#123B5D] transition">Create Alert</button>
              </div>
            </form>
          )}

          {/* DATA TABLES */}

          {activeTab === "cases" && (
            <DataTable data={cases} columns={caseColumns} searchKey="patientName" pageSize={5} />
          )}

          {activeTab === "alerts" && (
            <DataTable data={alerts} columns={alertColumns} searchKey="title" pageSize={5} />
          )}

        </div>
      </div>

      {/* CASE INVESTIGATION TRACKER */}

      {cases.length > 0 && (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-[#0A2942]">Case Investigation Progress</h3>
          <p className="text-sm text-gray-500">Update case status as investigation progresses</p>
          <div className="mt-4 space-y-3">
            {cases.slice(0, 3).map((caseEntry) => (
              <div key={caseEntry.id} className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
                <div>
                  <p className="text-sm font-medium text-[#0A2942]">{caseEntry.caseId} — {caseEntry.disease}</p>
                  <p className="text-xs text-gray-500">Patient: {caseEntry.patientName} | Barangay: {caseEntry.barangay}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(caseEntry.status)}`}>{caseEntry.status}</span>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${getSeverityColor(caseEntry.severity)}`}>{caseEntry.severity}</span>
                  <select
                    value={caseEntry.status}
                    onChange={(e) => updateCaseStatus(caseEntry.id, e.target.value)}
                    className="rounded-lg border border-gray-300 px-2 py-1 text-xs focus:border-[#0A2942] focus:outline-none"
                  >
                    <option>Active</option>
                    <option>Under Monitoring</option>
                    <option>Resolved</option>
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
