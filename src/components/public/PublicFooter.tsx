import { Link } from "react-router-dom";

export default function PublicFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-200 bg-white pt-8 dark:border-gray-700 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-gray-600 dark:text-gray-400 sm:flex-row">
          <p className="text-xs">
            &copy; {year} Health &amp; Sanitation Management System &bull;{" "}
            Municipality Government
          </p>

          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to="/portal"
              className="text-gray-600 hover:text-emerald-700 dark:text-gray-300 dark:hover:text-emerald-300"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="text-gray-600 hover:text-emerald-700 dark:text-gray-300 dark:hover:text-emerald-300"
            >
              Staff Portal
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
