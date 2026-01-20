"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    ArrowLongRightIcon,
    StarIcon,
} from "@heroicons/react/24/outline";

import ThemeSelector from "@/comp/topbar/ThemeSelector";

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
    menuItems: string[];
    stars: number;
};

export default function MobileMenu({
    open,
    setOpen,
    menuItems,
    stars,
}: Props) {
    const pathname = usePathname();

    // ESC key
    useEffect(() => {
        if (!open) return;
        const onEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onEsc);
        return () => window.removeEventListener("keydown", onEsc);
    }, [open, setOpen]);

    return (
        <div
            className={`
   menu-overlay fixed inset-0 top-17 z-50 xl:hidden
    bg-black/50 dark:bg-black/60 backdrop-blur-sm
    ${open ? "show" : ""}
      `}
            role="dialog"
            aria-modal="true"

        >
            {/* PANEL */}
            <div

                className={`menu-panel w-full h-full bg-white dark:bg-gray-950
      ${open ? "open" : "close"}
    `}
            >
                {/* ${open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"} */}


                {/* MENU */}
                <div className="  flex flex-col justify-between h-full overflow-y-auto px-5 pb-6 pt-2">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                        {menuItems.map((item) => {
                            const active = pathname.startsWith(`/${item}`);

                            return (
                                <li key={item}>
                                    <Link
                                        href={`/${item}`}
                                        onClick={() => setOpen(false)}
                                        className={`
                      group flex items-center gap-3 p-4 text-base font-semibold
              
                      ${active
                                                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400"
                                                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-900"
                                            }
                    `}
                                    >
                                        <ArrowLongRightIcon className={`  transition ${active ? "w-8" : "w-0"} `} />
                                        {item.toUpperCase()}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* ACTIONS */}
                    <div className="mt-8 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                        <div className="mb-4 flex justify-center">
                            <ThemeSelector />
                        </div>

                        <Link
                            href="https://github.com/projectlks/my-components"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                group flex items-center justify-center gap-3 rounded-full
                bg-indigo-600 hover:bg-indigo-700
                px-6 py-3 text-sm font-semibold text-white
                transition-colors duration-200
              "
                        >
                            <span>Star on GitHub</span>

                            <span className="flex items-center gap-1 rounded-full bg-white px-2 py-1
              text-xs font-bold text-indigo-700">
                                <StarIcon className="h-4 w-4 text-yellow-500 transition-transform group-hover:scale-110" />
                                {stars}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
