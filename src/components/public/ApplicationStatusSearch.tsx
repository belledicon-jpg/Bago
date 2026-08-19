import { useState } from "react";
import type { FormEvent } from "react";
import { Search, FileText, Calendar, ClipboardCheck, Wrench } from "lucide-react";

type StatusType = "all" | "permit" | "appointment" | "service" | "application";

const TYPE_OPTIONS = [
  { value: "all", label: "All Types", icon: FileText },
  { value: "permit", label: "Permit Request", icon: ClipboardCheck },
  { value: "appointment", label: "Appointment", icon: Calendar },
  { value: "service", label: "Service Request", icon: Wrench },
  { value: "application", label: "Application", icon: FileText },
] as const;

type Status = "pending" | "in-progress" | "approved" | "rejected" | "completed";

interface ApplicationRecord {
  id: string;
  type: string;
  title: string;
  status: Status;
  submitted: string;
  updated: string;
  reference: string;
}

const MOCK_RECORDS: ApplicationRecord[] = [
  {
    id: "R1",
    type: "permit",
    title: "Sanitation Permit - Food Stall #104",
    status: "approved",
    submitted: "2026-07-03",
    updated: "2026-07-15",
    reference: "SP-2026-07-00104",
  },
  {
    id: "R2",
    type: "appointment",
    title: "Health Center Consultation",
    status: "pending",
    submitted: "2026-07-28",
    updated: "2026-07-28",
    reference: "HC-2026-07-00219",
  },
  {
    id: "R3",
    type: "service",
    title: "Septic Tank Desludging Request",
    status: "in-progress",
    submitted: "2026-07-20",
    updated: "2026-07-30",
    reference: "WS-2026-07-0145",
  },
  {
    id: "R4",
    type: "application",
    title: "Immunization Registration",
    status: "completed",
    submitted: "2026-06-12",
    updated: "2026-06-18",
    reference: "IM-2026-06-00077",
  },
];

const STATUS_STYLES: Record<Status, string> = {
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  approved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  completed: "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300",
};

export default function ApplicationStatusSearch() {
  const [type, setType] = useState<StatusType>("all");
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filtered = MOCK_RECORDS.filter((r) => {
    const matchesType = type === "all" || r.type === type;
    const matchesQuery =
      query.trim() === "" ||
      r.reference.toLowerCase().includes(query.toLowerCase().trim()) ||
      r.title.toLowerCase().includes(query.toLowerCase().trim());
    return matchesType && matchesQuery;
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Track Your Application
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Search by reference number to follow permit requests, appointments,
          service requests, and applications. Citizens can access this page
          without logging in.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Reference number (e.g. SP-2026-07-00104)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSubmitted(false)}
            className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-emerald-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {TYPE_OPTIONS.map((option) => {
            const Icon = option.icon;
            const active = type === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setType(option.value);
                  setSubmitted(false);
                }}
                className={`inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-900/30 dark:text-emerald-300"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{option.label}</span>
              </button>
            );
          })}
        </div>
      </form>

      {submitted && (
        <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 shadow-sm">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No records found matching your search.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                    <th className="px-4 py-2.5 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                      Reference
                    </th>
                    <th className="px-4 py-2.5 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                      Type
                    </th>
                    <th className="px-4 py-2.5 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                      Description
                    </th>
                    <th className="px-4 py-2.5 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                      Status
                    </th>
                    <th className="px-4 py-2.5 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                      Last Updated
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-4 py-2.5 font-mono text-gray-900 dark:text-gray-200">
                        {r.reference}
                      </td>
                      <td className="px-4 py-2.5 capitalize text-gray-700 dark:text-gray-300">
                        {r.type}
                      </td>
                      <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">
                        {r.title}
                      </td>
                      <td className="px-4 py-2.5">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[r.status]}`}
                        >
                          {r.status.replace("-", " ")}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">
                        {new Date(r.updated).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
