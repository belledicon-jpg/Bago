import { Sun, Moon, Monitor, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Theme = "light" | "dark" | "system";

const options: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    return stored ?? "system";
  });
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const resolved = theme === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches : theme === "dark";
    if (resolved) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onOutside = (e: MouseEvent) => {
      if (
        open &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onOutside);
    };
  }, [open]);

  const selected = options.find((o) => o.value === theme) ?? options[0];
  const Icon = selected.icon;

  return (
    <div className="relative inline-flex items-center">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
      >
        <Icon className="h-4 w-4" />
        <span className="hidden sm:inline">{selected.label}</span>
        <ChevronDown className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          className="absolute top-full right-0 z-20 mt-2 w-44 origin-top-right rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
        >
          {options.map((option) => {
            const OptIcon = option.icon;
            const isActive = theme === option.value;
            return (
              <button
                key={option.value}
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => {
                  setTheme(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-sm ${
                  isActive
                    ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                } transition-colors first:rounded-t-lg last:rounded-b-lg`}
              >
                <OptIcon className="h-4 w-4" />
                {option.label}
                {option.value === "system" && (
                  <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                    ({window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
