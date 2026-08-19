import { useState } from "react";
import type { FormEvent } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Stethoscope,
} from "lucide-react";

type ServiceType = "general" | "dentist" | "vaccination" | "sanitation";

const SERVICES: { value: ServiceType; label: string; icon: typeof Stethoscope }[] =
  [
    { value: "general", label: "General Consultation", icon: Stethoscope },
    { value: "dentist", label: "Dental Check-up", icon: Stethoscope },
    { value: "vaccination", label: "Vaccination", icon: Stethoscope },
    { value: "sanitation", label: "Sanitation Inspection", icon: Stethoscope },
  ];

const TIME_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstWeekday(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function PublicAppointmentCalendar() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [monthYear, setMonthYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [service, setService] = useState<ServiceType>("general");
  const [booked, setBooked] = useState(false);

  const daysInMonth = getDaysInMonth(monthYear, month);
  const firstWeekday = getFirstWeekday(monthYear, month);

  const monthDisplay = new Date(monthYear, month, 1).toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric" },
  );

  const prevMonth = () => {
    setMonth((m) => {
      if (m === 0) {
        setMonthYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  };
  const nextMonth = () => {
    setMonth((m) => {
      if (m === 11) {
        setMonthYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);
  while (calendarDays.length % 7 !== 0) calendarDays.push(null);

  const isDateDisabled = (day: number) => {
    const date = new Date(monthYear, month, day);
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    return date < startOfToday;
  };

  const handleSelectDate = (day: number) => {
    if (isDateDisabled(day)) return;
    setSelectedDate(new Date(monthYear, month, day));
    setSelectedTime("");
  };

  const handleBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setBooked(true);
    setSelectedDate(null);
    setSelectedTime("");
    setService("general");
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={prevMonth}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white p-1.5 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {monthDisplay}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white p-1.5 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
          {WEEKDAYS.map((d) => (
            <div key={d} className="pb-1">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {calendarDays.map((day, i) => {
            const isSelected =
              selectedDate &&
              day !== null &&
              selectedDate.getDate() === day &&
              selectedDate.getMonth() === month &&
              selectedDate.getFullYear() === monthYear;
            const disabled = day !== null && isDateDisabled(day);
            return (
              <button
                key={i}
                type="button"
                disabled={disabled}
                onClick={() => day && handleSelectDate(day)}
                className={`relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  isSelected
                    ? "bg-emerald-600 text-white"
                    : "text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                } ${day === null ? "cursor:default opacity-0" : ""}`}
              >
                {day}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedDate(new Date());
            setMonth(today.getMonth());
            setMonthYear(today.getFullYear());
          }}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-300"
        >
          <CalendarDays className="h-4 w-4" />
          Today
        </button>
      </div>

      <form onSubmit={handleBook} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Service Type
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value as ServiceType)}
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-white pr-9 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          >
            {SERVICES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Date
          </label>
          <div
            className={`mt-1 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ${
              selectedDate
                ? "text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                : "text-gray-400 dark:text-gray-500"
            }`}
          >
            <CalendarDays className="h-4 w-4" />
            {selectedDate
              ? selectedDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "No date selected"}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Time
          </label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            disabled={!selectedDate}
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-white pr-9 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:ring-emerald-500 disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          >
            {selectedTime === "" && (
              <option value="" disabled>
                Select a time slot
              </option>
            )}
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={!selectedDate || !selectedTime}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
          >
            <Clock className="h-4 w-4" />
            Book Appointment
          </button>
        </div>

        {booked && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-300">
            Your appointment has been submitted. A confirmation reference will be
            sent to your email. Staff will contact you to confirm the slot.
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <MapPin className="h-3.5 w-3.5" />
          Municipal Health Office, Ground Floor
        </div>
      </form>
    </div>
  );
}
