import { useState, useEffect } from "react";
import {
  Search,
  ClipboardCheck,
  CalendarDays,
  MessageCircle,
} from "lucide-react";
import PublicHeader from "../../components/public/PublicHeader";
import PublicFooter from "../../components/public/PublicFooter";
import ApplicationStatusSearch from "../../components/public/ApplicationStatusSearch";
import RequestService from "../../components/public/RequestService";
import PublicAppointmentCalendar from "../../components/public/PublicAppointmentCalendar";
import PublicInquiryForm from "../../components/public/PublicInquiryForm";
import HelpSection from "../../components/public/HelpSection";

type Tab =
  | "status"
  | "request"
  | "appointment"
  | "inquiry";

const TABS = [
  { id: "status" as Tab, label: "Check Application Status", icon: Search },
  { id: "request" as Tab, label: "Request Service", icon: ClipboardCheck },
  { id: "appointment" as Tab, label: "Book Appointment", icon: CalendarDays },
  { id: "inquiry" as Tab, label: "Send Inquiry", icon: MessageCircle },
] as const;

export default function PublicPortal() {
  const [active, setActive] = useState<Tab>("status");

  useEffect(() => {
    document.title =
      "Public Services Portal | Health & Sanitation Management System";
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <PublicHeader />

      <main className="flex-1">
        <section className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <WelcomeSection />

          <nav
            className="mt-10"
            aria-label="Public portal navigation"
          >
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div
                role="tablist"
                className="grid grid-cols-2 gap-2 sm:grid-cols-4"
              >
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = active === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActive(tab.id)}
                      className={`flex items-center justify-center gap-2 rounded-t-lg border-b-2 px-3 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                        isActive
                          ? "border-emerald-600 text-emerald-700 dark:border-emerald-400 dark:text-emerald-300"
                          : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-x border-b border-gray-200 rounded-b-xl bg-white dark:border-gray-700 dark:bg-gray-900">
              <div className="p-4 sm:p-6 lg:p-8">
                <TabPanel active={active} value="status">
                  <ApplicationStatusSearch />
                </TabPanel>
                <TabPanel active={active} value="request">
                  <RequestService />
                </TabPanel>
                <TabPanel active={active} value="appointment">
                  <PublicAppointmentCalendar />
                </TabPanel>
                <TabPanel active={active} value="inquiry">
                  <PublicInquiryForm />
                </TabPanel>
              </div>
            </div>
          </nav>
        </section>

        <HelpSection />
      </main>

      <PublicFooter />
    </div>
  );
}

function WelcomeSection() {
  return (
    <section className="text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600"
          aria-hidden="true"
        />
        Citizens — No login required
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
        Public Services Portal
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 dark:text-gray-400">
        Citizens can access selected municipal services without logging in.
        Track application status, request services, book health-center
        appointments, and send inquiries to the Municipal Health Office.
      </p>
    </section>
  );
}

function TabPanel({
  active,
  value,
  children,
}: {
  active: Tab;
  value: Tab;
  children: React.ReactNode;
}) {
  if (active !== value) return null;
  return <div>{children}</div>;
}
