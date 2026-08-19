import { Clock, Phone, Mail, Building2 } from "lucide-react";

const CONTACTS = [
  {
    label: "Municipal Health Office",
    value: "City Hall Complex, Ground Floor",
    icon: Building2,
  },
  { label: "Office Hours", value: "Mon–Fri: 8:00 AM – 5:00 PM", icon: Clock },
  { label: "General Inquiry", value: "(02) 1234-5678", icon: Phone },
  { label: "Emergency", value: "911", icon: Phone },
  { label: "Email", value: "public.services@municipality.gov", icon: Mail },
];

export default function HelpSection() {
  return (
    <section
      id="help"
      className="border-t border-gray-200 bg-gray-50 py-8 dark:border-gray-700 dark:bg-gray-800/70"
    >
      <div className="container mx-auto grid gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Need Help?
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Visit or contact the Municipal Health Office for in-person
            assistance.
          </p>
        </div>

        <div className="lg:col-span-2">
          <ul className="grid gap-3 sm:grid-cols-2">
            {CONTACTS.map((c) => {
              const Icon = c.icon;
              return (
                <li
                  key={c.label}
                  className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                      {c.label}
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {c.value}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
