"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    XMarkIcon,
    Bars3Icon,
    StarIcon,
} from "@heroicons/react/24/solid";

import ThemeSelector from "./ThemeSelector";
import MobileMenu from "./MobileMenu";
import SearchBox from "./SearchBox";
import { getGitHubStars } from "@/libs/github";

export default function TopBar() {
    const [open, setOpen] = useState<boolean>(false);
    const [stars, setStars] = useState<number | null>(0);

    const pathname = usePathname(); // single source of truth

    /* ================= WINDOW RESIZE ================= */
    useEffect(() => {
        const handleResize = (): void => {
            if (window.innerWidth >= 1280) {
                setOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    /* ================= GITHUB STARS ================= */
    useEffect(() => {
        let mounted = true;

        const fetchStars = async (): Promise<void> => {
            const data = await getGitHubStars();
            if (mounted) setStars(data);
        };

        fetchStars();

        return () => {
            mounted = false;
        };
    }, []);

    const menuItems: string[] = [
        "components",
        "templates",
        "documentation",
        "test",
    ];

    return (
        <>
            {/* ================= HEADER ================= */}
            <header
                role="navigation"
                aria-label="Main navigation"
                className="fixed left-0 right-0 top-0 z-9999 flex h-16 w-screen items-center border-b border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950"
            >
                <div className="relative w-full justify-between px-4 sm:px-8 xl:flex xl:px-12.5">
                    {/* ================= LEFT ================= */}
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="inline-flex w-61.5 items-center gap-2"
                        >
                            <Image
                                src="/logo.svg"
                                width={32}
                                height={32}
                                alt="Logo"
                                className="transition-transform duration-300 hover:rotate-180"
                            />
                        </Link>

                        {/* Navigation */}
                        <nav>
                            <ul className="hidden gap-5 md:flex xl:flex-row xl:items-center 2xl:gap-8">
                                {menuItems.map((item) => (
                                    <li key={item} className="py-4">
                                        <Link
                                            href={`/${item}`}
                                            className={`font-bold ${pathname.startsWith(`/${item}`)
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

                        {/* Mobile Search Button */}
                        <div className="xl:hidden">

                            <SearchBox />
                        </div>

                        {/* Mobile Menu Button */}
                        <div
                            className="md:hidden"
                            onClick={() => setOpen((prev) => !prev)}
                        >
                            <button
                                type="button"
                                aria-expanded={open}
                                aria-controls="mobile-menu"
                                aria-label="Toggle menu"
                                className="ml-auto flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 aspect-square dark:bg-gray-800"
                            >
                                {open ? (
                                    <XMarkIcon className="h-6 w-6 text-black dark:text-white" />
                                ) : (
                                    <Bars3Icon className="h-6 w-6 text-black dark:text-white" />
                                )}
                            </button>
                        </div>
                    </div>



                    {/* ================= RIGHT (DESKTOP) ================= */}
                    <div className="invisible hidden h-0 w-full items-center lg:w-9/12 xl:visible xl:flex xl:h-auto 2xl:w-10/12">
                        <div className="mt-7 flex w-full items-center justify-end gap-3 xl:mt-0">
                            <SearchBox />

                            {/* Theme Selector */}
                            <ThemeSelector />

                            {/* GitHub Link */}
                            <Link
                                href="https://github.com/projectlks/my-components"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-3 rounded-full border border-indigo-600 bg-indigo-600 px-4 py-1 pr-1.25 text-sm font-medium text-white
                  hover:border-indigo-500 hover:bg-indigo-700
                  dark:border-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                            >
                                <span>Star on GitHub</span>

                                {/* Star Count */}
                                <span className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-950 dark:bg-gray-950 dark:text-white">
                                    <StarIcon className="h-4 w-4 text-yellow-500 transition-transform group-hover:scale-110" />
                                    <span>{stars}</span>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* ================= MOBILE MENU ================= */}
            <MobileMenu
                open={open}
                setOpen={setOpen}
                menuItems={menuItems}
                stars={stars as number}
            />

            {/* Spacer */}
            <div className="pt-0!" />
        </>
    );
}
