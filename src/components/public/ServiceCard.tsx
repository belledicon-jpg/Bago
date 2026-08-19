import { Link } from "react-router-dom";
import type { Service } from "./services";

interface ServiceCardProps {
  service: Service;
  selected: boolean;
  onSelect: (service: Service) => void;
}

export default function ServiceCard({ service, selected, onSelect }: ServiceCardProps) {
  const Icon = service.icon;
  return (
    <button
      type="button"
      onClick={() => onSelect(service)}
      className={`w-full text-left rounded-xl border p-5 transition-all ${
        selected
          ? "border-emerald-600 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-900/20"
          : "border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-emerald-600"
      }`}
    >
      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${service.iconColor} mb-3`}>
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{service.title}</h3>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{service.description}</p>
    </button>
  );
}
