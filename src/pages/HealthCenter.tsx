import { useState } from "react";
import ProgressBar from "../components/ui/ProgressBar";
import DataTable from "../components/DataTable";
import {
  Plus,
  UserPlus,
  CalendarCheck,
  Stethoscope,
  FileText,
  Activity,
} from "lucide-react";

interface Patient {
  id: number;
  name: string;
  age: number;
  sex: string;
  barangay: string;
  status: string;
  lastVisit: string;
  nextAppointment: string;
}

interface Consultation {
  id: number;
  patientName: string;
  date: string;
  type: string;
  diagnosis: string;
  status: string;
}

interface MedicalRecord {
  id: number;
  patientName: string;
  date: string;
  type: string;
  notes: string;
  doctor: string;
}

const initialPatients: Patient[] = [
  { id: 1, name: "Juan Dela Cruz", age: 45, sex: "Male", barangay: "Poblacion", status: "Active", lastVisit: "2026-08-01", nextAppointment: "2026-08-08" },
  { id: 2, name: "Maria Santos", age: 32, sex: "Female", barangay: "Bagong Silang", status: "Active", lastVisit: "2026-08-02", nextAppointment: "2026-08-09" },
  { id: 3, name: "Pedro Reyes", age: 60, sex: "Male", barangay: "San Jose", status: "Completed", lastVisit: "2026-07-28", nextAppointment: "—" },
  { id: 4, name: "Ana Lopez", age: 28, sex: "Female", barangay: "Maysilo", status: "Active", lastVisit: "2026-08-03", nextAppointment: "2026-08-10" },
  { id: 5, name: "Jose Mendoza", age: 55, sex: "Male", barangay: "Poblacion", status: "Pending", lastVisit: "2026-07-30", nextAppointment: "2026-08-12" },
  { id: 6, name: "Teresa Gomez", age: 41, sex: "Female", barangay: "Bagong Silang", status: "Active", lastVisit: "2026-08-04", nextAppointment: "2026-08-11" },
  { id: 7, name: "Roberto Flores", age: 37, sex: "Male", barangay: "San Jose", status: "Completed", lastVisit: "2026-07-30", nextAppointment: "—" },
  { id: 8, name: "Lina Morales", age: 29, sex: "Female", barangay: "Maysilo", status: "Active", lastVisit: "2026-08-06", nextAppointment: "2026-08-13" },
];

const initialConsultations: Consultation[] = [
  { id: 1, patientName: "Juan Dela Cruz", date: "2026-08-01", type: "General Check-up", diagnosis: "Hypertension", status: "Completed" },
  { id: 2, patientName: "Maria Santos", date: "2026-08-02", type: "Consultation", diagnosis: "Upper Respiratory Infection", status: "Completed" },
  { id: 3, patientName: "Pedro Reyes", date: "2026-07-28", type: "Follow-up", diagnosis: "Diabetes Management", status: "Completed" },
  { id: 4, patientName: "Ana Lopez", date: "2026-08-03", type: "General Check-up", diagnosis: "Healthy", status: "Active" },
  { id: 5, patientName: "Jose Mendoza", date: "2026-08-05", type: "Consultation", diagnosis: "—", status: "Pending" },
  { id: 6, patientName: "Teresa Gomez", date: "2026-08-04", type: "Dental", diagnosis: "Dental Cleaning", status: "Active" },
];

const initialRecords: MedicalRecord[] = [
  { id: 1, patientName: "Juan Dela Cruz", date: "2026-08-01", type: "Consultation", notes: "Blood pressure 140/90. Prescribed medication.", doctor: "Dr. Reyes" },
  { id: 2, patientName: "Maria Santos", date: "2026-08-02", type: "Lab Result", notes: "Complete Blood Count normal.", doctor: "Dr. Cruz" },
  { id: 3, patientName: "Pedro Reyes", date: "2026-07-28", type: "Follow-up", notes: "Blood sugar levels improved.", doctor: "Dr. Reyes" },
  { id: 4, patientName: "Ana Lopez", date: "2026-08-03", type: "Consultation", notes: "Routine check-up. No issues found.", doctor: "Dr. Santos" },
];

type Tab = "patients" | "consultations" | "records" | "register";

