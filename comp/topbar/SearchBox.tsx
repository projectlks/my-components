"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

import {
    GroupedSearchResult,
    RecentSearch,
    SearchGroup,
    SearchResultItem,
} from "@/app/types/type";
import { NAVIGATION } from "@/app/data/navigation";

import ResultItem from "./ResultItem";
import { getRecentSearches, saveRecentSearch } from "@/libs/recentSearch";
import { useSearchKeyboard } from "@/app/hooks/useSearchKeyboard";
import { useGroupedSearch } from "@/app/hooks/useGroupedSearch";
// import { url } from "inspector";

/* =====================================================
   SEARCH DATA
===================================================== */

const SEARCH_GROUPS: SearchGroup[] = NAVIGATION;

/* =====================================================
   COMPONENT
===================================================== */

export default function SearchModal(): JSX.Element {
    /* -----------------------------
       State
    ------------------------------ */
    const [open, setOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [results, setResults] = useState<GroupedSearchResult[]>([]);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [recent, setRecent] = useState<RecentSearch[]>([]);

    let globalIndex = -1;

    const inputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    /* -----------------------------
       Ctrl / Cmd + K shortcut
    ------------------------------ */
    useEffect(() => {
        const handler = (e: KeyboardEvent): void => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen(true);
                setTimeout(() => inputRef.current?.focus(), 50);
            }

            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    /* -----------------------------
       Search logic
    ------------------------------ */
    useGroupedSearch({
        query,
        searchGroups: SEARCH_GROUPS,
        setResults,
    });

    const flatResults: SearchResultItem[] = results.flatMap(
        (group) => group.results
    );

    /* -----------------------------
       Keyboard handler
    ------------------------------ */
    const handleKeyDown = useSearchKeyboard({
        query,
        activeIndex,
        setActiveIndex,
        setOpen,
        setQuery,
        flatResults,
        recent,
    });

    /* -----------------------------
       Effects
    ------------------------------ */
    useEffect(() => {
        setActiveIndex(0);
    }, [results]);

    useEffect(() => {
        if (open) {
            requestAnimationFrame(() => {
                inputRef.current?.focus();
            });

            setRecent(getRecentSearches());
        }
    }, [open]);

    useEffect(() => {
        const el = document.querySelector('[aria-selected="true"]');
        el?.scrollIntoView({ block: "nearest" });
    }, [activeIndex]);

    /* =====================================================
       UI
    ===================================================== */

    return (
        <>
            {/* Search Button */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="p-1 md:pr-2 flex items-center text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 md:space-x-2 rounded-full"
            >
                <MagnifyingGlassIcon className="w-4 h-4" />
                <span className="text-xs whitespace-nowrap hidden md:flex">
                    Ctrl + K
                </span>
            </button>

            {/* Modal */}
            {open && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Search"
                    className="fixed inset-0 bg-black/40 p-4 z-50 flex justify-center items-start pt-20"
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-lg shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Search Input */}
                        <div className="flex items-center gap-2 border-b border-gray-100 px-4 rounded-t-lg dark:bg-gray-800">
                            <MagnifyingGlassIcon className="w-4 h-4 text-gray-500" />

                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search components..."
                                className="flex-1 bg-transparent outline-none pl-3 pr-4 h-14 text-sm appearance-none"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />

                            <button onClick={() => { setOpen(false); setQuery("") }} type="button" className=" appearance-none border border-gray-200 bg-center bg-no-repeat rounded-md w-8 h-6 text-[0px] "




                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='24' viewBox='0 0 32 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.66477 16.1364C9.03409 16.1364 8.49006 15.9972 8.03267 15.7188C7.57812 15.4375 7.22727 15.0455 6.98011 14.5426C6.7358 14.0369 6.61364 13.4489 6.61364 12.7784C6.61364 12.108 6.7358 11.517 6.98011 11.0057C7.22727 10.4915 7.57102 10.0909 8.01136 9.80398C8.45455 9.5142 8.97159 9.36932 9.5625 9.36932C9.90341 9.36932 10.2401 9.42614 10.5724 9.53977C10.9048 9.65341 11.2074 9.83807 11.4801 10.0938C11.7528 10.3466 11.9702 10.6818 12.1321 11.0994C12.294 11.517 12.375 12.0312 12.375 12.642V13.0682H7.32955V12.1989H11.3523C11.3523 11.8295 11.2784 11.5 11.1307 11.2102C10.9858 10.9205 10.7784 10.6918 10.5085 10.5241C10.2415 10.3565 9.92614 10.2727 9.5625 10.2727C9.16193 10.2727 8.81534 10.3722 8.52273 10.571C8.23295 10.767 8.00994 11.0227 7.85369 11.3381C7.69744 11.6534 7.61932 11.9915 7.61932 12.3523V12.9318C7.61932 13.4261 7.70455 13.8452 7.875 14.1889C8.0483 14.5298 8.28835 14.7898 8.59517 14.9688C8.90199 15.1449 9.25852 15.233 9.66477 15.233C9.92898 15.233 10.1676 15.196 10.3807 15.1222C10.5966 15.0455 10.7827 14.9318 10.9389 14.7812C11.0952 14.6278 11.2159 14.4375 11.3011 14.2102L12.2727 14.483C12.1705 14.8125 11.9986 15.1023 11.7571 15.3523C11.5156 15.5994 11.2173 15.7926 10.8622 15.9318C10.5071 16.0682 10.108 16.1364 9.66477 16.1364ZM18.5412 10.9205L17.6378 11.1761C17.581 11.0256 17.4972 10.8793 17.3864 10.7372C17.2784 10.5923 17.1307 10.473 16.9432 10.3793C16.7557 10.2855 16.5156 10.2386 16.223 10.2386C15.8224 10.2386 15.4886 10.331 15.2216 10.5156C14.9574 10.6974 14.8253 10.929 14.8253 11.2102C14.8253 11.4602 14.9162 11.6577 15.098 11.8026C15.2798 11.9474 15.5639 12.0682 15.9503 12.1648L16.9219 12.4034C17.5071 12.5455 17.9432 12.7628 18.2301 13.0554C18.517 13.3452 18.6605 13.7187 18.6605 14.1761C18.6605 14.5511 18.5526 14.8864 18.3366 15.1818C18.1236 15.4773 17.8253 15.7102 17.4418 15.8807C17.0582 16.0511 16.6122 16.1364 16.1037 16.1364C15.4361 16.1364 14.8835 15.9915 14.446 15.7017C14.0085 15.4119 13.7315 14.9886 13.6151 14.4318L14.5696 14.1932C14.6605 14.5455 14.8324 14.8097 15.0852 14.9858C15.3409 15.1619 15.6747 15.25 16.0866 15.25C16.5554 15.25 16.9276 15.1506 17.2031 14.9517C17.4815 14.75 17.6207 14.5085 17.6207 14.2273C17.6207 14 17.5412 13.8097 17.3821 13.6562C17.223 13.5 16.9787 13.3835 16.6491 13.3068L15.5582 13.0511C14.9588 12.9091 14.5185 12.6889 14.2372 12.3906C13.9588 12.0895 13.8196 11.7131 13.8196 11.2614C13.8196 10.892 13.9233 10.5653 14.1307 10.2812C14.3409 9.99716 14.6264 9.77415 14.9872 9.61222C15.3509 9.45028 15.7628 9.36932 16.223 9.36932C16.8707 9.36932 17.3793 9.51136 17.7486 9.79545C18.1207 10.0795 18.3849 10.4545 18.5412 10.9205ZM22.8335 16.1364C22.2198 16.1364 21.6914 15.9915 21.2482 15.7017C20.805 15.4119 20.4641 15.0128 20.2255 14.5043C19.9869 13.9957 19.8675 13.4148 19.8675 12.7614C19.8675 12.0966 19.9897 11.5099 20.234 11.0014C20.4812 10.4901 20.8249 10.0909 21.2653 9.80398C21.7085 9.5142 22.2255 9.36932 22.8164 9.36932C23.2766 9.36932 23.6914 9.45455 24.0607 9.625C24.43 9.79545 24.7326 10.0341 24.9684 10.3409C25.2042 10.6477 25.3505 11.0057 25.4073 11.4148H24.4016C24.3249 11.1165 24.1545 10.8523 23.8903 10.6222C23.6289 10.3892 23.2766 10.2727 22.8335 10.2727C22.4414 10.2727 22.0977 10.375 21.8022 10.5795C21.5096 10.7812 21.2809 11.0668 21.1161 11.4361C20.9542 11.8026 20.8732 12.233 20.8732 12.7273C20.8732 13.233 20.9528 13.6733 21.1119 14.0483C21.2738 14.4233 21.5011 14.7145 21.7937 14.9219C22.0891 15.1293 22.4357 15.233 22.8335 15.233C23.0948 15.233 23.332 15.1875 23.5451 15.0966C23.7582 15.0057 23.9386 14.875 24.0863 14.7045C24.234 14.5341 24.3391 14.3295 24.4016 14.0909H25.4073C25.3505 14.4773 25.2099 14.8253 24.9854 15.1349C24.7638 15.4418 24.4698 15.6861 24.1033 15.8679C23.7397 16.0469 23.3164 16.1364 22.8335 16.1364Z' fill='black' fill-opacity='0.5' /%3E%3C/svg%3E ")`
                                }}




                            > </button>
                        </div>

                        {/* Results */}
                        <div className="max-h-[50vh] md:px-6 px-4 overflow-y-auto">
                            {/* Recent */}
                            {query === "" && recent.length > 0 && (
                                <div className="mb-4">
                                    <div className="pt-6 uppercase text-gray-900 dark:text-gray-200 text-base font-semibold mb-4">
                                        Recent
                                    </div>

                                    <ul role="listbox" className="flex flex-col space-y-1">
                                        {recent.map((item) => {
                                            globalIndex++;

                                            return (
                                                <ResultItem
                                                    key={item.url}
                                                    item={{
                                                        id: 0,
                                                        title: item.label,
                                                        url: item.url,
                                                    }}
                                                    isActive={globalIndex === activeIndex}
                                                    onSelect={() => {
                                                        setOpen(false);
                                                        router.push(item.url);
                                                    }}
                                                />
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}

                            {/* Empty states */}
                            {query === "" && recent.length === 0 && (
                                <div className="text-gray-400 flex justify-center items-center h-60">
                                    No recent
                                </div>
                            )}

                            {query !== "" && results.length === 0 && (
                                <div className="text-gray-400 flex justify-center items-center h-60">
                                    No results
                                </div>
                            )}

                            {/* Search results */}
                            {results.map((group) => (
                                <div key={group.title} className="mb-4">
                                    <div className="pt-6 uppercase text-gray-900 dark:text-gray-200 text-base font-semibold mb-4">
                                        {group.title}
                                    </div>

                                    <ul role="listbox" className="flex flex-col space-y-1">
                                        {group.results.map((item) => {
                                            globalIndex++;

                                            return (
                                                <ResultItem
                                                    key={item.id}
                                                    item={item}
                                                    isActive={globalIndex === activeIndex}
                                                    onSelect={() => {
                                                        saveRecentSearch({
                                                            label: item.title,
                                                            url: item.url,
                                                            tag: item.tag,
                                                        });

                                                        setOpen(false);
                                                        setQuery("");
                                                        router.push(item.url);
                                                    }}
                                                />
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
