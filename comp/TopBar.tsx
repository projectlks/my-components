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
import { getGitHubStars } from "@/libs/github";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export default function TopBar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname(); // ✅ single source of truth
    const [stars, setStars] = useState<number | null>(0);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setOpen(false);
            }
        };



        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    /* ================= GITHUB STARS EFFECT ================= */
    useEffect(() => {
        let mounted = true;

        const fetchStars = async () => {
            const data = await getGitHubStars();
            if (mounted) setStars(data);
        };

        fetchStars();

        return () => {
            mounted = false;
        };
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
                            <ul className="md:flex  hidden  gap-5 xl:flex-row xl:items-center 2xl:gap-8">
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

                        {/* Mobile menu button */}
                        <div className="md:hidden" onClick={() => setOpen(!open)}>


                            <button
                                type="button"
                                aria-expanded={open}
                                aria-controls="mobile-menu"
                                aria-label="Toggle menu"
                                className="ml-auto flex justify-center items-center w-8 h-8 bg-gray-100 hover:bg-amber-200 dark:bg-gray-800 dark:hover:bg-amber-200 aspect-square rounded-md"
                            >
                                {open ? (
                                    <XMarkIcon className="h-6 w-6 text-black dark:text-white " />
                                ) : (
                                    <Bars3Icon className="h-6 w-6 text-black dark:text-white" />
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
                                className="group inline-flex items-center gap-3 rounded-full border border-indigo-600 bg-indigo-600 px-6 py-2 text-base font-medium text-white 
             hover:bg-indigo-700 hover:border-indigo-500
             dark:border-indigo-500 dark:bg-indigo-500 pr-2.25 dark:hover:bg-indigo-600"
                            >
                                <span>Star on GitHub</span>

                                {/* Star count badge */}
                                <span
                                    className="flex items-center gap-1 rounded-full bg-white  dark:bg-gray-950 px-2.5 py-1 text-xs font-semibold text-gray-950 dark:text-white 
               "
                                >
                                    <StarIcon className="h-4 w-4 text-yellow-500 0 group-hover:scale-110" />
                                    <span>{stars}</span>
                                </span>
                            </Link>



                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile menu */}
            {open && (

                <div className="fixed inset-0 top-17 z-999 h-full bg-black/50 dark:bg-black/60
 backdrop-blur-sm transition-opacity duration-300 xl:hidden">

                    <div className=" h-fit w-full overflow-hidden  bg-white dark:bg-gray-950 xl:hidden">
                        <div className="relative h-full  ">
                            <div className="max-h-full flex-1 overflow-y-auto p-5 pt-0">
                                <ul>
                                    {menuItems.map((item) => (
                                        <li key={item} className="group relative">
                                            <Link
                                                href={`/${item}`}
                                                onClick={() => setOpen(false)}
                                                className={`flex  font-bold items-center space-x-2 gap-2 border-b border-gray-300 p-3 text-base
                                            ${pathname.startsWith(`/${item}`)
                                                        ? "text-indigo-800 dark:text-indigo-400"
                                                        : "text-[#64748b] hover:text-indigo-800 dark:hover:text-indigo-400"
                                                    }
                                            
                                            duration-200 hover:text-primary`}
                                            >
                                                <ArrowLongRightIcon className="size-6 " />

                                                {item.toUpperCase()}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-6 flex items-center gap-4">
                                    <div className="py-3 flex-1 flex justify-center">
                                        <ThemeSelector />
                                    </div>


                                    {/* GitHub link */}
                                    <Link
                                        href="https://github.com/projectlks/my-components"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex flex-1 justify-center items-center gap-3 rounded-full border border-indigo-600 bg-indigo-600 px-6 py-2 text-base font-medium text-white 
             hover:bg-indigo-700 hover:border-indigo-500
             dark:border-indigo-500 dark:bg-indigo-500 pr-2.25 dark:hover:bg-indigo-600"
                                    >
                                        <span>Star on GitHub</span>

                                        {/* Star count badge */}
                                        <span
                                            className="flex items-center gap-1 rounded-full bg-white  dark:bg-gray-950 px-2.5 py-1 text-xs font-semibold text-gray-950 dark:text-white 
               "
                                        >
                                            <StarIcon className="h-4 w-4 text-yellow-500 0 group-hover:scale-110" />
                                            <span>{stars}</span>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>



                    </div>
                    {/* Theme toggle */}


                </div>

            )}

            <div className="pt-0!" />
        </>
    );
}
