"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type FAQItemProps = {
    question: string;
    answer: string;
    defaultOpen?: boolean;
};

const faqs: FAQItemProps[] = [
    {
        question: "What is this website about?",
        answer:
            "This website provides reusable UI components and examples built with React, TypeScript, and Tailwind CSS to help developers build projects faster.",
        defaultOpen: true,
    },
    {
        question: "Is this FAQ component reusable?",
        answer:
            "Yes. This FAQ component is fully reusable. You can pass different questions and answers as props and use it in any project.",
    },
    {
        question: "Does it support long answers?",
        answer:
            "Yes. This FAQ supports very long answers. The height is calculated dynamically using useLayoutEffect, so content will never be cut off.",
    },
    {
        question: "Can I customize the design?",
        answer:
            "Absolutely. You can customize colors, spacing, animations, and icons using Tailwind CSS classes or extend the component as needed.",
    },
];

export default function BasicFAQ() {
    return (
        <div className="w-full bg-white dark:bg-gray-950 p-5">
            <div className="mx-auto max-w-3xl">
                <h3 className="mb-6 text-center text-3xl font-semibold text-slate-950 dark:text-slate-100">
                    Frequently Asked Questions
                </h3>

                {faqs.map((faq, idx) => (
                    <FAQItem key={idx} {...faq} />
                ))}
            </div>
        </div>
    );
}

function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
    const [open, setOpen] = useState(defaultOpen);
    const [height, setHeight] = useState<number>(0);
    const contentRef = useRef<HTMLDivElement>(null);


    useLayoutEffect(() => {
        if (!contentRef.current) return;

        if (open) {
            setHeight(contentRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [open, answer]);

    return (
        <div
            className={`border-b border-b-slate-300 dark:border-b-gray-700  `}
        >
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-4 py-6 px-2  transition-colors duration-200"
            >
                <span
                    className={`text-left text-lg font-medium ${open
                        ? "text-violet-600 dark:text-violet-400"
                        : "text-slate-950 dark:text-slate-200"
                        }`}
                >
                    {question}
                </span>

                <ChevronDownIcon
                    className={`h-6 w-6 transition-transform duration-300 ${open
                        ? "rotate-180 text-violet-600 dark:text-violet-400"
                        : "rotate-0 text-slate-950 dark:text-slate-200"
                        }`}
                />
            </button>

            <div
                style={{ height }}
                className="overflow-hidden text-slate-500 dark:text-slate-300 transition-[height] duration-300 px-2"
            >
                <div ref={contentRef}>
                    <p className="pb-4">{answer}</p>
                </div>
            </div>
        </div>
    );
}
