import { useState } from "react";
import AIVaccinationReminder from "../components/immunization/AIVaccinationReminder";
import ProgressBar from "../components/ui/ProgressBar";
import DataTable from "../components/DataTable";
import { Plus, Syringe, Apple, CalendarClock, AlertTriangle, CheckCircle2 } from "lucide-react";

interface VaccinationRecord {
  id: number;
  patientName: string;
  age: number;
  vaccine: string;
  dose: string;
  dueDate: string;
  dateGiven: string;
  status: string;
  barangay: string;
}

interface NutritionRecord {
  id: number;
  patientName: string;
  age: number;
  status: string;
  weight: string;
  height: string;
  date: string;
  barangay: string;
}

const initialVaccinations: VaccinationRecord[] = [
  { id: 1, patientName: "Juan Dela Cruz", age: 2, vaccine: "BCG", dose: "1st Dose", dueDate: "2026-01-15", dateGiven: "2026-01-15", status: "Completed", barangay: "Poblacion" },
  { id: 2, patientName: "Juan Dela Cruz", age: 2, vaccine: "Hepatitis B", dose: "1st Dose", dueDate: "2026-01-15", dateGiven: "2026-01-15", status: "Completed", barangay: "Poblacion" },
  { id: 3, patientName: "Juan Dela Cruz", age: 2, vaccine: "Pentavalent", dose: "1st Dose", dueDate: "2026-02-15", dateGiven: "2026-02-15", status: "Completed", barangay: "Poblacion" },
  { id: 4, patientName: "Juan Dela Cruz", age: 2, vaccine: "Polio", dose: "1st Dose", dueDate: "2026-03-15", dateGiven: "2026-03-15", status: "Completed", barangay: "Poblacion" },
  { id: 5, patientName: "Juan Dela Cruz", age: 2, vaccine: "MMR", dose: "1st Dose", dueDate: "2026-07-31", dateGiven: "", status: "Upcoming", barangay: "Poblacion" },
  { id: 6, patientName: "Maria Santos", age: 1, vaccine: "BCG", dose: "1st Dose", dueDate: "2026-03-10", dateGiven: "2026-03-10", status: "Completed", barangay: "Bagong Silang" },
  { id: 7, patientName: "Maria Santos", age: 1, vaccine: "Hepatitis B", dose: "3rd Dose", dueDate: "2026-08-11", dateGiven: "", status: "Upcoming", barangay: "Bagong Silang" },
  { id: 8, patientName: "Carlos Reyes", age: 5, vaccine: "Measles", dose: "2nd Dose", dueDate: "2026-07-25", dateGiven: "", status: "Overdue", barangay: "San Jose" },
  { id: 9, patientName: "Ana Garcia", age: 3, vaccine: "DPT", dose: "Booster", dueDate: "2026-08-08", dateGiven: "", status: "Upcoming", barangay: "Maysilo" },
];

const initialNutrition: NutritionRecord[] = [
  { id: 1, patientName: "Juan Dela Cruz", age: 2, status: "Normal", weight: "12.5 kg", height: "87 cm", date: "2026-08-01", barangay: "Poblacion" },
  { id: 2, patientName: "Maria Santos", age: 1, status: "Normal", weight: "9.2 kg", height: "74 cm", date: "2026-08-02", barangay: "Bagong Silang" },
  { id: 3, patientName: "Carlos Reyes", age: 5, status: "Underweight", weight: "15.1 kg", height: "102 cm", date: "2026-07-28", barangay: "San Jose" },
  { id: 4, patientName: "Ana Garcia", age: 3, status: "Normal", weight: "13.8 kg", height: "92 cm", date: "2026-08-03", barangay: "Maysilo" },
  { id: 5, patientName: "Lina Morales", age: 4, status: "Overweight", weight: "18.5 kg", height: "105 cm", date: "2026-08-04", barangay: "Maysilo" },
];

type Tab = "vaccination" | "nutrition" | "children";

