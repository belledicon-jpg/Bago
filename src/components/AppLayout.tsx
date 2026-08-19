import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import AppHeader from "./ui/AppHeader";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#FAF6EF]">

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* RIGHT SIDE */}

      <div
        className={`
          transition-all duration-300
          ${collapsed ? "ml-[72px]" : "ml-60"}
        `}
      >

        <AppHeader />

        <main className="pt-16">

          <div className="p-6">
            <Outlet />
          </div>

        </main>

      </div>

    </div>
  );
}
