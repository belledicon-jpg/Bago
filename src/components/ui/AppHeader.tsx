import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Settings,
  Bot,
  X,
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
}

export default function AppHeader() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  const notifications: Notification[] = [
    {
      id: "1",
      title: "System Update",
      message: "New health protocols have been published.",
      time: "2 hours ago",
    },
    {
      id: "2",
      title: "Alert",
      message: "Sanitation report submission due tomorrow.",
      time: "1 day ago",
    },
    {
      id: "3",
      title: "Complete",
      message: "Q3 health audit completed successfully.",
      time: "3 days ago",
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header
      className="
        fixed top-0 right-0 z-30
        h-16
        border-b border-gray-200
        bg-white/95
        backdrop-blur
        transition-all duration-300
      "
    >

      <div className="flex h-full items-center justify-between px-6">

        {/* SEARCH */}

        {searchOpen ? (
          <form
            onSubmit={handleSearchSubmit}
            className="relative w-80"
          >
            <Search
              size={19}
              className="
                absolute left-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="
                h-10
                w-full
                rounded-xl
                border border-gray-200
                bg-gray-50
                pl-10 pr-10
                text-sm
                outline-none
                transition
                focus:border-[#0A2942]
                focus:bg-white
                focus:ring-2
                focus:ring-[#0A2942]/10
              "
            />

            <button
              type="button"
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </form>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="text-gray-500 hover:text-[#0A2942] transition"
          >
            <Search size={20} />
          </button>
        )}

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-3">

          {/* NOTIFICATIONS */}

          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setAssistantOpen(false);
              }}
              className="
                relative
                flex h-9 w-9
                items-center justify-center
                rounded-lg
                text-gray-500
                hover:bg-gray-100
                transition
              "
            >
              <Bell size={19} />

              <span
                className="
                  absolute right-1 top-1
                  h-2 w-2
                  rounded-full
                  bg-red-500
                "
              />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-gray-200 bg-white shadow-xl">

                <div className="flex items-center justify-between border-b p-4">
                  <h3 className="text-sm font-semibold text-[#0A2942]">
                    Notifications
                  </h3>

                  <button
                    onClick={() => setNotificationsOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <button
                      key={notification.id}
                      onClick={() => {
                        setNotificationsOpen(false);
                        alert(notification.message);
                      }}
                      className="flex w-full items-start gap-3 p-4 text-left transition hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {notification.message}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {notification.time}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

              </div>
            )}
          </div>

          {/* ASSISTANT */}

          <div className="relative">
            <button
              onClick={() => {
                setAssistantOpen(!assistantOpen);
                setNotificationsOpen(false);
              }}
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-lg
                text-gray-500
                hover:bg-gray-100
                transition
              "
            >
              <Bot size={19} />
            </button>

            {assistantOpen && (
              <div className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-gray-200 bg-white shadow-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-[#0A2942]">
                    Health Assistant
                  </h3>

                  <button
                    onClick={() => setAssistantOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-sm text-gray-600">
                    Hello! I can help you navigate the Health & Sanitation Management System. What would you like to do?
                  </p>
                </div>

                <div className="mt-3 space-y-2">
                  <button
                    onClick={() => {
                      setAssistantOpen(false);
                      navigate("/dashboard");
                    }}
                    className="w-full rounded-lg border border-gray-200 p-2 text-left text-sm hover:bg-gray-50 transition"
                  >
                    View Dashboard
                  </button>

                  <button
                    onClick={() => {
                      setAssistantOpen(false);
                      navigate("/health-center");
                    }}
                    className="w-full rounded-lg border border-gray-200 p-2 text-left text-sm hover:bg-gray-50 transition"
                  >
                    Health Center Services
                  </button>

                  <button
                    onClick={() => {
                      setAssistantOpen(false);
                      navigate("/immunization");
                    }}
                    className="w-full rounded-lg border border-gray-200 p-2 text-left text-sm hover:bg-gray-50 transition"
                  >
                    Immunization Tracker
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* SETTINGS */}

          <button
            onClick={() => navigate("/dashboard")}
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              text-gray-500
              hover:bg-gray-100
              transition
            "
            title="Settings"
          >
            <Settings size={19} />
          </button>

          {/* PROFILE */}

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 rounded-lg p-1.5 transition hover:bg-gray-50"
          >
            <div
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-full
                bg-[#0A2942]
                text-sm
                font-semibold
                text-white
              "
            >
              A
            </div>

            <div className="hidden sm:block text-left">

              <p className="text-sm font-medium text-[#0A2942]">
                Administrator
              </p>

              <p className="text-xs text-gray-500">
                Admin
              </p>

            </div>
          </button>

        </div>

      </div>

    </header>
  );
}