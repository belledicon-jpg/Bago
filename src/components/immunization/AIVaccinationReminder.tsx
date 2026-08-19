import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  Sparkles,
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  ArrowRight,
  Brain,
} from "lucide-react";

import { generateVaccinationReminders } from "../../utils/vaccinationAI";
import { vaccinationData } from "../../data/vaccinationData";

export default function AIVaccinationReminder() {
  const navigate = useNavigate();
  const reminders = useMemo(
    () =>
      generateVaccinationReminders(
        vaccinationData
      ),
    []
  );

  const overdue = reminders.filter(
    (item) => item.status === "overdue"
  );

  const dueToday = reminders.filter(
    (item) => item.status === "due-today"
  );

  const upcoming = reminders.filter(
    (item) => item.status === "upcoming"
  );

  return (
    <section className="space-y-6">

      {/* AI Header */}

      <div className="relative overflow-hidden rounded-2xl bg-[#0A2942] p-6 text-white shadow-lg">

        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#14B8A6]/20 blur-3xl" />

        <div className="relative flex items-start justify-between">

          <div className="flex gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <Sparkles
                size={24}
                className="text-cyan-300"
              />
            </div>

            <div>

              <div className="flex items-center gap-2">

                <h2 className="text-xl font-bold">
                  AI Vaccination Reminder
                </h2>

                <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-xs text-emerald-200">
                  AI Active
                </span>

              </div>

              <p className="mt-1 max-w-xl text-sm text-white/70">
                Smart vaccination monitoring that
                identifies upcoming, due, and overdue
                immunization schedules.
              </p>

            </div>

          </div>

          <Brain
            size={28}
            className="hidden text-white/30 sm:block"
          />

        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Overdue
              </p>

              <p className="mt-1 text-3xl font-bold text-red-600">
                {overdue.length}
              </p>

            </div>

            <div className="rounded-xl bg-red-50 p-3">
              <AlertTriangle
                className="text-red-500"
                size={22}
              />
            </div>

          </div>

        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Due Today
              </p>

              <p className="mt-1 text-3xl font-bold text-amber-500">
                {dueToday.length}
              </p>

            </div>

            <div className="rounded-xl bg-amber-50 p-3">
              <CalendarClock
                className="text-amber-500"
                size={22}
              />
            </div>

          </div>

        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Upcoming
              </p>

              <p className="mt-1 text-3xl font-bold text-[#0A2942]">
                {upcoming.length}
              </p>

            </div>

            <div className="rounded-xl bg-blue-50 p-3">
              <CheckCircle2
                className="text-blue-500"
                size={22}
              />
            </div>

          </div>

        </div>

      </div>

      {/* Recommendations */}

      <div className="rounded-2xl border bg-white shadow-sm">

        <div className="flex items-center justify-between border-b p-5">

          <div>

            <h3 className="font-semibold text-[#0A2942]">
              AI Recommendations
            </h3>

            <p className="text-sm text-gray-500">
              Prioritized vaccination reminders
            </p>

          </div>

          <Sparkles
            size={20}
            className="text-[#14B8A6]"
          />

        </div>

        <div className="divide-y">

          {reminders.length === 0 ? (

            <div className="p-8 text-center">

              <CheckCircle2
                size={40}
                className="mx-auto text-emerald-500"
              />

              <p className="mt-3 font-medium">
                No vaccination reminders
              </p>

              <p className="text-sm text-gray-500">
                All vaccination schedules are up to date.
              </p>

            </div>

          ) : (

            reminders.map((reminder) => (

              <div
                key={reminder.id}
                className="flex flex-col gap-4 p-5 transition hover:bg-gray-50 md:flex-row md:items-center md:justify-between"
              >

                <div className="flex gap-4">

                  <div
                    className={`mt-1 h-3 w-3 rounded-full ${
                      reminder.priority === "high"
                        ? "bg-red-500"
                        : reminder.priority === "medium"
                        ? "bg-amber-500"
                        : "bg-blue-500"
                    }`}
                  />

                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h4 className="font-semibold text-[#0A2942]">
                        {reminder.patientName}
                      </h4>

                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          reminder.priority === "high"
                            ? "bg-red-50 text-red-600"
                            : reminder.priority === "medium"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {reminder.priority
                          .charAt(0)
                          .toUpperCase() +
                          reminder.priority.slice(1)}{" "}
                        Priority
                      </span>

                    </div>

                    <p className="mt-1 font-medium">
                      {reminder.vaccineName}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {reminder.message}
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => navigate("/immunization")}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#0A2942] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#123B5D]"
                >
                  Schedule
                  <ArrowRight size={16} />
                </button>

              </div>

            ))

          )}

        </div>

      </div>

    </section>
  );
}