export default function Immunization(): JSX.Element {
  const [activeTab, setActiveTab] = useState<Tab>("vaccination");
  const [vaccinations, setVaccinations] = useState<VaccinationRecord[]>(initialVaccinations);
  const [nutrition, setNutrition] = useState<NutritionRecord[]>(initialNutrition);

  const [newVaccination, setNewVaccination] = useState({
    patientName: "", age: "", vaccine: "", dose: "1st Dose", dueDate: "", barangay: "",
  });

  const [newNutrition, setNewNutrition] = useState({
    patientName: "", age: "", weight: "", height: "", status: "Normal", barangay: "",
  });

  const handleAddVaccination = (e: React.FormEvent) => {
    e.preventDefault();
    const record: VaccinationRecord = {
      id: Date.now(),
      patientName: newVaccination.patientName,
      age: parseInt(newVaccination.age) || 0,
      vaccine: newVaccination.vaccine,
      dose: newVaccination.dose,
      dueDate: newVaccination.dueDate,
      dateGiven: "",
      status: "Upcoming",
      barangay: newVaccination.barangay,
    };
    setVaccinations((prev) => [record, ...prev]);
    setNewVaccination({ patientName: "", age: "", vaccine: "", dose: "1st Dose", dueDate: "", barangay: "" });
  };

  const handleAddNutrition = (e: React.FormEvent) => {
    e.preventDefault();
    const record: NutritionRecord = {
      id: Date.now(),
      patientName: newNutrition.patientName,
      age: parseInt(newNutrition.age) || 0,
      weight: newNutrition.weight,
      height: newNutrition.height,
      status: newNutrition.status,
      date: new Date().toISOString().split("T")[0],
      barangay: newNutrition.barangay,
    };
    setNutrition((prev) => [record, ...prev]);
    setNewNutrition({ patientName: "", age: "", weight: "", height: "", status: "Normal", barangay: "" });
  };

  const markAsGiven = (id: number) => {
    setVaccinations((prev) => prev.map((v) => (v.id === id ? { ...v, status: "Completed", dateGiven: new Date().toISOString().split("T")[0] } : v)));
  };

  const vaccinationColumns = [
    { key: "id" as const, label: "ID" },
    { key: "patientName" as const, label: "Patient" },
    { key: "age" as const, label: "Age" },
    { key: "vaccine" as const, label: "Vaccine" },
    { key: "dose" as const, label: "Dose" },
    { key: "dueDate" as const, label: "Due Date" },
    { key: "status" as const, label: "Status" },
    { key: "barangay" as const, label: "Barangay" },
  ];

  const nutritionColumns = [
    { key: "id" as const, label: "ID" },
    { key: "patientName" as const, label: "Patient" },
    { key: "age" as const, label: "Age" },
    { key: "weight" as const, label: "Weight" },
    { key: "height" as const, label: "Height" },
    { key: "status" as const, label: "Status" },
    { key: "date" as const, label: "Date" },
  ];

  const fullyVaccinated = vaccinations.filter((v) => v.status === "Completed").length;
  const upcoming = vaccinations.filter((v) => v.status === "Upcoming").length;
  const overdue = vaccinations.filter((v) => v.status === "Overdue").length;
  const totalVaccinations = vaccinations.length;
  const coverageRate = totalVaccinations === 0 ? 0 : Math.round((fullyVaccinated / totalVaccinations) * 100);

  const normalNutrition = nutrition.filter((n) => n.status === "Normal").length;
  const underweight = nutrition.filter((n) => n.status === "Underweight").length;
  const overweight = nutrition.filter((n) => n.status === "Overweight").length;

  const getStatusColor = (status: string) => {
    if (status === "Completed") return "text-emerald-600 bg-emerald-50";
    if (status === "Upcoming") return "text-blue-600 bg-blue-50";
    if (status === "Overdue") return "text-red-600 bg-red-50";
    return "text-gray-600 bg-gray-50";
  };

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-[#0A2942]">
          Immunization & Nutrition
        </h1>

        <p className="mt-2 text-gray-500">
          Monitor vaccination schedules and nutrition programs.
        </p>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Fully Vaccinated</p>
              <p className="mt-1 text-3xl font-bold text-emerald-600">{fullyVaccinated}</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3"><CheckCircle2 className="text-emerald-500" size={22} /></div>
          </div>
          <div className="mt-3"><ProgressBar value={coverageRate} color="#16A34A" size="sm" /></div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Upcoming</p>
              <p className="mt-1 text-3xl font-bold text-blue-600">{upcoming}</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-3"><CalendarClock className="text-blue-500" size={22} /></div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Overdue</p>
              <p className="mt-1 text-3xl font-bold text-red-600">{overdue}</p>
            </div>
            <div className="rounded-xl bg-red-50 p-3"><AlertTriangle className="text-red-500" size={22} /></div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Nutrition Normal</p>
              <p className="mt-1 text-3xl font-bold text-emerald-600">{normalNutrition}</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3"><Apple className="text-emerald-500" size={22} /></div>
          </div>
        </div>

      </div>

      {/* VACCINATION COVERAGE */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-[#0A2942]">Immunization Coverage</h3>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Fully Vaccinated</span>
              <span className="text-sm font-semibold text-[#0A2942]">{coverageRate}%</span>
            </div>
            <ProgressBar value={coverageRate} color="#16A34A" size="lg" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Underweight / Overdue</span>
              <span className="text-sm font-semibold text-[#0A2942]">{underweight + overdue}</span>
            </div>
            <ProgressBar value={underweight + overdue > 0 ? 20 : 0} color="#DC2626" size="lg" />
          </div>
        </div>
      </div>

      {/* TABS */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="flex items-center gap-1 border-b p-2 overflow-x-auto">
          {[
            { id: "vaccination" as Tab, label: "Vaccination Records", icon: Syringe },
            { id: "nutrition" as Tab, label: "Nutrition", icon: Apple },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab.id ? "bg-[#0A2942] text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
          <button
            onClick={() => {
              if (activeTab === "vaccination") {
                setNewVaccination({ ...newVaccination, patientName: "", vaccine: "", dueDate: "", barangay: "" });
              } else {
                setNewNutrition({ ...newNutrition, patientName: "", weight: "", height: "", barangay: "" });
              }
              alert(`Add new ${activeTab === "vaccination" ? "vaccination" : "nutrition"} record form toggled. Use the form below.`);
            }}
            className="ml-auto flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition"
          >
            <Plus size={16} />
            Add Record
          </button>
        </div>

        <div className="p-6">

          {/* ADD VACCINATION FORM */}

          {activeTab === "vaccination" && (
            <form onSubmit={handleAddVaccination} className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-4 font-semibold text-[#0A2942]">Add Vaccination Record</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                  <input type="text" required value={newVaccination.patientName} onChange={(e) => setNewVaccination({ ...newVaccination, patientName: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input type="number" required value={newVaccination.age} onChange={(e) => setNewVaccination({ ...newVaccination, age: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vaccine</label>
                  <input type="text" required value={newVaccination.vaccine} onChange={(e) => setNewVaccination({ ...newVaccination, vaccine: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dose</label>
                  <select value={newVaccination.dose} onChange={(e) => setNewVaccination({ ...newVaccination, dose: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10">
                    <option>1st Dose</option>
                    <option>2nd Dose</option>
                    <option>3rd Dose</option>
                    <option>Booster</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Due Date</label>
                  <input type="date" required value={newVaccination.dueDate} onChange={(e) => setNewVaccination({ ...newVaccination, dueDate: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Barangay</label>
                  <input type="text" required value={newVaccination.barangay} onChange={(e) => setNewVaccination({ ...newVaccination, barangay: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
              </div>
              <div className="mt-4">
                <button type="submit" className="rounded-lg bg-[#0A2942] px-4 py-2 text-sm font-semibold text-white hover:bg-[#123B5D] transition">Add Record</button>
              </div>
            </form>
          )}

          {/* ADD NUTRITION FORM */}

          {activeTab === "nutrition" && (
            <form onSubmit={handleAddNutrition} className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-4 font-semibold text-[#0A2942]">Add Nutrition Record</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                  <input type="text" required value={newNutrition.patientName} onChange={(e) => setNewNutrition({ ...newNutrition, patientName: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input type="number" required value={newNutrition.age} onChange={(e) => setNewNutrition({ ...newNutrition, age: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Weight</label>
                  <input type="text" required value={newNutrition.weight} onChange={(e) => setNewNutrition({ ...newNutrition, weight: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Height</label>
                  <input type="text" required value={newNutrition.height} onChange={(e) => setNewNutrition({ ...newNutrition, height: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select value={newNutrition.status} onChange={(e) => setNewNutrition({ ...newNutrition, status: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10">
                    <option>Normal</option>
                    <option>Underweight</option>
                    <option>Overweight</option>
                    <option>Severely Underweight</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Barangay</label>
                  <input type="text" required value={newNutrition.barangay} onChange={(e) => setNewNutrition({ ...newNutrition, barangay: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0A2942] focus:outline-none focus:ring-2 focus:ring-[#0A2942]/10" />
                </div>
              </div>
              <div className="mt-4">
                <button type="submit" className="rounded-lg bg-[#0A2942] px-4 py-2 text-sm font-semibold text-white hover:bg-[#123B5D] transition">Add Record</button>
              </div>
            </form>
          )}

          {/* DATA TABLES */}

          {activeTab === "vaccination" && (
            <DataTable data={vaccinations} columns={vaccinationColumns} searchKey="patientName" pageSize={5} />
          )}

          {activeTab === "nutrition" && (
            <DataTable data={nutrition} columns={nutritionColumns} searchKey="patientName" pageSize={5} />
          )}

        </div>
      </div>

      {/* AI VACCINATION REMINDER */}

      <AIVaccinationReminder />

    </div>
  );
}
