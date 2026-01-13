"use client";

import { ReactNode, useState } from "react";
import {
    EyeIcon,
    LinkIcon,
    CodeBracketIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

type ProjectHeaderProps = {
    title: string;
    link: string;
    view: ReactNode;
    code: ReactNode;
};

export default function ProjectHeader({
    title,
    link,
    view,
    code,
}: ProjectHeaderProps) {
    const [active, setActive] = useState<"view" | "code">("view");

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Link copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <>
            <div className="relative mb-3 flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-2">
                    <h4 className="line-clamp-1 text-xl font-medium">{title}</h4>
                </div>

                <div className="flex items-center gap-4">
                    {/* Copy Link */}
                    <button
                        onClick={() => copyToClipboard(link)}
                        className="text-xl transition-colors cursor-pointer  h-full px-3 md:px-2.5 py-2 md:py-1.5  hover:text-indigo-600"
                    >
                        <LinkIcon className="w-5 h-5" />
                    </button>

                    {/* VIEW / CODE Toggle */}
                    <div className="relative flex items-center overflow-hidden border border-neutral-900 bg-white dark:bg-neutral-900 rounded-md">
                        {/* Background highlight */}
                        <span
                            className="absolute top-0 left-0 h-full w-1/2 bg-indigo-600 dark:bg-indigo-500 transition-transform duration-300 ease-out rounded-md"
                            style={{
                                transform:
                                    active === "view" ? "translateX(0%)" : "translateX(100%)",
                            }}
                        ></span>

                        {/* VIEW Button */}
                        <button
                            onClick={() => setActive("view")}
                            className={`relative z-10 flex items-center gap-2 px-3 md:px-2.5 py-2 md:py-1.5 text-sm font-medium transition-colors ${active === "view"
                                ? "text-white"
                                : "text-neutral-950 dark:text-neutral-50 hover:text-indigo-600 dark:hover:text-indigo-400"
                                }`}
                        >
                            <EyeIcon className="w-5 h-5 md:w-4 md:h-4" />
                            <span className="hidden md:block">VIEW</span>
                        </button>

                        {/* CODE Button */}
                        <button
                            onClick={() => setActive("code")}
                            className={`relative z-10 flex items-center gap-2 px-3 md:px-2.5 py-2 md:py-1.5 text-sm font-medium transition-colors ${active === "code"
                                ? "text-white"
                                : "text-neutral-950 dark:text-neutral-50 hover:text-indigo-600 dark:hover:text-indigo-400"
                                }`}
                        >
                            <CodeBracketIcon className="w-5 h-5 md:w-4 md:h-4" />
                            <span className="hidden md:block">CODE</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="px-4 py-12 border border-gray-300 dark:border-gray-700">
                {active === "view" ? view : code}
            </div>
        </>
    );
}
