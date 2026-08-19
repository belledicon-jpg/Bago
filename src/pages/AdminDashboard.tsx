import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  UserPlus,
  CalendarCheck,
  Clock,
  AlertTriangle,
  Stethoscope,
  Activity,
  Wrench,
  Syringe,
  Apple,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Users,
  ClipboardCheck,
  Bell,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Brain,
  ArrowRight,
  FileText,
  Settings,
  Search,
  RefreshCw,
} from "lucide-react";
import ProgressBar from "../components/ui/ProgressBar";

const DOCTORS = [
  { id: 1, name: "Dr. Santos", schedule: "8:00 AM–4:00 PM", status: "Available", room: "101", patients: 4, appointments: 8, ongoing: 2, completed: 5, followUps: 1 },
  { id: 2, name: "Dr. Reyes", schedule: "9:00 AM–5:00 PM", status: "Treating", room: "102", patients: 6, appointments: 10, ongoing: 3, completed: 4, followUps: 3 },
  { id: 3, name: "Dr. Cruz", schedule: "10:00 AM–6:00 PM", status: "Break", room: "103", patients: 3, appointments: 7, ongoing: 1, completed: 3, followUps: 2 },
  { id: 4, name: "Dr. Garcia", schedule: "8:00 AM–12:00 PM", status: "Off Duty", room: "—", patients: 0, appointments: 4, ongoing: 0, completed: 2, followUps: 1 },
];

const PATIENT_FLOW = [
  { time: "08 AM", value: 12 },
  { time: "09 AM", value: 22 },
  { time: "10 AM", value: 35 },
  { time: "11 AM", value: 42 },
  { time: "12 PM", value: 28 },
  { time: "01 PM", value: 32 },
  { time: "02 PM", value: 36 },
  { time: "03 PM", value: 24 },
];

const APPOINTMENT_DATA = {
  today: [
    { name: "Mon", completed: 18, cancelled: 2, noShow: 1 },
    { name: "Tue", completed: 22, cancelled: 1, noShow: 2 },
    { name: "Wed", completed: 25, cancelled: 3, noShow: 1 },
    { name: "Thu", completed: 20, cancelled: 1, noShow: 0 },
    { name: "Fri", completed: 28, cancelled: 2, noShow: 3 },
    { name: "Sat", completed: 15, cancelled: 1, noShow: 1 },
  ],
  week: [
    { name: "Week 1", completed: 85, cancelled: 8, noShow: 5 },
    { name: "Week 2", completed: 92, cancelled: 6, noShow: 4 },
    { name: "Week 3", completed: 88, cancelled: 10, noShow: 6 },
    { name: "Week 4", completed: 95, cancelled: 5, noShow: 3 },
  ],
  month: [
    { name: "Jan", completed: 320, cancelled: 25, noShow: 18 },
    { name: "Feb", completed: 340, cancelled: 20, noShow: 15 },
    { name: "Mar", completed: 360, cancelled: 28, noShow: 22 },
    { name: "Apr", completed: 380, cancelled: 22, noShow: 19 },
    { name: "May", completed: 400, cancelled: 18, noShow: 14 },
    { name: "Jun", completed: 420, cancelled: 24, noShow: 16 },
  ],
};

const REVENUE_DATA = [
  { name: "Jun", revenue: 720 },
  { name: "Jul", revenue: 810 },
  { name: "Aug", revenue: 840 },
];

const SURVEILLANCE_TRENDS = [
  { name: "Respiratory", cases: 42, change: 18, direction: "up" as const },
  { name: "Fever", cases: 31, change: 6, direction: "up" as const },
  { name: "Skin Conditions", cases: 19, change: 4, direction: "down" as const },
  { name: "Digestive", cases: 15, change: 0, direction: "stable" as const },
  { name: "Other", cases: 10, change: 3, direction: "down" as const },
];

const AREA_STATUS = [
  { barangay: "Barangay 1", status: "Low", color: "#16A34A" },
  { barangay: "Barangay 2", status: "Moderate", color: "#F59E0B" },
  { barangay: "Barangay 3", status: "Moderate", color: "#F59E0B" },
  { barangay: "Barangay 4", status: "High", color: "#DC2626" },
  { barangay: "Barangay 5", status: "Low", color: "#16A34A" },
];

const ALERTS = [
  { id: 1, priority: "high", title: "5 sanitation permits nearing expiration", count: 5 },
  { id: 2, priority: "medium", title: "8 patients have overdue follow-ups", count: 8 },
  { id: 3, priority: "high", title: "3 inspections have unresolved violations", count: 3 },
  { id: 4, priority: "medium", title: "6 appointments are currently delayed", count: 6 },
  { id: 5, priority: "low", title: "2 doctors have schedule conflicts", count: 2 },
];

