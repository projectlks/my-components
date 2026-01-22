// "use client";

// import { SearchResultItem as ItemType } from "@/app/types/type";
// import Link from "next/link";

// import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

// interface ResultItemProps {
//     item: ItemType;
//     isActive: boolean;
//     onSelect: () => void; // Called when user clicks the item
// }

// export default function ResultItem({ item, isActive, onSelect }: ResultItemProps) {
//     return (
//         <Link
//             href={item.url}
//             role="option"
//             aria-selected={isActive}
//             onClick={onSelect}
//             className={`p-2 flex  items-center space-x-4 rounded px-4 py-3  cursor-pointer
//         ${isActive
//                     ? "bg-indigo-500 text-white"
//                     : "hover:bg-gray-200 bg-gray-100 dark:hover:bg-gray-700"}
//       `}
//         >

//             <div className="flex justify-center items-center border w-7 h-7 rounded border-gray-400 text-gray-500">

//                 <svg
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                 >
//                     <path
//                         d="M3 7L12 2L21 7V17L12 22L3 17V7Z"
//                         stroke="currentColor"
//                         strokeWidth="1.5"
//                         strokeLinejoin="round"
//                     />
//                     <path
//                         d="M3 7L12 12L21 7"
//                         stroke="currentColor"
//                         strokeWidth="1.5"
//                         strokeLinejoin="round"
//                     />
//                     <path
//                         d="M12 12V22"
//                         stroke="currentColor"
//                         strokeWidth="1.5"
//                         strokeLinejoin="round"
//                     />
//                 </svg>
//             </div>

//             <div className="flex justify-between items-center w-full">

//                 <div className="flex flex-col ">

//                     <span className="text-xs text-gray-700 mb-1 leading-6  font-semibold" >
//                         {item.url}
//                     </span>
//                     <span className="text-sm leading-6 text-gray-900">{item.title}</span>
//                 </div>


//                 <ArrowTopRightOnSquareIcon className="size-3.5" />
//             </div>


//         </Link>
//     );
// }


"use client";

import { SearchResultItem as ItemType } from "@/app/types/type";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface ResultItemProps {
    item: ItemType;
    isActive: boolean;
    onSelect: () => void;
}

export default function ResultItem({
    item,
    isActive,
    onSelect,
}: ResultItemProps) {
    return (
        <Link
            href={item.url}
            role="option"
            aria-selected={isActive}
            onClick={onSelect}
            className={`
        group flex items-center gap-4 rounded-md px-4 py-3 cursor-pointer
     
        ${isActive
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                }
      `}
        >
            {/* Icon box */}
            <div
                className={`
          flex justify-center items-center w-7 h-7 rounded border
          ${isActive
                        ? "border-white/30 text-white"
                        : "border-gray-300 text-gray-500 dark:border-gray-600 dark:text-gray-400"
                    }
        `}
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3 7L12 2L21 7V17L12 22L3 17V7Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M3 7L12 12L21 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12 12V22"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* Text */}
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-col">
                    <span
                        className={`
              text-xs mb-1 leading-5
              ${isActive
                                ? "text-indigo-100"
                                : "text-gray-500 dark:text-gray-400"
                            }
            `}
                    >
                        {item.url}
                    </span>

                    <span
                        className={`
              text-sm leading-6 font-medium
              ${isActive
                                ? "text-white"
                                : "text-gray-900 dark:text-gray-100"
                            }
            `}
                    >
                        {item.title}
                    </span>
                </div>

                <ArrowTopRightOnSquareIcon
                    className={`
            size-3.5 shrink-0
            ${isActive
                            ? "text-white"
                            : "text-gray-400 dark:text-gray-500"
                        }
          `}
                />
            </div>
        </Link>
    );
}
