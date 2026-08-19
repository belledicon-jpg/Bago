import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Hospital,
  ClipboardCheck,
  Syringe,
  Droplets,
  Activity,
  ChevronLeft,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Health Center", icon: Hospital, path: "/health-center" },
  { label: "Sanitation", icon: ClipboardCheck, path: "/sanitation" },
  { label: "Immunization", icon: Syringe, path: "/immunization" },
  { label: "Wastewater", icon: Droplets, path: "/wastewater" },
  { label: "Surveillance", icon: Activity, path: "/surveillance" },
];

export default function Sidebar({
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className={`
        fixed left-0 top-0 z-40
        flex h-screen flex-col
        bg-[#0A2942] text-white
        transition-all duration-300
        ${collapsed ? "w-[72px]" : "w-60"}
      `}
    >

      {/* BRAND */}

      <div
        className={`
          flex h-20 items-center
          border-b border-white/10
          ${collapsed ? "justify-center" : "justify-between px-5"}
        `}
      >

        {!collapsed && (
          <div>
            <h1 className="text-lg font-bold">
              HSMS
            </h1>

            <p className="text-xs text-white/50">
              Health & Sanitation
            </p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-9 w-9 items-center justify-center rounded-lg
                     text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <ChevronLeft
            size={20}
            className={`
              transition-transform duration-300
              ${collapsed ? "rotate-180" : ""}
            `}
          />
        </button>

      </div>

      {/* NAVIGATION */}

      <nav className="flex-1 px-3 py-5">

        <p
          className={`
            mb-3 text-[10px] font-semibold uppercase
            tracking-widest text-white/40
            ${collapsed ? "hidden" : "block"}
          `}
        >
          Main
        </p>

        <div className="space-y-1">

          {menuItems.map((item) => {

            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`
                  group flex w-full items-center
                  rounded-xl py-2.5
                  transition-all duration-200

                  ${
                    collapsed
                      ? "justify-center px-0"
                      : "px-3"
                  }

                  ${
                    active
                      ? "bg-[#123B5D] text-white shadow-sm"
                      : "text-white/65 hover:bg-white/10 hover:text-white"
                  }
                `}
              >

                <Icon
                  size={18}
                  className={`
                    shrink-0
                    ${
                      active
                        ? "text-white"
                        : "text-white/70"
                    }
                  `}
                />

                {!collapsed && (
                  <span className="ml-3 text-sm font-medium">
                    {item.label}
                  </span>
                )}

              </button>
            );
          })}

        </div>

      </nav>

      {/* FOOTER */}

      {!collapsed && (
        <div className="border-t border-white/10 p-4">

          <div className="flex items-center gap-3 rounded-xl p-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0EA5A4] font-semibold">
              A
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                Administrator
              </p>

              <p className="truncate text-xs text-white/50">
                Admin
              </p>
            </div>

          </div>

        </div>
      )}

    </aside>
  );
}