const SYSTEM_HEALTH = [
  { name: "Health Services", value: 91 },
  { name: "Sanitation", value: 84 },
  { name: "Immunization", value: 88 },
  { name: "Nutrition", value: 82 },
  { name: "Wastewater & Septic", value: 76 },
  { name: "Health Surveillance", value: 90 },
];

type TimeRange = "today" | "week" | "month";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>("today");
  const [expandedDoctor, setExpandedDoctor] = useState<number | null>(null);

  const appointmentData = APPOINTMENT_DATA[timeRange];

  const todayKPIs = {
    doctors: 24,
    patientsToday: 148,
    appointments: 62,
    waiting: 18,
    ongoingTreatments: 12,
    followUps: 9,
    sanitationTasks: 23,
    alerts: 4,
  };

  const patientStats = {
    total: 148,
    completed: 102,
    waiting: 18,
    inTreatment: 12,
    followUp: 9,
    cancelled: 4,
    noShow: 3,
  };

  const avgTreatmentTime = 24;
  const avgWaitTime = 16;

  const getPriorityColor = (priority: string) => {
    if (priority === "high") return "text-red-600 bg-red-50 border-red-200";
    if (priority === "medium") return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-blue-600 bg-blue-50 border-blue-200";
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === "high") return <AlertTriangle size={16} className="text-red-500" />;
    if (priority === "medium") return <Clock size={16} className="text-amber-500" />;
    return <Bell size={16} className="text-blue-500" />;
  };

  const getStatusColor = (status: string) => {
    if (status === "Available" || status === "Completed") return "text-emerald-600 bg-emerald-50";
    if (status === "Treating" || status === "Active") return "text-blue-600 bg-blue-50";
    if (status === "Break") return "text-amber-600 bg-amber-50";
    return "text-gray-600 bg-gray-50";
  };

  return (
    <div className="space-y-6">

      {/* GREETING */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0A2942]">
            Good morning, Admin
          </h1>
          <p className="mt-1 text-gray-500">
            Here's what's happening across the health center today.
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 rounded-lg bg-[#0A2942] px-4 py-2 text-sm font-medium text-white hover:bg-[#123B5D] transition"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* ① TODAY'S KEY METRICS */}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">

        {[
          { label: "Doctors", value: todayKPIs.doctors, icon: UserPlus, color: "text-blue-600" },
          { label: "Patients Today", value: todayKPIs.patientsToday, icon: Users, color: "text-emerald-600" },
          { label: "Appointments", value: todayKPIs.appointments, icon: CalendarCheck, color: "text-purple-600" },
          { label: "Waiting", value: todayKPIs.waiting, icon: Clock, color: "text-amber-600" },
          { label: "Ongoing", value: todayKPIs.ongoingTreatments, icon: Stethoscope, color: "text-red-600" },
          { label: "Follow-ups", value: todayKPIs.followUps, icon: Activity, color: "text-cyan-600" },
          { label: "Sanitation", value: todayKPIs.sanitationTasks, icon: Wrench, color: "text-teal-600" },
          { label: "Alerts", value: todayKPIs.alerts, icon: AlertTriangle, color: "text-red-600" },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="rounded-2xl border bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={16} className={kpi.color} />
                <p className="text-xs text-gray-500">{kpi.label}</p>
              </div>
              <p className="text-2xl font-bold text-[#0A2942]">{kpi.value}</p>
            </div>
          );
        })}

      </div>

      {/* ② DOCTOR AVAILABILITY */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-[#0A2942]">Doctor Availability</h3>
        <p className="text-sm text-gray-500">Who is working today and their current status</p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-600">Doctor</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Schedule</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Room</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Patients</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {DOCTORS.map((doctor) => (
                <>
                  <tr key={doctor.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-[#0A2942]">{doctor.name}</td>
                    <td className="px-4 py-3 text-gray-600">{doctor.schedule}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(doctor.status)}`}>{doctor.status}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{doctor.room}</td>
                    <td className="px-4 py-3 text-gray-600">{doctor.patients}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setExpandedDoctor(expandedDoctor === doctor.id ? null : doctor.id)}
                        className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                      >
                        {expandedDoctor === doctor.id ? "Hide" : "View"}
                        {expandedDoctor === doctor.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </td>
                  </tr>
                  {expandedDoctor === doctor.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={6} className="px-4 py-4">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                          {[
                            { label: "Room", value: doctor.room },
                            { label: "Patients", value: doctor.patients },
                            { label: "Appointments", value: doctor.appointments },
                            { label: "Ongoing", value: doctor.ongoing },
                            { label: "Completed", value: doctor.completed },
                            { label: "Follow-ups", value: doctor.followUps },
                          ].map((stat) => (
                            <div key={stat.label} className="rounded-xl border bg-white p-3">
                              <p className="text-xs text-gray-500">{stat.label}</p>
                              <p className="mt-1 text-lg font-bold text-[#0A2942]">{stat.value}</p>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ③ PATIENT & TREATMENT FLOW */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-[#0A2942]">Patient Flow Today</h3>
          <p className="text-sm text-gray-500">Hourly patient visits</p>

          <div className="mt-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={PATIENT_FLOW}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0A2942" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-[#0A2942]">Treatment Monitoring</h3>
          <p className="text-sm text-gray-500">Current treatment status</p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              { label: "Ongoing", value: patientStats.inTreatment, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Waiting", value: patientStats.waiting, color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Completed", value: patientStats.completed, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Follow-up", value: patientStats.followUp, color: "text-purple-600", bg: "bg-purple-50" },
            ].map((item) => (
              <div key={item.label} className={`rounded-xl border p-4 ${item.bg}`}>
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className={`mt-1 text-3xl font-bold ${item.color}`}>{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Average treatment time</span>
              <span className="font-semibold text-[#0A2942]">{avgTreatmentTime} min</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Average waiting time</span>
              <span className="font-semibold text-[#0A2942]">{avgWaitTime} min</span>
            </div>
          </div>
        </div>
      </div>

      {/* ④ APPOINTMENT ANALYTICS */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-[#0A2942]">Appointment Performance</h3>
            <p className="text-sm text-gray-500">Track completed, cancelled, and no-show trends</p>
          </div>

          <div className="flex items-center gap-2">
            {[
              { id: "today" as TimeRange, label: "Today" },
              { id: "week" as TimeRange, label: "This Week" },
              { id: "month" as TimeRange, label: "This Month" },
            ].map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  timeRange === range.id
                    ? "bg-[#0A2942] text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 mb-6">
          {[
            { label: "Completed", value: 102, color: "text-emerald-600" },
            { label: "Pending", value: 8, color: "text-amber-600" },
            { label: "Cancelled", value: 4, color: "text-red-600" },
            { label: "No-show", value: 3, color: "text-gray-600" },
            { label: "Rescheduled", value: 5, color: "text-blue-600" },
            { label: "Avg Wait", value: "16 min", color: "text-purple-600" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border bg-gray-50 p-3">
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className={`mt-1 text-xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={appointmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="completed" fill="#16A34A" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cancelled" fill="#DC2626" radius={[4, 4, 0, 0]} />
            <Bar dataKey="noShow" fill="#F59E0B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ⑤ REVENUE ANALYTICS */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-[#0A2942]">Revenue Analytics</h3>
        <p className="text-sm text-gray-500">Financial performance overview</p>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <p className="text-sm text-gray-600 mb-2">Today's Revenue</p>
            <p className="text-3xl font-bold text-[#0A2942]">₱84,250</p>

            <div className="mt-4 space-y-2">
              {[
                { label: "Consultation", value: "₱38,500", pct: 46 },
                { label: "Laboratory", value: "₱21,300", pct: 25 },
                { label: "Medical Services", value: "₱14,200", pct: 17 },
                { label: "Other", value: "₱10,250", pct: 12 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-semibold text-[#0A2942]">{item.value}</span>
                  </div>
                  <ProgressBar value={item.pct} color="#0A2942" size="sm" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Revenue Trend</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: any) => `₱${value}K`} />
                <Line type="monotone" dataKey="revenue" stroke="#0A2942" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ⑥ HEALTH & SANITATION */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-[#0A2942]">Immunization</h3>
          <p className="text-sm text-gray-500">Coverage overview</p>
          <div className="mt-4 space-y-3">
            {[
              { label: "Target", value: 500 },
              { label: "Completed", value: 438 },
              { label: "Coverage", value: 87.6, suffix: "%" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className="text-sm font-semibold text-[#0A2942]">
                  {item.value}{item.suffix || ""}
                </span>
              </div>
            ))}
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs text-amber-700">
                ⚠ 62 individuals still need scheduled vaccination
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-[#0A2942]">Sanitation Overview</h3>
          <p className="text-sm text-gray-500">Permits and inspections</p>
          <div className="mt-4 space-y-3">
            {[
              { label: "Sanitation Permits", value: 128 },
              { label: "Pending Permits", value: 17 },
              { label: "Inspections Today", value: 23 },
              { label: "Completed Inspections", value: 18 },
              { label: "Failed Inspections", value: 3 },
              { label: "Pending Corrections", value: 5 },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className="text-sm font-semibold text-[#0A2942]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-[#0A2942]">Wastewater & Septic</h3>
          <p className="text-sm text-gray-500">Service requests</p>
          <div className="mt-4 space-y-3">
            {[
              { label: "Service Requests", value: 31 },
              { label: "Pending", value: 8 },
              { label: "In Progress", value: 6 },
              { label: "Completed", value: 17 },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className="text-sm font-semibold text-[#0A2942]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ⑦ HEALTH SURVEILLANCE */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-[#0A2942]">Health Trends</h3>
          <p className="text-sm text-gray-500">Reported cases this week</p>

          <div className="mt-6 space-y-3">
            {SURVEILLANCE_TRENDS.map((trend) => (
              <div key={trend.name} className="flex items-center justify-between rounded-xl border border-gray-200 p-3">
                <div>
                  <p className="text-sm font-medium text-[#0A2942]">{trend.name}</p>
                  <p className="text-xs text-gray-500">{trend.cases} cases</p>
                </div>
                <span className={`text-xs font-medium ${
                  trend.direction === "up" ? "text-red-600" : trend.direction === "down" ? "text-emerald-600" : "text-gray-600"
                }`}>
                  {trend.direction === "up" ? "↑" : trend.direction === "down" ? "↓" : "─"} {trend.change}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-[#0A2942]">Health Activity by Area</h3>
          <p className="text-sm text-gray-500">Barangay risk levels</p>

          <div className="mt-6 space-y-3">
            {AREA_STATUS.map((area) => (
              <div key={area.barangay} className="flex items-center justify-between rounded-xl border border-gray-200 p-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: area.color }} />
                  <p className="text-sm font-medium text-[#0A2942]">{area.barangay}</p>
                </div>
                <span className="text-xs font-medium" style={{ color: area.color }}>{area.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ⑧ AI HEALTH INSIGHTS */}

      <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-cyan-100 p-2">
            <Brain className="text-cyan-600" size={20} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-cyan-800">AI Health Insights</h3>
              <span className="text-xs text-cyan-600">Updated 2 min ago</span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-medium text-amber-800">
                  ⚠ Respiratory consultations increased 18% this week.
                </p>
                <p className="mt-1 text-xs text-amber-700">
                  Area: Barangay 4 | Confidence: Moderate
                </p>
                <p className="mt-2 text-xs text-amber-700">
                  Suggested review: Check recent reported cases and sanitation conditions in the affected area.
                </p>
                <button className="mt-3 flex items-center gap-2 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 transition">
                  Review Data <ArrowRight size={14} />
                </button>
              </div>

              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-medium text-emerald-800">
                  ✨ Immunization coverage improved to 87.6%.
                </p>
                <p className="mt-1 text-xs text-emerald-700">
                  Continue scheduling remaining 62 individuals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ⑨ ALERTS & ACTIONS */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-[#0A2942]">Alerts & Actions</h3>
        <p className="text-sm text-gray-500">Items requiring attention, ranked by priority</p>

        <div className="mt-6 space-y-3">
          {ALERTS.map((alert) => (
            <div key={alert.id} className={`flex items-center justify-between rounded-xl border p-4 ${getPriorityColor(alert.priority)}`}>
              <div className="flex items-center gap-3">
                {getPriorityIcon(alert.priority)}
                <div>
                  <p className="text-sm font-medium">{alert.title}</p>
                  <p className="text-xs opacity-75">{alert.count} item{alert.count !== 1 ? "s" : ""}</p>
                </div>
              </div>
              <button className="flex items-center gap-1 rounded-lg border border-current px-3 py-1.5 text-xs font-semibold hover:bg-white/50 transition">
                Review <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ⑩ DOCTOR & PATIENT MANAGEMENT */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-[#0A2942]">Doctor Management</h3>
              <p className="text-sm text-gray-500">24 Active Doctors | 18 Working Today</p>
            </div>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-[#0A2942] px-4 py-2 text-sm font-medium text-white hover:bg-[#123B5D] transition">
            <Settings size={16} />
            Manage Doctors
          </button>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-[#0A2942]">Patient Management</h3>
              <p className="text-sm text-gray-500">1,248 Registered Patients | 148 Visits Today</p>
            </div>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition">
            <Users size={16} />
            Manage Patients
          </button>
        </div>
      </div>

      {/* ⑪ IMPLEMENTATION PROGRESS */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-[#0A2942]">Implementation Progress</h3>
        <p className="text-sm text-gray-500">Overall system/service progress</p>

        <div className="mt-6 space-y-4">
          {SYSTEM_HEALTH.map((item) => (
            <div key={item.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-sm font-semibold text-[#0A2942]">{item.value}%</span>
              </div>
              <ProgressBar value={item.value} color="#0A2942" size="md" />
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Overall Implementation</span>
            <span className="text-lg font-bold text-[#0A2942]">85%</span>
          </div>
          <div className="mt-2">
            <ProgressBar value={85} color="#0A2942" size="lg" />
          </div>
        </div>
      </div>

    </div>
  );
}
