"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { RecentSearch, SearchResultItem } from "@/app/types/type";
import { saveRecentSearch } from "@/libs/recentSearch";

interface Params {
    query: string;
    activeIndex: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    setOpen: (v: boolean) => void;
    setQuery: (v: string) => void;
    flatResults: SearchResultItem[];
    recent: RecentSearch[];
}

export function useSearchKeyboard({
    query,
    activeIndex,
    setActiveIndex,
    setOpen,
    setQuery,
    flatResults,
    recent,
}: Params) {
    const router = useRouter();

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.nativeEvent.isComposing) return;

            if (e.key === "Escape") {
                setOpen(false);
                return;
            }

            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    setActiveIndex((prev) => {
                        const list = query ? flatResults : recent;
                        if (list.length === 0) return 0;
                        return prev < list.length - 1 ? prev + 1 : 0;
                    });
                    break;

                case "ArrowUp":
                    e.preventDefault();
                    setActiveIndex((prev) => {
                        const list = query ? flatResults : recent;
                        if (list.length === 0) return 0;
                        return prev > 0 ? prev - 1 : list.length - 1;
                    });
                    break;

                case "Enter":
                    e.preventDefault();

                    if (query) {
                        const selected = flatResults[activeIndex];
                        if (!selected) return;

                        saveRecentSearch({
                            label: selected.title,
                            url: selected.url,
                            tag: selected.tag,
                        });

                        router.push(selected.url);
                    } else {
                        const selected = recent[activeIndex];
                        if (!selected) return;

                        router.push(selected.url);
                    }

                    setQuery("");
                    setOpen(false);
                    break;
            }
        },
        [
            query,
            activeIndex,
            flatResults,
            recent,
            setActiveIndex,
            setOpen,
            setQuery,
            router,
        ]
    );

    return handleKeyDown;
}



// const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
//     if (e.nativeEvent.isComposing) return;

//     // Escape ALWAYS works
//     if (e.key === "Escape") {
//         setOpen(false);
//         return;
//     }





//     switch (e.key) {
//         case "ArrowDown":
//             e.preventDefault();

//             if (query !== "") {
//                 setActiveIndex((prev) =>



//                     prev < flatResults.length - 1 ? prev + 1 : 0
//                 );
//             }
//             else {
//                 // alert("hello ")
//                 setActiveIndex((prev) =>



//                     prev < recent.length - 1 ? prev + 1 : 0
//                 );
//             }

//             break;

//         case "ArrowUp":
//             e.preventDefault();


//             if (query !== "") {
//                 setActiveIndex((prev) =>
//                     prev > 0 ? prev - 1 : flatResults.length - 1
//                 );
//             }
//             else {
//                 // alert("hello ")
//                 setActiveIndex((prev) =>
//                     prev > 0 ? prev - 1 : recent.length - 1
//                 );
//             }



//             break;

//         case "Enter":

//             e.preventDefault();

//             if (query !== "") {
//                 const selected = flatResults[activeIndex];
//                 if (!selected) return;

//                 saveRecentSearch({
//                     label: selected.title,
//                     url: selected.url,
//                     tag: selected.tag,
//                 });

//                 router.push(`${selected.url}`)
//             }
//             else {
//                 const selected = recent[activeIndex];
//                 if (!selected) return;



//                 router.push(`${selected.url}`)
//             }



//             setQuery("");
//             setOpen(false);



//             break;


//     }
// };