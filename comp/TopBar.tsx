"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    XMarkIcon,
    Bars3Icon,
} from "@heroicons/react/24/outline";

import ThemeSelector from "./ThemeSelector";

export default function TopBar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname(); // ✅ single source of truth

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const menuItems = ["components", "templates", "documentation"];

    return (
        <>
            <header
                role="navigation"
                aria-label="Main navigation"
                className="w-screen border-b z-9999 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950"
            >
                <div className="relative justify-between px-4 py-4 sm:px-8 xl:flex xl:px-12.5 xl:py-0">
                    {/* Left section */}
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href={'/'} className="inline-flex w-61.5 items-center gap-2">
                            <Image
                                src="/logo.svg"
                                width={32}
                                height={32}
                                alt="Logo"
                                className="transform transition-transform duration-300 hover:rotate-180"
                            />
                        </Link>

                        {/* Navigation */}
                        <nav>
                            <ul className="flex flex-col gap-5 xl:flex-row xl:items-center 2xl:gap-8">
                                {menuItems.map((item) => (
                                    <li key={item} className="py-4">
                                        <Link
                                            href={`/${item}`}
                                            className={`font-medium ${pathname.startsWith(`/${item}`)
                                                ? "text-indigo-800 dark:text-indigo-400"
                                                : "text-[#64748b] hover:text-indigo-800 dark:hover:text-indigo-400"
                                                }`}
                                        >
                                            {item.toUpperCase()}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Mobile menu button */}
                        <div className="xl:hidden" onClick={() => setOpen(!open)}>
                            <button
                                type="button"
                                aria-expanded={open}
                                aria-controls="mobile-menu"
                                aria-label="Toggle menu"
                                className="ml-auto block"
                            >
                                {open ? (
                                    <XMarkIcon className="h-6 w-6 text-black" />
                                ) : (
                                    <Bars3Icon className="h-6 w-6 text-black" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Right section (desktop) */}
                    <div className="invisible hidden h-0 w-full items-center justify-end lg:w-9/12 xl:visible xl:flex xl:h-auto 2xl:w-10/12">
                        <div className="mt-7 flex items-center gap-3 xl:mt-0">


                            {/* Theme toggle */}
                            <div className="py-3">
                                <ThemeSelector />
                            </div>


                            {/* GitHub link */}
                            <Link
                                href="https://github.com/projectlks/my-components"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                            >
                                <svg
                                    role="img"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                >
                                    <title>GitHub</title>
                                    <path
                                        fill="currentColor"
                                        d="M12 .297c-6.63 0-12 5.373-12 12
                    0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
                    0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61
                    C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729
                    1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305
                    3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93
                    0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176
                    0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405
                    1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23
                    .645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22
                    0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22
                    0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57
                    C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                    />
                                </svg>
                            </Link>


                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile menu */}
            {open && (
                <div className="fixed inset-0 z-999 h-screen w-full overflow-hidden bg-transparent opacity-100 duration-200 xl:hidden">
                    <div className="relative h-full bg-white pb-30 pt-20">
                        <div className="max-h-full flex-1 overflow-y-auto p-5 pt-0">
                            <ul>
                                {menuItems.map((item) => (
                                    <li key={item} className="group relative">
                                        <Link
                                            href={`/${item}`}
                                            onClick={() => setOpen(false)}
                                            className="flex items-center justify-between gap-2 border-b border-gray-300 p-3 text-base duration-200 hover:text-primary"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <div className="pt-0!" />
        </>
    );
}
