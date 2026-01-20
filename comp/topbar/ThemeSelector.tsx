

"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

type ThemeOption = "system" | "light" | "dark";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options: { value: ThemeOption; label: string; icon: React.ReactNode }[] = [
    { value: "system", label: "System theme", icon: <ComputerDesktopIcon className="w-5 h-5" /> },
    { value: "light", label: "Light theme", icon: <SunIcon className="w-5 h-5" /> },
    { value: "dark", label: "Dark theme", icon: <MoonIcon className="w-5 h-5" /> },
  ];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);
  if (!mounted) return <div className="h-10 w-27" />;
  return (
    <div
      role="radiogroup"
      className="
        relative inline-grid grid-cols-3 gap-0.5 rounded-full p-0.75 
        bg-gray-950/5  text-gray-700
        dark:bg-white/10 dark:text-gray-200
      "
    >
      {options.map((opt) => {
        const checked = theme === (opt.value || localStorage.getItem("theme"));

        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={checked}
            aria-label={opt.label}
            onClick={() => setTheme(opt.value)}
            className={`
              flex items-center justify-center rounded-full p-1.5  w-7 h-7 
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
        );
      })}
    </div>
  );
}