export default function HealthCenter() {
  const [activeTab, setActiveTab] = useState<Tab>("patients");
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [consultations, setConsultations] = useState<Consultation[]>(initialConsultations);
  const [records, setRecords] = useState<MedicalRecord[]>(initialRecords);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const [newPatient, setNewPatient] = useState({
    name: "", age: "", sex: "Male", barangay: "", status: "Active",
  });

  const [newConsultation, setNewConsultation] = useState({
    patientName: "", type: "General Check-up", diagnosis: "", status: "Pending",
  });

  const [newRecord, setNewRecord] = useState({
    patientName: "", type: "Consultation", notes: "", doctor: "",
  });

  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const patient: Patient = {
      id: Date.now(),
      name: newPatient.name,
      age: parseInt(newPatient.age) || 0,
      sex: newPatient.sex,
      barangay: newPatient.barangay,
      status: newPatient.status,
      lastVisit: new Date().toISOString().split("T")[0],
      nextAppointment: "—",
    };
    setPatients((prev) => [patient, ...prev]);
    setNewPatient({ name: "", age: "", sex: "Male", barangay: "", status: "Active" });
    setShowRegisterForm(false);
  };

  const handleAddConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    const consultation: Consultation = {
      id: Date.now(),
      patientName: newConsultation.patientName,
      date: new Date().toISOString().split("T")[0],
      type: newConsultation.type,
      diagnosis: newConsultation.diagnosis,
      status: newConsultation.status,
    };
    setConsultations((prev) => [consultation, ...prev]);
    setNewConsultation({ patientName: "", type: "General Check-up", diagnosis: "", status: "Pending" });
  };

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const record: MedicalRecord = {
      id: Date.now(),
      patientName: newRecord.patientName,
      date: new Date().toISOString().split("T")[0],
      type: newRecord.type,
      notes: newRecord.notes,
      doctor: newRecord.doctor,
    };
    setRecords((prev) => [record, ...prev]);
    setNewRecord({ patientName: "", type: "Consultation", notes: "", doctor: "" });
  };

  const totalPatients = patients.length;
  const completedConsultations = consultations.filter((c) => c.status === "Completed").length;
  const pendingConsultations = consultations.filter((c) => c.status === "Pending" || c.status === "Active").length;
  const completedRate = totalPatients === 0 ? 0 : Math.round((completedConsultations / totalPatients) * 100);

  const patientColumns = [
    { key: "id" as const, label: "ID" },
    { key: "name" as const, label: "Patient Name" },
    { key: "age" as const, label: "Age" },
    { key: "sex" as const, label: "Sex" },
    { key: "barangay" as const, label: "Barangay" },
    { key: "status" as const, label: "Status" },
    { key: "lastVisit" as const, label: "Last Visit" },
  ];

  const consultationColumns = [
    { key: "id" as const, label: "ID" },
    { key: "patientName" as const, label: "Patient" },
    { key: "date" as const, label: "Date" },
    { key: "type" as const, label: "Type" },
    { key: "diagnosis" as const, label: "Diagnosis" },
    { key: "status" as const, label: "Status" },
  ];

  const recordColumns = [
    { key: "id" as const, label: "ID" },
    { key: "patientName" as const, label: "Patient" },
    { key: "date" as const, label: "Date" },
    { key: "type" as const, label: "Type" },
    { key: "doctor" as const, label: "Doctor" },
    { key: "notes" as const, label: "Notes" },
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-[#0A2942]">
          Health Center Services
        </h1>

        <p className="mt-2 text-gray-500">
          Manage consultations, patients, appointments, and medical records.
        </p>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Patients</p>
              <p className="mt-1 text-3xl font-bold text-[#0A2942]">{totalPatients}</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-3"><UserPlus className="text-blue-500" size={22} /></div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed Consultations</p>
              <p className="mt-1 text-3xl font-bold text-emerald-600">{completedConsultations}</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3"><Stethoscope className="text-emerald-500" size={22} /></div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Consultations</p>
              <p className="mt-1 text-3xl font-bold text-amber-500">{pendingConsultations}</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-3"><CalendarCheck className="text-amber-500" size={22} /></div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completion Rate</p>
              <p className="mt-1 text-3xl font-bold text-[#0A2942]">{completedRate}%</p>
            </div>
            <div className="rounded-xl bg-[#0A2942]/10 p-3"><Activity className="text-[#0A2942]" size={22} /></div>
          </div>
          <div className="mt-3">
            <ProgressBar value={completedRate} color="#0A2942" size="sm" />
          </div>
        </div>

      </div>

      {/* TABS */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="flex items-center gap-1 border-b p-2 overflow-x-auto">
          {[
            { id: "patients" as Tab, label: "Patients", icon: UserPlus },
            { id: "consultations" as Tab, label: "Consultations", icon: Stethoscope },
            { id: "records" as Tab, label: "Medical Records", icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "bg-[#0A2942] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
          <button
            onClick={() => setShowRegisterForm(!showRegisterForm)}
            className="ml-auto flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition"
          >
            <Plus size={16} />
            New
          </button>
        </div>

        <div className="p-6">

          {/* REGISTER FORM */}

          {showRegisterForm && (
            <form onSubmit={handleRegisterPatient} className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-4 font-semibold text-[#0A2942]">Register New Patient</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" required value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input type="number" required value={newPatient.age} onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sex</label>
                  <select value={newPatient.sex} onChange={(e) => setNewPatient({ ...newPatient, sex: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">Barangay</label>
                  <input type="text" required value={newPatient.barangay} onChange={(e) => setNewPatient({ ...newPatient, barangay: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <button type="submit" className="rounded-lg bg-[#0A2942] px-4 py-2 text-sm font-semibold text-white hover:bg-[#123B5D] transition">Register Patient</button>
                <button type="button" onClick={() => setShowRegisterForm(false)} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">Cancel</button>
              </div>
            </form>
          )}

          {/* ADD CONSULTATION */}

          {activeTab === "consultations" && (
            <form onSubmit={handleAddConsultation} className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-4 font-semibold text-[#0A2942]">Add Consultation</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                  <input type="text" required value={newConsultation.patientName} onChange={(e) => setNewConsultation({ ...newConsultation, patientName: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select value={newConsultation.type} onChange={(e) => setNewConsultation({ ...newConsultation, type: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10">
                    <option>General Check-up</option>
                    <option>Consultation</option>
                    <option>Follow-up</option>
                    <option>Dental</option>
                    <option>Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Diagnosis</label>
                  <input type="text" required value={newConsultation.diagnosis} onChange={(e) => setNewConsultation({ ...newConsultation, diagnosis: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select value={newConsultation.status} onChange={(e) => setNewConsultation({ ...newConsultation, status: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10">
                    <option>Pending</option>
                    <option>Active</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <button type="submit" className="rounded-lg bg-[#0A2942] px-4 py-2 text-sm font-semibold text-white hover:bg-[#123B5D] transition">Add Consultation</button>
              </div>
            </form>
          )}

          {/* ADD MEDICAL RECORD */}

          {activeTab === "records" && (
            <form onSubmit={handleAddRecord} className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-4 font-semibold text-[#0A2942]">Add Medical Record</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                  <input type="text" required value={newRecord.patientName} onChange={(e) => setNewRecord({ ...newRecord, patientName: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select value={newRecord.type} onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10">
                    <option>Consultation</option>
                    <option>Lab Result</option>
                    <option>Follow-up</option>
                    <option>Prescription</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Doctor</label>
                  <input type="text" required value={newRecord.doctor} onChange={(e) => setNewRecord({ ...newRecord, doctor: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div className="sm:col-span-2 lg:col-span-4">
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <textarea required value={newRecord.notes} onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })} rows={3} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
              </div>
              <div className="mt-4">
                <button type="submit" className="rounded-lg bg-[#0A2942] px-4 py-2 text-sm font-semibold text-white hover:bg-[#123B5D] transition">Add Record</button>
              </div>
            </form>
          )}

          {/* TABLES */}

          {activeTab === "patients" && (
            <DataTable data={patients} columns={patientColumns} searchKey="name" pageSize={5} />
          )}

          {activeTab === "consultations" && (
            <DataTable data={consultations} columns={consultationColumns} searchKey="patientName" pageSize={5} />
          )}

          {activeTab === "records" && (
            <DataTable data={records} columns={recordColumns} searchKey="patientName" pageSize={5} />
          )}

        </div>
      </div>

    </div>
  );
}
