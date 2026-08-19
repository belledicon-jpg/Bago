import { useState } from "react";
import type { FormEvent } from "react";
import { SERVICES, type Service } from "./services";
import ServiceCard from "./ServiceCard";

export default function RequestService() {
  const [selected, setSelected] = useState<Service | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    details: "",
    date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      !selected ||
      !form.name.trim() ||
      !form.contact.trim() ||
      !form.details.trim() ||
      !form.date
    )
      return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-center dark:border-emerald-900/40 dark:bg-emerald-900/20">
          <h2 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200">
            Request Submitted
          </h2>
          <p className="mt-2 text-sm text-emerald-800 dark:text-emerald-300">
            Your {selected?.title.toLowerCase()} request has been received.
            Reference: <strong>REQ-2026-{Math.floor(Math.random() * 9000) + 1000}</strong>.
            A member of the Municipal Health Office will contact you to confirm.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setSelected(null);
              setForm({ name: "", contact: "", details: "", date: "" });
            }}
            className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Request a Service
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Citizens can access selected municipal services without logging in.
          Choose a service card to begin.
        </p>
      </div>

      {!selected ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              selected={false}
              onSelect={setSelected}
            />
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/70">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${selected.iconColor}`}
            >
              <SelectedIcon service={selected} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {selected.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selected.description}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Contact (phone or email)
              </label>
              <input
                type="text"
                name="contact"
                required
                value={form.contact}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Preferred Date
              </label>
              <input
                type="date"
                name="date"
                required
                value={form.date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Details / Request
              </label>
              <textarea
                name="details"
                required
                value={form.details}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Submit Request
            </button>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Choose another service
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function SelectedIcon({ service }: { service: Service }) {
  const Icon = service.icon;
  return <Icon className="h-5 w-5" />;
}
