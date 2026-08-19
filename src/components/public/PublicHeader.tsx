import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/75 dark:bg-gray-900/75 dark:border-gray-700 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/portal" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-white shadow-md">
            <MunicipalityLogo />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Health &amp; Sanitation Management System
            </p>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              Public Services Portal
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 sm:flex">
          <Link
            to="/portal"
            className="rounded-md px-3 py-1.5 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Home
          </Link>
          <Link
            to="/portal#help"
            className="rounded-md px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Help
          </Link>
          <Link
            to="/login"
            className="rounded-md px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Staff Portal
          </Link>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}

function MunicipalityLogo() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 22V9l4-4 4 3 4-3 4 4v13" />
      <path d="M8 9V5l4-3 4 3v4" />
      <rect x="7" y="13" width="10" height="9" rx="1" />
      <rect x="9" y="15" width="6" height="2" />
      <rect x="12" y="17" width="2.5" height="2.5" />
    </svg>
  );
}
