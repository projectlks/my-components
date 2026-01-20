"use client";

import { JSX, useEffect, useRef, useState } from "react";
import {
    MagnifyingGlassIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* =====================================================
   1. TYPES (STRICT & SCALABLE)
===================================================== */

/** Badge types (extendable) */
type TagType = "new" | "beta" | "soon";

/** Base navigation item */
interface NavItem {
    label: string;
    href: string;
    tag?: TagType;
}

/** Group (Sections, Components, future groups) */
interface SearchGroup {
    title: string;
    items: NavItem[];
}

/** Single search result item (flattened) */
interface SearchResultItem {
    id: number;
    title: string;
    url: string;
    tag?: TagType;
}

/** Grouped search result */
interface GroupedSearchResult {
    title: string;
    results: SearchResultItem[];
}

/* =====================================================
   2. SEARCH DATA (ADD MORE GROUPS HERE)
===================================================== */

const SEARCH_GROUPS: SearchGroup[] = [
    {
        title: "Sections",
        items: [
            { label: "FAQ", href: "/components/faq" },
            { label: "Testimonials", href: "/components/testimonials" },
            { label: "Modalities", href: "/components/modalities", tag: "new" },
        ],
    },
    {
        title: "Components",
        items: [
            { label: "Accordions", href: "/components/accordions" },
            { label: "Carousels", href: "/components/carousels" },
            { label: "Links", href: "/components/links", tag: "new" },
        ],
    },

    // 👉 future example
    // {
    //   title: "Layouts",
    //   items: [...]
    // }
];

/* =====================================================
   3. COMPONENT
===================================================== */

export default function SearchModal(): JSX.Element {
    /* -----------------------------
       State
    ------------------------------ */
    const [open, setOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [results, setResults] = useState<GroupedSearchResult[]>([]);
    const [activeIndex, setActiveIndex] = useState<number>(0);


    const inputRef = useRef<HTMLInputElement | null>(null);

    /* -----------------------------
       Ctrl / Cmd + K shortcut
    ------------------------------ */
    useEffect((): (() => void) => {
        const handler = (e: KeyboardEvent): void => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen(true);
                setTimeout(() => inputRef.current?.focus(), 50);
            }





        };

        window.addEventListener("keydown", handler);
        return (): void => window.removeEventListener("keydown", handler);
    }, []);

    /* -----------------------------
       Search Logic (Grouped)
    ------------------------------ */
    useEffect((): (() => void) | void => {
        if (query.trim() === "") {

            const t = setTimeout(() => {
                setResults([]);
            }, 0);


            return () => clearInterval(t);
        }

        const timeoutId: number = window.setTimeout((): void => {
            const groupedResults: GroupedSearchResult[] = SEARCH_GROUPS
                .map((group) => {
                    const matchedItems: SearchResultItem[] = group.items
                        .filter((item) =>
                            item.label.toLowerCase().includes(query.toLowerCase())
                        )
                        .map((item, index) => ({
                            id: index,
                            title: item.label,
                            url: item.href,
                            tag: item.tag,
                        }));

                    return {
                        title: group.title,
                        results: matchedItems,
                    };
                })
                // remove empty groups
                .filter((group) => group.results.length > 0);

            setResults(groupedResults);
        }, 150); // debounce

        return (): void => window.clearTimeout(timeoutId);
    }, [query]);


    const flatResults: SearchResultItem[] = results.flatMap(
        (group) => group.results
    );

    const router = useRouter();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (flatResults.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setActiveIndex((prev) =>
                    prev < flatResults.length - 1 ? prev + 1 : 0
                );
                break;

            case "ArrowUp":
                e.preventDefault();
                setActiveIndex((prev) =>
                    prev > 0 ? prev - 1 : flatResults.length - 1
                );
                break;

            case "Enter":
                e.preventDefault();
                router.push(`${flatResults[activeIndex].url}`)
                setQuery("")
                setOpen(false

                )
                break;

            case "Escape":
                setOpen(false);
                break;
        }
    };


    let globalIndex = -1;
    useEffect(() => {
        setActiveIndex(0);
    }, [results]);

    /* =====================================================
       4. UI
    ===================================================== */

    return (
        <>
            {/* Search Button */}
            <button
                type="button"
                onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
            >
                <MagnifyingGlassIcon className="w-5 h-5" />
            </button>

            {/* Modal */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-50 flex justify-center items-start pt-20"
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-lg shadow-lg p-4"
                        onClick={(e): void => e.stopPropagation()}
                    >
                        {/* Search Input */}
                        <div className="flex items-center gap-2 border rounded-md px-2 py-1 bg-gray-100 dark:bg-gray-800">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
                            <input
                                ref={inputRef}
                                type="search"
                                placeholder="Search components..."
                                className="flex-1 bg-transparent outline-none"
                                value={query}
                                onChange={(e): void => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Results */}
                        <div className="mt-3 max-h-64 overflow-y-auto">
                            {query !== "" && results.length === 0 && (
                                <div className="text-gray-400 p-2">No results</div>
                            )}

                            {results.map((group) => (
                                <div key={group.title} className="mb-4">
                                    <div className="text-xs uppercase text-gray-400 mb-1">
                                        {group.title}
                                    </div>

                                    <ul>
                                        {group.results.map((item) => {
                                            globalIndex++;

                                            const isActive = globalIndex === activeIndex;

                                            return (
                                                <Link href={item.url}
                                                    onClick={() => { setOpen(false); setQuery("") }}
                                                    key={`${group.title}-${item.id}`}
                                                    className={`p-2 flex justify-between items-center rounded cursor-pointer
              ${isActive
                                                            ? "bg-blue-500 text-white"
                                                            : "hover:bg-gray-200 dark:hover:bg-gray-700"}
            `}

                                                >
                                                    <span>{item.title}</span>

                                                    {item.tag && (
                                                        <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded">
                                                            {item.tag}
                                                        </span>
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
