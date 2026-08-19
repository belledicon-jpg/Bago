import { useSidebar } from "./SidebarProvider";
import { Menu } from "lucide-react";

export function SidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      className="fixed top-4 left-4 z-50 md:hidden bg-emerald-700 text-white p-2 rounded-lg"
      onClick={toggleSidebar}
    >
      <Menu size={20} />
    </button>
  );
}
