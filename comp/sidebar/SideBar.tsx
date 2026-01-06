"use client";

import { useRef, useState } from "react";
import VerticalIndicatorNav from "./VerticalIndicatorNav";

export type NavItem = {
    label: string;
    href: string;
    tag?: "new" | "updated";
};


const textAnimations: NavItem[] = [
    { label: "Split Text", href: "/text-animations/split-text" },
    { label: "Blur Text", href: "/text-animations/blur-text" },
    { label: "Circular Text", href: "/text-animations/circular-text" },
    { label: "Text Type", href: "/text-animations/text-type" },
    { label: "Shuffle", href: "/text-animations/shuffle", tag: "new" },
    { label: "Shiny Text", href: "/text-animations/shiny-text", tag: "updated" },
];

export default function Sidebar() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [hoverIndicator, setHoverIndicator] = useState<{ top: number; height: number }>({
        top: 0,
        height: 0,
    });

    const [activeIndicator, setActiveIndicator] = useState<{ top: number; height: number }>({
        top: 0,
        height: 0,
    });

    const [activeHref, setActiveHref] = useState<string>("");

    // Hover effect
    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!containerRef.current) return;


        const el = e.currentTarget

        const top = el.offsetTop
        const height = el.offsetHeight

        setHoverIndicator({
            top,
            height
        });
    };

    const handleMouseLeave = () => {
        setHoverIndicator({ top: 0, height: 0 });
    };

    // Click / active effect
    const handleClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // optional
        setActiveHref(href);

        if (!containerRef.current) return;


        const el = e.currentTarget

        const top = el.offsetTop
        const height = el.offsetHeight


        setActiveIndicator({
            top,
            height
        });
    };

    return (
        <section className="flex flex-col w-75 h-full pl-8  mt-6">



            {/* ACTIVE LINE */}
            {activeHref && (
                <span
                    className="absolute z-10 -m-px  rounded-4xl  w-0.75 bg-black transition-all duration-300 ease-out"
                    style={{
                        top: activeIndicator.top,
                        height: activeIndicator.height,
                    }}
                />
            )}

            {/* HOVER LINE */}
            <span
                className="absolute -m-px w-0.75 rounded bg-gray-500 transition-all duration-300 ease-out"
                style={{
                    top: hoverIndicator.top,
                    height: hoverIndicator.height,
                }}
            />









            <VerticalIndicatorNav
                title="Components"
                items={textAnimations}
                activeHref={activeHref}
                containerRef={containerRef}
                handleMouseLeave={handleMouseLeave}
                handleMouseEnter={handleMouseEnter} // ✅ no ()
                handleClick={handleClick}
            />


            <VerticalIndicatorNav
                title="Carousel"
                items={textAnimations}
                activeHref={activeHref}
                containerRef={containerRef}
                handleMouseLeave={handleMouseLeave}
                handleMouseEnter={handleMouseEnter} // ✅ no ()
                handleClick={handleClick}
            />

        </section>
    );
}
