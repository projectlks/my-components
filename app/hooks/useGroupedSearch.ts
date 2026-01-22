"use client";

import { useEffect } from "react";
import {
    GroupedSearchResult,
    SearchGroup,
    SearchResultItem,
} from "@/app/types/type";

interface Params {
    query: string;
    searchGroups: SearchGroup[];
    setResults: React.Dispatch<
        React.SetStateAction<GroupedSearchResult[]>
    >;
    delay?: number;
}

export function useGroupedSearch({
    query,
    searchGroups,
    setResults,
    delay = 150,
}: Params) {
    useEffect(() => {
        if (query.trim() === "") {
            setResults([]);
            return;
        }

        const timeoutId = window.setTimeout(() => {
            const groupedResults: GroupedSearchResult[] = searchGroups
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
                .filter((group) => group.results.length > 0);

            setResults(groupedResults);
        }, delay);

        return () => window.clearTimeout(timeoutId);
    }, [query, searchGroups, delay, setResults]);
}


/* -----------------------------
     Search Logic (Grouped)
  ------------------------------ */
// useEffect((): (() => void) | void => {
//     if (query.trim() === "") {

//         const t = setTimeout(() => {
//             setResults([]);
//         }, 0);

//         return () => clearTimeout(t);

//     }

//     const timeoutId: number = window.setTimeout((): void => {



//         const groupedResults: GroupedSearchResult[] = SEARCH_GROUPS
//             .map((group) => {
//                 const matchedItems: SearchResultItem[] = group.items
//                     .filter((item) =>
//                         item.label.toLowerCase().includes(query.toLowerCase())
//                     )
//                     .map((item, index) => ({
//                         id: index,
//                         title: item.label,
//                         url: item.href,
//                         tag: item.tag,
//                     }));

//                 return {
//                     title: group.title,
//                     results: matchedItems,
//                 };
//             })
//             // remove empty groups
//             .filter((group) => group.results.length > 0);

//         setResults(groupedResults);
//     }, 150); // debounce

//     return (): void => window.clearTimeout(timeoutId);
// }, [query]);