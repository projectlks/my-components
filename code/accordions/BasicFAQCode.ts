
export const BasicFAQCode = ` 
"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type FAQItemProps = {
    question: string;
    answer: string;
    defaultOpen?: boolean;
};

export default function BasicFAQ() {
    return (
        <div className="px-4 py-12 border border-gray-300">
            <div className="mx-auto max-w-3xl">
                <h3 className="mb-6 text-center text-3xl font-semibold">
                    Frequently asked questions
                </h3>

                <FAQItem
                    question="What is this website about?"
                    answer="This website provides reusable UI components and examples built with React, TypeScript, and Tailwind CSS to help developers build projects faster."
                    defaultOpen
                />

                <FAQItem
                    question="Is this FAQ component reusable?"
                    answer="Yes. This FAQ component is fully reusable. You can pass different questions and answers as props and use it in any project."
                />

                <FAQItem
                    question="Does it support long answers?"
                    answer="Yes. This FAQ supports very long answers. The height is calculated dynamically using useLayoutEffect, so content will never be cut off."
                />

                <FAQItem
                    question="Can I customize the design?"
                    answer="Absolutely. You can customize colors, spacing, animations, and icons using Tailwind CSS classes or extend the component as needed."
                />
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
        <div className="border-b border-b-slate-300">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-4 py-6"
            >
                <span className={\` \${open ? "text-violet-600" : "text-slate-950"} text-left text-lg font-medium text-slate-950\`}>
                    {question}
                </span>

                <ChevronDownIcon
                    className={\`h-6 w-6  transition-transform duration-300 \${open ? "rotate-180 text-violet-600" : "rotate-0 text-slate-950"
                        }\`}
                />
            </button>

            <div
                style={{ height }}
                className="overflow-hidden text-slate-500 transition-[height] duration-300"
            >
                <div ref={contentRef}>
                    <p className="pb-4">{answer}</p>
                </div>
            </div>
        </div>
    );
}


`