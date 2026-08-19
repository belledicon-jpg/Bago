import type { Service } from "./services";

export default function ServiceCard({
  service,
  selected,
  onSelect,
}: {
  service: Service;
  selected?: boolean;
  onSelect: (service: Service) => void;
}) {
  const Icon = service.icon;
  return (
    <button
      type="button"
      onClick={() => onSelect(service)}
      className={`flex flex-col text-left rounded-xl border p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
        selected
          ? "border-emerald-600 ring-2 ring-emerald-100 dark:border-emerald-400 dark:ring-emerald-900/40"
          : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800"
      }`}
    >
      <div
        className={`mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${service.iconColor}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
        {service.title}
      </h3>
      <p className="mt-1.5 flex-1 text-sm text-gray-600 dark:text-gray-400">
        {service.description}
      </p>
      <span className="mt-3 inline-flex items-center text-sm font-medium text-emerald-700 dark:text-emerald-300">
        {selected ? "Selected" : "Select"} →
      </span>
    </button>
  );
}
