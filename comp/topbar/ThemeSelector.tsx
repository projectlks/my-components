"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

type ThemeOption = "system" | "light" | "dark";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform);


  const options: {
    value: ThemeOption;
    label: string;
    icon: React.ReactNode;
    shortcut: string; // Tooltip shortcut hint
  }[] = [
      {
        value: "system",
        label: "System theme",
        icon: <ComputerDesktopIcon className="w-4.5 h-4.5" />,
        shortcut: isMac ? "Cmd+Shift+S" : "Ctrl+Shift+S"
      },
      {
        value: "light",
        label: "Light theme",
        icon: <SunIcon className="w-4.5 h-4.5" />,
        shortcut: isMac ? "Cmd+L" : "Ctrl+L"
      },
      {
        value: "dark",
        label: "Dark theme",
        icon: <MoonIcon className="w-4.5 h-4.5" />,
        shortcut: isMac ? "Cmd+D" : "Ctrl+D"
      },
    ];


  const [mounted, setMounted] = useState(false);


  // --- Mount logic ---
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  // --- Keyboard shortcuts ---
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;

      if (!isCmdOrCtrl) return;

      switch (e.key.toLowerCase()) {
        case "l": // Ctrl+L → Light
          e.preventDefault();
          setTheme("light");
          break;
        case "d": // Ctrl+D → Dark
          e.preventDefault();
          setTheme("dark");
          break;
        case "s": // Ctrl+Shift+S → System
          if (!e.shiftKey) return; // Require Shift
          e.preventDefault();
          setTheme("system");
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setTheme]);

  if (!mounted) return <div className="h-10 w-23.5 " />;

  // --- UI ---
  return (
    <div
      role="radiogroup"
      className="
        relative inline-grid grid-cols-3 gap-0.5 rounded-full p-0.75 
        bg-gray-950/5 text-gray-700
        dark:bg-white/10 dark:text-gray-200
      "
    >
      {options.map((opt) => {
        const checked = theme === (opt.value || localStorage.getItem("theme"));

        return (
          <div key={opt.value} className="relative group">
            <button
              role="radio"
              aria-checked={checked}
              aria-label={opt.label}
              onClick={() => setTheme(opt.value)}
              className={`
                flex items-center justify-center rounded-full p-1.5 w-7 h-7 
                transition-all duration-200
                ${checked
                  ? "bg-white ring-1 ring-gray-950/10 dark:bg-gray-700"
                  : "hover:bg-white/60 dark:hover:bg-white/10"
                }
              `}
            >
              <span className="sr-only">{opt.label}</span>
              <span className="h-5 w-5 flex items-center justify-center">{opt.icon}</span>
            </button>

            {/* Tooltip */}
            <span className="
              absolute top-full left-1/2 -translate-x-1/2 
              rounded bg-gray-700 text-white text-[10px] px-1 py-0.5
              opacity-0 group-hover:opacity-100
              pointer-events-none
              transition-all duration-200
              whitespace-nowrap
              dark:bg-gray-200 dark:text-gray-900
            ">
              {opt.shortcut}
            </span>
          </div>
        );
      })}
    </div>
  );
}
