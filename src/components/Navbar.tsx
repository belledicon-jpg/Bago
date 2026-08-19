import { useState } from "react";
import {
  Bell,
  Search,
  User,
  LogOut,
  Settings,
} from "lucide-react";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="bg-white shadow px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search
            size={18}
            className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-gray-100 rounded-full">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Settings size={20} className="text-gray-600" />
        </button>

        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-1.5 rounded-lg">
          <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-800">Administrator</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}