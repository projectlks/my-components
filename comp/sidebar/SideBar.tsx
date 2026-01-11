"use client";

import { useLayoutEffect, useRef, useState } from "react";
import VerticalIndicatorNav from "./VerticalIndicatorNav";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";

export type NavItem = {
    label: string;
    href: string;
    tag?: "new" | "updated";
};


const components: NavItem[] = [
    { label: "Accordions", href: "/components/accordions", tag: "new" },
    { label: "Carousels", href: "/components/carousels" },
];

export default function Sidebar() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const router = useTransitionRouter();
    const pathname = usePathname(); // ✅ single source of truth



    const [hoverIndicator, setHoverIndicator] = useState<{ top: number; height: number }>({
        top: 0,
        height: 0,
    });

    const [activeIndicator, setActiveIndicator] = useState<{ top: number; height: number }>({
        top: 0,
        height: 0,
    });

    // const [activeHref, setActiveHref] = useState<string>("");

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




    // function slideInOut() {

    //     document.documentElement.animate(
    //         [
    //             {
    //                 opacity: 1,
    //                 transform: "translateY(0px)",
    //             },
    //             {
    //                 opacity: 0.2,
    //                 transform: "translateY(-35%)",
    //             }
    //         ], {
    //         duration: 1000,
    //         easing: "cubic-bezier(0.87, 0, 0.13, 1)",
    //         fill: "forwards",
    //         pseudoElement: "::view-transition-old(root)",

    //     }
    //     )

    //     document.documentElement.animate(

    //         [
    //             {
    //                 clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    //             },
    //             {
    //                 clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
    //             },


    //         ],
    //         {
    //             duration: 1000,
    //             easing: "cubic-bezier(0.87, 0, 0.13, 1)",
    //             fill: "forwards",
    //             pseudoElement: "::view-transition-new(root)",

    //         }


    //     )


    // }


    // Click / active effect
    const handleClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // optional
        // setActiveHref(href);



        if (!containerRef.current) return;


        const el = e.currentTarget

        const top = el.offsetTop
        const height = el.offsetHeight




        setActiveIndicator({
            top,
            height
        });


        router.push(href,

            //     {
            //     onTransitionReady: slideInOut
            // }

        )

    }

    // Sync active indicator with current route
    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const el = Array.from(containerRef.current.querySelectorAll("a")).find(
            (a) => a.getAttribute("href") === pathname
        ) as HTMLAnchorElement | undefined;

        // Wrap setState in requestAnimationFrame
        requestAnimationFrame(() => {
            if (!el) {
                setActiveIndicator({ top: 0, height: 0 });
                return;
            }

            setActiveIndicator({ top: el.offsetTop, height: el.offsetHeight });
        });
    }, [pathname]);



    return (
        <section className="flex relative flex-col w-70 h-full pl-8 mt-6">

            {/* ACTIVE LINE */}
            <span
                className="absolute z-10 -m-px rounded-4xl w-0.75 bg-gray-950 dark:bg-gray-200 transition-all duration-300 ease-out"
                style={{
                    top: activeIndicator.top,
                    height: activeIndicator.height,
                }}
            />

            {/* HOVER LINE */}
            <span
                className="absolute -m-px w-0.75 rounded bg-gray-500 dark:bg-gray-400 transition-all duration-300 ease-out"
                style={{
                    top: hoverIndicator.top,
                    height: hoverIndicator.height,
                }}
            />

            <VerticalIndicatorNav
                title="Components"
                items={components}
                activeHref={pathname}
                containerRef={containerRef}
                handleMouseLeave={handleMouseLeave}
                handleMouseEnter={handleMouseEnter} // ✅ no ()
                handleClick={handleClick}
            />
        </section>

    );
}
