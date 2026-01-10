import React, { RefObject } from 'react'
import { NavItem } from './SideBar';

type Props = {
    title: string;
    items: NavItem[];
    activeHref: string;
    containerRef: RefObject<HTMLDivElement | null>
    handleMouseLeave: () => void
    handleMouseEnter: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    handleClick: (href: string, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;



};


export default function VerticalIndicatorNav({
    title,
    items,
    activeHref,
    containerRef,
    handleMouseLeave,
    handleMouseEnter,
    handleClick

}: Props) {
    return (

        <div>


            <p className="mt-4 mb-2 text-[14px]">{title}</p>

            <div
                ref={containerRef}
                className=" flex flex-col space-y-2 border-l border-gray-300 pl-4"
                onMouseLeave={handleMouseLeave}
            >


                {items.map(({ label, href, tag }) => (
                    <a
                        key={href}
                        href={href}
                        onMouseEnter={handleMouseEnter}
                        onClick={(e) => handleClick(href, e)}
                        className={`
    flex min-h-8 items-center text-[0.85rem]
    transition-all duration-300
    hover:pl-2
 ease-in-out

    ${activeHref === href
                                ? "text-neutral-950 font-bold"
                                : "text-neutral-500 hover:text-neutral-950"}
  `}
                    >
                        <span >{label} </span>
                        {tag && (
                            <span
                                className={`ml-2 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${tag === "new" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                                    }`}
                            >
                                {tag === "new" ? "New" : "Updated"}
                            </span>
                        )}
                    </a>
                ))}
            </div>

        </div>
    )
}
